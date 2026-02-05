<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  
  const browser = typeof window !== 'undefined';
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎮 EXPORTED STORES FOR SECTION INTEGRATION
  // ═══════════════════════════════════════════════════════════════════════════════
  export const easterEggTriggered = writable(null); // Other components can subscribe
  export const confettiStore = writable(false);
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎮 KONAMI CODE: ↑ ↑ ↓ ↓ ← → ← → B A
  // ═══════════════════════════════════════════════════════════════════════════════
  const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
  ];
  
  let inputSequence = [];
  let konamiActivated = false;
  let showSecret = false;
  let particles = [];
  let confetti = [];
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 💬 SECRET PHRASES DETECTION
  // ═══════════════════════════════════════════════════════════════════════════════
  let typedChars = '';
  let showHireMe = false;
  let showEosSecret = false;
  let showSoldSecret = false;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🖱️ LOGO CLICKS (7 clicks)
  // ═══════════════════════════════════════════════════════════════════════════════
  let logoClicks = 0;
  let logoClickTimeout;
  let showLogoSecret = false;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🌙 SECRET DARK MODE (triple-click footer)
  // ═══════════════════════════════════════════════════════════════════════════════
  let secretDarkMode = false;
  let footerClicks = 0;
  let footerClickTimeout;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📸 HOVER PROFILE PHOTO (3 seconds)
  // ═══════════════════════════════════════════════════════════════════════════════
  let hoverTimeout;
  let showSillyPhoto = false;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📜 FAST SCROLL DETECTION
  // ═══════════════════════════════════════════════════════════════════════════════
  let lastScrollTime = 0;
  let lastScrollY = 0;
  let showSlowDown = false;
  let slowDownTimeout;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🖱️ CUSTOM RIGHT-CLICK MENU
  // ═══════════════════════════════════════════════════════════════════════════════
  let showContextMenu = false;
  let contextMenuX = 0;
  let contextMenuY = 0;
  let currentPath = '';
  
  // Get current path for context-aware navigation
  $: if (browser) {
    currentPath = window.location.pathname;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🔤 GIBBERISH DETECTION
  // ═══════════════════════════════════════════════════════════════════════════════
  let gibberishBuffer = '';
  let showGibberishMessage = false;
  let gibberishTimeout;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 😴 IDLE DETECTION (30 seconds)
  // ═══════════════════════════════════════════════════════════════════════════════
  let idleTimeout;
  let showIdleMessage = false;
  let idleEmoji = '👀';
  const idleEmojis = ['👀', '😴', '🤔', '✨', '👋', '🎯'];
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎯 SERVICES CARD SEQUENCE (click all 4 in order: 1,2,3,4)
  // ═══════════════════════════════════════════════════════════════════════════════
  let serviceClickSequence = [];
  let showServicesSecret = false;
  let serviceClickTimeout;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📊 STATS COUNTER FUN
  // ═══════════════════════════════════════════════════════════════════════════════
  let statsBonusClicks = {};
  let showStatsSecret = false;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📝 CONTACT FORM SUCCESS
  // ═══════════════════════════════════════════════════════════════════════════════
  let showContactCelebration = false;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📱 INNERECHO PHONE HOVER (5 seconds)
  // ═══════════════════════════════════════════════════════════════════════════════
  let phoneHoverTimeout;
  let showPhonePeace = false;
  let peaceParticles = [];
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📖 ABOUT PAGE SCROLL SECRET
  // ═══════════════════════════════════════════════════════════════════════════════
  let showAboutFunFact = false;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎉 CONFETTI EXPLOSION
  // ═══════════════════════════════════════════════════════════════════════════════
  export function createConfetti(customColors = null) {
    const colors = customColors || ['#7B949C', '#FFF5D9', '#536C7C', '#ff7600', '#e94560', '#FFD700', '#00D4FF'];
    const shapes = ['square', 'circle', 'triangle'];
    confetti = [];
    
    for (let i = 0; i < 150; i++) {
      confetti.push({
        id: i,
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 30,
        vy: (Math.random() - 1) * 25 - 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    confetti = confetti;
    confettiStore.set(true);
    
    let frame = 0;
    const animate = () => {
      confetti = confetti.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.5,
        vx: p.vx * 0.99,
        rotation: p.rotation + p.rotationSpeed
      }));
      
      frame++;
      if (frame < 150) {
        requestAnimationFrame(animate);
      } else {
        confetti = [];
        confettiStore.set(false);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // ✨ PEACEFUL PARTICLES (for InnerEcho)
  // ═══════════════════════════════════════════════════════════════════════════════
  function createPeaceParticles() {
    const emojis = ['✨', '💚', '🌿', '💫', '🍃', '☮️'];
    peaceParticles = [];
    
    for (let i = 0; i < 20; i++) {
      peaceParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        vy: -(Math.random() * 2 + 1),
        vx: (Math.random() - 0.5) * 0.5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 20 + 15,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: 1
      });
    }
    
    let frame = 0;
    const animate = () => {
      peaceParticles = peaceParticles.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        rotation: p.rotation + p.rotationSpeed,
        opacity: Math.max(0, p.opacity - 0.003)
      }));
      
      frame++;
      if (frame < 300 && showPhonePeace) {
        requestAnimationFrame(animate);
      } else {
        peaceParticles = [];
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🔊 SOUND EFFECTS
  // ═══════════════════════════════════════════════════════════════════════════════
  function playSuccessSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      
      notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + i * 0.1;
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialDecayTo?.(0.001, startTime + 0.3) || 
          gainNode.gain.setValueAtTime(0.001, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (e) {}
  }
  
  function playQuickSound(freq = 880) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialDecayTo?.(0.001, audioContext.currentTime + 0.1) ||
        gainNode.gain.setValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {}
  }
  
  function playPeacefulChime() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [392, 523.25, 659.25]; // G, C, E - peaceful chord
      
      notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.001, audioContext.currentTime + 2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
      });
    } catch (e) {}
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎮 KONAMI CODE HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  function checkKonami() {
    const sequenceStr = inputSequence.join(',');
    const konamiStr = KONAMI_CODE.join(',');
    
    if (sequenceStr === konamiStr) {
      activateKonami();
    }
  }
  
  function activateKonami() {
    konamiActivated = true;
    showSecret = true;
    createConfetti();
    playSuccessSound();
    easterEggTriggered.set('konami');
    
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
    
    setTimeout(() => {
      showSecret = false;
      konamiActivated = false;
    }, 6000);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 💼 SECRET PHRASE HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════════
  function checkSecretPhrases() {
    const lowered = typedChars.toLowerCase();
    
    // HIRE ME
    if (lowered.includes('hire me') || lowered.includes('hireme')) {
      triggerHireMe();
      typedChars = '';
      return;
    }
    
    // EOS (for EOS AI section)
    if (lowered.endsWith('eos')) {
      triggerEosSecret();
      typedChars = '';
      return;
    }
    
    // SOLD (for Curb section)
    if (lowered.endsWith('sold')) {
      triggerSoldSecret();
      typedChars = '';
      return;
    }
  }
  
  function triggerHireMe() {
    showHireMe = true;
    createConfetti();
    playSuccessSound();
    easterEggTriggered.set('hire-me');
    
    setTimeout(() => {
      showHireMe = false;
    }, 5000);
  }
  
  function triggerEosSecret() {
    showEosSecret = true;
    createConfetti(['#ff7600', '#FFD700', '#002e5d', '#fff']);
    playSuccessSound();
    easterEggTriggered.set('eos');
    
    setTimeout(() => {
      showEosSecret = false;
    }, 5000);
  }
  
  function triggerSoldSecret() {
    showSoldSecret = true;
    createConfetti(['#22c55e', '#f59e0b', '#10b981', '#fcd34d', '#fff']);
    playSuccessSound();
    easterEggTriggered.set('sold');
    
    setTimeout(() => {
      showSoldSecret = false;
    }, 5000);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎯 SERVICES CARD SEQUENCE HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  export function handleServiceCardClick(cardNumber) {
    if (!browser) return;
    
    clearTimeout(serviceClickTimeout);
    
    // Check if clicking in sequence
    const expectedNext = serviceClickSequence.length + 1;
    
    if (cardNumber === expectedNext) {
      serviceClickSequence.push(cardNumber);
      playQuickSound(440 + cardNumber * 100);
      
      if (serviceClickSequence.length === 4) {
        // All 4 clicked in order!
        showServicesSecret = true;
        createConfetti();
        playSuccessSound();
        easterEggTriggered.set('services-sequence');
        
        setTimeout(() => {
          showServicesSecret = false;
          serviceClickSequence = [];
        }, 5000);
      }
    } else {
      // Wrong order, reset
      serviceClickSequence = [cardNumber];
      playQuickSound(220); // Lower tone for reset
    }
    
    // Reset after 3 seconds of inactivity
    serviceClickTimeout = setTimeout(() => {
      serviceClickSequence = [];
    }, 3000);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📊 STATS CLICK HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  export function handleStatClick(statId, currentValue) {
    if (!browser) return;
    
    if (!statsBonusClicks[statId]) {
      statsBonusClicks[statId] = 0;
    }
    
    statsBonusClicks[statId]++;
    playQuickSound(600 + statsBonusClicks[statId] * 50);
    
    // After 10 clicks on any stat, show secret
    const totalClicks = Object.values(statsBonusClicks).reduce((a, b) => a + b, 0);
    if (totalClicks === 10) {
      showStatsSecret = true;
      createConfetti();
      playSuccessSound();
      easterEggTriggered.set('stats-clicker');
      
      setTimeout(() => {
        showStatsSecret = false;
      }, 4000);
    }
    
    return statsBonusClicks[statId];
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📝 CONTACT FORM SUCCESS HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  export function triggerContactCelebration() {
    if (!browser) return;
    
    showContactCelebration = true;
    createConfetti(['#7B949C', '#ff7600', '#22c55e', '#FFF5D9']);
    playSuccessSound();
    easterEggTriggered.set('contact-submitted');
    
    setTimeout(() => {
      showContactCelebration = false;
    }, 6000);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📱 INNERECHO PHONE HOVER HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  export function handlePhoneHoverStart() {
    if (!browser) return;
    
    phoneHoverTimeout = setTimeout(() => {
      showPhonePeace = true;
      createPeaceParticles();
      playPeacefulChime();
      easterEggTriggered.set('innerecho-peace');
    }, 5000);
  }
  
  export function handlePhoneHoverEnd() {
    clearTimeout(phoneHoverTimeout);
    showPhonePeace = false;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📖 ABOUT PAGE SCROLL HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  export function checkAboutPageScroll() {
    if (!browser) return;
    
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100);
    
    if (scrolledToBottom && !showAboutFunFact) {
      showAboutFunFact = true;
      playQuickSound(880);
      easterEggTriggered.set('about-scroll');
    }
  }
  
  export function hideAboutFunFact() {
    showAboutFunFact = false;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🔤 GIBBERISH DETECTION
  // ═══════════════════════════════════════════════════════════════════════════════
  function isGibberish(str) {
    if (str.length < 8) return false;
    
    const consonantStreak = /[bcdfghjklmnpqrstvwxz]{5,}/i;
    const repeats = /(.)\1{3,}/;
    const vowelRatio = (str.match(/[aeiou]/gi) || []).length / str.length;
    
    return consonantStreak.test(str) || repeats.test(str) || vowelRatio < 0.1;
  }
  
  function checkGibberish(char) {
    if (/[a-zA-Z]/.test(char)) {
      gibberishBuffer += char;
      
      clearTimeout(gibberishTimeout);
      gibberishTimeout = setTimeout(() => {
        gibberishBuffer = '';
      }, 2000);
      
      if (isGibberish(gibberishBuffer)) {
        showGibberishMessage = true;
        gibberishBuffer = '';
        setTimeout(() => {
          showGibberishMessage = false;
        }, 3000);
      }
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // ⌨️ KEYBOARD HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  function handleKeyDown(e) {
    resetIdleTimer();
    
    // Skip if user is typing in an input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    // Konami code tracking
    inputSequence.push(e.code);
    if (inputSequence.length > KONAMI_CODE.length) {
      inputSequence = inputSequence.slice(-KONAMI_CODE.length);
    }
    checkKonami();
    
    // Secret phrases tracking
    if (e.key.length === 1) {
      typedChars += e.key;
      if (typedChars.length > 20) {
        typedChars = typedChars.slice(-20);
      }
      checkSecretPhrases();
      checkGibberish(e.key);
    }
    
    // Escape to close any overlays
    if (e.key === 'Escape') {
      showContextMenu = false;
      showSecret = false;
      showHireMe = false;
      showLogoSecret = false;
      showEosSecret = false;
      showSoldSecret = false;
      showServicesSecret = false;
      showStatsSecret = false;
      showContactCelebration = false;
      showPhonePeace = false;
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🖱️ LOGO CLICK HANDLER
  // ═══════════════════════════════════════════════════════════════════════════════
  function handleLogoClick() {
    logoClicks++;
    playQuickSound(440 + logoClicks * 100);
    
    clearTimeout(logoClickTimeout);
    logoClickTimeout = setTimeout(() => {
      logoClicks = 0;
    }, 2000);
    
    if (logoClicks >= 7) {
      showLogoSecret = true;
      createConfetti();
      playSuccessSound();
      easterEggTriggered.set('logo-clicks');
      logoClicks = 0;
      
      setTimeout(() => {
        showLogoSecret = false;
      }, 5000);
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🌙 FOOTER TRIPLE-CLICK (Secret Dark Mode)
  // ═══════════════════════════════════════════════════════════════════════════════
  function handleFooterClick() {
    footerClicks++;
    
    clearTimeout(footerClickTimeout);
    footerClickTimeout = setTimeout(() => {
      footerClicks = 0;
    }, 500);
    
    if (footerClicks >= 3) {
      secretDarkMode = !secretDarkMode;
      document.documentElement.classList.toggle('secret-dark-mode', secretDarkMode);
      playQuickSound(secretDarkMode ? 220 : 440);
      easterEggTriggered.set('dark-mode');
      footerClicks = 0;
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📸 PROFILE PHOTO HOVER
  // ═══════════════════════════════════════════════════════════════════════════════
  function handlePhotoHover() {
    hoverTimeout = setTimeout(() => {
      showSillyPhoto = true;
      playQuickSound(660);
    }, 3000);
  }
  
  function handlePhotoLeave() {
    clearTimeout(hoverTimeout);
    showSillyPhoto = false;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 📜 FAST SCROLL DETECTION
  // ═══════════════════════════════════════════════════════════════════════════════
  function handleScroll() {
    resetIdleTimer();
    
    const now = Date.now();
    const currentY = window.scrollY;
    const timeDiff = now - lastScrollTime;
    const scrollDiff = Math.abs(currentY - lastScrollY);
    
    if (timeDiff > 0) {
      const speed = scrollDiff / timeDiff;
      
      if (speed > 3 && scrollDiff > 500) {
        clearTimeout(slowDownTimeout);
        showSlowDown = true;
        
        slowDownTimeout = setTimeout(() => {
          showSlowDown = false;
        }, 2000);
      }
    }
    
    lastScrollTime = now;
    lastScrollY = currentY;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🖱️ CUSTOM CONTEXT MENU
  // ═══════════════════════════════════════════════════════════════════════════════
  function handleContextMenu(e) {
    e.preventDefault();
    currentPath = window.location.pathname; // Update current path on open
    showContextMenu = true;
    
    const menuWidth = 180;
    const menuHeight = 380; // Approximate max height of menu
    const padding = 10;
    
    // Handle X position - keep menu on screen
    let x = e.clientX;
    if (x + menuWidth > window.innerWidth - padding) {
      x = window.innerWidth - menuWidth - padding;
    }
    
    // Handle Y position - flip above cursor if not enough space below
    let y = e.clientY;
    if (y + menuHeight > window.innerHeight - padding) {
      // Not enough space below, position above the cursor
      y = Math.max(padding, e.clientY - menuHeight);
    }
    
    contextMenuX = x;
    contextMenuY = y;
  }
  
  function handleContextMenuClick(action) {
    showContextMenu = false;
    
    switch (action) {
      // EOS AI page navigation
      case 'nav-overview':
        scrollToSection('.eos-overview');
        break;
      case 'nav-showcase':
        scrollToSection('.eos-showcase');
        break;
      case 'nav-tech':
        scrollToSection('.eos-tech');
        break;
      case 'nav-architecture':
        scrollToSection('.eos-deepdive');
        break;
      case 'nav-rag':
        scrollToSection('.eos-rag');
        break;
      case 'nav-contact':
        scrollToSection('.eos-cta');
        break;
      
      // InnerEcho page navigation
      case 'nav-ie-screenshots':
        scrollToSection('.screenshots');
        break;
      case 'nav-ie-howitworks':
        scrollToSection('.how-it-works');
        break;
      case 'nav-ie-quote':
        scrollToSection('.quote');
        break;
      
      // Curb page navigation
      case 'nav-curb-stats':
        scrollToSection('.curb-stats');
        break;
      case 'nav-curb-transform':
        scrollToSection('.curb-transformation');
        break;
      case 'nav-curb-features':
        scrollToSection('.curb-features');
        break;
      case 'nav-curb-tech':
        scrollToSection('.curb-tech');
        break;
      
      // Home page navigation
      case 'nav-home-work':
        scrollToSection('.work');
        break;
      case 'nav-home-vision':
        scrollToSection('.vision');
        break;
      case 'nav-home-contact':
        scrollToSection('.contact');
        break;
      
      // Project links
      case 'project-innerecho':
        window.location.href = '/innerecho';
        break;
      case 'project-eosai':
        window.location.href = '/eosai';
        break;
      case 'project-curb':
        window.location.href = '/curb';
        break;
      case 'project-home':
        window.location.href = '/';
        break;
      
      // Fun actions
      case 'confetti':
        createConfetti();
        playSuccessSound();
        break;
      case 'email':
        window.location.href = 'mailto:quinn@upaway.dev?subject=Hey, I found the secret menu!';
        break;
      case 'github':
        window.open('https://github.com/quinnodonnell', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/quinnodonnell', '_blank');
        break;
    }
  }
  
  function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  function handleDocumentClick(e) {
    if (showContextMenu && !e.target.closest('.context-menu')) {
      showContextMenu = false;
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 😴 IDLE DETECTION
  // ═══════════════════════════════════════════════════════════════════════════════
  function resetIdleTimer() {
    showIdleMessage = false;
    clearTimeout(idleTimeout);
    
    idleTimeout = setTimeout(() => {
      showIdleMessage = true;
      idleEmoji = idleEmojis[Math.floor(Math.random() * idleEmojis.length)];
      
      setTimeout(() => {
        showIdleMessage = false;
      }, 5000);
    }, 30000);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🖥️ CONSOLE EASTER EGG
  // ═══════════════════════════════════════════════════════════════════════════════
  function setupConsoleEasterEgg() {
    const asciiArt = `
%c
   ██████╗ ██╗   ██╗██╗███╗   ██╗███╗   ██╗
  ██╔═══██╗██║   ██║██║████╗  ██║████╗  ██║
  ██║   ██║██║   ██║██║██╔██╗ ██║██╔██╗ ██║
  ██║▄▄ ██║██║   ██║██║██║╚██╗██║██║╚██╗██║
  ╚██████╔╝╚██████╔╝██║██║ ╚████║██║ ╚████║
   ╚══▀▀═╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝
                                            
%c  🔍 Hey, you're curious! I like that.
%c
  Since you're poking around in here, you clearly
  know what you're doing. Let's talk!
  
  📧 quinn@upaway.dev
  🐙 github.com/quinnodonnell
  💼 linkedin.com/in/quinnodonnell
  
%c  P.S. Try these secrets:
  - Konami code: ↑↑↓↓←→←→BA
  - Type "hire me" anywhere
  - Type "eos" for EOS AI celebration
  - Type "sold" for Curb confetti
  - Click all 4 service cards in order (1,2,3,4)
  - Click the stats numbers 10 times total
  - Hover the InnerEcho phone for 5 seconds
  - Scroll to the very bottom of the About page
  - Right-click anywhere for the secret menu!
`;
    
    console.log(
      asciiArt,
      'color: #7B949C; font-size: 10px; font-family: monospace;',
      'color: #ff7600; font-size: 16px; font-weight: bold;',
      'color: #FFF5D9; font-size: 12px;',
      'color: #e94560; font-size: 11px; font-style: italic;'
    );
    
    window.party = () => {
      createConfetti();
      console.log('%c🎉 PARTY MODE ACTIVATED!', 'color: #ff7600; font-size: 20px;');
    };
    
    window.hireQuinn = () => {
      console.log('%c✨ Great choice! Sending you to my email...', 'color: #7B949C; font-size: 14px;');
      window.location.href = 'mailto:quinn@upaway.dev?subject=Let\'s work together!';
    };
    
    window.help = () => {
      console.log(`
%c🎮 Secret Console Commands:
%c
  party()      → 🎉 Throw some confetti
  hireQuinn()  → 📧 Shoot me an email
  help()       → 📖 Show this message
  
%cOr explore the page for hidden easter eggs!
`,
        'color: #ff7600; font-size: 14px; font-weight: bold;',
        'color: #FFF5D9; font-size: 12px;',
        'color: #7B949C; font-size: 11px; font-style: italic;'
      );
    };
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // 🚀 INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════════
  onMount(() => {
    if (!browser) return;
    
    setupConsoleEasterEgg();
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('mousemove', resetIdleTimer, { passive: true });
    
    const logo = document.querySelector('.logo, [class*="logo"], header a:first-child');
    if (logo) {
      logo.addEventListener('click', handleLogoClick);
      logo.style.cursor = 'pointer';
    }
    
    const footer = document.querySelector('footer');
    if (footer) {
      footer.addEventListener('click', handleFooterClick);
    }
    
    const profilePhoto = document.querySelector('.profile-photo, [class*="profile"], [class*="avatar"]');
    if (profilePhoto) {
      profilePhoto.addEventListener('mouseenter', handlePhotoHover);
      profilePhoto.addEventListener('mouseleave', handlePhotoLeave);
    }
    
    resetIdleTimer();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mousemove', resetIdleTimer);
      clearTimeout(idleTimeout);
      clearTimeout(hoverTimeout);
      clearTimeout(gibberishTimeout);
      clearTimeout(slowDownTimeout);
      clearTimeout(serviceClickTimeout);
      clearTimeout(phoneHoverTimeout);
      
      if (logo) logo.removeEventListener('click', handleLogoClick);
      if (footer) footer.removeEventListener('click', handleFooterClick);
      if (profilePhoto) {
        profilePhoto.removeEventListener('mouseenter', handlePhotoHover);
        profilePhoto.removeEventListener('mouseleave', handlePhotoLeave);
      }
    };
  });
</script>

<!-- ═══════════════════════════════════════════════════════════════════════════════ -->
<!-- 🎨 VISUAL COMPONENTS -->
<!-- ═══════════════════════════════════════════════════════════════════════════════ -->

<!-- Confetti Particles -->
{#if confetti.length > 0}
  <div class="confetti-container" aria-hidden="true">
    {#each confetti as particle (particle.id)}
      <div 
        class="confetti {particle.shape}"
        style="
          left: {particle.x}px;
          top: {particle.y}px;
          width: {particle.size}px;
          height: {particle.size}px;
          background: {particle.color};
          transform: rotate({particle.rotation}deg);
        "
      ></div>
    {/each}
  </div>
{/if}

<!-- Peace Particles (for InnerEcho) -->
{#if peaceParticles.length > 0}
  <div class="peace-container" aria-hidden="true">
    {#each peaceParticles as particle (particle.id)}
      <div 
        class="peace-particle"
        style="
          left: {particle.x}px;
          top: {particle.y}px;
          font-size: {particle.size}px;
          transform: rotate({particle.rotation}deg);
          opacity: {particle.opacity};
        "
      >{particle.emoji}</div>
    {/each}
  </div>
{/if}

<!-- Konami Secret Message -->
{#if showSecret}
  <div class="secret-overlay" role="dialog" aria-label="Secret unlocked">
    <div class="secret-content konami">
      <div class="secret-emoji">🎮</div>
      <h2 class="secret-title">KONAMI CODE UNLOCKED!</h2>
      <p class="secret-text">
        ↑↑↓↓←→←→BA<br/>
        You know the classics. Respect.
      </p>
      <p class="secret-subtext">
        Now let's build something legendary together.
      </p>
      <div class="secret-cta">
        <a href="mailto:quinn@upaway.dev">quinn@upaway.dev</a>
      </div>
    </div>
  </div>
{/if}

<!-- Hire Me Message -->
{#if showHireMe}
  <div class="secret-overlay" role="dialog" aria-label="Hire me">
    <div class="secret-content hire-me">
      <div class="secret-emoji">🚀</div>
      <h2 class="secret-title">YES! LET'S DO THIS!</h2>
      <p class="secret-text">
        You typed the magic words.<br/>
        I'm already excited to hear about your project.
      </p>
      <div class="hire-buttons">
        <a href="mailto:quinn@upaway.dev" class="hire-btn primary">
          📧 Email Me
        </a>
        <a href="https://linkedin.com/in/quinnodonnell" target="_blank" class="hire-btn secondary">
          💼 LinkedIn
        </a>
      </div>
    </div>
  </div>
{/if}

<!-- EOS Secret (type "eos") -->
{#if showEosSecret}
  <div class="secret-overlay eos-theme" role="dialog" aria-label="EOS celebration">
    <div class="secret-content">
      <div class="secret-emoji">🧡</div>
      <h2 class="secret-title eos-gradient">EOS AI ACTIVATED!</h2>
      <p class="secret-text">
        You found the EOS easter egg!<br/>
        Running on Vision. Running on Track.
      </p>
      <p class="secret-subtext">
        Built with ❤️ for EOS Worldwide
      </p>
    </div>
  </div>
{/if}

<!-- Sold Secret (type "sold") -->
{#if showSoldSecret}
  <div class="secret-overlay curb-theme" role="dialog" aria-label="Sold celebration">
    <div class="secret-content">
      <div class="secret-emoji">🏠</div>
      <h2 class="secret-title curb-gradient">SOLD!</h2>
      <p class="secret-text">
        Another one off the market!<br/>
        Words that sell homes. 🎉
      </p>
      <p class="secret-subtext">
        Curb: AI-Powered Listings
      </p>
    </div>
  </div>
{/if}

<!-- Services Sequence Secret -->
{#if showServicesSecret}
  <div class="secret-overlay" role="dialog" aria-label="Sequence complete">
    <div class="secret-content">
      <div class="secret-emoji">🎯</div>
      <h2 class="secret-title">SEQUENCE COMPLETE!</h2>
      <p class="secret-text">
        1 → 2 → 3 → 4<br/>
        Methodical and thorough. I like your style.
      </p>
      <p class="secret-subtext">
        That's exactly how I approach projects too.
      </p>
    </div>
  </div>
{/if}

<!-- Stats Clicker Secret -->
{#if showStatsSecret}
  <div class="secret-overlay" role="dialog" aria-label="Stats secret">
    <div class="secret-content">
      <div class="secret-emoji">📊</div>
      <h2 class="secret-title">ACHIEVEMENT UNLOCKED!</h2>
      <p class="secret-text">
        10 clicks on the stats!<br/>
        Curiosity is a superpower.
      </p>
      <p class="secret-subtext">
        Fun fact: I click things obsessively too. 🤝
      </p>
    </div>
  </div>
{/if}

<!-- Contact Celebration -->
{#if showContactCelebration}
  <div class="secret-overlay celebration-theme" role="dialog" aria-label="Message sent">
    <div class="secret-content">
      <div class="secret-emoji bounce-emoji">🎉</div>
      <h2 class="secret-title rainbow-text">MESSAGE RECEIVED!</h2>
      <p class="secret-text">
        You're awesome for reaching out!<br/>
        I'll get back to you faster than you can type another easter egg.
      </p>
      <div class="celebration-emojis">
        <span>🚀</span><span>✨</span><span>💬</span><span>🙌</span><span>⚡</span>
      </div>
    </div>
  </div>
{/if}

<!-- Phone Peace Animation (InnerEcho) -->
{#if showPhonePeace}
  <div class="peace-overlay" aria-hidden="true">
    <div class="peace-message">
      <div class="peace-emoji">☮️</div>
      <p>Take a breath. You're doing great.</p>
    </div>
  </div>
{/if}

<!-- About Fun Fact -->
{#if showAboutFunFact}
  <div class="fun-fact-toast">
    <div class="fun-fact-content">
      <span class="fun-fact-emoji">🎉</span>
      <div class="fun-fact-text">
        <strong>Fun fact!</strong>
        <p>You scrolled all the way down! I actually taught myself to code by modding Minecraft at age 12. The rest is history.</p>
      </div>
      <button class="fun-fact-close" on:click={() => showAboutFunFact = false}>×</button>
    </div>
  </div>
{/if}

<!-- Logo Secret -->
{#if showLogoSecret}
  <div class="secret-overlay" role="dialog" aria-label="Secret found">
    <div class="secret-content logo-secret">
      <div class="secret-emoji spinning">⭐</div>
      <h2 class="secret-title">Persistent, I like that!</h2>
      <p class="secret-text">
        7 clicks shows dedication.<br/>
        That's exactly the energy I bring to projects.
      </p>
      <p class="secret-subtext">
        — Quinn
      </p>
    </div>
  </div>
{/if}

<!-- Custom Context Menu -->
{#if showContextMenu}
  <div 
    class="context-menu" 
    style="left: {contextMenuX}px; top: {contextMenuY}px;"
    role="menu"
  >
    <!-- Navigate Group (page-aware) -->
    {#if currentPath === '/eosai'}
      <span class="context-menu-label">Navigate</span>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-overview')} role="menuitem">Overview</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-showcase')} role="menuitem">Showcase</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-tech')} role="menuitem">Tech Stack</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-architecture')} role="menuitem">Architecture</button>
      <div class="context-menu-divider"></div>
    {:else if currentPath === '/innerecho'}
      <span class="context-menu-label">Navigate</span>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-ie-screenshots')} role="menuitem">Screenshots</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-ie-howitworks')} role="menuitem">How It Works</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-ie-quote')} role="menuitem">About</button>
      <div class="context-menu-divider"></div>
    {:else if currentPath === '/curb'}
      <span class="context-menu-label">Navigate</span>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-curb-stats')} role="menuitem">Stats</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-curb-transform')} role="menuitem">Before/After</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-curb-features')} role="menuitem">Features</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-curb-tech')} role="menuitem">Tech Stack</button>
      <div class="context-menu-divider"></div>
    {:else if currentPath === '/' || currentPath === ''}
      <span class="context-menu-label">Navigate</span>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-home-work')} role="menuitem">Work</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-home-vision')} role="menuitem">How I Work</button>
      <button class="context-menu-item" on:click={() => handleContextMenuClick('nav-home-contact')} role="menuitem">Contact</button>
      <div class="context-menu-divider"></div>
    {/if}
    
    <!-- Projects Group -->
    <span class="context-menu-label">Projects</span>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('project-home')} role="menuitem">Portfolio</button>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('project-innerecho')} role="menuitem">InnerEcho</button>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('project-curb')} role="menuitem">Curb</button>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('project-eosai')} role="menuitem">EOS AI</button>
    <div class="context-menu-divider"></div>
    
    <!-- Connect Group -->
    <span class="context-menu-label">Connect</span>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('email')} role="menuitem">Say Hello</button>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('github')} role="menuitem">GitHub</button>
    <button class="context-menu-item" on:click={() => handleContextMenuClick('linkedin')} role="menuitem">LinkedIn</button>
    <div class="context-menu-divider"></div>
    
    <!-- Fun -->
    <button class="context-menu-item" on:click={() => handleContextMenuClick('confetti')} role="menuitem">🎉 Confetti</button>
  </div>
{/if}

<!-- Fast Scroll Warning -->
{#if showSlowDown}
  <div class="toast-message slow-down">
    <span class="toast-emoji">🏃‍♂️</span>
    <span class="toast-text">Woah, slow down! You might miss something cool.</span>
  </div>
{/if}

<!-- Gibberish Message -->
{#if showGibberishMessage}
  <div class="toast-message gibberish">
    <span class="toast-emoji">🔍</span>
    <span class="toast-text">Looking for something? Try "hire me" 😉</span>
  </div>
{/if}

<!-- Idle Message -->
{#if showIdleMessage}
  <div class="idle-message">
    <span class="idle-emoji">{idleEmoji}</span>
    <span class="idle-text">Still there? Don't be shy, say hello!</span>
  </div>
{/if}

<!-- Silly Photo Overlay -->
{#if showSillyPhoto}
  <div class="silly-photo-overlay">
    <div class="silly-photo-content">
      <div class="silly-emoji">🤪</div>
      <p>You found my silly side!</p>
    </div>
  </div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════════════════ -->
<!-- 🎨 STYLES -->
<!-- ═══════════════════════════════════════════════════════════════════════════════ -->
<style>
  /* Global effects */
  :global(body.shake) {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
  
  :global(body.flip-mode) {
    animation: flip 3s ease-in-out;
  }
  
  :global(body.matrix-mode) {
    filter: hue-rotate(90deg) saturate(2);
    background: black !important;
  }
  
  :global(body.matrix-mode *) {
    color: #00ff00 !important;
  }
  
  :global(html.secret-dark-mode) {
    filter: invert(1) hue-rotate(180deg);
  }
  
  :global(html.secret-dark-mode img),
  :global(html.secret-dark-mode video) {
    filter: invert(1) hue-rotate(180deg);
  }
  
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
  
  @keyframes flip {
    0%, 100% { transform: perspective(1000px) rotateY(0deg); }
    50% { transform: perspective(1000px) rotateY(180deg); }
  }
  
  /* Confetti */
  .confetti-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10000;
    overflow: hidden;
  }
  
  .confetti {
    position: absolute;
    pointer-events: none;
  }
  
  .confetti.square {
    border-radius: 2px;
  }
  
  .confetti.circle {
    border-radius: 50%;
  }
  
  .confetti.triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  
  /* Peace Particles */
  .peace-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  }
  
  .peace-particle {
    position: absolute;
    pointer-events: none;
    transition: opacity 0.1s;
  }
  
  .peace-overlay {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9998;
    pointer-events: none;
  }
  
  .peace-message {
    background: rgba(30, 58, 47, 0.95);
    border: 1px solid rgba(123, 148, 156, 0.3);
    padding: 1.5rem 2rem;
    border-radius: 20px;
    text-align: center;
    color: white;
    animation: floatIn 0.5s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
  
  .peace-emoji {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .peace-message p {
    font-size: 1rem;
    opacity: 0.9;
  }
  
  /* Secret Overlay */
  .secret-overlay {
    position: fixed;
    inset: 0;
    background: rgba(24, 34, 65, 0.97);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .secret-overlay.eos-theme {
    background: linear-gradient(135deg, rgba(0, 46, 93, 0.98), rgba(24, 34, 65, 0.98));
  }
  
  .secret-overlay.curb-theme {
    background: linear-gradient(135deg, rgba(15, 36, 25, 0.98), rgba(24, 34, 65, 0.98));
  }
  
  .secret-overlay.celebration-theme {
    background: linear-gradient(135deg, rgba(123, 148, 156, 0.1), rgba(24, 34, 65, 0.98));
  }
  
  .secret-content {
    text-align: center;
    padding: 3rem;
    max-width: 500px;
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .secret-emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 1s ease infinite;
  }
  
  .secret-emoji.spinning {
    animation: spin 2s linear infinite;
  }
  
  .secret-emoji.bounce-emoji {
    animation: bigBounce 0.6s ease infinite;
  }
  
  .secret-title {
    font-family: var(--font-heading, 'Space Grotesk', sans-serif);
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #7B949C, #ff7600, #e94560, #7B949C);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease infinite;
  }
  
  .secret-title.eos-gradient {
    background: linear-gradient(135deg, #ff7600, #FFD700, #ff7600);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .secret-title.curb-gradient {
    background: linear-gradient(135deg, #22c55e, #f59e0b, #22c55e);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .secret-title.rainbow-text {
    background: linear-gradient(90deg, #ff7600, #e94560, #a855f7, #22c55e, #ff7600);
    background-size: 400% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbowShift 2s linear infinite;
  }
  
  @keyframes rainbowShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 400% 50%; }
  }
  
  .secret-text {
    font-size: 1.1rem;
    color: rgba(255, 245, 217, 0.9);
    margin-bottom: 1rem;
    line-height: 1.8;
  }
  
  .secret-subtext {
    font-size: 0.95rem;
    color: var(--color-sage, #7B949C);
    font-style: italic;
  }
  
  .secret-cta a {
    color: #ff7600;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: color 0.2s;
  }
  
  .secret-cta a:hover {
    color: #e94560;
  }
  
  .celebration-emojis {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
    font-size: 2rem;
  }
  
  .celebration-emojis span {
    animation: celebrateBounce 0.5s ease infinite;
  }
  
  .celebration-emojis span:nth-child(1) { animation-delay: 0s; }
  .celebration-emojis span:nth-child(2) { animation-delay: 0.1s; }
  .celebration-emojis span:nth-child(3) { animation-delay: 0.2s; }
  .celebration-emojis span:nth-child(4) { animation-delay: 0.3s; }
  .celebration-emojis span:nth-child(5) { animation-delay: 0.4s; }
  
  @keyframes celebrateBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.2); }
  }
  
  @keyframes bigBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  /* Hire Me Buttons */
  .hire-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }
  
  .hire-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 1rem;
  }
  
  .hire-btn.primary {
    background: linear-gradient(135deg, #ff7600, #e94560);
    color: white;
  }
  
  .hire-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 118, 0, 0.3);
  }
  
  .hire-btn.secondary {
    background: rgba(123, 148, 156, 0.2);
    color: #7B949C;
    border: 1px solid rgba(123, 148, 156, 0.3);
  }
  
  .hire-btn.secondary:hover {
    background: rgba(123, 148, 156, 0.3);
  }
  
  /* Fun Fact Toast */
  .fun-fact-toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10002;
    animation: slideUp 0.5s ease;
  }
  
  .fun-fact-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: rgba(24, 34, 65, 0.98);
    border: 1px solid rgba(255, 118, 0, 0.3);
    padding: 1.25rem 1.5rem;
    border-radius: 16px;
    max-width: 500px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
  }
  
  .fun-fact-emoji {
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  .fun-fact-text {
    flex: 1;
  }
  
  .fun-fact-text strong {
    color: #ff7600;
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .fun-fact-text p {
    color: rgba(255, 245, 217, 0.8);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }
  
  .fun-fact-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.2s;
  }
  
  .fun-fact-close:hover {
    color: white;
  }
  
  /* Context Menu */
  .context-menu {
    position: fixed;
    background: rgba(24, 34, 65, 0.95);
    border: 1px solid rgba(123, 148, 156, 0.2);
    border-radius: 12px;
    padding: 0.5rem 0;
    min-width: 160px;
    z-index: 10002;
    animation: scaleIn 0.12s ease;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(12px);
  }
  
  .context-menu-label {
    display: block;
    padding: 0.35rem 1rem 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(123, 148, 156, 0.7);
  }
  
  .context-menu-item {
    display: block;
    width: 100%;
    padding: 0.45rem 1rem;
    text-align: left;
    background: none;
    border: none;
    color: rgba(255, 245, 217, 0.85);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  
  .context-menu-item:hover {
    background: rgba(123, 148, 156, 0.15);
    color: var(--color-sage, #7B949C);
  }
  
  .context-menu-divider {
    height: 1px;
    background: rgba(123, 148, 156, 0.15);
    margin: 0.35rem 0;
  }
  
  /* Toast Messages */
  .toast-message {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(24, 34, 65, 0.95);
    border: 1px solid rgba(123, 148, 156, 0.3);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10002;
    animation: slideUp 0.3s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
  
  .toast-emoji {
    font-size: 1.5rem;
  }
  
  .toast-text {
    color: rgba(255, 245, 217, 0.9);
    font-size: 0.95rem;
  }
  
  /* Idle Message */
  .idle-message {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: rgba(24, 34, 65, 0.95);
    border: 1px solid rgba(255, 118, 0, 0.3);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10002;
    animation: floatIn 0.5s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
  
  .idle-emoji {
    font-size: 1.5rem;
    animation: wave 1s ease infinite;
  }
  
  .idle-text {
    color: rgba(255, 245, 217, 0.9);
    font-size: 0.9rem;
  }
  
  /* Silly Photo Overlay */
  .silly-photo-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 6rem 2rem 0 0;
  }
  
  .silly-photo-content {
    background: rgba(24, 34, 65, 0.95);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    animation: wiggle 0.5s ease;
    border: 2px solid #ff7600;
  }
  
  .silly-photo-content .silly-emoji {
    font-size: 4rem;
    animation: wiggle 0.3s ease infinite;
  }
  
  .silly-photo-content p {
    color: rgba(255, 245, 217, 0.9);
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
  
  /* Animations */
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
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes floatIn {
    from { 
      opacity: 0;
      transform: translateX(20px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    75% { transform: rotate(-15deg); }
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
  }
</style>
