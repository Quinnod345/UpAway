const env = import.meta.env || {};

/**
 * @param {unknown} value
 * @returns {string}
 */
function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

const truespacePublicUrl = clean(env.VITE_PREVIEW_TRUESPACE_URL);
const truespaceLocalUrl = clean(env.VITE_PREVIEW_TRUESPACE_LOCAL_URL) || 'http://localhost:3000';
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
    launchPath: '/preview/truespace-v2',
    sourceLabel: '~/truespace-v2',
    sourcePath: '/Users/quinnodonnell/truespace-v2',
    appPath: 'ts/apps/truespace',
    runCommand: 'Launch from UpAway preview runner',
    description:
      'TanStack Start customer frontend backed by Postgres, the Falcon API, docs, and Storybook.',
    stack: ['TanStack Start', 'React', 'Falcon API', 'Postgres'],
    services: [
      {
        id: 'database',
        kind: 'tcp',
        label: 'Database',
        href: '',
        detail: 'localhost:5432',
        host: '127.0.0.1',
        port: 5432,
        required: true
      },
      {
        id: 'web',
        kind: 'http',
        label: 'Full app',
        href: truespacePublicUrl || truespaceLocalUrl,
        detail: truespacePublicUrl ? 'Public preview target' : 'localhost:3000',
        required: true
      },
      {
        id: 'api',
        kind: 'http',
        label: 'API heartbeat',
        href: truespaceApiUrl,
        detail: '127.0.0.1:7777/v1/heartbeat',
        required: true
      },
      {
        id: 'docs',
        kind: 'http',
        label: 'Docs',
        href: truespaceDocsUrl,
        detail: '127.0.0.1:8888',
        required: true
      },
      {
        id: 'storybook',
        kind: 'http',
        label: 'Storybook',
        href: truespaceStorybookUrl,
        detail: '127.0.0.1:6006',
        required: true
      }
    ],
    runner: {
      kind: 'local-process',
      label: 'Full local stack',
      repoPath: '/Users/quinnodonnell/truespace-v2',
      openServiceId: 'web',
      setupCommands: [
        {
          id: 'database-setup',
          label: 'Start Postgres container',
          command: 'bash',
          args: ['scripts/preview/truespace-database.sh']
        }
      ],
      commands: [
        {
          id: 'api',
          label: 'Falcon API',
          command: 'bash',
          args: ['scripts/preview/truespace-api.sh'],
          serviceIds: ['api']
        },
        {
          id: 'web',
          label: 'TanStack UI',
          command: 'bash',
          args: ['scripts/preview/truespace-web.sh'],
          serviceIds: ['web']
        },
        {
          id: 'docs',
          label: 'Docs server',
          command: 'bash',
          args: ['scripts/preview/truespace-docs.sh'],
          serviceIds: ['docs']
        },
        {
          id: 'storybook',
          label: 'Storybook',
          command: 'bash',
          args: ['scripts/preview/truespace-storybook.sh'],
          serviceIds: ['storybook']
        }
      ]
    }
  }
];

/**
 * @param {string} slug
 */
export function getPreviewProject(slug) {
  return previewProjects.find((project) => project.slug === slug);
}
