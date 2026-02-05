<script>
  import { onMount } from 'svelte';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import { createConfetti } from '$lib/utils/easterEggs.js';
  
  let mounted = false;
  let activeExample = 0;
  let secretPhrase = '';
  let showCurbSecret = false;
  let generationsCount = 0;
  
  function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // "curb appeal" easter egg
  function handleKeyDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key.length === 1) {
      secretPhrase += e.key.toLowerCase();
      if (secretPhrase.length > 15) secretPhrase = secretPhrase.slice(-15);
      
      if (secretPhrase.includes('curb appeal') || secretPhrase.includes('curbappeal')) {
        showCurbSecret = true;
        createConfetti(['#22c55e', '#f59e0b', '#10b981', '#fcd34d']);
        secretPhrase = '';
        setTimeout(() => showCurbSecret = false, 5000);
      }
    }
  }
  
  // Simulate generation button click
  function handleGenerateClick() {
    generationsCount++;
    if (generationsCount === 3) {
      showCurbSecret = true;
      createConfetti(['#22c55e', '#f59e0b', '#10b981']);
      setTimeout(() => showCurbSecret = false, 4000);
    }
  }
  
  const exampleListings = [
    {
      label: "Family Home",
      before: "3 bed 2 bath house. Updated kitchen. Nice backyard. Close to schools.",
      after: "Welcome to your dream home! This stunning 3-bedroom, 2-bathroom residence features a beautifully renovated chef's kitchen with granite countertops and stainless steel appliances. Step outside to your private backyard oasis—perfect for entertaining or peaceful morning coffee. Located in a sought-after neighborhood just minutes from top-rated schools."
    },
    {
      label: "Downtown Condo",
      before: "Modern condo downtown. 2 bed 2 bath. Gym and pool in building. Parking included.",
      after: "Urban luxury awaits in this sophisticated 2-bedroom, 2-bathroom downtown condo. Floor-to-ceiling windows flood the open-concept living space with natural light while offering breathtaking city views. Resort-style amenities include a state-of-the-art fitness center and rooftop pool. Secure parking included."
    },
    {
      label: "Fixer Upper",
      before: "Fixer upper in historic district. Good bones. Needs work. Big lot.",
      after: "Rare opportunity to own a piece of history! This charming residence in the coveted historic district offers incredible potential with its solid foundation and original architectural details. Sitting on an expansive lot, the property provides endless possibilities for renovation and expansion."
    }
  ];
  
  onMount(() => {
    mounted = true;
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<!-- Curb Page Easter Egg Overlay -->
{#if showCurbSecret}
  <div class="curb-secret-overlay">
    <div class="curb-secret-content">
      <div class="curb-secret-emoji">🏡</div>
      <h2 class="curb-secret-title">CURB APPEAL MAXIMIZED!</h2>
      <p class="curb-secret-text">
        Now THAT'S a listing that sells! 🎉<br/>
        Words that turn browsers into buyers.
      </p>
    </div>
  </div>
{/if}

<svelte:head>
  <title>Curb | Words That Sell Homes</title>
  <meta name="description" content="Curb is an AI-powered real estate listing generator that transforms basic property details into compelling descriptions that sell homes faster." />
</svelte:head>

<!-- Hero Section -->
<section class="curb-hero">
  <div class="curb-hero-bg">
    <div class="curb-blob curb-blob-1"></div>
    <div class="curb-blob curb-blob-2"></div>
    <div class="curb-blob curb-blob-3"></div>
    <div class="curb-mesh"></div>
    <div class="curb-grid"></div>
  </div>
  
  <div class="curb-hero-content container">
    <div class="curb-hero-text">
      <p class="curb-eyebrow" class:visible={mounted}>
        <span class="eyebrow-line"></span>
        Featured Project
      </p>
      
      <div class="curb-headline" class:visible={mounted}>
        <div class="logo-container">
          <svg class="curb-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="#15803d"/>
            <path d="M32 16C32 16 28 12 22 12C14 12 10 18 10 24C10 30 14 36 22 36C28 36 32 32 32 32" stroke="white" stroke-width="4" stroke-linecap="round"/>
            <circle cx="34" cy="14" r="4" fill="#f59e0b"/>
          </svg>
          <h1 class="text-curb-gradient">Curb</h1>
        </div>
      </div>
      
      <p class="curb-subtitle" class:visible={mounted}>
        Words That Sell Homes
      </p>

      <p class="curb-hero-description" class:visible={mounted}>
        Stop staring at blank screens. Turn basic property details into scroll-stopping 
        listing descriptions in under 30 seconds. AI that writes like your best agent—
        because it learned from thousands of top performers.
      </p>

      <div class="curb-hero-tags" class:visible={mounted}>
        <span class="hero-tag">30-Second Generation</span>
        <span class="hero-tag">MLS-Ready Format</span>
        <span class="hero-tag">Photo Intelligence</span>
        <span class="hero-tag">Social Media Captions</span>
      </div>
      
      <div class="curb-hero-cta" class:visible={mounted}>
        <a href="https://listingai-nine.vercel.app" target="_blank" rel="noopener noreferrer" class="btn btn-curb" data-cursor-expand data-cursor-text="Link">
          Try Curb Free
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/" class="btn btn-curb-outline" data-cursor-expand>
          Back to Portfolio
        </a>
      </div>
    </div>
    
    <div class="curb-hero-visual" class:visible={mounted}>
      <button class="curb-browser-mockup curb-glow-animated" data-cursor-text="View" on:click={() => scrollToSection('.curb-transformation')}>
        <div class="browser-header">
          <div class="browser-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="browser-url">curb.listingai.app</div>
        </div>
        <div class="browser-content">
          <div class="app-interface">
            <div class="app-header">
              <div class="app-logo">🏠</div>
              <span class="app-title">Curb</span>
            </div>
            <div class="app-form">
              <div class="form-field">
                <div class="field-label"></div>
                <div class="field-input"></div>
              </div>
              <div class="form-field">
                <div class="field-label short"></div>
                <div class="field-textarea"></div>
              </div>
            </div>
            <div class="app-output">
              <div class="output-header">
                <span class="output-badge">✨ AI Generated</span>
              </div>
              <div class="output-lines">
                <div class="output-line w-full"></div>
                <div class="output-line w-90"></div>
                <div class="output-line w-75"></div>
                <div class="output-line w-85"></div>
              </div>
            </div>
            <div class="app-actions">
              <div class="action-btn primary"></div>
              <div class="action-btn secondary"></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
  
  <div class="curb-scroll">
    <span>Explore the project</span>
    <div class="scroll-indicator">
      <div class="scroll-dot"></div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="curb-stats section">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-card curb-glass-card" >
        <span class="stat-number text-curb-gradient">2,500+</span>
        <span class="stat-label">Active Agents</span>
      </div>
      <div class="stat-card curb-glass-card" >
        <span class="stat-number text-curb-gradient">50,000+</span>
        <span class="stat-label">Listings Generated</span>
      </div>
      <div class="stat-card curb-glass-card" >
        <span class="stat-number text-curb-gradient">45 min</span>
        <span class="stat-label">Saved Per Listing</span>
      </div>
      <div class="stat-card curb-glass-card" >
        <span class="stat-number text-curb-amber">4.9 ⭐</span>
        <span class="stat-label">Average Rating</span>
      </div>
    </div>
  </div>
</section>

<!-- Before/After Section -->
<section class="curb-transformation section">
  <div class="container">
    <div class="transformation-header">
      <p class="section-label text-curb-emerald">The Curb Transformation</p>
      <TextReveal text="See the Difference" tag="h2" class_name="transformation-title" />
      <p class="transformation-subtitle">Watch basic property details transform into compelling, emotion-driven copy that sells.</p>
    </div>
    
    <div class="example-tabs">
      {#each exampleListings as example, i}
        <button 
          class="example-tab" 
          class:active={activeExample === i}
          on:click={() => activeExample = i}
        >
          {example.label}
        </button>
      {/each}
    </div>
    
    <div class="comparison-grid">
      <div class="comparison-card curb-glass-card before" >
        <div class="card-header">
          <span class="card-emoji">😐</span>
          <span class="card-title">Before</span>
          <span class="card-badge negative">Generic</span>
        </div>
        <p class="card-description">Basic, forgettable MLS entry</p>
        <div class="card-content">
          <p>{exampleListings[activeExample].before}</p>
        </div>
        <div class="card-footer">
          <span>{exampleListings[activeExample].before.split(' ').length} words</span>
          <span class="separator">•</span>
          <span class="negative">Low engagement</span>
        </div>
      </div>
      
      <div class="comparison-card curb-glass-card after" >
        <div class="card-header">
          <span class="card-emoji">✨</span>
          <span class="card-title">After</span>
          <span class="card-badge positive">AI-Enhanced</span>
        </div>
        <p class="card-description">Compelling, emotion-driven listing</p>
        <div class="card-content">
          <p>{exampleListings[activeExample].after}</p>
        </div>
        <div class="card-footer">
          <span>{exampleListings[activeExample].after.split(' ').length} words</span>
          <span class="separator">•</span>
          <span class="positive">📈 3x more inquiries</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="curb-features section">
  <div class="container">
    <div class="features-header">
      <p class="section-label text-curb-emerald">Powerful Features</p>
      <TextReveal text="Why Agents Love Curb" tag="h2" class_name="features-title" />
      <p class="features-subtitle">Purpose-built for real estate professionals who want to close more deals, not write more copy.</p>
    </div>
    
    <div class="features-grid">
      <div class="feature-card curb-glass-card" >
        <div class="feature-icon-box emerald">⏱️</div>
        <h3>Save Hours Every Week</h3>
        <p>Stop staring at a blank screen. Generate 5 professional variations in 30 seconds flat.</p>
      </div>
      
      <div class="feature-card curb-glass-card" >
        <div class="feature-icon-box amber">⚡</div>
        <h3>Real Estate Expertise Built-In</h3>
        <p>Not generic AI. Trained on thousands of high-performing listings that actually sell homes.</p>
      </div>
      
      <div class="feature-card curb-glass-card" >
        <div class="feature-icon-box emerald">📋</div>
        <h3>MLS-Ready Formatting</h3>
        <p>Character counts, proper formatting, ready to paste into any MLS system instantly.</p>
      </div>
      
      <div class="feature-card curb-glass-card" >
        <div class="feature-icon-box purple">🎨</div>
        <h3>Multiple Tones</h3>
        <p>Professional, luxury, friendly—choose the voice that matches your listing and brand.</p>
      </div>
      
      <div class="feature-card curb-glass-card" >
        <div class="feature-icon-box blue">📸</div>
        <h3>Photo Intelligence</h3>
        <p>Upload property photos and AI detects features automatically. Less typing, better results.</p>
      </div>
      
      <div class="feature-card curb-glass-card" >
        <div class="feature-icon-box pink">📱</div>
        <h3>Social Media Ready</h3>
        <p>Get Instagram and Facebook captions with hashtags included. Marketing made easy.</p>
      </div>
    </div>
  </div>
</section>

<!-- Tech Stack Section -->
<section class="curb-tech section">
  <div class="container">
    <div class="tech-header">
      <p class="section-label text-curb-emerald">Technology Stack</p>
      <TextReveal text="Built with modern, scalable technology" tag="h2" class_name="tech-title" />
    </div>
    
    <div class="tech-grid">
      <div class="tech-category">
        <h3>Frontend</h3>
        <div class="tech-items">
          <div class="tech-item curb-glass-card">
            <span class="tech-name">Next.js</span>
            <span class="tech-desc">App Router</span>
          </div>
          <div class="tech-item curb-glass-card">
            <span class="tech-name">TypeScript</span>
            <span class="tech-desc">Type Safety</span>
          </div>
          <div class="tech-item curb-glass-card">
            <span class="tech-name">Tailwind CSS</span>
            <span class="tech-desc">Styling</span>
          </div>
        </div>
      </div>
      
      <div class="tech-category">
        <h3>AI / ML</h3>
        <div class="tech-items">
          <div class="tech-item curb-glass-card">
            <span class="tech-name">OpenAI GPT-4</span>
            <span class="tech-desc">Language Model</span>
          </div>
          <div class="tech-item curb-glass-card">
            <span class="tech-name">Vision API</span>
            <span class="tech-desc">Photo Analysis</span>
          </div>
        </div>
      </div>
      
      <div class="tech-category">
        <h3>Backend</h3>
        <div class="tech-items">
          <div class="tech-item curb-glass-card">
            <span class="tech-name">Drizzle ORM</span>
            <span class="tech-desc">Type-safe Queries</span>
          </div>
          <div class="tech-item curb-glass-card">
            <span class="tech-name">PostgreSQL</span>
            <span class="tech-desc">Database</span>
          </div>
        </div>
      </div>
      
      <div class="tech-category">
        <h3>Testing</h3>
        <div class="tech-items">
          <div class="tech-item curb-glass-card">
            <span class="tech-name">Vitest</span>
            <span class="tech-desc">Unit Tests</span>
          </div>
          <div class="tech-item curb-glass-card">
            <span class="tech-name">Playwright</span>
            <span class="tech-desc">E2E Tests</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="curb-cta section">
  <div class="container">
    <div class="cta-content">
      <TextReveal text="Your Next Listing Deserves Better Copy" tag="h2" class_name="cta-title" />
      <p class="cta-description">
        Stop spending hours writing descriptions that don't convert. Start generating compelling copy that sells homes faster.
      </p>
      <div class="cta-buttons">
        <a href="https://listingai-nine.vercel.app" target="_blank" rel="noopener noreferrer" class="btn btn-curb" data-cursor-expand data-cursor-text="Link">
          Start Free — No Card Required
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/" class="btn btn-curb-outline" data-cursor-expand>
          Back to Portfolio
        </a>
      </div>
      <div class="cta-features">
        <span>✓ 5 free listings</span>
        <span>✓ 30-second setup</span>
        <span>✓ Cancel anytime</span>
      </div>
    </div>
  </div>
</section>

<style>
  /* Curb Color Variables */
  :root {
    --color-curb-emerald: #22c55e;
    --color-curb-emerald-dark: #15803d;
    --color-curb-amber: #f59e0b;
    --color-curb-navy: #0f172a;
    --color-curb-navy-dark: #020617;
    --color-curb-navy-light: #1e293b;
  }

  /* Curb Hero */
  .curb-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--color-curb-navy) 0%, var(--color-curb-navy-dark) 100%);
    color: white;
    padding-top: var(--header-height);
  }
  
  .curb-hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .curb-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: curbBlobFloat 20s ease-in-out infinite;
  }
  
  .curb-blob-1 {
    width: 600px;
    height: 600px;
    background: var(--color-curb-emerald);
    opacity: 0.12;
    top: -20%;
    right: -10%;
    animation-delay: 0s;
  }
  
  .curb-blob-2 {
    width: 400px;
    height: 400px;
    background: var(--color-curb-navy-light);
    opacity: 0.4;
    bottom: -10%;
    left: -5%;
    animation-delay: -7s;
  }
  
  .curb-blob-3 {
    width: 300px;
    height: 300px;
    background: var(--color-curb-amber);
    opacity: 0.08;
    top: 40%;
    left: 20%;
    animation-delay: -14s;
  }
  
  @keyframes curbBlobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }
  
  .curb-mesh {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(30, 41, 59, 0.25) 0%, transparent 50%);
  }
  
  .curb-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  
  .curb-hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--space-lg);
    align-items: center;
    padding: var(--space-lg) var(--space-md);
  }
  
  .curb-eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-curb-emerald);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.2s;
  }
  
  .eyebrow-line {
    width: 40px;
    height: 2px;
    background: var(--color-curb-emerald);
  }
  
  .curb-eyebrow.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .curb-headline {
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease 0.4s;
  }
  
  .curb-headline.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .curb-logo {
    width: 80px;
    height: 80px;
  }
  
  .curb-hero h1 {
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 700;
    line-height: 1;
  }
  
  .text-curb-gradient {
    background: linear-gradient(135deg, var(--color-curb-emerald) 0%, #10b981 50%, var(--color-curb-amber) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .curb-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.5s;
  }
  
  .curb-subtitle.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .curb-hero-description {
    font-size: 1.125rem;
    max-width: 500px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.6s;
  }
  
  .curb-hero-description.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .curb-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.7s;
  }
  
  .curb-hero-tags.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-tag {
    padding: 0.4rem 0.8rem;
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 20px;
    font-size: 0.75rem;
    font-family: var(--font-heading);
    font-weight: 500;
    color: var(--color-curb-emerald);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .curb-hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.8s;
  }
  
  .curb-hero-cta.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .curb-hero-visual {
    position: relative;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.8s ease 0.7s;
  }
  
  .curb-hero-visual.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  .curb-browser-mockup {
    background: rgba(15, 23, 42, 0.5);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(34, 197, 94, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
    text-align: left;
    display: block;
    width: 100%;
  }
  
  .curb-glow-animated {
    box-shadow: 0 0 60px rgba(34, 197, 94, 0.15);
  }
  
  .browser-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .browser-dots {
    display: flex;
    gap: 0.5rem;
  }
  
  .browser-dots .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .browser-dots .red { background: #ff5f57; }
  .browser-dots .yellow { background: #febc2e; }
  .browser-dots .green { background: #28c840; }
  
  .browser-url {
    flex: 1;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    font-family: var(--font-heading);
  }
  
  .browser-content {
    padding: 1.5rem;
    min-height: 400px;
  }
  
  .app-interface {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .app-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .app-logo {
    font-size: 1.5rem;
  }
  
  .app-title {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--color-curb-emerald);
  }
  
  .app-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .field-label {
    height: 10px;
    width: 80px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
  
  .field-label.short {
    width: 60px;
  }
  
  .field-input {
    height: 40px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .field-textarea {
    height: 80px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .app-output {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: 12px;
    padding: 1rem;
  }
  
  .output-header {
    margin-bottom: 0.75rem;
  }
  
  .output-badge {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-curb-emerald);
  }
  
  .output-lines {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .output-line {
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  .output-line.w-full { width: 100%; }
  .output-line.w-90 { width: 90%; }
  .output-line.w-85 { width: 85%; }
  .output-line.w-75 { width: 75%; }
  
  .app-actions {
    display: flex;
    gap: 0.75rem;
  }
  
  .action-btn {
    height: 44px;
    border-radius: 8px;
    flex: 1;
  }
  
  .action-btn.primary {
    background: var(--color-curb-emerald);
  }
  
  .action-btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .curb-scroll {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    font-family: var(--font-heading);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  
  .scroll-indicator {
    width: 24px;
    height: 40px;
    border: 2px solid rgba(34, 197, 94, 0.4);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  
  .scroll-dot {
    width: 4px;
    height: 8px;
    background: var(--color-curb-emerald);
    border-radius: 2px;
    animation: scrollBounce 2s ease-in-out infinite;
  }
  
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(12px); opacity: 0.5; }
  }

  /* Stats Section */
  .curb-stats {
    background: linear-gradient(180deg, var(--color-curb-navy-dark) 0%, var(--color-curb-navy) 100%);
    color: white;
    padding: 5rem 0;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  
  .stat-card {
    padding: 1.75rem;
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .text-curb-amber {
    color: var(--color-curb-amber);
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Glass Card Effect */
  .curb-glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  
  .curb-glass-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(34, 197, 94, 0.2);
  }

  /* Transformation Section */
  .curb-transformation {
    background: var(--color-curb-navy);
    color: white;
  }
  
  .transformation-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .transformation-header :global(.transformation-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    color: white;
  }
  
  .transformation-subtitle {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 1rem auto 0;
  }
  
  .section-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  
  .text-curb-emerald {
    color: var(--color-curb-emerald);
  }
  
  .example-tabs {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  
  .example-tab {
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .example-tab:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .example-tab.active {
    background: var(--color-curb-emerald);
    color: white;
    border-color: var(--color-curb-emerald);
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  }
  
  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .comparison-card {
    padding: 1.75rem;
  }
  
  .comparison-card.before {
    border-color: rgba(239, 68, 68, 0.3);
  }
  
  .comparison-card.after {
    border-color: rgba(34, 197, 94, 0.3);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .card-emoji {
    font-size: 1.5rem;
  }
  
  .card-title {
    font-weight: 600;
    font-size: 1.125rem;
  }
  
  .before .card-title {
    color: #f87171;
  }
  
  .after .card-title {
    color: var(--color-curb-emerald);
  }
  
  .card-badge {
    margin-left: auto;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .card-badge.negative {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
  }
  
  .card-badge.positive {
    background: rgba(34, 197, 94, 0.2);
    color: var(--color-curb-emerald);
  }
  
  .card-description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 1rem;
  }
  
  .card-content {
    padding: 1.25rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    margin-bottom: 1rem;
  }
  
  .card-content p {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .card-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .card-footer .separator {
    color: rgba(255, 255, 255, 0.2);
  }
  
  .card-footer .negative {
    color: #f87171;
    font-weight: 500;
  }
  
  .card-footer .positive {
    color: var(--color-curb-emerald);
    font-weight: 500;
  }

  /* Features Section */
  .curb-features {
    background: linear-gradient(180deg, var(--color-curb-navy) 0%, var(--color-curb-navy-dark) 100%);
    color: white;
  }
  
  .features-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .features-header :global(.features-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    color: white;
  }
  
  .features-subtitle {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 1rem auto 0;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.75rem;
  }
  
  .feature-icon-box {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
  }
  
  .feature-icon-box.emerald {
    background: linear-gradient(135deg, var(--color-curb-emerald) 0%, #10b981 100%);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
  }
  
  .feature-icon-box.amber {
    background: linear-gradient(135deg, #fbbf24 0%, var(--color-curb-amber) 100%);
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
  }
  
  .feature-icon-box.purple {
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }
  
  .feature-icon-box.blue {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }
  
  .feature-icon-box.pink {
    background: linear-gradient(135deg, #f472b6, #ec4899);
    box-shadow: 0 8px 20px rgba(236, 72, 153, 0.3);
  }
  
  .feature-card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: white;
  }
  
  .feature-card p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
  }

  /* Tech Stack Section */
  .curb-tech {
    background: var(--color-curb-navy-dark);
    color: white;
  }
  
  .tech-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .tech-header :global(.tech-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    color: white;
  }
  
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  
  .tech-category h3 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-curb-emerald);
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(34, 197, 94, 0.3);
  }
  
  .tech-items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .tech-item {
    padding: 0.875rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .tech-name {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
  }
  
  .tech-desc {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* CTA Section */
  .curb-cta {
    background: linear-gradient(135deg, var(--color-curb-navy) 0%, var(--color-curb-navy-dark) 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }
  
  .curb-cta::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%);
    filter: blur(60px);
  }
  
  .curb-cta::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
    filter: blur(60px);
  }
  
  .cta-content {
    position: relative;
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .cta-content :global(.cta-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1rem;
    color: white;
  }
  
  .cta-description {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
  .cta-features {
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
  }
  
  .btn-curb {
    background: var(--color-curb-emerald);
    color: white;
    box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
  }
  
  .btn-curb:hover {
    background: var(--color-curb-emerald-dark);
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(34, 197, 94, 0.4);
  }
  
  .btn-curb-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .btn-curb-outline:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .btn-icon {
    width: 18px;
    height: 18px;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 1024px) {
    .curb-hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .curb-hero-visual {
      order: -1;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .curb-hero-description {
      margin: 0 auto 1.5rem;
    }
    
    .curb-hero-tags {
      justify-content: center;
    }
    
    .curb-hero-cta {
      justify-content: center;
    }
    
    .logo-container {
      justify-content: center;
    }
    
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .comparison-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .stat-card {
      padding: 1.5rem;
    }
    
    .stat-number {
      font-size: 2rem;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
    
    .tech-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .browser-content {
      min-height: 300px;
    }
    
    .curb-logo {
      width: 60px;
      height: 60px;
    }
    
    .example-tabs {
      flex-wrap: wrap;
    }
    
    .cta-features {
      flex-direction: column;
      gap: 0.75rem;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .curb-hero-cta {
      flex-direction: column;
      align-items: center;
    }
    
    .cta-buttons {
      flex-direction: column;
    }
    
    .cta-buttons .btn {
      width: 100%;
      justify-content: center;
    }
  }
  
  /* Curb Page Easter Egg Styles */
  .curb-secret-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 36, 25, 0.97);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .curb-secret-content {
    text-align: center;
    padding: 3rem;
    max-width: 500px;
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .curb-secret-emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 1s ease infinite;
  }
  
  .curb-secret-title {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #22c55e, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .curb-secret-text {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes popIn {
    from { 
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    to { 
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
</style>
