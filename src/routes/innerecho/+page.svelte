<script>
  import { onMount } from 'svelte';
  import TextReveal from '$lib/components/TextReveal.svelte';
  
  let mounted = false;
  let secretPhrase = '';
  let showBreatheSecret = false;
  
  function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  let breathePhase = 'inhale';
  let breatheInterval;
  
  // "breathe" easter egg - typing "breathe" triggers a calming exercise
  function handleKeyDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key.length === 1) {
      secretPhrase += e.key.toLowerCase();
      if (secretPhrase.length > 10) secretPhrase = secretPhrase.slice(-10);
      
      if (secretPhrase.includes('breathe')) {
        showBreatheSecret = true;
        secretPhrase = '';
        startBreathingExercise();
      }
    }
    
    // Escape to close
    if (e.key === 'Escape' && showBreatheSecret) {
      closeBreatheSecret();
    }
  }
  
  function startBreathingExercise() {
    breathePhase = 'inhale';
    let count = 0;
    breatheInterval = setInterval(() => {
      count++;
      if (count <= 4) breathePhase = 'inhale';
      else if (count <= 8) breathePhase = 'hold';
      else if (count <= 12) breathePhase = 'exhale';
      else {
        count = 0;
        breathePhase = 'inhale';
      }
    }, 1000);
    
    // Auto-close after 24 seconds (2 full cycles)
    setTimeout(() => closeBreatheSecret(), 24000);
  }
  
  function closeBreatheSecret() {
    showBreatheSecret = false;
    clearInterval(breatheInterval);
  }
  
  onMount(() => {
    mounted = true;
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(breatheInterval);
    };
  });
</script>

<!-- InnerEcho Breathe Easter Egg -->
{#if showBreatheSecret}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="breathe-overlay" on:click={closeBreatheSecret}>
    <div class="breathe-content">
      <div class="breathe-circle" class:inhale={breathePhase === 'inhale'} class:hold={breathePhase === 'hold'} class:exhale={breathePhase === 'exhale'}>
        <span class="breathe-text">
          {#if breathePhase === 'inhale'}
            Breathe in...
          {:else if breathePhase === 'hold'}
            Hold...
          {:else}
            Breathe out...
          {/if}
        </span>
      </div>
      <p class="breathe-hint">You're doing great. Click anywhere to continue.</p>
    </div>
  </div>
{/if}

<svelte:head>
  <title>InnerEcho | AI-Powered Mental Health Journaling with Your Personal Therapist</title>
  <meta name="description" content="InnerEcho is an AI-powered mental health app with a fully customizable AI therapist, intelligent journaling with real-time insights, dream analysis, mood tracking, and 28 beautiful themes. Your mind, your companion, your growth." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero-bg">
    <!-- Animated gradient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    
    <!-- Particle dots -->
    <div class="particles">
      {#each Array(20) as _, i}
        <div class="particle" style="--delay: {i * 0.5}s; --x: {Math.random() * 100}%; --y: {Math.random() * 100}%;"></div>
      {/each}
    </div>
    
    <!-- Glowing rings -->
    <div class="rings">
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
    </div>
  </div>
  
  <div class="hero-content container">
    <div class="hero-text">
      <div class="hero-title" class:visible={mounted}>
        <h1>Inner<span class="text-accent">Echo</span></h1>
      </div>
      <p class="hero-subtitle" class:visible={mounted}>Your AI Therapist, Customized to You</p>
      <p class="hero-tagline" class:visible={mounted}>
        The only journaling app with a fully customizable AI therapist. Journal, track your mood, analyze your dreams, and discover patterns—all with an AI companion that learns how you think.
      </p>
      <div class="hero-cta" class:visible={mounted}>
        <a href="https://apps.apple.com/us/app/innerecho-mental-health/id6683282892" target="_blank" rel="noopener" class="btn btn-primary btn-lg" data-cursor-expand data-cursor-text="Link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on App Store
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Intro Section -->
<section class="intro section">
  <div class="container">
    <div class="intro-content">
      <p class="section-label">More than a journal</p>
      <TextReveal text="InnerEcho combines the therapeutic power of journaling with a fully customizable AI therapist named Echo—who you can rename, personalize, or let the AI create based on your writing style." tag="h2" class_name="intro-headline" />
    </div>
  </div>
</section>

<!-- Screenshots Section -->
<section class="screenshots section section-navy">
  <div class="container">
    <div class="screenshots-header">
      <p class="section-label text-accent">App Preview</p>
      <h2>See <span class="text-gradient">InnerEcho</span> in action</h2>
    </div>
    
    <div class="screenshots-grid">
      <div class="screenshot-card">
        <button class="screenshot-placeholder" data-cursor-text="View" on:click={() => scrollToSection('.how-it-works')}>
          <div class="phone-ui">
            <div class="phone-header">
              <span>Echo</span>
              <span class="phone-date">AI Therapist</span>
            </div>
            <div class="phone-content">
              <div class="chat-preview">
                <div class="chat-bubble ai">How are you feeling today?</div>
                <div class="chat-bubble user">I've been stressed about work...</div>
                <div class="chat-bubble ai typing">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            </div>
          </div>
        </button>
        <p class="screenshot-label">AI Therapist Chat</p>
      </div>
      
      <div class="screenshot-card">
        <button class="screenshot-placeholder" data-cursor-text="View" on:click={() => scrollToSection('.how-it-works')}>
          <div class="phone-ui">
            <div class="phone-header">
              <span>Journal</span>
              <span class="phone-date">Go Deeper</span>
            </div>
            <div class="phone-content">
              <div class="journal-lines">
                <div class="line"></div>
                <div class="line short"></div>
                <div class="line"></div>
              </div>
              <div class="go-deeper-prompt">
                <span class="prompt-icon">✨</span>
                <span>What emotions come up when you think about this?</span>
              </div>
            </div>
          </div>
        </button>
        <p class="screenshot-label">Real-Time AI Prompts</p>
      </div>
      
      <div class="screenshot-card">
        <button class="screenshot-placeholder" data-cursor-text="View" on:click={() => scrollToSection('.how-it-works')}>
          <div class="phone-ui">
            <div class="phone-header">
              <span>Insights</span>
              <span class="phone-date">Weekly</span>
            </div>
            <div class="phone-content">
              <div class="chart-placeholder">
                <div class="bar" style="height: 40%"></div>
                <div class="bar" style="height: 60%"></div>
                <div class="bar" style="height: 80%"></div>
                <div class="bar" style="height: 55%"></div>
                <div class="bar" style="height: 70%"></div>
              </div>
              <div class="insight-tags">
                <span class="tag">😊 Joy 34%</span>
                <span class="tag">🤔 Thoughtful 28%</span>
              </div>
            </div>
          </div>
        </button>
        <p class="screenshot-label">Pattern Insights</p>
      </div>
    </div>
  </div>
</section>

<!-- AI Therapist Section -->
<section class="ai-therapist section">
  <div class="container">
    <div class="ai-header">
      <p class="section-label">Meet Echo</p>
      <TextReveal text="Your AI Therapist, Three Ways to Customize" tag="h2" />
      <p class="ai-description">
        Echo is your personal AI therapist—but unlike any other app, you're in complete control of how Echo thinks, talks, and helps you.
      </p>
    </div>
    
    <div class="customize-grid">
      <div class="customize-card">
        <span class="customize-number">01</span>
        <div class="customize-icon">⚡</div>
        <h3>Quick Presets</h3>
        <p>Choose from 6 expert-designed personalities: Compassionate Guide, Wise Mentor, Motivational Coach, Clinical Professional, Mindful Companion, or Anxiety Specialist.</p>
      </div>
      
      <div class="customize-card">
        <span class="customize-number">02</span>
        <div class="customize-icon">🎛️</div>
        <h3>Manual Customization</h3>
        <p>Fine-tune everything: personality type, communication style, therapeutic focus (CBT, mindfulness, trauma-informed), and even write a custom personality description.</p>
      </div>
      
      <div class="customize-card">
        <span class="customize-number">03</span>
        <div class="customize-icon">🧠</div>
        <h3>AI-Generated Match</h3>
        <p>After 10+ journal entries, let the AI analyze your writing style and emotional patterns to create a therapist personality perfectly matched to you—with a unique name and approach.</p>
      </div>
    </div>
  </div>
</section>

<!-- How It Works Section (Sticky) -->
<section class="how-it-works section section-navy">
  <div class="container sticky-container">
    <div class="sticky-visual">
      <div class="sticky-wrapper">
        <button class="phone-mockup-large" data-cursor-text="View" on:click={() => scrollToSection('.quote')}>
          <div class="phone-frame">
            <div class="phone-screen">
              <div class="app-demo">
                <div class="demo-header">
                  <span class="demo-title">InnerEcho</span>
                  <span class="demo-subtitle">Today's Entry</span>
                </div>
                <div class="demo-prompt">
                  <p>What's on your mind today?</p>
                </div>
                <div class="demo-textarea">
                  <div class="typing-cursor"></div>
                </div>
                <div class="demo-ai">
                  <span class="ai-badge">✨ Go Deeper</span>
                  <p>What would it feel like to let go of this worry?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="phone-glow"></div>
        </button>
      </div>
    </div>
    
    <div class="how-content">
      <div class="content-header">
        <p class="section-label text-accent">Intelligent Journaling</p>
        <TextReveal text="AI That Helps You Dig Deeper" tag="h2" class_name="text-light" />
        <p class="how-description text-light-muted">
          InnerEcho doesn't just store your thoughts—it analyzes them in real-time, offering "Go Deeper" prompts as you write, detecting cognitive distortions, and providing CBT-based reframes.
        </p>
      </div>
      
      <div class="features-list">
        <div class="feature-card">
          <span class="feature-icon">✍️</span>
          <div class="feature-content">
            <h4>Free-Form & Guided Journaling</h4>
            <p>Write freely or use AI-generated prompts tailored to your recent entries. Add photos, track word count, and see your writing time.</p>
          </div>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">✨</span>
          <div class="feature-content">
            <h4>Real-Time "Go Deeper" Prompts</h4>
            <p>After 50+ words, the AI analyzes your writing and offers reflection questions—non-intrusive, dismissible, and genuinely helpful.</p>
          </div>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">🧠</span>
          <div class="feature-content">
            <h4>Emotional Processing Analysis</h4>
            <p>On save, AI identifies 3-7 nuanced emotions, detects cognitive distortions, provides CBT reframes, and suggests mindfulness exercises.</p>
          </div>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">🌙</span>
          <div class="feature-content">
            <h4>Dream Journal with AI Analysis</h4>
            <p>Log dreams with type, emotions, themes, and vividness. Get Jungian-inspired symbolic interpretation, emotional insights, and reflection prompts.</p>
          </div>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">📊</span>
          <div class="feature-content">
            <h4>Mood Tracking & Check-Ins</h4>
            <p>Quick 30-second check-ins with 100+ emotion tags. Morning, evening, and weekly goal check-ins. See what impacts your mood most.</p>
          </div>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">📈</span>
          <div class="feature-content">
            <h4>Beautiful Insights Dashboard</h4>
            <p>Trend graphs, top emotions, mood correlations, and keyword clouds. Premium AI Deep Dive analyzes patterns across all your data.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Privacy Section -->
<section class="privacy section">
  <div class="container">
    <div class="privacy-content">
      <div class="privacy-text">
        <p class="section-label">Privacy First</p>
        <TextReveal text="Your Thoughts Stay Yours" tag="h2" />
        <p class="privacy-description">
          Your journal lives in YOUR iCloud—not our servers. We never see your entries. AI features are opt-in, and you can lock the app with passcode or biometrics.
        </p>
        <ul class="privacy-list">
          <li><span class="check">✓</span> iCloud sync (your data, your cloud)</li>
          <li><span class="check">✓</span> Optional passcode with Face ID/Touch ID</li>
          <li><span class="check">✓</span> No third-party data sharing</li>
          <li><span class="check">✓</span> AI features are completely opt-in</li>
          <li><span class="check">✓</span> Delete your data anytime</li>
        </ul>
      </div>
      <div class="privacy-visual">
        <div class="privacy-icon">🔒</div>
      </div>
    </div>
  </div>
</section>

<!-- Themes Section -->
<section class="themes section section-dark">
  <div class="container">
    <div class="themes-header">
      <p class="section-label text-accent">28 Beautiful Themes</p>
      <TextReveal text="Make It Yours" tag="h2" class_name="text-light" />
      <p class="themes-description text-light-muted">
        From Ocean Breeze to Neon Dreams, Autumn Leaves to Midnight Sky—choose a theme that matches your mood. Each theme transforms the entire app with custom colors and a matching app icon.
      </p>
    </div>
    
    <div class="themes-preview">
      <div class="theme-dot" style="background: linear-gradient(135deg, #7BC6CC, #BE93C5);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #F093FB, #F5576C);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #4FACFE, #00F2FE);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #43E97B, #38F9D7);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #FA709A, #FEE140);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #667EEA, #764BA2);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #F6D365, #FDA085);"></div>
      <div class="theme-dot" style="background: linear-gradient(135deg, #A8EDEA, #FED6E3);"></div>
    </div>
  </div>
</section>

<!-- Quote Section -->
<section class="quote section section-dark">
  <div class="quote-bg">
    <div class="quote-gradient"></div>
    <div class="quote-lines">
      {#each Array(5) as _, i}
        <div class="quote-line" style="--delay: {i * 0.2}s;"></div>
      {/each}
    </div>
  </div>
  <div class="container">
    <div class="quote-content">
      <blockquote>
        <p>InnerEcho bridges the gap between simple journaling apps and expensive therapy. It's an AI companion that actually understands you—because you taught it how.</p>
        <p class="quote-highlight">Your mind, your companion, your growth.</p>
      </blockquote>
      
      <div class="quote-cta">
        <a href="https://apps.apple.com/us/app/innerecho-mental-health/id6683282892" target="_blank" rel="noopener" class="btn btn-primary" data-cursor-expand data-cursor-text="Link">
          Start Your Journey Free
        </a>
        <a href="/privacy" class="btn btn-outline btn-outline-light" data-cursor-expand>
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Hero Section */
  .hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    text-align: center;
    background: var(--color-dark);
    color: var(--color-cream);
    padding-top: var(--header-height);
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  /* Animated Orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: morphBlob 20s ease-in-out infinite, float 10s ease-in-out infinite;
  }
  
  .orb-1 {
    width: 500px;
    height: 500px;
    background: var(--color-sage);
    opacity: 0.4;
    top: 5%;
    left: 20%;
    animation-delay: 0s;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    background: var(--color-steel);
    opacity: 0.3;
    top: 40%;
    right: 10%;
    animation-delay: -5s;
  }
  
  .orb-3 {
    width: 350px;
    height: 350px;
    background: var(--color-navy);
    opacity: 0.5;
    bottom: 10%;
    left: 25%;
    animation-delay: -10s;
  }
  
  /* Particles */
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--color-sage);
    border-radius: 50%;
    left: var(--x);
    top: var(--y);
    opacity: 0;
    animation: particleFade 4s ease-in-out infinite;
    animation-delay: var(--delay);
  }
  
  @keyframes particleFade {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 0.6; transform: scale(1); }
  }
  
  /* Glowing Rings */
  .rings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  
  .ring {
    position: absolute;
    border: 1px solid rgba(123, 148, 156, 0.15);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ringPulse 4s ease-out infinite;
  }
  
  .ring-1 {
    width: 300px;
    height: 300px;
    animation-delay: 0s;
  }
  
  .ring-2 {
    width: 500px;
    height: 500px;
    animation-delay: 1s;
  }
  
  .ring-3 {
    width: 700px;
    height: 700px;
    animation-delay: 2s;
  }
  
  @keyframes ringPulse {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .hero-text {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-title {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease 0.2s;
  }
  
  .hero-title.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero h1 {
    font-size: clamp(4rem, 12vw, 9rem);
    margin-bottom: 0.5rem;
  }
  
  .hero-subtitle {
    font-family: var(--font-heading);
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-weight: 600;
    color: var(--color-accent);
    margin-bottom: 1.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.4s;
  }
  
  .hero-subtitle.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-tagline {
    font-size: 1.25rem;
    color: rgba(255, 245, 217, 0.7);
    max-width: 650px;
    margin: 0 auto 2.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.6s;
    line-height: 1.6;
  }
  
  .hero-tagline.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-cta {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.8s;
  }
  
  .hero-cta.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .btn-lg {
    padding: 1.25rem 2.5rem;
    font-size: 1rem;
  }
  
  .btn-lg svg {
    margin-right: 0.5rem;
  }
  
  /* Intro Section */
  .intro {
    text-align: center;
    padding: var(--space-xl) 0;
    background: var(--color-cream);
  }
  
  .intro-content {
    max-width: 900px;
    margin: 0 auto;
  }
  
  :global(.intro-headline) {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    line-height: 1.4;
  }
  
  .section-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 1.5rem;
  }
  
  /* Screenshots Section */
  .screenshots-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .screenshot-card {
    text-align: center;
  }
  
  .screenshot-placeholder {
    background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-dark) 100%);
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 0.75rem;
    aspect-ratio: 9/16;
    max-height: 500px;
    display: flex;
    align-items: flex-start;
    border: 1px solid rgba(123, 148, 156, 0.2);
    cursor: pointer;
    font: inherit;
    color: inherit;
    text-align: left;
    width: 100%;
  }
  
  .phone-ui {
    width: 100%;
  }
  
  .phone-header {
    display: flex;
    justify-content: space-between;
    color: white;
    font-family: var(--font-heading);
    font-size: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1.5rem;
  }
  
  .phone-date {
    opacity: 0.5;
    font-size: 0.85rem;
    font-family: var(--font-body);
  }
  
  .phone-content {
    color: white;
  }
  
  /* Chat Preview */
  .chat-preview {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .chat-bubble {
    padding: 0.75rem 1rem;
    border-radius: 16px;
    font-size: 0.9rem;
    max-width: 85%;
  }
  
  .chat-bubble.ai {
    background: rgba(255, 255, 255, 0.15);
    align-self: flex-start;
  }
  
  .chat-bubble.user {
    background: var(--color-accent);
    color: var(--color-dark);
    align-self: flex-end;
  }
  
  .chat-bubble.typing {
    display: flex;
    gap: 4px;
    padding: 1rem;
  }
  
  .chat-bubble .dot {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: typingDot 1.4s infinite;
  }
  
  .chat-bubble .dot:nth-child(2) { animation-delay: 0.2s; }
  .chat-bubble .dot:nth-child(3) { animation-delay: 0.4s; }
  
  @keyframes typingDot {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-4px); }
  }
  
  .journal-lines {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }
  
  .line {
    height: 8px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
  
  .line.short { width: 60%; }
  
  .go-deeper-prompt {
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(123, 148, 156, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  
  .prompt-icon {
    font-size: 1rem;
  }
  
  .chart-placeholder {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
    height: 120px;
    padding-top: 1rem;
  }
  
  .bar {
    width: 30px;
    background: linear-gradient(to top, var(--color-sage), var(--color-steel));
    border-radius: 4px 4px 0 0;
  }
  
  .insight-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .tag {
    padding: 0.4rem 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.75rem;
  }
  
  .screenshot-label {
    font-family: var(--font-heading);
    font-size: 1rem;
    color: rgba(255, 245, 217, 0.8);
  }
  
  /* AI Therapist Section */
  .ai-therapist {
    background: var(--color-cream);
    padding: var(--space-xl) 0;
  }
  
  .ai-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto var(--space-lg);
  }
  
  .ai-description {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
  }
  
  .customize-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .customize-card {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    position: relative;
    transition: var(--transition-medium);
    box-shadow: 0 4px 20px rgba(33, 60, 78, 0.05);
  }
  
  .customize-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(33, 60, 78, 0.1);
  }
  
  .customize-number {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-sage);
    opacity: 0.15;
    line-height: 1;
  }
  
  .customize-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .customize-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--color-dark);
  }
  
  .customize-card p {
    color: var(--color-text-muted);
    line-height: 1.6;
  }
  
  /* How It Works Section (Sticky) */
  .how-it-works {
    background: var(--color-navy);
  }
  
  .sticky-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }
  
  .sticky-visual {
    position: relative;
    height: 100%;
  }
  
  .sticky-wrapper {
    position: sticky;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
  }
  
  .phone-mockup-large {
    position: relative;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }
  
  .phone-frame {
    width: 300px;
    height: 620px;
    background: #1a1a1a;
    border-radius: 44px;
    padding: 14px;
    box-shadow: 0 50px 100px rgba(33, 60, 78, 0.3);
  }
  
  .phone-screen {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-dark) 100%);
    border-radius: 34px;
    overflow: hidden;
  }
  
  .app-demo {
    padding: 2.5rem 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
  }
  
  .demo-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .demo-title {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
  }
  
  .demo-subtitle {
    font-size: 0.85rem;
    opacity: 0.6;
  }
  
  .demo-prompt {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .demo-prompt p {
    font-size: 1.125rem;
  }
  
  .demo-textarea {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1.25rem;
    min-height: 150px;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .typing-cursor {
    width: 2px;
    height: 20px;
    background: var(--color-accent);
    animation: blink 1s infinite;
  }
  
  .demo-ai {
    background: rgba(123, 148, 156, 0.2);
    border-radius: 12px;
    padding: 1rem;
  }
  
  .ai-badge {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    background: var(--color-sage);
    color: var(--color-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    margin-bottom: 0.75rem;
  }
  
  .demo-ai p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .phone-glow {
    position: absolute;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, var(--color-sage) 0%, transparent 70%);
    opacity: 0.25;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    filter: blur(60px);
    animation: pulse 4s ease-in-out infinite;
  }
  
  .how-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  .content-header {
    margin-bottom: 1rem;
  }
  
  .how-description {
    font-size: 1.125rem;
    margin-top: 1.5rem;
    line-height: 1.8;
  }
  
  .text-light-muted {
    color: rgba(255, 245, 217, 0.7);
  }
  
  :global(.text-light) {
    color: var(--color-cream);
  }
  
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .feature-card {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: var(--transition-medium);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .feature-card:hover {
    transform: translateX(10px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .feature-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    background: rgba(123, 148, 156, 0.2);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .feature-content h4 {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: var(--color-cream);
  }
  
  .feature-content p {
    font-size: 0.95rem;
    color: rgba(255, 245, 217, 0.7);
    line-height: 1.6;
  }
  
  /* Privacy Section */
  .privacy {
    background: var(--color-cream);
    padding: var(--space-xl) 0;
  }
  
  .privacy-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-lg);
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .privacy-description {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .privacy-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .privacy-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    font-size: 1rem;
    color: var(--color-text);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .privacy-list .check {
    color: var(--color-sage);
    font-weight: bold;
  }
  
  .privacy-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .privacy-icon {
    font-size: 8rem;
    opacity: 0.8;
  }
  
  /* Themes Section */
  .themes {
    padding: var(--space-lg) 0;
  }
  
  .themes-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto var(--space-md);
  }
  
  .themes-description {
    font-size: 1.125rem;
    margin-top: 1.5rem;
  }
  
  .themes-preview {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
  
  .theme-dot {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: var(--transition-fast);
  }
  
  .theme-dot:hover {
    transform: scale(1.2);
  }
  
  /* Quote Section */
  .quote {
    position: relative;
    overflow: hidden;
    padding: var(--space-2xl) 0;
  }
  
  .quote-bg {
    position: absolute;
    inset: 0;
  }
  
  .quote-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(123, 148, 156, 0.15) 0%, transparent 50%);
  }
  
  .quote-lines {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-around;
    padding: 0 10%;
    pointer-events: none;
  }
  
  .quote-line {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(123, 148, 156, 0.2), transparent);
    animation: lineMove 3s ease-in-out infinite;
    animation-delay: var(--delay);
  }
  
  @keyframes lineMove {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.5; }
  }
  
  .quote-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  
  blockquote {
    margin: 0 0 3rem;
  }
  
  blockquote p {
    font-family: var(--font-heading);
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 400;
    line-height: 1.6;
    color: rgba(255, 245, 217, 0.9);
    margin-bottom: 1.5rem;
  }
  
  .quote-highlight {
    color: var(--color-accent) !important;
  }
  
  .quote-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Responsive */
  @media (max-width: 968px) {
    .sticky-container {
      grid-template-columns: 1fr;
    }
    
    .sticky-visual {
      height: auto;
      margin-bottom: 2rem;
    }
    
    .sticky-wrapper {
      position: relative;
      top: 0;
      padding-bottom: 0;
    }
    
    .phone-frame {
      width: 260px;
      height: 540px;
    }
    
    .features-list {
      text-align: left;
    }
    
    .privacy-content {
      grid-template-columns: 1fr;
    }
    
    .privacy-visual {
      order: -1;
    }
    
    .privacy-icon {
      font-size: 5rem;
    }
  }
  
  @media (max-width: 768px) {
    .screenshots-grid {
      grid-template-columns: 1fr;
      max-width: 320px;
    }
    
    .screenshot-placeholder {
      max-height: 400px;
    }
    
    .hero h1 {
      font-size: clamp(3rem, 15vw, 5rem);
    }
    
    .customize-grid {
      grid-template-columns: 1fr;
    }
  }
  
  /* InnerEcho Breathe Easter Egg Styles */
  .breathe-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #1e3a2f 0%, #0f1f1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: fadeIn 0.5s ease;
    cursor: pointer;
  }
  
  .breathe-content {
    text-align: center;
  }
  
  .breathe-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(123, 148, 156, 0.3) 0%, rgba(123, 148, 156, 0.1) 70%);
    border: 2px solid rgba(123, 148, 156, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    transition: all 4s ease;
  }
  
  .breathe-circle.inhale {
    transform: scale(1.3);
    background: radial-gradient(circle, rgba(123, 148, 156, 0.5) 0%, rgba(123, 148, 156, 0.2) 70%);
    border-color: rgba(123, 148, 156, 0.8);
    box-shadow: 0 0 60px rgba(123, 148, 156, 0.3);
  }
  
  .breathe-circle.hold {
    transform: scale(1.3);
    background: radial-gradient(circle, rgba(255, 118, 0, 0.3) 0%, rgba(123, 148, 156, 0.2) 70%);
    border-color: rgba(255, 118, 0, 0.5);
    box-shadow: 0 0 60px rgba(255, 118, 0, 0.2);
  }
  
  .breathe-circle.exhale {
    transform: scale(1);
    background: radial-gradient(circle, rgba(123, 148, 156, 0.2) 0%, rgba(123, 148, 156, 0.05) 70%);
    border-color: rgba(123, 148, 156, 0.3);
    box-shadow: none;
  }
  
  .breathe-text {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    text-transform: lowercase;
    letter-spacing: 0.1em;
  }
  
  .breathe-hint {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    margin-top: 2rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
