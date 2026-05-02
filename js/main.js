// =============================================
//  MONATAN CENTRAL SPECIALIST HOSPITAL
//  main.js — Navigation, Scroll, Animations
// =============================================

// ===== 1. MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// ===== 2. STICKY HEADER SHADOW ON SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== 3. SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== 4. FADE-IN ANIMATION ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Add fade-in class to cards and sections
document.querySelectorAll('.why__card, .service__card, .doctor__inner, .hero__content').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== 5. ACTIVE NAV LINK =====
// Highlight the current page in the nav
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }

  // ===== TESTIMONIALS SLIDER =====
const testiTrack = document.getElementById('testiTrack');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');
const testiDotsContainer = document.getElementById('testiDots');

if (testiTrack) {
  const cards = testiTrack.querySelectorAll('.testi__card');
  let testiCurrent = 0;

  // Determine visible count by screen
  function visibleCount() {
    if (window.innerWidth < 769) return 1;
    if (window.innerWidth < 1025) return 2;
    return 3;
  }

  function totalPages() {
    return Math.ceil(cards.length / visibleCount());
  }

  // Build dots
  function buildDots() {
    testiDotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const d = document.createElement('button');
      d.className = 'testi__dot' + (i === testiCurrent ? ' active' : '');
      d.addEventListener('click', () => goTesti(i));
      testiDotsContainer.appendChild(d);
    }
  }

  function goTesti(n) {
    testiCurrent = Math.max(0, Math.min(n, totalPages() - 1));
    const cardWidth = cards[0].offsetWidth + 24;
    testiTrack.style.transform = `translateX(-${testiCurrent * cardWidth * visibleCount()}px)`;
    testiDotsContainer.querySelectorAll('.testi__dot').forEach((d, i) => {
      d.classList.toggle('active', i === testiCurrent);
    });
  }

  testiPrev?.addEventListener('click', () => goTesti(testiCurrent - 1));
  testiNext?.addEventListener('click', () => goTesti(testiCurrent + 1));
  window.addEventListener('resize', () => { buildDots(); goTesti(0); });
  buildDots();
}
});

// ===== TESTIMONIALS SLIDER =====
const testiTrack = document.getElementById('testiTrack');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');
const testiDotsContainer = document.getElementById('testiDots');

if (testiTrack) {
  const cards = testiTrack.querySelectorAll('.testi__card');
  let testiCurrent = 0;

  // Determine visible count by screen
  function visibleCount() {
    if (window.innerWidth < 769) return 1;
    if (window.innerWidth < 1025) return 2;
    return 3;
  }

  function totalPages() {
    return Math.ceil(cards.length / visibleCount());
  }

  // Build dots
  function buildDots() {
    testiDotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const d = document.createElement('button');
      d.className = 'testi__dot' + (i === testiCurrent ? ' active' : '');
      d.addEventListener('click', () => goTesti(i));
      testiDotsContainer.appendChild(d);
    }
  }

  function goTesti(n) {
    testiCurrent = Math.max(0, Math.min(n, totalPages() - 1));
    const cardWidth = cards[0].offsetWidth + 24;
    testiTrack.style.transform = `translateX(-${testiCurrent * cardWidth * visibleCount()}px)`;
    testiDotsContainer.querySelectorAll('.testi__dot').forEach((d, i) => {
      d.classList.toggle('active', i === testiCurrent);
    });
  }

  testiPrev?.addEventListener('click', () => goTesti(testiCurrent - 1));
  testiNext?.addEventListener('click', () => goTesti(testiCurrent + 1));
  window.addEventListener('resize', () => { buildDots(); goTesti(0); });
  buildDots();
}

// ===== DARK / LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
});

function updateToggleIcon(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}
