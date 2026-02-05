<script>
  import { onMount, onDestroy } from 'svelte';
  import { spring } from 'svelte/motion';
  
  export let href = '';
  export let type = 'button';
  export let variant = 'primary'; // primary, outline, ghost
  export let size = 'md'; // sm, md, lg
  export let magnetic = true;
  export let bounce = true;
  export let strength = 0.15; // How much the button follows cursor (0-1)
  
  const browser = typeof window !== 'undefined';
  
  let buttonEl;
  let isHovering = false;
  let boundingRect = null;
  
  // Premium spring: quick response, critically damped (no bounce)
  const position = spring({ x: 0, y: 0 }, {
    stiffness: 0.25,
    damping: 0.9
  });
  
  // Text has slightly slower response for parallax depth
  const textPosition = spring({ x: 0, y: 0 }, {
    stiffness: 0.2,
    damping: 0.85
  });
  
  // Max movement in pixels - keep it subtle!
  const MAX_MOVE = 8;
  const TEXT_MOVE_RATIO = 0.4; // Text moves 40% as much
  
  function handleMouseMove(e) {
    if (!magnetic || !buttonEl || !isHovering) return;
    
    const rect = boundingRect || buttonEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from cursor to button center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Scale the movement by strength and clamp to max
    let moveX = deltaX * strength;
    let moveY = deltaY * strength;
    
    // Clamp to max movement
    const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
    if (magnitude > MAX_MOVE) {
      const scale = MAX_MOVE / magnitude;
      moveX *= scale;
      moveY *= scale;
    }
    
    position.set({ x: moveX, y: moveY });
    textPosition.set({ 
      x: moveX * TEXT_MOVE_RATIO, 
      y: moveY * TEXT_MOVE_RATIO 
    });
  }
  
  function handleMouseEnter(e) {
    isHovering = true;
    boundingRect = buttonEl?.getBoundingClientRect() || null;
    handleMouseMove(e);
  }
  
  function handleMouseLeave() {
    isHovering = false;
    boundingRect = null;
    position.set({ x: 0, y: 0 });
    textPosition.set({ x: 0, y: 0 });
  }
  
  function handleClick(e) {
    if (!bounce || !browser) return;
    
    const rect = buttonEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    buttonEl.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  // Update rect on scroll
  function handleScroll() {
    if (isHovering && buttonEl) {
      boundingRect = buttonEl.getBoundingClientRect();
    }
  }
  
  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  });
  
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

{#if href}
  <a 
    {href}
    bind:this={buttonEl}
    class="magnetic-btn {variant} {size}"
    class:hovering={isHovering}
    data-magnetic
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:mousemove={handleMouseMove}
    on:click={handleClick}
    style="transform: translate3d({$position.x}px, {$position.y}px, 0)"
  >
    <span 
      class="btn-content"
      style="transform: translate3d({$textPosition.x}px, {$textPosition.y}px, 0)"
    >
      <slot />
    </span>
    <span class="btn-bg"></span>
    <span class="btn-shine"></span>
  </a>
{:else}
  <button 
    {type}
    bind:this={buttonEl}
    class="magnetic-btn {variant} {size}"
    class:hovering={isHovering}
    data-magnetic
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:mousemove={handleMouseMove}
    on:click={handleClick}
    style="transform: translate3d({$position.x}px, {$position.y}px, 0)"
  >
    <span 
      class="btn-content"
      style="transform: translate3d({$textPosition.x}px, {$textPosition.y}px, 0)"
    >
      <slot />
    </span>
    <span class="btn-bg"></span>
    <span class="btn-shine"></span>
  </button>
{/if}

<style>
  .magnetic-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    font-family: var(--font-heading, 'Space Grotesk', sans-serif);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    transition: box-shadow 0.4s ease;
    will-change: transform;
    /* GPU acceleration */
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  
  .btn-content {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    will-change: transform;
    transform: translate3d(0, 0, 0);
  }
  
  .btn-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    z-index: 1;
    transition: left 0.6s ease;
  }
  
  .magnetic-btn:hover .btn-shine {
    left: 100%;
  }
  
  /* Ripple effect */
  :global(.magnetic-btn .ripple) {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple-effect 0.6s ease-out forwards;
    pointer-events: none;
    z-index: 1;
  }
  
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Variants */
  .primary {
    background: var(--color-sage, #7B949C);
    color: var(--color-dark, #182241);
  }
  
  .primary .btn-bg {
    background: var(--color-sage, #7B949C);
  }
  
  .primary:hover {
    box-shadow: 0 10px 40px rgba(123, 148, 156, 0.4);
  }
  
  .outline {
    background: transparent;
    color: var(--color-cream, #FFF5D9);
    border: 2px solid currentColor;
  }
  
  .outline .btn-bg {
    background: var(--color-cream, #FFF5D9);
    transform: scaleX(0);
    transform-origin: right;
  }
  
  .outline:hover .btn-bg {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  .outline:hover {
    color: var(--color-dark, #182241);
    border-color: var(--color-cream, #FFF5D9);
  }
  
  .ghost {
    background: transparent;
    color: var(--color-cream, #FFF5D9);
  }
  
  .ghost .btn-bg {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(0);
    border-radius: 50%;
  }
  
  .ghost:hover .btn-bg {
    transform: scale(1.5);
  }
  
  /* Sizes */
  .sm {
    padding: 0.6rem 1.2rem;
    font-size: 0.75rem;
  }
  
  .lg {
    padding: 1.25rem 2.5rem;
    font-size: 1rem;
  }
  
  /* Hover state */
  .hovering {
    z-index: 10;
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    .magnetic-btn {
      transform: none !important;
    }
    .btn-content {
      transform: none !important;
    }
    .btn-shine {
      display: none;
    }
  }
</style>
