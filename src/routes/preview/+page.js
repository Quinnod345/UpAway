import { previewProjects } from '$lib/preview/projects.js';

export const prerender = true;

export const load = () => {
  return {
    projects: previewProjects
  };
};
