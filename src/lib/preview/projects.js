const env = import.meta.env || {};

/**
 * @param {unknown} value
 * @returns {string}
 */
function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

const truespacePublicUrl = clean(env.VITE_PREVIEW_TRUESPACE_URL);
const truespaceLocalUrl = clean(env.VITE_PREVIEW_TRUESPACE_LOCAL_URL) || 'http://127.0.0.1:3000';
const truespaceApiUrl =
  clean(env.VITE_PREVIEW_TRUESPACE_API_URL) || 'http://127.0.0.1:7777/v1/heartbeat';
const truespaceDocsUrl = clean(env.VITE_PREVIEW_TRUESPACE_DOCS_URL) || 'http://127.0.0.1:8888';
const truespaceStorybookUrl =
  clean(env.VITE_PREVIEW_TRUESPACE_STORYBOOK_URL) || 'http://127.0.0.1:6006';

export const previewProjects = [
  {
    slug: 'truespace-v2',
    name: 'TrueSpace v2',
    label: 'Customer app',
    state: truespacePublicUrl ? 'Public link configured' : 'Local link',
    targetKind: truespacePublicUrl ? 'public' : 'local',
    targetUrl: truespacePublicUrl || truespaceLocalUrl,
    sourceLabel: '~/truespace-v2',
    sourcePath: '/Users/quinnodonnell/truespace-v2',
    appPath: 'ts/apps/truespace',
    runCommand: 'cd /Users/quinnodonnell/truespace-v2 && mprocs',
    description:
      'TanStack Start customer frontend backed by the Falcon API, local Postgres, docs, and optional Storybook.',
    stack: ['TanStack Start', 'React', 'Falcon API', 'Postgres'],
    services: [
      {
        label: 'Full app',
        href: truespacePublicUrl || truespaceLocalUrl,
        detail: truespacePublicUrl ? 'Public preview target' : '127.0.0.1:3000'
      },
      {
        label: 'API heartbeat',
        href: truespaceApiUrl,
        detail: '127.0.0.1:7777/v1/heartbeat'
      },
      {
        label: 'Docs',
        href: truespaceDocsUrl,
        detail: '127.0.0.1:8888'
      },
      {
        label: 'Storybook',
        href: truespaceStorybookUrl,
        detail: '127.0.0.1:6006'
      }
    ]
  }
];

/**
 * @param {string} slug
 */
export function getPreviewProject(slug) {
  return previewProjects.find((project) => project.slug === slug);
}
