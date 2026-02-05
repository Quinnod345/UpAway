<script>
  export let color1 = 'var(--color-sage, #7B949C)';
  export let color2 = 'var(--color-steel, #536C7C)';
  export let color3 = 'var(--color-navy, #213C4E)';
  export let borderRadius = '20px';
  export let borderWidth = '2px';
  export let glowIntensity = 0.5;
  export let animationDuration = '4s';
</script>

<div 
  class="glowing-border"
  style="
    --glow-color-1: {color1};
    --glow-color-2: {color2};
    --glow-color-3: {color3};
    --glow-radius: {borderRadius};
    --glow-width: {borderWidth};
    --glow-intensity: {glowIntensity};
    --glow-duration: {animationDuration};
  "
>
  <div class="glow-border-inner">
    <slot />
  </div>
  <div class="glow-border-gradient"></div>
</div>

<style>
  .glowing-border {
    position: relative;
    border-radius: var(--glow-radius);
    padding: var(--glow-width);
    background: transparent;
  }
  
  .glow-border-inner {
    position: relative;
    z-index: 1;
    border-radius: calc(var(--glow-radius) - var(--glow-width));
    background: inherit;
    overflow: hidden;
  }
  
  .glow-border-gradient {
    position: absolute;
    inset: 0;
    border-radius: var(--glow-radius);
    z-index: 0;
    background: conic-gradient(
      from 0deg,
      var(--glow-color-1),
      var(--glow-color-2),
      var(--glow-color-3),
      var(--glow-color-1)
    );
    animation: rotate var(--glow-duration) linear infinite;
    filter: blur(calc(var(--glow-intensity) * 10px));
  }
  
  .glowing-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--glow-radius);
    padding: var(--glow-width);
    background: conic-gradient(
      from 0deg,
      var(--glow-color-1),
      var(--glow-color-2),
      var(--glow-color-3),
      var(--glow-color-1)
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: rotate var(--glow-duration) linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
