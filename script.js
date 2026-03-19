/* ═══════════════════════════════════════════
   SAGE OSSUARY ARTS — Script
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

// Smooth trailing cursor
function animateCursor() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity      = '0';
  cursorTrail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity      = '1';
  cursorTrail.style.opacity = '0.5';
});

// ─── Floating particles ───
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 30;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');

  const size = Math.random() * 2 + 1;
  p.style.width  = size + 'px';
  p.style.height = size + 'px';
  p.style.left   = Math.random() * 100 + 'vw';
  p.style.bottom = '-10px';

  const duration  = 12 + Math.random() * 20;
  const delay     = Math.random() * 15;
  p.style.animationDuration = duration + 's';
  p.style.animationDelay   = delay + 's';
  p.style.opacity = (Math.random() * 0.3).toString();

  // Occasionally make them bone-colored, occasionally sage
  const hue = Math.random();
  if (hue > 0.8) p.style.background = '#7fa87f';
  else if (hue > 0.95) p.style.background = '#b8853e';

  particleContainer.appendChild(p);
}

// ─── Nav scroll state ───
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Mobile nav toggle ───
const navBurger = document.getElementById('navBurger');
navBurger.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
});
// Close mobile nav on link click
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('mobile-open'));
});

// ─── Gallery filter ───
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    galleryCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'cardReveal 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── Scroll reveal (IntersectionObserver) ───
const revealTargets = document.querySelectorAll(
  '.section-header, .gallery-card, .commission-card, .about-inner, .contact-inner, .bone-divider'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger children slightly
  if (el.classList.contains('gallery-card') || el.classList.contains('commission-card')) {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealTargets.forEach(el => observer.observe(el));

// ─── Hero parallax on mouse move ───
const heroContent = document.querySelector('.hero-content');
const heroBoneFrame = document.querySelector('.hero-bone-frame');

document.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx; // -1 to 1
  const dy = (e.clientY - cy) / cy;

  if (heroContent) {
    heroContent.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`;
  }
  if (heroBoneFrame) {
    heroBoneFrame.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
  }
});

// ─── Gallery card CSS keyframe injection ───
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes cardReveal {
    from { opacity: 0.3; transform: scale(0.97); }
    to   { opacity: 1;   transform: scale(1);    }
  }
`;
document.head.appendChild(styleSheet);

// ─── Smooth scroll for nav links ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
