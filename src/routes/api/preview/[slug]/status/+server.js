import {
  getProjectStatus,
  getRunnableProject,
  hasRunnerAccess,
  isRunnerEnabled,
  jsonResponse,
  optionsResponse,
  proxyPreviewRunnerRequest
} from '$lib/preview/runner.server.js';

export const OPTIONS = () => optionsResponse();

/** @param {{ params: { slug: string }; request: Request }} event */
export const GET = async ({ params, request }) => {
  const project = getRunnableProject(params.slug);

  if (!project) {
    return jsonResponse({ error: 'Unknown preview project.' }, 404);
  }

  if (!isRunnerEnabled()) {
    return proxyPreviewRunnerRequest(request, project, 'status');
  }

  if (!hasRunnerAccess(request)) {
    return jsonResponse({ error: 'Preview runner access denied.', ready: false }, 401);
  }

  return jsonResponse(await getProjectStatus(project));
};
