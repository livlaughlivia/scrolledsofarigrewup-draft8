gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVGPlugin);

// Linie initial verstecken
gsap.set('#headline-timer-line', { drawSVG: '0%' });

let splitIntro, animationIntro, splitQuote;


//--- MARK: QUOTES ---
const eraQuotes = {
  era1: `
    <span class="quote-line">@Visual-Sun-6018:</span>
    <span class="quote-line">Honestly I miss how unpolished everything felt. Posts didn't have to educate,
        convert or "add value". People just posted vibes, blurry photos, inside jokes.</span>
    <span class="divider">✦</span>
    <span class="quote-line">@CharlesIntheWoods:</span>
      <span class="quote-line">If anything, my life was more social media-centered than it is now. People posted more frequently in 2016, in 2026 people don't post a soften but consume
        just as much.</span>
      <span class="divider">✦</span>
      <span class="quote-line">@didozer10:</span>
      <span class="quote-line">Photo dumps were very common a decade ago. People were still chronically online, the only
        difference is that the influencer craze was just beginning.</span>
        <span class="divider">✦</span>
      <span class="quote-line">@ConsumerofToons:</span>
      <span class="quote-line">It was just as social media centered. It’s just that pop culture was different.</span>
 
      <span class="divider">✦</span>
      <span class="quote-line">@imboredtho:</span>
      <span class="quote-line">Very fun time…I was optimistic about the world and the music was fun (soundcloud era). I could would go to McDonalds after class and get Mcdouble combo plus an extra mcdouble for 6ish dollars. I miss 2017.</span>
      <span class="divider">✦</span>
      <span class="quote-line">@Cui17</span>
      <span class="quote-line">I was a junior in high school in 2017. I remember the Nintendo Switch coming out and Snapchat being my main social media. I honestly really miss 2016-early 2020. Those were special times that I took for granted.</span>
      <span class="divider">✦</span>
      <span class="quote-line">@Trusteveryboody</span>
      <span class="quote-line">Photos from this time are nostalgic.</span>
      

  `,
  era2: `
    <span class="quote-line">@CharlesIntheWoods:</span>
    <span class="quote-line">People posted more frequently in 2016...</span>
    <span class="divider">✦</span>
  `,
  era3: `
    <span class="quote-line">@didozer10:</span>
    <span class="quote-line">Photo dumps were very common a decade ago...</span>
  `
};

let currentEra = "era1";

let tickerAnimation = null;

function setupQuotes(era = "era1") {
  const wrapper = document.querySelector(".quote-block-1");
  if (!wrapper) return;

  // Laufende Animation stoppen
  if (tickerAnimation) tickerAnimation.kill();

  wrapper.classList.remove("q-era1", "q-era2", "q-era3");
  wrapper.classList.add(`q-${era}`);

  // Text als einzelne Zeile
  const text = eraQuotes[era]
    .replace(/<[^>]+>/g, '') // HTML-Tags entfernen
    .replace(/\s+/g, ' ')
    .trim();

  // Zwei Kopien für nahtlosen Loop
  wrapper.innerHTML = `<span class="ticker-inner">${text} &nbsp;&nbsp;&nbsp; ${text}</span>`;

  const inner = wrapper.querySelector('.ticker-inner');
  const fullWidth = inner.scrollWidth / 2;

  gsap.set(inner, { x: 0 });

  tickerAnimation = gsap.to(inner, {
    x: -fullWidth,
    duration: fullWidth / 80, // Geschwindigkeit anpassen
    ease: 'none',
    repeat: -1,
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


// ── MARK: HEADLINE ────────────────────────────────────────────
function showHeadline(triggerId) {
  const trigger = document.getElementById(triggerId);
  if (!trigger) return;

  document.querySelector('.headline-text-era1').textContent =
    trigger.dataset.headlineText;
  document.querySelector('.headline-author1').textContent =
    trigger.dataset.headlineAuthor;
  document.querySelector('.headline-context').textContent =
    trigger.dataset.headlineContext || '';

  gsap.killTweensOf('#headline-timer-line');
  gsap.set('#headline-timer-line', { drawSVG: '0%' });

  // Scrollen pausieren
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(true);

  gsap.to('.gradient-headline', {
    opacity: 1, visibility: 'visible', duration: 1,
    onComplete: () => {
      document.querySelector('.gradient-headline').style.pointerEvents = 'all';
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
            // Scrollen wieder aktivieren nach Timer
            const smoother = ScrollSmoother.get();
            if (smoother) smoother.paused(false);
          }
        });
      }
    }
  );
}

function hideHeadline() {
  gsap.killTweensOf('#headline-timer-line');
  gsap.to('.gradient-headline', { opacity: 0, visibility: 'hidden', duration: 0.3 });
  document.querySelector('.gradient-headline').style.pointerEvents = 'none';
  // Scrollen wieder aktivieren
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(false);
}

function initHeadlines() {
  document.querySelectorAll('[id^="headline-trigger-"]').forEach(triggerEl => {
    ScrollTrigger.create({
      trigger: triggerEl,
      start: "top 80%",
      onEnter: () => showHeadline(triggerEl.id),
      onLeave: () => hideHeadline(),
      onEnterBack: () => showHeadline(triggerEl.id),
      onLeaveBack: () => hideHeadline()
    });
  });
}

const closeBtn = document.querySelector('.close-headline-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    hideHeadline();
  });
}


// ── MARK: Intro ───────────────────────────────────────────────
function initIntro() {
  const blocks = document.querySelectorAll('#intro .intro-block');
  console.log('initIntro läuft, blocks gefunden:', blocks.length);

  let currentBlock = -1;

  gsap.set(blocks, { opacity: 0 });

  function showBlock(index) {
    const block = blocks[index];
    const split = SplitText.create(block, { type: "chars,words" });
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
    end: `+=${blocks.length * 400}`,
    pin: true,
    pinSpacing: true,
    onEnter: () => {
      if (currentBlock === -1) {
        currentBlock = 0;
        showBlock(0);
      }
    },
    onLeave: () => {
      gsap.to(blocks[currentBlock], { opacity: 0, duration: 0.3 });
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

  initEraTitles1();
  initEraTitles2();
  initEraTitles3();
  initIntro();

  // Quotes
  ScrollTrigger.create({
    trigger: "#j-2016",
    start: "top 80%",
    onEnter: () => {
      gsap.set(".quote-wrapper", { opacity: 1, visibility: "visible" });
      setupQuotes("era1");
    },
    onEnterBack: () => {
      gsap.set(".quote-wrapper", { opacity: 1, visibility: "visible" });
      setupQuotes("era1");
    }
  });


  ScrollTrigger.create({
    trigger: "#era-2",
    start: "top center",
    onEnter: () => setupQuotes("era2"),
    onEnterBack: () => setupQuotes("era2")
  });

  ScrollTrigger.create({
    trigger: "#era-3",
    start: "top center",
    onEnter: () => setupQuotes("era3"),
    onEnterBack: () => setupQuotes("era3")
  });

  ScrollTrigger.create({
    trigger: "#j-2016",
    start: "top 80%",
    onLeaveBack: () => {
      gsap.set(".quote-wrapper", { opacity: 0, visibility: "hidden" });
    }
  });

  // Headlines
  initHeadlines();
  gsap.set('#headline-timer-line', { drawSVG: '0%' });
}

// MARK: GRID
document.addEventListener('keydown', (e) => {
  if (e.key === 'g' || e.key === 'G') {
    const overlay = document.getElementById('gridOverlay');
    overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
  }
});

document.fonts.ready.then(() => {
  window.scrollTo(0, 0);
  setup();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});