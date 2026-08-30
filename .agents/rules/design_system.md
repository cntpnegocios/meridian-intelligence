# Grove AI — Style Reference
> clinical journal in morning light — a single green word anchors a page of measured prose

**Theme:** light

Grove AI uses a clinical-credibility language: bright white canvas, restrained forest-green accents, and a deliberate typographic contrast between an editorial serif (Libre Caslon Text) for hero-level storytelling and a precise grotesque (Geist) for body and interface. The brand voice lives in a single green word — "Grace" — set in the serif and dropped into an otherwise monochrome headline, so the AI agent reads as the personality of the product rather than a feature. Surfaces are flat with a single light-gray card layer; elevation comes from soft inset shadows and hairline borders, never from heavy drop shadows. Component weight is lightweight: pill buttons, ghost controls, thin outlined tags, and tight small-caps section labels. Overall the system feels like a well-funded medical journal that also happens to be a product page — clinical authority expressed through restraint, not decoration.

## Tokens — Colors

| Name | Value | Token |
|------|-------|-------|
| Forest Grove | #0b835c | --color-forest-grove |
| Pine Shadow | #1c2b27 | --color-pine-shadow |
| Ink Black | #1c1c1e | --color-ink-black |
| Graphite | #303033 | --color-graphite |
| Slate Mid | #676768 | --color-slate-mid |
| Mist Gray | #eff1f6 | --color-mist-gray |
| Pure White | #ffffff | --color-pure-white |
| Shadow Smoke | #bfbfbf | --color-shadow-smoke |

## Tokens — Typography

- **Display Serif (Libre Caslon Text):** Hero-level headlines ONLY.
- **Primary Interface (Geist, Inter):** Body, subheadings, cards.
- **Small-Caps Section Label:** 12px, letter-spacing 0.1em, uppercase.

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 12px | 1.5 | 1.2px | --text-caption |
| body-sm | 14px | 1.5 | -0.28px | --text-body-sm |
| body | 16px | 1.5 | -0.32px | --text-body |
| subheading | 20px | 1.25 | -0.4px | --text-subheading |
| heading-sm | 24px | 1.25 | -0.6px | --text-heading-sm |
| heading | 32px | 1.2 | -0.9px | --text-heading |
| heading-lg | 40px | 1.2 | -1.44px | --text-heading-lg |
| display | 92px | 1.2 | -1.01px | --text-display |

## Spacing & Shapes

- **Page max-width:** 1200px
- **Section gap:** 80px
- **Card padding:** 24px
- **Tags, Buttons, Pills:** 9999px (fully rounded)
- **Cards, Testimonials:** 20px

## Do's and Don'ts

- **DO:** Set hero headline in Libre Caslon Text.
- **DO:** Use 9999px radius on buttons.
- **DO:** Reserve Forest Green (#0b835c) for the brand word in serif, small-caps, and icons.
- **DON'T:** Use Sans-serif for hero headlines.
- **DON'T:** Use heavy drop shadows (use hairline halos).
- **DON'T:** Use #0b835c for filled buttons.
- **DON'T:** Introduce new accent colors (no blue, red, purple).
