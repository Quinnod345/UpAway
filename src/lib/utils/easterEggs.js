// Easter Egg utility functions - exported for use across components
import { writable } from 'svelte/store';

const browser = typeof window !== 'undefined';

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 EXPORTED STORES FOR SECTION INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════════
export const easterEggTriggered = writable(null);
export const confettiStore = writable(false);

// Internal state
let lastServiceCardClicked = 0;
let serviceClickSequence = [];
let phoneHoverTimeout = null;
let showPhonePeace = false;
let showAboutFunFact = false;

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 CONFETTI CREATION
// ═══════════════════════════════════════════════════════════════════════════════
export function createConfetti(customColors = null) {
  if (!browser) return;
  
  confettiStore.set(true);
  
  const colors = customColors || ['#7B949C', '#ff7600', '#FFF5D9', '#e94560', '#182241'];
  const confettiCount = 150;
  
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 0.5;
    
    confetti.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${startX}%;
      top: -20px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      animation: confetti-fall ${duration}s ease-in ${delay}s forwards;
    `;
    
    container.appendChild(confetti);
  }
  
  // Add keyframes if not exists
  if (!document.getElementById('confetti-keyframes')) {
    const style = document.createElement('style');
    style.id = 'confetti-keyframes';
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => {
    container.remove();
    confettiStore.set(false);
  }, 5000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎴 SERVICE CARD CLICK HANDLER
// ═══════════════════════════════════════════════════════════════════════════════
export function handleServiceCardClick(cardNumber) {
  if (!browser) return;
  
  const now = Date.now();
  
  // Reset sequence if too much time passed
  if (now - lastServiceCardClicked > 3000) {
    serviceClickSequence = [];
  }
  
  serviceClickSequence.push(cardNumber);
  lastServiceCardClicked = now;
  
  // Check for secret sequence: 1, 2, 3, 4
  if (serviceClickSequence.length >= 4) {
    const lastFour = serviceClickSequence.slice(-4);
    if (lastFour.join(',') === '1,2,3,4') {
      createConfetti();
      easterEggTriggered.set('service-sequence');
      serviceClickSequence = [];
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 STAT CLICK HANDLER
// ═══════════════════════════════════════════════════════════════════════════════
export function handleStatClick(statId, currentValue) {
  if (!browser) return currentValue;
  
  // Add bonus for rapid clicking
  return currentValue + 1;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📧 CONTACT CELEBRATION
// ═══════════════════════════════════════════════════════════════════════════════
export function triggerContactCelebration() {
  if (!browser) return;
  
  createConfetti(['#7B949C', '#FFF5D9', '#ff7600']);
  easterEggTriggered.set('contact-form');
  
  // Play a subtle success sound
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    // Audio context not available
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 INNERECHO PHONE HOVER HANDLER
// ═══════════════════════════════════════════════════════════════════════════════
export function handlePhoneHoverStart() {
  if (!browser) return;
  
  phoneHoverTimeout = setTimeout(() => {
    showPhonePeace = true;
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
    easterEggTriggered.set('about-scroll');
  }
}

export function hideAboutFunFact() {
  showAboutFunFact = false;
}
