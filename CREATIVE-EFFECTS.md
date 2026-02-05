# Creative Effects & Interactive Components

This document describes all the creative code gimmicks and interactive effects added to the portfolio.

## 🎯 New Components (in `src/lib/components/`)

### MouseFollower.svelte
Custom cursor with spring-based physics:
- Smooth follow using Svelte's `spring` motion
- Ring + dot design with blend mode effects
- Expands on hoverable elements
- Shows custom text on `[data-cursor-text="View"]` elements
- Auto-hides on touch devices

### MagneticButton.svelte
Buttons that attract to the cursor:
- Magnetic pull effect on hover
- Ripple effect on click
- Shine animation
- Variants: `primary`, `outline`, `ghost`
- Sizes: `sm`, `md`, `lg`

### ScrollReveal.svelte
Intersection Observer-based animations:
- Animations: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom`, `blur`
- Configurable delay, duration, threshold
- `once` prop for one-time animations
- Stagger support for child elements

### TiltCard.svelte
3D perspective tilt on hover:
- Spring-based smooth tilt
- Glare effect following mouse
- Shine border effect
- `[data-tilt-depth="1|2|3"]` for layered 3D effect

### TextScramble.svelte
Cyberpunk-style text reveal:
- Character scramble animation
- `scrambleOnHover` - scramble when hovered
- `scrambleOnView` - scramble when scrolled into view
- Configurable characters, duration, delay

### NoiseOverlay.svelte
Film grain texture overlay:
- SVG-based noise pattern
- Animated for realistic grain
- Configurable opacity and blend mode

### EasterEggs.svelte
Hidden surprises:
- **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A
- **7 Clicks on Logo**: Triggers secret message
- Particle explosion celebration
- Web Audio success melody

### ParallaxSection.svelte
Scroll-based depth effect:
- Configurable speed (0-1)
- Direction: up/down
- Performance optimized with Intersection Observer

### GlowingBorder.svelte
Animated gradient border:
- Rotating conic gradient
- Customizable colors
- Glow intensity control

## 🎨 Global Effects (in `+layout.svelte`)

- **MouseFollower**: Custom cursor across the site
- **NoiseOverlay**: Subtle film grain texture
- **EasterEggs**: Konami code & logo click secrets
- **Lenis**: Already had smooth scrolling

## ✨ Enhanced Micro-Interactions (in `app.css`)

### Links & Buttons
- Bouncy link hover (translateY)
- Focus ring pulse animation
- Active state press effect

### Cards & Stats
- TiltCard on service cards
- Smooth lift on hover
- Feature icon bounce

### Phone Mockups
- Floating animation
- TiltCard 3D effect
- Custom cursor text on hover

### Text Effects
- Gradient text shimmer animation
- TextScramble on section headers
- TextReveal character-by-character

### Lists & Features
- Staggered list item fade-in
- Feature icon scale on hover
- Underline slide effect

### Tech Tags
- Scale + lift on hover
- Background color change

### Footer
- Arrow slide-in on link hover
- Smooth padding transition

### Blob Animations
- Enhanced morphing
- React to hero hover

## 🚀 Usage Examples

```svelte
<!-- Magnetic button -->
<MagneticButton href="/contact" variant="primary">
  Contact Me
</MagneticButton>

<!-- Scroll reveal -->
<ScrollReveal animation="fade-up" delay={0.2}>
  <div class="my-content">...</div>
</ScrollReveal>

<!-- Tilt card -->
<TiltCard maxTilt={15} glareOpacity={0.2}>
  <div class="card">...</div>
</TiltCard>

<!-- Text scramble -->
<TextScramble text="Hello World" scrambleOnHover={true} />

<!-- Custom cursor text -->
<div data-cursor-text="View">
  Hover me for custom cursor
</div>

<!-- Magnetic element (for cursor) -->
<a href="..." data-magnetic>Link</a>
```

## 🎮 Easter Eggs

1. **Konami Code**: Press ↑ ↑ ↓ ↓ ← → ← → B A
2. **Logo Click**: Click the logo 7 times quickly

Both trigger:
- Particle explosion
- Secret message overlay
- Celebratory sound

## 📱 Performance Notes

- All animations use CSS transforms (GPU accelerated)
- `will-change` applied to animated elements
- Intersection Observer for scroll-based effects (not scroll events)
- Touch devices skip custom cursor
- requestAnimationFrame for smooth animations

## 🎭 The Vibe

"This person LOVES building cool stuff" - passionate, creative, technical.

Inspired by:
- The Browser Company (arc.net)
- Vercel
- Linear
- Stripe
