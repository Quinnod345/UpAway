<script>
  import { onMount } from 'svelte';
  
  export let text = '';
  export let scrambleOnHover = true;
  export let scrambleOnView = false;
  export let delay = 0;
  export let duration = 1200;
  export let characters = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  let displayText = text;
  let element;
  let isScrambling = false;
  let hasAnimated = false;
  let prefersReducedMotion = false;
  let frameId = null;
  let isBrowser = false;
  
  function getRandomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }
  
  function scramble() {
    if (isScrambling || prefersReducedMotion) {
      // If reduced motion, just show the text immediately
      displayText = text;
      return;
    }
    
    isScrambling = true;
    
    const originalText = text;
    const length = originalText.length;
    const startTime = performance.now();
    
    // Each character has its own "reveal time" - staggered across the duration
    // Characters reveal from left to right with some randomness
    const charRevealTimes = originalText.split('').map((_, index) => {
      // Base time: spread evenly across 70% of duration, leaving 30% for final settling
      const baseTime = (index / length) * (duration * 0.7);
      // Add some randomness (up to 100ms variance)
      const variance = Math.random() * 100;
      return baseTime + variance;
    });
    
    function animate() {
      const elapsed = performance.now() - startTime;
      
      displayText = originalText
        .split('')
        .map((char, index) => {
          // Preserve spaces
          if (char === ' ') return ' ';
          
          // If this char's reveal time has passed, show the real char
          if (elapsed >= charRevealTimes[index]) {
            return char;
          }
          
          // Otherwise, show a random character (cycle every ~50ms for visible effect)
          return getRandomChar();
        })
        .join('');
      
      // Continue until all characters are revealed plus a small buffer
      if (elapsed < duration) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Ensure we end with the correct text
        displayText = originalText;
        isScrambling = false;
        frameId = null;
      }
    }
    
    // Start animation
    frameId = requestAnimationFrame(animate);
  }
  
  function handleMouseEnter() {
    if (!scrambleOnHover || isScrambling) return;
    scramble();
  }
  
  function handleMouseLeave() {
    // Don't interrupt animation, just ensure final state is correct
    if (!isScrambling) {
      displayText = text;
    }
  }
  
  onMount(() => {
    isBrowser = true;
    
    // Check reduced motion on mount
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleChange);
    
    if (scrambleOnView && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              hasAnimated = true;
              setTimeout(scramble, delay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      if (element) {
        observer.observe(element);
      }
      
      return () => {
        if (element) observer.unobserve(element);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  });
  
  // React to text prop changes
  $: if (!isScrambling) {
    displayText = text;
  }
</script>

<span 
  bind:this={element}
  class="text-scramble"
  class:scrambling={isScrambling}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  aria-label={text}
  data-text={text}
>
  {displayText}
</span>

<style>
  .text-scramble {
    display: inline-block;
    font-family: inherit;
    position: relative;
  }
  
  .scrambling {
    /* Subtle glow during scramble for that hacker aesthetic */
    text-shadow: 0 0 8px currentColor;
  }
  
  /* Respect reduced motion at CSS level too */
  @media (prefers-reduced-motion: reduce) {
    .scrambling {
      text-shadow: none;
    }
  }
</style>
