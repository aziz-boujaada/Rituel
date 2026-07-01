# Splash Screen

Create a premium splash screen for the restaurant website.

Goal:

Replace heavy Hero entrance animations with a lightweight loading experience.

Requirements

- Duration between 600ms and 1200ms.
- Hide immediately if the page is already ready.
- Never artificially delay the experience.
- Mobile-first.
- Preserve Lighthouse Performance above 90.

Design

- Full-screen overlay.
- Same background color as the website.
- Restaurant logo centered.
- Thin gold loading line below the logo.
- Smooth fade-out before revealing the page.

Animation

Logo:
- opacity 0 → 1
- scale 0.98 → 1
- duration 500ms

Loading line:
- scaleX 0 → 1
- transform-origin: left
- duration 700ms

Exit:
- opacity 1 → 0
- duration 300ms

Performance

- CSS transforms only.
- GPU accelerated.
- No blur.
- No expensive filters.
- No unnecessary React state.
- Remove the component after completion.
- Respect prefers-reduced-motion.

Implementation

Create a reusable SplashScreen component.

Show it only once when the application first loads.

Do not display it again during navigation.

Keep the implementation lightweight.