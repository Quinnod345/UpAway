<script>
  import { onMount } from 'svelte';

  /**
   * @typedef {{
   *   id: string;
   *   label: string;
   *   detail?: string;
   *   href?: string;
   *   ok?: boolean;
   *   status?: string;
   *   message?: string;
   *   responseMs?: number;
   * }} PreviewServiceStatus
   *
   * @typedef {{
   *   ready?: boolean;
   *   openUrl?: string;
   *   services?: PreviewServiceStatus[];
   *   error?: string;
   * }} PreviewStatus
   */

  /** @type {{ project: { slug: string; name: string; description: string; targetUrl: string; runner?: { label?: string } }; previewAccessRequired?: boolean }} */
  export let data;

  /** @type {PreviewStatus} */
  let status = {};
  let phase = 'Starting preview stack';
  let errorMessage = '';
  let opening = false;
  let token = '';
  let runnerUrl = '';
  let targetUrl = '';
  let accessCode = '';
  let accessError = '';
  let accessRequired = false;
  let hasAccess = false;

  $: services = status.services || [];
  $: manualOpenUrl = targetUrl || status.openUrl || data.project.targetUrl;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    token = params.get('token') || '';
    runnerUrl = cleanHttpUrl(params.get('runner'));
    targetUrl = cleanHttpUrl(params.get('target') || params.get('openUrl'));
    accessRequired = Boolean(data.previewAccessRequired || (runnerUrl && !token));
    hasAccess = !accessRequired;

    if (hasAccess) {
      launchPreview();
    } else {
      phase = 'Access code required';
    }
  });

  async function launchPreview() {
    if (accessRequired && !hasAccess) {
      return;
    }

    errorMessage = '';
    phase = 'Starting database, API, UI, docs, and Storybook';

    try {
      const response = await fetch(previewApiUrl('start'), {
        method: 'POST',
        headers: previewHeaders()
      });
      const body = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          lockPreview('That code did not unlock this preview.');
          return;
        }

        throw new Error(body?.error || 'Unable to start preview stack.');
      }

      status = body.status || {};
      phase = status.ready ? 'Preview stack is ready' : 'Waiting for services';

      const readyUrl = targetUrl || status.openUrl || '';

      if (status.ready && readyUrl) {
        openWhenReady(readyUrl);
      } else {
        pollUntilReady();
      }
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to start preview stack.';
      phase = 'Runner needs attention';
      pollUntilReady();
    }
  }

  async function pollUntilReady() {
    if (opening) {
      return;
    }

    const interval = window.setInterval(async () => {
      try {
        const response = await fetch(previewApiUrl('status'), {
          headers: previewHeaders()
        });
        const body = await response.json();
        status = body;

        if (!response.ok) {
          if (response.status === 401) {
            window.clearInterval(interval);
            lockPreview('That code did not unlock this preview.');
            return;
          }

          errorMessage = body?.error || errorMessage;
          return;
        }

        const readyUrl = targetUrl || body.openUrl || '';

        if (body.ready && readyUrl) {
          window.clearInterval(interval);
          phase = 'Preview stack is ready';
          openWhenReady(readyUrl);
        }
      } catch (error) {
        errorMessage = error instanceof Error ? error.message : 'Unable to read preview status.';
      }
    }, 2000);
  }

  function unlockPreview() {
    if (!accessCode.trim()) {
      accessError = 'Enter the preview code.';
      return;
    }

    accessError = '';
    hasAccess = true;
    launchPreview();
  }

  /** @param {string} message */
  function lockPreview(message) {
    hasAccess = false;
    opening = false;
    phase = 'Access code required';
    accessError = message;
  }

  /** @param {string} url */
  function openWhenReady(url) {
    opening = true;
    phase = 'Opening full app';
    window.setTimeout(() => {
      window.location.href = url;
    }, 1200);
  }

  /** @param {'start' | 'status'} action */
  function previewApiUrl(action) {
    const path = `/api/preview/${data.project.slug}/${action}`;
    const url = runnerUrl ? new URL(path, `${runnerUrl}/`) : new URL(path, window.location.origin);

    return runnerUrl ? url.toString() : `${url.pathname}${url.search}`;
  }

  function previewHeaders() {
    /** @type {Record<string, string>} */
    const headers = {};

    if (token) {
      headers['x-preview-token'] = token;
    }

    if (accessCode.trim()) {
      headers['x-preview-access-code'] = accessCode.trim();
    }

    return headers;
  }

  /** @param {string | null} value */
  function cleanHttpUrl(value) {
    if (!value) {
      return '';
    }

    try {
      const url = new URL(value);

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return '';
      }

      return url.toString();
    } catch {
      return '';
    }
  }

  /** @param {PreviewServiceStatus} service */
  function serviceClass(service) {
    if (service.ok) return 'ready';
    if (service.status === 'timeout' || service.status === 'unreachable') return 'starting';
    return 'pending';
  }
</script>

<svelte:head>
  <title>{data.project.name} Preview | UpAway</title>
  <meta name="robots" content="noindex,nofollow,noarchive" />
</svelte:head>

<section class="launch-page">
  <div class="launch-texture" />

  <div class="container launch-shell">
    <a href="/preview" class="back-link">Preview hub</a>

    <div class="launch-grid">
      <header class="launch-hero">
        <p class="launch-eyebrow">{data.project.runner?.label || 'Preview runner'}</p>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>
      </header>

      {#if accessRequired && !hasAccess}
        <section class="launch-panel access-panel" aria-live="polite">
          <form class="access-gate" on:submit|preventDefault={unlockPreview}>
            <div>
              <p class="status-label">Private preview</p>
              <h2>Enter the preview code</h2>
            </div>

            <label for="preview-access-code">Access code</label>
            <input
              id="preview-access-code"
              bind:value={accessCode}
              type="password"
              inputmode="text"
              autocomplete="one-time-code"
            />

            {#if accessError}
              <div class="runner-error">{accessError}</div>
            {/if}

            <button type="submit" disabled={!accessCode.trim()}>Unlock preview</button>
          </form>
        </section>
      {:else}
        <section class="launch-panel" aria-live="polite">
          <div class="launch-status">
            <div class:ready={status.ready} class="status-light" />
            <div>
              <p class="status-label">{phase}</p>
              <h2>{status.ready ? 'All required services are up' : 'Bringing the stack online'}</h2>
            </div>
          </div>

          {#if errorMessage}
            <div class="runner-error">{errorMessage}</div>
          {/if}

          <div class="service-status-list">
            {#each services as service}
              <div class="service-status {serviceClass(service)}">
                <div>
                  <span>{service.label}</span>
                  <small>{service.detail || service.href || service.message || 'Checking'}</small>
                </div>
                <strong>{service.ok ? 'Ready' : service.status || 'Starting'}</strong>
              </div>
            {/each}
          </div>

          <div class="launch-actions">
            <a class="manual-open" href={manualOpenUrl} target="_blank" rel="noopener noreferrer">
              Open target directly
            </a>
            <button type="button" on:click={launchPreview}>Restart checks</button>
          </div>
        </section>
      {/if}
    </div>
  </div>
</section>

<style>
  .launch-page {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background: var(--color-bg-dark);
    color: var(--color-text-light);
  }

  .launch-page :global(h1),
  .launch-page :global(h2) {
    letter-spacing: 0;
  }

  .launch-texture {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(255, 245, 217, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 245, 217, 0.04) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  .launch-shell {
    position: relative;
    z-index: 1;
    padding-top: calc(var(--header-height) + var(--space-xl));
    padding-bottom: var(--space-xl);
  }

  .back-link,
  .launch-eyebrow,
  .status-label {
    font-family: var(--font-heading);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .back-link {
    display: inline-flex;
    margin-bottom: var(--space-md);
    color: var(--color-accent-light);
  }

  .launch-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(360px, 0.7fr);
    gap: clamp(2rem, 5vw, 5rem);
    align-items: start;
  }

  .launch-hero {
    max-width: 720px;
  }

  .launch-eyebrow {
    color: var(--color-accent-light);
    margin-bottom: 1rem;
  }

  .launch-hero h1 {
    margin-bottom: 1.25rem;
    font-size: clamp(3rem, 8vw, 6rem);
  }

  .launch-hero p {
    max-width: 58ch;
    color: rgba(255, 245, 217, 0.76);
  }

  .launch-panel {
    display: grid;
    gap: 1rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border: 1px solid rgba(255, 245, 217, 0.16);
    border-radius: 8px;
    background: rgba(24, 34, 65, 0.78);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(18px);
  }

  .launch-status {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-items: start;
  }

  .status-light {
    width: 14px;
    height: 14px;
    margin-top: 0.4rem;
    border-radius: 50%;
    background: #f7c948;
    box-shadow: 0 0 0 8px rgba(247, 201, 72, 0.12);
  }

  .status-light.ready {
    background: #68d391;
    box-shadow: 0 0 0 8px rgba(104, 211, 145, 0.12);
  }

  .status-label {
    color: rgba(255, 245, 217, 0.54);
    margin-bottom: 0.35rem;
  }

  .launch-panel h2 {
    font-size: clamp(1.45rem, 3vw, 2rem);
  }

  .access-gate {
    display: grid;
    gap: 1rem;
  }

  .access-gate label {
    color: rgba(255, 245, 217, 0.72);
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 700;
  }

  .access-gate input {
    width: 100%;
    min-height: 50px;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(255, 245, 217, 0.2);
    border-radius: 8px;
    background: rgba(255, 245, 217, 0.08);
    color: var(--color-cream);
    font: inherit;
    outline: none;
  }

  .access-gate input:focus {
    border-color: rgba(126, 211, 232, 0.76);
    box-shadow: 0 0 0 3px rgba(126, 211, 232, 0.14);
  }

  .access-gate button {
    min-height: 48px;
    border: 0;
    border-radius: 8px;
    background: var(--color-cream);
    color: var(--color-dark);
    font-family: var(--font-heading);
    font-weight: 700;
    cursor: pointer;
  }

  .access-gate button:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .runner-error {
    padding: 0.9rem 1rem;
    border: 1px solid rgba(255, 160, 122, 0.35);
    border-radius: 8px;
    background: rgba(255, 160, 122, 0.08);
    color: #ffd8cb;
  }

  .service-status-list {
    display: grid;
    gap: 0.7rem;
  }

  .service-status {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.9rem;
    border: 1px solid rgba(255, 245, 217, 0.14);
    border-radius: 8px;
    background: rgba(255, 245, 217, 0.04);
  }

  .service-status.ready {
    border-color: rgba(104, 211, 145, 0.35);
    background: rgba(104, 211, 145, 0.08);
  }

  .service-status.starting {
    border-color: rgba(247, 201, 72, 0.28);
  }

  .service-status span,
  .service-status strong {
    color: var(--color-cream);
    font-family: var(--font-heading);
    font-weight: 700;
  }

  .service-status small {
    display: block;
    margin-top: 0.2rem;
    overflow-wrap: anywhere;
    color: rgba(255, 245, 217, 0.56);
  }

  .service-status strong {
    flex: 0 0 auto;
    font-size: 0.85rem;
  }

  .launch-actions {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.7rem;
  }

  .launch-actions a,
  .launch-actions button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    font-family: var(--font-heading);
    font-weight: 700;
  }

  .manual-open {
    background: var(--color-cream);
    color: var(--color-dark);
  }

  .launch-actions button {
    border: 1px solid rgba(255, 245, 217, 0.18);
    background: rgba(255, 245, 217, 0.06);
    color: var(--color-cream);
  }

  @media (max-width: 860px) {
    .launch-grid,
    .launch-actions {
      grid-template-columns: 1fr;
    }
  }
</style>
