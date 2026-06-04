gsap.registerPlugin(ScrollToPlugin);

const sideBar = document.querySelector('.side-bar');
const links = [...document.querySelectorAll('.side-bar a[href]')];
let activeLink = null;
let isTouchScrolling = false;
let swipeStartX = 0;
let swipeStartY = 0;

function navigateTo(link) {
  const hash = link.getAttribute('href');
  const target = hash ? document.querySelector(hash) : null;
  if (!target) return;

  links.forEach(l => l.classList.remove('nav-active'));
  link.classList.add('nav-active');
  activeLink = link;

  window.isNavigating = true;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    const scrollPos = smoother.offset(target, "center center");
    smoother.scrollTo(scrollPos, true);
    setTimeout(() => { window.isNavigating = false; }, 800);
  } else {
    const offset = target.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (target.offsetHeight / 2);
    gsap.to(window, {
      scrollTo: offset,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => { window.isNavigating = false; }
    });
  }
}

// Rest bleibt gleich
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link);
    setTimeout(() => {
      sideBar.classList.remove('is-open');
    }, 100);
  });
});

let lastMoveTime = 0;
sideBar.addEventListener('touchmove', e => {
  e.preventDefault();
  const now = Date.now();
  if (now - lastMoveTime < 300) return;
  lastMoveTime = now;

  if (isTouchScrolling) return;
  isTouchScrolling = true;
  setTimeout(() => { isTouchScrolling = false; }, 800);

  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  const link = el?.closest('a[href]');
  if (link && link !== activeLink) {
    navigateTo(link);
  }
}, { passive: false });

document.addEventListener('touchstart', (e) => {
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const diffX = swipeStartX - endX;
  const diffY = Math.abs(swipeStartY - endY);
  const startedNearRight = swipeStartX > window.innerWidth - 60;

  if (diffY > 40) return;

  if (startedNearRight && diffX > 30) {
    sideBar.classList.add('is-open');
    return;
  }

  if (diffX < -30 && sideBar.classList.contains('is-open')) {
    sideBar.classList.remove('is-open');
    return;
  }

  if (sideBar.classList.contains('is-open') && !sideBar.contains(e.target)) {
    setTimeout(() => {
      sideBar.classList.remove('is-open');
    }, 150);
  }
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') {
    sideBar.classList.toggle('is-open');
  }
});