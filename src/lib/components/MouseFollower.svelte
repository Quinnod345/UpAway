<script>
  import { onMount } from 'svelte';
  import { spring, tweened } from 'svelte/motion';
  import { cubicOut, elasticOut } from 'svelte/easing';
  
  let mounted = false;
  let cursorState = 'default'; // default, link, text, icon, emoji, expand, invert, hidden
  let cursorText = '';
  let cursorIcon = '';
  let cursorEmoji = '';
  let cursorVariant = ''; // view, drag, play, link, copy, etc.
  let isClicking = false;
  
  // Spring-based cursor position for smooth follow
  const cursorPos = spring({ x: 0, y: 0 }, {
    stiffness: 0.12,
    damping: 0.75
  });
  
  // Faster dot position
  const dotPos = spring({ x: 0, y: 0 }, {
    stiffness: 0.35,
    damping: 0.85
  });
  
  // Animated cursor size
  const cursorSize = spring({ width: 40, height: 40 }, {
    stiffness: 0.15,
    damping: 0.7
  });
  
  // Animated background opacity
  const bgOpacity = tweened(0, {
    duration: 250,
    easing: cubicOut
  });
  
  // Scale for click effect
  const clickScale = spring(1, {
    stiffness: 0.4,
    damping: 0.6
  });
  
  function handleMouseMove(e) {
    cursorPos.set({ x: e.clientX, y: e.clientY });
    dotPos.set({ x: e.clientX, y: e.clientY });
  }
  
  function handleMouseDown() {
    isClicking = true;
    clickScale.set(0.85);
  }
  
  function handleMouseUp() {
    isClicking = false;
    clickScale.set(1);
  }
  
  // Variant color mapping
  const variantColors = {
    view: { bg: 'var(--color-dark, #182241)', border: 'var(--color-sage, #7B949C)' },
    drag: { bg: '#2D3748', border: '#F6AD55' },
    play: { bg: '#1A202C', border: '#FC8181' },
    link: { bg: '#1E3A5F', border: '#63B3ED' },
    copy: { bg: '#2D3748', border: '#68D391' },
    arrow: { bg: 'transparent', border: 'var(--color-sage, #7B949C)' },
    plus: { bg: 'transparent', border: '#68D391' },
    expand: { bg: 'rgba(123, 148, 156, 0.2)', border: 'var(--color-sage, #7B949C)' },
    invert: { bg: 'white', border: 'white' },
    emoji: { bg: 'var(--color-dark, #182241)', border: 'var(--color-sage, #7B949C)' },
    default: { bg: 'transparent', border: 'var(--color-sage, #7B949C)' }
  };
  
  function getIconSvg(icon) {
    const icons = {
      arrow: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      plus: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
      play: `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3.5L15 9L4 14.5V3.5Z"/>
      </svg>`,
      drag: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4C8 3.44772 8.44772 3 9 3H11C11.5523 3 12 3.44772 12 4V6C12 6.55228 11.5523 7 11 7H9C8.44772 7 8 6.55228 8 6V4Z" fill="currentColor"/>
        <path d="M8 9C8 8.44772 8.44772 8 9 8H11C11.5523 8 12 8.44772 12 9V11C12 11.5523 11.5523 12 11 12H9C8.44772 12 8 11.5523 8 11V9Z" fill="currentColor"/>
        <path d="M8 14C8 13.4477 8.44772 13 9 13H11C11.5523 13 12 13.4477 12 14V16C12 16.5523 11.5523 17 11 17H9C8.44772 17 8 16.5523 8 16V14Z" fill="currentColor"/>
        <path d="M3 4C3 3.44772 3.44772 3 4 3H6C6.55228 3 7 3.44772 7 4V6C7 6.55228 6.55228 7 6 7H4C3.44772 7 3 6.55228 3 6V4Z" fill="currentColor"/>
        <path d="M3 9C3 8.44772 3.44772 8 4 8H6C6.55228 8 7 8.44772 7 9V11C7 11.5523 6.55228 12 6 12H4C3.44772 12 3 11.5523 3 11V9Z" fill="currentColor"/>
        <path d="M3 14C3 13.4477 3.44772 13 4 13H6C6.55228 13 7 13.4477 7 14V16C7 16.5523 6.55228 17 6 17H4C3.44772 17 3 16.5523 3 16V14Z" fill="currentColor"/>
        <path d="M13 4C13 3.44772 13.4477 3 14 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H14C13.4477 7 13 6.55228 13 6V4Z" fill="currentColor"/>
        <path d="M13 9C13 8.44772 13.4477 8 14 8H16C16.5523 8 17 8.44772 17 9V11C17 11.5523 16.5523 12 16 12H14C13.4477 12 13 11.5523 13 11V9Z" fill="currentColor"/>
        <path d="M13 14C13 13.4477 13.4477 13 14 13H16C16.5523 13 17 13.4477 17 14V16C17 16.5523 16.5523 17 16 17H14C13.4477 17 13 16.5523 13 16V14Z" fill="currentColor"/>
      </svg>`,
      clipboard: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2H13C14.1046 2 15 2.89543 15 4V14C15 15.1046 14.1046 16 13 16H5C3.89543 16 3 15.1046 3 14V4C3 2.89543 3.89543 2 5 2H6" stroke="currentColor" stroke-width="1.5"/>
        <rect x="6" y="1" width="6" height="3" rx="1" stroke="currentColor" stroke-width="1.5"/>
        <path d="M6 9H12M6 12H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
      external: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };
    return icons[icon] || '';
  }
  
  function getTextIcon(text) {
    const lowerText = text.toLowerCase();
    if (lowerText === 'play') return getIconSvg('play');
    if (lowerText === 'drag') return getIconSvg('drag');
    if (lowerText === 'copy') return getIconSvg('clipboard');
    if (lowerText === 'link') return getIconSvg('external');
    return '';
  }
  
  // Hysteresis tracking - prevent flicker at edges
  let lastSpecialEl = null;
  let lastSpecialTime = 0;
  const HYSTERESIS_MS = 100; // Keep state for 100ms after leaving
  
  function checkHoverTargets(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Use elementsFromPoint to get ALL elements under cursor (not just topmost)
    // This handles overlays (tilt-glare, etc.) and ensures we detect through them
    const elements = document.elementsFromPoint(x, y);
    
    let hideEl = null;
    let emojiEl = null;
    let expandEl = null;
    let invertEl = null;
    let iconEl = null;
    let textEl = null;
    let linkEl = null;
    
    // Check all elements under the cursor for our data attributes
    for (const el of elements) {
      // Skip the cursor elements themselves
      if (el.classList?.contains('cursor-ring') || el.classList?.contains('cursor-dot')) {
        continue;
      }
      
      // Check this element AND its ancestors for each attribute type
      if (!hideEl) hideEl = el.closest('[data-cursor-hidden], [data-cursor="hide"]');
      if (!emojiEl) emojiEl = el.closest('[data-cursor-emoji]');
      if (!expandEl) expandEl = el.closest('[data-cursor-expand]');
      if (!invertEl) invertEl = el.closest('[data-cursor-invert]');
      if (!iconEl) iconEl = el.closest('[data-cursor-icon]');
      if (!textEl) textEl = el.closest('[data-cursor-text]');
      if (!linkEl) linkEl = el.closest('a, button, [data-cursor="pointer"], [data-magnetic]');
      
      // Early exit if we found highest priority
      if (hideEl) break;
    }
    
    const prevState = cursorState;
    const prevVariant = cursorVariant;
    const now = Date.now();
    
    // Track if we found any special element for hysteresis
    const foundSpecial = hideEl || emojiEl || expandEl || invertEl || iconEl || textEl;
    if (foundSpecial) {
      lastSpecialEl = foundSpecial;
      lastSpecialTime = now;
    }
    
    if (hideEl) {
      cursorState = 'hidden';
      cursorText = '';
      cursorIcon = '';
      cursorEmoji = '';
      cursorVariant = '';
      cursorSize.set({ width: 0, height: 0 });
      bgOpacity.set(0);
    } else if (emojiEl) {
      cursorState = 'emoji';
      cursorEmoji = emojiEl.dataset.cursorEmoji || '✨';
      cursorText = '';
      cursorIcon = '';
      cursorVariant = 'emoji';
      cursorSize.set({ width: 64, height: 64 });
      bgOpacity.set(1);
    } else if (expandEl) {
      cursorState = 'expand';
      cursorText = '';
      cursorIcon = '';
      cursorEmoji = '';
      cursorVariant = 'expand';
      cursorSize.set({ width: 100, height: 100 });
      bgOpacity.set(0.25);
    } else if (invertEl) {
      cursorState = 'invert';
      cursorText = '';
      cursorIcon = '';
      cursorEmoji = '';
      cursorVariant = 'invert';
      cursorSize.set({ width: 80, height: 80 });
      bgOpacity.set(1);
    } else if (iconEl) {
      cursorState = 'icon';
      cursorIcon = iconEl.dataset.cursorIcon || 'arrow';
      cursorText = '';
      cursorEmoji = '';
      cursorVariant = cursorIcon;
      cursorSize.set({ width: 56, height: 56 });
      bgOpacity.set(0.3);
    } else if (textEl) {
      cursorState = 'text';
      cursorText = textEl.dataset.cursorText || '';
      const lowerText = cursorText.toLowerCase();
      cursorVariant = lowerText;
      cursorIcon = '';
      cursorEmoji = '';
      
      // Calculate pill size based on text length + potential icon
      const hasIcon = ['play', 'drag', 'copy', 'link'].includes(lowerText);
      const baseWidth = hasIcon ? 100 : 80;
      const textWidth = Math.max(baseWidth, cursorText.length * 12 + (hasIcon ? 72 : 48));
      cursorSize.set({ width: textWidth, height: 48 });
      bgOpacity.set(1);
    } else if (lastSpecialEl && (now - lastSpecialTime) < HYSTERESIS_MS) {
      // Hysteresis: keep previous special state briefly after leaving
      // This prevents flicker at edges - state remains unchanged
    } else if (linkEl) {
      cursorState = 'link';
      cursorText = '';
      cursorIcon = '';
      cursorEmoji = '';
      cursorVariant = '';
      cursorSize.set({ width: 56, height: 56 });
      bgOpacity.set(0.15);
      lastSpecialEl = null;
    } else {
      cursorState = 'default';
      cursorText = '';
      cursorIcon = '';
      cursorEmoji = '';
      cursorVariant = '';
      cursorSize.set({ width: 40, height: 40 });
      bgOpacity.set(0);
      lastSpecialEl = null;
    }
    
    // Add subtle bounce on state change
    if (prevState !== cursorState || prevVariant !== cursorVariant) {
      // Micro-bounce effect
      if (cursorState !== 'hidden' && cursorState !== 'default') {
        clickScale.set(1.15);
        setTimeout(() => clickScale.set(1), 150);
      }
    }
  }
  
  onMount(() => {
    mounted = true;
    
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      mounted = false;
      return;
    }
    
    // Use document level for better event delegation
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousemove', checkHoverTargets, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', checkHoverTargets);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
  
  // Reactive calculations
  $: ringWidth = $cursorSize.width * $clickScale;
  $: ringHeight = $cursorSize.height * $clickScale;
  $: borderRadius = cursorState === 'text' ? ringHeight / 2 : ringWidth / 2;
  $: dotScale = cursorState === 'hidden' ? 0 : 
               cursorState === 'text' ? 0 : 
               cursorState === 'emoji' ? 0 : 
               cursorState === 'icon' ? 0 :
               cursorState === 'expand' ? 0.3 :
               cursorState === 'invert' ? 0 :
               cursorState === 'link' ? 0.5 : 1;
  $: colors = variantColors[cursorVariant] || variantColors.default;
  $: textIcon = cursorText ? getTextIcon(cursorText) : '';
</script>

{#if mounted}
  <!-- Main cursor ring/pill -->
  <div 
    class="cursor-ring"
    class:is-text={cursorState === 'text'}
    class:is-link={cursorState === 'link'}
    class:is-hidden={cursorState === 'hidden'}
    class:is-icon={cursorState === 'icon'}
    class:is-emoji={cursorState === 'emoji'}
    class:is-expand={cursorState === 'expand'}
    class:is-invert={cursorState === 'invert'}
    class:variant-view={cursorVariant === 'view'}
    class:variant-drag={cursorVariant === 'drag'}
    class:variant-play={cursorVariant === 'play'}
    class:variant-link={cursorVariant === 'link'}
    class:variant-copy={cursorVariant === 'copy'}
    class:variant-arrow={cursorVariant === 'arrow'}
    class:variant-plus={cursorVariant === 'plus'}
    class:variant-expand={cursorVariant === 'expand'}
    class:variant-invert={cursorVariant === 'invert'}
    class:variant-emoji={cursorVariant === 'emoji'}
    style="
      transform: translate({$cursorPos.x}px, {$cursorPos.y}px);
      width: {ringWidth}px;
      height: {ringHeight}px;
      margin-left: {-ringWidth / 2}px;
      margin-top: {-ringHeight / 2}px;
      border-radius: {borderRadius}px;
      --bg-opacity: {$bgOpacity};
    "
  >
    <!-- Emoji content -->
    {#if cursorState === 'emoji' && cursorEmoji}
      <span class="cursor-emoji">{cursorEmoji}</span>
    {/if}
    
    <!-- Icon content -->
    {#if cursorState === 'icon' && cursorIcon}
      <span class="cursor-icon-content">
        {@html getIconSvg(cursorIcon)}
      </span>
    {/if}
    
    <!-- Text content with optional icon -->
    {#if cursorState === 'text' && cursorText}
      <span 
        class="cursor-text"
        class:visible={cursorState === 'text'}
        class:has-icon={!!textIcon}
      >
        {#if textIcon}
          <span class="text-icon">{@html textIcon}</span>
        {/if}
        {cursorText}
      </span>
    {/if}
    
    <!-- Expand ring effect -->
    {#if cursorState === 'expand'}
      <div class="expand-ring"></div>
      <div class="expand-ring delay"></div>
    {/if}
    
    <!-- Glow effect for text state -->
    {#if cursorState === 'text' || cursorState === 'emoji'}
      <div class="cursor-glow" class:variant-glow={cursorVariant}></div>
    {/if}
  </div>
  
  <!-- Inner dot (hidden when showing text/icon/emoji) -->
  <div 
    class="cursor-dot"
    class:is-invert={cursorState === 'invert'}
    style="
      transform: translate({$dotPos.x}px, {$dotPos.y}px) scale({dotScale});
      opacity: {cursorState === 'hidden' || cursorState === 'text' || cursorState === 'emoji' || cursorState === 'icon' || cursorState === 'invert' ? 0 : 1};
    "
  ></div>
{/if}

<style>
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    border: 2px solid var(--color-sage, #7B949C);
    pointer-events: none;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform, width, height, border-radius;
    transition: 
      border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: rgba(24, 34, 65, calc(var(--bg-opacity, 0)));
    mix-blend-mode: normal;
    overflow: hidden;
  }
  
  .cursor-ring:not(.is-text):not(.is-emoji):not(.is-invert):not(.is-expand) {
    mix-blend-mode: difference;
  }
  
  /* Base text state */
  .cursor-ring.is-text {
    border-color: var(--color-sage, #7B949C);
    background-color: var(--color-dark, #182241);
    box-shadow: 
      0 4px 20px rgba(123, 148, 156, 0.3),
      0 0 40px rgba(123, 148, 156, 0.15),
      inset 0 0 20px rgba(123, 148, 156, 0.1);
  }
  
  /* Variant: View (default sage) */
  .cursor-ring.variant-view {
    border-color: var(--color-sage, #7B949C);
    background-color: var(--color-dark, #182241);
  }
  
  /* Variant: Drag (warm orange) */
  .cursor-ring.variant-drag {
    border-color: #F6AD55;
    background-color: #2D3748;
    box-shadow: 
      0 4px 20px rgba(246, 173, 85, 0.4),
      0 0 40px rgba(246, 173, 85, 0.2),
      inset 0 0 20px rgba(246, 173, 85, 0.15);
  }
  
  /* Variant: Play (energetic red/coral) */
  .cursor-ring.variant-play {
    border-color: #FC8181;
    background-color: #1A202C;
    box-shadow: 
      0 4px 20px rgba(252, 129, 129, 0.4),
      0 0 40px rgba(252, 129, 129, 0.2),
      inset 0 0 20px rgba(252, 129, 129, 0.15);
  }
  
  /* Variant: Link (cool blue) */
  .cursor-ring.variant-link {
    border-color: #63B3ED;
    background-color: #1E3A5F;
    box-shadow: 
      0 4px 20px rgba(99, 179, 237, 0.4),
      0 0 40px rgba(99, 179, 237, 0.2),
      inset 0 0 20px rgba(99, 179, 237, 0.15);
  }
  
  /* Variant: Copy (fresh green) */
  .cursor-ring.variant-copy {
    border-color: #68D391;
    background-color: #1A3628;
    box-shadow: 
      0 4px 20px rgba(104, 211, 145, 0.4),
      0 0 40px rgba(104, 211, 145, 0.2),
      inset 0 0 20px rgba(104, 211, 145, 0.15);
  }
  
  /* Icon variants */
  .cursor-ring.is-icon {
    background-color: rgba(24, 34, 65, 0.9);
    box-shadow: 0 4px 20px rgba(123, 148, 156, 0.3);
  }
  
  .cursor-ring.variant-arrow {
    border-color: var(--color-sage, #7B949C);
  }
  
  .cursor-ring.variant-plus {
    border-color: #68D391;
    box-shadow: 0 4px 20px rgba(104, 211, 145, 0.3);
  }
  
  /* Expand state */
  .cursor-ring.is-expand {
    border-color: var(--color-sage, #7B949C);
    background-color: rgba(123, 148, 156, 0.15);
    box-shadow: 
      0 0 30px rgba(123, 148, 156, 0.3),
      0 0 60px rgba(123, 148, 156, 0.15);
  }
  
  /* Invert state */
  .cursor-ring.is-invert {
    border: none;
    background-color: white;
    mix-blend-mode: difference;
  }
  
  /* Emoji state */
  .cursor-ring.is-emoji {
    border-color: var(--color-sage, #7B949C);
    background-color: var(--color-dark, #182241);
    box-shadow: 
      0 4px 25px rgba(123, 148, 156, 0.4),
      0 0 50px rgba(123, 148, 156, 0.2);
  }
  
  .cursor-ring.is-link {
    border-color: var(--color-accent, #7B949C);
  }
  
  .cursor-ring.is-hidden {
    opacity: 0;
    border: none;
  }
  
  /* Emoji styling */
  .cursor-emoji {
    font-size: 1.75rem;
    line-height: 1;
    animation: emoji-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  @keyframes emoji-bounce {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  /* Icon content styling */
  .cursor-icon-content {
    color: var(--color-cream, #FFF5D9);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: icon-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes icon-pop {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  
  .cursor-text {
    color: var(--color-cream, #FFF5D9);
    font-family: var(--font-heading, 'Space Grotesk', sans-serif);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    white-space: nowrap;
    opacity: 0;
    transform: scale(0.8);
    transition: 
      opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.05s,
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s;
    user-select: none;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .cursor-text.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  .cursor-text.has-icon {
    padding-left: 0.25rem;
  }
  
  .text-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: icon-slide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes icon-slide {
    0% { transform: translateX(-10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  /* Expand ring animation */
  .expand-ring {
    position: absolute;
    inset: 0;
    border: 2px solid var(--color-sage, #7B949C);
    border-radius: 50%;
    animation: expand-pulse 2s ease-out infinite;
    opacity: 0.5;
  }
  
  .expand-ring.delay {
    animation-delay: 1s;
  }
  
  @keyframes expand-pulse {
    0% {
      transform: scale(0.5);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  .cursor-glow {
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(123, 148, 156, 0.4) 0%,
      transparent 50%,
      rgba(123, 148, 156, 0.2) 100%
    );
    opacity: 0.6;
    z-index: 0;
  }
  
  /* Variant-specific glow colors */
  .cursor-ring.variant-drag .cursor-glow {
    background: linear-gradient(
      135deg,
      rgba(246, 173, 85, 0.5) 0%,
      transparent 50%,
      rgba(246, 173, 85, 0.3) 100%
    );
  }
  
  .cursor-ring.variant-play .cursor-glow {
    background: linear-gradient(
      135deg,
      rgba(252, 129, 129, 0.5) 0%,
      transparent 50%,
      rgba(252, 129, 129, 0.3) 100%
    );
  }
  
  .cursor-ring.variant-link .cursor-glow {
    background: linear-gradient(
      135deg,
      rgba(99, 179, 237, 0.5) 0%,
      transparent 50%,
      rgba(99, 179, 237, 0.3) 100%
    );
  }
  
  .cursor-ring.variant-copy .cursor-glow {
    background: linear-gradient(
      135deg,
      rgba(104, 211, 145, 0.5) 0%,
      transparent 50%,
      rgba(104, 211, 145, 0.3) 100%
    );
  }
  
  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    margin-top: -4px;
    background-color: var(--color-sage, #7B949C);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
    will-change: transform, opacity;
    transition: 
      opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.2s ease;
  }
  
  .cursor-dot.is-invert {
    background-color: white;
    mix-blend-mode: difference;
  }
  
  /* Hide on touch devices */
  @media (hover: none) {
    .cursor-ring,
    .cursor-dot {
      display: none !important;
    }
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .cursor-ring,
    .cursor-dot {
      transition: none;
    }
    
    .expand-ring {
      animation: none;
    }
    
    .cursor-emoji,
    .cursor-icon-content,
    .text-icon {
      animation: none;
    }
  }
</style>
