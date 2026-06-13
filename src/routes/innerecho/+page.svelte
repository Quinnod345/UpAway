<script>
  import { onMount } from 'svelte';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import Grainient from '$lib/components/Grainient.svelte';
  
  let mounted = false;
  let secretPhrase = '';
  let showBreatheSecret = false;

  // ── InnerEcho support form ────────────────────────────────────────────────
  let support = { name: '', email: '', message: '', company: '' };
  let supportStatus = '';
  let supportError = '';
  let supportSubmitting = false;

  async function handleSupportSubmit(e) {
    e.preventDefault();
    if (supportSubmitting) return;

    supportError = '';
    supportSubmitting = true;

    try {
      const query = new URLSearchParams({
        name: support.name,
        email: support.email,
        message: support.message,
        company: support.company,
        subject: 'InnerEcho Support'
      });

      const res = await fetch(`/api/contact?${query.toString()}`, { method: 'POST' });

      /** @type {{ error?: string; message?: string }} */
      let body = {};
      try { body = await res.json(); } catch { body = {}; }

      if (!res.ok) {
        supportError = body?.error || 'Unable to send your message right now. Please try again shortly.';
        return;
      }

      supportStatus = body?.message || "Thanks — we've got your message and will be in touch within a day or two.";
      support = { name: '', email: '', message: '', company: '' };
    } catch {
      supportError = 'Unable to send your message right now. Please try again shortly.';
    } finally {
      supportSubmitting = false;
    }
  }

  // Video references
  let smartJournalingVideo;
  let aiPromptsVideo;
  let insightsVideo;
  
  // Video playing states
  let smartJournalingPlaying = false;
  let aiPromptsPlaying = false;
  let insightsPlaying = false;
  
  // Colors matched to each icon
  const smartJournalingColors = ['#7B949C', '#536C7C', '#213C4E']; // Navy/teal (original icon)
  const aiPromptsColors = ['#6B5B95', '#9B8FBF', '#4B3F72']; // Lavender/purple (lavender icon)
  const insightsColors = ['#8FA89A', '#5B9A9A', '#B8929A']; // Sage/teal/mauve (pastel icon)
  
  // Random logo animation params for each card
  const logoAnimParams = [
    { duration: 6 + Math.random() * 4, tilt: 5 + Math.random() * 10, delay: Math.random() * 2 },
    { duration: 6 + Math.random() * 4, tilt: 5 + Math.random() * 10, delay: Math.random() * 2 },
    { duration: 6 + Math.random() * 4, tilt: 5 + Math.random() * 10, delay: Math.random() * 2 }
  ];
  
  function playVideo(video, videoName) {
    if (video) {
      if (video.paused) {
        video.play();
        if (videoName === 'smart') smartJournalingPlaying = true;
        if (videoName === 'prompts') aiPromptsPlaying = true;
        if (videoName === 'insights') insightsPlaying = true;
      } else {
        video.pause();
        video.currentTime = 0;
        if (videoName === 'smart') smartJournalingPlaying = false;
        if (videoName === 'prompts') aiPromptsPlaying = false;
        if (videoName === 'insights') insightsPlaying = false;
      }
    }
  }
  
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
  <title>InnerEcho | Intelligent Mental Health Journaling</title>
  <meta name="description" content="InnerEcho is an intelligent mental health journaling app with AI insights, an AI companion with memory, dream analysis, mood tracking, widgets, Apple Watch, and 25+ beautiful themes. Your mind, your growth." />
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
      <p class="hero-subtitle" class:visible={mounted}>Intelligent Mental Health Journaling</p>
      <p class="hero-tagline" class:visible={mounted}>
        Journal, track your mood, analyze your dreams, and discover patterns with thoughtful insights that help you understand yourself better.
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
      <TextReveal text="InnerEcho combines the therapeutic power of journaling with intelligent insights, helping you understand your emotions, track patterns, and grow through self-reflection." tag="h2" class_name="intro-headline" />
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
        <button class="screenshot-placeholder video-card" data-cursor-text="Play" on:click={() => playVideo(smartJournalingVideo, 'smart')}>
          <div class="video-phone-frame">
            <div class="video-phone-screen">
              <video bind:this={smartJournalingVideo} muted playsinline>
                <source src="https://5m5wuohoqc.ufs.sh/f/suiIznhtTXSlzMI5vBJ7XgKw8pAvltdMibEu5D3aPBkqeOyr" type="video/mp4" />
              </video>
              <div class="video-gradient-overlay" class:fade-out={smartJournalingPlaying}>
                <Grainient 
                  color1={smartJournalingColors[0]}
                  color2={smartJournalingColors[1]}
                  color3={smartJournalingColors[2]}
                  timeSpeed={0.12}
                  warpStrength={1.2}
                  warpFrequency={6}
                  warpSpeed={1}
                  warpAmplitude={120}
                  blendSoftness={0.15}
                  grainAmount={0.02}
                  grainScale={1.5}
                  contrast={1.4}
                  saturation={1.1}
                />
              </div>
              <div class="video-logo-overlay" class:hidden={smartJournalingPlaying}>
                <img src="/innerecho-icon.png" alt="InnerEcho" class="floating-logo" style="--duration: {logoAnimParams[0].duration}s; --tilt: {logoAnimParams[0].tilt}deg; --delay: {logoAnimParams[0].delay}s;" />
              </div>
              <div class="video-play-overlay" class:hidden={smartJournalingPlaying}>
                <div class="play-button">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span class="play-text">Click to play</span>
              </div>
            </div>
          </div>
        </button>
        <p class="screenshot-label">Smart Journaling</p>
      </div>
      
      <div class="screenshot-card">
        <button class="screenshot-placeholder video-card" data-cursor-text="Play" on:click={() => playVideo(aiPromptsVideo, 'prompts')}>
          <div class="video-phone-frame">
            <div class="video-phone-screen">
              <video bind:this={aiPromptsVideo} muted playsinline>
                <source src="https://5m5wuohoqc.ufs.sh/f/suiIznhtTXSl0T39gLzP3g1BAun7HCfzaUTd4txKe2JXWmhE" type="video/mp4" />
              </video>
              <div class="video-gradient-overlay" class:fade-out={aiPromptsPlaying}>
                <Grainient 
                  color1={aiPromptsColors[0]}
                  color2={aiPromptsColors[1]}
                  color3={aiPromptsColors[2]}
                  timeSpeed={0.15}
                  warpStrength={1.5}
                  warpFrequency={7}
                  warpSpeed={1.2}
                  warpAmplitude={100}
                  blendSoftness={0.12}
                  grainAmount={0.02}
                  grainScale={1.8}
                  contrast={1.4}
                  saturation={1.1}
                />
              </div>
              <div class="video-logo-overlay" class:hidden={aiPromptsPlaying}>
                <img src="/innerecho-lavender.png" alt="InnerEcho" class="floating-logo" style="--duration: {logoAnimParams[1].duration}s; --tilt: {logoAnimParams[1].tilt}deg; --delay: {logoAnimParams[1].delay}s;" />
              </div>
              <div class="video-play-overlay" class:hidden={aiPromptsPlaying}>
                <div class="play-button">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span class="play-text">Click to play</span>
              </div>
            </div>
          </div>
        </button>
        <p class="screenshot-label">Go Deeper in Your Journalling</p>
      </div>
      
      <div class="screenshot-card">
        <button class="screenshot-placeholder video-card" data-cursor-text="Play" on:click={() => playVideo(insightsVideo, 'insights')}>
          <div class="video-phone-frame">
            <div class="video-phone-screen">
              <video bind:this={insightsVideo} muted playsinline>
                <source src="https://5m5wuohoqc.ufs.sh/f/suiIznhtTXSl3tSBesRwM0GmlQyR6dIhbO9K5BgHrvx2quas" type="video/mp4" />
              </video>
              <div class="video-gradient-overlay" class:fade-out={insightsPlaying}>
                <Grainient 
                  color1={insightsColors[0]}
                  color2={insightsColors[1]}
                  color3={insightsColors[2]}
                  timeSpeed={0.1}
                  warpStrength={1.3}
                  warpFrequency={5}
                  warpSpeed={0.8}
                  warpAmplitude={110}
                  blendSoftness={0.18}
                  grainAmount={0.02}
                  grainScale={1.6}
                  contrast={1.4}
                  saturation={1.1}
                />
              </div>
              <div class="video-logo-overlay" class:hidden={insightsPlaying}>
                <img src="/innerecho-pastel.png" alt="InnerEcho" class="floating-logo" style="--duration: {logoAnimParams[2].duration}s; --tilt: {logoAnimParams[2].tilt}deg; --delay: {logoAnimParams[2].delay}s;" />
              </div>
              <div class="video-play-overlay" class:hidden={insightsPlaying}>
                <div class="play-button">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span class="play-text">Click to play</span>
              </div>
            </div>
          </div>
        </button>
        <p class="screenshot-label">Insights & Statistics</p>
      </div>
    </div>
  </div>
</section>

<!-- How It Works Section (Sticky) -->
<section class="how-it-works section section-navy">
  <div class="container sticky-container">
    <div class="sticky-visual">
      <div class="sticky-wrapper">
        <div class="phone-mockup-large">
          <div class="phone-frame">
            <div class="phone-screen">
              <video autoplay muted loop playsinline>
                <source src="https://5m5wuohoqc.ufs.sh/f/suiIznhtTXSlexj2IIVlGyz2iXj0pAkbYZ4KuvDmVUoxfQ8t" type="video/mp4" />
              </video>
            </div>
          </div>
          <div class="phone-glow"></div>
        </div>
      </div>
    </div>
    
    <div class="how-content">
      <div class="content-header">
        <p class="section-label text-accent">Intelligent Journaling</p>
        <TextReveal text="Tools That Help You Dig Deeper" tag="h2" class_name="text-light" />
        <p class="how-description text-light-muted">
          InnerEcho doesn't just store your thoughts. Every check-in echoes back a thoughtful AI insight, and Echo — your AI companion — remembers what matters to you across every conversation.
        </p>
      </div>

      <div class="features-list">
        <div class="feature-card">
          <span class="feature-icon">✨</span>
          <div class="feature-content">
            <h4>AI Insight on Every Check-In</h4>
            <p>Quick mood, energy, and sleep check-ins, each answered with a thoughtful AI reflection — a small echo back from what you shared.</p>
          </div>
        </div>

        <div class="feature-card">
          <span class="feature-icon">💬</span>
          <div class="feature-content">
            <h4>Echo, Your AI Companion</h4>
            <p>Chat with Echo anytime. It carries long-term memory of your journey, and the "What Echo remembers" panel shows you exactly what it holds onto — nothing hidden.</p>
          </div>
        </div>

        <div class="feature-card">
          <span class="feature-icon">🧭</span>
          <div class="feature-content">
            <h4>Guided Journaling Sessions</h4>
            <p>Four themed journeys, each a gentle five-step session. The AI adapts its questions to what you write, so no two sessions feel the same.</p>
          </div>
        </div>

        <div class="feature-card">
          <span class="feature-icon">🌙</span>
          <div class="feature-content">
            <h4>Dream Journal with AI Analysis</h4>
            <p>Capture dreams while they're fresh, then let AI dream analysis surface the symbols, emotions, and threads running through them.</p>
          </div>
        </div>

        <div class="feature-card">
          <span class="feature-icon">📊</span>
          <div class="feature-content">
            <h4>Statistics Dashboard</h4>
            <p>Mood, energy, and sleep trends over time, plus a writing score that reflects the depth of your journaling practice.</p>
          </div>
        </div>

        <div class="feature-card">
          <span class="feature-icon">📖</span>
          <div class="feature-content">
            <h4>Weekly Recaps & Goals</h4>
            <p>Your week, retold as a story-style recap. Set weekly goals and get AI summaries of how they're going — small ripples, tracked kindly.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Everywhere Section -->
<section class="everywhere section">
  <div class="container">
    <div class="everywhere-header">
      <p class="section-label">Beyond the Page</p>
      <TextReveal text="An Echo in Every Corner of Your Day" tag="h2" />
      <p class="everywhere-description">
        InnerEcho meets you where you already are — your home screen, your wrist, your voice, your memories.
      </p>
    </div>

    <!-- TODO(quinn): screenshot — widgets + Apple Watch lineup image belongs here -->

    <div class="everywhere-grid">
      <div class="everywhere-card">
        <span class="everywhere-icon">🔥</span>
        <h4>Streaks That Forgive</h4>
        <p>Milestones and celebrations as your streak grows — and a streak freeze repair when life gets in the way of a day.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">📱</span>
        <h4>Widgets, Including Mood</h4>
        <p>Home and lock screen widgets, an interactive mood widget for one-tap check-ins, and themed widget faces that match your app theme.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">⌚</span>
        <h4>Apple Watch App</h4>
        <p>Check in from your wrist, right in the moment a feeling happens — no phone required.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">💗</span>
        <h4>HealthKit Connected</h4>
        <p>Sync State of Mind with Apple Health (iOS 18+) and let last night's sleep inform your morning check-in. Always opt-in.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">🎙️</span>
        <h4>Voice First, On Device</h4>
        <p>Speak instead of type, anywhere in the app — speech-to-text stays on your device. And where your iPhone supports Apple Intelligence, AI runs on-device too.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">🔍</span>
        <h4>Search by Meaning</h4>
        <p>Semantic search finds entries by what they meant, not just the words you used — powered by on-device embeddings.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">🌀</span>
        <h4>Echoes from Your Past</h4>
        <p>On-this-day memories resurface gently, so you can see how far the ripples have carried you.</p>
      </div>

      <div class="everywhere-card">
        <span class="everywhere-icon">🗣️</span>
        <h4>Siri, Shortcuts & Spotlight</h4>
        <p>Start a check-in with Siri, build journaling into your Shortcuts, and find your entries straight from Spotlight.</p>
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
          Your journal lives on your device and in YOUR iCloud, not our servers. AI features only see your words with your consent, and you can lock the app behind a passcode with a privacy shield.
        </p>
        <ul class="privacy-list">
          <li><span class="check">✓</span> iCloud sync (your data, your cloud)</li>
          <li><span class="check">✓</span> Passcode lock with privacy shield, Face ID/Touch ID</li>
          <li><span class="check">✓</span> On-device AI (Apple Intelligence) where your device supports it</li>
          <li><span class="check">✓</span> Cloud AI is consent-gated — disable AI data sharing anytime</li>
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
      <p class="section-label text-accent">25+ Beautiful Themes</p>
      <TextReveal text="Make It Yours" tag="h2" class_name="text-light" />
      <p class="themes-description text-light-muted">
        From Ocean Breeze to Neon Dreams, Autumn Leaves to Midnight Sky, choose a theme that matches your mood. Each theme transforms the entire app with custom colors, a matching app icon, and themed widget faces.
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

<!-- Pricing Section -->
<section class="pricing section">
  <div class="container">
    <div class="pricing-header">
      <p class="section-label">Simple Pricing</p>
      <TextReveal text="Start Free, Go Deeper When Ready" tag="h2" />
      <p class="pricing-description">
        Core journaling and check-ins are free, forever. Premium unlocks the full echo — AI insights, Echo chat, statistics, recaps, and more.
      </p>
    </div>

    <div class="pricing-grid">
      <div class="pricing-card">
        <h3 class="plan-name">Free</h3>
        <div class="plan-price"><span class="price">$0</span></div>
        <p class="plan-blurb">Everything you need to begin.</p>
        <ul class="plan-features">
          <li><span class="check">✓</span> Unlimited journaling</li>
          <li><span class="check">✓</span> Mood, energy & sleep check-ins</li>
          <li><span class="check">✓</span> Streaks, widgets & Apple Watch</li>
          <li><span class="check">✓</span> Passcode lock & iCloud sync</li>
        </ul>
      </div>

      <div class="pricing-card">
        <h3 class="plan-name">Premium Monthly</h3>
        <div class="plan-price"><span class="price">$3.99</span><span class="period">/month</span></div>
        <p class="plan-blurb">The full experience, month to month.</p>
        <ul class="plan-features">
          <li><span class="check">✓</span> AI insights on every check-in</li>
          <li><span class="check">✓</span> Echo, your AI companion</li>
          <li><span class="check">✓</span> Statistics, recaps & dream analysis</li>
          <li><span class="check">✓</span> Guided journaling sessions</li>
        </ul>
      </div>

      <div class="pricing-card featured">
        <span class="plan-badge">Best Value</span>
        <h3 class="plan-name">Premium Annual</h3>
        <div class="plan-price"><span class="price">$27.99</span><span class="period">/year</span></div>
        <p class="plan-blurb">Just $2.33/month, with a 7-day free trial.</p>
        <ul class="plan-features">
          <li><span class="check">✓</span> Everything in Premium</li>
          <li><span class="check">✓</span> 7-day free trial</li>
          <li><span class="check">✓</span> Save over 40% vs. monthly</li>
        </ul>
      </div>

      <div class="pricing-card">
        <h3 class="plan-name">Lifetime</h3>
        <div class="plan-price"><span class="price">$149.99</span><span class="period">one-time</span></div>
        <p class="plan-blurb">Pay once, journal forever.</p>
        <ul class="plan-features">
          <li><span class="check">✓</span> Everything in Premium, for life</li>
          <li><span class="check">✓</span> Unlimited on-device AI</li>
          <li><span class="check">✓</span> Generous monthly fair-use limits on cloud AI</li>
        </ul>
      </div>
    </div>

    <p class="pricing-fine-print">
      Subscriptions auto-renew until cancelled — cancel anytime in iOS Settings › Subscriptions. Free trials convert to paid unless cancelled before they end. See our <a href="/terms-of-service" class="inline-link">Terms of Service</a> for details.
    </p>
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
        <p>InnerEcho bridges the gap between simple journaling apps and expensive therapy by offering thoughtful insights that help you understand yourself better.</p>
        <p class="quote-highlight">Your mind, your growth.</p>
      </blockquote>
      
      <div class="quote-cta">
        <a href="https://apps.apple.com/us/app/innerecho-mental-health/id6683282892" target="_blank" rel="noopener" class="btn btn-primary" data-cursor-expand data-cursor-text="Link">
          Start Your Journey Free
        </a>
        <a href="/privacy-policy" class="btn btn-outline btn-outline-light" data-cursor-expand>
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Support -->
<section id="support" class="support section">
  <div class="container">
    <div class="support-inner">
      <p class="section-label">Need a hand?</p>
      <h2 class="support-title">InnerEcho Support</h2>
      <p class="support-desc">
        Questions, feedback, a bug, or trouble with a purchase? Send us a note and a real
        human will get back to you. You can also email
        <a href="mailto:support@upaway.dev">support@upaway.dev</a>.
      </p>

      {#if supportStatus}
        <div class="support-success">
          <span class="success-icon">✓</span>
          <p>{supportStatus}</p>
        </div>
      {:else}
        <form class="support-form" on:submit={handleSupportSubmit}>
          {#if supportError}
            <p class="support-error">{supportError}</p>
          {/if}

          <div class="honeypot-field" aria-hidden="true">
            <label for="se-company">Company</label>
            <input type="text" id="se-company" bind:value={support.company} tabindex="-1" autocomplete="off" disabled={supportSubmitting} />
          </div>

          <div class="support-row">
            <div class="form-group">
              <label for="se-name">Name</label>
              <input type="text" id="se-name" bind:value={support.name} placeholder="Your name" disabled={supportSubmitting} required />
            </div>
            <div class="form-group">
              <label for="se-email">Email</label>
              <input type="email" id="se-email" bind:value={support.email} placeholder="your@email.com" disabled={supportSubmitting} required />
            </div>
          </div>

          <div class="form-group">
            <label for="se-message">How can we help?</label>
            <textarea id="se-message" bind:value={support.message} placeholder="Tell us what's going on…" rows="5" disabled={supportSubmitting} required></textarea>
          </div>

          <button type="submit" class="btn btn-primary" disabled={supportSubmitting}>
            {supportSubmitting ? 'Sending…' : 'Send to Support'}
          </button>
        </form>
      {/if}
    </div>
  </div>
</section>

<style>
  /* InnerEcho Support */
  .support-inner { max-width: 680px; margin: 0 auto; text-align: center; }
  .support-title { font-size: clamp(2rem, 5vw, 3rem); margin: 0.5rem 0 1rem; color: var(--color-dark); }
  .support-desc { color: var(--color-text-muted); line-height: 1.7; margin-bottom: 2.5rem; }
  .support-desc a { color: var(--color-steel); text-decoration: underline; text-underline-offset: 3px; }
  .support-desc a:hover { color: var(--color-accent); }
  .support-form { text-align: left; display: flex; flex-direction: column; gap: 1.25rem; }
  .support-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--color-dark); }
  .support-form input,
  .support-form textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    background: #fff;
    border: 1px solid rgba(33, 60, 78, 0.18);
    border-radius: 12px;
    color: var(--color-dark);
    font-family: var(--font-body);
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .support-form input::placeholder,
  .support-form textarea::placeholder { color: rgba(33, 60, 78, 0.4); }
  .support-form input:focus,
  .support-form textarea:focus {
    outline: none;
    border-color: var(--color-steel);
    box-shadow: 0 0 0 3px rgba(123, 148, 156, 0.15);
  }
  .support-form textarea { resize: vertical; }
  .support-form .btn-primary { align-self: flex-start; margin-top: 0.25rem; }
  .support-form .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .support-error {
    color: #b4423a;
    background: rgba(180, 66, 58, 0.08);
    border: 1px solid rgba(180, 66, 58, 0.25);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    margin: 0;
  }
  .support-success {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: center;
    background: rgba(123, 148, 156, 0.12);
    border: 1px solid rgba(123, 148, 156, 0.3);
    border-radius: 14px;
    padding: 2rem;
    color: var(--color-dark);
  }
  .support-success .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    font-weight: 700;
  }
  .honeypot-field { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  @media (max-width: 600px) { .support-row { grid-template-columns: 1fr; } }

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
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
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
  
  .screenshot-hint {
    font-size: 0.75rem;
    color: rgba(255, 245, 217, 0.5);
    margin-top: 0.25rem;
  }
  
  .video-card {
    padding: 0;
    background: transparent;
    border: none;
    aspect-ratio: unset;
    max-height: unset;
    display: block;
  }
  
  .video-phone-frame {
    width: 100%;
    max-width: min(280px, 100%);
    aspect-ratio: 9/19;
    background: #1a1a1a;
    border-radius: 38px;
    padding: 10px;
    margin: 0 auto 0.75rem auto;
  }
  
  .video-phone-screen {
    width: 100%;
    height: 100%;
    border-radius: 38px;
    overflow: hidden;
    background: #000;
    position: relative;
  }
  
  .video-phone-screen video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .video-gradient-overlay {
    position: absolute;
    inset: 0;
    border-radius: 38px;
    overflow: hidden;
    opacity: 0.98;
    transition: opacity 0.5s ease-out;
    pointer-events: none;
  }
  
  .video-gradient-overlay.fade-out {
    opacity: 0;
  }
  
  .video-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
    border-radius: 38px;
  }
  
  .video-card:hover .video-play-overlay {
    opacity: 1;
  }

  @media (hover: none) {
    .video-play-overlay {
      opacity: 1;
    }
  }
  
  .video-play-overlay.hidden {
    display: none;
  }
  
  .play-button {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  .play-button svg {
    width: 24px;
    height: 24px;
    fill: var(--color-navy);
    margin-left: 4px;
  }
  
  .play-text {
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .video-logo-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  .video-logo-overlay.hidden {
    opacity: 0;
  }
  
  .video-card:hover .video-logo-overlay {
    opacity: 0;
  }
  
  .floating-logo {
    width: 80px;
    height: 80px;
    animation: 
      float-tilt var(--duration, 10s) ease-in-out infinite,
      spin 30s linear infinite,
      pulse 4s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    will-change: transform;
    transform: translateZ(0);
  }
  
  @keyframes float-tilt {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    15% {
      transform: translateY(-5px) translateX(3px);
    }
    30% {
      transform: translateY(-2px) translateX(-4px);
    }
    45% {
      transform: translateY(4px) translateX(-2px);
    }
    60% {
      transform: translateY(5px) translateX(3px);
    }
    75% {
      transform: translateY(2px) translateX(-3px);
    }
    90% {
      transform: translateY(-3px) translateX(2px);
    }
  }
  
  @keyframes spin {
    0% {
      rotate: 0deg;
    }
    100% {
      rotate: 360deg;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      scale: 1;
    }
    50% {
      scale: 1.08;
    }
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
    width: min(300px, 100%);
    height: auto;
    aspect-ratio: 300 / 620;
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
  
  .phone-screen video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
  
  /* Everywhere Section */
  .everywhere {
    background: var(--color-cream);
    padding: var(--space-xl) 0;
  }

  .everywhere-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto var(--space-lg);
  }

  .everywhere-description {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
  }

  .everywhere-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .everywhere-card {
    padding: 1.75rem 1.5rem;
    background: rgba(33, 60, 78, 0.04);
    border: 1px solid rgba(33, 60, 78, 0.08);
    border-radius: 16px;
    transition: var(--transition-medium);
  }

  .everywhere-card:hover {
    transform: translateY(-4px);
    background: rgba(33, 60, 78, 0.07);
  }

  .everywhere-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    width: 56px;
    height: 56px;
    background: rgba(123, 148, 156, 0.15);
    border-radius: 16px;
    margin-bottom: 1rem;
  }

  .everywhere-card h4 {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
    color: var(--color-dark);
  }

  .everywhere-card p {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  /* Pricing Section */
  .pricing {
    background: var(--color-cream);
    padding: var(--space-xl) 0;
  }

  .pricing-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto var(--space-lg);
  }

  .pricing-description {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    margin-top: 1.5rem;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    align-items: stretch;
  }

  .pricing-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    background: rgba(33, 60, 78, 0.04);
    border: 1px solid rgba(33, 60, 78, 0.08);
    border-radius: 20px;
    transition: var(--transition-medium);
  }

  .pricing-card:hover {
    transform: translateY(-4px);
  }

  .pricing-card.featured {
    background: var(--color-navy);
    border-color: var(--color-sage);
    color: var(--color-cream);
    box-shadow: 0 20px 50px rgba(33, 60, 78, 0.25);
  }

  .plan-badge {
    position: absolute;
    top: -0.85rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-heading);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--color-accent);
    color: var(--color-dark);
    padding: 0.35rem 0.9rem;
    border-radius: 20px;
    white-space: nowrap;
  }

  .plan-name {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-dark);
  }

  .pricing-card.featured .plan-name {
    color: var(--color-cream);
  }

  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .plan-price .price {
    font-family: var(--font-heading);
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--color-dark);
  }

  .pricing-card.featured .plan-price .price {
    color: var(--color-cream);
  }

  .plan-price .period {
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .pricing-card.featured .plan-price .period {
    color: rgba(255, 245, 217, 0.7);
  }

  .plan-blurb {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    margin-bottom: 1.25rem;
  }

  .pricing-card.featured .plan-blurb {
    color: rgba(255, 245, 217, 0.8);
  }

  .plan-features {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: auto;
  }

  .plan-features li {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.45rem 0;
    font-size: 0.9rem;
    color: var(--color-text);
    line-height: 1.5;
  }

  .pricing-card.featured .plan-features li {
    color: rgba(255, 245, 217, 0.9);
  }

  .plan-features .check {
    color: var(--color-sage);
    font-weight: bold;
    flex-shrink: 0;
  }

  .pricing-fine-print {
    text-align: center;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    max-width: 650px;
    margin: var(--space-md) auto 0;
    line-height: 1.6;
  }

  .pricing-fine-print .inline-link {
    color: var(--color-steel);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .pricing-fine-print .inline-link:hover {
    color: var(--color-accent);
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
      width: min(260px, 100%);
      aspect-ratio: 260 / 540;
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
      margin: 0 auto;
      gap: 2rem;
    }
    
    .screenshot-placeholder {
      max-height: none;
    }

    .video-phone-frame {
      max-width: min(260px, 80vw);
    }
    
    .hero h1 {
      font-size: clamp(3rem, 15vw, 5rem);
    }
    
    .customize-grid {
      grid-template-columns: 1fr;
    }

    .hero-tagline {
      font-size: 1.1rem;
    }

    .privacy-icon {
      font-size: 4rem;
    }

    .quote {
      padding: var(--space-xl) 0;
    }

    blockquote p {
      font-size: clamp(1.1rem, 3vw, 1.5rem);
    }

    .feature-card {
      padding: 1.25rem;
    }

    .feature-icon {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .screenshots-grid {
      max-width: 280px;
    }

    .video-phone-frame {
      max-width: min(220px, 70vw);
      border-radius: 32px;
      padding: 8px;
    }

    .video-phone-screen,
    .video-gradient-overlay,
    .video-play-overlay {
      border-radius: 30px;
    }

    .phone-frame {
      width: min(220px, 65vw);
      border-radius: 36px;
      padding: 10px;
    }

    .phone-screen {
      border-radius: 28px;
    }

    .hero-tagline {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .hero-subtitle {
      font-size: 0.85rem;
      letter-spacing: 0.1em;
    }

    .btn-lg {
      padding: 1rem 1.75rem;
      font-size: 0.9rem;
    }

    .btn-lg svg {
      width: 18px;
      height: 18px;
    }

    .feature-card {
      gap: 1rem;
      flex-direction: column;
      text-align: center;
    }

    .feature-icon {
      margin: 0 auto;
    }

    .feature-card:hover {
      transform: none;
    }

    .how-description {
      font-size: 1rem;
    }

    .privacy-description {
      font-size: 1rem;
    }

    .everywhere-description,
    .pricing-description {
      font-size: 1rem;
    }

    .everywhere-card:hover,
    .pricing-card:hover {
      transform: none;
    }

    .themes-description {
      font-size: 1rem;
    }

    .theme-dot {
      width: 44px;
      height: 44px;
    }

    .play-button {
      width: 52px;
      height: 52px;
    }

    .floating-logo {
      width: 60px;
      height: 60px;
    }

    .quote-cta {
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 390px) {
    .screenshots-grid {
      max-width: 250px;
    }

    .video-phone-frame {
      max-width: 200px;
      border-radius: 28px;
      padding: 6px;
    }

    .video-phone-screen,
    .video-gradient-overlay,
    .video-play-overlay {
      border-radius: 26px;
    }

    .phone-frame {
      width: 200px;
      border-radius: 32px;
      padding: 8px;
    }

    .phone-screen {
      border-radius: 26px;
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
