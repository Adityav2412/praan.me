# Emil Kowalski Design Philosophy — Project Design Rules

This document defines persistent design rules for all UI work on this project. Every component, page, and interaction should be reviewed against these principles.

---

## Core Philosophy

Design should feel effortless to the user. Every pixel, animation, and interaction must earn its place. If it doesn't serve clarity, hierarchy, or delight — remove it.

---

## 1. Visual Hierarchy

- Every page must have ONE clear focal point — the thing you want the user to do or see first.
- Use size contrast aggressively: headlines should be noticeably larger than body text (minimum 2x ratio).
- Limit the number of visual weights on screen. Aim for 3 levels: headline, body, muted.
- Use whitespace as a design element — it's not empty space, it's breathing room.
- Avoid competing elements at the same visual level. If everything is bold, nothing is bold.

## 2. Typography

- Maximum 2 font families per page (display + body).
- Headlines: large, bold, tight leading (line-height 1.0–1.15).
- Body text: comfortable reading size (16–18px), generous leading (1.6–1.8).
- Never go below 14px for any text a user needs to read.
- Use font weight and size for hierarchy — not color alone.
- Letter-spacing: tight for headlines (-0.02em), normal for body, wide for labels/caps (0.05–0.15em).

## 3. Spacing System

- Use a consistent spacing scale (4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- Section padding: generous (80–128px vertical on desktop, 48–64px on mobile).
- Component internal padding: 16–32px.
- Maintain vertical rhythm — spacing between elements should follow predictable patterns.
- When in doubt, add more space. Cramped layouts feel cheap.

## 4. Motion Design

- **Every animation must have a purpose**: reveal content, provide feedback, or guide attention.
- **Duration**: Most UI animations should be 150–300ms. Never exceed 500ms for UI transitions.
- **Easing**: Prefer `ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for enter animations. Use `ease-in` only for exits.
- **Avoid excessive motion**: If removing an animation doesn't hurt comprehension, remove it.
- **Stagger with restraint**: 50–100ms between items maximum. More feels sluggish.
- **Scroll animations**: Use `once: true` — elements should not re-animate on scroll back up.
- **Never animate layout properties** (width, height, top, left) — use transform and opacity only.

## 5. Perceived Performance

- Show content immediately, even if incomplete. Skeleton screens > spinners.
- Optimistic UI: update the interface before the server confirms.
- Lazy load below-fold content but never above-fold.
- Images should have explicit dimensions to prevent layout shift.
- Prioritize First Contentful Paint — hero content must render without JavaScript if possible.

## 6. Loading States

- Use skeleton placeholders that match the shape of the content they're replacing.
- Skeleton color should be subtle (5–10% darker than background).
- Never show a spinner for operations under 300ms — just show the result.
- For operations 300ms–2s: show inline loading indicator (not modal).
- For operations 2s+: show progress text ("Almost ready...") to reduce perceived wait.

## 7. Micro-interactions

- Buttons: subtle translateY(-1px to -2px) on hover. Never scale buttons.
- Cards: soft shadow increase on hover (not color change).
- Links: underline animation (width 0→100%) or color shift only.
- Form inputs: border color transition on focus (200ms).
- Success states: brief, satisfying — don't celebrate for too long.

## 8. Hover States

- Every interactive element MUST have a hover state.
- Hover transitions: 150–200ms, ease-out.
- Prefer subtle transforms over color changes for primary elements.
- Hover effects should hint at interactivity, not distract.
- Touch devices: hover effects should not be required for functionality.

## 9. Mobile Responsiveness

- **Design mobile-first**: start with the smallest viewport, enhance upward.
- Touch targets: minimum 44x44px.
- No horizontal scrolling ever.
- Stack layouts vertically on mobile — don't shrink desktop layouts.
- Mobile typography: reduce headline sizes by 30–40%, keep body at 16px minimum.
- Bottom-sheet patterns for mobile modals — not centered floating cards.
- Test at 375px (iPhone SE) as minimum viewport.

## 10. Accessibility

- Color contrast: minimum 4.5:1 for body text, 3:1 for large text.
- Never use color as the only indicator (add icons, text, or patterns).
- All interactive elements must be keyboard-accessible.
- Use semantic HTML (button for actions, a for navigation, heading hierarchy).
- Respect `prefers-reduced-motion` — disable animations for users who request it.
- Focus indicators must be visible and styled (not browser defaults).
- Images: meaningful alt text or aria-hidden for decorative.

## 11. Premium SaaS Landing Page Patterns

- Hero: one clear headline, one supporting line, one primary CTA. Nothing more above the fold.
- Social proof early: numbers, logos, or testimonials within first 2 scrolls.
- Feature sections: alternate layouts (text-left/image-right, then swap).
- Use contrast sections (dark/light alternating) to create visual chapters.
- CTAs: repeat the primary CTA 3–4 times down the page, not just in hero.
- Footer CTA: large, emotional, final ask before the user leaves.
- Avoid feature dumps — 3 key points beat 10 bullet lists.
- Use specificity: "475 birds helped" beats "many birds helped".

---

## Review Checklist

When creating or modifying UI components, verify:

- [ ] Does it have clear visual hierarchy?
- [ ] Are animations under 300ms with ease-out?
- [ ] Does it work on mobile (375px)?
- [ ] Does it respect prefers-reduced-motion?
- [ ] Is spacing consistent with the 4px scale?
- [ ] Do interactive elements have hover/focus states?
- [ ] Is there a loading state for async content?
- [ ] Would removing any element make it better? (If yes, remove it.)

---

## Anti-patterns to AVOID

- Decorative animations that don't aid comprehension
- Bounce/elastic easing on UI elements (feels toyish)
- Parallax scrolling (hurts performance, adds no value)
- Auto-playing carousels
- Modal dialogs for non-critical information
- More than 2 font families
- Text below 14px
- Cluttered layouts with competing visual weights
- Color-only state indicators
- Animations longer than 500ms for UI transitions
