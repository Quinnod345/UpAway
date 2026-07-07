<script>
  import { onMount } from 'svelte';

  /**
   * @typedef {{
   *   id: string;
   *   kind?: string;
   *   label: string;
   *   href: string;
   *   detail: string;
   *   required?: boolean;
   * }} PreviewService
   *
   * @typedef {{
   *   slug: string;
   *   name: string;
   *   label: string;
   *   state: string;
   *   targetKind: string;
   *   targetUrl: string;
   *   launchPath?: string;
   *   sourceLabel: string;
   *   sourcePath: string;
   *   appPath: string;
   *   runCommand: string;
   *   description: string;
   *   stack: string[];
   *   services: PreviewService[];
   * }} PreviewProject
   */

  /** @type {{ projects: PreviewProject[] }} */
  export let data = { projects: [] };

  let launchSearch = '';

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const launchParams = new URLSearchParams();

    for (const key of ['runner', 'target', 'openUrl', 'token']) {
      const value = params.get(key);

      if (value) {
        launchParams.set(key, value);
      }
    }

    const serialized = launchParams.toString();
    launchSearch = serialized ? `?${serialized}` : '';
  });

  /** @param {PreviewProject} project */
  function launchHref(project) {
    return `${project.launchPath || `/preview/${project.slug}`}${launchSearch}`;
  }
</script>

<svelte:head>
  <title>Preview Links | UpAway</title>
  <meta
    name="description"
    content="Unlisted UpAway preview links for full apps running from other codebases."
  />
  <meta name="robots" content="noindex,nofollow,noarchive" />
</svelte:head>

<section class="preview-page">
  <div class="preview-texture" />

  <div class="container preview-shell">
    <header class="preview-hero">
      <p class="preview-eyebrow">Private Preview Links</p>
      <h1>Full Apps From Other Codebases</h1>
      <p>
        Stable launch links for standalone projects. Each card points at the actual running app
        instead of a portfolio mockup.
      </p>
    </header>

    <div class="preview-grid">
      {#each data.projects as project}
        <article class="preview-card">
          <div class="preview-card-top">
            <div>
              <p class="preview-kicker">{project.label}</p>
              <h2>{project.name}</h2>
            </div>
            <span class:local={project.targetKind === 'local'} class="preview-state">
              {project.state}
            </span>
          </div>

          <p class="preview-description">{project.description}</p>

          <div class="preview-meta">
            <div>
              <span class="meta-label">Source</span>
              <span class="meta-value">{project.sourceLabel}</span>
            </div>
            <div>
              <span class="meta-label">App</span>
              <span class="meta-value">{project.appPath}</span>
            </div>
          </div>

          <div class="stack-list" aria-label="{project.name} stack">
            {#each project.stack as item}
              <span>{item}</span>
            {/each}
          </div>

          <div class="preview-actions">
            <a
              class="preview-primary"
              href={launchHref(project)}
              target="_blank"
              rel="noopener noreferrer"
              data-sveltekit-reload
            >
              <span>Launch Full Stack</span>
              <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 14L14 4M14 4H6M14 4V12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>

          <div class="service-links">
            {#each project.services as service}
              {#if service.href}
                <a href={service.href} target="_blank" rel="noopener noreferrer">
                  <span>{service.label}</span>
                  <small>{service.detail}</small>
                </a>
              {:else}
                <div class="service-link-static">
                  <span>{service.label}</span>
                  <small>{service.detail}</small>
                </div>
              {/if}
            {/each}
          </div>

          <div class="run-command">
            <span>Runner</span>
            <code>{project.runCommand}</code>
          </div>
        </article>
      {/each}
    </div>

    <section class="preview-runbook" aria-label="Preview registry notes">
      <div>
        <p class="preview-kicker">Registry</p>
        <h2>Add The Next Codebase</h2>
      </div>
      <p>
        Add another object in <code>src/lib/preview/projects.js</code>, including its services,
        health checks, and allowlisted launch commands. Use <code>/preview/[slug]</code> as the stable
        UpAway link.
      </p>
    </section>
  </div>
</section>

<style>
  .preview-page {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(255, 245, 217, 0.04), rgba(123, 148, 156, 0.08)),
      var(--color-bg-dark);
    color: var(--color-text-light);
  }

  .preview-page :global(h1),
  .preview-page :global(h2),
  .preview-page :global(h3) {
    letter-spacing: 0;
  }

  .preview-texture {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(255, 245, 217, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 245, 217, 0.04) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 80%);
  }

  .preview-shell {
    position: relative;
    z-index: 1;
    padding-top: calc(var(--header-height) + var(--space-xl));
    padding-bottom: var(--space-xl);
  }

  .preview-hero {
    max-width: 760px;
    margin-bottom: var(--space-lg);
  }

  .preview-eyebrow,
  .preview-kicker,
  .meta-label,
  .run-command span {
    font-family: var(--font-heading);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .preview-eyebrow {
    color: var(--color-accent-light);
    margin-bottom: 1rem;
  }

  .preview-hero h1 {
    max-width: 680px;
    margin-bottom: 1.25rem;
    font-size: clamp(2.8rem, 7vw, 5.75rem);
  }

  .preview-hero p:last-child {
    max-width: 640px;
    color: rgba(255, 245, 217, 0.78);
  }

  .preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
    gap: 1rem;
  }

  .preview-card {
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    min-height: 560px;
    padding: clamp(1.25rem, 3vw, 2rem);
    border: 1px solid rgba(255, 245, 217, 0.16);
    border-radius: 8px;
    background: rgba(24, 34, 65, 0.78);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(18px);
  }

  .preview-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .preview-kicker {
    color: var(--color-accent-light);
    margin-bottom: 0.45rem;
  }

  .preview-card h2,
  .preview-runbook h2 {
    font-size: clamp(1.75rem, 3vw, 2.4rem);
  }

  .preview-state {
    flex: 0 0 auto;
    padding: 0.45rem 0.7rem;
    border: 1px solid rgba(123, 148, 156, 0.45);
    border-radius: 999px;
    color: var(--color-cream);
    background: rgba(123, 148, 156, 0.18);
    font-family: var(--font-heading);
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .preview-state.local {
    border-color: rgba(255, 245, 217, 0.28);
    background: rgba(255, 245, 217, 0.08);
  }

  .preview-description {
    max-width: 60ch;
    color: rgba(255, 245, 217, 0.75);
  }

  .preview-meta {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .preview-meta > div {
    min-width: 0;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(255, 245, 217, 0.14);
  }

  .meta-label {
    display: block;
    color: rgba(255, 245, 217, 0.48);
  }

  .meta-value {
    display: block;
    overflow-wrap: anywhere;
    color: var(--color-cream);
    font-family: var(--font-heading);
    font-size: 0.98rem;
    font-weight: 600;
  }

  .stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stack-list span {
    padding: 0.45rem 0.7rem;
    border: 1px solid rgba(123, 148, 156, 0.35);
    border-radius: 999px;
    color: rgba(255, 245, 217, 0.84);
    background: rgba(83, 108, 124, 0.18);
    font-size: 0.86rem;
  }

  .preview-actions {
    margin-top: auto;
  }

  .preview-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    min-height: 52px;
    padding: 0.95rem 1.2rem;
    border-radius: 8px;
    background: var(--color-cream);
    color: var(--color-dark);
    font-family: var(--font-heading);
    font-weight: 700;
  }

  .preview-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 40px rgba(255, 245, 217, 0.18);
  }

  .action-icon {
    flex: 0 0 auto;
  }

  .service-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
  }

  .service-links a,
  .service-link-static {
    display: flex;
    min-height: 74px;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.8rem;
    border: 1px solid rgba(255, 245, 217, 0.14);
    border-radius: 8px;
    background: rgba(255, 245, 217, 0.04);
  }

  .service-links a:hover {
    border-color: rgba(123, 148, 156, 0.55);
    background: rgba(123, 148, 156, 0.12);
  }

  .service-links span,
  .service-link-static span {
    color: var(--color-cream);
    font-family: var(--font-heading);
    font-weight: 700;
  }

  .service-links small,
  .service-link-static small {
    overflow-wrap: anywhere;
    color: rgba(255, 245, 217, 0.55);
    font-size: 0.78rem;
  }

  .run-command {
    display: grid;
    gap: 0.45rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 245, 217, 0.14);
  }

  .run-command span {
    color: rgba(255, 245, 217, 0.5);
  }

  .run-command code,
  .preview-runbook code {
    overflow-wrap: anywhere;
    color: var(--color-cream);
    font-family: var(--font-heading);
  }

  .run-command code {
    padding: 0.85rem;
    border: 1px solid rgba(255, 245, 217, 0.14);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
  }

  .preview-runbook {
    display: grid;
    grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.2fr);
    gap: 1.5rem;
    margin-top: var(--space-md);
    padding: 2rem 0 0;
    border-top: 1px solid rgba(255, 245, 217, 0.18);
  }

  .preview-runbook p:last-child {
    color: rgba(255, 245, 217, 0.75);
  }

  .preview-runbook code {
    font-size: 0.95em;
  }

  @media (max-width: 760px) {
    .preview-shell {
      padding-top: calc(var(--header-height) + var(--space-lg));
    }

    .preview-card {
      min-height: auto;
    }

    .preview-card-top,
    .preview-runbook {
      grid-template-columns: 1fr;
    }

    .preview-card-top {
      flex-direction: column;
    }

    .preview-state {
      white-space: normal;
    }

    .preview-meta,
    .service-links {
      grid-template-columns: 1fr;
    }
  }
</style>
