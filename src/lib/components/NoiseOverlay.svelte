<script>
  export let opacity = 0.03;
  export let blend = 'overlay'; // overlay, multiply, soft-light
</script>

<div 
  class="noise-overlay"
  style="
    opacity: {opacity};
    mix-blend-mode: {blend};
  "
  aria-hidden="true"
></div>

<style>
  .noise-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    animation: noise 0.5s steps(10) infinite;
  }
  
  @keyframes noise {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }
</style>
