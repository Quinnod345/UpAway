# UpAway Website (SvelteKit)

This repository contains the UpAway portfolio website for Quinn O'Donnell.  
It showcases shipped products, background/about content, and a contact flow.

## What the site includes

- Landing page at `/` with:
  - Hero and service positioning
  - Featured work (InnerEcho, EOS AI, optional Curb section)
  - Contact section that submits to `/api/contact`
- Product/project pages:
  - `/innerecho` - mental health journaling app showcase
  - `/eosai` - EOS AI product showcase
  - `/curb` - real estate listing generator showcase
- Additional pages:
  - `/about` - personal background and experience
  - `/preview` - unlisted preview hub for full apps in other codebases
  - `/privacy-policy` - InnerEcho privacy policy
  - `/terms-of-service` - InnerEcho terms
  - `/todos` - legacy SvelteKit todo demo route

## Feature flags

- `src/lib/featureFlags.js`
  - `SHOW_CURB_ON_LANDING` controls whether Curb appears on the home page.
  - The `/curb` route still exists regardless of this flag.

## Preview hub

`/preview` is an unlisted, noindex page for launching full apps from other
codebases. Each preview lives in `src/lib/preview/projects.js`, and each slug gets
a stable launcher link at `/preview/[slug]`.

The first entry is `truespace-v2`:

- Source checkout: `/Users/quinnodonnell/truespace-v2`
- App path: `ts/apps/truespace`
- Automatic runner scripts: `scripts/preview/truespace-*.sh`
- Runner services: Postgres, Falcon API, TanStack UI, docs, Storybook
- Local full app: `http://localhost:3000`
- API heartbeat: `http://127.0.0.1:7777/v1/heartbeat`
- Docs: `http://127.0.0.1:8888`
- Storybook: `http://127.0.0.1:6006`

The launcher calls `/api/preview/[slug]/start`, which starts the allowlisted
commands for that project and polls `/api/preview/[slug]/status` until required
services are healthy. In local development the runner is enabled by default.

Vercel can serve `upaway.dev/preview`, but it cannot run Postgres, Vite,
uvicorn, Storybook, or other long-lived app servers. For the live site, use
Vercel as the public control plane and point it at a runner host that can keep
processes alive.

On the runner host:

```bash
PREVIEW_RUNNER_TOKEN=... scripts/preview/upaway-runner-host.sh
```

To use the local Mac as the runner through a temporary Cloudflare tunnel:

```bash
PREVIEW_RUNNER_TOKEN=... scripts/preview/upaway-runner-tunnel.sh
```

Expose the runner with a stable tunnel or private URL, then set these on the
public UpAway deployment:

```bash
PREVIEW_REMOTE_RUNNER_URL=https://your-runner-host.example
PREVIEW_RUNNER_TOKEN=...
```

Do not enable `PREVIEW_RUNNER_ENABLED` on Vercel; the Vercel deployment should
proxy to the runner host instead of trying to spawn local processes.

Then open `https://www.upaway.dev/preview/truespace-v2?token=...`. The public
site forwards start/status requests to the runner host, and the browser opens
the app at the configured preview target when all services are ready. For a
public show-and-tell target, set `VITE_PREVIEW_TRUESPACE_URL` to a reachable URL
before building UpAway; otherwise the local target is `http://localhost:3000`.

## Contact form API

The landing page contact form posts to `src/routes/api/contact/+server.js`.

Current behavior:

- Validates required fields (`name`, `email`, `message`)
- Uses a hidden honeypot field (`company`) to reduce bot submissions
- Applies per-IP rate limiting (5 submissions per 10 minutes)
- Sends email through Resend to `support@upaway.dev`

### Environment variables

Copy `.env.example` to `.env.local` and set values:

```bash
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=contact@eosbot.ai
CONTACT_FROM_NAME=Upaway Contact
VITE_PREVIEW_TRUESPACE_URL=...

# Public UpAway deployment
PREVIEW_RUNNER_TOKEN=...
PREVIEW_REMOTE_RUNNER_URL=...

# Runner host only
PREVIEW_RUNNER_ENABLED=true
```

If `RESEND_API_KEY` is missing, the contact endpoint will return a configuration error.

## Tech stack

- SvelteKit + Vite
- Svelte component-driven UI with custom interactive effects
- Lenis smooth scrolling
- Resend for contact email delivery

## Local development

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview
```

## Useful scripts

- `pnpm dev` - start local dev server
- `pnpm build` - create production build
- `pnpm preview` - preview built app
- `pnpm check` - run Svelte type/check pass
- `pnpm lint` - run Prettier check
- `pnpm format` - format with Prettier
