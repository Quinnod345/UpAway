<script>
  import { onMount } from 'svelte';
  import { checkAboutPageScroll, hideAboutFunFact } from '$lib/utils/easterEggs.js';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    // Add scroll listener for about page easter egg
    window.addEventListener('scroll', checkAboutPageScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkAboutPageScroll);
      hideAboutFunFact();
    };
  });
</script>

<svelte:head>
  <title>About Quinn O'Donnell | EOS® Technology Lead & Software Innovator</title>
  <meta name="description" content="Quinn O'Donnell - Lead Software Engineer at EOS Worldwide, founder of UpAway, National Cyber Scholar, and AI student at Penn State. Building AI-powered solutions that drive real impact." />
</svelte:head>

<!-- Hero Section -->
<section class="about-hero">
  <div class="hero-bg">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="hero-grid"></div>
  </div>
  
  <div class="hero-content container">
    <div class="hero-text">
      <p class="hero-eyebrow" class:visible={mounted}>
        <span class="eyebrow-line"></span>
        EOS® Technology Lead | Software Innovator
      </p>
      
      <div class="hero-headline" class:visible={mounted}>
        <h1>
          Hi, I'm <span class="text-gradient">Quinn</span> 👋
        </h1>
      </div>
      
      <p class="hero-description" class:visible={mounted}>
        I get genuinely excited about building things that help people. Whether it's an AI that 
        helps businesses run better, an app that makes mental health journaling feel less lonely, 
        or teaching a high schooler that security can actually be <em>fun</em> — I'm all in.
      </p>
      
      <div class="hero-cta" class:visible={mounted}>
        <a href="mailto:quinn@upaway.dev" class="btn btn-primary" data-cursor-expand >
          <span>Let's Chat</span>
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/quinn-o-donnell-0315bb29b/" target="_blank" rel="noopener" class="btn btn-outline btn-outline-light" data-cursor-expand data-cursor-text="Link">LinkedIn</a>
      </div>
    </div>
  </div>
</section>

<!-- Quote Banner -->
<div class="quote-banner">
  <div class="container">
    <blockquote>
      "I don't just want to write code — I want to build things that matter to real people."
    </blockquote>
  </div>
</div>

<!-- What Drives Me -->
<section class="drives section">
  <div class="container">
    <div class="drives-header">
      <p class="section-label">What Drives Me</p>
      <h2>Why I Build</h2>
    </div>
    
    <div class="drives-grid">
      <div class="drive-card" >
        <div class="drive-emoji">🧠</div>
        <h3>AI That Actually Helps</h3>
        <p>
          I'm obsessed with AI — not the hype, but the <em>possibility</em>. The idea that we can build 
          systems that understand context, learn patterns, and genuinely help people make better decisions? 
          That keeps me up at night (in a good way). At EOS Worldwide, I get to build AI that helps 
          thousands of businesses run better. That's not just cool tech — that's real impact.
        </p>
      </div>
      
      <div class="drive-card" >
        <div class="drive-emoji">💚</div>
        <h3>Mental Health Matters</h3>
        <p>
          I built InnerEcho because I believe everyone deserves tools to understand themselves better. 
          Journaling changed my life, and I wanted to make that experience more accessible — with AI 
          that helps you see patterns you might miss, prompts that actually make you think, and a 
          space that feels safe. Mental health shouldn't be a luxury.
        </p>
      </div>
      
      <div class="drive-card" >
        <div class="drive-emoji">🌱</div>
        <h3>Growing the Next Generation</h3>
        <p>
          Teaching cybersecurity at Wilson High was one of the most rewarding things I've ever done. 
          Watching students go from "I don't get this" to crushing it in CyberPatriot competitions? 
          Incredible. I believe in paying it forward — the tech community gave me so much, and I 
          want to help others find that same spark.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Story Section -->
<section class="story section section-navy">
  <div class="container">
    <div class="story-grid">
      <div class="story-content">
        <p class="section-label text-accent">My Story</p>
        <h2 class="text-light">From Classroom to Patents Pending</h2>
        
        <div class="story-text">
          <p>
            Here's the thing — I never planned to have patents pending by my early twenties. I just 
            kept saying yes to interesting problems.
          </p>
          
          <p>
            It started with security. I got deep into cybersecurity, earned the National Cyber Scholar 
            award, and eventually found myself teaching it to high schoolers. Turns out, explaining 
            complex things to teenagers is the best way to actually understand them yourself.
          </p>
          
          <p>
            Then came EOS Worldwide. They needed someone to build AI tools for their business operating 
            system, and I dove in headfirst. Now I'm leading their AI initiative, building a chatbot 
            that helps companies implement EOS, and working on innovations that have <strong>actual 
            patents pending</strong>. Wild.
          </p>
          
          <p>
            Somewhere in there, I started UpAway because I wanted to build something that was 
            <em>mine</em> — something that could help people on a personal level. InnerEcho is live 
            on the App Store now, and every time someone tells me it helped them process something 
            difficult, I remember why I do this.
          </p>
          
          <p>
            Now I'm at Penn State studying AI formally, because I want to go deeper. I've built a lot 
            by learning on the job, but I'm hungry for the theory, the math, the foundations that 
            will let me build even bigger things.
          </p>
        </div>
      </div>
      
      <div class="story-sidebar">
        <div class="story-quote">
          <span class="quote-mark">"</span>
          <p>Every time someone tells me InnerEcho helped them process something difficult, I remember why I do this.</p>
        </div>
        
        <div class="story-stats">
          <div class="stat">
            <span class="stat-number">🚀</span>
            <span class="stat-label">Products Shipped</span>
          </div>
          <div class="stat">
            <span class="stat-number">📜</span>
            <span class="stat-label">Patents Pending</span>
          </div>
          <div class="stat">
            <span class="stat-number">🏆</span>
            <span class="stat-label">National Cyber Scholar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- What I'm Good At -->
<section class="skills section">
  <div class="container">
    <div class="skills-header">
      <p class="section-label">What I'm Good At</p>
      <h2>Tech I Love Working With</h2>
      <p class="skills-subhead">These aren't just buzzwords — I use this stuff every day to build real products.</p>
    </div>
    
    <div class="skills-grid">
      <div class="skill-category" >
        <h3>🤖 AI & Machine Learning</h3>
        <p class="skill-desc">This is my happy place. Building intelligent systems that actually understand context.</p>
        <div class="skill-tags">
          <span class="skill-tag">RAG Systems</span>
          <span class="skill-tag">Claude / OpenAI</span>
          <span class="skill-tag">Vector Databases</span>
          <span class="skill-tag">Prompt Engineering</span>
          <span class="skill-tag">AI Agents</span>
        </div>
      </div>
      
      <div class="skill-category" >
        <h3>⚡ Frontend</h3>
        <p class="skill-desc">Making things look good and feel fast. User experience is everything.</p>
        <div class="skill-tags">
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">Next.js</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">SvelteKit</span>
          <span class="skill-tag">Tailwind CSS</span>
        </div>
      </div>
      
      <div class="skill-category" >
        <h3>🔧 Backend & Infrastructure</h3>
        <p class="skill-desc">The stuff that makes everything actually work. Reliably. At scale.</p>
        <div class="skill-tags">
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">PostgreSQL</span>
          <span class="skill-tag">Vercel</span>
          <span class="skill-tag">Supabase</span>
          <span class="skill-tag">REST APIs</span>
        </div>
      </div>
      
      <div class="skill-category" >
        <h3>🔒 Security</h3>
        <p class="skill-desc">Where I started. Still love it. Security-first thinking shapes everything I build.</p>
        <div class="skill-tags">
          <span class="skill-tag">Cybersecurity</span>
          <span class="skill-tag">Network Security</span>
          <span class="skill-tag">Secure Architecture</span>
          <span class="skill-tag">Pen Testing</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Experience -->
<section class="experience section section-dark">
  <div class="container">
    <div class="experience-header">
      <p class="section-label text-accent">Experience</p>
      <h2 class="text-light">Where I've Made Things Happen</h2>
    </div>
    
    <div class="timeline">
      <div class="timeline-item" >
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date">2024 - Present</span>
          <h3>Lead Software Engineer</h3>
          <p class="timeline-company">EOS Worldwide</p>
          <p class="timeline-desc">
            Leading the AI initiative at a company that helps thousands of businesses run on the 
            Entrepreneurial Operating System. Built an AI chatbot that actually understands EOS, 
            and working on innovations that have <strong>patents pending</strong>. This role lets 
            me combine my love for AI with genuine business impact — I'm not just building cool 
            tech, I'm helping real companies run better.
          </p>
          <div class="timeline-highlight">🎯 Patents pending • AI chatbot in production • Thousands of businesses served</div>
        </div>
      </div>
      
      <div class="timeline-item" >
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date">2023 - Present</span>
          <h3>Founder</h3>
          <p class="timeline-company">UpAway</p>
          <p class="timeline-desc">
            Started UpAway to build products I genuinely believe in. InnerEcho, our mental health 
            journaling app, is live on the App Store. It uses AI to help people understand their 
            emotional patterns and journal more effectively. Building this from scratch taught me 
            everything about shipping a real product — design, development, App Store review 
            nightmares, all of it.
          </p>
          <div class="timeline-highlight">📱 InnerEcho live on App Store • AI-powered mental health tools</div>
        </div>
      </div>
      
      <div class="timeline-item" >
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date">Previous Role</span>
          <h3>Cybersecurity Instructor</h3>
          <p class="timeline-company">Wilson High School</p>
          <p class="timeline-desc">
            Taught cybersecurity and mentored CyberPatriot students. This wasn't just a job — 
            watching students go from intimidated to excited about security was incredibly 
            rewarding. Learned that the best way to understand something is to teach it, and 
            that investing in the next generation is one of the most meaningful things you can do.
          </p>
          <div class="timeline-highlight">👨‍🏫 CyberPatriot mentor • Built curriculum from scratch</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Education -->
<section class="education section">
  <div class="container">
    <div class="education-grid">
      <div class="education-content">
        <p class="section-label">Education</p>
        <h2>Never Stop Learning</h2>
        <p class="education-intro">
          I've built a lot by learning on the job, but I want to go deeper. Penn State is giving 
          me the theoretical foundations to understand <em>why</em> things work, not just <em>how</em>.
        </p>
        
        <div class="education-card">
          <div class="education-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L2 10L16 16L30 10L16 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M6 13V22L16 27L26 22V13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <line x1="30" y1="10" x2="30" y2="22" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="education-details">
            <h3>Bachelor of Science in Artificial Intelligence</h3>
            <p class="education-school">Penn State University</p>
            <p class="education-date">January 2026 - May 2029</p>
            <p class="education-desc">
              Pursuing formal AI education while continuing to ship products. I wanted to combine 
              real-world experience with academic rigor — understanding the math, the theory, and 
              the research that will let me build even more ambitious things.
            </p>
          </div>
        </div>
      </div>
      
      <div class="education-extra">
        <div class="award-card" >
          <div class="award-badge">🏆</div>
          <h4>National Cyber Scholar</h4>
          <p>
            Competitive national recognition for cybersecurity excellence. This award validated 
            years of obsessing over security and proved I could compete at the highest level.
          </p>
        </div>
        
        <div class="fun-fact" >
          <h4>💡 Fun Fact</h4>
          <p>
            I got into security because I wanted to understand how things break. Turns out, 
            understanding how things break makes you way better at building things that don't.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Beyond Code -->
<section class="beyond section section-cream">
  <div class="container">
    <div class="beyond-grid">
      <div class="beyond-content">
        <p class="section-label">Beyond Code</p>
        <h2>What Else Matters to Me</h2>
        
        <div class="beyond-item">
          <h3>⛪ Faith & Community</h3>
          <p>
            As Youth Lead at West Lawn United Methodist Church, I help guide young people and 
            invest in my community. Tech is a tool, but what matters is how we use it to serve 
            others. My faith grounds me and reminds me why impact matters more than metrics.
          </p>
        </div>
        
        <div class="beyond-item">
          <h3>🤝 Paying It Forward</h3>
          <p>
            The tech community gave me so much — free resources, open source tools, people who 
            answered my dumb questions on Stack Overflow. I try to give back by mentoring, 
            teaching, and building things that help people rather than just extract value from them.
          </p>
        </div>
        
        <div class="beyond-item">
          <h3>🎯 Building with Purpose</h3>
          <p>
            I'm not interested in building the next addictive app or optimizing engagement metrics. 
            I want to build things that make people's lives genuinely better. InnerEcho helps 
            people understand themselves. EOS AI helps businesses run smoother. That's the work 
            that gets me out of bed.
          </p>
        </div>
      </div>
      
      <div class="beyond-visual">
        <div class="values-card" data-cursor-invert>
          <h4>My Building Principles</h4>
          <ul>
            <li>Ship things that matter to real people</li>
            <li>Security isn't optional — it's foundational</li>
            <li>The best code is code users never think about</li>
            <li>Teach what you learn, learn what you teach</li>
            <li>Impact over ego, always</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Connect Section -->
<section class="connect section section-navy">
  <div class="container">
    <div class="connect-content">
      <p class="section-label text-accent">Let's Connect</p>
      <h2 class="text-light">I'd Love to Hear From You</h2>
      <p class="connect-description">
        Whether you want to talk about AI, have a project idea, need someone who can ship, 
        or just want to geek out about the latest Claude model — I'm always down to chat.
      </p>
      
      <div class="connect-links">
        <a href="mailto:quinn@upaway.dev" class="connect-link" >
          <div class="connect-link-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M2 7L12 14L22 7" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="connect-link-text">
            <span class="connect-link-label">Email</span>
            <span class="connect-link-value">quinn@upaway.dev</span>
          </div>
          <span class="connect-link-note">Best way to reach me</span>
        </a>
        
        <a href="https://www.linkedin.com/in/quinn-o-donnell-0315bb29b/" target="_blank" rel="noopener" class="connect-link" data-cursor-text="Link">
          <div class="connect-link-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div class="connect-link-text">
            <span class="connect-link-label">LinkedIn</span>
            <span class="connect-link-value">Quinn O'Donnell</span>
          </div>
          <span class="connect-link-note">Let's connect professionally</span>
        </a>
        
        <a href="https://github.com/Quinnod345" target="_blank" rel="noopener" class="connect-link" data-cursor-text="Link">
          <div class="connect-link-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="connect-link-text">
            <span class="connect-link-label">GitHub</span>
            <span class="connect-link-value">Quinnod345</span>
          </div>
          <span class="connect-link-note">See what I'm building</span>
        </a>
      </div>
      
      <div class="connect-cta">
        <a href="/#contact" class="btn btn-primary" data-cursor-expand>
          Start a Conversation
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Hero */
  .about-hero {
    min-height: 70vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: var(--color-dark);
    color: var(--color-cream);
    padding-top: var(--header-height);
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: morphBlob 15s ease-in-out infinite, float 8s ease-in-out infinite;
  }
  
  .blob-1 {
    width: 500px;
    height: 500px;
    background: var(--color-sage);
    opacity: 0.3;
    top: -10%;
    right: -5%;
    animation-delay: 0s;
  }
  
  .blob-2 {
    width: 400px;
    height: 400px;
    background: var(--color-steel);
    opacity: 0.25;
    bottom: -10%;
    left: -10%;
    animation-delay: -5s;
  }
  
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
  }
  
  .hero-text {
    max-width: 800px;
  }
  
  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.1em;
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

  .about-hero h1 {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
  }
  
  .hero-description {
    font-size: 1.35rem;
    max-width: 700px;
    color: rgba(255, 245, 217, 0.85);
    margin-bottom: 2.5rem;
    line-height: 1.8;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.6s;
  }
  
  .hero-description em {
    color: var(--color-accent);
    font-style: normal;
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
  
  .btn:hover .btn-icon {
    transform: translateX(4px);
  }

  /* Quote Banner */
  .quote-banner {
    background: var(--color-accent);
    padding: 3rem 0;
  }
  
  .quote-banner blockquote {
    font-family: var(--font-heading);
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 600;
    color: var(--color-dark);
    text-align: center;
    margin: 0;
    font-style: italic;
  }

  /* What Drives Me */
  .drives {
    background: var(--color-cream);
  }
  
  .drives-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .drives-header h2 {
    color: var(--color-dark);
  }
  
  .drives-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .drive-card {
    background: white;
    padding: 2.5rem;
    border-radius: 24px;
    box-shadow: 0 4px 20px rgba(33, 60, 78, 0.08);
    transition: all 0.4s ease;
  }
  
  .drive-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(33, 60, 78, 0.15);
  }
  
  .drive-emoji {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  .drive-card h3 {
    font-size: 1.5rem;
    color: var(--color-dark);
    margin-bottom: 1rem;
  }
  
  .drive-card p {
    font-size: 1.05rem;
    color: var(--color-text-muted);
    line-height: 1.8;
  }
  
  .drive-card em {
    color: var(--color-steel);
    font-style: normal;
    font-weight: 600;
  }

  /* Story Section */
  .story {
    background: var(--color-navy);
    color: var(--color-cream);
  }
  
  .story-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-lg);
    align-items: start;
  }
  
  .story-content h2 {
    margin-bottom: 2rem;
  }
  
  .story-text p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.9;
    margin-bottom: 1.5rem;
  }
  
  .story-text strong {
    color: var(--color-accent);
  }
  
  .story-text em {
    color: rgba(255, 255, 255, 0.95);
    font-style: italic;
  }
  
  .story-sidebar {
    position: sticky;
    top: 120px;
  }
  
  .story-quote {
    background: rgba(255, 255, 255, 0.05);
    border-left: 4px solid var(--color-accent);
    padding: 2rem;
    border-radius: 0 16px 16px 0;
    margin-bottom: 2rem;
  }
  
  .quote-mark {
    font-family: var(--font-heading);
    font-size: 4rem;
    color: var(--color-accent);
    line-height: 0.5;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .story-quote p {
    font-size: 1.1rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.7;
  }
  
  .story-stats {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .story-stats .stat {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.25rem 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .story-stats .stat-number {
    font-size: 1.5rem;
  }
  
  .story-stats .stat-label {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  /* Skills */
  .skills {
    background: white;
  }
  
  .skills-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .skills-header h2 {
    color: var(--color-dark);
    margin-bottom: 1rem;
  }
  
  .skills-subhead {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .skill-category {
    background: var(--color-cream);
    padding: 2rem;
    border-radius: 20px;
  }
  
  .skill-category h3 {
    font-size: 1.35rem;
    color: var(--color-dark);
    margin-bottom: 0.75rem;
  }
  
  .skill-desc {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
  
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .skill-tag {
    background: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    color: var(--color-dark);
    border: 1px solid rgba(33, 60, 78, 0.1);
    transition: all 0.3s ease;
  }
  
  .skill-tag:hover {
    background: var(--color-dark);
    color: white;
    border-color: var(--color-dark);
  }

  /* Experience Timeline */
  .experience {
    background: var(--color-dark);
    color: var(--color-cream);
  }
  
  .experience-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .timeline {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--color-accent), var(--color-steel));
  }
  
  .timeline-item {
    position: relative;
    padding-left: 3rem;
    margin-bottom: 3rem;
  }
  
  .timeline-item:last-child {
    margin-bottom: 0;
  }
  
  .timeline-marker {
    position: absolute;
    left: -6px;
    top: 0;
    width: 14px;
    height: 14px;
    background: var(--color-accent);
    border-radius: 50%;
    border: 3px solid var(--color-dark);
  }
  
  .timeline-content {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
  }
  
  .timeline-date {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .timeline-content h3 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.25rem;
  }
  
  .timeline-company {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }
  
  .timeline-desc {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  
  .timeline-desc strong {
    color: var(--color-accent);
  }
  
  .timeline-highlight {
    font-size: 0.9rem;
    color: var(--color-accent);
    font-weight: 600;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Education */
  .education {
    background: var(--color-cream);
  }
  
  .education-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-lg);
    align-items: start;
  }
  
  .education-content h2 {
    color: var(--color-dark);
    margin-bottom: 1rem;
  }
  
  .education-intro {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    line-height: 1.8;
    margin-bottom: 2rem;
  }
  
  .education-intro em {
    font-style: normal;
    color: var(--color-steel);
    font-weight: 600;
  }
  
  .education-card {
    display: flex;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(33, 60, 78, 0.08);
  }
  
  .education-icon {
    width: 64px;
    height: 64px;
    background: var(--color-sage);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }
  
  .education-details h3 {
    font-size: 1.25rem;
    color: var(--color-dark);
    margin-bottom: 0.5rem;
  }
  
  .education-school {
    font-size: 1.1rem;
    color: var(--color-steel);
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .education-date {
    font-size: 0.9rem;
    color: var(--color-accent);
    font-family: var(--font-heading);
    margin-bottom: 1rem;
  }
  
  .education-desc {
    font-size: 1rem;
    color: var(--color-text-muted);
    line-height: 1.7;
  }
  
  .education-extra {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .award-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(33, 60, 78, 0.08);
  }
  
  .award-badge {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .award-card h4 {
    font-size: 1.25rem;
    color: var(--color-dark);
    margin-bottom: 0.75rem;
  }
  
  .award-card p {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
  
  .fun-fact {
    background: var(--color-steel);
    padding: 2rem;
    border-radius: 20px;
    color: white;
  }
  
  .fun-fact h4 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
  
  .fun-fact p {
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.9;
  }

  /* Beyond Code */
  .section-cream {
    background: var(--color-cream);
  }
  
  .beyond-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-lg);
    align-items: start;
  }
  
  .beyond-content h2 {
    color: var(--color-dark);
    margin-bottom: 2rem;
  }
  
  .beyond-item {
    margin-bottom: 2rem;
  }
  
  .beyond-item:last-child {
    margin-bottom: 0;
  }
  
  .beyond-item h3 {
    font-size: 1.25rem;
    color: var(--color-dark);
    margin-bottom: 0.75rem;
  }
  
  .beyond-item p {
    font-size: 1.05rem;
    color: var(--color-text-muted);
    line-height: 1.8;
  }
  
  .values-card {
    background: var(--color-dark);
    color: white;
    padding: 2.5rem;
    border-radius: 20px;
    position: sticky;
    top: 120px;
  }
  
  .values-card h4 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: var(--color-accent);
  }
  
  .values-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .values-card li {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .values-card li:last-child {
    border-bottom: none;
  }

  /* Connect */
  .connect {
    background: var(--color-navy);
    color: var(--color-cream);
  }
  
  .connect-content {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
  }
  
  .connect-description {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 3rem;
    line-height: 1.7;
  }
  
  .connect-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .connect-link {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .connect-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-accent);
    transform: translateX(8px);
  }
  
  .connect-link-icon {
    width: 48px;
    height: 48px;
    background: rgba(123, 148, 156, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);
    flex-shrink: 0;
  }
  
  .connect-link-text {
    flex: 1;
  }
  
  .connect-link-label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin-bottom: 0.25rem;
  }
  
  .connect-link-value {
    font-size: 1.1rem;
    color: white;
  }
  
  .connect-link-note {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    white-space: nowrap;
  }
  
  .connect-cta {
    margin-top: 2rem;
  }

  /* Section Utilities */
  .section {
    padding: var(--space-xl) 0;
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
  
  .section-navy {
    background: var(--color-navy);
    color: var(--color-cream);
  }
  
  .section-dark {
    background: var(--color-dark);
    color: var(--color-cream);
  }
  
  .text-accent {
    color: var(--color-accent);
  }
  
  .text-light {
    color: var(--color-cream);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .drives-grid {
      grid-template-columns: 1fr;
    }
    
    .story-grid {
      grid-template-columns: 1fr;
    }
    
    .story-sidebar {
      position: relative;
      top: 0;
    }
  }
  
  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
    
    .education-grid {
      grid-template-columns: 1fr;
    }
    
    .education-card {
      flex-direction: column;
      text-align: center;
    }
    
    .education-icon {
      margin: 0 auto;
    }
    
    .beyond-grid {
      grid-template-columns: 1fr;
    }
    
    .values-card {
      position: relative;
      top: 0;
    }
    
    .timeline::before {
      left: 6px;
    }
    
    .timeline-marker {
      left: 0;
    }
    
    .timeline-item {
      padding-left: 2.5rem;
    }
    
    .connect-link {
      flex-wrap: wrap;
    }
    
    .connect-link-note {
      width: 100%;
      margin-top: 0.5rem;
      margin-left: 64px;
    }
  }
  
  @media (max-width: 480px) {
    .about-hero h1 {
      font-size: 2.5rem;
    }
    
    .quote-banner blockquote {
      font-size: 1.1rem;
    }
    
    .drive-card {
      padding: 1.5rem;
    }
    
    .drive-emoji {
      font-size: 2.5rem;
    }
  }
</style>
