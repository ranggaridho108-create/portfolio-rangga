// ============================================================
// PORTFOLIO – RANGGA MAYRIDHO JAMAN
// Interactive JS
// ============================================================

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---- INTERSECTION OBSERVER (Scroll Animations) ---- */
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedSelectors = [
  '.timeline-item',
  '.position-card',
  '.achievement-item',
  '.soft-skill-item',
  '.hard-skill',
  '[data-aos]',
];
animatedSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => observer.observe(el));
});

/* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--orange)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ---- SMOOTH COUNTER ANIMATION for hero stats ---- */
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const isSpecial = isNaN(parseInt(target));
  if (isSpecial) return; // skip ∞
  const end = parseInt(target);
  const step = end / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.textContent = target; // show original (e.g. "5+")
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(el => {
        animateCounter(el, el.textContent.trim());
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

/* ---- TILT EFFECT ON CARDS ---- */
document.querySelectorAll('.position-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * 6;
    const tiltY = -(x / rect.width) * 6;
    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- TYPED TAGLINE EFFECT ---- */
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const texts = [
    'Student · Developer · Educator · Leader',
    'Multimedia Chief · Community Builder',
    'IoT & STEM Enthusiast · Multi-Award Winner'
  ];
  let idx = 0;
  let charIdx = 0;
  let deleting = false;
  let currentText = '';

  function typeWrite() {
    const target = texts[idx];
    if (!deleting) {
      currentText = target.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === target.length) {
        deleting = true;
        setTimeout(typeWrite, 2200);
        return;
      }
    } else {
      currentText = target.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % texts.length;
      }
    }
    tagline.textContent = currentText;
    setTimeout(typeWrite, deleting ? 40 : 70);
  }
  typeWrite();
}

/* ---- SCROLL PROGRESS BAR ---- */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #FF6B00, #FF8C33);
  z-index: 9999;
  transition: width 0.1s ease;
  width: 0%;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / docH) * 100;
  progressBar.style.width = scrolled + '%';
});

/* ---- PARTICLES IN HERO (subtle dots) ---- */
function createParticle() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const particle = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 6 + 4;
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255,107,0,${Math.random() * 0.4 + 0.1});
    border-radius: 50%;
    pointer-events: none;
    left: ${Math.random() * 100}%;
    bottom: -10px;
    animation: float-up ${duration}s linear forwards;
    z-index: 0;
  `;
  hero.appendChild(particle);
  setTimeout(() => particle.remove(), duration * 1000);
}

// Add keyframe animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes float-up {
    from { transform: translateY(0) scale(1); opacity: 1; }
    to { transform: translateY(-${window.innerHeight}px) scale(0.3); opacity: 0; }
  }
`;
document.head.appendChild(style);
setInterval(createParticle, 600);

console.log('%c🚀 Portfolio – Rangga Mayridho Jaman', 'color:#FF6B00;font-size:16px;font-weight:bold;');
console.log('%cBuilt with passion, code, and creativity.', 'color:#9A9A9A;font-size:12px;');
