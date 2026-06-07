gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const delayed = selectAll(".insta-update");
const stage = select('.stage');
let smoother;
let lazyObserver;


// ── MARK: CLIP PATH SHAPES ────────────────────────────────────
const SHAPES = {
    // ── Era 1 Variante A ──
    'shape-17': `<path d="M208.73,547.36c-12.21.44-19.66-6.27-22.66-14.84-3.11-8.89.92-19.08,6.29-24.43,7.28-7.24,10.36-13.35,10.36-21.16,0-13.56-14.74-29.59-29.59-29.59s-24.79,9.98-28.49,21.72c-3,9.52-7.63,16.12-17.09,22.83-12.17,8.63-21.43,9.88-43.67,9.88-23.96,0-43.67,17.56-43.67,43.67,0,13.8,6.28,26.64,16.83,34.77h169.52c4.81-4.99,7.24-11.76,7.24-17.76,0-8.06-6.43-25.75-25.08-25.08Z"/>`,
    'shape-18': `<path d="M577.64,226.82c-19.57-13.87-29.12-27.5-35.34-47.19-7.65-24.27-27.9-44.91-58.9-44.91s-61.17,33.14-61.17,61.17c0,16.15,6.38,28.79,21.42,43.75,11.11,11.05,19.44,32.12,13.01,50.5-6.2,17.72-21.59,31.58-46.84,30.67-38.56-1.38-51.85,35.19-51.85,51.85,0,23.15,17.46,51.85,51.85,51.85,5.03,0,11.4-1.28,17.02-3.02,7.41-2.28,16.85-.54,25.46,6.27,7.82,6.19,13.05,17.84,12.26,24.84-.54,4.79-.61,7.04-.61,10.01,0,23.38,14.46,41.56,41.56,41.56,17.07,0,41.56-11.4,41.56-41.56,0-20.39,12.89-33.11,25.08-41.56,11.97-8.31,34.77-13.14,53.94-3.52,4.46,2.24,9.3,4.13,14.23,5.66v-176.53c-27.39-1.42-43.24-6.09-62.68-19.87Z"/>`,
    // ── Era 1 Variante B ──
    'shape-23': `<path d="M34.42,516.25c16.57,0,40.35-11.07,40.35-40.35,0-19.79,12.51-32.14,24.34-40.35,11.62-8.06,33.76-12.76,52.36-3.42,12.67,6.36,28.55,9.93,40.6,9.93,52.06,0,87.63-41.11,87.63-87.63,0-52.38-39.55-87.63-87.63-87.63-44.62,0-63.2-2.51-87.63-19.83-18.99-13.47-28.27-26.7-34.3-45.81-7.43-23.56-27.08-43.59-57.18-43.59-4.36,0-8.7.7-12.96,1.96v339.26c6.44,10.62,18.06,17.45,34.42,17.45Z"/>`,
    // ── Era 1 Variante C ──
    'shape-24': `<path d="M23.9,466.39c0-9.05,5.72-14.69,11.13-18.44,5.31-3.69,15.43-5.83,23.93-1.56,5.79,2.91,13.05,4.54,18.55,4.54,23.79,0,40.05-18.79,40.05-40.05,0-23.94-18.08-40.05-40.05-40.05-20.39,0-28.88-1.15-40.05-9.06-8.68-6.15-12.92-12.2-15.68-20.94C18.76,331.24,11.3,322.95,0,321.24v162.94c1.67.41,3.48.65,5.46.65,7.57,0,18.44-5.06,18.44-18.44Z"/>`,
    'shape-25': `<path d="M272.52,127.89c-3.69,10.56-12.86,18.81-27.91,18.28-22.98-.82-30.89,20.97-30.89,30.9,0,13.79,10.4,30.9,30.89,30.9,3,0,6.79-.76,10.14-1.8,4.41-1.36,10.04-.32,15.17,3.74,4.66,3.69,7.78,10.63,7.3,14.8-.32,2.85-.37,4.19-.37,5.97,0,13.93,8.61,24.76,24.76,24.76,10.17,0,24.76-6.79,24.76-24.76,0-12.15,7.68-19.73,14.94-24.76,7.13-4.95,20.72-7.83,32.14-2.1,7.78,3.9,17.52,6.09,24.92,6.09,31.95,0,53.79-25.23,53.79-53.79,0-23.71-13.21-41.69-31.98-49.5h-149.39c2.97,6.39,4.2,14.17,1.72,21.28Z"/>`,
    'shape-26': `<path d="M640.32,460.96c-5-1-10.17-1.53-15.48-1.53-37.11,0-52.57-2.09-72.89-16.49-15.8-11.2-23.52-22.21-28.53-38.1-6.18-19.59-22.52-36.26-47.56-36.26s-49.39,26.76-49.39,49.39c0,13.04,5.15,23.25,17.29,35.33,8.97,8.92,15.69,25.93,10.5,40.78-5,14.31-17.43,25.5-37.82,24.77-31.14-1.11-41.87,28.41-41.87,41.87,0,8.91,3.21,18.83,9.56,26.78h256.17v-126.53Z"/>`,
    // ── Era 2 Variante A ──
    'shape-19': `<path d="M155.39,496.52c-42.47,0-76.9,34.43-76.9,76.9,0,5.77.66,11.38,1.86,16.78h150.09c1.2-5.4,1.86-11.02,1.86-16.78,0-42.47-34.43-76.9-76.9-76.9Z"/>`,
    'shape-20': `<path d="M526.85,161.77c-99.72,0-180.55,80.84-180.55,180.55s80.84,180.55,180.55,180.55c42.99,0,82.46-15.03,113.47-40.12V201.88c-31.01-25.08-70.48-40.12-113.47-40.12Z"/>`,
    // ── Era 2 Variante B ──
    'shape-27': `<path d="M210.51,336.92c0-90.67-73.51-164.18-164.18-164.18C30.24,172.74,14.69,175.06,0,179.38v315.08c14.69,4.31,30.24,6.64,46.33,6.64,90.67,0,164.18-73.51,164.18-164.18Z"/>`,
    // ── Era 2 Variante C ──
    'shape-28': `<path d="M92.28,368.57c0-43.7-35.43-79.13-79.13-79.13-4,0-7.92.3-11.76.88v156.51c3.84.57,7.76.88,11.76.88,43.7,0,79.13-35.43,79.13-79.13Z"/>`,
    'shape-29': `<path d="M316.77,235.15c58.69,0,106.27-47.58,106.27-106.27,0-6.68-.62-13.22-1.8-19.56h-208.92c-1.18,6.34-1.8,12.88-1.8,19.56,0,58.69,47.58,106.27,106.27,106.27Z"/>`,
    'shape-30': `<path d="M641.71,452.1c-25.99-41.54-72.14-69.17-124.76-69.17-81.23,0-147.07,65.85-147.07,147.07,0,21.45,4.6,41.83,12.85,60.21h258.98v-138.11Z"/>`,
    // ── Era 3 Variante A ──
    'shape-31': `<rect x="82.74" y="475.19" width="115.01" height="115.01"/>`,
    'shape-32': `<rect x="368.57" y="161.77" width="271.75" height="271.75"/>`,
    // ── Era 3 Variante B ──
    'shape-33': `<rect x="0" y="174.76" width="240.12" height="240.12"/>`,
    // ── Era 3 Variante C ──
    'shape-34': `<rect x="0" y="293.18" width="109.69" height="109.69"/>`,
    'shape-35': `<rect x="246.51" y="106.6" width="147.31" height="147.31"/>`,
    'shape-36': `<rect x="428.59" y="375.76" width="211.73" height="211.73"/>`,
};

const BASE_W = 640.32;
const BASE_H = 684.64;

function getShapeContent(shapeId, frameW, frameH) {
    const offsetX = frameW - BASE_W;
    const offsetY = frameH - BASE_H;

    // Links+unten
    if (['shape-17', 'shape-19', 'shape-31'].includes(shapeId)) {
        return `<g transform="translate(0, ${offsetY})">${SHAPES[shapeId]}</g>`;
    }
    // Rechts+oben
    if (['shape-18', 'shape-20', 'shape-32'].includes(shapeId)) {
        return `<g transform="translate(${offsetX}, 0)">${SHAPES[shapeId]}</g>`;
    }
    // Links+mitte — kein Offset nötig
    if (['shape-23', 'shape-24', 'shape-27', 'shape-28', 'shape-33', 'shape-34'].includes(shapeId)) {
        return `<g transform="translate(0, 0)">${SHAPES[shapeId]}</g>`;
    }
    // Oben+mitte — kein Offset nötig
    if (['shape-25', 'shape-29', 'shape-35'].includes(shapeId)) {
        return `<g transform="translate(0, 0)">${SHAPES[shapeId]}</g>`;
    }
    // Rechts+unten
    if (['shape-26', 'shape-30', 'shape-36'].includes(shapeId)) {
        return `<g transform="translate(${offsetX}, ${offsetY})">${SHAPES[shapeId]}</g>`;
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
    const variant = wrapper.getAttribute('data-variant') || 'A';

    let floater1Shape, floater2Shape, floater3Shape;

    if (era === '3') {
        if (variant === 'B') {
            floater1Shape = 'shape-33';
        } else if (variant === 'C') {
            floater1Shape = 'shape-34'; floater2Shape = 'shape-35'; floater3Shape = 'shape-36';
        } else {
            floater1Shape = 'shape-32'; floater2Shape = 'shape-31';
        }
    } else if (era === '2') {
        if (variant === 'B') {
            floater1Shape = 'shape-27';
        } else if (variant === 'C') {
            floater1Shape = 'shape-28'; floater2Shape = 'shape-29'; floater3Shape = 'shape-30';
        } else {
            floater1Shape = 'shape-20'; floater2Shape = 'shape-19';
        }
    } else {
        if (variant === 'B') {
            floater1Shape = 'shape-23';
        } else if (variant === 'C') {
            floater1Shape = 'shape-24'; floater2Shape = 'shape-25'; floater3Shape = 'shape-26';
        } else {
            floater1Shape = 'shape-18'; floater2Shape = 'shape-17';
        }
    }

    const floaterConfigs = {
        '1A': {
            triggerStart: "top 20%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -1000, speedX: 5, scale: 2 },
                { speedY: -300, speedX: 5, scale: 1.5 },
            ]
        },

        '1B': {
            triggerStart: "top 46%",
            triggerEnd: "bottom top",
            fadeInStart: "top 80%",
            floaters: [
                { speedY: -2000, speedX: -5, scale: 3 },
            ],
        },

        '1C': {
            triggerStart: "top 80%",
            triggerEnd: "bottom top",
            fadeInStart: "top 90%",
            floaters: [
                { speedY: -1000, speedX: -8, scale: 1 },
                { speedY: -600, speedX: 5, scale: 2 },
                { speedY: -2000, speedX: 10, scale: 1.5 },
            ],
        },

        '2A': {
            triggerStart: "top 40%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -1000, speedX: 10, scale: 1.5 },
                { speedY: -300, speedX: -5, scale: 2 },
            ],
        },

        '2B': {
            triggerStart: "top 60%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -2000, speedX: -5, scale: 3 },
            ],
        },

        '2C': {
            triggerStart: "top 60%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -400, speedX: -5, scale: 1 },
                { speedY: -600, speedX: 5, scale: 0.9 },
                { speedY: -900, speedX: 10, scale: 1.1 },
            ],
        },

        '3A': {
            triggerStart: "top 40%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -1000, speedX: 15, scale: 1.5 },
                { speedY: -300, speedX: -5, scale: 2 },
            ],
        },

        '3B': {
            triggerStart: "top 40%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -800, speedX: -5, scale: 3 },
            ],
        },
        '3C': {
            triggerStart: "top 40%",
            triggerEnd: "bottom top",
            fadeInStart: "top 60%",
            floaters: [
                { speedY: -400, speedX: -5, scale: 1 },
                { speedY: -600, speedX: 5, scale: 0.9 },
                { speedY: -900, speedX: 10, scale: 1.1 },
            ],
        }
    };

    const apply = () => {
        const w = frameImg.naturalWidth;
        const h = frameImg.naturalHeight;
        if (!w || !h) return;

        wrapper.style.aspectRatio = `${w} / ${h}`;

        const mainImg = wrapper.querySelector('.insta-post:not(.ig-frame) img');
        const imgSrc = mainImg ? mainImg.src : '';

        const shapes = [floater1Shape, floater2Shape, floater3Shape].filter(Boolean);
        const configs = floaterConfigs[era + variant] || { triggerStart: "20% 30%", triggerEnd: "bottom top", floaters: [] };
        const triggerStart = wrapper.getAttribute('data-trigger-start') || configs.triggerStart;
        const fadeInStart = wrapper.getAttribute('data-fade-start') || configs.fadeInStart || "top 80%";
        const triggerEnd = wrapper.getAttribute('data-trigger-end') || configs.triggerEnd;
        const floaterList = configs.floaters;
        const floaterClasses = ['floater1', 'floater2', 'floater3'];
        const igFrame = wrapper.querySelector('.ig-frame');

        // Überschüssige Floater entfernen
        floaterClasses.forEach((cls, i) => {
            if (i >= shapes.length) {
                const el = wrapper.querySelector('.' + cls);
                if (el) el.remove();
            }
        });

        // Fehlende Floater erstellen
        shapes.forEach((shape, i) => {
            const cls = floaterClasses[i];
            const n = i + 1;
            const defaultCfg = floaterList[i] || { speedY: -500, speedX: 0, scale: 1 };

            const cfg = {
                speedY: parseFloat(wrapper.getAttribute(`data-floater${n}-speed-y`)) || defaultCfg.speedY,
                speedX: parseFloat(wrapper.getAttribute(`data-floater${n}-speed-x`)) || defaultCfg.speedX,
                scale: parseFloat(wrapper.getAttribute(`data-floater${n}-scale`)) || defaultCfg.scale,
            };

            if (!wrapper.querySelector('.' + cls)) {
                const div = document.createElement('div');
                div.className = `${cls} floater`;
                div.setAttribute('attr-float-speed-y', cfg.speedY);
                div.setAttribute('attr-float-speed-x', cfg.speedX);
                div.setAttribute('attr-scale', cfg.scale);
                const img = document.createElement('img');
                img.src = imgSrc;
                img.loading = 'lazy';
                div.appendChild(img);
                wrapper.insertBefore(div, igFrame);
            }
        });

        // Masken anwenden
        applyInvertedMask(wrapper.querySelector('.insta-post:not(.ig-frame)'), shapes, w, h);
        if (floater1Shape) applyClipToElement(wrapper.querySelector('.floater1'), floater1Shape, w, h);
        if (floater2Shape) applyClipToElement(wrapper.querySelector('.floater2'), floater2Shape, w, h);
        if (floater3Shape) applyClipToElement(wrapper.querySelector('.floater3'), floater3Shape, w, h);

        // GSAP Floater-Animationen
        wrapper.querySelectorAll('.floater').forEach((floater) => {
            const speedY = parseFloat(floater.getAttribute('attr-float-speed-y')) || 0;
            const speedX = parseFloat(floater.getAttribute('attr-float-speed-x')) || 0;
            const scale = parseFloat(floater.getAttribute('attr-scale')) || 1;
            const blurStart = parseFloat(floater.getAttribute('attr-blur-start')) || 0;
            const blurEnd = parseFloat(floater.getAttribute('attr-blur-end')) || 0;

            gsap.set(floater, { y: 0, x: 0, force3D: true });
            const floaterImg = floater.querySelector('img, svg');
            if (floaterImg) gsap.set(floaterImg, { force3D: true });
            gsap.fromTo(floater,
                { y: 0, x: 0, scale: 1, filter: `blur(${blurStart}px)` },
                {
                    y: () => speedY + "px",
                    x: () => speedX + "px",
                    scale: scale,
                    scrollTrigger: {
                        trigger: wrapper,
                        scrub: true,
                        start: triggerStart,
                        end: triggerEnd,
                        invalidateOnRefresh: true,
                    },
                    immediateRender: false,
                    ease: 'none'
                }
            );
        });

        // Hauptbild fade-in
        const instaPost = wrapper.querySelector('.insta-post:not(.ig-frame)');
        if (instaPost) {
            gsap.set(instaPost, { opacity: 0 });

            gsap.to(instaPost, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: wrapper,
                    start: fadeInStart,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                }
            });
        }
    };

    if (frameImg.complete && frameImg.naturalWidth) apply();
    else frameImg.addEventListener('load', apply, { once: true });
}

// ── MARK: LAZY INIT via IntersectionObserver ──────────────────
function initLazy() {
    lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const wrapper = entry.target;
                if (!wrapper._initialized) {
                    wrapper._initialized = true;
                    lazyObserver.unobserve(wrapper);
                    initWrapper(wrapper);
                }
            }
        });
    }, {
        rootMargin: '200px 0px 200px 0px'
    });

    document.querySelectorAll('.post-wrapper').forEach(wrapper => {
        lazyObserver.observe(wrapper);
    });
}


// ── MARK: INSTA UPDATES ────────────────────────────
function initDelayed() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' });
      } else {
        gsap.to(entry.target, { autoAlpha: 0, y: 80, scale: 0.90,  duration: 0.3 });
      }
    });
  }, { threshold: 0.1 });

  delayed.forEach(card => {
    gsap.set(card, { autoAlpha: 0, y: 80, scale: 0.90 });
    observer.observe(card);
  });
}


// ── MARK: INIT ────────────────────────────────────────────────
function init() {
    smoother = ScrollSmoother.create({
        smooth: 0.5,
        smoothTouch: 0,
        wrapper: '#smooth-wrapper',
        content: '#smooth-content'
    });
    window.smoother = smoother;

    gsap.set(stage, { autoAlpha: 1 });

    initLazy();
    initDelayed();

    // Headlines erst nach ScrollSmoother initialisieren
    setTimeout(() => {
        if (typeof initHeadlines === 'function') initHeadlines();
        ScrollTrigger.refresh();
    }, 2000);
}

window.addEventListener('load', () => {
    init();
    setTimeout(() => {
        window.scrollTo(0, 0); // ← sicherstellen dass Seite oben ist
        ScrollTrigger.refresh();
    }, 1000);

    /// Warte bis alle Bilder geladen und Layout stabil ist
    const images = document.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;

    function onImageLoad() {
        loaded++;
        if (loaded === total) {
            ScrollTrigger.refresh();
        }
    }

    images.forEach(img => {
        if (img.complete) onImageLoad();
        else img.addEventListener('load', onImageLoad);
    });

    // Fallback nach 3 Sekunden
    setTimeout(() => ScrollTrigger.refresh(), 3500);
});

// Cleanup on pagehide to avoid leaks when navigating away
window.addEventListener('pagehide', () => {
    try {
        if (lazyObserver) {
            lazyObserver.disconnect();
            lazyObserver = null;
        }
        if (smoother) {
            try { smoother.kill(); } catch (e) { }
            window.smoother = null;
        }
        ScrollTrigger.getAll().forEach(t => t.kill());
    } catch (err) {
        console.warn('parallax cleanup error', err);
    }
});