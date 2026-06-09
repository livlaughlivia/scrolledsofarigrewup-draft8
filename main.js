console.log('main.js geladen');

gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVGPlugin);

gsap.set('#headline-timer-line', { drawSVG: '0%' });

let splitIntro, animationIntro, splitQuote;

window.isNavigating = false;

// ── MARK: TICKER SEGMENTS ────────────────────────────────────
// Jede Headline hat einen eigenen trigger-div im HTML.
// triggerId: null = startet beim Eintreten in #j-2016

const tickerSegments = [
  {
    triggerId: null, // beim Eintreten in #j-2016
    text: `«Am 2. Juni 2016 steigt am Gotthard das grosse Fest» SRF News, 1. Juni 2016 ✦`
  },
  {
    triggerId: 'headline-ticker-2016-2',
    text: `«Brexit: Das war der denkwürdige 24. Juni im Live-Ticker» SRF News, 24. Juni 2016 ✦`
  },
  {
    triggerId: 'headline-ticker-2016-3',
    text: `«Das war die historische Wahl: Donald Trump ist US-Präsident» SRF News, 9. November 2016 ✦`
  },

  {
    triggerId: 'headline-ticker-2017-1',
    text: `«Donald Trump ist Präsident – Das Protokoll zum Nachlesen» SRF News, 20. Januar 2017 ✦`
  },
  {
    triggerId: 'headline-ticker-2017-2',
    text: `«Präsident Macron, En Marche, EU» SRF 10vor10, 8. Mai 2017 ✦`
  },
  {
    triggerId: 'headline-ticker-2017-3',
    text: `«Stimmvolk heisst Energiegesetz mit 58 Prozent gut» SRF News, 21. Mai 2017 ✦`
  },
  {
    triggerId: 'headline-ticker-2017-4',
    text: `«Eine Stadt in Trauer – das Protokoll zum Nachlesen» SRF News, 23. Mai 2017 ✦`
  },
  {
    triggerId: 'headline-ticker-2017-5',
    text: `«Ignazio Cassis will die Schweiz ‹zusammenschmieden›» SRF News, 20. September 2017 ✦`
  },
  {
    triggerId: 'headline-ticker-2017-6',
    text: `«90 Tote bei Selbstmordanschlag in Mogadischu» SRF News, 14. Oktober 2017 ✦`
  },
  {
    triggerId: 'headline-ticker-2017-7',
    text: `«#MeToo: Wie sieht es fünf Jahre später aus?» SRF Kultur, Oktober 2017 ✦`
  },

  {
    triggerId: 'headline-ticker-2018-1',
    text: `«Aufgebrachte Teenager bringen die Waffenlobby in Bedrängnis» SRF News, 24. März 2018 ✦`
  },
  {
    triggerId: 'headline-ticker-2018-2',
    text: `«Saudi-Arabien öffnet sich aus wirtschaftlicher Notwendigkeit» SRF News, 24. Juni 2018 ✦`
  },
  {
    triggerId: 'headline-ticker-2018-3',
    text: `«Alle zwölf Buben und ihr Trainer gerettet» SRF News, 10. Juli 2018 ✦`
  },

  {
    triggerId: 'headline-ticker-2019-1',
    text: `«Löst China das Rätsel der Geburt des Mondes?» SRF News, 3. Januar 2019 ✦`
  },
  {
    triggerId: 'headline-ticker-2019-2',
    text: `«Forschern gelingt erstmals Foto eines Schwarzen Lochs» SRF News, 10. April 2019 ✦`
  },
  {
    triggerId: 'headline-ticker-2019-3',
    text: `«Grosser Regenschirm» für die beschädigte Kathedrale» SRF News, 16. April 2019 ✦`
  },
  {
    triggerId: 'headline-ticker-2019-4',
    text: `«Impeachment gegen US-Präsident Trump ist eingeleitet» SRF News, 19. Dezember 2019 ✦`
  },
  {
    triggerId: 'headline-ticker-2019-5',
    text: `««Ein Funke reicht, und die Natur explodiert buchstäblich»» SRF News, 31. Dezember 2019 ✦`
  },

  {
    triggerId: 'headline-ticker-2020-1',
    text: `«Was bekannt ist – und was nicht» SRF News, 10. Januar 2020 ✦`
  },
  {
    triggerId: 'headline-ticker-2020-2',
    text: `«Grossbritannien droht zum Versuchslabor des Chaos zu werden» SRF News, 31. Januar 2020 ✦`
  },
  {
    triggerId: 'headline-ticker-2020-3',
    text: `«Der Bundesrat beschliesst ausserordentliche Lage» SRF News, 16. März 2020 ✦`
  },
  {
    triggerId: 'headline-ticker-2020-4',
    text: `«Joe Biden gewinnt die Präsidentschaftswahl» SRF News, 7. November 2020 ✦`
  },

  {
    triggerId: 'headline-ticker-2021-1',
    text: `«Ein Jahr Sturm aufs Kapitol — Die amerikanische Angst» SRF News, 6. Januar 2022 ✦`
  },
  {
    triggerId: 'headline-ticker-2021-2',
    text: `«Das waren die Highlights der Inauguration» SRF News, 21. Januar 2021 ✦`
  },
  {
    triggerId: 'headline-ticker-2021-3',
    text: `«Präsident verlässt das Land – Lage in Kabul bleibt angespannt» SRF News, 15. August 2021 ✦`
  },
  {
    triggerId: 'headline-ticker-2021-4',
    text: `«Letzter US-Soldat verlässt Afghanistan» SRF News, 30. August 2021 ✦`
  },
  {
    triggerId: 'headline-ticker-2021-5',
    text: `«Die Stimmberechtigten nehmen die Ehe für alle mit 64.1 Prozent klar an» SRF News, 26. September 2021 ✦`
  },

  {
    triggerId: 'headline-ticker-2022-1',
    text: `«Seit drei Jahren hat der Krieg die Ukraine fest in der Hand» SRF News, 24. Februar 2022 ✦`
  },
  {
    triggerId: 'headline-ticker-2022-2',
    text: `«Twitter stimmt Übernahme durch Elon Musk zu» SRF News, 25. April 2022 ✦`
  },
  {
    triggerId: 'headline-ticker-2022-3',
    text: `«Queen Elizabeth II. ist tot – Charles III. übernimmt» SRF News, 8. September 2022 ✦`
  },
  {
    triggerId: 'headline-ticker-2022-4',
    text: `«Stimmvolk sagt Ja zu AHV-Vorlagen» SRF News, 25. September 2022 ✦`
  },
  {
    triggerId: 'headline-ticker-2022-5',
    text: `«Ein Jahr später: Wofür ist ChatGPT eigentlich gut?» SRF News, 30. November 2022 ✦`
  },

  {
    triggerId: 'headline-ticker-2023-1',
    text: `«Was bei der CS-Übernahme hinter den Kulissen geschah» SRF News, 19. März 2023 ✦`
  },
  {
    triggerId: 'headline-ticker-2023-2',
    text: `«Netanjahu feuert Verteidigungsminister Galant – wütende Proteste» SRF News, 27. März 2023 ✦`
  },
  {
    triggerId: 'headline-ticker-2023-3',
    text: `«Tiktok-Chef findet kein Gehör im US-Kongress» SRF News, 24. März 2023 ✦`
  },
  {
    triggerId: 'headline-ticker-2023-4',
    text: `«Finnland: einst neutral, jetzt das 31. Allianzmitglied» SRF News, 4. April 2023 ✦`
  },
  {
    triggerId: 'headline-ticker-2023-5',
    text: `«Eskalation im Nahen Osten: Warum genau jetzt?» SRF News, 8. Oktober 2023 ✦`
  },

  {
    triggerId: 'headline-ticker-2024-1',
    text: `«Nato: grösser, stärker – und verunsichert» SRF News, 26. Februar 2024 ✦`
  },
  {
    triggerId: 'headline-ticker-2024-2',
    text: `«Die 13. AHV-Rente – ein Denkzettel für Bundesrat und Parlament» SRF News, 3. März 2024 ✦`
  },
  {
    triggerId: 'headline-ticker-2024-3',
    text: `«Was man über das Attentat auf Donald Trump weiss» SRF News, 15. Juli 2024 ✦`
  },
  {
    triggerId: 'headline-ticker-2024-4',
    text: `«Trumps Wiederwahl wird die USA weiter polarisieren» SRF News, 6. November 2024 ✦`
  },

  {
    triggerId: 'headline-ticker-2025-1',
    text: `«Inauguration 2025 live: Trump ist der 47. Präsident der USA» SRF News, 20. Januar 2025 ✦`
  },
  {
    triggerId: 'headline-ticker-2025-2',
    text: `«Papst Franziskus ist tot: So geht es weiter» SRF News, 21. April 2025 ✦`
  },
  {
    triggerId: 'headline-ticker-2025-3',
    text: `«US-Amerikaner Prevost ist Papst Leo XIV. – die Welt gratuliert» SRF News, 8. Mai 2025 ✦`
  },
  {
    triggerId: 'headline-ticker-2025-4',
    text: `«Israel greift Atomanlagen im Iran an – das ist bekannt» SRF News, 13. Juni 2025 ✦`
  },
  {
    triggerId: 'headline-ticker-2025-5',
    text: `«Gaza: Von IPC ausgerufene Hungersnot trifft Kinder hart» SRF News, 22. August 2025 ✦`
  },
  {
    triggerId: 'headline-ticker-2025-6',
    text: `«Trump-Unterstützer Charlie Kirk nach Schuss gestorben» SRF News, 10. September 2025 ✦`
  },
  {
    triggerId: 'headline-ticker-2025-7',
    text: `«Proteste im Iran: Trump droht» SRF News, 31. Dezember 2025 ✦`
  },

  {
    triggerId: 'headline-ticker-2026-1',
    text: `«Dutzende Tote in Crans-Montana nach Brand: Was bekannt ist» SRF News, 2. Januar 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-2',
    text: `«USA überfallen Venezuela und entführen Maduro – ein Überblick» SRF News, 3. Januar 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-3',
    text: `«Neue Epstein-Akten publik: Das Brisanteste im Überblick» SRF News, 30. Januar 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-4',
    text: `«Olympische Spiele 2026 im San Siro feierlich eröffnet» SRF Sport, 6. Februar 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-5',
    text: `«Wie der Iran-Krieg Indiens Wirtschaft in die Enge treibt» SRF News, 10. März 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-6',
    text: `«Iran-Krieg erfasst den Libanon mit voller Wucht» SRF News, 14. März 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-7',
    text: `«Taliban: Hunderte Tote bei Angriff auf Spital in Kabul» SRF News, 17. März 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-8',
    text: `«Artemis-2-Astronauten erreichen historisch weiteste Distanz zur Erde» SRF News, 6. April 2026 ✦`
  },
  {
    triggerId: 'headline-ticker-2026-9',
    text: `«Schock nach israelischen Bombardierungen» SRF News, 9. April 2026 ✦`
  },

];

let currentEra = "era1";

let tickerAnimation = null;

function setupTicker(text) {
  const wrapper = document.querySelector('.quote-block-1');
  if (!wrapper) return;

  const inner = wrapper.querySelector('.ticker-inner');
  const doubled = `${text}   ${text}`;

  if (!tickerAnimation || !inner) {
    wrapper.innerHTML = `<span class="ticker-inner">${doubled}</span>`;
    const newInner = wrapper.querySelector('.ticker-inner');
    const fullWidth = newInner.scrollWidth / 2;
    gsap.set(newInner, { x: 0 });
    tickerAnimation = gsap.to(newInner, {
      x: -fullWidth,
      duration: fullWidth / 80,
      ease: 'none',
      repeat: -1,
    });
    return;
  }

  // Text wechseln ohne Sprung
  const currentX = gsap.getProperty(inner, 'x');
  const progress = Math.abs(currentX) / (inner.scrollWidth / 2);
  
  inner.textContent = doubled;
  const fullWidth = inner.scrollWidth / 2;
  const newX = -(progress * fullWidth);

  tickerAnimation.kill();
  gsap.set(inner, { x: newX });
  tickerAnimation = gsap.to(inner, {
    x: -fullWidth,
    duration: ((1 - progress) * fullWidth) / 80,
    ease: 'none',
    onComplete: () => {
      gsap.set(inner, { x: 0 });
      tickerAnimation = gsap.to(inner, {
        x: -fullWidth,
        duration: fullWidth / 80,
        ease: 'none',
        repeat: -1,
      });
    }
  });
}

function initTickerObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !window.isNavigating) {
        const segment = tickerSegments.find(s => s.triggerId === entry.target.id);
        if (segment) setupTicker(segment.text);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -20% 0px'
  });

  tickerSegments.forEach(segment => {
    if (!segment.triggerId) return;
    const el = document.getElementById(segment.triggerId);
    if (el) observer.observe(el);
  });
}

function initTickerVelocity() {
  ScrollTrigger.create({
    trigger: '#smooth-content',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (!tickerAnimation) return;
      const velocity = self.getVelocity();
      const scale = velocity / 500;
      tickerAnimation.timeScale(Math.abs(scale) < 0.1 ? 1 : scale);
    }
  });
}


// ── MARK: ERA TITLE ANIMATIONS ────────────────────────────────
function initEraTitles1() {
  ScrollTrigger.getAll()
    .filter(t => t.vars.id?.startsWith("era-title-1"))
    .forEach(t => t.kill());

  document.querySelectorAll('.era1').forEach((line, i) => {
    gsap.fromTo(line,
      { fontVariationSettings: '"SRFF" 0, "wght" 700' },
      {
        fontVariationSettings: '"SRFF" 100, "wght" 700',
        ease: 'power2.inOut',
        scrollTrigger: {
          id: `era-title-1-${i}`,
          trigger: line,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );
  });
}

function initEraTitles2() {
  ScrollTrigger.getAll()
    .filter(t => t.vars.id?.startsWith("era-title-2"))
    .forEach(t => t.kill());

  document.querySelectorAll('.era2').forEach((line, i) => {
    gsap.fromTo(line,
      { fontVariationSettings: '"SRFF" 100, "wght" 700' },
      {
        fontVariationSettings: '"SRFF" 50, "wght" 700',
        ease: 'power2.inOut',
        scrollTrigger: {
          id: `era-title-2-${i}`,
          trigger: line,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );
  });
}

function initEraTitles3() {
  ScrollTrigger.getAll()
    .filter(t => t.vars.id?.startsWith("era-title-3"))
    .forEach(t => t.kill());

  document.querySelectorAll('.era3').forEach((line, i) => {
    gsap.fromTo(line,
      { fontVariationSettings: '"SRFF" 50, "wght" 700' },
      {
        fontVariationSettings: '"SRFF" 0, "wght" 700',
        ease: 'power2.inOut',
        scrollTrigger: {
          id: `era-title-3-${i}`,
          trigger: line,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );
  });
}


// ── MARK: Storys mit Quotes ────────────────────────────────────────────
let headlineActive = false;

function showHeadline(triggerId) {
  console.log('showHeadline aufgerufen:', triggerId);
  if (window.isNavigating) return;
  if (headlineActive) return; // ← verhindert doppeltes Auslösen

  const trigger = document.getElementById(triggerId);
  if (!trigger) return;

  headlineActive = true; // ← setzen

  const era = trigger.dataset.era || '1';
  const textEl = document.querySelector('[class^="headline-text-era"]');
  const authorEl = document.querySelector('[class^="headline-author"]');

  // Null-Checks: wenn Elemente nicht existieren, breche ab
  if (!textEl || !authorEl) {
    headlineActive = false;
    return;
  }

  textEl.className = `headline-text-era${era}`;
  authorEl.className = `headline-author${era}`;

  textEl.textContent = trigger.dataset.quoteText;
  authorEl.textContent = trigger.dataset.quoteAuthor || '';

  gsap.killTweensOf('#headline-timer-line');
  gsap.set('#headline-timer-line', { drawSVG: '0%' });

  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(true);

  document.body.classList.add('headline-active');
  document.documentElement.classList.add('headline-active');

  gsap.to('.gradient-headline', {
    opacity: 1, visibility: 'visible', duration: 1,
    onComplete: () => {
      const gradEl = document.querySelector('.gradient-headline');
      if (gradEl) gradEl.style.pointerEvents = 'all';
    }
  });

gsap.fromTo('#headline-timer-line',
    { drawSVG: '0%' },
    {
      drawSVG: '100%', duration: 10, ease: 'none',
      onComplete: () => {
        gsap.to('.gradient-headline', {
          opacity: 0, visibility: 'hidden', duration: 1,
          onComplete: () => {
            document.querySelector('.gradient-headline').style.pointerEvents = 'none';
            document.body.classList.remove('headline-active');
            document.documentElement.classList.remove('headline-active');
            headlineActive = false; // ← zurücksetzen
            const smoother = ScrollSmoother.get();
            if (smoother) smoother.paused(false);
          }
        });
      }
    }
  );


  const author = trigger.dataset.quoteAuthor || '';
  if (author.startsWith('@')) {
    authorEl.innerHTML = `<span style="font-size: 1.3em">@</span>${author.slice(1)}`;
  } else {
    authorEl.textContent = author;
  }
}

function hideHeadline() {
  if (!headlineActive) return; // ← nichts tun wenn keine Headline aktiv
  headlineActive = false; // ← zurücksetzen

  gsap.killTweensOf('#headline-timer-line');
  gsap.killTweensOf('.gradient-headline');
  document.body.classList.remove('headline-active');
  document.documentElement.classList.remove('headline-active');
  gsap.to('.gradient-headline', { opacity: 0, visibility: 'hidden', duration: 0.3 });
  const gradEl = document.querySelector('.gradient-headline');
  if (gradEl) gradEl.style.pointerEvents = 'none';
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(false);
}

function initHeadlines() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showHeadline(entry.target.id);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Element muss 50% sichtbar sein
  });

  document.querySelectorAll('[id^="quote-trigger-"]').forEach(triggerEl => {
    observer.observe(triggerEl);
  });
}

function initInstAds() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const triggerId = entry.target.id;
        const ad = document.querySelector(`[data-trigger="${triggerId}"]`);
        if (!ad) return;
        gsap.to(ad, { autoAlpha: 1, duration: 0.4 });
        setTimeout(() => {
          gsap.to(ad, { autoAlpha: 0, duration: 0.4 });
        }, 5000);
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('[id^="ad-trigger-"]').forEach(triggerEl => {
    observer.observe(triggerEl);
  });
}

  function fitAdText() {
  document.querySelectorAll('.insta-ad h3').forEach(h3 => {
    const box = h3.closest('.insta-ad');
    const boxWidth = box.offsetWidth - 60; // padding
    let size = 80;
    h3.style.fontSize = size + 'px';
    while (h3.scrollWidth > boxWidth && size > 10) {
      size -= 2;
      h3.style.fontSize = size + 'px';
    }
  });
}

// MARK: button storys

function initStoryPreview() {
  const triggers = [...document.querySelectorAll('[id^="quote-trigger-"]')];
  let current = 0;

  // Button erstellen
  const btn = document.createElement('button');
  btn.textContent = '▶';
  btn.style.cssText = `
    position: fixed;
    bottom: 120px;
    right: 20px;
    z-index: 400;
    background: #ff002a;
    color: #f9caf8;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
  `;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    if (current >= triggers.length) current = 0;
    const id = triggers[current].id;
    showHeadline(id);
    current++;
  });
}

  



// ── MARK: Intro ───────────────────────────────────────────────
function initIntroTyping() {
  const blocks = [...document.querySelectorAll('.intro-block')];

  blocks.forEach(block => {
    block.dataset.fullText = block.textContent.trim();
    block.style.visibility = 'hidden';
  });

  function checkAndType() {
    blocks.forEach((block) => {
      const wrapper = block.closest('.intro-block-wrapper');
      const matrix = new DOMMatrix(getComputedStyle(wrapper).transform);
      const y = matrix.m42;

      if (Math.abs(y) < 50 && !block._typed && !block._typing) {
        block._typed = true;
        block._typing = true;
        block.textContent = '';
        block.style.visibility = 'visible';
        const text = block.dataset.fullText;
        let i = 0;
        const interval = setInterval(() => {
          block.textContent += text[i];
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            block._typing = false;
          }
        }, 30);
      }

      if (y < -window.innerHeight * 0.5 || y > window.innerHeight * 0.5) {
        if (!block._typing) {
          block._typed = false;
          block.textContent = block.dataset.fullText;
          block.style.visibility = 'hidden';
        }
      }
    });
    requestAnimationFrame(checkAndType);
  }

  requestAnimationFrame(checkAndType);
}



// MARK: Setup
function setup() {
  gsap.to('#title', {
    opacity: 0,
    scrollTrigger: {
      trigger: '.title-spacer',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  initEraTitles1();
  initEraTitles2();
  initEraTitles3();
  initIntroTyping();
  initTickerObserver();
  initTickerVelocity();
  initInstAds();
  //initStoryPreview();

  ScrollTrigger.create({
    trigger: '#j-2016 .post-wrapper',
    start: 'top 80%',
    onEnter: () => {
      const sideBar = document.getElementById('side-bar');
      sideBar.classList.add('is-open');
      setTimeout(() => sideBar.classList.remove('is-open'), 1000);
    },
    once: true
  });

  ScrollTrigger.create({
    trigger: '#j-2016',
    start: 'top 80%',
    onEnter: () => {
      gsap.set('.quote-wrapper', { opacity: 1, visibility: 'visible' });
      setupTicker(tickerSegments[0].text);
    },
    onEnterBack: () => {
      gsap.set('.quote-wrapper', { opacity: 1, visibility: 'visible' });
      setupTicker(tickerSegments[0].text);
    },
    onLeaveBack: () => gsap.to('.quote-wrapper', { opacity: 0, visibility: 'hidden', duration: 0.5 }),
  });

  ScrollTrigger.create({
    trigger: '#outro',
    start: 'top 80%',
    onEnter: () => gsap.to('.quote-wrapper', { opacity: 0, visibility: 'hidden', duration: 0.5 }),
    onLeaveBack: () => gsap.to('.quote-wrapper', { opacity: 1, visibility: 'visible', duration: 0.5 }),
  });

  gsap.set('#headline-timer-line', { drawSVG: '0%' });

  window.updateTickerForCurrentPosition = function () {
    if (window.isNavigating) {
      setTimeout(() => window.updateTickerForCurrentPosition(), 100);
      return;
    }
    const smoother = ScrollSmoother.get();
    const scrollY = smoother ? smoother.scrollTop() : window.scrollY;
    const feedStartEl = document.getElementById('j-2016');
    const outroEl = document.getElementById('outro');
    const feedStart = feedStartEl ? feedStartEl.getBoundingClientRect().top + scrollY : 0;
    const feedEnd = outroEl ? outroEl.getBoundingClientRect().top + scrollY : Infinity;
    const pos = scrollY + window.innerHeight * 0.8;
    const inFeed = pos >= feedStart && scrollY < feedEnd;
    if (!inFeed) {
      gsap.to('.quote-wrapper', { opacity: 0, visibility: 'hidden', duration: 0.3 });
      return;
    }
    let activeSegment = tickerSegments[0];
    for (const segment of tickerSegments) {
      if (!segment.triggerId) continue;
      const el = document.getElementById(segment.triggerId);
      if (!el) continue;
      const elScrollY = el.getBoundingClientRect().top + scrollY;
      if (elScrollY < scrollY + window.innerHeight * 0.8) activeSegment = segment;
    }
    gsap.set('.quote-wrapper', { opacity: 1, visibility: 'visible' });
    setupTicker(activeSegment.text);
  };

  const closeBtn = document.querySelector('.close-headline-btn');
  if (closeBtn) closeBtn.addEventListener('click', hideHeadline);
}




// ── MARK: GRID ────────────────────────────────────────────────

// Benannte Handler, damit sie später sauber entfernt werden können
/* function toggleGridHandler(e) {
  if (e.key === 'g' || e.key === 'G') {
    const overlay = document.getElementById('gridOverlay');
    if (!overlay) return;
    overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
  }
}
document.addEventListener('keydown', toggleGridHandler);

let lastTap = 0;
function touchHandler(e) {
  const now = Date.now();
  if (now - lastTap < 300) {
    const overlay = document.getElementById('gridOverlay');
    if (!overlay) return;
    overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
  }
  lastTap = now;
}
document.addEventListener('touchend', touchHandler, { passive: true });
*/

// SO:
window.addEventListener('load', () => {
  console.log('load fired');
  window.scrollTo(0, 0);
  setup();
});

window.addEventListener('load', fitAdText);

let resizeTimer;
function resizeHandler() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
}
window.addEventListener("resize", resizeHandler);

// Cleanup: zerstört ScrollTrigger/ScrollSmoother/GSAP-Animationen und entfernt globale Listener
function destroyAll() {
  try {
    // Kill ScrollTrigger instances
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Kill global GSAP tweens
    if (tickerAnimation) {
      try { tickerAnimation.kill(); } catch (e) { }
      tickerAnimation = null;
    }
    gsap.globalTimeline.clear();
    gsap.killTweensOf('*');

    // Kill ScrollSmoother
    const smoother = ScrollSmoother.get();
    if (smoother) {
      try { smoother.kill(); } catch (e) { }
    }

    // Remove listeners
    document.removeEventListener('keydown', toggleGridHandler);
    document.removeEventListener('touchend', touchHandler);
    window.removeEventListener('resize', resizeHandler);
    if (closeBtn) closeBtn.removeEventListener('click', hideHeadline);

    // Clear timers
    clearTimeout(resizeTimer);
  } catch (err) {
    console.warn('destroyAll error', err);
  }
}

window.addEventListener('pagehide', destroyAll);
window.addEventListener('beforeunload', destroyAll);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') destroyAll();
});

window.addEventListener('load', fitAdText);

let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    window.location.reload();
  }, 2 * 60 * 1000); // 2 Minuten
}

// Bei jeder Interaktion Timer zurücksetzen
['scroll', 'touchstart', 'touchmove', 'click', 'mousemove', 'keydown'].forEach(event => {
  window.addEventListener(event, resetInactivityTimer, { passive: true });
});

// Timer starten
resetInactivityTimer();

console.log('main.js Ende erreicht');