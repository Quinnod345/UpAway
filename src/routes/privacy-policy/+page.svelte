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
    <p class="last-updated" class:visible={mounted}>Last Updated: June 13, 2026</p>
  </div>
</section>

<!-- Content -->
<section class="content section">
  <div class="container">
    <article class="policy-content">
      <div class="policy-intro">
        <p class="lead">
          Hey Human!<br />
          You're here because you value your privacy, especially when it comes to sharing your deepest thoughts 
          with a computer program. Protecting your privacy is incredibly important to us, as both the creators 
          and regular users of InnerEcho.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Our Commitment</h2>
        <p>
          Your privacy isn't just something we care about. It's central to our mission to provide a safe and
          private journaling experience. When you share sensitive, personal information with us, we take that 
          responsibility seriously and are committed to keeping it secure, private, and protected, while still 
          offering you the best features and services.
        </p>
        <p>
          Transparency is key to building trust, which extends to our relationship with you. We're committed 
          to clear and open communication about how we handle your data, so you can make informed decisions 
          about its use within InnerEcho.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>1. What We Collect (and What We Don't)</h2>
        <p>
          <strong>Your journal entries and check-ins stay private.</strong> We never receive or store the
          content you write. Your entries live on your device and sync only through your own private iCloud
          account (Apple's CloudKit), which we have no ability to access or read.
        </p>
        <p>
          <strong>Sign in with Apple:</strong> if you choose it, we ask only for your first name, which is kept
          on your device to personalize the app. We do not request your email address, and Apple does not share
          your Apple ID with us.
        </p>
        <p>
          <strong>Anonymous usage data:</strong> we collect product analytics — which features are used and
          in-app purchase events — along with basic device information such as device type and operating system
          version, to understand how the app performs and where to improve it. This never includes your journal
          entries or check-in content.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>2. How AI Features Use Your Words</h2>
        <p>
          The only time the text you write leaves your device is when you choose to use a cloud AI feature —
          such as insights, Echo chat, or dream analysis. That specific text is sent directly to OpenAI to
          generate your response. It does not pass through our servers, and we never store it.
        </p>
        <p>
          <strong>You're in control.</strong> AI is enabled by default but can be switched off at any time in
          Settings — with it off, nothing is ever sent for AI processing. On supported devices you can also
          choose <strong>on-device AI</strong>, which runs entirely on your iPhone so your words never leave it.
          On-device processing is more private, with the trade-off that it is somewhat less in-depth than the
          cloud model.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>3. Insights, Analytics & Third-Party Services</h2>
        <p>
          Your journaling content stays on your device and in your iCloud. Where your device supports
          Apple Intelligence, AI features run on-device — your words never leave your phone. We work with a
          small number of service providers, and this is the complete list:
        </p>
        <ul>
          <li>
            <strong>OpenAI</strong> — powers cloud-based AI features such as insights, Echo chat, and dream
            analysis. Your text is sent to OpenAI only when you use these features with AI enabled, and you can
            turn it off anytime. OpenAI does not use data sent through its API to train its models, and retains
            it for at most 30 days for abuse monitoring before deleting it.
          </li>
          <li>
            <strong>PostHog</strong> — product analytics, including purchase events, so we can understand
            how features are used and improve the app. Analytics never include your journal entries or
            check-in content.
          </li>
          <li>
            <strong>Apple</strong> — processes App Store purchases, and stores and syncs your data via
            iCloud (CloudKit) and connects with HealthKit where you've enabled it. Your journal entries are
            stored with encryption, so only you have access to them.
          </li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>4. Non-Disclosure of Sensitive Journal Data</h2>
        <p>
          We stand firmly in our commitment to safeguard your sensitive journal data. Beyond the service
          providers listed above, we do not share, sell, or distribute your data to any third parties unless
          absolutely required by law. Your privacy is our priority.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>5. Security</h2>
        <p>We employ a variety of measures to safeguard your information:</p>
        <p>
          <strong>Data Encryption:</strong> All data transmitted between you and our services is secured using 
          strong encryption protocols, including Secure Socket Layer (SSL) technology. Apple's CloudKit 
          automatically encrypts all data stored and synced across your devices.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to modify this privacy policy at any time. If we make material changes to this 
          policy, we may notify you here or by means of a notice within the app.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy or the practices of InnerEcho, please contact us.
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
    font-size: clamp(1.1rem, 4vw, 1.35rem);
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
    .policy-intro {
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-md);
    }

    .policy-section h2 {
      font-size: 1.35rem;
    }

    .policy-cta {
      flex-direction: column;
    }
    
    .policy-cta .btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .contact-email {
      font-size: 1.05rem;
      word-break: break-word;
    }
  }
</style>
