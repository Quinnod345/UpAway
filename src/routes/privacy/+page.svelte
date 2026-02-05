<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Privacy Policy | InnerEcho</title>
  <meta name="description" content="Privacy Policy for InnerEcho mental health journaling app. Your privacy is our priority." />
</svelte:head>

<!-- Hero -->
<section class="hero">
  <div class="hero-bg">
    <div class="hero-gradient"></div>
  </div>
  
  <div class="hero-content container">
    <nav class="back-nav">
      <a href="/innerecho" class="back-link">
        <span class="back-arrow">←</span>
        Back to InnerEcho
      </a>
    </nav>
    
    <h1 class:visible={mounted}>Privacy Policy</h1>
    <p class="last-updated" class:visible={mounted}>Last Updated: December 2024</p>
  </div>
</section>

<!-- Content -->
<section class="content section">
  <div class="container">
    <article class="policy-content">
      <div class="policy-intro">
        <p class="lead">
          At InnerEcho, your privacy is not just important to us, it's fundamental to our design philosophy. 
          We believe your most personal thoughts should remain exactly that: personal.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Our Privacy-First Approach</h2>
        <p>
          InnerEcho is built with a privacy-first architecture. Unlike many other apps, we don't store your 
          journal entries on our servers. Your thoughts, feelings, and reflections stay on your device, 
          encrypted and secure.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Data We Don't Collect</h2>
        <ul>
          <li><strong>Journal entries:</strong> Your writing stays on your device only</li>
          <li><strong>Mood data:</strong> Your emotional tracking remains local</li>
          <li><strong>Personal identifiers:</strong> We don't require your real name or personal information</li>
          <li><strong>Location data:</strong> We never track where you are</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>Data We May Collect</h2>
        <p>To improve our app and ensure a great experience, we may collect:</p>
        <ul>
          <li><strong>Anonymous usage analytics:</strong> General patterns of app usage (not content)</li>
          <li><strong>Crash reports:</strong> Technical information when the app encounters issues</li>
          <li><strong>Device information:</strong> Basic device type and OS version for compatibility</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>AI Analysis</h2>
        <p>
          When you choose to use our AI-powered features, your text is processed to provide insights. 
          This analysis happens in real-time and is not stored on any server. We use industry-standard 
          encryption for any data in transit, and the AI does not retain memory of your entries.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Your Data, Your Control</h2>
        <p>You have complete control over your data:</p>
        <ul>
          <li>Export your journal entries at any time</li>
          <li>Delete all your data from the app instantly</li>
          <li>Use the app without creating an account</li>
          <li>Opt out of anonymous analytics in settings</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services for analytics and crash reporting. These services are carefully 
          selected to ensure they meet our privacy standards and comply with applicable data protection 
          regulations.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any significant 
          changes through the app or via email if you have provided one.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our data practices, please reach out to us at:
        </p>
        <a href="mailto:support@upaway.dev" class="contact-email">support@upaway.dev</a>
      </div>
      
      <div class="policy-cta">
        <a href="/innerecho" class="btn btn-primary">Back to InnerEcho</a>
        <a href="/" class="btn btn-outline">Visit Portfolio</a>
      </div>
    </article>
  </div>
</section>

<style>
  /* Hero */
  .hero {
    padding: var(--space-xl) 0 var(--space-lg);
    padding-top: calc(var(--header-height) + var(--space-lg));
    position: relative;
    background: var(--color-dark);
    color: var(--color-cream);
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .hero-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 80%, rgba(123, 148, 156, 0.15) 0%, transparent 60%);
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .back-nav {
    margin-bottom: 2rem;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-accent);
    transition: var(--transition-fast);
  }
  
  .back-link:hover {
    gap: 0.75rem;
  }
  
  .back-arrow {
    transition: var(--transition-fast);
  }
  
  .back-link:hover .back-arrow {
    transform: translateX(-4px);
  }
  
  .hero h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.2s;
  }
  
  .hero h1.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .last-updated {
    font-size: 1rem;
    color: rgba(255, 245, 217, 0.5);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s ease 0.4s;
  }
  
  .last-updated.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Content */
  .content {
    background: var(--color-cream);
  }
  
  .policy-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .policy-intro {
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-lg);
    border-bottom: 1px solid rgba(33, 60, 78, 0.1);
  }
  
  .lead {
    font-size: 1.35rem;
    color: var(--color-dark);
    line-height: 1.7;
  }
  
  .policy-section {
    margin-bottom: var(--space-md);
  }
  
  .policy-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-dark);
  }
  
  .policy-section p {
    color: var(--color-text-muted);
    margin-bottom: 1rem;
  }
  
  .policy-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .policy-section li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    color: var(--color-text-muted);
    border-bottom: 1px solid rgba(33, 60, 78, 0.05);
  }
  
  .policy-section li::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-size: 0.75rem;
    top: 0.85rem;
  }
  
  .policy-section li:last-child {
    border-bottom: none;
  }
  
  .policy-section li strong {
    color: var(--color-dark);
    font-weight: 600;
  }
  
  .contact-email {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: var(--color-steel);
    font-weight: 600;
    margin-top: 0.5rem;
  }
  
  .contact-email:hover {
    color: var(--color-accent);
  }
  
  .policy-cta {
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);
    border-top: 1px solid rgba(33, 60, 78, 0.1);
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .policy-cta {
      flex-direction: column;
    }
    
    .policy-cta .btn {
      width: 100%;
    }
  }
</style>
