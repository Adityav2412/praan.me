# Design Engineering Principles

Inspired by Emil Kowalski's published design philosophy. Evergreen guidance for UI generation and design reviews.

---

## Visual Hierarchy

- Every screen needs ONE clear focal point. If everything is bold, nothing is bold.
- Use 3 levels of visual weight maximum: headline, body, muted.
- Size contrast should be aggressive — headlines at minimum 2x body size.
- Whitespace is a design element. When in doubt, add more.
- Reduce, then reduce again. If removing an element improves clarity, remove it.
- In a world where software is "good enough," taste is the differentiator.

## Typography

- Maximum 2 font families (display + body). Never more.
- Headlines: tight leading (1.0–1.15), bold, large.
- Body: 16–18px minimum, generous leading (1.6–1.8).
- Never render text below 14px that users need to read.
- Letter-spacing: tight for headlines (−0.02em), wide for uppercase labels (0.05–0.15em).
- Use weight and size for hierarchy — not color alone.

## Spacing

- Use a 4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Section padding: 80–128px vertical (desktop), 48–64px (mobile).
- Component padding: 16–32px internal.
- Maintain vertical rhythm — spacing between elements should be predictable.
- Cramped layouts feel cheap. Generous spacing feels premium.

## Motion

- **Every animation must have a purpose**: guide attention, provide feedback, or reveal content. If removing it doesn't hurt comprehension, remove it.
- **Duration**: UI animations should be 150–300ms. Never exceed 500ms for interface transitions.
- **Easing**: Use ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances. Elements should start fast and decelerate — this creates the impression of a quick, responsive interface.
- **Exit animations**: Use ease-in. Elements leaving should accelerate away.
- **Never animate from scale(0)** — start from 0.9+ for a natural feel. Objects in the real world don't appear from nothing.
- **Stagger**: 50–100ms between items maximum. More than that feels sluggish.
- **Scroll animations**: `once: true` — elements should not re-animate when scrolling back up.
- **Only animate transform and opacity**. Never animate layout properties (width, height, top, left) — they trigger expensive reflows.
- **Perceived speed matters more than actual speed**. A 200ms ease-out animation feels faster than a 200ms linear one.
- **Frequently-used interactions** (menus, tooltips after first) should have minimal or no animation. Speed > delight for repeated actions.
- **Tooltips**: delay before first appearance (prevent accidental activation), then no delay or animation when moving between adjacent tooltips.
- **Button press**: scale down slightly (0.97–0.98) on press for tactile feedback.
- **Origin-aware animations**: elements should animate from their trigger point, not from a generic center.

## Micro-interactions

- Buttons: subtle translateY(−1px to −2px) on hover. Never scale buttons on hover.
- Cards: soft shadow increase on hover, not background color change.
- Links: underline width animation (0→100%) or subtle color shift.
- Form inputs: border-color transition on focus (200ms ease-out).
- Success states: brief and satisfying — don't over-celebrate.
- Use blur as a masking technique when content transitions need to feel smoother.

## Loading States

- Show skeleton placeholders that match the shape of incoming content.
- Skeleton color: 5–10% darker than background — subtle, not distracting.
- Operations under 300ms: show result immediately, no indicator needed.
- Operations 300ms–2s: inline loading indicator (spinner or skeleton).
- Operations 2s+: add progress text ("Almost ready...") to reduce perceived wait.
- Optimistic UI: update the interface before server confirms when safe to do so.
- Never show a full-page spinner. Always show partial content or skeletons.

## Accessibility

- Color contrast: 4.5:1 minimum for body text, 3:1 for large text (WCAG AA).
- Never use color as the only state indicator — add icons, text, or patterns.
- All interactive elements must be keyboard-accessible with visible focus indicators.
- Respect `prefers-reduced-motion`: disable or minimize animations for users who request it.
- Use semantic HTML: `<button>` for actions, `<a>` for navigation, proper heading hierarchy.
- Touch targets: minimum 44×44px on mobile.
- Images: meaningful alt text, or `aria-hidden="true"` for purely decorative elements.

## Mobile Design

- Design mobile-first: start at smallest viewport, enhance upward.
- Stack layouts vertically — don't compress desktop grids into tiny mobile versions.
- Reduce headline sizes by 30–40% on mobile, keep body at 16px minimum.
- No horizontal scrolling — ever.
- Use bottom-sheet patterns for mobile modals, not centered floating cards.
- Test at 375px (iPhone SE) as the minimum viable viewport.
- Swipe gestures should feel momentum-based with boundary damping (don't allow infinite drag).

## SaaS Landing Pages

- Hero: one headline, one supporting line, one primary CTA. Nothing more above the fold.
- Show social proof early: numbers, logos, or testimonials within first 2 scrolls.
- Alternate section layouts (text-left/image-right, then swap) to create rhythm.
- Use contrast sections (dark/light alternating) as visual chapters.
- Repeat the primary CTA 3–4 times down the page — not only in the hero.
- Footer CTA: large, emotional, final ask before departure.
- Specificity wins: "475 birds helped" beats "many birds helped."
- 3 key benefits > 10 bullet points. Fewer features, told better.

## Anti-Patterns

- Decorative animations that don't aid comprehension
- Bounce/elastic/spring easing on UI elements (feels toyish in productivity contexts)
- Parallax scrolling (hurts performance, rarely adds value)
- Auto-playing carousels or sliders
- Modal dialogs for non-critical information
- More than 2 font families on one page
- Text below 14px for readable content
- Color-only state indicators (inaccessible)
- Animations longer than 500ms for UI transitions
- Animating from scale(0) — always start from 0.9+
- Using CSS default `ease` — always specify a custom curve
- Layout animations (width/height changes) instead of transforms

## Design Review Checklist

When creating or modifying UI, verify:

- [ ] Clear visual hierarchy with one focal point?
- [ ] Animations purposeful, under 300ms, using ease-out?
- [ ] Works at 375px mobile viewport?
- [ ] Respects `prefers-reduced-motion`?
- [ ] Spacing follows 4px scale consistently?
- [ ] All interactive elements have hover + focus states?
- [ ] Loading state exists for async content?
- [ ] Touch targets ≥ 44×44px on mobile?
- [ ] Color contrast ≥ 4.5:1 for body text?
- [ ] Would removing any element make it better? (If yes, remove it.)

---

*Content was rephrased for compliance with licensing restrictions. Based on principles from [Emil Kowalski's published articles](https://emilkowal.ski) and his [design engineering skill](https://github.com/emilkowalski/skill).*
