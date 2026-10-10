---
name: Cyber Synth Arcade
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#b9caca'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#849495'
  outline-variant: '#3a494a'
  surface-tint: '#00dce5'
  primary: '#e9feff'
  on-primary: '#003739'
  primary-container: '#00f5ff'
  on-primary-container: '#006c71'
  inverse-primary: '#00696e'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#fff9f6'
  on-tertiary: '#472a00'
  tertiary-container: '#ffd7aa'
  on-tertiary-container: '#895600'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#63f7ff'
  primary-fixed-dim: '#00dce5'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  tile-num-2digit:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  tile-num-3digit:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  tile-num-4digit:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.03em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-board: 0.5rem
  margin: 1.25rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system channels an elevated, high-tech neon arcade aesthetic crafted specifically for tactical numerical puzzle gaming. It balances the nostalgia of retro 80s/90s coin-op cabinets with contemporary, ultra-polished cyberpunk glassmorphism and tactile precision. 

The visual experience evokes focus, flow-state euphoria, and tactile reward. Every merge, swipe, and milestone triggers radiant visual feedback. Deep obsidian layers anchor the interface, allowing vivid luminescent pigments to pop without inducing visual fatigue. The atmosphere is sharp, modern, futuristic, and premium—moving far beyond casual mobile clutter into an esports-grade brain teaser platform.

## Colors

The palette relies on absolute darkness juxtaposed with energetic, photonic highlights. 

- **Canvas & Surface Tier:**
  - Base Obsidian Background: `#0B0F19`
  - Board / Deep Container: `#101726`
  - Elevated Glass / Card Surface: `#131A2A` (with alpha variants `rgba(19, 26, 42, 0.7)`)
  - Border Highlights: `rgba(255, 255, 255, 0.08)` to `rgba(0, 245, 255, 0.2)`

- **Accent Hues:**
  - Electric Cyan (`#00F5FF`): Primary interactive elements, high scores, swipe indicators.
  - Vivid Violet (`#8B5CF6`): Secondary actions, combo meters, tier promotions.
  - Warm Amber Gold (`#F59E0B`): Critical multipliers, streaks, and warning counters.
  - Radiant Neon Emerald (`#10B981`): Success confirmations, optimal moves, energy states.

- **Tile Progression Palette (Gradient Pairs):**
  - Tile 2: `#1E293B` to `#334155` (Subtle Slate Glow, Text `#94A3B8`)
  - Tile 4: `#0E3A4B` to `#08586E` (Dim Cyan, Text `#E0F2FE`)
  - Tile 8: `#0369A1` to `#0284C7` (Electric Marine, Text `#FFFFFF`)
  - Tile 16: `#0D9488` to `#14B8A6` (Mint Matrix, Text `#FFFFFF`)
  - Tile 32: `#059669` to `#10B981` (Radiant Emerald, Text `#FFFFFF`)
  - Tile 64: `#D97706` to `#F59E0B` (Solar Amber, Text `#0B0F19`)
  - Tile 128: `#EA580C` to `#F97316` (Plasma Blaze, Text `#FFFFFF`)
  - Tile 256: `#E11D48` to `#F43F5E` (Hyper Crimson, Text `#FFFFFF`)
  - Tile 512: `#9333EA` to `#A855F7` (Arcane Violet, Text `#FFFFFF`)
  - Tile 1024: `#6366F1` to `#8B5CF6` (Quantum Indigo, Text `#FFFFFF`)
  - Tile 2048: `#00F5FF` via `#8B5CF6` to `#EC4899` (Supernova Tri-Gradient, Glow `#00F5FF`, Text `#FFFFFF`)
  - Beyond 2048: `#FACC15` to `#FFFFFF` (Starlight Auric with Rainbow Aura)

## Typography

The typographic hierarchy couples the geometric, technical angularity of **Space Grotesk** with the strict, tabular predictability of **JetBrains Mono**.

- **Display & Tile Numbers:** Space Grotesk provides punchy, condensed structural authority. Tile values dynamically scale down in size (from 36px to 22px) as tile values jump from double to four digits, guaranteeing values remain strictly centered within grid boundaries without line wrapping.
- **Micro-Copy & Score Tickers:** JetBrains Mono powers score displays, move counters, timer readouts, and status chips with monospace tabular numbers (`font-variant-numeric: tabular-nums`), preventing UI jitter during rapid score animations.
- **Letter Spacing:** Headlines utilize negative tracking for a compact arcade posture, while metadata labels use deliberate wide tracking (`0.06em` to `0.12em`) rendered in full uppercase.

## Layout & Spacing

The layout is architected around a centered, aspect-ratio-constrained viewport designed to mimic dedicated handheld hardware and premium arcade consoles.

- **4x4 Tile Matrix:** The puzzle board relies on a strict internal CSS Grid with four equal tracks (`repeat(4, 1fr)`). Spacing inside the board uses `gutter-board` (8px / 0.5rem) on small viewports and scales to 12px on displays above 768px.
- **Viewport Constraints:** On mobile, the game canvas adheres to a vertical flow with a max width of 480px, centered horizontally. On desktop screens (>=1024px), the layout unlocks a split dual-panel cockpit: board centered or left-aligned with telemetry, global leaderboards, and power-up controls occupying the lateral space.
- **Spacing Scale:** Built on an uncompromising 4px/8px modular rhythm. Padding inside controls never encroaches on gesture swipe territory.

## Elevation & Depth

Visual hierarchy does not use murky grey drop-shadows; instead, depth is created through **specular glows, light emissions, and frosted glass layering**.

1. **Base Surface (Level 0):** Pure dark field (`#0B0F19`) patterned with an ultrafine 24px subtle geometric grid at 3% opacity.
2. **Game Board Well (Level 1 - Inset):** Recessed into the base with an inner shadow (`inset 0 4px 12px rgba(0, 0, 0, 0.7)`), rimmed with a 1px border of `rgba(255, 255, 255, 0.04)`.
3. **Glassmorphic Hud Cards (Level 2):** Translucent backdrop (`rgba(19, 26, 42, 0.65)`), blurred with `backdrop-filter: blur(16px)`, bordered with `1px solid rgba(255, 255, 255, 0.08)`. Subtle ambient shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`.
4. **Active Game Tiles (Level 3 - Tactile Radiant):** Tiles feature subtle top-down linear highlights (1px inner inset glow `rgba(255, 255, 255, 0.25)`) indicating physical curvature. Higher-value tiles (128+) project dynamic colored outer box-shadows matching their dominant hue (`0 0 16px -2px [accent_color]`, ramping up to `0 0 28px 4px rgba(0, 245, 255, 0.6)` on the 2048 tile).
5. **Overlays & Modals (Level 4):** Darkened veil (`rgba(11, 15, 25, 0.85)` with `blur(20px)`), spotlighting popups crowned with neon cyan and violet perimeter flares.

## Shapes

The design system uses **Level 2 (Rounded)** curvature with deliberate proportional scaling between parent containers and child elements:

- **Outer Matrix & Large Containers:** Standardized at `rounded-xl` (1.5rem / 24px) for a sleek, ergonomic enclosure.
- **Interactive Tiles & Cards:** Standardized at `rounded-lg` (0.75rem to 1rem / 12px–16px), harmonizing with the outer board's curvature without creating awkward geometric pinching at the corners.
- **Score Pods & Buttons:** 0.5rem to 0.75rem roundedness; micro-pills reserved exclusively for live status chips, badges, and multipliers.
- **Edges:** Crisp vector lines with sub-pixel precision. All active shapes feature a 1px rim stroke to simulate laser-etched beveling.

## Components

### Buttons
- **Primary Action (Play, Merge, Restart):** Rich electric gradient background (Cyan `#00F5FF` to Violet `#8B5CF6`). Crisp white bold typography. Hover triggers a diffused colored perimeter aura (`box-shadow: 0 0 20px rgba(0, 245, 255, 0.4)`). Active state applies a swift `-1px` inward mechanical depression.
- **Secondary / Utility (Undo, Settings):** Dark obsidian glass (`rgba(255, 255, 255, 0.05)`), border `1px solid rgba(255, 255, 255, 0.12)`. On hover, border turns Electric Cyan with a subtle 4px glow.

### Score & Stat Chips
- Compact HUD capsules housing a two-tier data stack: uppercase micro-label (`JetBrains Mono`, `10px`, tracked out, muted cyan/slate) stacked above bold numeric totals (`Space Grotesk`, `20px`, crisp white). 
- Pulsing glow triggers upon score increases with floating canvas particle counters.

### Puzzle Tiles
- Square aspect-ratio tiles (`aspect-ratio: 1 / 1`) with smooth hardware-accelerated transform transitions (`100ms cubic-bezier(0.2, 0.8, 0.2, 1)`).
- Merge animations feature a 1.12x scale bounce with an expanding neon chromatic aberration ring.
- Tile typography is vertically and horizontally centered with heavy weight and anti-aliased rendering.

### Modals & Dialogs (Game Over / Victory)
- Full-screen blurred backdrop with floating central glass console card. 
- Headers crowned with neon drop-shadowed titles. 
- Structured list of match statistics (Highest Tile, Moves Made, Time Elapsed) lined with dashed tabular separators (`rgba(255, 255, 255, 0.1)`).

### Toggles & Controls
- Low-profile segmented track with inset dark bevel. Sliding pill thumb illuminated with an Electric Cyan glow and inner core dot indicator.