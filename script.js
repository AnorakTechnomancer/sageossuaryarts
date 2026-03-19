/* ═══════════════════════════════════════════
   SAGE OSSUARY ARTS — Script v3
════════════════════════════════════════════ */

// ─── Footer year ───
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Custom cursor ───
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let trailX = 0, trailY = 0, mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateCursor() {
  trailX += (mouseX - trailX) * 0.11;
  trailY += (mouseY - trailY) * 0.11;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = cursorTrail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorTrail.style.opacity = '0.5';
});

// ─── Particles — ember red palette ───
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 32; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 2 + 1;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}vw;
    bottom:-10px;
    animation-duration:${12 + Math.random() * 22}s;
    animation-delay:${Math.random() * 18}s;
  `;
  const r = Math.random();
  p.style.background = r > 0.88 ? '#c8594a' : r > 0.7 ? '#8b0000' : r > 0.55 ? '#5a1010' : '#3a0808';
  particleContainer.appendChild(p);
}

// ─── Nav scroll state ───
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');

const updateNav = () => {
  const scrolled = window.scrollY > 30;
  nav.classList.toggle('scrolled', scrolled);
};
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── Mobile nav ───
const navBurger = document.getElementById('navBurger');
navBurger.addEventListener('click', () => nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav-mobile-link').forEach(l =>
  l.addEventListener('click', () => nav.classList.remove('mobile-open'))
);

// ─── Gallery filter ───
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-card').forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
      if (show) card.style.animationDelay = (i % 4) * 0.06 + 's';
    });
  });
});

// ─── Scroll reveal ───
const revealTargets = document.querySelectorAll(
  '.section-header, .gallery-card, .commission-card, .about-inner, .contact-inner, .bone-divider'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  if (el.classList.contains('gallery-card') || el.classList.contains('commission-card')) {
    el.style.transitionDelay = (i % 4) * 0.07 + 's';
  }
});
new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
).observe
// Replace with proper loop:
;
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
revealTargets.forEach(el => revealObserver.observe(el));

// ─── Hero parallax on mouse ───
const heroContent  = document.querySelector('.hero-content');
const heroBoneFrame = document.querySelector('.hero-bone-frame');
const heroBg        = document.querySelector('.hero-bg');

document.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  if (heroContent)   heroContent.style.transform   = `translate(${dx * 5}px, ${dy * 3}px)`;
  if (heroBoneFrame) heroBoneFrame.style.transform = `translate(${dx * 14}px, ${dy * 9}px)`;
  if (heroBg)        heroBg.style.transform        = `translate(${dx * 6}px, ${dy * 4}px)`;
});

// ─── Scroll parallax: hero content lifts gently as user scrolls ───
//     This is what creates the cinematic "camera pull-up" into the gallery
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const heroH = hero ? hero.offsetHeight : window.innerHeight;
  if (sy < heroH && heroContent) {
    // Content moves up slightly faster than scroll = parallax lift
    heroContent.style.transform = `translateY(${sy * 0.18}px)`;
    // Bone frame drifts even faster for depth
    if (heroBoneFrame) heroBoneFrame.style.transform = `translateY(${sy * 0.28}px)`;
    // Fade hero content out as we leave it
    const fadeProgress = Math.min(sy / (heroH * 0.55), 1);
    heroContent.style.opacity = (1 - fadeProgress * 0.7).toString();
  }
}, { passive: true });

// ─── Smooth scroll ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── Gallery card reveal animation keyframe ───
const s = document.createElement('style');
s.textContent = `@keyframes cardReveal { from { opacity:0.2; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }`;
document.head.appendChild(s);
