gsap.registerPlugin(SplitText, ScrollTrigger);

let split, animation;

function setup() {
  split && split.revert();
  animation && animation.revert();
  
  split = SplitText.create(".text", { type: "chars,words,lines" });

  animation = gsap.from(split.lines, {
    rotationX: 0,
    transformOrigin: "50% 50% -160px",
    opacity: 0,
    duration: 0.7,
    ease: "power3",
    stagger: 0.25,
    scrollTrigger: {
      trigger: ".text",
      start: "top 80%",  // startet wenn .text 80% vom oberen Viewport-Rand erreicht
      toggleActions: "play none none none"
    }
  });
}

setup();
window.addEventListener("resize", setup);