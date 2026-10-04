# TOPFORM — Webflow Ready Package Guide

This folder contains everything you need to open and run the TOPFORM website inside **Webflow**.

---

## 💡 Important: How Webflow Works
Webflow is a cloud-based SaaS platform; there is no native desktop file format (like a `.webflow` or `.psd` file) that can be double-clicked to launch in software. All Webflow projects are hosted and designed in your Webflow Cloud dashboard.

To bring this website into Webflow, you have **3 simple options**:

---

## Option 1: Instant Full Page Preview / HTML Embed (Fastest)
1. **Double-click** `topform-webflow-full.html` on your computer to view the complete website in your browser offline or online.
2. In your **Webflow Project**:
   - Go to **Page Settings** > **Custom Code** (Inside `<head>` tag).
   - Paste the contents of `sections/00-webflow-head-styles.html`.
   - On your Webflow page canvas, add an **Embed Element** (or multiple Embed elements if using sections) and paste the HTML.
   - All images, fonts, and WhatsApp links are linked to live cloud URLs, so they load immediately!

---

## Option 2: Section-by-Section Webflow Embeds (Recommended for Webflow limits)
Webflow's HTML Embed element has a 10,000 character limit per block. The `sections/` folder provides ready-to-paste snippets for each part of the page:

1. **`00-webflow-head-styles.html`** ➔ Paste in **Page Settings > Inside <head> Tag**
2. **`01-header-nav.html`** ➔ Header navigation & WhatsApp CTA
3. **`02-hero.html`** ➔ Hero headline, uncropped players photo & Reiss Nelson testimonial
4. **`03-core-idea.html`** ➔ Two sides of ability
5. **`04-what-starts-to-happen.html`** ➔ 4 Pressure cards
6. **`05-mechanism-brain-states.html`** ➔ Red Brain, Green Brain, Blue Performance State
7. **`06-fabio-carvalho-testimonial.html`** ➔ Fabio Carvalho quote & photo
8. **`07-positions.html`** ➔ Strikers, Midfielders, Defenders
9. **`08-emiliano-marcondes.html`** ➔ Bournemouth story & photo
10. **`09-video-bim-pepple.html`** ➔ Vimeo video player
11. **`10-in-season-off-season.html`** ➔ Training schedule cards
12. **`11-off-pitch-training.html`** ➔ Gym, Home, Travel
13. **`12-case-studies.html`** ➔ 4 Career transformation case studies
14. **`13-why-i-built-topform.html`** ➔ Mark Bowden founder story & monochrome portrait
15. **`14-you-dont-need-to-be-struggling.html`** ➔ Motivation copy
16. **`15-private-bespoke-coaching.html`** ➔ 1-to-1 coaching CTA
17. **`16-final-cta.html`** ➔ Final closing call to action
18. **`99-footer.html`** ➔ Footer with brand roundel & WhatsApp contact

---

## Option 3: Figma to Webflow Plugin (If using Figma)
If you have the original TOPFORM Figma file:
1. Open the file in Figma.
2. Run the official **"Figma to Webflow"** plugin (free from Webflow Labs).
3. Select the frames and click **"Copy to Webflow"**.
4. In your Webflow designer canvas, press **Ctrl + V** (or **Cmd + V**).
5. Webflow will automatically create native Webflow visual DIVs, Typography styles, and Grid containers!

---

## Asset Links
All image assets are hosted with permanent cloud URLs:
- `https://bapdagreat.github.io/topform-performance/assets/topform-players-bw.jpg`
- `https://bapdagreat.github.io/topform-performance/assets/topform-reiss-nelson.jpg`
- `https://bapdagreat.github.io/topform-performance/assets/topform-portrait-cover.jpg`
- `https://bapdagreat.github.io/topform-performance/assets/topform-kevin-celebration.jpg`
- `https://bapdagreat.github.io/topform-performance/assets/topform-emiliano-bournemouth-bw.jpg`
- `https://bapdagreat.github.io/topform-performance/assets/topform-mark-bowden.jpg`
- `https://bapdagreat.github.io/topform-performance/assets/topform-roundel-white.png`
