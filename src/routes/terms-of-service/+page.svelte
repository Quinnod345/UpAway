<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Terms of Service | InnerEcho</title>
  <meta name="description" content="Terms of Service for InnerEcho mental health journaling app." />
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
    
    <h1 class:visible={mounted}>Terms of Service</h1>
    <p class="last-updated" class:visible={mounted}>Last Updated: Oct. 4, 2024</p>
  </div>
</section>

<!-- Content -->
<section class="content section">
  <div class="container">
    <article class="policy-content">
      <div class="policy-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By downloading, installing, and/or using InnerEcho ("the App"), provided by UpAway, LLC ("the Company"), 
          you agree to be bound by these Terms of Service ("TOS"). If you do not agree to these terms, you should 
          not use the App.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>2. Use of the App</h2>
        <p>
          InnerEcho is designed to support users in journaling, reflecting on their mood, and tracking mental health. 
          By using the App, you represent that you meet this age requirement and are not barred from using the App 
          under any applicable law.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>3. User Accounts and Data</h2>
        <p>
          <strong>Privacy:</strong> Your privacy is important to us. All data is stored locally on your device or 
          in Apple's CloudKit service, syncing across your devices. AI insights data is processed by OpenAI and 
          deleted after 30 days. For more information on how we handle data, please review our 
          <a href="/privacy-policy" class="inline-link">Privacy Policy</a>.
        </p>
        <p>
          <strong>Data Management:</strong> We are not responsible for any loss of data resulting from the deletion 
          of the app, loss of access to your device, or any malfunction in the storage service.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>4. User Responsibilities</h2>
        <p>By using the App, you agree not to:</p>
        <ul>
          <li>Use the App for any illegal or unauthorized purpose.</li>
          <li>Upload any content that violates any intellectual property rights or the privacy of others.</li>
          <li>Attempt to disrupt or interfere with the App's performance or security.</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>5. AI Insights</h2>
        <p>
          InnerEcho includes AI-generated insights based on your journal entries and check-ins. The AI insights 
          provided are meant for informational purposes only and should not replace professional mental health 
          advice or treatment.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>6. Intellectual Property</h2>
        <p>
          All content, features, and functionality (including but not limited to text, graphics, logos, icons, and 
          software) provided by InnerEcho are owned by UpAway, LLC and are protected by copyright, trademark, and 
          other intellectual property laws. You agree not to reproduce, modify, distribute, or exploit any part of 
          the App without our prior written consent.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>7. Disclaimer of Warranties</h2>
        <p>
          The App is provided on an "as-is" basis. We make no warranties, express or implied, regarding the App's 
          performance, functionality, or availability, including its suitability for a particular purpose. You use 
          the App at your own risk.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>8. Limitation of Liability</h2>
        <p>
          In no event shall UpAway, LLC be liable for any indirect, incidental, consequential, or punitive damages, 
          including but not limited to loss of data, even if we have been advised of the possibility of such damages. 
          Our total liability to you for any claims arising out of or relating to the App shall not exceed the amount 
          you paid to us for the App, if applicable.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>9. Modifications to the Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
          upon posting to the App. Your continued use of the App after any such changes constitutes your acceptance 
          of the new TOS.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>10. Termination</h2>
        <p>
          We may suspend or terminate your access to the App at any time for any reason, including for violation of 
          these Terms of Service. Upon termination, you must cease all use of the App.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>11. Governing Law</h2>
        <p>
          These Terms of Service shall be governed and construed in accordance with the laws of the State of 
          Pennsylvania, without regard to its conflict of law provisions.
        </p>
      </div>
      
      <div class="policy-section">
        <h2>12. Contact Us</h2>
        <p>
          If you have any questions regarding these Terms of Service, please contact us at:
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
  
  .inline-link {
    color: var(--color-steel);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  
  .inline-link:hover {
    color: var(--color-accent);
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
