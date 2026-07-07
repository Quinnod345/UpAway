import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getPreviewProject } from '$lib/preview/projects.js';

/**
 * @param {unknown} value
 */
function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

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
    project,
    previewAccessRequired: Boolean(cleanString(env.PREVIEW_ACCESS_CODE))
  };
};
