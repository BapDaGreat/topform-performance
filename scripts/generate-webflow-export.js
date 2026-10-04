import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

async function generateWebflowExport() {
  console.log('Generating Webflow export files...');

  const outputDir = path.resolve(process.cwd(), 'webflow-ready');
  const sectionsDir = path.resolve(outputDir, 'sections');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(sectionsDir)) fs.mkdirSync(sectionsDir, { recursive: true });

  // 1. Read compiled CSS
  const distAssetsDir = path.resolve(process.cwd(), 'dist/assets');
  const cssFiles = fs.readdirSync(distAssetsDir).filter(f => f.endsWith('.css'));
  if (cssFiles.length === 0) {
    throw new Error('No compiled CSS file found in dist/assets. Run npm run build first.');
  }
  const cssPath = path.resolve(distAssetsDir, cssFiles[0]);
  const compiledCss = fs.readFileSync(cssPath, 'utf8');

  // 2. Start Vite SSR and render TopformSite
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  let rawHtml = '';
  try {
    const { renderToStaticMarkup } = await import('react-dom/server');
    const React = (await import('react')).default;
    const { TopformSite } = await vite.ssrLoadModule('/src/components/TopformSite.tsx');
    rawHtml = renderToStaticMarkup(React.createElement(TopformSite));
  } finally {
    await vite.close();
  }

  // 3. Ensure all asset URLs resolve to the live CDN
  const liveBase = 'https://bapdagreat.github.io/topform-performance/assets/';
  const processedHtml = rawHtml
    .replace(/(src|href)=["'](?:\/topform-performance)?\/assets\/([^"']+)["']/g, `$1="${liveBase}$2"`)
    .replace(/(src|href)=["']assets\/([^"']+)["']/g, `$1="${liveBase}$2"`);

  // 4. Create Full Single-File HTML for Webflow
  const fullHtml = `<!doctype html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TOPFORM — Play At Your Best. Make Your Best Better.</title>
  <link rel="icon" type="image/png" href="${liveBase}topform-roundel-white.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap" rel="stylesheet" />
  <style>
/* ==========================================================================
   TOPFORM COMPILED TAILWIND & CUSTOM STYLES FOR WEBFLOW
   ========================================================================== */
${compiledCss}
  </style>
</head>
<body class="bg-[#000000] text-[#FFFFFF] antialiased selection:bg-[#008BCE] selection:text-[#FFFFFF]">
${processedHtml}
</body>
</html>`;

  fs.writeFileSync(path.resolve(outputDir, 'topform-webflow-full.html'), fullHtml, 'utf8');
  console.log('✓ Generated topform-webflow-full.html (' + fullHtml.length + ' bytes)');

  // 5. Generate Section Snippets for Webflow Embeds (which have a 10KB limit)
  fs.writeFileSync(
    path.resolve(sectionsDir, '00-webflow-head-styles.html'),
    `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap" rel="stylesheet" />
<style>
${compiledCss}
</style>`,
    'utf8'
  );

  // Extract individual sections using regex
  const headerMatch = processedHtml.match(/<header[\s\S]*?<\/header>/);
  if (headerMatch) {
    fs.writeFileSync(path.resolve(sectionsDir, '01-header-nav.html'), headerMatch[0], 'utf8');
  }

  const sections = processedHtml.match(/<section[\s\S]*?<\/section>/g) || [];
  sections.forEach((sec, i) => {
    const num = String(i + 2).padStart(2, '0');
    let name = `section-${num}`;
    if (sec.includes('topform-players-bw')) name = `${num}-hero`;
    else if (sec.includes('core-idea')) name = `${num}-core-idea`;
    else if (sec.includes('What starts to happen')) name = `${num}-what-starts-to-happen`;
    else if (sec.includes('Red Brain')) name = `${num}-mechanism-brain-states`;
    else if (sec.includes('Fabio Carvalho')) name = `${num}-fabio-carvalho-testimonial`;
    else if (sec.includes('DIFFERENT POSITIONS')) name = `${num}-positions`;
    else if (sec.includes('Bournemouth')) name = `${num}-emiliano-marcondes`;
    else if (sec.includes('vimeo')) name = `${num}-video-bim-pepple`;
    else if (sec.includes('In-season and off-season')) name = `${num}-in-season-off-season`;
    else if (sec.includes('Off-Pitch Training')) name = `${num}-off-pitch-training`;
    else if (sec.includes('CASE STUDIES')) name = `${num}-case-studies`;
    else if (sec.includes('Why I built TOPFORM')) name = `${num}-why-i-built-topform`;
    else if (sec.includes("You don't need to be")) name = `${num}-you-dont-need-to-be-struggling`;
    else if (sec.includes('Private. Bespoke.')) name = `${num}-private-bespoke-coaching`;
    else if (sec.includes('How good can you become')) name = `${num}-final-cta`;

    fs.writeFileSync(path.resolve(sectionsDir, `${name}.html`), sec, 'utf8');
  });

  const footerMatch = processedHtml.match(/<footer[\s\S]*?<\/footer>/);
  if (footerMatch) {
    fs.writeFileSync(path.resolve(sectionsDir, '99-footer.html'), footerMatch[0], 'utf8');
  }

  // 6. Write detailed Webflow instructions
  const instructions = `# TOPFORM — Webflow Ready Package Guide

This folder contains everything you need to open and run the TOPFORM website inside **Webflow**.

---

## 💡 Important: How Webflow Works
Webflow is a cloud-based SaaS platform; there is no native desktop file format (like a \`.webflow\` or \`.psd\` file) that can be double-clicked to launch in software. All Webflow projects are hosted and designed in your Webflow Cloud dashboard.

To bring this website into Webflow, you have **3 simple options**:

---

## Option 1: Instant Full Page Preview / HTML Embed (Fastest)
1. **Double-click** \`topform-webflow-full.html\` on your computer to view the complete website in your browser offline or online.
2. In your **Webflow Project**:
   - Go to **Page Settings** > **Custom Code** (Inside \`<head>\` tag).
   - Paste the contents of \`sections/00-webflow-head-styles.html\`.
   - On your Webflow page canvas, add an **Embed Element** (or multiple Embed elements if using sections) and paste the HTML.
   - All images, fonts, and WhatsApp links are linked to live cloud URLs, so they load immediately!

---

## Option 2: Section-by-Section Webflow Embeds (Recommended for Webflow limits)
Webflow's HTML Embed element has a 10,000 character limit per block. The \`sections/\` folder provides ready-to-paste snippets for each part of the page:

1. **\`00-webflow-head-styles.html\`** ➔ Paste in **Page Settings > Inside <head> Tag**
2. **\`01-header-nav.html\`** ➔ Header navigation & WhatsApp CTA
3. **\`02-hero.html\`** ➔ Hero headline, uncropped players photo & Reiss Nelson testimonial
4. **\`03-core-idea.html\`** ➔ Two sides of ability
5. **\`04-what-starts-to-happen.html\`** ➔ 4 Pressure cards
6. **\`05-mechanism-brain-states.html\`** ➔ Red Brain, Green Brain, Blue Performance State
7. **\`06-fabio-carvalho-testimonial.html\`** ➔ Fabio Carvalho quote & photo
8. **\`07-positions.html\`** ➔ Strikers, Midfielders, Defenders
9. **\`08-emiliano-marcondes.html\`** ➔ Bournemouth story & photo
10. **\`09-video-bim-pepple.html\`** ➔ Vimeo video player
11. **\`10-in-season-off-season.html\`** ➔ Training schedule cards
12. **\`11-off-pitch-training.html\`** ➔ Gym, Home, Travel
13. **\`12-case-studies.html\`** ➔ 4 Career transformation case studies
14. **\`13-why-i-built-topform.html\`** ➔ Mark Bowden founder story & monochrome portrait
15. **\`14-you-dont-need-to-be-struggling.html\`** ➔ Motivation copy
16. **\`15-private-bespoke-coaching.html\`** ➔ 1-to-1 coaching CTA
17. **\`16-final-cta.html\`** ➔ Final closing call to action
18. **\`99-footer.html\`** ➔ Footer with brand roundel & WhatsApp contact

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
- \`https://bapdagreat.github.io/topform-performance/assets/topform-players-bw.jpg\`
- \`https://bapdagreat.github.io/topform-performance/assets/topform-reiss-nelson.jpg\`
- \`https://bapdagreat.github.io/topform-performance/assets/topform-portrait-cover.jpg\`
- \`https://bapdagreat.github.io/topform-performance/assets/topform-kevin-celebration.jpg\`
- \`https://bapdagreat.github.io/topform-performance/assets/topform-emiliano-bournemouth-bw.jpg\`
- \`https://bapdagreat.github.io/topform-performance/assets/topform-mark-bowden.jpg\`
- \`https://bapdagreat.github.io/topform-performance/assets/topform-roundel-white.png\`
`;

  fs.writeFileSync(path.resolve(outputDir, 'README-WEBFLOW.md'), instructions, 'utf8');
  console.log('✓ Generated README-WEBFLOW.md');
  console.log('✓ Webflow export completed successfully!');
}

generateWebflowExport().catch(console.error);
