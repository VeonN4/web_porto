---
name: Monochrome Logic
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c6c6cf'
  on-secondary: '#2f3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e1eb'
  secondary-fixed-dim: '#c6c6cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 128px
---

## Brand & Style

This design system is built for the high-end developer portfolio, emphasizing precision, clarity, and a "code-as-art" aesthetic. The brand personality is intellectual, disciplined, and transparent. It targets a technical audience—engineers, CTOs, and technical founders—who value performance and structural integrity over decorative flourishes.

The visual style is **Extreme Minimalism** with a **Modern Brutalist** edge. It utilizes a rigorous monochrome palette to remove distractions, allowing the content (code samples, project architecture, and typography) to command full attention. The emotional response should be one of quiet confidence and technical mastery. Key characteristics include razor-sharp edges, a strict underlying grid, and the deliberate use of negative space to create a sense of digital "breathability."

## Colors

The palette is strictly achromatic. By default, the system operates in a deep **dark mode** to reduce eye strain and mirror the developer's native environment (the IDE). 

- **Primary (#FFFFFF):** Reserved for high-priority text, icons, and interactive states.
- **Secondary (#A1A1AA):** Used for supporting text, labels, and secondary actions.
- **Neutral (#09090B):** The foundational "true black" for backgrounds and deep surfaces.
- **Accent (#3F3F46):** Utilized for structural elements like borders, dividers, and inactive states.

Avoid the use of any saturated colors. If status indicators are required (e.g., success, error), use varying stroke weights or distinct typographic symbols (e.g., `[!]` or `[✓]`) instead of color shifts to maintain the monochrome integrity.

## Typography

The typography is the core identity of this design system. It uses **JetBrains Mono** across all levels to reinforce the developer-centric narrative. 

- **Headlines:** Use tight letter-spacing and heavy weights for impact. Large displays should feel architectural.
- **Body:** Maintains a generous line-height to ensure the monospaced characters don't feel cluttered.
- **Labels:** Always displayed in uppercase with slight tracking to differentiate them from body content.
- **Hierarchy:** Rely on weight and scale rather than color. Interactive elements should be underlined or prefixed with a `>` character to indicate actionability.

## Layout & Spacing

The layout is governed by a **Rigid Grid System**. 
- **Desktop:** A 12-column fixed grid centered within the viewport. All elements must align to the grid lines. Use "whitespace as a separator" rather than borders where possible.
- **Mobile:** A 4-column fluid grid. Margins are reduced to 16px to maximize real estate for code snippets.

**Spacing Rhythm:**
Use a base-8 increment system. Section gaps are intentionally large (128px+) to create a gallery-like feeling for project showcases. Content should be grouped in logical blocks with clear vertical hierarchy. Alignment should be primarily left-justified to mimic the flow of a terminal or text editor.

## Elevation & Depth

This design system rejects the concept of simulated physical depth (shadows). Instead, it uses **Tonal Layering** and **High-Contrast Outlines**.

- **Surface Tiers:** Backgrounds are `#09090B`. Primary containers or "cards" are defined by a 1px solid border of `#3F3F46`. 
- **Active Elevation:** To show focus or "lift," change the border color to `#FFFFFF` or invert the colors (white background, black text).
- **Overlays:** Modals and tooltips use a solid `#18181B` background with a crisp white border. No blurs or transparencies are permitted; the UI should feel solid and opaque.

## Shapes

The shape language is **Strictly Sharp (0px)**. 

Every element—buttons, inputs, cards, and image containers—must have square corners. This reinforces the technical, "un-designed" aesthetic and aligns with the terminal-inspired theme. Circular elements are permitted only for specific functional icons (like a status dot), but these should be used sparingly.

## Components

- **Buttons:** Rectangular with a 1px solid white border. Text is center-aligned and uppercase. On hover, the button inverts (white background, black text).
- **Input Fields:** A single bottom border of `#3F3F46`. When focused, the border turns white and a blinking `_` cursor follows the text.
- **Cards:** Simple containers with a 1px border. No padding on the container itself; internal content should be spaced using the 8px grid.
- **Chips/Tags:** Monospace text wrapped in brackets, e.g., `[ React ]` or `[ TypeScript ]`.
- **Lists:** Use `*` or `-` as bullet points to mimic Markdown.
- **Navigation:** Simple text links. The active page is indicated by a leading `->` or a solid underline.
- **Code Blocks:** Syntax highlighting is strictly monochrome, using varying font weights (bold for keywords) and opacities (50% for comments) instead of colors.
