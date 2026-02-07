<script>
  import { onMount, onDestroy } from 'svelte';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import { createConfetti } from '$lib/utils/easterEggs.js';

  let mounted = false;
  let vtoSequence = '';
  let showVtoSecret = false;
  let logoClicks = 0;
  let logoTimeout;
  
  // Lightbox state for browser mockup
  let showMockupLightbox = false;
  
  // Lightbox state for showcase cards
  let showShowcaseLightbox = false;
  let activeShowcase = null;
  
  // Showcase data for lightbox
  const showcaseData = [
    { id: 'chat', title: 'Streaming Chat Interface', desc: 'Real-time AI responses with instant streaming. Context sources panel shows where answers come from.', tags: ['Vercel AI SDK', 'Redis Streams'] },
    { id: 'nexus', title: 'Nexus Research Mode', desc: 'Multi-step AI research orchestrator with live progress tracking. Up to 40 intelligent web searches per session.', tags: ['AI Orchestration', 'Web Search'] },
    { id: 'accountability', title: 'Accountability Chart', desc: 'ReactFlow-powered org chart with GWC ratings, rocks tracking, and measurables.', tags: ['ReactFlow'] },
    { id: 'vto', title: 'V/TO Editor', desc: 'Interactive Vision/Traction Organizer with AI-assisted goal setting and export.', tags: ['EOS Tools'] },
    { id: 'docs', title: 'Document Intelligence', desc: 'Upload PDFs and documents, then ask questions with intelligent context retrieval.', tags: ['RAG'] },
    { id: 'voice', title: 'Voice Recording Suite', desc: 'Meeting recording, transcription, and AI analysis for L10 meetings.', tags: ['Whisper API'] },
    { id: 'personas', title: 'Custom AI Personas', desc: 'Pre-built EOS personas for different roles. Create custom personas with specialized knowledge and behavior.', tags: ['Role-Based AI'] },
    { id: 'composer', title: 'Composer Studio', desc: 'Full content creation suite with V/TO builders, code generation, charts, and document export.', tags: ['Content Creation'] },
    { id: 'team', title: 'Team & Collaboration', desc: 'Organization management with role-based access, shared personas, and company-wide context.', tags: ['Enterprise'] }
  ];
  
  // Demo toast state
  let showDemoToast = false;
  let demoToastTimeout;
  
  // Video source (empty for now - to be filled later)
  let heroVideoSrc = '';
  
  // V/TO easter egg - type "vto" to trigger
  function handleKeyDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    // Close lightbox on Escape
    if (e.key === 'Escape') {
      showMockupLightbox = false;
      showShowcaseLightbox = false;
      activeShowcase = null;
      return;
    }
    
    if (e.key.length === 1) {
      vtoSequence += e.key.toLowerCase();
      if (vtoSequence.length > 5) vtoSequence = vtoSequence.slice(-5);
      
      if (vtoSequence.includes('vto')) {
        showVtoSecret = true;
        createConfetti(['#ff7600', '#FFD700', '#002e5d', '#fff']);
        vtoSequence = '';
        setTimeout(() => showVtoSecret = false, 5000);
      }
    }
  }
  
  // Logo click easter egg - 5 clicks
  function handleLogoClick() {
    logoClicks++;
    clearTimeout(logoTimeout);
    
    if (logoClicks >= 5) {
      showVtoSecret = true;
      createConfetti(['#ff7600', '#FFD700', '#002e5d']);
      logoClicks = 0;
      setTimeout(() => showVtoSecret = false, 4000);
    }
    
    logoTimeout = setTimeout(() => logoClicks = 0, 2000);
  }
  
  // Open mockup lightbox
  function openMockupLightbox() {
    showMockupLightbox = true;
  }
  
  // Close mockup lightbox
  function closeMockupLightbox() {
    showMockupLightbox = false;
  }
  
  // Open showcase lightbox
  function openShowcaseLightbox(showcaseId) {
    activeShowcase = showcaseData.find(s => s.id === showcaseId);
    showShowcaseLightbox = true;
  }
  
  // Close showcase lightbox
  function closeShowcaseLightbox() {
    showShowcaseLightbox = false;
    activeShowcase = null;
  }
  
  // Handle play button click
  function handlePlayClick() {
    if (heroVideoSrc) {
      // TODO: Play video inline when source is available
    } else {
      showDemoToast = true;
      clearTimeout(demoToastTimeout);
      demoToastTimeout = setTimeout(() => {
        showDemoToast = false;
      }, 3000);
    }
  }

  onMount(() => {
    mounted = true;
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(logoTimeout);
      clearTimeout(demoToastTimeout);
    };
  });
</script>

<!-- EOS AI Page Easter Egg Overlay -->
{#if showVtoSecret}
  <div class="eos-secret-overlay">
    <div class="eos-secret-content">
      <div class="eos-secret-emoji">🎯</div>
      <h2 class="eos-secret-title">V/TO VISION ACHIEVED!</h2>
      <p class="eos-secret-text">
        You're running on track! 🏃‍♂️<br/>
        Now that's what EOS is all about.
      </p>
    </div>
  </div>
{/if}

<!-- Browser Mockup Lightbox -->
{#if showMockupLightbox}
  <div class="mockup-lightbox-overlay" on:click={closeMockupLightbox} on:keydown={(e) => e.key === 'Escape' && closeMockupLightbox()} role="dialog" aria-label="Browser mockup preview" tabindex="-1">
    <div class="mockup-lightbox-content" on:click|stopPropagation on:keydown|stopPropagation role="document">
      <button class="lightbox-close" on:click={closeMockupLightbox} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div class="lightbox-browser-mockup">
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
              <div class="sidebar-logo">EOS</div>
              <div class="sidebar-item active"></div>
              <div class="sidebar-item"></div>
              <div class="sidebar-item"></div>
              <div class="sidebar-item"></div>
            </div>
            <div class="chat-main">
              <div class="chat-message ai">
                <div class="message-avatar"></div>
                <div class="message-bubble">
                  <div class="message-line w-full"></div>
                  <div class="message-line w-75"></div>
                  <div class="message-line w-50"></div>
                </div>
              </div>
              <div class="chat-message user">
                <div class="message-bubble user-bubble">
                  <div class="message-line w-60"></div>
                </div>
              </div>
              <div class="chat-message ai">
                <div class="message-avatar"></div>
                <div class="message-bubble">
                  <div class="message-line w-full"></div>
                  <div class="message-line w-80"></div>
                </div>
              </div>
              <div class="chat-input">
                <div class="input-field">
                  <span class="input-placeholder">Ask EOS AI anything...</span>
                </div>
                <div class="input-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="lightbox-hint">Press Escape or click outside to close</p>
    </div>
  </div>
{/if}

<!-- Showcase Lightbox -->
{#if showShowcaseLightbox && activeShowcase}
  <div class="showcase-lightbox-overlay" on:click={closeShowcaseLightbox} on:keydown={(e) => e.key === 'Escape' && closeShowcaseLightbox()} role="dialog" aria-label="Feature preview" tabindex="-1">
    <div class="showcase-lightbox-content" on:click|stopPropagation on:keydown|stopPropagation role="document">
      <button class="lightbox-close" on:click={closeShowcaseLightbox} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div class="showcase-lightbox-inner">
        <div class="showcase-lightbox-preview">
          <div class="preview-placeholder">
            <span class="preview-text">Preview</span>
          </div>
        </div>
        <div class="showcase-lightbox-info">
          <h2>{activeShowcase.title}</h2>
          <p>{activeShowcase.desc}</p>
          <div class="showcase-tags">
            {#each activeShowcase.tags as tag}
              <span class="showcase-tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
      <p class="lightbox-hint">Press Escape or click outside to close</p>
    </div>
  </div>
{/if}

<!-- Demo Coming Soon Toast -->
{#if showDemoToast}
  <div class="demo-toast">
    <span class="demo-toast-icon">🎬</span>
    <span class="demo-toast-text">Demo video coming soon!</span>
  </div>
{/if}

<svelte:head>
  <title>EOS AI | AI Assistant for EOS Businesses</title>
  <meta name="description" content="EOS AI is an AI-powered assistant built for EOS Worldwide. Helps businesses apply EOS principles with instant answers, guided tools, and session preparation support." />
</svelte:head>

<!-- Hero Section -->
<section class="eos-hero">
  <div class="eos-hero-bg">
    <div class="eos-blob eos-blob-1"></div>
    <div class="eos-blob eos-blob-2"></div>
    <div class="eos-blob eos-blob-3"></div>
    <div class="eos-mesh"></div>
    <div class="eos-grid"></div>
  </div>
  
  <div class="eos-hero-content container">
    <div class="eos-hero-text">
      <p class="eos-eyebrow" class:visible={mounted}>
        <span class="eyebrow-line"></span>
        Featured Project
      </p>
      
      <div class="eos-headline" class:visible={mounted}>
        <h1 class="text-eos-gradient">EOS AI</h1>
      </div>
      
      <p class="eos-subtitle" class:visible={mounted}>
        AI-Powered Assistant for EOS Businesses
      </p>

      <p class="eos-hero-description" class:visible={mounted}>
        An intelligent assistant trained on core EOS materials to help businesses
        stay on track between implementer sessions.
      </p>

      <div class="eos-hero-tags" class:visible={mounted}>
        <span class="hero-tag">Next.js 15</span>
        <span class="hero-tag">Vercel AI SDK</span>
        <span class="hero-tag">Claude 4.5 Sonnet / Opus</span>
        <span class="hero-tag">52 Tables</span>
      </div>
    </div>
    
    <div class="eos-hero-visual" class:visible={mounted}>
      <div class="eos-hero-video">
        <video autoplay muted loop playsinline>
          <source src="https://5m5wuohoqc.ufs.sh/f/suiIznhtTXSltvu3fdzwZQMAKiq09cDkOBtSWR25nHY83y6b" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
  
  <div class="eos-scroll">
    <span>Explore the project</span>
    <div class="scroll-indicator">
      <div class="scroll-dot"></div>
    </div>
  </div>
</section>

<!-- Overview Section with Updated Stats -->
<section class="eos-overview section">
  <div class="container">
    <div class="overview-grid">
      <div class="overview-info">
        <p class="section-label text-eos-orange">Project Overview</p>
        <TextReveal text="Built for the leaders who run the world's best businesses" tag="h2" class_name="overview-title" />
        <p class="overview-description">
          EOS Worldwide provides the Entrepreneurial Operating System, a complete set of simple
          concepts and practical tools used by thousands of companies worldwide to clarify,
          simplify, and achieve their vision.
        </p>
        <p class="overview-description">
          EOS AI is an intelligent assistant trained on core EOS materials and best practices.
          It helps businesses stay on track with their EOS implementation by providing instant answers,
          guided tools, and session preparation support.
        </p>
        <p class="overview-description highlight-text">
          <strong>Important:</strong> EOS AI is designed to complement EOS Implementers, not replace them.
          Your implementer remains essential for strategy, accountability, and the human element of EOS.
          EOS AI simply helps you apply what you've learned between sessions.
        </p>
      </div>
      
      <div class="overview-stats">
        <div class="stat-card eos-glass-card">
          <span class="stat-number text-eos-gradient">52</span>
          <span class="stat-label">Database Tables</span>
        </div>
        <div class="stat-card eos-glass-card">
          <span class="stat-number text-eos-gradient">14</span>
          <span class="stat-label">Feature Modules</span>
        </div>
        <div class="stat-card eos-glass-card">
          <span class="stat-number text-eos-gradient">6</span>
          <span class="stat-label">Knowledge Sources</span>
        </div>
        <div class="stat-card eos-glass-card">
          <span class="stat-number text-eos-gradient">9</span>
          <span class="stat-label">AI Tool Types</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Visual Showcase Section -->
<section class="eos-showcase section">
  <div class="container">
    <div class="showcase-header">
      <p class="section-label text-eos-orange">Visual Showcase</p>
      <TextReveal text="See the platform in action" tag="h2" class_name="showcase-title" />
    </div>
    
    <div class="showcase-grid">
      <!-- Showcase 1: Chat Interface -->
      <button class="showcase-card eos-glass-card showcase-large" data-cursor-text="View" on:click={() => openShowcaseLightbox('chat')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Streaming Chat Interface</h3>
          <p>Real-time AI responses with instant streaming. Context sources panel shows where answers come from.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">Vercel AI SDK</span>
            <span class="showcase-tag">Redis Streams</span>
          </div>
        </div>
      </button>
      
      <!-- Showcase 2: Nexus Research -->
      <button class="showcase-card eos-glass-card showcase-large" data-cursor-text="View" on:click={() => openShowcaseLightbox('nexus')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Nexus Research Mode</h3>
          <p>Multi-step AI research orchestrator with live progress tracking. Up to 40 intelligent web searches per session.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">AI Orchestration</span>
            <span class="showcase-tag">Web Search</span>
          </div>
        </div>
      </button>
      
      <!-- Showcase 3: Accountability Chart -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('accountability')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Accountability Chart</h3>
          <p>ReactFlow-powered org chart with GWC ratings, rocks tracking, and measurables.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">ReactFlow</span>
          </div>
        </div>
      </button>
      
      <!-- Showcase 4: V/TO Editor -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('vto')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>V/TO Editor</h3>
          <p>Interactive Vision/Traction Organizer with AI-assisted goal setting and export.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">EOS Tools</span>
          </div>
        </div>
      </button>
      
      <!-- Showcase 5: Document Intelligence -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('docs')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Document Intelligence</h3>
          <p>Upload PDFs and documents, then ask questions with intelligent context retrieval.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">RAG</span>
          </div>
        </div>
      </button>
      
      <!-- Showcase 6: Voice Recording -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('voice')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Voice Recording Suite</h3>
          <p>Meeting recording, transcription, and AI analysis for L10 meetings.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">Whisper API</span>
          </div>
        </div>
      </button>

      <!-- Showcase 7: Custom AI Personas -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('personas')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Custom AI Personas</h3>
          <p>Pre-built EOS personas for different roles. Create custom personas with specialized knowledge and behavior.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">Role-Based AI</span>
          </div>
        </div>
      </button>

      <!-- Showcase 8: Composer Studio -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('composer')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Composer Studio</h3>
          <p>Full content creation suite with V/TO builders, code generation, charts, and document export.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">Content Creation</span>
          </div>
        </div>
      </button>

      <!-- Showcase 9: Team & Collaboration -->
      <button class="showcase-card eos-glass-card" data-cursor-text="View" on:click={() => openShowcaseLightbox('team')}>
        <div class="showcase-video-placeholder">
          <div class="video-placeholder-inner">
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="showcase-info">
          <h3>Team & Collaboration</h3>
          <p>Organization management with role-based access, shared personas, and company-wide context.</p>
          <div class="showcase-tags">
            <span class="showcase-tag">Enterprise</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</section>

<!-- Technical Deep-Dive Section -->
<section class="eos-deepdive section">
  <div class="container">
    <div class="deepdive-header">
      <p class="section-label text-eos-orange">Technical Architecture</p>
      <TextReveal text="Under the hood" tag="h2" class_name="deepdive-title" />
    </div>

    <div class="deepdive-grid">
      <div class="deepdive-card eos-glass-card">
        <h3>AI Architecture</h3>
        <ul class="tech-list">
          <li><strong>Dynamic Model Selection</strong> via preflight analysis (Claude 4.5 Sonnet or Claude 4.5 Opus)</li>
          <li><strong>Complexity Detection</strong> adjusts reasoning effort (low/medium/high)</li>
          <li><strong>9 AI Tool Types</strong> including documents, search, and calendars</li>
          <li><strong>Persistent Memory</strong> across conversations</li>
        </ul>
      </div>

      <div class="deepdive-card eos-glass-card">
        <h3>6 Knowledge Sources</h3>
        <ul class="tech-list">
          <li><strong>System Knowledge</strong> - Core EOS materials (Priority 1)</li>
          <li><strong>User Memories</strong> - Explicit facts to remember (Priority 2)</li>
          <li><strong>Persona Documents</strong> - Role-specific knowledge (Priority 3)</li>
          <li><strong>Conversation Summary</strong> - Long-context continuity (Priority 4)</li>
          <li><strong>User Documents</strong> - Uploaded files & data (Priority 5)</li>
          <li><strong>Company Context</strong> - Business metadata (Priority 6)</li>
        </ul>
      </div>

      <div class="deepdive-card eos-glass-card">
        <h3>Database</h3>
        <ul class="tech-list">
          <li><strong>52 PostgreSQL tables</strong> via Drizzle ORM</li>
          <li>Users, Organizations, Chats, Messages</li>
          <li>Personas, Memory, Research Sessions</li>
          <li>L10 Meetings, Voice Recordings</li>
        </ul>
      </div>

      <div class="deepdive-card eos-glass-card">
        <h3>Real-time</h3>
        <ul class="tech-list">
          <li><strong>Resumable Streams</strong> via Redis persistence</li>
          <li><strong>Context Budgeting</strong> with adaptive token limits</li>
          <li><strong>Version History</strong> with undo/redo</li>
          <li><strong>Live Research</strong> progress in Nexus mode</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Enhanced Tech Stack Section -->
<section class="eos-tech section">
  <div class="container">
    <div class="tech-header">
      <p class="section-label text-eos-orange">Technology Stack</p>
      <TextReveal text="Built with modern, scalable technology" tag="h2" class_name="tech-title" />
    </div>
    
    <div class="tech-grid">
      <div class="tech-category">
        <h3>Frontend</h3>
        <div class="tech-items">
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Next.js 15.3</span>
            <span class="tech-desc">App Router + RSC</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">React 19 RC</span>
            <span class="tech-desc">Server Components</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">shadcn/ui</span>
            <span class="tech-desc">Radix Primitives</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">ReactFlow</span>
            <span class="tech-desc">Org Charts</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">GSAP + Framer</span>
            <span class="tech-desc">Animations</span>
          </div>
        </div>
      </div>
      
      <div class="tech-category">
        <h3>AI / ML</h3>
        <div class="tech-items">
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Vercel AI SDK 4.3</span>
            <span class="tech-desc">Streaming + Tools</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Claude 4.5 Sonnet</span>
            <span class="tech-desc">Primary Model</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Claude 4.5 Opus</span>
            <span class="tech-desc">Complex Queries</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Upstash Vector</span>
            <span class="tech-desc">1536-dim Embeddings</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">pgvector</span>
            <span class="tech-desc">HNSW Indexes</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Whisper API</span>
            <span class="tech-desc">Transcription</span>
          </div>
        </div>
      </div>
      
      <div class="tech-category">
        <h3>Backend</h3>
        <div class="tech-items">
          <div class="tech-item eos-glass-card">
            <span class="tech-name">PostgreSQL</span>
            <span class="tech-desc">Neon / Vercel</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Drizzle ORM</span>
            <span class="tech-desc">Type-safe Queries</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Redis</span>
            <span class="tech-desc">Resumable Streams</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Zod</span>
            <span class="tech-desc">Schema Validation</span>
          </div>
        </div>
      </div>
      
      <div class="tech-category">
        <h3>Services</h3>
        <div class="tech-items">
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Auth.js 5.0</span>
            <span class="tech-desc">OAuth + Credentials</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Stripe</span>
            <span class="tech-desc">Subscriptions</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Vercel Blob</span>
            <span class="tech-desc">File Storage</span>
          </div>
          <div class="tech-item eos-glass-card">
            <span class="tech-name">Resend</span>
            <span class="tech-desc">Transactional Email</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RAG Made Easy Section -->
<section class="eos-rag section">
  <div class="container">
    <div class="rag-header">
      <p class="section-label text-eos-orange">Intelligent Retrieval</p>
      <TextReveal text="RAG Made Easy" tag="h2" class_name="rag-title" />
      <p class="rag-subtitle">All knowledge sources queried in parallel during preflight for the best possible answer</p>
    </div>
    
    <div class="rag-visual">
      <!-- Central Query Node -->
      <div class="rag-center">
        <div class="query-pulse"></div>
        <div class="query-pulse query-pulse-2"></div>
        <div class="query-node">
          <span class="query-icon">?</span>
          <span class="query-label">Your Question</span>
        </div>
      </div>
      
      <!-- Parallel Streams -->
      <div class="rag-streams">
        <div class="rag-stream stream-1" style="--delay: 0s; --angle: 0deg;">
          <div class="stream-line"></div>
          <div class="stream-particle"></div>
          <div class="stream-node">
            <span class="stream-title">System Knowledge</span>
            <span class="stream-desc">Core EOS materials</span>
          </div>
        </div>
        
        <div class="rag-stream stream-2" style="--delay: 0.9s; --angle: 60deg;">
          <div class="stream-line"></div>
          <div class="stream-particle"></div>
          <div class="stream-node">
            <span class="stream-title">User Memories</span>
            <span class="stream-desc">Facts you've shared</span>
          </div>
        </div>
        
        <div class="rag-stream stream-3" style="--delay: 1.7s; --angle: 120deg;">
          <div class="stream-line"></div>
          <div class="stream-particle"></div>
          <div class="stream-node">
            <span class="stream-title">Persona Context</span>
            <span class="stream-desc">Role-specific knowledge</span>
          </div>
        </div>
        
        <div class="rag-stream stream-4" style="--delay: 2.3s; --angle: 180deg;">
          <div class="stream-line"></div>
          <div class="stream-particle"></div>
          <div class="stream-node">
            <span class="stream-title">Conversation</span>
            <span class="stream-desc">Current context</span>
          </div>
        </div>
        
        <div class="rag-stream stream-5" style="--delay: 3.1s; --angle: 240deg;">
          <div class="stream-line"></div>
          <div class="stream-particle"></div>
          <div class="stream-node">
            <span class="stream-title">Your Documents</span>
            <span class="stream-desc">Uploaded files</span>
          </div>
        </div>
        
        <div class="rag-stream stream-6" style="--delay: 4.2s; --angle: 300deg;">
          <div class="stream-line"></div>
          <div class="stream-particle"></div>
          <div class="stream-node">
            <span class="stream-title">Web Search</span>
            <span class="stream-desc">Real-time results</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Feature Pills -->
    <div class="rag-features">
      <div class="rag-pill">
        <span class="pill-text">Parallel Queries</span>
      </div>
      <div class="rag-pill">
        <span class="pill-text">Priority-Ranked</span>
      </div>
      <div class="rag-pill">
        <span class="pill-text">Source Tracking</span>
      </div>
      <div class="rag-pill">
        <span class="pill-text">Auto Deduplication</span>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="eos-cta section">
  <div class="container">
    <div class="cta-content">
      <TextReveal text="Interested in building something similar?" tag="h2" class_name="cta-title" />
      <p class="cta-description">
        Let's discuss how I can help bring your enterprise AI vision to life.
      </p>
      <div class="cta-buttons">
        <a href="/#contact" class="btn btn-eos" data-cursor-expand>
          Get in Touch
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/" class="btn btn-eos-outline" data-cursor-expand>
          Back to Portfolio
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* EOS Hero */
  .eos-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--color-eos-navy) 0%, var(--color-eos-navy-dark) 100%);
    color: white;
    padding-top: var(--header-height);
  }
  
  .eos-hero-bg {
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
    width: 600px;
    height: 600px;
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
    opacity: 0.4;
    bottom: -10%;
    left: -5%;
    animation-delay: -7s;
  }
  
  .eos-blob-3 {
    width: 300px;
    height: 300px;
    background: var(--color-eos-orange);
    opacity: 0.1;
    top: 40%;
    left: 20%;
    animation-delay: -14s;
  }
  
  .eos-mesh {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 118, 0, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(30, 77, 123, 0.25) 0%, transparent 50%);
  }
  
  .eos-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 118, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 118, 0, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  
  .eos-hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--space-lg);
    align-items: center;
    padding: var(--space-lg) var(--space-md);
  }
  
  .eos-eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-eos-orange);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.2s;
  }
  
  .eyebrow-line {
    width: 40px;
    height: 2px;
    background: var(--color-eos-orange);
  }
  
  .eos-eyebrow.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .eos-headline {
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease 0.4s;
  }
  
  .eos-headline.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .eos-hero h1 {
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 700;
    line-height: 1;
  }
  
  .eos-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.5s;
  }
  
  .eos-subtitle.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .eos-hero-description {
    font-size: 1.125rem;
    max-width: 500px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.6s;
  }
  
  .eos-hero-description.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .eos-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.7s;
  }
  
  .eos-hero-tags.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-tag {
    padding: 0.4rem 0.8rem;
    background: rgba(255, 118, 0, 0.15);
    border: 1px solid rgba(255, 118, 0, 0.3);
    border-radius: 20px;
    font-size: 0.75rem;
    font-family: var(--font-heading);
    font-weight: 500;
    color: var(--color-eos-orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .eos-hero-visual {
    position: relative;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.8s ease 0.7s;
  }
  
  .eos-hero-visual.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  .eos-hero-video {
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
    animation: video-hover 4s ease-in-out infinite;
  }
  
  @keyframes video-hover {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  .eos-hero-video video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
  }
  
  /* Video Placeholder Hero */
  .video-placeholder-hero {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .video-placeholder-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 46, 93, 0.7) 0%, rgba(255, 118, 0, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .video-placeholder-hero:hover .video-placeholder-gradient {
    opacity: 1;
  }
  
  .video-placeholder-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease;
  }
  
  .video-placeholder-hero:hover .video-placeholder-content {
    opacity: 1;
    transform: scale(1);
  }
  
  .play-button {
    width: 64px;
    height: 64px;
    background: var(--color-eos-orange);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 20px rgba(255, 118, 0, 0.5);
  }
  
  .video-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: white;
  }
  
  .eos-browser-mockup {
    background: rgba(0, 46, 93, 0.5);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 118, 0, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
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
  
  .chat-interface {
    display: flex;
    gap: 1rem;
    height: 100%;
  }
  
  .chat-sidebar {
    width: 70px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
  }
  
  .sidebar-logo {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-eos-orange);
    text-align: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0.5rem;
  }
  
  .sidebar-item {
    width: 100%;
    height: 44px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .sidebar-item.active {
    background: rgba(255, 118, 0, 0.2);
    border: 1px solid rgba(255, 118, 0, 0.4);
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
    flex-shrink: 0;
  }
  
  .message-bubble {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    max-width: 80%;
  }
  
  .message-bubble.user-bubble {
    background: rgba(255, 118, 0, 0.15);
    border: 1px solid rgba(255, 118, 0, 0.25);
  }
  
  .message-line {
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .message-line:last-child {
    margin-bottom: 0;
  }
  
  .message-line.w-full { width: 200px; }
  .message-line.w-80 { width: 160px; }
  .message-line.w-75 { width: 150px; }
  .message-line.w-60 { width: 120px; }
  .message-line.w-50 { width: 100px; }
  
  .chat-input {
    margin-top: auto;
    display: flex;
    gap: 0.75rem;
    padding-top: 1rem;
  }
  
  .input-field {
    flex: 1;
    height: 48px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
  
  .input-placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.9rem;
  }
  
  .input-btn {
    width: 48px;
    height: 48px;
    background: var(--color-eos-orange);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .eos-scroll {
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
    border: 2px solid rgba(255, 118, 0, 0.4);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  
  .scroll-dot {
    width: 4px;
    height: 8px;
    background: var(--color-eos-orange);
    border-radius: 2px;
    animation: scrollBounce 2s ease-in-out infinite;
  }
  
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(12px); opacity: 0.5; }
  }

  /* Overview Section */
  .eos-overview {
    background: linear-gradient(180deg, var(--color-eos-navy-dark) 0%, var(--color-eos-navy) 100%);
    color: white;
  }
  
  .overview-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-lg);
    align-items: center;
  }
  
  .overview-info :global(.overview-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1.5rem;
    color: white;
  }
  
  .overview-description {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  .overview-description.highlight-text {
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%);
    border-left: 3px solid var(--color-eos-orange);
    padding: 1rem 1.25rem;
    border-radius: 0 8px 8px 0;
    margin-top: 1.5rem;
  }

  .overview-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .stat-card {
    padding: 1.75rem;
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.375rem;
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Visual Showcase Section */
  .eos-showcase {
    background: var(--color-eos-navy);
    color: white;
  }
  
  .showcase-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .showcase-header :global(.showcase-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    color: white;
  }
  
  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .showcase-card {
    position: relative;
    padding: 0;
    overflow: hidden;
  }
  
  .showcase-card.showcase-large {
    grid-column: span 1;
  }
  
  .showcase-video-placeholder {
    aspect-ratio: 16/9;
    background: linear-gradient(135deg, rgba(0, 33, 61, 0.8) 0%, rgba(255, 118, 0, 0.1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  
  .showcase-video-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(45deg, transparent 40%, rgba(255, 118, 0, 0.05) 50%, transparent 60%);
    background-size: 200% 200%;
    animation: shimmerBg 3s ease-in-out infinite;
  }
  
  @keyframes shimmerBg {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .video-placeholder-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .expand-icon {
    width: 52px;
    height: 52px;
    background: rgba(0, 46, 93, 0.8);
    border: 2px solid rgba(255, 118, 0, 0.4);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
  }
  
  .showcase-card:hover .expand-icon {
    background: var(--color-eos-orange);
    border-color: var(--color-eos-orange);
    transform: scale(1.1);
    color: white;
  }
  
  .showcase-info {
    padding: 1.25rem 1.5rem;
  }
  
  .showcase-info h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: white;
  }
  
  .showcase-info p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .showcase-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .showcase-tag {
    padding: 0.35rem 0.7rem;
    background: rgba(255, 118, 0, 0.15);
    border: 1px solid rgba(255, 118, 0, 0.25);
    border-radius: 12px;
    font-size: 0.7rem;
    font-family: var(--font-heading);
    font-weight: 500;
    color: var(--color-eos-orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Technical Deep-Dive Section */
  .eos-deepdive {
    background: linear-gradient(180deg, var(--color-eos-navy) 0%, var(--color-eos-navy-dark) 100%);
    color: white;
  }
  
  .deepdive-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .deepdive-header :global(.deepdive-title) {
    font-size: clamp(2rem, 4vw, 3rem);
    color: white;
  }
  
  .deepdive-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .deepdive-card {
    padding: 1.75rem;
  }

  .deepdive-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 118, 0, 0.25);
  }
  
  .tech-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .tech-list li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
  
  .tech-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-eos-orange);
  }
  
  .tech-list li strong {
    color: white;
  }

  /* Tech Stack Section */
  .eos-tech {
    background: var(--color-eos-navy-dark);
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
    color: var(--color-eos-orange);
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 118, 0, 0.3);
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
    gap: 0.25rem;
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

  /* RAG Made Easy Section */
  .eos-rag {
    background: linear-gradient(180deg, var(--color-eos-navy-dark) 0%, var(--color-eos-navy) 100%);
    color: white;
    overflow: hidden;
  }
  
  .rag-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .rag-header :global(.rag-title) {
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: white;
    margin-bottom: 1rem;
  }
  
  .rag-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .rag-visual {
    position: relative;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
  }
  
  /* Central Query Node */
  .rag-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }
  
  .query-pulse {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 118, 0, 0.3) 0%, transparent 70%);
    animation: queryPulse 2s ease-out infinite;
  }
  
  .query-pulse-2 {
    animation-delay: 1s;
  }
  
  @keyframes queryPulse {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  
  .query-node {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, var(--color-eos-orange), #ff9500);
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(255, 118, 0, 0.35);
    z-index: 20;
    transform: translateY(25px);
  }
  
  .query-icon {
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
  }
  
  .query-label {
    font-family: var(--font-heading);
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }
  
  /* Parallel Streams */
  .rag-streams {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10;
  }
  
  .rag-stream {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    transform-origin: left center;
    animation: streamAppear 0.6s ease-out forwards;
    animation-delay: var(--delay);
    opacity: 0;
  }
  
  @keyframes streamAppear {
    0% { opacity: 0; transform: translateX(0) rotate(var(--angle)); }
    100% { opacity: 1; transform: translateX(0) rotate(var(--angle)); }
  }
  
  .stream-line {
    width: 140px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 118, 0, 0.6), rgba(255, 118, 0, 0.1));
    position: relative;
  }
  
  .stream-particle {
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 6px;
    background: var(--color-eos-orange);
    border-radius: 50%;
    transform: translateY(-50%);
    animation: particleFlow 5s ease-in-out infinite;
    animation-delay: var(--delay);
    box-shadow: 0 0 8px var(--color-eos-orange);
    z-index: 5;
  }
  
  @keyframes particleFlow {
    0%, 100% { left: 0; opacity: 1; }
    50% { left: 130px; opacity: 0.4; }
  }
  
  .stream-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.65rem 0.9rem;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 118, 0, 0.2);
    border-radius: 10px;
    transform: rotate(calc(-1 * var(--angle)));
    transition: all 0.3s ease;
    pointer-events: auto;
    min-width: 110px;
  }
  
  .stream-node:hover {
    background: rgba(255, 118, 0, 0.1);
    border-color: rgba(255, 118, 0, 0.4);
    transform: rotate(calc(-1 * var(--angle))) scale(1.05);
    box-shadow: 0 4px 16px rgba(255, 118, 0, 0.15);
  }
  
  .stream-title {
    font-family: var(--font-heading);
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    text-align: center;
  }
  
  .stream-desc {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
  }
  
  /* Feature Pills */
  .rag-features {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 3rem;
  }
  
  .rag-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    transition: all 0.3s ease;
  }
  
  .rag-pill:hover {
    background: rgba(255, 118, 0, 0.1);
    border-color: rgba(255, 118, 0, 0.3);
    transform: translateY(-2px);
  }
  
  .pill-text {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }

  /* CTA Section */
  .eos-cta {
    background: linear-gradient(135deg, var(--color-eos-navy) 0%, var(--color-eos-navy-dark) 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }
  
  .eos-cta::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 118, 0, 0.15) 0%, transparent 70%);
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
    margin-bottom: 1.5rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .section-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  
  .text-eos-orange {
    color: var(--color-eos-orange);
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 1024px) {
    .eos-hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .eos-hero-visual {
      order: -1;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .eos-hero-description {
      margin: 0 auto 1.5rem;
    }
    
    .eos-hero-tags {
      justify-content: center;
    }
    
    .showcase-grid {
      grid-template-columns: 1fr;
    }
    
    .deepdive-grid {
      grid-template-columns: 1fr;
    }
    
    .overview-grid {
      grid-template-columns: 1fr;
    }
    
    .rag-visual {
      height: 380px;
    }
    
    .stream-line {
      width: 100px;
    }
    
    .stream-node {
      min-width: 90px;
      padding: 0.5rem 0.75rem;
    }
    
    .stream-title {
      font-size: 0.65rem;
    }
    
    .stream-desc {
      display: none;
    }
    
    @keyframes particleFlow {
      0%, 100% { left: 0; opacity: 1; }
      50% { left: 90px; opacity: 0.4; }
    }
  }
  
  @media (max-width: 768px) {
    .overview-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .stat-card {
      padding: 1.5rem;
    }
    
    .stat-number {
      font-size: 2.5rem;
    }
    
    .tech-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .browser-content {
      min-height: 300px;
    }
    
    .chat-sidebar {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .overview-stats {
      grid-template-columns: 1fr;
    }
    
    .rag-visual {
      height: 320px;
    }
    
    .stream-line {
      width: 60px;
    }
    
    .stream-node {
      min-width: 70px;
      padding: 0.4rem 0.5rem;
    }
    
    .stream-title {
      font-size: 0.55rem;
    }
    
    .rag-features {
      gap: 0.5rem;
    }
    
    .rag-pill {
      padding: 0.5rem 1rem;
    }
    
    @keyframes particleFlow {
      0%, 100% { left: 0; opacity: 1; }
      50% { left: 50px; opacity: 0.4; }
    }
    
    .cta-buttons {
      flex-direction: column;
    }
    
    .cta-buttons .btn {
      width: 100%;
    }
    
    .video-placeholder-hero {
      display: none;
    }
  }
  
  /* EOS AI Page Easter Egg Styles */
  .eos-secret-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 46, 93, 0.97);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .eos-secret-content {
    text-align: center;
    padding: 3rem;
    max-width: 500px;
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .eos-secret-emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 1s ease infinite;
  }
  
  .eos-secret-title {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ff7600, #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .eos-secret-text {
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
  
  /* Browser Mockup Lightbox */
  .mockup-lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 21, 41, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10002;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(20px);
    cursor: pointer;
  }
  
  .mockup-lightbox-content {
    position: relative;
    width: 90%;
    max-width: 900px;
    animation: lightboxPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: default;
  }
  
  @keyframes lightboxPopIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  .lightbox-close {
    position: absolute;
    top: -50px;
    right: 0;
    width: 40px;
    height: 40px;
    background: rgba(255, 118, 0, 0.2);
    border: 1px solid rgba(255, 118, 0, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-eos-orange);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .lightbox-close:hover {
    background: var(--color-eos-orange);
    color: white;
    transform: scale(1.1);
  }
  
  .lightbox-browser-mockup {
    background: rgba(0, 46, 93, 0.6);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 118, 0, 0.3);
    box-shadow: 
      0 25px 80px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(255, 118, 0, 0.2);
  }
  
  .lightbox-browser-mockup .browser-content {
    min-height: 500px;
  }
  
  .lightbox-hint {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    font-family: var(--font-heading);
  }
  
  /* Showcase Lightbox */
  .showcase-lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 20, 40, 0.95);
    backdrop-filter: blur(12px);
    z-index: 10002;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
  }
  
  .showcase-lightbox-content {
    max-width: 900px;
    width: 100%;
    animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .showcase-lightbox-inner {
    background: rgba(0, 46, 93, 0.6);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 118, 0, 0.3);
    box-shadow: 
      0 25px 80px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(255, 118, 0, 0.2);
  }
  
  .showcase-lightbox-preview {
    background: linear-gradient(135deg, rgba(0, 46, 93, 0.8), rgba(0, 30, 60, 0.9));
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 118, 0, 0.2);
  }
  
  .preview-placeholder {
    width: 90%;
    height: 300px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    border: 2px dashed rgba(255, 118, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .preview-text {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.5rem;
    font-family: var(--font-heading);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  
  .showcase-lightbox-info {
    padding: 2rem;
  }
  
  .showcase-lightbox-info h2 {
    color: white;
    font-family: var(--font-heading);
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  
  .showcase-lightbox-info p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .showcase-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .showcase-tag {
    background: rgba(255, 118, 0, 0.15);
    color: var(--color-eos-orange);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  /* Demo Toast */
  .demo-toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 46, 93, 0.95);
    border: 1px solid rgba(255, 118, 0, 0.4);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10003;
    animation: toastSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
  
  @keyframes toastSlideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .demo-toast-icon {
    font-size: 1.5rem;
  }
  
  .demo-toast-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    font-weight: 500;
  }
  
  /* Make the video placeholder hero and browser mockup buttons look like buttons */
  button.video-placeholder-hero,
  button.eos-browser-mockup,
  button.showcase-card {
    font-family: inherit;
    text-align: left;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
  }
  
  button.eos-browser-mockup {
    background: rgba(0, 46, 93, 0.5);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 118, 0, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  </style>
