import {
  getProjectStatus,
  getRunnableProject,
  hasRunnerAccess,
  isRunnerEnabled,
  jsonResponse
} from '$lib/preview/runner.server.js';

/** @param {{ params: { slug: string }; request: Request }} event */
export const GET = async ({ params, request }) => {
  const project = getRunnableProject(params.slug);

  if (!project) {
    return jsonResponse({ error: 'Unknown preview project.' }, 404);
  }

  if (!isRunnerEnabled()) {
    return jsonResponse(
      {
        error:
          'Preview runner is not enabled on this host. Set PREVIEW_RUNNER_ENABLED=true on a runner machine.',
        ready: false
      },
      403
    );
  }

  if (!hasRunnerAccess(request)) {
    return jsonResponse({ error: 'Preview runner access denied.', ready: false }, 401);
  }

  return jsonResponse(await getProjectStatus(project));
};
