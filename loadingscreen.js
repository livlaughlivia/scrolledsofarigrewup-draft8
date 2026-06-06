gsap.registerPlugin(MorphSVGPlugin);

// Konvertiert circle und rect zu paths bevor der Morph startet
MorphSVGPlugin.convertToPath("circle, rect");

// Morph-Animation
const morphTl = gsap.timeline({ repeat: -1 });

morphTl.to("#icon-morph", { 
    duration: 0.8, 
    morphSVG: "#icon-era2-ref",  // Kreis
    ease: "power2.inOut" 
  })
  .to("#icon-morph", { 
    duration: 0.8, 
    morphSVG: "#icon-era3-ref",  // Quadrat
    ease: "power2.inOut",
    delay: 0.3
  })
  .to("#icon-morph", { 
    duration: 0.8, 
    morphSVG: "#icon-morph",
    ease: "power2.inOut",
    delay: 0.3
  });

  // Statt setTimeout mit fester Zeit:
Promise.all([
  document.fonts.ready,
  new Promise(resolve => {
    const imgs = document.querySelectorAll('.post-wrapper img');
    const first10 = [...imgs].slice(0, 10); // erste 10 Bilder abwarten
    let loaded = 0;
    first10.forEach(img => {
      if (img.complete) { loaded++; if (loaded === first10.length) resolve(); }
      else img.addEventListener('load', () => { loaded++; if (loaded === first10.length) resolve(); });
    });
    setTimeout(resolve, 3000); // max 3 Sekunden warten
  })
  
]).then(() => {
  morphTl.kill();
  
  gsap.timeline()
    .to('.loading-icon', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to('.loading-screen', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        document.querySelector('.loading-screen').style.display = 'none';
      }
    }, '-=0.2');
});
