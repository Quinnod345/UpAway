<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import TextScramble from '$lib/components/TextScramble.svelte';
  import ParallaxSection from '$lib/components/ParallaxSection.svelte';
  import { 
    handleServiceCardClick, 
    handleStatClick, 
    triggerContactCelebration,
    handlePhoneHoverStart,
    handlePhoneHoverEnd 
  } from '$lib/utils/easterEggs.js';
  
  let mounted = false;
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  let formStatus = '';
  
  // Stats easter egg - bonus clicks
  let statsBonuses = { apps: 0, patents: 0 };
  
  onMount(() => {
    mounted = true;
  });
  
  function handleSubmit(e) {
    e.preventDefault();
    formStatus = 'Thank you! I\'ll be in touch soon.';
    formData = { name: '', email: '', message: '' };
    // Trigger the celebration easter egg!
    triggerContactCelebration();
  }
  
  // Service card click handler for easter egg sequence
  function onServiceCardClick(cardNumber) {
    handleServiceCardClick(cardNumber);
  }
  
  // Stats click handler
  function onStatClick(statId) {
    const bonus = handleStatClick(statId);
    if (bonus) {
      statsBonuses[statId] = bonus;
      statsBonuses = statsBonuses; // trigger reactivity
    }
  }
</script>

<svelte:head>
  <title>Quinn O'Donnell | I Build Cool Stuff with AI</title>
  <meta name="description" content="20-year-old developer with patents pending and apps in production. I turn wild AI ideas into real products people actually use." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero-bg">
    <!-- Animated blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    
    <!-- Grid pattern -->
    <div class="hero-grid"></div>
  </div>
  
  <div class="hero-content container">
    <div class="hero-text">
      <p class="hero-eyebrow" class:visible={mounted}>
        <span class="eyebrow-line"></span>
        Developer • AI Builder • Shipping Products
      </p>
      
      <div class="hero-headline" class:visible={mounted}>
        <h1>
          I Build <span class="text-gradient">Cool Stuff</span><br/>
          With <span class="highlight">AI</span>
        </h1>
      </div>
      
      <p class="hero-description" class:visible={mounted}>
        I'm obsessed with turning bleeding-edge AI into products people actually use. 
        Not demos. Not prototypes. Real apps, live in production, solving real problems. 
        I've got patents pending and I'm just getting started.
      </p>
      <div class="hero-cta" class:visible={mounted}>
        <span data-cursor-expand>
          <MagneticButton href="#contact" variant="primary">
            <span>Let's Build Something</span>
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </MagneticButton>
        </span>
        <MagneticButton href="#work" variant="outline">See What I've Made</MagneticButton>
      </div>
    </div>
  </div>
  
  <div class="hero-scroll">
    <span>Scroll to explore</span>
    <div class="scroll-indicator">
      <div class="scroll-dot"></div>
    </div>
  </div>
</section>

<!-- Marquee -->
<div class="marquee-section">
  <div class="marquee-track">
    <div class="marquee-content">
      <span>AI Products</span>
      <span class="marquee-dot">◆</span>
      <span>Full-Stack Development</span>
      <span class="marquee-dot">◆</span>
      <span>LLM Integration</span>
      <span class="marquee-dot">◆</span>
      <span>Mobile Apps</span>
      <span class="marquee-dot">◆</span>
      <span>Production Systems</span>
      <span class="marquee-dot">◆</span>
      <span>AI Products</span>
      <span class="marquee-dot">◆</span>
      <span>Full-Stack Development</span>
      <span class="marquee-dot">◆</span>
      <span>LLM Integration</span>
      <span class="marquee-dot">◆</span>
      <span>Mobile Apps</span>
      <span class="marquee-dot">◆</span>
      <span>Production Systems</span>
      <span class="marquee-dot">◆</span>
    </div>
  </div>
</div>

<!-- Services Section (Sticky Layout) -->
<section class="services section" id="about">
  <div class="container sticky-container">
    <div class="sticky-header">
      <div class="sticky-content">
        <p class="section-label">What I Do</p>
        <TextReveal text="Full-stack, AI-native, shipped" tag="h2" class_name="section-title" />
        <p class="sticky-description">
          I don't just prototype—I build complete products and get them into users' hands. 
          From the AI backend to the pixel-perfect frontend, I own the whole stack.
        </p>
      </div>
    </div>
    
    <div class="services-list">
      <ScrollReveal animation="fade-up" delay={0}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="service-card"  on:click={() => onServiceCardClick(1)}>
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 10V22L16 28L28 22V10L16 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M16 16L28 10" stroke="currentColor" stroke-width="2"/>
              <path d="M16 16L4 10" stroke="currentColor" stroke-width="2"/>
              <path d="M16 16V28" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="service-number">01</div>
          <h3>AI Products</h3>
          <p>LLM-powered apps that actually work. Chatbots, AI assistants, intelligent workflows—the stuff that feels like magic but runs in production.</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-up" delay={0.1}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="service-card"  on:click={() => onServiceCardClick(2)}>
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 8L4 16L12 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 8L28 16L20 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="service-number">02</div>
          <h3>Full-Stack Dev</h3>
          <p>React, Next.js, SvelteKit, Node, Python—whatever gets the job done. I write code that's fast, maintainable, and doesn't make future-me cry.</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-up" delay={0.2}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="service-card"  on:click={() => onServiceCardClick(3)}>
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="4" width="16" height="24" rx="2" stroke="currentColor" stroke-width="2"/>
              <line x1="8" y1="8" x2="24" y2="8" stroke="currentColor" stroke-width="2"/>
              <line x1="8" y1="24" x2="24" y2="24" stroke="currentColor" stroke-width="2"/>
              <circle cx="16" cy="26" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div class="service-number">03</div>
          <h3>Mobile Apps</h3>
          <p>Native iOS apps that people actually download and use. Not just another side project—real apps, real users, App Store reviews and all.</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-up" delay={0.3}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="service-card"  on:click={() => onServiceCardClick(4)}>
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L20 12L28 14L22 20L24 28L16 24L8 28L10 20L4 14L12 12L16 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="service-number">04</div>
          <h3>Zero to Launch</h3>
          <p>Got an idea? I'll take it from napkin sketch to production. Architecture, development, deployment—the whole thing, shipped.</p>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- Featured Work - InnerEcho -->
<section class="work section section-navy" id="work">
  <div class="container">
    <ScrollReveal animation="fade-up">
      <div class="work-header">
        <p class="section-label text-accent">Featured Project</p>
        <TextReveal text="InnerEcho" tag="h2" class_name="text-light" />
        <p class="work-tagline">AI-Powered Mental Health Journaling</p>
      </div>
    </ScrollReveal>
    
    <div class="work-showcase">
      <ScrollReveal animation="fade-left" delay={0.1}>
        <div class="work-content">
          <p class="work-description">
            InnerEcho is a mental health journaling app that combines the therapeutic power 
            of journaling with AI-driven insights. Designed to help users reflect, grow, 
            and understand their emotional patterns.
          </p>
          
          <ul class="work-features">
            <li>
              <span class="feature-icon">✦</span>
              AI-powered mood analysis and insights
            </li>
            <li>
              <span class="feature-icon">✦</span>
              Guided journaling prompts
            </li>
            <li>
              <span class="feature-icon">✦</span>
              Privacy-first design
            </li>
            <li>
              <span class="feature-icon">✦</span>
              Beautiful, calming interface
            </li>
          </ul>
          
          <div class="work-buttons">
            <span data-cursor-text="Link">
              <MagneticButton href="https://apps.apple.com/us/app/innerecho-mental-health/id6683282892" variant="primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </MagneticButton>
            </span>
            <MagneticButton href="/innerecho" variant="outline">
              Learn More
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>
      
      <div class="work-visual">
        <ScrollReveal animation="zoom" delay={0.2}>
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            on:mouseenter={handlePhoneHoverStart}
            on:mouseleave={handlePhoneHoverEnd}
          >
            <button class="phone-mockup innerecho-phone" data-cursor-text="View" on:click={() => goto('/innerecho')}>
              <div class="phone-frame">
                <div class="phone-screen">
                  <div class="app-preview">
                    <div class="app-header-preview">
                      <span class="app-title">InnerEcho</span>
                      <span class="app-date">Today</span>
                    </div>
                    <div class="app-prompt">
                      <p>How are you feeling today?</p>
                    </div>
                    <div class="mood-buttons" >
                      <div class="mood-btn">😊</div>
                      <div class="mood-btn">😌</div>
                      <div class="mood-btn active">🤔</div>
                      <div class="mood-btn">😔</div>
                      <div class="mood-btn">😤</div>
                    </div>
                    <div class="journal-entry">
                      <div class="entry-line"></div>
                      <div class="entry-line short"></div>
                      <div class="entry-line"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="phone-glow"></div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- EOS AI Section -->
<section class="eosai section" id="eosai">
  <div class="eosai-bg">
    <div class="eos-blob eos-blob-1"></div>
    <div class="eos-blob eos-blob-2"></div>
    <div class="eos-mesh"></div>
  </div>

  <div class="container">
    <ScrollReveal animation="fade-up">
      <div class="eosai-header">
        <p class="section-label text-eos-orange">AI Assistant</p>
        <h2 class="text-eos-gradient">EOS AI</h2>
        <p class="eosai-tagline">Built for EOS Worldwide</p>
        <p class="eosai-description-main">
          An AI-powered assistant trained on core EOS materials and best practices.
          Helps businesses stay on track with their EOS implementation by providing instant answers,
          guided tools, and session preparation support. Designed to complement EOS Implementers, not replace them.
        </p>
      </div>
    </ScrollReveal>

    <div class="eosai-content">
      <div class="eosai-info">
        <div class="eosai-features-simple">
          <div class="feature-item">
            <h4>Claude 4.5 Sonnet</h4>
            <p>Anthropic's most capable AI model for thoughtful, accurate responses</p>
          </div>
          <div class="feature-item">
            <h4>6 Knowledge Sources</h4>
            <p>Pulls from EOS materials, your business info, documents, and conversation history</p>
          </div>
          <div class="feature-item">
            <h4>EOS Tools</h4>
            <p>V/TO Builder, Accountability Chart, Scorecard, and more</p>
          </div>
          <div class="feature-item">
            <h4>Voice & Research</h4>
            <p>Real-time voice chat and deep research across 40+ sources</p>
          </div>
        </div>
      </div>

      <div class="eosai-visual">
        <ScrollReveal animation="fade-left" delay={0.2}>
          <div>
            <button class="browser-mockup eos-glow-animated" data-cursor-text="View" on:click={() => goto('/eosai')}>
              <div class="browser-header">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-url">eosbot.ai</div>
              </div>
              <div class="browser-content">
                <div class="chat-interface">
                  <div class="chat-sidebar">
                    <div class="sidebar-item active"></div>
                    <div class="sidebar-item"></div>
                    <div class="sidebar-item"></div>
                  </div>
                  <div class="chat-main">
                    <div class="chat-message ai">
                      <div class="message-avatar"></div>
                      <div class="message-bubble">
                        <div class="message-line"></div>
                        <div class="message-line short"></div>
                      </div>
                    </div>
                    <div class="chat-message user">
                      <div class="message-bubble user-bubble">
                        <div class="message-line"></div>
                      </div>
                    </div>
                    <div class="chat-input">
                      <div class="input-field"></div>
                      <div class="input-btn"></div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <div class="eosai-footer">
      <div class="eosai-tech">
        <span class="tech-tag">Next.js 15</span>
        <span class="tech-tag">Claude 4.5</span>
        <span class="tech-tag">PostgreSQL</span>
        <span class="tech-tag">Vercel AI SDK</span>
      </div>


      <div class="eosai-cta">
        <span data-cursor-expand>
          <MagneticButton href="/eosai" variant="primary">
            View Project
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </MagneticButton>
        </span>
      </div>
    </div>
  </div>
</section>

<!-- Curb Section -->
<section class="curb section" id="curb">
  <div class="curb-bg">
    <div class="curb-blob curb-blob-1"></div>
    <div class="curb-blob curb-blob-2"></div>
    <div class="curb-mesh"></div>
  </div>

  <div class="container">
    <ScrollReveal animation="fade-up">
      <div class="curb-header">
        <p class="section-label text-curb-emerald">AI Listing Generator</p>
        <h2 class="text-curb-gradient">Curb</h2>
        <p class="curb-tagline">Words That Sell Homes</p>
        <p class="curb-description-main">
          An AI-powered real estate listing generator that creates compelling property descriptions 
          in seconds. Just input the property details and watch as Curb crafts professional, 
          engaging copy that helps listings stand out and sell faster.
        </p>
      </div>
    </ScrollReveal>

    <div class="curb-content-grid">
      <div class="curb-info">
        <div class="curb-features-simple">
          <div class="curb-feature-item">
            <h4>Instant Generation</h4>
            <p>Create polished listing descriptions in seconds, not hours</p>
          </div>
          <div class="curb-feature-item">
            <h4>Multiple Styles</h4>
            <p>Luxury, cozy, modern, family-friendly—match the property's vibe</p>
          </div>
          <div class="curb-feature-item">
            <h4>SEO Optimized</h4>
            <p>Descriptions crafted to rank and attract qualified buyers</p>
          </div>
          <div class="curb-feature-item">
            <h4>One-Click Copy</h4>
            <p>Export directly to your MLS or marketing materials</p>
          </div>
        </div>
      </div>

      <div class="curb-visual">
        <ScrollReveal animation="fade-left" delay={0.2}>
          <div>
            <button class="browser-mockup curb-glow-animated" data-cursor-text="View" on:click={() => goto('/curb')}>
              <div class="browser-header curb-browser-header">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-url curb-browser-url">listingai-nine.vercel.app</div>
              </div>
              <div class="browser-content curb-browser-content">
                <div class="curb-app-interface">
                  <div class="curb-form-preview">
                    <div class="curb-input-row">
                      <div class="curb-input-label"></div>
                      <div class="curb-input-field"></div>
                    </div>
                    <div class="curb-input-row">
                      <div class="curb-input-label short"></div>
                      <div class="curb-input-field"></div>
                    </div>
                  </div>
                  <div class="curb-output-preview">
                    <div class="curb-output-header">
                      <div class="curb-output-icon">✨</div>
                      <div class="curb-output-title"></div>
                    </div>
                    <div class="curb-output-text">
                      <div class="curb-text-line"></div>
                      <div class="curb-text-line"></div>
                      <div class="curb-text-line short"></div>
                    </div>
                  </div>
                  <div class="curb-generate-btn"></div>
                </div>
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <div class="curb-footer">
      <div class="curb-tech">
        <span class="curb-tech-tag">Next.js</span>
        <span class="curb-tech-tag">OpenAI</span>
        <span class="curb-tech-tag">Tailwind</span>
        <span class="curb-tech-tag">Vercel</span>
      </div>

      <div class="curb-cta">
        <span data-cursor-expand>
          <MagneticButton href="/curb" variant="primary">
            View Full Case Study
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </MagneticButton>
        </span>
      </div>
    </div>
  </div>
</section>

<!-- Vision Section -->
<section class="vision section">
  <div class="container">
    <div class="vision-grid">
      <ScrollReveal animation="fade-right">
        <div class="vision-content">
          <p class="section-label">How I Work</p>
          <TextReveal text="Ideas → Reality, Fast" tag="h2" />
          <p class="vision-text">
            I get bored by tutorials and hate leaving projects half-finished. When I see 
            something cool, I want to build it—and actually ship it. That impatience has 
            turned into multiple production apps and a couple patents before I could legally drink.
          </p>
          <p class="vision-text">
            The AI space moves fast and I love that. New model drops? I'm already thinking 
            about what I can build with it. I'm not here to write whitepapers about the future 
            of AI—I'm here to build it.
          </p>
        </div>
      </ScrollReveal>
      
      <div class="vision-stats">
        <ScrollReveal animation="fade-up" delay={0.1}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="stat stat-clickable" data-cursor-invert on:click={() => onStatClick('apps')}>
            <span class="stat-number">{3 + statsBonuses.apps}+</span>
            <span class="stat-label">Apps in Production</span>
            {#if statsBonuses.apps > 0}
              <span class="stat-bonus">+{statsBonuses.apps} bonus!</span>
            {/if}
          </div>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={0.2}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="stat stat-clickable" data-cursor-invert on:click={() => onStatClick('patents')}>
            <span class="stat-number">{2 + statsBonuses.patents}</span>
            <span class="stat-label">Patents Pending</span>
            {#if statsBonuses.patents > 0}
              <span class="stat-bonus">+{statsBonuses.patents} bonus!</span>
            {/if}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="contact section section-dark" id="contact">
  <div class="container">
    <div class="contact-grid">
      <ScrollReveal animation="fade-right">
        <div class="contact-info">
          <p class="section-label text-accent">Let's Talk</p>
          <TextReveal text="Got a wild idea?" tag="h2" class_name="text-light" />
          <p class="contact-description">
            I love hearing about ambitious projects—especially the ones that seem 
            slightly impossible. If you're building something cool and need someone 
            who ships, let's chat.
          </p>
          
          <div class="contact-details">
            <a href="mailto:support@upaway.dev" class="contact-link" data-magnetic >
              <span class="contact-link-label">Email</span>
              <span class="contact-link-value">support@upaway.dev</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal animation="fade-left" delay={0.2}>
        <div class="contact-form-wrapper">
          {#if formStatus}
            <div class="form-success">
              <span class="success-icon">✓</span>
              <p>{formStatus}</p>
            </div>
          {:else}
            <form class="contact-form" on:submit={handleSubmit}>
              <div class="form-group">
                <label for="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  bind:value={formData.name}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={formData.email}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea 
                  id="message" 
                  bind:value={formData.message}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <span data-cursor-expand>
                <MagneticButton type="submit" variant="primary">
                  Send Message
                  <span class="btn-arrow">→</span>
                </MagneticButton>
              </span>
            </form>
          {/if}
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <span class="footer-logo">Quinn O'Donnell</span>
        <p class="footer-tagline">Building AI-native products that ship.</p>
      </div>
      
      <div class="footer-links">
        <div class="footer-col">
          <span class="footer-col-title">Navigation</span>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div class="footer-col">
          <span class="footer-col-title">Projects</span>
          <a href="/innerecho">InnerEcho</a>
          <a href="/eosai">EOS AI</a>
          <a href="/curb">Curb</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        
        <div class="footer-col">
          <span class="footer-col-title">Social</span>
          <a href="https://www.linkedin.com/in/quinn-odonnell/" target="_blank" rel="noopener" data-cursor-text="Link">LinkedIn</a>
          <a href="https://github.com/Quinnod345" target="_blank" rel="noopener" data-cursor-text="Link">GitHub</a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2025 Quinn O'Donnell. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: var(--color-dark);
    color: var(--color-cream);
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  /* Animated Blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: morphBlob 15s ease-in-out infinite, float 8s ease-in-out infinite;
    will-change: transform, border-radius;
  }
  
  .blob-1 {
    width: 600px;
    height: 600px;
    background: var(--color-sage);
    opacity: 0.3;
    top: -20%;
    left: -10%;
    animation-delay: 0s;
  }
  
  .blob-2 {
    width: 400px;
    height: 400px;
    background: var(--color-steel);
    opacity: 0.25;
    top: 40%;
    right: -5%;
    animation-delay: -5s;
  }
  
  .blob-3 {
    width: 300px;
    height: 300px;
    background: var(--color-navy);
    opacity: 0.4;
    bottom: -10%;
    left: 30%;
    animation-delay: -10s;
  }
  
  /* Grid Pattern */
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(123, 148, 156, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(123, 148, 156, 0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    padding-top: var(--header-height);
  }
  
  .hero-text {
    max-width: 900px;
  }
  
  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.2s;
  }
  
  .eyebrow-line {
    width: 40px;
    height: 2px;
    background: var(--color-accent);
  }
  
  .hero-eyebrow.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-headline {
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease 0.4s;
  }
  
  .hero-headline.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
  }
  
  .highlight {
    position: relative;
    display: inline-block;
  }
  
  .highlight::after {
    content: '';
    position: absolute;
    bottom: 0.1em;
    left: 0;
    width: 100%;
    height: 0.3em;
    background: var(--color-accent);
    opacity: 0.3;
    z-index: -1;
    transform: skewX(-5deg);
  }
  
  .hero-description {
    font-size: 1.25rem;
    max-width: 600px;
    color: rgba(255, 245, 217, 0.7);
    margin-bottom: 2.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.6s;
  }
  
  .hero-description.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.8s;
  }
  
  .hero-cta.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .btn-icon {
    transition: transform 0.3s ease;
  }
  
  :global(.magnetic-btn:hover) .btn-icon {
    transform: translateX(4px);
  }
  
  .hero-scroll {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: rgba(255, 245, 217, 0.5);
    font-size: 0.75rem;
    font-family: var(--font-heading);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  
  .scroll-indicator {
    width: 24px;
    height: 40px;
    border: 2px solid rgba(123, 148, 156, 0.5);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  
  .scroll-dot {
    width: 4px;
    height: 8px;
    background: var(--color-accent);
    border-radius: 2px;
    animation: scrollBounce 2s ease-in-out infinite;
  }
  
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(12px); opacity: 0.5; }
  }

  /* Marquee */
  .marquee-section {
    background: var(--color-accent);
    padding: 1.25rem 0;
    overflow: hidden;
  }
  
  .marquee-track {
    display: flex;
    width: fit-content;
    animation: marquee 25s linear infinite;
  }
  
  .marquee-content {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding-right: 3rem;
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-dark);
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .marquee-dot {
    font-size: 0.5rem;
    opacity: 0.5;
  }

  /* Services (Sticky) */
  .services {
    background: var(--color-cream);
  }
  
  .sticky-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
  }
  
  .sticky-header {
    position: relative;
  }
  
  .sticky-content {
    position: sticky;
    top: 120px;
  }
  
  .sticky-description {
    margin-top: 1.5rem;
    font-size: 1.125rem;
    color: var(--color-text-muted);
  }
  
  .section-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 1rem;
  }
  
  .services-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .service-card {
    padding: 3rem;
    background: white;
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(33, 60, 78, 0.05);
  }
  
  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-sage), var(--color-steel));
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s ease;
  }
  
  .service-card:hover::before {
    transform: scaleY(1);
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(33, 60, 78, 0.15);
  }
  
  .service-icon {
    width: 60px;
    height: 60px;
    background: var(--color-cream);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-steel);
    margin-bottom: 1.5rem;
  }
  
  .service-number {
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-family: var(--font-heading);
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-sage);
    opacity: 0.1;
    line-height: 1;
  }
  
  .service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-dark);
  }
  
  .service-card p {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
  }

  /* Work Section */
  .work-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .work-tagline {
    font-size: 1.25rem;
    color: rgba(255, 245, 217, 0.7);
    margin-bottom: 1.5rem;
  }
  
  .work-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    align-items: center;
  }
  
  .work-description {
    font-size: 1.125rem;
    color: rgba(255, 245, 217, 0.8);
    margin-bottom: 2rem;
    line-height: 1.8;
  }
  
  .work-features {
    list-style: none;
    padding: 0;
    margin: 0 0 2.5rem 0;
  }
  
  .work-features li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1rem;
  }
  
  .feature-icon {
    color: var(--color-accent);
  }
  
  .work-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .work-visual {
    display: flex;
    justify-content: center;
  }
  
  .phone-mockup {
    position: relative;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }
  
  .phone-frame {
    width: 280px;
    height: 580px;
    background: #1a1a1a;
    border-radius: 40px;
    padding: 12px;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
  }
  
  .phone-screen {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #1e3a2f 0%, #0f1f1a 100%);
    border-radius: 32px;
    overflow: hidden;
  }
  
  .app-preview {
    padding: 3rem 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .app-header-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }
  
  .app-title {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: white;
  }
  
  .app-date {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .app-prompt {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .app-prompt p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .mood-buttons {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  
  .mood-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: var(--transition-fast);
  }
  
  .mood-btn.active {
    background: var(--color-accent);
    transform: scale(1.1);
  }
  
  .journal-entry {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
  }
  
  .entry-line {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  .entry-line.short {
    width: 60%;
  }
  
  .phone-glow {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, var(--color-sage) 0%, transparent 70%);
    opacity: 0.3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    filter: blur(60px);
    animation: pulse 4s ease-in-out infinite;
  }

  /* Curb Section */
  .curb {
    position: relative;
    background: linear-gradient(135deg, #0f2419 0%, #1a3a2a 100%);
    color: white;
    overflow: hidden;
  }

  .curb-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .curb-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: eosBlobFloat 20s ease-in-out infinite;
  }

  .curb-blob-1 {
    width: 500px;
    height: 500px;
    background: #15803d;
    opacity: 0.2;
    top: -20%;
    right: -10%;
    animation-delay: 0s;
  }

  .curb-blob-2 {
    width: 400px;
    height: 400px;
    background: #f59e0b;
    opacity: 0.15;
    bottom: -20%;
    left: -10%;
    animation-delay: -10s;
  }

  .curb-mesh {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(21, 128, 61, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
  }

  .curb .container {
    position: relative;
    z-index: 1;
  }

  .text-curb-emerald {
    color: #4ade80;
  }

  .text-curb-gradient {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 700;
    background: linear-gradient(135deg, #4ade80 0%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .curb-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }

  .curb-tagline {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
  }

  .curb-description-main {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .curb-content-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-lg);
    align-items: start;
  }

  .curb-features-simple {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .curb-feature-item {
    padding: 1.25rem;
    background: rgba(21, 128, 61, 0.1);
    border: 1px solid rgba(21, 128, 61, 0.2);
    border-radius: 12px;
  }

  .curb-feature-item h4 {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  .curb-feature-item p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }

  .curb-visual {
    display: flex;
    justify-content: center;
  }

  .curb-glow-animated {
    box-shadow: 0 0 60px rgba(21, 128, 61, 0.2);
  }

  .curb-browser-header {
    background: rgba(21, 128, 61, 0.2);
    border-bottom: 1px solid rgba(21, 128, 61, 0.3);
  }

  .curb-browser-url {
    background: rgba(0, 0, 0, 0.3);
  }

  .curb-browser-content {
    background: linear-gradient(180deg, #0f2419 0%, #1a3a2a 100%);
    min-height: 300px;
  }

  .curb-app-interface {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .curb-form-preview {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .curb-input-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .curb-input-label {
    width: 60px;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  .curb-input-label.short {
    width: 40px;
  }

  .curb-input-field {
    flex: 1;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(21, 128, 61, 0.3);
    border-radius: 6px;
  }

  .curb-output-preview {
    margin-top: 0.5rem;
    padding: 1rem;
    background: rgba(21, 128, 61, 0.1);
    border: 1px solid rgba(21, 128, 61, 0.3);
    border-radius: 8px;
  }

  .curb-output-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .curb-output-icon {
    font-size: 1rem;
  }

  .curb-output-title {
    width: 100px;
    height: 10px;
    background: rgba(245, 158, 11, 0.5);
    border-radius: 4px;
  }

  .curb-output-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .curb-text-line {
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  .curb-text-line.short {
    width: 70%;
  }

  .curb-generate-btn {
    margin-top: 0.5rem;
    height: 36px;
    background: linear-gradient(135deg, #15803d 0%, #f59e0b 100%);
    border-radius: 8px;
  }

  .curb-footer {
    margin-top: var(--space-lg);
    text-align: center;
  }

  .curb-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .curb-tech-tag {
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.8rem;
    font-family: var(--font-heading);
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.7);
  }

  .curb-cta {
    margin-top: 1rem;
  }

  @media (max-width: 968px) {
    .curb-content-grid {
      grid-template-columns: 1fr;
    }

    .curb-features-simple {
      grid-template-columns: 1fr;
    }

    .curb-tech {
      justify-content: center;
    }

    .curb-cta {
      display: flex;
      justify-content: center;
    }

    .curb-visual {
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .curb-features-simple {
      grid-template-columns: 1fr;
    }
  }

  /* Vision */
  .vision {
    background: var(--color-cream);
  }
  
  .vision-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-lg);
    align-items: center;
  }
  
  .vision-text {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
  }
  
  .vision-stats {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .stat {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 20px;
    transition: var(--transition-medium);
  }
  
  .stat:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(33, 60, 78, 0.1);
  }
  
  .stat-number {
    display: block;
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-steel);
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  /* Clickable Stats Easter Egg */
  .stat-clickable {
    cursor: pointer;
    user-select: none;
  }
  
  .stat-clickable:active {
    transform: scale(0.95);
  }
  
  .stat-bonus {
    display: block;
    font-size: 0.75rem;
    color: var(--color-accent);
    margin-top: 0.5rem;
    font-weight: 600;
    animation: bonusPop 0.3s ease;
  }
  
  @keyframes bonusPop {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  /* Service card click feedback */
  .service-card {
    cursor: pointer;
  }
  
  .service-card:active {
    transform: scale(0.98);
  }
  
  /* InnerEcho phone hover hint */
  .innerecho-phone {
    transition: all 0.5s ease;
  }
  
  .innerecho-phone:hover {
    filter: brightness(1.05);
  }

  /* Contact */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }
  
  .contact-description {
    color: rgba(255, 245, 217, 0.7);
    margin-top: 1.5rem;
    font-size: 1.125rem;
  }
  
  .contact-details {
    margin-top: 3rem;
  }
  
  .contact-link {
    display: block;
    padding: 1.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .contact-link-label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  
  .contact-link-value {
    font-size: 1.25rem;
    transition: var(--transition-fast);
  }
  
  .contact-link:hover .contact-link-value {
    color: var(--color-accent);
  }
  
  .contact-form-wrapper {
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
    color: rgba(255, 245, 217, 0.6);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: var(--color-cream);
    font-size: 1rem;
    font-family: var(--font-body);
    transition: var(--transition-fast);
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 245, 217, 0.3);
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .btn-arrow {
    margin-left: 0.5rem;
    transition: var(--transition-fast);
    display: inline-block;
  }
  
  :global(.magnetic-btn:hover) .btn-arrow {
    transform: translateX(4px);
  }
  
  .form-success {
    text-align: center;
    padding: 3rem;
  }
  
  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: var(--color-accent);
    color: var(--color-dark);
    border-radius: 50%;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .form-success p {
    font-size: 1.25rem;
  }

  /* Footer */
  .footer {
    background: var(--color-dark);
    color: var(--color-cream);
    padding: var(--space-lg) 0 var(--space-md);
    border-top: 1px solid rgba(123, 148, 156, 0.2);
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-lg);
  }
  
  .footer-logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .footer-tagline {
    color: rgba(255, 245, 217, 0.5);
    font-size: 0.9rem;
  }
  
  .footer-links {
    display: flex;
    gap: var(--space-lg);
  }
  
  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .footer-col-title {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }
  
  .footer-col a {
    color: rgba(255, 245, 217, 0.6);
    font-size: 0.9rem;
  }
  
  .footer-col a:hover {
    color: var(--color-cream);
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: var(--space-md);
    border-top: 1px solid rgba(123, 148, 156, 0.2);
  }
  
  .footer-bottom p {
    font-size: 0.85rem;
    color: rgba(255, 245, 217, 0.4);
  }

  /* EOS AI Section */
  .eosai {
    position: relative;
    background: linear-gradient(135deg, var(--color-eos-navy) 0%, var(--color-eos-navy-dark) 100%);
    color: white;
    overflow: hidden;
  }
  
  .eosai-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .eos-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: eosBlobFloat 20s ease-in-out infinite;
  }
  
  .eos-blob-1 {
    width: 500px;
    height: 500px;
    background: var(--color-eos-orange);
    opacity: 0.15;
    top: -20%;
    right: -10%;
    animation-delay: 0s;
  }
  
  .eos-blob-2 {
    width: 400px;
    height: 400px;
    background: var(--color-eos-navy-light);
    opacity: 0.3;
    bottom: -20%;
    left: -10%;
    animation-delay: -10s;
  }
  
  .eos-mesh {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 118, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(30, 77, 123, 0.2) 0%, transparent 50%);
  }
  
  .eosai .container {
    position: relative;
    z-index: 1;
  }
  
  .eosai-content {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--space-lg);
    align-items: center;
  }
  
  .eosai h2 {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .eosai-tagline {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
  }
  
  .eosai-features-simple {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .feature-item {
    padding: 1.25rem;
    background: rgba(255, 118, 0, 0.05);
    border: 1px solid rgba(255, 118, 0, 0.2);
    border-radius: 12px;
  }

  .feature-item h4 {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  .feature-item p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }
  
  .eosai-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .tech-tag {
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.8rem;
    font-family: var(--font-heading);
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .eosai-cta {
    margin-top: 1rem;
  }
  
  /* Browser Mockup */
  .browser-mockup {
    background: rgba(0, 46, 93, 0.4);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 118, 0, 0.2);
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
    min-height: 350px;
  }
  
  .chat-interface {
    display: flex;
    gap: 1rem;
    height: 100%;
  }
  
  .chat-sidebar {
    width: 60px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .sidebar-item {
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .sidebar-item.active {
    background: rgba(255, 118, 0, 0.3);
    border: 1px solid rgba(255, 118, 0, 0.5);
  }
  
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .chat-message {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .chat-message.user {
    justify-content: flex-end;
  }
  
  .message-avatar {
    width: 36px;
    height: 36px;
    background: rgba(255, 118, 0, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  
  .message-bubble {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    max-width: 70%;
  }
  
  .message-bubble.user-bubble {
    background: rgba(255, 118, 0, 0.2);
    border: 1px solid rgba(255, 118, 0, 0.3);
  }
  
  .message-line {
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin-bottom: 0.5rem;
    width: 180px;
  }
  
  .message-line.short {
    width: 120px;
    margin-bottom: 0;
  }
  
  .message-bubble.user-bubble .message-line {
    width: 100px;
    margin-bottom: 0;
  }
  
  .chat-input {
    margin-top: auto;
    display: flex;
    gap: 0.75rem;
    padding-top: 1rem;
  }
  
  .input-field {
    flex: 1;
    height: 44px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .input-btn {
    width: 44px;
    height: 44px;
    background: var(--color-eos-orange);
    border-radius: 8px;
  }

  /* Enhanced EOS AI Section */
  .eosai-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }

  .eosai-description-main {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .eosai-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-lg);
    align-items: start;
  }

  .eosai-footer {
    margin-top: var(--space-lg);
    text-align: center;
  }

  .eosai-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .eosai-cta {
    margin-top: 1rem;
  }

  /* Responsive */
  @media (max-width: 968px) {
    .sticky-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .sticky-content {
      position: relative;
      top: 0;
      margin-bottom: 2rem;
    }

    .work-showcase {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .work-content {
      order: 2;
    }
    
    .work-visual {
      order: 1;
    }
    
    .work-features li {
      justify-content: center;
    }
    
    .work-buttons {
      justify-content: center;
    }
    
    .eosai-content {
      grid-template-columns: 1fr;
    }

    .eosai-features-simple {
      grid-template-columns: 1fr;
    }

    .eosai-tech {
      justify-content: center;
    }

    .eosai-cta {
      display: flex;
      justify-content: center;
    }

    .eosai-visual {
      order: -1;
    }

    .vision-grid {
      grid-template-columns: 1fr;
    }
    
    .vision-stats {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .stat {
      flex: 1;
      min-width: 150px;
    }
    
    .contact-grid {
      grid-template-columns: 1fr;
    }
    
    .footer-content {
      flex-direction: column;
      gap: var(--space-lg);
    }
    
    .footer-links {
      flex-wrap: wrap;
    }
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: clamp(2.5rem, 10vw, 4rem);
    }
    
    .phone-frame {
      width: 240px;
      height: 500px;
    }
    
    .contact-form-wrapper {
      padding: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    .stat {
      min-width: 100%;
    }
    
    .footer-links {
      gap: var(--space-md);
    }
  }
</style>
