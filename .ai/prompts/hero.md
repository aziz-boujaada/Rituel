# Hero Animation

Your goal is to create a luxury restaurant hero that feels cinematic, elegant and immersive without sacrificing performance.

## Rules

- Preserve the existing layout.
- Do not change the content.
- Do not change typography, colors or spacing.
- Mobile-first.
- Lighthouse Performance must remain above 90.
- Respect prefers-reduced-motion.

---

## Background Image

The background image is the main storytelling element.

Instead of using a simple zoom, create a cinematic feeling using subtle layered motion.

Requirements:

- Add a very slow Ken Burns effect.
- Scale from 1 to 1.05.
- Duration between 24 and 30 seconds.
- Linear easing.
- Infinite alternate animation.
- The movement must be almost imperceptible.

Add a subtle vertical drift:

- translateY between -8px and 8px.
- Extremely slow.
- Synchronize with the Ken Burns animation.

Never animate width, height, top or left.

Use only:

- transform
- opacity

Enable GPU acceleration.

---

## Ambient Overlay

Create depth using overlays instead of expensive effects.

Add:

- a subtle animated dark gradient overlay
- opacity variation between 0.45 and 0.55
- duration around 12–18 seconds
- infinite alternate

Do NOT use blur filters.

---

## Decorative Accent

Add one elegant animated decorative element.

Ideas:

- a thin golden line that slowly grows below the main title
- a soft radial light moving slightly across one corner
- a subtle warm vignette breathing slowly

The animation must remain almost invisible.

---

## Hero Content

Headline:

- fade in
- translateY 20px → 0
- duration 700ms

Subtitle:

- fade
- slight delay

CTA Buttons:

- fade
- translateY
- stagger after subtitle

Do not animate every character individually.

Avoid typewriter effects.

---

## Scroll Indicator

If a scroll indicator exists:

Animate it gently.

- move 6px vertically
- duration 2.5s
- infinite
- ease-in-out

Keep it subtle.

---

## Performance

- Use transform and opacity only.
- Avoid unnecessary Framer Motion components.
- Reuse existing animation variants.
- Trigger entrance animations only once.
- No layout shifts.
- No memory leaks.
- Support prefers-reduced-motion.

---

## Final Goal

The hero should evoke the atmosphere of a Michelin-star restaurant.

The user should immediately perceive elegance, calmness and premium quality.

Every animation should enhance storytelling without drawing attention to itself.