<script>
  import { onMount } from 'svelte';
  
  export let animation = 'fade-up'; // fade-up, fade-down, fade-left, fade-right, zoom, blur
  export let delay = 0;
  export let duration = 0.8;
  export let threshold = 0.1;
  export let once = true;
  export let stagger = 0; // For staggered children animations
  export let distance = 60;
  
  let element;
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            visible = false;
          }
        });
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) observer.unobserve(element);
    };
  });
  
  // Generate CSS custom properties for animation
  $: cssVars = `
    --reveal-delay: ${delay}s;
    --reveal-duration: ${duration}s;
    --reveal-distance: ${distance}px;
    --stagger: ${stagger}s;
  `;
</script>

<div 
  bind:this={element}
  class="scroll-reveal {animation}"
  class:visible
  style={cssVars}
>
  <slot />
</div>

<style>
  .scroll-reveal {
    --reveal-delay: 0s;
    --reveal-duration: 0.8s;
    --reveal-distance: 60px;
    --stagger: 0s;
    
    will-change: transform, opacity, filter;
  }
  
  /* Fade Up */
  .fade-up {
    opacity: 0;
    transform: translateY(var(--reveal-distance));
    transition: 
      opacity var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      transform var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay);
  }
  
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Fade Down */
  .fade-down {
    opacity: 0;
    transform: translateY(calc(var(--reveal-distance) * -1));
    transition: 
      opacity var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      transform var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay);
  }
  
  .fade-down.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Fade Left */
  .fade-left {
    opacity: 0;
    transform: translateX(var(--reveal-distance));
    transition: 
      opacity var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      transform var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay);
  }
  
  .fade-left.visible {
    opacity: 1;
    transform: translateX(0);
  }
  
  /* Fade Right */
  .fade-right {
    opacity: 0;
    transform: translateX(calc(var(--reveal-distance) * -1));
    transition: 
      opacity var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      transform var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay);
  }
  
  .fade-right.visible {
    opacity: 1;
    transform: translateX(0);
  }
  
  /* Zoom */
  .zoom {
    opacity: 0;
    transform: scale(0.9);
    transition: 
      opacity var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      transform var(--reveal-duration) cubic-bezier(0.34, 1.56, 0.64, 1) var(--reveal-delay);
  }
  
  .zoom.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  /* Blur */
  .blur {
    opacity: 0;
    filter: blur(20px);
    transform: translateY(30px);
    transition: 
      opacity var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      filter var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay),
      transform var(--reveal-duration) cubic-bezier(0.4, 0, 0.2, 1) var(--reveal-delay);
  }
  
  .blur.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
  
  /* Staggered children */
  .scroll-reveal.visible :global(> *:nth-child(1)) { transition-delay: calc(var(--reveal-delay) + var(--stagger) * 0); }
  .scroll-reveal.visible :global(> *:nth-child(2)) { transition-delay: calc(var(--reveal-delay) + var(--stagger) * 1); }
  .scroll-reveal.visible :global(> *:nth-child(3)) { transition-delay: calc(var(--reveal-delay) + var(--stagger) * 2); }
  .scroll-reveal.visible :global(> *:nth-child(4)) { transition-delay: calc(var(--reveal-delay) + var(--stagger) * 3); }
  .scroll-reveal.visible :global(> *:nth-child(5)) { transition-delay: calc(var(--reveal-delay) + var(--stagger) * 4); }
  .scroll-reveal.visible :global(> *:nth-child(6)) { transition-delay: calc(var(--reveal-delay) + var(--stagger) * 5); }
</style>
