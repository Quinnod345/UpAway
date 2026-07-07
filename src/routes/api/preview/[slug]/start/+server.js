import {
  getRunnableProject,
  hasRunnerAccess,
  isRunnerEnabled,
  jsonResponse,
  proxyPreviewRunnerRequest,
  startPreviewProject
} from '$lib/preview/runner.server.js';

/** @param {{ params: { slug: string }; request: Request }} event */
export const POST = async ({ params, request }) => {
  const project = getRunnableProject(params.slug);

  if (!project) {
    return jsonResponse({ error: 'Unknown preview project.' }, 404);
  }

  if (!isRunnerEnabled()) {
    return proxyPreviewRunnerRequest(request, project, 'start');
  }

  if (!hasRunnerAccess(request)) {
    return jsonResponse({ error: 'Preview runner access denied.' }, 401);
  }

  try {
    return jsonResponse(await startPreviewProject(project));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start preview project.';

    return jsonResponse(
      {
        error: message
      },
      500
    );
  }
};
