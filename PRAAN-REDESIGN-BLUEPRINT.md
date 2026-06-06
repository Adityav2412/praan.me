# PRAAN — Complete Redesign Blueprint
**Water For Wings · Movement Platform Redesign**

---

## REFERENCE PRINCIPLES EXTRACTED

Before the audit, distilling what to take from each reference:

**Apple** → Confidence through restraint. Typography does all the heavy lifting. Whitespace is not emptiness — it is presence. Every element earns its place. Large type feels like a statement of belief, not decoration.

**Linear** → Precision layout. Dark surfaces with near-black backgrounds create depth without gimmick. Visual rhythm = consistent spacing units applied without exception. Nothing competes; everything belongs to a system.

**Patagonia** → Mission comes first, product comes second. Storytelling is sequential and patient — they don't rush you to convert. Emotional language ("The planet is our only shareholder") is placed as copy, not as a feature. Photography/illustration is treated as voice, not decoration.

**charity: water** → Numbers create urgency and proof simultaneously. Impact is shown, not described. Community participation is framed as identity, not action ("You are a water changer"). Trust is built through transparency — showing exactly who contributed, when, and where.

---

## 1. CURRENT DESIGN AUDIT

### Strengths
- Color palette (deep navy #1b3a6b on warm parchment #f5f0e8) has genuine warmth and character — uncommon in impact platforms.
- The founder sketch is a rare, humanizing asset. It reads as authentic, not polished.
- "Water For Wings" naming is memorable and poetic.
- Saviour terminology ("Saviours Joined") gives participants an identity, not just a role.
- Poppins at large weights has enough personality to carry the brand.
- The temperature widget is a smart urgency mechanism — live data tied to emotional relevance.

### Weaknesses

**Hierarchy:**
- Logo appears TWICE on mobile (navbar + hero). Eliminates purpose of both.
- "INTRODUCING" label before "Water For Wings" is unnecessary framing — the initiative should speak for itself.
- The three-step flow (Place Water → Register → Join Wall) reads like instructions, not an invitation.
- The counter (18 SAVIOURS JOINED) is placed below the CTA buttons instead of above them, reversing emotional logic: proof should precede ask.

**Storytelling:**
- Hero section attempts three jobs simultaneously: introduce PRAAN, introduce Water For Wings, and convert. None is done fully.
- "EVERY ACT. EVERY LIFE." and "Praan exists to turn kindness into action." are both on screen together — one should earn the space the other takes.
- The page jumps from hero to community wall without a "why" moment — there is no section that explains the stakes (birds dying in 45°C heat) before asking you to act.
- The founder section is a separate page, disconnecting the most humanizing asset from the conversion moment.

**Layout:**
- Entire hero is centered — every line, every element. This creates visual monotony and reads as a template.
- The step flow (Place Water → Register → Join Wall) three columns in the hero has no visual weight differentiation. Steps 1, 2, 3 look identical.
- Saviour Wall cards show "Not specified" for vessel type — this empty state is public-facing and damages credibility.
- Leaderboard emoji (🏆) next to heading reads casual; undercuts the civic pride the section is trying to create.

**Trust:**
- No explanation of what happens after you register.
- No social proof beyond a raw count.
- "Not specified" visible on public wall creates perception of low engagement/care.
- No indication of who built this or why before the Founder's Message page (which requires navigation).

**Conversion:**
- Two CTAs side by side ("Join The Saviour Wall" + "View Saviours") create a split decision at the moment of highest intent.
- "Join The Saviour Wall" is the primary CTA but does not explain the action — what does joining mean? What happens?
- Mobile: the button stack takes the entire viewport below fold, leaving no teaser of what's below.

---

## 2. INFORMATION ARCHITECTURE

### Redesigned Page Structure

```
01 · HERO
     PRAAN logo (small, positioned — not dominant)
     Initiative mark: Water For Wings
     Emotional headline (stakes, not description)
     Live temperature widget (urgency signal)
     Saviour count (social proof)
     Single primary CTA

02 · THE STAKES
     Why birds are dying now
     Delhi summer temperature context
     The one action that helps
     Emotional but factual — no sentimentality

03 · THE ACTION
     How it works (3 steps — redesigned as a journey, not a checklist)
     What "Saviour" means (identity framing)
     What happens after you register

04 · FOUNDER MOMENT
     Founder sketch (full weight, not buried)
     The origin story (condensed, with key quote surfaced)
     Transition line into community

05 · SAVIOUR WALL
     Live community — names, areas, vessel types
     Filtered/scrollable — designed as a living record
     Count displayed prominently

06 · AREA LEADERBOARD
     Colony rankings — redesigned as civic pride, not gamification
     Map or visual area indicator (optional enhancement)

07 · FINAL CTA
     Movement-framed close
     Single action
     Emotional send-off

08 · FOOTER
     PRAAN identity
     Water For Wings initiative note
     Social links
     Minimal
```

### Narrative Order Logic

**Emotional progression:**
1. **Presence** — You are here. Something is happening in Delhi's summer.
2. **Stakes** — Birds are dying. This is real. This is now.
3. **Agency** — One bowl. One action. You can do this.
4. **Identity** — Someone started this. A real person. Here is why.
5. **Community** — Others already did it. You are not alone.
6. **Competition** — Your colony could be on top. Your street can lead.
7. **Commitment** — Join. Now. Before the next bird doesn't make it.

This order moves: Witness → Understand → Believe → Trust → Belong → Act.

The current order is: Land → Convert → Scroll → Optionally learn.

---

## 3. HERO REDESIGN

### Layout

**Abandon full-center. Use left-anchored composition.**

```
Desktop (1440px):
┌─────────────────────────────────────────────────────────┐
│  [PRAAN logo — top left, small, wordmark only]          │
│                              [Nav links — top right]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Temperature widget — top left, flush under nav]       │
│                                                         │
│  WATER FOR WINGS              [Founder sketch —         │
│  ─────────────                 right side, large,       │
│  A simple bowl of water        partially cropped,       │
│  can save a bird's life.       bleeding out of frame]   │
│                                                         │
│  [Delhi: 40°C · Dangerously hot]                        │
│                                                         │
│  ████ SAVIOURS JOINED                                   │
│  [live, animated number]                                │
│                                                         │
│  [Place Your Water Bowl →]  ← single CTA               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Hierarchy

**Typography stack in hero (large to small):**
1. "WATER FOR WINGS" — display weight, large (56–72px), left-aligned, navy
2. Single-sentence mission — body weight, 20–22px, left-aligned, ~60% opacity
3. Temperature widget — small capsule, 14px
4. Saviour count — numeric display, 48px bold, followed by label in 13px caps
5. CTA — 16px medium, full-width on mobile, left-anchored on desktop

**Why left-anchored:**
Centered layouts imply neutrality and balance. PRAAN is not neutral — it has urgency. Left anchoring implies momentum, forward movement, agency. Every premium social impact platform (charity: water, Patagonia campaigns) uses asymmetric composition in their hero.

### Founder Sketch Placement in Hero

Move the sketch to the right half of the hero — large, slightly desaturated (sepia-shift it with CSS `filter: sepia(15%) contrast(105%)`), with the bottom edge and right edge cropped out of the viewport. This creates presence without taking screen real estate from copy. It signals: a real person built this.

Do NOT shrink it to a thumbnail. Its power is in scale.

### PRAAN Logo Placement

Top-left navbar only. Small, 28–32px height. Do not repeat it as a hero centerpiece. The logo lives in the nav. The hero leads with the mission.

### Weather Widget Placement

Remove from center of page. Place as a persistent top-left capsule under the navbar (sticky on scroll or static). It should read like a news ticker — factual, ambient, always present. This gives it systemic weight rather than decorative weight.

Format: `🌡 Delhi · 40°C · Dangerously hot today`

### Saviour Counter Placement

Place ABOVE the CTA. Visual logic: proof → ask. Not: ask → proof.

Format:
```
  1,847
SAVIOURS HAVE ACTED
```
Large number in display weight. Label in 11px tracking caps. Animate the number incrementing on load (countUp.js or CSS counter animation).

### CTA Structure

**One primary CTA only in hero.** Current two-CTA split (Join + View) creates hesitation.

Primary: `Place Your Water Bowl →` — action-oriented, explains the physical act
Secondary: Available below the fold as scroll progresses, not in hero.

---

## 4. STORYTELLING SYSTEM

### First Impression

The page should open with environmental weight. The background is not a gradient — it is a mood. Warm parchment (#f5f0e8) with the hero text starting mid-left. The founder sketch is already visible on load, slightly faded, waiting. The temperature widget is live. The counter is counting. By the time you read the headline, you feel the heat.

### Trust Building

**Section 02 (The Stakes)** handles trust through factual specificity:
- "Delhi recorded 45°C on [date]" — concrete, datable
- "Small birds cannot regulate body heat above 40°C" — scientific, not sentimental
- "A bowl of water costs nothing" — removes the barrier objection before it forms

Use a narrow column (65ch max) for this section. No imagery needed. Just clean, patient copy with generous line height. This is where Patagonia's principle applies: let the mission speak without decoration.

### Urgency Creation

**Section 02 and the persistent weather widget** create sustained urgency without panic. Urgency is structural, not typographic — do not bold everything, do not use red. The temperature is already red without help.

One exception: the temperature number itself can pulse subtly (CSS keyframe animation at 3s interval, opacity 1 → 0.85 → 1). This is the only animation that communicates urgency.

### Participation Motivation

**The identity frame is everything.** Never call participants "users" or "volunteers." Always: "Saviours."

When someone registers, the confirmation should say:
> "You are now Saviour #[N] of Delhi's Water For Wings movement."

This is charity: water's principle applied to PRAAN: the number is an identity, not a statistic.

Section 03 (The Action) should include a single line after the steps:
> "Every Saviour is named. Every bowl counts."

This answers: what do I get for participating? Answer: permanence, visibility, identity.

---

## 5. DESKTOP WIREFRAME

```
════════════════════════════════════════════════════════════
SECTION 01 — HERO  [min-height: 100vh, background: #f5f0e8]
════════════════════════════════════════════════════════════

NAV [height: 56px, position: sticky, background: #f5f0e8, border-bottom: 1px solid #d4cfc5]
  LEFT: [PRAAN wordmark — 28px height]
  CENTER: nothing
  RIGHT: [About] [Why It Matters] [Saviours] [Area Leaderboard] [Founder's Message]

HERO BODY [padding: 80px 120px, display: grid, grid-template-columns: 1fr 1fr, gap: 80px]
  LEFT COLUMN:
    [Temperature widget — small capsule, 14px, top of column]
    [Spacer: 48px]
    [Label: "WATER FOR WINGS" — 11px caps, tracking: 0.15em, navy/50%]
    [H1: "A simple bowl of water — saves a life." — 64px, weight 700, navy, line-height: 1.1]
    [Spacer: 32px]
    [Body: "Delhi's summer heat kills birds. One bowl outside your door changes that." — 18px, navy/65%]
    [Spacer: 48px]
    [Saviour counter: "1,847" — 52px bold + "SAVIOURS HAVE ACTED" — 11px caps, 8px below]
    [Spacer: 32px]
    [CTA: "Place Your Water Bowl →" — 16px, navy background, parchment text, 52px height, 240px width, radius: 6px]

  RIGHT COLUMN:
    [Founder sketch — full column height, object-fit: contain, bottom-anchored,
     right edge: -20px overflow, filter: sepia(10%) contrast(105%),
     opacity: 0.9]

════════════════════════════════════════════════════════════
SECTION 02 — THE STAKES  [background: #1b3a6b, color: #f5f0e8]
════════════════════════════════════════════════════════════

  [padding: 120px 240px]
  [max-width: 800px, centered in column]

  [Label: "WHY THIS MATTERS" — 11px caps, parchment/50%]
  [Spacer: 24px]
  [H2: "Delhi summers are becoming unsurvivable for birds." — 40px, weight 600, parchment]
  [Spacer: 32px]
  [Body paragraphs — 17px, parchment/75%, line-height: 1.8, max-width: 65ch]
    Para 1: Temperature context + bird biology fact
    Para 2: Scale of the problem in Delhi specifically
    Para 3: The simplicity of the solution
  [Spacer: 48px]
  [Inline stat block — 3 columns, no borders, just spacing]
    [45°C / Peak Delhi temp] [< 5 mins / Time to place a bowl] [0 ₹ / Cost to a Saviour]
    [11px caps labels below each]

════════════════════════════════════════════════════════════
SECTION 03 — THE ACTION  [background: #f5f0e8]
════════════════════════════════════════════════════════════

  [padding: 120px 120px]
  [H2: "Becoming a Saviour" — 40px, left-aligned]
  [Spacer: 64px]

  [3-step layout — horizontal, but NOT equal weight]
    Step 01 [width: 35%, vertical line on left]: 
      [Step number: "01" — 80px, weight 300, navy/20%, absolute positioned]
      [Title: "Place a bowl of water." — 22px, weight 600]
      [Body: 15px, navy/65%] "Outside your door, terrace, or windowsill. Any container works."
    
    Step 02 [width: 35%]:
      [Step number: "02"]
      [Title: "Register your contribution."]
      [Body: "Name your area. Tell us what you used. Takes 60 seconds."]
    
    Step 03 [width: 30%]:
      [Step number: "03"]
      [Title: "Join the Saviour Wall."]
      [Body: "Your name, your area, your act — permanently on record."]

  [Spacer: 64px]
  [Line: "Every Saviour is named. Every bowl counts." — 17px italic, centered, navy/50%]
  [Spacer: 48px]
  [CTA centered: "Register as a Saviour →"]

════════════════════════════════════════════════════════════
SECTION 04 — FOUNDER  [background: #ede8dc]
════════════════════════════════════════════════════════════

  [padding: 120px 120px]
  [display: grid, grid-template-columns: 1fr 1fr, gap: 120px, align-items: start]

  LEFT:
    [Label: "FROM THE FOUNDER" — 11px caps]
    [Spacer: 24px]
    [Quote: "If even 10 people start keeping water outside daily — for me, this movement is already successful." — 28px, weight 400, italic, line-height: 1.5]
    [Spacer: 40px]
    [Body copy — 15px, 2–3 short paragraphs, max 45ch each]
    [Spacer: 48px]
    [Signature — handwriting font or actual scan, small]
    [Name + title: "Akshay / Founder, PRAAN" — 14px]
    [Spacer: 24px]
    [Link: "Read the full founder's message →" — 14px, navy, underline on hover]

  RIGHT:
    [Founder sketch — full column, same treatment as hero but lighter crop
     Portrait framing. Bottom third cut off. Right-aligned within column.]

════════════════════════════════════════════════════════════
SECTION 05 — SAVIOUR WALL  [background: #f5f0e8]
════════════════════════════════════════════════════════════

  [padding: 120px 120px]

  HEADER ROW [display: flex, justify-content: space-between, align-items: baseline]:
    LEFT: [H2: "The Saviour Wall" — 40px]
    RIGHT: [Counter: "1,847 Saviours" — 20px, navy/60%]
  [Spacer: 16px]
  [Subtitle: "Every name on this wall represents a water bowl placed in Delhi." — 16px, navy/55%]
  [Spacer: 64px]

  GRID [grid-template-columns: repeat(3, 1fr), gap: 24px]:
    CARD:
      [background: #ede8dc, border-radius: 8px, padding: 24px 28px]
      [Row 1: Name (16px, weight 600) + Saviour number (11px pill, navy bg, parchment text)]
      [Row 2: Area — 14px, navy/60%]
      [Row 3: Vessel type + Time ago — 13px, navy/40%]
      NOTE: If vessel type is "Not specified", show "Bowl" as default display text.
            Never show "Not specified" on the public wall.

  [Spacer: 48px]
  [Load more button or infinite scroll — centered]

════════════════════════════════════════════════════════════
SECTION 06 — AREA LEADERBOARD  [background: #1b3a6b]
════════════════════════════════════════════════════════════

  [padding: 120px 120px]

  [Label: "WHICH COLONY IS LEADING?" — 11px caps, parchment/50%]
  [Spacer: 16px]
  [H2: "Delhi's Saving Race" — 40px, parchment, weight 600]
  [Spacer: 8px]
  [Subtitle: "Every Saviour in your colony counts toward your colony's rank." — 16px, parchment/60%]
  [Spacer: 64px]

  LEADERBOARD TABLE [max-width: 720px, margin: 0 auto]:
    Each row:
      [Rank number — 14px, parchment/40%, fixed 32px width]
      [Colony name — 16px, parchment, weight 500]
      [Progress bar — height: 3px, background: parchment/15%, fill: parchment/60%]
      [Saviour count — 14px, parchment/50%, right-aligned]
    
    Top 3 rows: parchment/90% for name, fill: #f5c842 (warm gold) for progress bar
    Ranks 4+: standard treatment above

  [Spacer: 48px]
  [Inline line: "Don't see your colony? You could be the first." — italic, parchment/40%, centered]

════════════════════════════════════════════════════════════
SECTION 07 — FINAL CTA  [background: #f5f0e8]
════════════════════════════════════════════════════════════

  [padding: 160px 120px, text-align: left]
  [max-width: 680px]

  [Label: "WATER FOR WINGS · DELHI 2025" — 11px caps, navy/40%]
  [Spacer: 24px]
  [H2: "One bowl. One Saviour. One less bird lost." — 48px, weight 700, navy, line-height: 1.1]
  [Spacer: 32px]
  [Body: "The temperature outside right now is [live temp]. Every hour without water is dangerous for Delhi's birds. It takes less time to place a bowl than it took to read this page." — 17px, navy/65%]
  [Spacer: 48px]
  [CTA: "Place Your Water Bowl →" — large, navy bg, parchment text, 56px height]
  [Spacer: 16px]
  [Sub-link: "View the Saviour Wall ↓" — 14px, underline, navy/50%]

════════════════════════════════════════════════════════════
FOOTER  [background: #1b3a6b, padding: 64px 120px]
════════════════════════════════════════════════════════════

  TOP ROW [display: flex, justify-content: space-between]:
    [PRAAN wordmark — parchment, 24px height]
    [Social icons: Instagram, X — parchment/60%, 20px]
  
  MIDDLE ROW [margin-top: 40px, display: grid, grid-template-columns: 1fr 1fr 1fr]:
    Col 1: [Label: "INITIATIVE"] [Text: "Water For Wings — Saving Delhi's Birds"]
    Col 2: [Label: "MISSION"] [Text: "Every act. Every life."]
    Col 3: [Label: "HASHTAG"] [Text: "#DelhiBirdsNeedWater"]
  
  BOTTOM ROW [border-top: 1px solid parchment/15%, margin-top: 40px, padding-top: 24px]:
    [Copyright — 12px, parchment/40%]
    [praan.me — 12px, parchment/40%]
```

---

## 6. MOBILE WIREFRAME

```
════════════════════════════════════════════════════
MOBILE NAV [height: 52px, sticky]
════════════════════════════════════════════════════
  [PRAAN wordmark — center]
  [Hamburger — right]
  [NO logo repetition in hero]

════════════════════════════════════════════════════
SECTION 01 — HERO MOBILE [min-height: 100svh]
════════════════════════════════════════════════════

  [padding: 40px 24px 48px]
  [background: #f5f0e8]
  [display: flex, flex-direction: column]

  [Temperature widget — full width capsule, 14px]
  [Spacer: 32px]
  
  [Label: "WATER FOR WINGS" — 11px caps, navy/50%]
  [Spacer: 12px]
  [H1: "A simple bowl saves a life." — 40px, weight 700, navy, line-height: 1.15]
  [Spacer: 16px]
  [Body: "Delhi's summer heat kills birds. One bowl outside your door changes that." — 16px, navy/65%]
  
  [Spacer: 40px]
  
  [Founder sketch — width: 100%, max-height: 220px, object-fit: cover, 
   object-position: top center, border-radius: 8px]
   NOTE: On mobile, sketch becomes a wide landscape crop of the portrait — 
         shows face and shoulders. Not full body. Creates intimacy.
  
  [Spacer: 40px]
  
  [Saviour counter: "1,847" — 44px bold + label — centered]
  [Spacer: 24px]
  [CTA: "Place Your Water Bowl →" — full width, 52px height, navy bg]
  [Spacer: 12px]
  [Sub-link: "View Saviours ↓" — centered, 14px, navy/50%]

════════════════════════════════════════════════════
SECTION 02 — STAKES MOBILE [background: #1b3a6b]
════════════════════════════════════════════════════

  [padding: 64px 24px]
  
  [Label + H2 same as desktop — 32px on mobile]
  [Body paragraphs — 16px, parchment/75%]
  
  [Stat block — stacked vertically, border-top each row]
    [45°C · Peak Delhi temp]
    [< 5 mins · Time to place a bowl]
    [₹0 · Cost to a Saviour]

════════════════════════════════════════════════════
SECTION 03 — ACTION MOBILE [background: #f5f0e8]
════════════════════════════════════════════════════

  [padding: 64px 24px]
  [H2: "Becoming a Saviour" — 32px]
  
  [Steps — stacked vertically, left border line connecting them]
    Each step:
      [Step number — large background, 60px, weight 200, opacity 15%]
      [Title — 18px, weight 600]
      [Body — 15px]
      [Connector line between steps: 1px left border, navy/20%]
  
  [CTA — full width]

════════════════════════════════════════════════════
SECTION 04 — FOUNDER MOBILE [background: #ede8dc]
════════════════════════════════════════════════════

  [padding: 64px 24px]
  
  [Founder sketch — full width, 260px height, object-fit: cover, 
   object-position: top, border-radius: 8px]
  [Spacer: 32px]
  [Label + Quote — 22px italic]
  [Body + Signature — same as desktop, stacked]
  [Link to full message]

════════════════════════════════════════════════════
SECTION 05 — SAVIOUR WALL MOBILE [background: #f5f0e8]
════════════════════════════════════════════════════

  [padding: 64px 24px]
  [Header: H2 + counter in same row, font-size reduced]
  
  [Cards — single column, full width]
    [Each card: 24px padding, same data structure]
    [Show 6 by default, "Load more" button]

════════════════════════════════════════════════════
SECTION 06 — LEADERBOARD MOBILE [background: #1b3a6b]
════════════════════════════════════════════════════

  [padding: 64px 24px]
  [Label + H2: "Delhi's Saving Race" — 28px]
  
  [Table — full width]
    [Each row: rank + name + count on single line]
    [Progress bar: full width, 3px, below the row]
    [Spacing: 20px between rows]

════════════════════════════════════════════════════
SECTION 07 — FINAL CTA MOBILE [background: #f5f0e8]
════════════════════════════════════════════════════

  [padding: 80px 24px]
  [H2: 36px]
  [Body: 16px]
  [CTA: full width, 52px]

════════════════════════════════════════════════════
FOOTER MOBILE [background: #1b3a6b, padding: 48px 24px]
════════════════════════════════════════════════════

  [Logo — centered]
  [Initiative + Mission — stacked, centered, 14px]
  [Social icons — centered]
  [Copyright — centered, 12px]
```

---

## 7. DESIGN SYSTEM

### Typography Hierarchy

Keep Poppins. It has enough warmth and authority for this use case. Do not change it.

| Role | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Display | 64–72px | 700 | #1b3a6b | Hero H1 desktop |
| H1 Mobile | 40px | 700 | #1b3a6b | Hero H1 mobile |
| H2 | 40px | 600 | context | Section headers |
| H2 Mobile | 28–32px | 600 | context | — |
| Quote | 28px | 400 | #1b3a6b | Founder quote, italic |
| Body Large | 18px | 400 | #1b3a6b at 65% | Hero subtext |
| Body | 16–17px | 400 | #1b3a6b at 65% | Section body |
| Body Small | 15px | 400 | #1b3a6b at 65% | Step descriptions |
| Caption | 13–14px | 400 | #1b3a6b at 40–50% | Meta, times, sub-labels |
| Label/Overline | 11px | 500 | #1b3a6b at 50% | CAPS, tracking: 0.12em |
| Counter | 44–52px | 700 | #1b3a6b | Live counts |
| Step Number | 72–80px | 300 | #1b3a6b at 15% | Background decoration |

**Critical rule:** Only two weights in any visible section — 700 (display/emphasis) and 400 (body). 600 for H2 only. Do not mix 500, 600, 700 on the same screen.

### Spacing System

Base unit: 8px. All spacing is multiples of 8.

| Token | Value | Use |
|---|---|---|
| space.xs | 8px | Icon gaps, inline |
| space.sm | 16px | Within components |
| space.md | 24px | Card padding tight |
| space.lg | 32px | Between related elements |
| space.xl | 48px | Between sections of content |
| space.2xl | 64px | Major section breathing room |
| space.3xl | 80–120px | Section vertical padding |

### Grid System

**Desktop:**
- Max content width: 1200px
- Outer margin: 120px each side (at 1440px viewport)
- Column gap: 24px
- Grid: 12-column, 80px columns

**Tablet (768–1024px):**
- Outer margin: 48px
- Switch to 2-column layouts

**Mobile (<768px):**
- Outer margin: 24px
- Single column always

### Visual Rhythm Rules

1. Section background alternates: parchment (#f5f0e8) → navy (#1b3a6b) → warm muted (#ede8dc) → parchment → navy → parchment. This creates natural pacing.
2. Every section has a label/overline in 11px caps. This creates a reading rhythm — you always know where you are.
3. Section transitions have no decorative dividers. Background change is the transition.
4. Horizontal rules appear only in the footer and below the founder signature.

### Color Tokens

| Token | Value | Use |
|---|---|---|
| color.surface.parchment | #f5f0e8 | Primary background |
| color.surface.muted | #ede8dc | Alternate sections |
| color.surface.navy | #1b3a6b | Dark sections, primary CTA |
| color.text.primary | #1b3a6b | All body on parchment |
| color.text.inverse | #f5f0e8 | All body on navy |
| color.text.muted | #1b3a6b at 50% | Labels, captions on light |
| color.border.default | #d4cfc5 | Card borders, dividers |
| color.accent.gold | #f5c842 | Leaderboard top 3 only |

**Do NOT add:** gradients, blues other than #1b3a6b, any grays, any greens, any teals. The palette is already complete.

### Component Philosophy

**Cards (Saviour Wall):**
- Background: #ede8dc on parchment page
- No shadows
- 8px radius
- 24–28px padding
- Border: none (background contrast is sufficient)
- Saviour number pill: navy background, parchment text, 6px radius, 11px

**CTA Buttons:**
- Primary: navy bg (#1b3a6b), parchment text (#f5f0e8), 6px radius, 52–56px height, padding: 0 32px
- Secondary (outline): transparent bg, navy border 1.5px, navy text, same sizing
- Hover: primary → navy + 10% lighter, secondary → navy/10% bg
- One border radius globally: 6px. Not 50px pill. Not 0px. 6px.

**Temperature Widget:**
- Capsule: background #1b3a6b at 8% on parchment, navy text, 24px height, 8px border-radius
- Persistent, subtle, never flashy

---

## 8. COMMUNITY EXPERIENCE

### Saviour Wall Redesign

**Core problem:** Current cards feel like database records. Goal: feel like a living memorial wall.

**Changes:**

1. **"Not specified" → never shown.** Replace with "Bowl" as default. Every Saviour shows a vessel type. This is a display/fallback rule, not a data change.

2. **Card identity, not card info.** Reorder card content:
   ```
   [Name]                              [#18]
   [Area name]
   ─────────────────────────────────
   [Vessel type icon] [Vessel label]   [Time ago]
   ```
   The number pill is an identity badge, right-aligned, always visible. It says: you were here.

3. **Add a subtle entrance animation:** cards animate in on scroll (translateY: 20px → 0, opacity: 0 → 1, staggered 50ms per card). This makes the wall feel alive.

4. **Counter above the grid, not heading:** "1,847 Saviours have joined" in large display weight as the section opener. This sets expectation before you see individual names.

5. **Vessel type icons:** Small SVG icons for Bowl, Plate, Bird Bath, Other. 16x16, navy. These replace the flat flag icon currently used.

6. **Mobile:** Single column cards. 8 shown initially. "See all Saviours →" at bottom.

### Area Leaderboard Redesign

**Core problem:** Current leaderboard uses inconsistent bar colors (gold/silver/bronze/navy/navy) and emoji next to headline. Reads casual.

**Changes:**

1. **Remove emoji from heading.** The headline carries weight — a trophy emoji undercuts it.

2. **Reframe as civic identity:** "Delhi's Saving Race" replaces "Delhi Colony Leaderboard." The word "race" is active, communal, ongoing.

3. **Unified bar color system:**
   - Rank 1: warm gold bar (#f5c842)
   - Rank 2–3: parchment bar at 70% (#f5f0e8 on navy)
   - Rank 4+: parchment bar at 35%
   - No progress bar rainbow. One accent color only.

4. **Bar thickness reduced:** 3px height (from current ~8px). Thinner bars read as precision, not volume. The number is the story.

5. **Rank numbers:** 1–3 in larger weight (18px, 70% opacity). Rank 4+ in smaller (14px, 40%). Top 3 earn visual prominence.

6. **Add a line below the table:** "Don't see your colony? You could be the first." — This is a participation trigger. It speaks to the user who hasn't joined yet.

### Participation Experience (Registration Flow)

The registration form is not shown in the provided screenshots but must be considered:

1. **Form entry:** Single-page modal or dedicated page. Fields: Name, Delhi Colony/Area (dropdown or text), Vessel Type (icon selection — Bowl, Plate, Bird Bath, Other). Optional: photo upload.

2. **Confirmation moment:** The most important screen. Must say:
   > **You are now Saviour #1,848.**
   > Your bowl is now part of Delhi's Water For Wings movement.
   > [Share on Instagram] [Share on X]

3. **Share text pre-filled:** "I just became Saviour #1,848 of Delhi's Water For Wings movement. A simple bowl of water saves a bird's life. #DelhiBirdsNeedWater praan.me"

4. **Post-registration:** User should see their name appear on the Saviour Wall. If real-time, show the counter increment.

---

## 9. FOUNDER EXPERIENCE

### The Problem with the Current Founder Section

The founder section is a separate page. It is the most humanizing, trust-building content on the platform — and it requires deliberate navigation to find. Most visitors never reach it.

### Redesigned Approach

**Two touchpoints for the founder, not one:**

**Touchpoint 1 — Hero (implicit):** The founder sketch appears in the hero. No name, no label. Just presence. The face without explanation. This creates a "who is that?" question that is answered when the page is scrolled.

**Touchpoint 2 — Section 04 (explicit):** The founder section on the main page uses a condensed version of the message — key quote, 2–3 short paragraphs, signature. Full message remains available via link.

### Emotional Treatment of the Sketch

The sketch is genuinely remarkable — pencil-rendered, lifelike, human. Its current placement (right column of founder page, medium size) undersells it.

**New treatment:**
- Scale: large. On desktop, minimum 480px tall. Let it breathe.
- Crop: portrait framing, face and upper torso. Not the full body.
- Filter: `sepia(8%) contrast(108%)` — warms the sketch, removes any cold digital whiteness, harmonizes with the parchment palette.
- No border, no card, no shadow. The sketch lives directly on the section background.
- On mobile: full-width, cropped to face + shoulders only. Maximizes emotional impact in limited space.

**Why this matters:** A pencil sketch of the founder communicates: this was made with intention. It was not generated. Someone sat for this or commissioned this. That single element — treated with scale and care — does more for trust than any copy.

### Founder Quote Surfacing

Current: buried mid-page on the founder page.

New: the quote "If even 10 people start keeping water outside daily — for me, this movement is already successful" appears in the main page founder section at 28px italic. This is the most honest line on the platform. It should be the loudest.

---

## 10. FINAL CTA EXPERIENCE

### Philosophy

The page's final ask must acknowledge that the visitor has now seen everything — the stakes, the community, the founder, the proof. They are no longer a stranger. The final CTA should feel like a quiet, direct invitation, not a marketing push.

Do NOT use: "Join the movement!", "Be the change!", "Make a difference today."

DO use: Patient, specific, present-tense language.

### Copy Direction

```
WATER FOR WINGS · DELHI 2025

One bowl.
One Saviour.
One less bird lost.

The temperature outside right now is 40°C. Every hour
without water is dangerous for Delhi's birds. It takes
less time to place a bowl than it took to read this page.

[Place Your Water Bowl →]

    View the Saviour Wall ↓
```

### Layout

- Left-aligned, not centered (same principle as hero — momentum, not neutrality)
- The headline stacks as three short lines — visual rhythm, each line landing as its own beat
- Temperature is live data, injected dynamically — this keeps the CTA perpetually current
- The CTA button matches hero: navy background, parchment text, 6px radius
- Sub-link below CTA gives the hesitant visitor a non-commitment option

### What Makes This CTA Premium

1. It doesn't beg. It states facts and trusts the visitor to respond.
2. Live temperature data makes it impossible to ignore.
3. The three-line headline has meter — "One bowl. One Saviour. One less bird lost." — it sounds designed.
4. It acknowledges the visit: "less time than it took to read this page" implies the visitor has been here, has engaged, is ready.

---

## 11. PREMIUM DESIGN PRINCIPLES

### What to Remove

| Remove | Reason |
|---|---|
| Centered hero layout | Templates are always centered. Premium is asymmetric. |
| Double logo (nav + hero) | Signals lack of hierarchy. Logo lives in nav only. |
| "INTRODUCING" label | Condescending. The initiative introduces itself. |
| Three-column step flow in hero | Hero is not the right place for instructions. |
| Trophy emoji in leaderboard | Undermines civic gravitas. |
| "Not specified" on public wall | Damages trust. Implement a display default. |
| Decorative ornament (—— ♥ ——) | Generic. Adds nothing PRAAN-specific. |
| Side-by-side CTA buttons in hero | Creates split decision at peak intent moment. |

### What to Simplify

| Simplify | Direction |
|---|---|
| Navigation items | Max 4 visible on desktop. Secondary items in mobile menu. |
| Saviour Wall cards | Remove clutter. Name + area + vessel + time. Nothing else. |
| Leaderboard bar colors | One accent color (gold for top 3). Everything else: parchment. |
| Footer | Three lines maximum. Logo, links, copyright. |
| Body copy | Every paragraph maximum 3 sentences. No padding copy. |

### What to Emphasize

| Emphasize | Method |
|---|---|
| Founder sketch | Scale up. Position prominently in two places. |
| Saviour count | Display size, above CTA, animated on load. |
| Live temperature | Persistent widget. Always visible. |
| Section labels (overlines) | 11px caps create wayfinding rhythm throughout. |
| The quote | Surface founder's best line to main page. |
| Colony rankings | Reframe as identity, not game. |

### What Creates Premium Perception

1. **Intentional asymmetry.** Left-anchored hero. Right-aligned sketch bleeding out. Non-centered section content. Premium design is never perfectly balanced.
2. **Restraint in animation.** One motion (counter count-up on load). One subtle pulse (temperature widget). Nothing else moves unless scrolled into view.
3. **Typography doing the heavy lifting.** No icons except vessel types. No illustrations beyond the founder sketch. Type + color + space = the entire visual language.
4. **Consistent spacing units.** 8px base, multiples only. No 13px gaps, no 17px margins. Discipline in spacing is invisible but felt.
5. **One accent color.** The gold (#f5c842) appears ONLY in the leaderboard top 3. It is never used elsewhere. Rarity makes it meaningful.
6. **Parchment as a choice.** Most platforms default to white. The parchment (#f5f0e8) signals warmth, care, handcraft. Paired with deep navy, it reads literary — like a letter, not like software.

### What Creates AI-Generated Perception

1. **Everything centered.** The number one marker of a template layout.
2. **Gradient backgrounds.** The current sky-to-green gradient in the hero reads "AI chose this."
3. **Card overload.** Showing every piece of data in equal-weight cards with identical borders.
4. **Emoji in formal contexts.** Trophy emoji, heart ornaments. These are filler for when copy isn't doing its job.
5. **Feature-list thinking.** "Place Water → Register Contribution → Join The Saviour Wall" reads like a SaaS onboarding flow, not an emotional invitation.
6. **Uniform type weights.** Every heading at the same weight, every body at the same size. Real design uses radical contrast in scale.
7. **Buttons that look identical.** Primary and secondary CTAs at the same visual weight, side by side, both rounded pills.

---

## 12. DEVELOPER BLUEPRINT

### Technical Preservation Requirements

All existing functionality must remain intact. This redesign is presentation-only:

| Feature | Status | Redesign note |
|---|---|---|
| Delhi temperature widget | Keep all logic | Restyle: capsule component, position top-left under nav |
| Live saviour counter | Keep all logic | Restyle: 52px display font, add countUp animation on load |
| Saviour registration | Keep all logic | Restyle: form fields and confirmation screen only |
| Saviour Wall | Keep all data fetching | Restyle: card layout, remove "Not specified" display |
| Area Leaderboard | Keep all logic | Restyle: bar color system, heading copy |
| Founder message | Keep all content | Surface quote to main page, keep full page linked |
| Social sharing | Keep all logic | Confirmation screen enhancement only |

### CSS Architecture

```css
/* TOKENS */
:root {
  /* Surfaces */
  --surface-parchment: #f5f0e8;
  --surface-muted: #ede8dc;
  --surface-navy: #1b3a6b;
  --border-default: #d4cfc5;

  /* Text */
  --text-primary: #1b3a6b;
  --text-inverse: #f5f0e8;
  --text-muted: rgba(27, 58, 107, 0.5);
  --text-caption: rgba(27, 58, 107, 0.4);

  /* Accent */
  --accent-gold: #f5c842;

  /* Typography */
  --font-primary: 'Poppins', system-ui, sans-serif;
  --text-display: 700 64px/1.1 var(--font-primary);
  --text-h1-mobile: 700 40px/1.15 var(--font-primary);
  --text-h2: 600 40px/1.2 var(--font-primary);
  --text-quote: 400 28px/1.5 var(--font-primary);
  --text-body-lg: 400 18px/1.7 var(--font-primary);
  --text-body: 400 16px/1.75 var(--font-primary);
  --text-body-sm: 400 15px/1.7 var(--font-primary);
  --text-caption: 400 13px/1.6 var(--font-primary);
  --text-label: 500 11px/1 var(--font-primary);
  --text-counter: 700 52px/1 var(--font-primary);
  --label-tracking: 0.12em;

  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 80px;
  --space-4xl: 120px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-pill: 100px;

  /* Motion */
  --duration-instant: 150ms;
  --duration-fast: 300ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Layout Classes

```css
.section {
  padding: var(--space-4xl) 120px;
}

.section--navy {
  background: var(--surface-navy);
  color: var(--text-inverse);
}

.section--parchment {
  background: var(--surface-parchment);
  color: var(--text-primary);
}

.section--muted {
  background: var(--surface-muted);
  color: var(--text-primary);
}

.section__label {
  font: var(--text-label);
  letter-spacing: var(--label-tracking);
  text-transform: uppercase;
  opacity: 0.5;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .section {
    padding: 64px 24px;
  }
}
```

### Component Specifications

**Saviour Card:**
```
.saviour-card {
  background: var(--surface-muted);
  border-radius: var(--radius-lg);
  padding: var(--space-md) 28px;
  display: grid;
  grid-template-rows: auto auto 1px auto;
  gap: var(--space-xs);
}
.saviour-card__name { font-size: 16px; font-weight: 600; }
.saviour-card__area { font-size: 14px; opacity: 0.6; }
.saviour-card__divider { background: var(--border-default); }
.saviour-card__meta { font-size: 13px; opacity: 0.4; display: flex; justify-content: space-between; }
.saviour-card__number {
  background: var(--surface-navy);
  color: var(--text-inverse);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}
```

**Leaderboard Row:**
```
.leaderboard-row { display: grid; grid-template-columns: 32px 1fr auto; align-items: center; gap: 16px; padding: 16px 0; }
.leaderboard-row__bar { height: 3px; background: rgba(245, 240, 232, 0.15); grid-column: 1 / -1; }
.leaderboard-row__bar-fill { height: 100%; background: rgba(245, 240, 232, 0.35); transition: width 0.6s var(--ease-default); }
.leaderboard-row--top-3 .leaderboard-row__bar-fill { background: var(--accent-gold); }
```

**Temperature Widget:**
```
.temp-widget {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(27, 58, 107, 0.08);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  color: var(--text-primary);
}
.temp-widget__indicator {
  width: 6px; height: 6px;
  background: #e84040;
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

**Primary CTA Button:**
```
.btn-primary {
  background: var(--surface-navy);
  color: var(--text-inverse);
  font: 500 16px/1 var(--font-primary);
  padding: 0 32px;
  height: 52px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: opacity var(--duration-instant) var(--ease-default);
}
.btn-primary:hover { opacity: 0.85; }
.btn-primary:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
```

### Hero Layout (CSS Grid)

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  padding: 80px 120px;
  gap: 80px;
  align-items: center;
  background: var(--surface-parchment);
}
.hero__content { display: flex; flex-direction: column; gap: 0; }
.hero__sketch {
  position: relative;
  height: 100%;
  min-height: 500px;
}
.hero__sketch img {
  position: absolute;
  right: -20px;
  bottom: 0;
  height: 110%;
  width: auto;
  object-fit: contain;
  object-position: bottom right;
  filter: sepia(8%) contrast(108%);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 24px 48px;
    min-height: 100svh;
  }
  .hero__sketch {
    order: -1;
    height: 220px;
    min-height: 220px;
  }
  .hero__sketch img {
    position: static;
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: top center;
    border-radius: var(--radius-lg);
    right: 0;
  }
}
```

### Counter Animation

```javascript
// CountUp on page load for the saviour counter
function animateCounter(element, target, duration = 1200) {
  const start = performance.now();
  const startValue = Math.max(0, target - Math.floor(target * 0.1));
  
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(startValue + (target - startValue) * eased);
    element.textContent = current.toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Trigger on IntersectionObserver
const counter = document.querySelector('.saviour-counter__number');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounter(counter, CURRENT_COUNT);
    observer.disconnect();
  }
}, { threshold: 0.5 });
observer.observe(counter);
```

### Section Scroll Animations

```javascript
// Staggered card entrance
const cards = document.querySelectorAll('.saviour-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 50);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  cardObserver.observe(card);
});
```

### "Not Specified" Display Fix

```javascript
// In the Saviour Wall rendering logic, wherever vessel type is displayed:
function getVesselDisplay(vesselType) {
  if (!vesselType || vesselType === 'Not specified' || vesselType === '') {
    return 'Bowl'; // Display default — never show "Not specified"
  }
  return vesselType;
}
```

### Navigation

```html
<!-- Desktop nav structure -->
<nav class="nav">
  <a href="/" class="nav__logo">
    <!-- PRAAN wordmark SVG here — unchanged -->
  </a>
  <div class="nav__links">
    <a href="#about">About</a>
    <a href="#why-it-matters">Why It Matters</a>
    <a href="#saviours">Saviours</a>
    <a href="#leaderboard">Area Leaderboard</a>
    <a href="/founder">Founder's Message</a>
  </div>
  <div class="nav__social">
    <!-- Instagram + X icons -->
  </div>
</nav>
```

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
  padding: 0 120px;
  background: var(--surface-parchment);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__logo { height: 28px; }
.nav__links { display: flex; gap: 32px; font-size: 13px; font-weight: 500; }
.nav__links a { color: var(--text-primary); opacity: 0.65; text-decoration: none; }
.nav__links a:hover { opacity: 1; }

@media (max-width: 768px) {
  .nav { padding: 0 24px; }
  .nav__links { display: none; } /* Hamburger menu instead */
  .nav__logo { position: absolute; left: 50%; transform: translateX(-50%); }
}
```

---

## SUCCESS CRITERIA VERIFICATION

| Requirement | Blueprint status |
|---|---|
| PRAAN logo unchanged | ✅ Repositioned nav-only, wordmark preserved |
| Founder sketch unchanged | ✅ Scaled and repositioned, never redrawn |
| Water For Wings initiative | ✅ Primary campaign throughout |
| Delhi temperature widget | ✅ Preserved, restyled as ambient capsule |
| Live saviour counter | ✅ Preserved, animated, moved above CTA |
| Saviour registration | ✅ Preserved, confirmation screen enhanced |
| Saviour Wall | ✅ Preserved, redesigned with "Not specified" fix |
| Area Leaderboard | ✅ Preserved, redesigned civic framing |
| Founder message | ✅ Surfaced to main page + full page retained |
| All existing functionality | ✅ No feature removed |
| Premium feel | ✅ Asymmetric layout, restrained palette, type-driven |
| Not AI-generated | ✅ No centered templates, no gradients, no emoji in headings |
| Community-powered feel | ✅ Wall + leaderboard redesigned as identity, not data |
| Emotionally engaging | ✅ Storytelling arc: Stakes → Agency → Trust → Community → Act |

---

*Blueprint complete. All 12 sections delivered. Functionality preserved. Identity preserved. Experience redesigned.*
