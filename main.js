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
    text: `««Grosser Regenschirm» für die beschädigte Kathedrale» SRF News, 16. April 2019 ✦`
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

  if (!tickerAnimation) {
    // Erster Aufruf: normal starten
    const doubled = `${text}   ${text}`;
    wrapper.innerHTML = `<span class="ticker-inner">${doubled}</span>`;
    const inner = wrapper.querySelector('.ticker-inner');
    const fullWidth = inner.scrollWidth / 2;
    gsap.set(inner, { x: 0 });
    tickerAnimation = gsap.to(inner, {
      x: -fullWidth,
      duration: fullWidth / 80,
      ease: 'none',
      repeat: -1,
    });
    return;
  }

// Folgeaufrufe: Text anhängen ohne Animation zu unterbrechen
  const inner = wrapper.querySelector('.ticker-inner');
  if (!inner) return;

  // Aktuellen X-Fortschritt merken
  const currentX = gsap.getProperty(inner, 'x');

  // Neuen Text setzen
  const doubled = `${text}   ${text}`;
  inner.textContent = doubled;

  // Neue Breite berechnen
  const fullWidth = inner.scrollWidth / 2;

  // Animation mit gleicher Geschwindigkeit neu starten ab aktuellem X
  tickerAnimation.kill();
  gsap.set(inner, { x: currentX });
  tickerAnimation = gsap.to(inner, {
    x: -fullWidth,
    duration: (fullWidth + currentX) / 80, // restliche Distanz
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
  if (window.isNavigating) return;
  if (headlineActive) return; // ← verhindert doppeltes Auslösen

  const trigger = document.getElementById(triggerId);
  if (!trigger) return;

  headlineActive = true; // ← setzen

  const era = trigger.dataset.era || '1';
  const textEl = document.querySelector('[class^="headline-text-era"]');
  const authorEl = document.querySelector('[class^="headline-author"]');

  // Null-Checks: wenn Elemente nicht existieren, breche ab
  if (!textEl || !authorEl ) {
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
  document.querySelectorAll('[id^="quote-trigger-"]').forEach(triggerEl => {
    ScrollTrigger.create({
      trigger: triggerEl,
      start: "top 90%",
      onEnter: () => showHeadline(triggerEl.id),
      onEnterBack: () => showHeadline(triggerEl.id)
    });
  });
}

const closeBtn = document.querySelector('.close-headline-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', hideHeadline);
}


// ── MARK: Intro ───────────────────────────────────────────────
function initIntro() {
  const blocks = document.querySelectorAll('#intro .intro-block');
  console.log('initIntro läuft, blocks gefunden:', blocks.length);

  let currentBlock = -1;

  // SplitText-Ergebnisse einmalig erzeugen (vermeidet mehrfaches Parsen)
  const splits = [...blocks].map(block => SplitText.create(block, { type: "chars,words" }));
  gsap.set(blocks, { opacity: 0 });

  function showBlock(index) {
    const block = blocks[index];
    const split = splits[index];
    if (!block || !split) return;
    gsap.set(block, { opacity: 1 });
    gsap.from(split.chars, {
      opacity: 0,
      duration: 0.05,
      stagger: 0.03,
      ease: "power2.out"
    });
  }

  ScrollTrigger.create({
    trigger: '#intro',
    start: 'top top',
    end: `+=${blocks.length * 550}`,
    pin: true,
    pinSpacing: true,
    onEnter: () => {
      if (currentBlock === -1) {
        currentBlock = 0;
        showBlock(0);
      }
    },
    onLeave: () => {
      gsap.to(blocks[currentBlock], { opacity: 0, duration: 0.1 });
      currentBlock = -1;
    },
    onUpdate: (self) => {
      const index = Math.floor(self.progress * (blocks.length + 1));
      const clamped = Math.min(index, blocks.length - 1);

      if (clamped !== currentBlock) {
        if (currentBlock >= 0) {
          gsap.to(blocks[currentBlock], { opacity: 0, duration: 0.3 });
        }
        currentBlock = clamped;
        showBlock(currentBlock);
      }
    }
  });
}

function setup() {
  // Titel ausblenden
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
  initIntro();

  // ── Sidebar einblenden beim ersten Post
  ScrollTrigger.create({
    trigger: '#j-2016 .post-wrapper',
    start: 'top 80%',
    onEnter: () => {
      const sideBar = document.getElementById('side-bar');
      sideBar.classList.add('is-open');
      setTimeout(() => {
        sideBar.classList.remove('is-open');
      }, 1000);
    },
    once: true
  });

  // Erster Text beim Eintreten in den Feed
  ScrollTrigger.create({
    trigger: '#j-2016',
    start: 'top 80%',
    onEnter: () => {
      gsap.set('.quote-wrapper', { opacity: 1, visibility: 'visible' });
      setupTicker(tickerSegments[0].text);
    },
    onEnterBack: () => setupTicker(tickerSegments[0].text)
  });

  // Ticker-Wechsel bei weiteren Segmenten (ASYNC/BATCHED)
  // Batch ScrollTrigger creation to avoid long blocking tasks
  const tickersToCreate = tickerSegments.slice(1);
  const batchSize = 5; // Create 5 triggers per batch
  
  function createTickerBatch(startIndex) {
    const endIndex = Math.min(startIndex + batchSize, tickersToCreate.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const segment = tickersToCreate[i];
      const triggerEl = document.getElementById(segment.triggerId);
      if (!triggerEl) continue;
      
      ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top 80%',
        onEnter: () => setupTicker(segment.text),
        onEnterBack: () => setupTicker(segment.text),
      });
    }
    
    // Schedule next batch if more remain
    if (endIndex < tickersToCreate.length) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => createTickerBatch(endIndex));
      } else {
        setTimeout(() => createTickerBatch(endIndex), 50);
      }
    }
  }
  
  // Delay ticker batch creation to after initial setup
  setTimeout(() => {
    createTickerBatch(0);
  }, 100);

  // Quote-Triggers (Gen Z Kommentare als grosse Headlines)
  initHeadlines();
  gsap.set('#headline-timer-line', { drawSVG: '0%' });
}

// Ticker ausblenden am Ende jedes Jahres
['#era-1', '#era-2', '#era-3'].forEach(id => {
  const section = document.querySelector(id);
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: 'bottom 80%',
    onLeave: () => {
      gsap.to('.quote-wrapper', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    },
    onEnterBack: () => {
      gsap.to('.quote-wrapper', { opacity: 1, visibility: 'visible', duration: 0.5 });
    }
  });
});

// ── MARK: GRID ────────────────────────────────────────────────

// Benannte Handler, damit sie später sauber entfernt werden können
function toggleGridHandler(e) {
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

document.fonts.ready.then(() => {
  // Defer heavy initialization to avoid blocking main thread
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setup();
      }, 100);
    });
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setup();
    }, 100);
  }
});

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
      try { tickerAnimation.kill(); } catch (e) {}
      tickerAnimation = null;
    }
    gsap.globalTimeline.clear();
    gsap.killTweensOf('*');

    // Kill ScrollSmoother
    const smoother = ScrollSmoother.get();
    if (smoother) {
      try { smoother.kill(); } catch (e) {}
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