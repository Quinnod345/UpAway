<script>
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  
  export let maxTilt = 15;
  export let scale = 1.02;
  export let perspective = 1000;
  export let glare = true;
  export let glareOpacity = 0.3;
  export let speed = 400;
  
  let cardEl;
  let isHovering = false;
  
  const transform = spring(
    { rotateX: 0, rotateY: 0, scale: 1 },
    { stiffness: 0.1, damping: 0.5 }
  );
  
  const glarePos = spring(
    { x: 50, y: 50 },
    { stiffness: 0.15, damping: 0.6 }
  );
  
  function handleMouseMove(e) {
    if (!cardEl) return;
    
    const rect = cardEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
    
    transform.set({
      rotateX,
      rotateY,
      scale: isHovering ? scale : 1
    });
    
    // Update glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    glarePos.set({ x: glareX, y: glareY });
  }
  
  function handleMouseEnter() {
    isHovering = true;
    transform.set({
      ...$transform,
      scale
    });
  }
  
  function handleMouseLeave() {
    isHovering = false;
    transform.set({
      rotateX: 0,
      rotateY: 0,
      scale: 1
    });
    glarePos.set({ x: 50, y: 50 });
  }
</script>

<div 
  bind:this={cardEl}
  class="tilt-card"
  class:hovering={isHovering}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  style="
    perspective: {perspective}px;
  "
  role="presentation"
>
  <div 
    class="tilt-card-inner"
    style="
      transform: rotateX({$transform.rotateX}deg) rotateY({$transform.rotateY}deg) scale({$transform.scale});
    "
  >
    <slot />
    
    {#if glare}
      <div 
        class="tilt-glare"
        class:visible={isHovering}
        style="
          background: radial-gradient(
            circle at {$glarePos.x}% {$glarePos.y}%,
            rgba(255, 255, 255, {glareOpacity}) 0%,
            transparent 60%
          );
        "
      ></div>
    {/if}
    
    <!-- Shine border effect -->
    <div class="tilt-shine" class:visible={isHovering}></div>
  </div>
</div>

<style>
  .tilt-card {
    display: inline-block;
    transform-style: preserve-3d;
  }
  
  .tilt-card-inner {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.1s ease;
    will-change: transform;
  }
  
  .tilt-glare {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  }
  
  .tilt-glare.visible {
    opacity: 1;
  }
  
  .tilt-shine {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 5;
    background: linear-gradient(
      135deg,
      transparent 20%,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 60%,
      transparent 80%
    );
  }
  
  .tilt-shine.visible {
    opacity: 1;
  }
  
  /* 3D depth effect for child elements */
  .tilt-card-inner :global([data-tilt-depth="1"]) {
    transform: translateZ(20px);
  }
  
  .tilt-card-inner :global([data-tilt-depth="2"]) {
    transform: translateZ(40px);
  }
  
  .tilt-card-inner :global([data-tilt-depth="3"]) {
    transform: translateZ(60px);
  }
</style>
