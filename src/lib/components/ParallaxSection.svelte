<script>
  import { onMount } from 'svelte';
  
  export let speed = 0.5; // Parallax speed (0-1)
  export let direction = 'up'; // up, down
  export let maxOffset = 100; // Maximum parallax offset
  
  let element;
  let offset = 0;
  let isVisible = false;
  
  function handleScroll() {
    if (!element || !isVisible) return;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far through the viewport the element is
    const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
    
    // Clamp between 0 and 1
    const progress = Math.max(0, Math.min(1, scrollProgress));
    
    // Calculate offset based on direction
    const rawOffset = (progress - 0.5) * maxOffset * speed * 2;
    offset = direction === 'up' ? -rawOffset : rawOffset;
  }
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    
    if (element) {
      observer.observe(element);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (element) observer.unobserve(element);
    };
  });
</script>

<div 
  bind:this={element}
  class="parallax-section"
>
  <div 
    class="parallax-content"
    style="transform: translateY({offset}px)"
  >
    <slot />
  </div>
</div>

<style>
  .parallax-section {
    position: relative;
    overflow: hidden;
  }
  
  .parallax-content {
    will-change: transform;
    transition: transform 0.1s linear;
  }
</style>
