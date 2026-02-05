<script>
  import { onMount } from 'svelte';
  
  export let text = '';
  export let tag = 'h2';
  export let class_name = '';
  export let delay = 0;
  
  let visible = false;
  let element;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) observer.unobserve(element);
    };
  });
  
  // Split into words, then each word into characters
  $: words = text.split(' ').map((word, wordIndex) => {
    // Calculate the character offset for this word (all previous chars + spaces)
    let charOffset = 0;
    for (let i = 0; i < wordIndex; i++) {
      charOffset += text.split(' ')[i].length + 1; // +1 for space
    }
    return {
      word,
      chars: word.split('').map((char, charIndex) => ({
        char,
        index: charOffset + charIndex
      }))
    };
  });
</script>

<svelte:element this={tag} bind:this={element} class="{class_name} text-reveal-wrapper" aria-label={text}>
  {#each words as { word, chars }, wordIndex}
    <span class="word">
      {#each chars as { char, index }}
        <span 
          class="char" 
          class:visible={visible}
          style="transition-delay: {delay + (index * 0.03)}s"
        >{char}</span>
      {/each}
    </span>
    {#if wordIndex < words.length - 1}
      <span class="space">&nbsp;</span>
    {/if}
  {/each}
</svelte:element>

<style>
  .text-reveal-wrapper {
    overflow: hidden;
    line-height: 1.2;
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }
  
  .word {
    display: inline-flex;
    white-space: nowrap;
  }
  
  .space {
    display: inline-block;
    width: 0.3em;
  }
  
  .char {
    display: inline-block;
    opacity: 0;
    filter: blur(10px);
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9),
                filter 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9),
                transform 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9);
    will-change: opacity, filter, transform;
  }
  
  .char.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
</style>
