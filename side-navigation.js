gsap.registerPlugin(ScrollToPlugin);

const sideBar = document.querySelector('.side-bar');
const links = [...document.querySelectorAll('.side-bar a[href]')];
let activeLink = null;

function navigateTo(link) {
  const hash = link.getAttribute('href');
  const target = hash ? document.querySelector(hash) : null;
  if (!target) return;


  // Aktiven Link markieren
  links.forEach(l => l.classList.remove('nav-active'));
  link.classList.add('nav-active');
  activeLink = link;

  // Scrollen
  if (window.smoother) {
    window.smoother.scrollTo(target, true);
  } else {
    gsap.to(window, { scrollTo: target, duration: 1, ease: 'power2.inOut' });
  }
}

// Click
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link);
  });
});

// Touch slide — navigiert beim Berühren eines Links
sideBar.addEventListener('touchmove', e => {
  e.preventDefault();
  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  const link = el?.closest('a[href]');
  if (link && link !== activeLink) {
    // Vorheriges zurücksetzen
    if (activeLink && activeLink.dataset.short) {
      activeLink.textContent = activeLink.dataset.short;
    }
    // Neues expandieren
    if (link.dataset.full) {
      link.dataset.short = link.textContent;
      link.textContent = link.dataset.full;
    }
    navigateTo(link);
  }
}, { passive: false });

sideBar.addEventListener('touchend', () => {
  if (activeLink && activeLink.dataset.short) {
    setTimeout(() => {
      activeLink.textContent = activeLink.dataset.short;
    }, 1500);
  }
});

// Swipe öffnen (rechter Rand)
const scrollContent = document.getElementById('smooth-content') || document;
let touchStartX = 0;

scrollContent.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

scrollContent.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  const startedNearRight = touchStartX > window.innerWidth - 60;

  if (startedNearRight && diff > 30) {
    sideBar.classList.add('is-open');
  }
  if (diff < -30 && sideBar.classList.contains('is-open')) {
    sideBar.classList.remove('is-open');
  }
});

// Taste M
document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') {
    sideBar.classList.toggle('is-open');
  }
});