/* ── SCROLL FADE ANIMATIONS ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger siblings
      const siblings = e.target.parentElement.querySelectorAll('.fade-up');
      siblings.forEach((el, idx) => {
        if (el === e.target) {
          el.style.transitionDelay = (idx * 0.07) + 's';
        }
      });
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── NAV SCROLL SHADOW ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(10,10,15,0.95)';
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
  } else {
    navbar.style.background = 'rgba(10,10,15,0.8)';
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.07)';
  }
}, { passive: true });

/* ── MOBILE DRAWER ── */
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', () => {
  drawer.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (drawer.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

function closeDrawer() {
  drawer.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

/* ── HIRE ME DIALOG ── */
function openHireDialog() {
  document.getElementById('hireDialog').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeHireDialog(e) {
  if (!e || e.target === document.getElementById('hireDialog') || e.currentTarget.classList.contains('dialog-close')) {
    document.getElementById('hireDialog').classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeHireDialog();
});

/* ── CERTIFICATION SLIDER ── */
(function initCertSlider() {
  const track = document.getElementById('certTrack');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.cert-slide'));
  const total = slides.length;
  const dotsContainer = document.getElementById('certDots');
  const prevBtn = document.getElementById('certPrev');
  const nextBtn = document.getElementById('certNext');

  let current = 0;
  let autoTimer = null;
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let slideWidth = 0;

  // Clone slides for infinite-feel (prepend last, append first)
  const clonesBefore = slides.map(s => s.cloneNode(true));
  const clonesAfter = slides.map(s => s.cloneNode(true));
  clonesBefore.reverse().forEach(c => track.prepend(c));
  clonesAfter.forEach(c => track.append(c));

  const allSlides = Array.from(track.querySelectorAll('.cert-slide'));

  function getSlideWidth() {
    const s = allSlides[total]; // first real slide
    return s ? s.offsetWidth + 20 : 320; // 20 = gap
  }

  function goTo(index, animate = true) {
    if (!animate) track.style.transition = 'none';
    else track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';

    current = ((index % total) + total) % total;
    slideWidth = getSlideWidth();
    const offset = (current + total) * slideWidth; // offset by clones
    track.style.transform = `translateX(-${offset}px)`;

    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.cert-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Build dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'cert-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsContainer.appendChild(dot);
  }

  // Handle infinite loop snapping
  track.addEventListener('transitionend', () => {
    // re-snap without animation
    if (current === 0 || current === total - 1) {
      goTo(current, false);
      // force reflow
      track.getBoundingClientRect();
      track.style.transition = '';
    }
  });

  // Init position
  setTimeout(() => {
    slideWidth = getSlideWidth();
    goTo(0, false);
    track.style.transition = '';
  }, 50);

  window.addEventListener('resize', () => {
    slideWidth = getSlideWidth();
    goTo(current, false);
  });

  // Buttons
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Auto-play
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 3000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }
  startAuto();

  // Drag / touch support
  const wrap = track.parentElement;

  function onDragStart(x) {
    isDragging = true;
    startX = x;
    slideWidth = getSlideWidth();
    const mat = new WebKitCSSMatrix(getComputedStyle(track).transform);
    startScrollLeft = mat.m41;
    track.style.transition = 'none';
    clearInterval(autoTimer);
  }
  function onDragMove(x) {
    if (!isDragging) return;
    const dx = x - startX;
    track.style.transform = `translateX(${startScrollLeft + dx}px)`;
  }
  function onDragEnd(x) {
    if (!isDragging) return;
    isDragging = false;
    const dx = x - startX;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
    startAuto();
  }

  wrap.addEventListener('mousedown', e => onDragStart(e.clientX));
  window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
  window.addEventListener('mouseup', e => onDragEnd(e.clientX));

  wrap.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
  wrap.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), { passive: true });
  wrap.addEventListener('touchend', e => onDragEnd(e.changedTouches[0].clientX));

  // Pause on hover
  wrap.addEventListener('mouseenter', () => clearInterval(autoTimer));
  wrap.addEventListener('mouseleave', startAuto);
})();

/* ── ACTIVE NAV LINK ON SCROLL ── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => spy.observe(s));
})();

/* ── SKILL CARD GLOW ON HOVER ── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(124,106,255,0.08) 0%, var(--surface) 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ── PROJECT CARD TILT ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `translateY(-5px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
