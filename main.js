document.addEventListener('DOMContentLoaded', () => {

 

  // ── Quote subtitle-style chunking ─────────────────────
  const quote = document.querySelector('.quote-block-1');
  const originalInner = quote ? quote.querySelector('.quote-inner') : null;
  if (quote && originalInner) {
    let qLineHeight = 0;
    let chunkHeight = 0;
    let chunkCount = 1;
    let clones = [];
    let currentIndex = 0;
    let quoteTicking = false;
    let section = quote.closest('section') || document.querySelector('main.app');

    function clearClones() {
      clones.forEach(c => c.remove());
      clones = [];
    }

    function recalcQuote() {
      const computed = window.getComputedStyle(originalInner);
      qLineHeight = parseFloat(computed.lineHeight) || (parseFloat(window.getComputedStyle(quote).fontSize) * 1.1);
      chunkHeight = Math.max(20, Math.round(qLineHeight * 3));
      quote.style.height = chunkHeight + 'px';
      const fullHeight = originalInner.scrollHeight;
      chunkCount = Math.max(1, Math.ceil(fullHeight / chunkHeight));

      // rebuild clones
      clearClones();
      for (let i = 0; i < chunkCount; i++) {
        const clone = document.createElement('div');
        clone.className = 'quote-clone';
        clone.style.position = 'absolute';
        clone.style.top = '0';
        clone.style.left = '0';
        clone.style.width = '100%';
        clone.style.height = '100%';
        clone.style.pointerEvents = 'none';
        clone.style.opacity = i === 0 ? '1' : '0';
        clone.style.transition = 'opacity 240ms linear';

        const wrapper = document.createElement('div');
        wrapper.innerHTML = originalInner.innerHTML;
        wrapper.style.transform = `translateY(-${i * chunkHeight}px)`;
        wrapper.style.willChange = 'transform';
        clone.appendChild(wrapper);
        quote.appendChild(clone);
        clones.push(clone);
      }

      // hide original visually but keep it for measurements
      originalInner.style.visibility = 'hidden';
      originalInner.style.pointerEvents = 'none';
      currentIndex = 0;
      console.debug('quote chunks:', chunkCount, 'chunkHeight:', chunkHeight, 'fullHeight:', originalInner.scrollHeight);

    }

    function showIndex(idx) {
      idx = Math.max(0, Math.min(chunkCount - 1, idx));
      if (idx === currentIndex) return;
      clones[currentIndex].style.opacity = '0';
      clones[idx].style.opacity = '1';
      currentIndex = idx;
    }

    function onScrollQuote() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const secTop = section.getBoundingClientRect().top + window.scrollY;
      const secHeight = section.offsetHeight;
      const progress = Math.min(1, Math.max(0, (scrollY - secTop + vh) / (secHeight + vh)));
      const idx = Math.round(progress * (chunkCount - 1));
      showIndex(idx);
      quoteTicking = false;
    }

    recalcQuote();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(recalcQuote);
    window.addEventListener('resize', recalcQuote);
    window.addEventListener('scroll', () => {
      if (!quoteTicking) {
        requestAnimationFrame(onScrollQuote);
        quoteTicking = true;
      }
    });
  }
  const introText = "Internet was a place, now it is a moment. Think of the home computer, that was located in the family living room. That internet is a place that I and the majority of gen Z never knew. We are digital natives meaning we grew up, when the internet already existed. Still it was fascinating, hypnotizing and idealized, when we first met the Internet. But during the past 10 years a lot of things happened. We grew up and so did the internet. Well sort of at least. And exactly this strange relationship awaits you in the following scrolls.";

const typingEl = document.querySelector('#intro-typing');
if (typingEl) {
  let i = 0;
  typingEl.textContent = '';
  const interval = setInterval(() => {
    typingEl.textContent += introText[i];
    i++;
    if (i >= introText.length) clearInterval(interval);
  }, 30); // 30ms pro Buchstabe — kleiner = schneller
}
});
