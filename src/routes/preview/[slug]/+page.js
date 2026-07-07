import { error } from '@sveltejs/kit';
import { getPreviewProject } from '$lib/preview/projects.js';

export const prerender = false;

/**
 * @param {{ params: { slug: string } }} event
 */
export const load = ({ params }) => {
  const project = getPreviewProject(params.slug);

  if (!project) {
    throw error(404, 'Unknown preview link');
  }

  return {
    project
  };
};
