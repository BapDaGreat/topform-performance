# DESIGN.md — Mark Bowden | TOPFORM (Official Brand Guidelines)

## 1. Official Colour Palette (`MB New Brand Guidelines.pdf`, Page 3)
- **MB Rich Black:** `#000000` (RGB `0, 0, 0` | CMYK `60, 40, 40, 100`)
- **Pure White:** `#ffffff` (Generous whitespace across brochure-style spreads)
- **MB New Blue:** `#008BCE` (Pantone `2394 CP` | RGB `0, 139, 206` | CMYK `82, 26, 0, 0`) — Primary accent for bullets, short heading keylines, callout blocks, and primary `Work with Mark` CTAs.
- **MB Original Blue:** `#69e0fa` (Pantone `305` | RGB `105, 224, 250` | CMYK `54, 0, 6, 0`) — Paler blue used for photo tint slashes, diagonal graphic bars, and dark-background highlights.
- **MB Rich Grey:** `#a3acac` (Pantone `421 CP` | RGB `163, 172, 172` | CMYK `32, 20, 23, 3`) — Secondary metadata and diagonal bar accompaniment.

## 2. Official Typography (`MB New Brand Guidelines.pdf`, Page 3)
- **Font Family:** `Montserrat` (`400` Regular, `600` Semi-Bold, `700` Bold), with fallback to `Arial, Helvetica, sans-serif`.
- **Main Headings:** `Montserrat Bold` (`700`) in **sentence case**.
- **Subheadings:** `Montserrat Semi-Bold` (`600`) in **sentence case**.
- **Body Copy:** `Montserrat Regular` (`400`), **ranged left (never justified)**.
- **Strict Capitalisation Rule:** *"Apart from the brand name in copy (`TOPFORM`), DO NOT USE ALL CAPS."*

## 3. Signature Graphic Devices & Brochure Rhythm (Pages 1–4 of PDF)
- **Alternating Light / Dark Spreads:** Alternates Rich Black (`#000000`) spreads with generous Pure White (`#ffffff`) and MB New Blue (`#008BCE`) brochure spreads so white copy out of black and black copy on white each have maximum impact.
- **Short Heading Keylines:** Crisp `2px` horizontal rule (`2.75rem` wide) in `#008BCE` or `#69e0fa` directly beneath sentence-case headings.
- **Diagonal Parallel Bars (`-45deg`):** Geometric parallel bars in black/white, `#a3acac`, and `#69e0fa`/`#008BCE`.
- **Blue-Tinted Monochrome Photography:** Black-and-white player portraits accented by angled `#008BCE` / `#69e0fa` geometric slashes.

## 4. Interaction & Motion Engineering (`emil-design-eng`, `animate`, `mobile-native`)
- **Custom Easing Tokens:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- **Tactile Press Feedback:** Every interactive control scales to `scale(0.97)` on `:active` with `touch-action: manipulation` and hover transitions gated behind `@media (hover: hover) and (pointer: fine)`.
- **Entry & Reduced Motion:** Video modal uses `@starting-style` (`scale(0.95) -> scale(1)`), and `@media (prefers-reduced-motion: reduce)` replaces spatial transforms with gentle opacity/color transitions.
