# GSAP Effects Reference Guide

Quick reference for common GSAP effects used in your portfolio and additional effects you can add.

## Current Effects in Your Portfolio

### 1. Fade In with Rise
```typescript
gsap.from(element, {
  y: 32,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});
```

### 2. Scale Bounce
```typescript
gsap.from(element, {
  scale: 0.9,
  opacity: 0,
  duration: 0.6,
  ease: "back.out(1.7)"
});
```

### 3. Hover Lift
```typescript
// On hover
gsap.to(element, {
  y: -8,
  duration: 0.4,
  ease: "power2.out"
});

// On leave
gsap.to(element, {
  y: 0,
  duration: 0.4,
  ease: "power2.inOut"
});
```

### 4. Parallax Scroll
```typescript
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  },
  y: -60,
  ease: "none"
});
```

### 5. Magnetic Effect
```typescript
element.addEventListener('mousemove', (e) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(element, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out"
  });
});

element.addEventListener('mouseleave', () => {
  gsap.to(element, {
    x: 0,
    y: 0,
    duration: 0.4,
    ease: "elastic.out(1, 0.5)"
  });
});
```

### 6. Scroll Progress
```typescript
gsap.to(progressBar, {
  scrollTrigger: {
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3
  },
  scaleX: 1,
  transformOrigin: "left center",
  ease: "none"
});
```

## Additional Effects You Can Add

### 7. Text Stagger Animation
```typescript
gsap.from(".text-lines", {
  scrollTrigger: {
    trigger: ".text-container",
    start: "top 80%"
  },
  y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: "power3.out"
});
```

### 8. Counter Animation
```typescript
gsap.to(counterElement, {
  innerHTML: 1000,
  duration: 2,
  ease: "power1.inOut",
  snap: { innerHTML: 1 },
  scrollTrigger: {
    trigger: counterElement,
    start: "top 80%"
  }
});
```

### 9. Rotate on Scroll
```typescript
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    scrub: 1
  },
  rotation: 360,
  ease: "none"
});
```

### 10. Reveal Mask Animation
```typescript
gsap.from(element, {
  clipPath: "inset(0 100% 0 0)",
  duration: 1.2,
  ease: "power4.inOut"
});
```

### 11. Stagger Grid Items
```typescript
gsap.from(".grid-item", {
  scrollTrigger: {
    trigger: ".grid-container",
    start: "top 75%"
  },
  scale: 0.8,
  opacity: 0,
  stagger: {
    amount: 0.8,
    grid: "auto",
    from: "start"
  },
  duration: 0.6,
  ease: "back.out(1.4)"
});
```

### 12. Image Scale on Scroll
```typescript
gsap.to(image, {
  scrollTrigger: {
    trigger: image,
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  },
  scale: 1.2,
  ease: "none"
});
```

### 13. Slide In from Side
```typescript
gsap.from(element, {
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: element,
    start: "top 80%"
  }
});
```

### 14. Fade Between Sections
```typescript
gsap.to(section, {
  scrollTrigger: {
    trigger: section,
    start: "top center",
    end: "bottom center",
    scrub: 1
  },
  opacity: 0.3,
  scale: 0.95,
  ease: "none"
});
```

### 15. Button Press Effect
```typescript
element.addEventListener('click', () => {
  gsap.timeline()
    .to(element, { scale: 0.9, duration: 0.1 })
    .to(element, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.3)" });
});
```

## Common Easing Functions

### Power Eases
- `power1.out` - Gentle deceleration
- `power2.out` - Medium deceleration
- `power3.out` - Strong deceleration (current default)
- `power4.out` - Very strong deceleration

### Elastic
- `elastic.out(1, 0.3)` - Bouncy overshoot
- `elastic.out(1, 0.5)` - More bouncy (used in magnetic)
- `elastic.out(1, 0.7)` - Very bouncy

### Back
- `back.out(1.4)` - Slight overshoot
- `back.out(1.7)` - Medium overshoot (used in stats)
- `back.out(2)` - Strong overshoot

### Others
- `circ.out` - Circular curve
- `expo.out` - Exponential deceleration
- `sine.out` - Sine wave

## ScrollTrigger Properties

```typescript
{
  trigger: element,           // Element to watch
  start: "top 80%",          // When to start (trigger viewport)
  end: "bottom 20%",         // When to end
  scrub: true,               // Tie animation to scroll
  scrub: 1,                  // Smooth scrub with 1s delay
  pin: true,                 // Pin element during animation
  markers: true,             // Debug markers (dev only)
  toggleActions: "play none none reverse",
  onEnter: () => {},         // Callbacks
  onLeave: () => {},
  onEnterBack: () => {},
  onLeaveBack: () => {}
}
```

## Timeline Example

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top center",
    end: "bottom center"
  }
});

tl.from(heading, { y: 50, opacity: 0, duration: 0.6 })
  .from(text, { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
  .from(button, { scale: 0, opacity: 0, duration: 0.4 }, "-=0.2");
```

## Performance Tips

1. **Use transforms only** - `x`, `y`, `scale`, `rotation` (GPU accelerated)
2. **Avoid animating** - `width`, `height`, `top`, `left` (layout triggers)
3. **Add will-change** - For frequently animated elements
4. **Use scrub** - For scroll-tied animations (smoother)
5. **Clean up** - Always revert contexts in useEffect cleanup

## Debugging

```typescript
// Show ScrollTrigger markers
ScrollTrigger.create({
  trigger: element,
  markers: true  // Remove in production!
});

// Log animation progress
gsap.to(element, {
  x: 100,
  onUpdate: () => console.log(gsap.getProperty(element, "x"))
});

// Pause all animations
gsap.globalTimeline.pause();

// Kill specific animations
gsap.killTweensOf(element);
```

## Reduced Motion Support

```typescript
// Respect user preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Instant animation
  gsap.set(element, { opacity: 1, y: 0 });
} else {
  // Full animation
  gsap.from(element, { opacity: 0, y: 50 });
}
```

## Resources

- **GSAP Docs**: https://gsap.com/docs/v3/
- **ScrollTrigger**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Easing Visualizer**: https://gsap.com/docs/v3/Eases/
- **CodePen Examples**: https://codepen.io/GreenSock/
- **GSAP Forum**: https://gsap.com/community/

## Custom Effects Registration

```typescript
// Register a reusable effect
gsap.registerEffect({
  name: "fadeInUp",
  effect: (targets: any, config: any) => {
    return gsap.from(targets, {
      y: config.distance,
      opacity: 0,
      duration: config.duration,
      ease: config.ease
    });
  },
  defaults: { duration: 0.8, distance: 50, ease: "power3.out" },
  extendTimeline: true
});

// Use it
gsap.effects.fadeInUp(".element");
```

---

**Pro Tip**: Start simple and layer complexity. One well-executed animation is better than ten mediocre ones!
