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
          Hey Human!<br />
          You're here because you value your privacy, especially when it comes to sharing your deepest thoughts 
          with a computer program. Protecting your privacy is incredibly important to us, as both the creators 
          and regular users of InnerEcho.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>Our Commitment</h2>
        <p>
          Your privacy isn't just something we care about—it's central to our mission to provide a safe and 
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
        <h2>1. Information We Collect</h2>
        <p>In order to provide our services, we may collect the following types of information:</p>
        <p>
          <strong>User-Provided Information:</strong> You provide us with personally identifiable information, 
          such as your Apple ID, when using our services. Your journal entries, preferences, and any other data 
          you submit through the app are considered part of this.
        </p>
        <p>
          <strong>Automatically Collected Information:</strong> InnerEcho may automatically collect certain 
          information about the device you use to access our services, such as device type and operating system 
          version, but we do not track personal usage metrics.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>2. Use of Information</h2>
        <p>We use the information we collect to provide and improve our services:</p>
        <p>
          <strong>Providing Our Services:</strong> The information collected is integral to delivering our 
          services. This includes your journal entries, which are stored locally on your device and within 
          Apple's CloudKit for syncing across your Apple devices.
        </p>
        <p>
          <strong>Maintaining and Improving Our Services:</strong> We use the data to ensure our app functions 
          as expected and improves over time. This includes ensuring compatibility and resolving technical 
          issues. All AI-related processing is done using anonymized data.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>3. AI and Third-Party Services</h2>
        <p>We use OpenAI and Anthropic to provide advanced computational tasks, such as language processing for our AI insights.</p>
        <p>
          <strong>OpenAI and Anthropic:</strong> InnerEcho anonymizes all sensitive data, such as journal entries, 
          before sending it to OpenAI or Anthropic for processing. All data sent for AI processing is temporarily 
          held for no more than 30 days and is then deleted.
        </p>
        <p>
          <strong>CloudKit for Data Storage:</strong> We use Apple's CloudKit to securely store your journal entries 
          and sync them across your devices. Your data is stored with end-to-end encryption, ensuring that only 
          you have access to your personal entries.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>4. Non-Disclosure of Sensitive Journal Data</h2>
        <p>
          We stand firmly in our commitment to safeguard your sensitive journal data. We do not share, sell, 
          or distribute your data to any third parties unless absolutely required by law. Your privacy is our priority.
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
