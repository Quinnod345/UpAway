import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { env } from '$env/dynamic/private';
import { getPreviewProject } from './projects.js';

const START_TIMEOUT_MS = 90_000;
const HEALTH_TIMEOUT_MS = 2_000;
const POLL_INTERVAL_MS = 1_000;

const processRegistryKey = '__upawayPreviewRunnerProcesses';

/**
 * @typedef {{ id: string; label?: string; command: string; args?: string[]; serviceIds?: string[] }} RunnerCommand
 * @typedef {{ id: string; label: string; detail?: string; href?: string; required?: boolean; kind?: string; host?: string; port?: number }} PreviewService
 * @typedef {{ slug: string; services: PreviewService[]; runner?: { openServiceId?: string; setupCommands?: RunnerCommand[]; commands?: RunnerCommand[] } }} RunnableProject
 */

/** @type {Map<string, { child: import('node:child_process').ChildProcess; startedAt: string; logPath: string; errorPath: string }>} */
const runningProcesses =
  /** @type {any} */ (globalThis)[processRegistryKey] instanceof Map
    ? /** @type {any} */ (globalThis)[processRegistryKey]
    : new Map();

/** @type {any} */ (globalThis)[processRegistryKey] = runningProcesses;

/**
 * @param {unknown} body
 * @param {number} [status]
 */
export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store'
    }
  });
}

export function isRunnerEnabled() {
  if (env.PREVIEW_RUNNER_ENABLED === 'true') {
    return true;
  }

  return process.env.NODE_ENV !== 'production';
}

/**
 * @param {Request} request
 */
export function hasRunnerAccess(request) {
  const configuredToken = env.PREVIEW_RUNNER_TOKEN;

  if (!configuredToken) {
    return process.env.NODE_ENV !== 'production';
  }

  const requestUrl = new URL(request.url);
  const providedToken =
    request.headers.get('x-preview-token') || requestUrl.searchParams.get('token') || '';

  return providedToken === configuredToken;
}

/**
 * @param {string} slug
 */
export function getRunnableProject(slug) {
  const project = getPreviewProject(slug);

  if (!project?.runner) {
    return null;
  }

  return project;
}

/**
 * @param {unknown} value
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * @param {{ slug: string }} project
 * @param {{ id: string }} command
 */
function registryId(project, command) {
  return `${project.slug}:${command.id}`;
}

/**
 * @param {string | undefined} pid
 */
function pidIsAlive(pid) {
  if (!pid) {
    return false;
  }

  try {
    process.kill(Number(pid), 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {{ slug: string }} project
 * @param {{ id: string }} command
 */
function getRunningProcess(project, command) {
  const entry = runningProcesses.get(registryId(project, command));

  if (!entry || !pidIsAlive(String(entry.child.pid))) {
    runningProcesses.delete(registryId(project, command));
    return null;
  }

  return entry;
}

/**
 * @param {string} filePath
 */
function ensureParentDirectory(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * @param {{ slug: string }} project
 * @param {RunnerCommand} command
 */
function createLogFiles(project, command) {
  const logRoot = env.PREVIEW_RUNNER_LOG_DIR || path.join(process.cwd(), '.preview-runner');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logPath = path.join(logRoot, project.slug, `${command.id}-${stamp}.log`);
  const errorPath = path.join(logRoot, project.slug, `${command.id}-${stamp}.err.log`);
  ensureParentDirectory(logPath);
  ensureParentDirectory(errorPath);
  return {
    logPath,
    errorPath
  };
}

/**
 * @param {{ slug: string }} project
 * @param {RunnerCommand} command
 */
function runSetupCommand(project, command) {
  const { logPath, errorPath } = createLogFiles(project, command);
  const outFd = fs.openSync(logPath, 'a');
  const errFd = fs.openSync(errorPath, 'a');

  try {
    const result = spawnSync(command.command, command.args || [], {
      cwd: process.cwd(),
      env: process.env,
      stdio: ['ignore', outFd, errFd],
      timeout: START_TIMEOUT_MS
    });

    if (result.error) {
      throw result.error;
    }

    if (result.status !== 0) {
      throw new Error(`${command.label || command.id} exited with ${result.status}`);
    }

    return {
      id: command.id,
      label: command.label || command.id,
      status: 'completed',
      logPath,
      errorPath
    };
  } finally {
    fs.closeSync(outFd);
    fs.closeSync(errFd);
  }
}

/**
 * @param {{ slug: string }} project
 * @param {RunnerCommand} command
 */
function startDaemonCommand(project, command) {
  const existing = getRunningProcess(project, command);

  if (existing) {
    return {
      id: command.id,
      label: command.label || command.id,
      status: 'already-running',
      pid: existing.child.pid,
      startedAt: existing.startedAt,
      logPath: existing.logPath,
      errorPath: existing.errorPath
    };
  }

  const { logPath, errorPath } = createLogFiles(project, command);
  const outFd = fs.openSync(logPath, 'a');
  const errFd = fs.openSync(errorPath, 'a');

  let child;
  try {
    child = spawn(command.command, command.args || [], {
      cwd: process.cwd(),
      detached: true,
      env: process.env,
      stdio: ['ignore', outFd, errFd]
    });
  } finally {
    fs.closeSync(outFd);
    fs.closeSync(errFd);
  }

  child.unref();

  const entry = {
    child,
    startedAt: new Date().toISOString(),
    logPath,
    errorPath
  };

  runningProcesses.set(registryId(project, command), entry);

  child.once('exit', () => {
    runningProcesses.delete(registryId(project, command));
  });

  return {
    id: command.id,
    label: command.label || command.id,
    status: 'started',
    pid: child.pid,
    startedAt: entry.startedAt,
    logPath,
    errorPath
  };
}

/**
 * @param {PreviewService} service
 */
async function checkService(service) {
  if (service.kind === 'tcp') {
    return checkTcpService(service);
  }

  return checkHttpService(service);
}

/**
 * @param {PreviewService} service
 */
function checkTcpService(service) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const socket = net.createConnection({
      host: service.host || '127.0.0.1',
      port: Number(service.port)
    });

    /** @param {{ ok: boolean; status: string; message?: string }} result */
    const finish = (result) => {
      socket.destroy();
      resolve({
        ...result,
        responseMs: Date.now() - startedAt
      });
    };

    socket.setTimeout(HEALTH_TIMEOUT_MS);
    socket.once('connect', () => finish({ ok: true, status: 'ready' }));
    socket.once('timeout', () => finish({ ok: false, status: 'timeout' }));
    socket.once('error', (error) =>
      finish({ ok: false, status: 'unreachable', message: error.message })
    );
  });
}

/**
 * @param {PreviewService} service
 */
async function checkHttpService(service) {
  if (!isNonEmptyString(service.href)) {
    return {
      ok: false,
      status: 'missing-url',
      message: `${service.label} does not have a URL`
    };
  }

  const href = String(service.href);
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

  try {
    const response = await fetch(href, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal
    });

    return {
      ok: response.ok,
      status: String(response.status),
      responseMs: Date.now() - startedAt
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to reach service';
    const name = error instanceof Error ? error.name : '';

    return {
      ok: false,
      status: name === 'AbortError' ? 'timeout' : 'unreachable',
      message,
      responseMs: Date.now() - startedAt
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * @param {RunnableProject} project
 */
export async function getProjectStatus(project) {
  const services = await Promise.all(
    project.services.map(async (service) => {
      const health = await checkService(service);
      return {
        id: service.id,
        label: service.label,
        detail: service.detail,
        href: service.href,
        required: service.required !== false,
        ...health
      };
    })
  );

  const requiredServices = services.filter((service) => service.required);
  const ready =
    requiredServices.length > 0 && requiredServices.every((service) => service.ok === true);
  const openService = services.find((service) => service.id === project.runner?.openServiceId);

  return {
    slug: project.slug,
    ready,
    openUrl: openService?.ok ? openService.href : '',
    services,
    processes: (project.runner?.commands || []).map((command) => {
      const existing = getRunningProcess(project, command);
      return {
        id: command.id,
        label: command.label || command.id,
        running: Boolean(existing),
        pid: existing?.child.pid || null,
        startedAt: existing?.startedAt || null,
        logPath: existing?.logPath || null,
        errorPath: existing?.errorPath || null
      };
    })
  };
}

/**
 * @param {RunnableProject & { runner: NonNullable<RunnableProject['runner']> }} project
 */
export async function startPreviewProject(project) {
  const setupResults = [];
  for (const command of project.runner.setupCommands || []) {
    setupResults.push(runSetupCommand(project, command));
  }

  const processResults = [];
  let status = await getProjectStatus(project);

  for (const command of project.runner.commands || []) {
    const serviceIds = command.serviceIds || [command.id];
    const commandServices = status.services.filter((service) => serviceIds.includes(service.id));

    if (commandServices.length > 0 && commandServices.every((service) => service.ok === true)) {
      processResults.push({
        id: command.id,
        label: command.label || command.id,
        status: 'already-healthy'
      });
      continue;
    }

    processResults.push(startDaemonCommand(project, command));
  }

  const deadline = Date.now() + START_TIMEOUT_MS;
  status = await getProjectStatus(project);

  while (!status.ready && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    status = await getProjectStatus(project);
  }

  return {
    started: processResults,
    setup: setupResults,
    status
  };
}
