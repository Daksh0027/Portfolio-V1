# Quick Start Guide

## Testing Your Enhanced Portfolio

### 1. Start the Development Server

```bash
npm run dev
```

The portfolio will be available at: `http://localhost:3000`

### 2. What to Test

#### Desktop Experience

**Hero Section:**
- [ ] Content fades in with upward motion
- [ ] Large name (DAKSH SHASTRI) reveals smoothly
- [ ] CTAs have magnetic effect (follow cursor)
- [ ] Custom cursor appears and follows mouse
- [ ] Cursor scales up when hovering over buttons/links

**Scroll Progress:**
- [ ] Green bar at top fills as you scroll down
- [ ] Smooth, synchronized with scroll position

**Statistics Section:**
- [ ] Stats bounce in when scrolling into view
- [ ] Back.out easing creates slight overshoot

**Projects Section:**
- [ ] Cards lift 8px on hover
- [ ] Smooth return animation on mouse leave
- [ ] Demo buttons have magnetic effect

**About Section:**
- [ ] Architectural images have parallax effect
- [ ] Images move upward as you scroll down
- [ ] Subtle, not jarring

**Benchmark Lab:**
- [ ] Copy button pulses when clicked
- [ ] "Copied" message appears for 2 seconds

**Contact Section:**
- [ ] Email link scales slightly on hover
- [ ] Smooth transition

#### Mobile Experience (< 768px)

- [ ] Custom cursor is hidden
- [ ] Default cursor shows
- [ ] All animations still work
- [ ] Touch interactions smooth
- [ ] No magnetic effects (disabled)

#### Accessibility

**Reduced Motion:**
1. Enable "Reduce Motion" in your OS
   - **Windows**: Settings > Ease of Access > Display > Show animations
   - **macOS**: System Preferences > Accessibility > Display > Reduce motion
2. Reload the page
3. Verify: Animations are instant or removed

**Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible (green outline)
- [ ] All buttons/links accessible

### 3. Performance Check

**Chrome DevTools:**
1. Open DevTools (F12)
2. Go to Performance tab
3. Record while scrolling
4. Check: Frame rate should be ~60fps
5. Look for: No layout shifts or repaints

**Lighthouse:**
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Target: Performance > 90

### 4. Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge - Primary experience
- [ ] Firefox - All effects working
- [ ] Safari - Cursor behavior correct
- [ ] Mobile Safari - Touch works, cursor hidden

### 5. Common Issues & Fixes

#### Custom cursor not appearing
```typescript
// Check in browser console:
document.querySelector('.custom-cursor')
// Should return an element
```

#### Animations not smooth
- Check GPU acceleration: Elements should use `transform` and `opacity` only
- Verify will-change is applied
- Check for other heavy scripts

#### ScrollTrigger not working
```typescript
// In browser console:
ScrollTrigger.getAll()
// Should return an array of triggers
```

#### Stats not animating
- Scroll to stats section
- Check viewport trigger (top 85%)
- Verify `.stat-number` class is applied

### 6. Customization Quick Wins

#### Change animation speed
```typescript
// In app/page.tsx, find:
duration: 0.8
// Change to faster (0.4) or slower (1.2)
```

#### Adjust parallax intensity
```typescript
// Find parallax images:
y: -60
// Reduce for subtle (-30) or increase for dramatic (-120)
```

#### Modify magnetic strength
```typescript
// Find magnetic effect:
x: x * 0.3
// Reduce (0.2) or increase (0.5) multiplier
```

#### Change scroll progress color
```typescript
// In ScrollProgress.tsx:
backgroundColor: "#c6f19d"
// Change to any color
```

### 7. Production Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

### 8. Debugging Tips

**Enable ScrollTrigger markers (dev only):**
```typescript
ScrollTrigger.create({
  trigger: element,
  markers: true  // Shows visual markers
});
```

**Pause all animations:**
```typescript
// In browser console:
gsap.globalTimeline.pause()
```

**Check animation progress:**
```typescript
// In browser console:
gsap.getTweensOf(element)
```

**Kill specific animations:**
```typescript
gsap.killTweensOf(element)
```

### 9. Performance Monitoring

```typescript
// Add to useEffect to track:
ScrollTrigger.addEventListener("refresh", () => {
  console.log("ScrollTrigger refreshed");
});

gsap.ticker.addEventListener("tick", () => {
  // Runs every frame
  // Use sparingly!
});
```

### 10. Next Steps

Once verified working:
1. ✅ Test on real devices
2. ✅ Verify accessibility
3. ✅ Check performance
4. ✅ Deploy to production
5. 🎉 Enjoy your enhanced portfolio!

## Troubleshooting

### Issue: Animations fire multiple times
**Solution:** Check that ScrollTrigger toggleActions are set correctly:
```typescript
toggleActions: "play none none none"
```

### Issue: Memory leaks
**Solution:** Ensure contexts are cleaned up:
```typescript
return () => ctx.revert();
```

### Issue: Scroll progress not smooth
**Solution:** Increase scrub value:
```typescript
scrub: 0.3 // Try 0.5 or 1
```

### Issue: Cursor showing on mobile
**Solution:** CSS already handles this:
```css
@media (max-width: 768px) {
  .custom-cursor { display: none !important; }
}
```

## Need Help?

- **GSAP Docs**: https://gsap.com/docs/v3/
- **GSAP Forum**: https://gsap.com/community/
- **Stack Overflow**: Tag `gsap`

---

**Happy testing! 🚀**
