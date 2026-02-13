<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import '../app.css';
  import Lenis from 'lenis';
  
  // Creative components
  import MouseFollower from '$lib/components/MouseFollower.svelte';
  import NoiseOverlay from '$lib/components/NoiseOverlay.svelte';
  import EasterEggs from '$lib/components/EasterEggs.svelte';

  let scrollY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let showCursor = false;
  let mounted = false;
  let navOpen = false;

  $: isScrolled = scrollY > 50;
  $: isInnerEcho = $page.url.pathname.includes('innerecho');
  $: isPrivacy = $page.url.pathname.includes('privacy');
  $: isEosAi = $page.url.pathname.includes('eosai');

  // Scroll to top on navigation and close mobile nav
  afterNavigate(({ from, to }) => {
    if (from?.url?.pathname !== to?.url?.pathname) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      navOpen = false;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }
  });

  onMount(() => {
    mounted = true;

    // Smooth Scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cursor glow effect
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      showCursor = true;
    };
    
    const handleMouseLeave = () => {
      showCursor = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  });
  
  function toggleNav() {
    navOpen = !navOpen;
    // Prevent body scroll when nav is open on mobile
    if (typeof document !== 'undefined') {
      document.body.style.overflow = navOpen ? 'hidden' : '';
    }
  }
</script>

<svelte:window bind:scrollY />

<!-- Custom Cursor -->
<MouseFollower />

<!-- Film Grain Overlay -->
<NoiseOverlay opacity={0.02} blend="overlay" />

<!-- Easter Eggs (Konami code, etc.) -->
<EasterEggs />

<!-- Cursor Glow (ambient) -->
{#if mounted && showCursor}
  <div 
    class="cursor-glow"
    style="left: {mouseX}px; top: {mouseY}px;"
  ></div>
{/if}

<!-- Floating Header -->
<header class="header" class:scrolled={isScrolled} class:nav-open={navOpen}>
  <div class="header-blur"></div>
  <nav class="nav container">
    <a href="/" class="logo">
      <img src="/UpAwayLogo.png" alt="UpAway" class="logo-img" />
      <span class="logo-text">UpAway</span>
    </a>
    
    <div class="nav-links" class:open={navOpen}>
      <a href="/#about" class="nav-link" on:click={() => navOpen = false}>
        <span class="nav-link-text">About</span>
        <span class="nav-link-line"></span>
      </a>
      <a href="/#work" class="nav-link" on:click={() => navOpen = false}>
        <span class="nav-link-text">Work</span>
        <span class="nav-link-line"></span>
      </a>
      <a href="/innerecho" class="nav-link" class:active={isInnerEcho} on:click={() => navOpen = false}>
        <span class="nav-link-text">InnerEcho</span>
        <span class="nav-link-line"></span>
      </a>
      <a href="/eosai" class="nav-link" class:active={isEosAi} on:click={() => navOpen = false}>
        <span class="nav-link-text">EOS AI</span>
        <span class="nav-link-line"></span>
      </a>
      <a href="/#contact" class="btn btn-nav" on:click={() => navOpen = false}>
        <span>Let's Talk</span>
        <svg class="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
    
    <button class="nav-toggle" class:open={navOpen} on:click={toggleNav} aria-label="Toggle navigation">
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
    </button>
  </nav>
</header>

{#key $page.url.pathname}
  <main 
    in:fly={{ y: 20, duration: 400, delay: 200, easing: cubicOut }}
    out:fade={{ duration: 200 }}
  >
    <slot />
  </main>
{/key}

<style>
  /* Cursor Glow */
  :global(.cursor-glow) {
    position: fixed;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(123, 148, 156, 0.08) 0%, transparent 60%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease;
  }

  @media (hover: none) {
    :global(.cursor-glow) {
      display: none;
    }
  }
  
  /* Header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.25rem 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .header-blur {
    position: absolute;
    inset: 0;
    background: transparent;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid transparent;
  }
  
  .header.scrolled .header-blur {
    background: rgba(24, 34, 65, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(123, 148, 156, 0.2);
  }
  
  .header.scrolled {
    padding: 0.75rem 0;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  /* Logo */
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
  }

  .logo-img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;
  }

  .logo-text {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-cream);
  }

  .logo:hover .logo-img {
    transform: scale(1.05);
  }
  
  /* Nav Links */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }
  
  .nav-link {
    position: relative;
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-cream);
    padding: 0.5rem 0;
    overflow: hidden;
  }
  
  .nav-link-text {
    position: relative;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .nav-link-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-link:hover .nav-link-line,
  .nav-link.active .nav-link-line {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  .nav-link:hover .nav-link-text {
    transform: translateY(-2px);
  }
  
  .nav-link.active {
    color: var(--color-accent);
  }
  
  /* Nav Button */
  .btn-nav {
    background: var(--color-accent);
    color: var(--color-dark);
    padding: 0.75rem 1.5rem;
    font-size: 0.85rem;
    gap: 0.5rem;
  }
  
  .btn-nav:hover {
    background: var(--color-cream);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(123, 148, 156, 0.3);
  }
  
  .btn-arrow {
    transition: transform 0.3s ease;
  }
  
  .btn-nav:hover .btn-arrow {
    transform: translateX(4px);
  }
  
  /* Mobile Nav Toggle */
  .nav-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 0.5rem;
    cursor: pointer;
    z-index: 100;
  }
  
  .toggle-line {
    width: 24px;
    height: 2px;
    background: var(--color-cream);
    transition: all 0.3s ease;
    transform-origin: center;
  }
  
  .nav-toggle.open .toggle-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  
  .nav-toggle.open .toggle-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  
  .nav-toggle.open .toggle-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
  
  /* Main */
  main {
    min-height: 100vh;
    width: 100%;
  }

  main > :global(*) {
    width: 100%;
    max-width: 100%;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .header {
      padding: 0.9rem 0;
    }

    .header.scrolled {
      padding: 0.6rem 0;
    }

    .logo-img {
      height: 34px;
    }

    .logo-text {
      font-size: 1.1rem;
    }

    .nav-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border-radius: 10px;
    }
    
    .nav-links {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: auto;
      max-width: none;
      min-height: 100dvh;
      height: 100dvh;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1.25rem;
      background: var(--color-dark);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-0.5rem);
      transition:
        opacity 0.25s ease,
        transform 0.25s ease,
        visibility 0s linear 0.25s;
      padding-top: calc(4.5rem + var(--safe-area-top));
      padding-right: max(1.5rem, var(--safe-area-right));
      padding-bottom: max(2rem, var(--safe-area-bottom));
      padding-left: max(1.5rem, var(--safe-area-left));
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    .nav-links.open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0);
      transition-delay: 0s;
    }
    
    .nav-link {
      font-size: clamp(1.15rem, 5.5vw, 1.4rem);
      width: 100%;
    }
    
    .btn-nav {
      margin-top: 0.75rem;
      min-height: 44px;
    }
  }

  @media (max-width: 480px) {
    .header {
      padding: 0.75rem 0;
    }

    .header.scrolled {
      padding: 0.55rem 0;
    }

    .logo-img {
      height: 30px;
    }

    .logo-text {
      font-size: 1rem;
    }

    .nav-links {
      gap: 1rem;
      padding-top: calc(4rem + var(--safe-area-top));
      padding-right: max(1rem, var(--safe-area-right));
      padding-left: max(1rem, var(--safe-area-left));
    }

    .btn-nav {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 390px) {
    .nav-link {
      font-size: 1.05rem;
    }

    .logo-text {
      font-size: 0.95rem;
    }

    .logo-img {
      height: 28px;
    }
  }

  @media (max-width: 320px) {
    .nav-link {
      font-size: 0.95rem;
    }

    .logo-text {
      font-size: 0.88rem;
    }
  }
</style>
