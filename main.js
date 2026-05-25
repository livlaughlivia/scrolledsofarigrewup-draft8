gsap.registerPlugin(SplitText, ScrollTrigger);

let splitIntro, animationIntro, splitQuote;

function setupQuotes() {
  splitQuote && splitQuote.revert();
  ScrollTrigger.getAll().filter(t => t.vars.id?.startsWith("quote-block1")).forEach(t => t.kill());

  splitQuote = SplitText.create(".quote-block-1", { type: "lines" });
  const lines = splitQuote.lines;
  const linesPerPage = 3;
  const totalPages = Math.ceil(lines.length / linesPerPage);

  // Alle Zeilen verstecken
  gsap.set(lines, { opacity: 1, display: "none" });

  // Scroll-Sektionen dynamisch erstellen
  const wrapper = document.querySelector(".scroll-sections");
  wrapper.innerHTML = ""; // reset bei resize
  for (let i = 0; i < totalPages; i++) {
    const section = document.createElement("div");
    section.classList.add("scroll-section");
    section.style.minHeight = "100vh";
    wrapper.appendChild(section);

    const pageLines = lines.slice(i * linesPerPage, (i + 1) * linesPerPage);
    const prevLines = i > 0 ? lines.slice((i - 1) * linesPerPage, i * linesPerPage) : [];
    const nextLines = lines.slice((i + 1) * linesPerPage, (i + 2) * linesPerPage);

    ScrollTrigger.create({
      id: `quote-block1${i}`,
      trigger: section,
      start: "top center",
      onEnter: () => {
        gsap.set(prevLines, { opacity: 0, display: "none" });
        gsap.set(pageLines, { display: "block" });
        gsap.from(pageLines, { opacity: 0, duration: 0.5, stagger: 0.1 });
      },
      onEnterBack: () => {
        gsap.set(nextLines, { opacity: 0, display: "none" });
        gsap.set(pageLines, { display: "block" });
        gsap.from(pageLines, { opacity: 0, duration: 0.5, stagger: 0.1 });
      }
    });
  }
}

function setup() {
  // Intro Text (chars)
  splitIntro && splitIntro.revert();
  animationIntro && animationIntro.revert();

  splitIntro = SplitText.create(".intro-text", { type: "chars,words,lines" });
  animationIntro = gsap.from(splitIntro.chars, {
    opacity: 0,
    duration: 0.1,
    ease: "power4",
    stagger: 0.04,
    scrollTrigger: {
      trigger: ".intro-text",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  setupQuotes();
}

document.fonts.ready.then (() => {
  setup();
});

window.addEventListener("resize", setup);