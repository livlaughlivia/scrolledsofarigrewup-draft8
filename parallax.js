gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const delayed = selectAll(".insta-update");
const stage = select('.stage');
let smoother;


// ── MARK: CLIP PATH SHAPES ────────────────────────────────────
const SHAPES = {

    // ── Era 1 — Variante A (bestehend: shape-17 / shape-18) ──
    'shape-17': `<path d="M208.73,547.36c-12.21.44-19.66-6.27-22.66-14.84-3.11-8.89.92-19.08,6.29-24.43,7.28-7.24,10.36-13.35,10.36-21.16,0-13.56-14.74-29.59-29.59-29.59s-24.79,9.98-28.49,21.72c-3,9.52-7.63,16.12-17.09,22.83-12.17,8.63-21.43,9.88-43.67,9.88-23.96,0-43.67,17.56-43.67,43.67,0,13.8,6.28,26.64,16.83,34.77h169.52c4.81-4.99,7.24-11.76,7.24-17.76,0-8.06-6.43-25.75-25.08-25.08Z"/>`,
    'shape-18': `<path d="M577.64,226.82c-19.57-13.87-29.12-27.5-35.34-47.19-7.65-24.27-27.9-44.91-58.9-44.91s-61.17,33.14-61.17,61.17c0,16.15,6.38,28.79,21.42,43.75,11.11,11.05,19.44,32.12,13.01,50.5-6.2,17.72-21.59,31.58-46.84,30.67-38.56-1.38-51.85,35.19-51.85,51.85,0,23.15,17.46,51.85,51.85,51.85,5.03,0,11.4-1.28,17.02-3.02,7.41-2.28,16.85-.54,25.46,6.27,7.82,6.19,13.05,17.84,12.26,24.84-.54,4.79-.61,7.04-.61,10.01,0,23.38,14.46,41.56,41.56,41.56,17.07,0,41.56-11.4,41.56-41.56,0-20.39,12.89-33.11,25.08-41.56,11.97-8.31,34.77-13.14,53.94-3.52,4.46,2.24,9.3,4.13,14.23,5.66v-176.53c-27.39-1.42-43.24-6.09-62.68-19.87Z"/>`,

    // ── Era 1 — Variante B (System 02) ──
    // floater1: grosser Shape links, füllt obere Hälfte
    // floater2: kleiner Shape links-unten (Gegenform)
    'shape-era1-02-f1': `<path d="M0,109.32v50.22c4.25-1.26,8.6-1.96,12.96-1.96,30.1,0,49.75,20.04,57.18,43.59,6.03,19.11,15.31,32.35,34.3,45.81,24.43,17.32,43.01,19.83,87.63,19.83,48.08,0,87.63,35.25,87.63,87.63,0,46.52-35.57,87.63-87.63,87.63-12.05,0-27.93-3.57-40.6-9.93-18.61-9.34-40.74-4.64-52.36,3.42-11.83,8.21-24.34,20.55-24.34,40.35,0,29.28-23.77,40.35-40.35,40.35S6.44,509.42,0,498.8v91.4h640.32V109.32H0Z"/>`,
    'shape-era1-02-f2': `<path d="M34.42,516.25c16.57,0,40.35-11.07,40.35-40.35,0-19.79,12.51-32.14,24.34-40.35,11.62-8.06,33.76-12.76,52.36-3.42,12.67,6.36,28.55,9.93,40.6,9.93,52.06,0,87.63-41.11,87.63-87.63,0-52.38-39.55-87.63-87.63-87.63-44.62,0-63.2-2.51-87.63-19.83-18.99-13.47-28.27-26.7-34.3-45.81-7.43-23.56-27.08-43.59-57.18-43.59-4.36,0-8.7.7-12.96,1.96v339.26c6.44,10.62,18.06,17.45,34.42,17.45Z"/>`,

    // ── Era 1 — Variante C (System 03) ──
    // floater1: grosser Shape der fast das ganze Bild bedeckt (Hauptform mit Aussparungen)
    // floater2: kleiner Shape links-mitte
    // floater3: kleiner Shape oben-mitte
    // floater4: kleiner Shape rechts-unten
    'shape-era1-03-f1': `<path d="M416.45,518.84c20.39.73,32.82-10.46,37.82-24.77,5.19-14.84-1.53-31.86-10.5-40.78-12.15-12.08-17.29-22.28-17.29-35.33,0-22.63,24.6-49.39,49.39-49.39s41.38,16.67,47.56,36.26c5.02,15.9,12.73,26.9,28.53,38.1,20.32,14.41,35.78,16.49,72.89,16.49,5.31,0,10.48.53,15.48,1.53V106.6h-220.13c18.77,7.81,31.98,25.79,31.98,49.5,0,28.55-21.83,53.79-53.79,53.79-7.4,0-17.14-2.19-24.92-6.09-11.42-5.73-25.01-2.85-32.14,2.1-7.26,5.04-14.94,12.61-14.94,24.76,0,17.97-14.59,24.76-24.76,24.76-16.15,0-24.76-10.83-24.76-24.76,0-1.77.04-3.11.37-5.97.47-4.17-2.65-11.11-7.3-14.8-5.13-4.06-10.76-5.1-15.17-3.74-3.35,1.03-7.14,1.8-10.14,1.8-20.49,0-30.89-17.1-30.89-30.9,0-9.93,7.92-31.71,30.89-30.9,15.04.54,24.22-7.72,27.91-18.28,2.49-7.11,1.26-14.89-1.72-21.28H0v214.64c11.3,1.71,18.76,10,21.78,19.58,2.76,8.74,7,14.78,15.68,20.94,11.17,7.92,19.66,9.06,40.05,9.06,21.97,0,40.05,16.11,40.05,40.05,0,21.26-16.26,40.05-40.05,40.05-5.51,0-12.76-1.63-18.55-4.54-8.5-4.27-18.62-2.12-23.93,1.56-5.41,3.75-11.13,9.39-11.13,18.44,0,13.38-10.86,18.44-18.44,18.44-1.98,0-3.79-.24-5.46-.65v103.31h384.15c-6.36-7.95-9.56-17.87-9.56-26.78,0-13.46,10.73-42.98,41.87-41.87Z"/>`,
    'shape-era1-03-f2': `<path d="M23.9,466.39c0-9.05,5.72-14.69,11.13-18.44,5.31-3.69,15.43-5.83,23.93-1.56,5.79,2.91,13.05,4.54,18.55,4.54,23.79,0,40.05-18.79,40.05-40.05,0-23.94-18.08-40.05-40.05-40.05-20.39,0-28.88-1.15-40.05-9.06-8.68-6.15-12.92-12.2-15.68-20.94C18.76,331.24,11.3,322.95,0,321.24v162.94c1.67.41,3.48.65,5.46.65,7.57,0,18.44-5.06,18.44-18.44Z"/>`,
    'shape-era1-03-f3': `<path d="M272.52,127.89c-3.69,10.56-12.86,18.81-27.91,18.28-22.98-.82-30.89,20.97-30.89,30.9,0,13.79,10.4,30.9,30.89,30.9,3,0,6.79-.76,10.14-1.8,4.41-1.36,10.04-.32,15.17,3.74,4.66,3.69,7.78,10.63,7.3,14.8-.32,2.85-.37,4.19-.37,5.97,0,13.93,8.61,24.76,24.76,24.76,10.17,0,24.76-6.79,24.76-24.76,0-12.15,7.68-19.73,14.94-24.76,7.13-4.95,20.72-7.83,32.14-2.1,7.78,3.9,17.52,6.09,24.92,6.09,31.95,0,53.79-25.23,53.79-53.79,0-23.71-13.21-41.69-31.98-49.5h-149.39c2.97,6.39,4.2,14.17,1.72,21.28Z"/>`,
    'shape-era1-03-f4': `<path d="M640.32,460.96c-5-1-10.17-1.53-15.48-1.53-37.11,0-52.57-2.09-72.89-16.49-15.8-11.2-23.52-22.21-28.53-38.1-6.18-19.59-22.52-36.26-47.56-36.26s-49.39,26.76-49.39,49.39c0,13.04,5.15,23.25,17.29,35.33,8.97,8.92,15.69,25.93,10.5,40.78-5,14.31-17.43,25.5-37.82,24.77-31.14-1.11-41.87,28.41-41.87,41.87,0,8.91,3.21,18.83,9.56,26.78h256.17v-126.53Z"/>`,

    // ── Era 2 — Variante A (bestehend) ──
    'shape-19': `<path d="M155.39,496.52c-42.47,0-76.9,34.43-76.9,76.9,0,5.77.66,11.38,1.86,16.78h150.09c1.2-5.4,1.86-11.02,1.86-16.78,0-42.47-34.43-76.9-76.9-76.9Z"/>`,
    'shape-20': `<path d="M526.85,161.77c-99.72,0-180.55,80.84-180.55,180.55s80.84,180.55,180.55,180.55c42.99,0,82.46-15.03,113.47-40.12V201.88c-31.01-25.08-70.48-40.12-113.47-40.12Z"/>`,

    // ── Era 2 — Variante B (System 02) ──
    // floater1: grosser Shape oben + rechts, mit Kreis-Aussparung links
    // floater2: Kreis links-mitte (Gegenform)
    'shape-era2-02-f1': `<path d="M0,109.32v70.05c14.69-4.31,30.24-6.64,46.33-6.64,90.67,0,164.18,73.51,164.18,164.18s-73.51,164.18-164.18,164.18c-16.09,0-31.63-2.33-46.33-6.64v95.75h640.32V109.32H0Z"/>`,
    'shape-era2-02-f2': `<path d="M210.51,336.92c0-90.67-73.51-164.18-164.18-164.18C30.24,172.74,14.69,175.06,0,179.38v315.08c14.69,4.31,30.24,6.64,46.33,6.64,90.67,0,164.18-73.51,164.18-164.18Z"/>`,

    // ── Era 2 — Variante C (System 03) ──
    // floater1: grosser Shape (Hauptform mit 3 Aussparungen)
    // floater2: kleiner Kreis links-mitte
    // floater3: kleiner Kreis oben-mitte
    // floater4: grosser Kreis rechts-unten
    'shape-era2-03-f1': `<path d="M516.95,382.93c52.61,0,98.77,27.63,124.76,69.17V109.32h-220.48c1.18,6.34,1.8,12.88,1.8,19.56,0,58.69-47.58,106.27-106.27,106.27s-106.27-47.58-106.27-106.27c0-6.68.62-13.22,1.8-19.56H1.39v181c3.84-.57,7.76-.88,11.76-.88,43.7,0,79.13,35.43,79.13,79.13s-35.43,79.13-79.13,79.13c-4,0-7.92-.3-11.76-.88v143.38h381.34c-8.26-18.38-12.85-38.75-12.85-60.21,0-81.23,65.85-147.07,147.07-147.07Z"/>`,
    'shape-era2-03-f2': `<path d="M92.28,368.57c0-43.7-35.43-79.13-79.13-79.13-4,0-7.92.3-11.76.88v156.51c3.84.57,7.76.88,11.76.88,43.7,0,79.13-35.43,79.13-79.13Z"/>`,
    'shape-era2-03-f3': `<path d="M316.77,235.15c58.69,0,106.27-47.58,106.27-106.27,0-6.68-.62-13.22-1.8-19.56h-208.92c-1.18,6.34-1.8,12.88-1.8,19.56,0,58.69,47.58,106.27,106.27,106.27Z"/>`,
    'shape-era2-03-f4': `<path d="M641.71,452.1c-25.99-41.54-72.14-69.17-124.76-69.17-81.23,0-147.07,65.85-147.07,147.07,0,21.45,4.6,41.83,12.85,60.21h258.98v-138.11Z"/>`,

    // ── Era 3 — Variante A (System 01, ersetzt shape-21/22) ──
    // floater1: Polygon (Hauptform mit Aussparungen)
    // floater2: kleines Quadrat links-unten
    // floater3: grosses Quadrat rechts-mitte
    'shape-era3-01-f1': `<polygon points="0 109.32 0 590.21 82.74 590.21 82.74 475.19 197.75 475.19 197.75 590.21 640.32 590.21 640.32 433.52 368.57 433.52 368.57 161.77 640.32 161.77 640.32 109.32 0 109.32"/>`,
    'shape-era3-01-f2': `<rect x="82.74" y="475.19" width="115.01" height="115.01"/>`,
    'shape-era3-01-f3': `<rect x="368.57" y="161.77" width="271.75" height="271.75"/>`,

    // ── Era 3 — Variante B (System 02) ──
    // floater1: Polygon (Hauptform mit Quadrat-Aussparung links)
    // floater2: Quadrat links-mitte (Gegenform)
    'shape-era3-02-f1': `<polygon points="0 109.32 0 174.76 240.12 174.76 240.12 414.88 0 414.88 0 590.21 640.32 590.21 640.32 109.32 0 109.32"/>`,
    'shape-era3-02-f2': `<rect x="0" y="174.76" width="240.12" height="240.12"/>`,

    // ── Era 3 — Variante C (System 03) ──
    // floater1: Path (Hauptform mit 3 Aussparungen)
    // floater2: Rect links-mitte
    // floater3: Rect oben-mitte
    // floater4: Rect rechts-unten
    'shape-era3-03-f1': `<path d="M393.81,106.6v147.31h-147.31V106.6H0v480.88h428.59v-211.73h211.73v211.73h0V106.6h-246.51ZM109.69,402.87H0v-109.69h109.69v109.69Z"/>`,
    'shape-era3-03-f2': `<rect x="0" y="293.18" width="109.69" height="109.69"/>`,
    'shape-era3-03-f3': `<rect x="246.51" y="106.6" width="147.31" height="147.31"/>`,
    'shape-era3-03-f4': `<rect x="428.59" y="375.76" width="211.73" height="211.73"/>`
};

// ── Era 1 Varianten-Definition ────────────────────────────────
// Jede Variante: { floater1, floater2, extraFloaters (optional) }
// extraFloaters = zusätzliche floater3/floater4 shapes für Variante C
const ERA1_VARIANTS = [
    {
        // Variante A — bestehend
        floater1: 'shape-18',
        floater2: 'shape-17',
        invertShapes: ['shape-17', 'shape-18'],
    },
    {
        // Variante B — System 02
        floater1: 'shape-era1-02-f1',
        floater2: 'shape-era1-02-f2',
        invertShapes: ['shape-era1-02-f1', 'shape-era1-02-f2'],
    },
    {
        // Variante C — System 03 (4 floater shapes)
        floater1: 'shape-era1-03-f1',
        floater2: 'shape-era1-03-f2',
        floater3: 'shape-era1-03-f3',
        floater4: 'shape-era1-03-f4',
        invertShapes: ['shape-era1-03-f1', 'shape-era1-03-f2', 'shape-era1-03-f3', 'shape-era1-03-f4'],
    },
];

// ── Era 2 Varianten-Definition ────────────────────────────────
const ERA2_VARIANTS = [
    {
        // Variante A — bestehend
        floater1: 'shape-20',
        floater2: 'shape-19',
        invertShapes: ['shape-19', 'shape-20'],
    },
    {
        // Variante B — System 02
        floater1: 'shape-era2-02-f1',
        floater2: 'shape-era2-02-f2',
        invertShapes: ['shape-era2-02-f1', 'shape-era2-02-f2'],
    },
    {
        // Variante C — System 03 (4 shapes)
        floater1: 'shape-era2-03-f1',
        floater2: 'shape-era2-03-f2',
        floater3: 'shape-era2-03-f3',
        floater4: 'shape-era2-03-f4',
        invertShapes: ['shape-era2-03-f1', 'shape-era2-03-f2', 'shape-era2-03-f3', 'shape-era2-03-f4'],
    },
];

// ── Era 3 Varianten-Definition ────────────────────────────────
const ERA3_VARIANTS = [
    {
        // Variante A — System 01
        floater1: 'shape-era3-01-f1',
        floater2: 'shape-era3-01-f2',
        floater3: 'shape-era3-01-f3',
        invertShapes: ['shape-era3-01-f1', 'shape-era3-01-f2', 'shape-era3-01-f3'],
    },
    {
        // Variante B — System 02
        floater1: 'shape-era3-02-f1',
        floater2: 'shape-era3-02-f2',
        invertShapes: ['shape-era3-02-f1', 'shape-era3-02-f2'],
    },
    {
        // Variante C — System 03 (4 shapes)
        floater1: 'shape-era3-03-f1',
        floater2: 'shape-era3-03-f2',
        floater3: 'shape-era3-03-f3',
        floater4: 'shape-era3-03-f4',
        invertShapes: ['shape-era3-03-f1', 'shape-era3-03-f2', 'shape-era3-03-f3', 'shape-era3-03-f4'],
    },
];

const BASE_W = 640.32;
const BASE_H = 684.64;

function getShapeContent(shapeId, frameW, frameH) {
    // shapes unten-links verankert
    const bottomLeft = [
        'shape-17', 'shape-19',
        'shape-era1-02-f2', 'shape-era1-03-f2',
        'shape-era2-02-f2', 'shape-era2-03-f2',
        'shape-era3-01-f2',
    ];
    // shapes oben-rechts verankert
    const topRight = [
        'shape-18', 'shape-20',
        'shape-era1-02-f1', 'shape-era1-03-f1', 'shape-era1-03-f4',
        'shape-era2-02-f1', 'shape-era2-03-f1', 'shape-era2-03-f4',
        'shape-era3-01-f3', 'shape-era3-02-f1',
    ];
    // shapes oben-mitte
    const topMid = [
        'shape-era1-03-f3',
        'shape-era2-03-f3',
    ];
    // Era 3 shapes die kein Offset brauchen (Koordinaten absolut im viewBox)
    const noOffset = [
        'shape-era3-01-f1',
        'shape-era3-02-f2',
        'shape-era3-03-f1', 'shape-era3-03-f2', 'shape-era3-03-f3', 'shape-era3-03-f4',
    ];

    if (bottomLeft.includes(shapeId)) {
        return `<g transform="translate(0, ${frameH - BASE_H})">${SHAPES[shapeId]}</g>`;
    }
    if (topRight.includes(shapeId)) {
        return `<g transform="translate(${frameW - BASE_W}, 0)">${SHAPES[shapeId]}</g>`;
    }
    if (topMid.includes(shapeId)) {
        return `<g transform="translate(${(frameW - BASE_W) / 2}, 0)">${SHAPES[shapeId]}</g>`;
    }
    if (noOffset.includes(shapeId)) {
        return `<g transform="translate(0, 0)">${SHAPES[shapeId]}</g>`;
    }
    return SHAPES[shapeId];
}

function applyClipToElement(el, shapeId, frameW, frameH) {
    if (!el) return;
    const img = el.querySelector('img');
    if (!img) return;

    const uid = Math.random().toString(36).slice(2, 8);
    const maskId = `mask-${shapeId}-${uid}`;
    const shapeContent = getShapeContent(shapeId, frameW, frameH);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${frameW} ${frameH}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;overflow:visible;';
    svg.innerHTML = `
        <defs><mask id="${maskId}">
          <rect x="0" y="0" width="${frameW}" height="${frameH}" fill="black"/>
          <g fill="white">${shapeContent}</g>
        </mask></defs>
        <image href="${img.src}" x="0" y="0" width="${frameW}" height="${frameH}"
          preserveAspectRatio="xMidYMid slice" mask="url(#${maskId})"/>`;

    img.style.display = 'none';
    el.appendChild(svg);
    el._clipSvg = svg.querySelector('image');
}

function applyInvertedMask(el, shapeIds, frameW, frameH) {
    if (!el) return;
    const img = el.querySelector('img');
    if (!img) return;

    const uid = Math.random().toString(36).slice(2, 8);
    const maskId = `mask-main-${uid}`;
    const blackShapes = shapeIds.map(id => getShapeContent(id, frameW, frameH)).join('');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${frameW} ${frameH}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;overflow:visible;';
    svg.innerHTML = `
        <defs><mask id="${maskId}">
          <rect x="0" y="0" width="${frameW}" height="${frameH}" fill="white"/>
          <g fill="black">${blackShapes}</g>
        </mask></defs>
        <image href="${img.src}" x="0" y="0" width="${frameW}" height="${frameH}"
          preserveAspectRatio="xMidYMid slice" mask="url(#${maskId})"/>`;

    img.style.display = 'none';
    el.appendChild(svg);
}

// SVGs + GSAP-Animationen zusammen erstellen
function initWrapper(wrapper) {
    const frameImg = wrapper.querySelector('.ig-frame img');
    if (!frameImg) return;

    const era = wrapper.getAttribute('data-era') || '1';

    // Variante bestimmen
    let variant;
    if (era === '1') {
        const vAttr = parseInt(wrapper.getAttribute('data-variant'));
        if (vAttr >= 0 && vAttr <= 2) {
            variant = ERA1_VARIANTS[vAttr];
        } else {
            variant = ERA1_VARIANTS[Math.floor(Math.random() * 3)];
            wrapper.setAttribute('data-variant', ERA1_VARIANTS.indexOf(variant));
        }
    } else if (era === '2') {
        const vAttr = parseInt(wrapper.getAttribute('data-variant'));
        if (vAttr >= 0 && vAttr <= 2) {
            variant = ERA2_VARIANTS[vAttr];
        } else {
            variant = ERA2_VARIANTS[Math.floor(Math.random() * 3)];
            wrapper.setAttribute('data-variant', ERA2_VARIANTS.indexOf(variant));
        }
    }

    } else if (era === '3') {
        const vAttr = parseInt(wrapper.getAttribute('data-variant'));
        if (vAttr >= 0 && vAttr <= 2) {
            variant = ERA3_VARIANTS[vAttr];
        } else {
            variant = ERA3_VARIANTS[Math.floor(Math.random() * 3)];
            wrapper.setAttribute('data-variant', ERA3_VARIANTS.indexOf(variant));
        }
    }

    const apply = () => {
        const w = frameImg.naturalWidth;
        const h = frameImg.naturalHeight;
        if (!w || !h) return;

        wrapper.style.aspectRatio = `${w} / ${h}`;

        if (era === '1' || era === '2' || era === '3') {
            applyInvertedMask(wrapper.querySelector('.insta-post:not(.ig-frame)'), variant.invertShapes, w, h);
            applyClipToElement(wrapper.querySelector('.floater1'), variant.floater1, w, h);
            applyClipToElement(wrapper.querySelector('.floater2'), variant.floater2, w, h);
            if (variant.floater3) applyClipToElement(wrapper.querySelector('.floater3'), variant.floater3, w, h);
            if (variant.floater4) applyClipToElement(wrapper.querySelector('.floater4'), variant.floater4, w, h);
        }

        // GSAP Floater-Animationen
        wrapper.querySelectorAll('.floater').forEach((floater) => {
            const speedY = Number.isFinite(parseFloat(floater.getAttribute('attr-float-speed-y')))
                ? parseFloat(floater.getAttribute('attr-float-speed-y')) : 0;
            const speedX = Number.isFinite(parseFloat(floater.getAttribute('attr-float-speed-x')))
                ? parseFloat(floater.getAttribute('attr-float-speed-x')) : 0;
            const scale = Number.isFinite(parseFloat(floater.getAttribute('attr-scale')))
                ? parseFloat(floater.getAttribute('attr-scale')) : 1;
            const blurStart = Number.isFinite(parseFloat(floater.getAttribute('attr-blur-start')))
                ? parseFloat(floater.getAttribute('attr-blur-start')) : 0;
            const blurEnd = Number.isFinite(parseFloat(floater.getAttribute('attr-blur-end')))
                ? parseFloat(floater.getAttribute('attr-blur-end')) : 0;

            gsap.set(floater, { y: 0, x: 0, force3D: true });

            gsap.fromTo(floater,
                { y: 0, x: 0, scale: 1, filter: `blur(${blurStart}px)` },
                {
                    y: () => speedY + "px",
                    x: () => speedX + "px",
                    scale: scale,
                    filter: `blur(${blurEnd}px)`,
                    scrollTrigger: {
                        trigger: wrapper,
                        scrub: true,
                        start: "20% 30%",
                        end: "bottom top",
                        invalidateOnRefresh: true,
                    },
                    immediateRender: false,
                    ease: 'none'
                }
            );
        });

        // GSAP Hauptbild fade-in
        const instaPost = wrapper.querySelector('.insta-post:not(.ig-frame)');
        if (instaPost) {
            gsap.set(instaPost, { opacity: 0 });
            gsap.to(instaPost, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                }
            });
        }
    };

    if (frameImg.complete && frameImg.naturalWidth) apply();
    else frameImg.addEventListener('load', apply);
}


// ── MARK: LAZY INIT via IntersectionObserver ──────────────────
function initLazy() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const wrapper = entry.target;
            if (entry.isIntersecting) {
                wrapper.style.willChange = 'transform';
                if (!wrapper._initialized) {
                    wrapper._initialized = true;
                    initWrapper(wrapper);
                }
            } else {
                wrapper.style.willChange = 'auto';
            }
        });
    }, {
        rootMargin: '400px 0px 400px 0px'
    });

    document.querySelectorAll('.post-wrapper').forEach(wrapper => {
        observer.observe(wrapper);
    });
}


// ── MARK: DELAYED (Insta Updates) ────────────────────────────
function initDelayed() {
    delayed.forEach((card) => {
        const holdAttr = parseFloat(card.getAttribute('attr-delay-hold'));
        const holdVh = Number.isFinite(holdAttr) ? holdAttr : 0;

        gsap.set(card, { autoAlpha: 0, y: 20 });

        gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 20%",
                end: () => "+=" + holdVh + "px",
                scrub: true,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
            }
        })
            .to(card, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'none' }, 0)
            .to(card, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'none' }, 0.2)
            .to(card, { autoAlpha: 0, y: -20, duration: 0.25, ease: 'none' }, 0.75);
    });
}


// ── MARK: INIT ────────────────────────────────────────────────
function init() {
    smoother = ScrollSmoother.create({
        smooth: 1,
        smoothTouch: 0.1,
        wrapper: '#smooth-wrapper',
        content: '#smooth-content'
    });
    window.smoother = smoother;

    stage.style.opacity = '1';
    stage.style.visibility = 'visible';

    initLazy();
    initDelayed();
}

window.addEventListener('load', () => {
    init();
});