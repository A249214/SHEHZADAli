// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('hidden');
  }, 1900);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // scroll-to-top visibility
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
  // active nav link
  updateActiveNav();
});

// ===== SCROLL TO TOP =====
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

// ===== TYPED TEXT =====
const words = ['UI/UX Designer', 'Frontend Developer', 'React Developer', 'Web Designer'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function type() {
  const word = words[wi];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== SKILL BARS ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width;
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));

// ===== WORKS FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.display = match ? '' : 'none';
    });
  });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testiTrack');
const dotsContainer = document.getElementById('testiDots');
const cards = track.querySelectorAll('.testi-card');
let current = 0;
const perView = window.innerWidth <= 768 ? 1 : 2;
const total = Math.ceil(cards.length / perView);

for (let i = 0; i < total; i++) {
  const d = document.createElement('div');
  d.className = 'testi-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(d);
}

function goTo(idx) {
  current = idx;
  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${current * perView * cardWidth}px)`;
  dotsContainer.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === current));
}
setInterval(() => goTo((current + 1) % total), 4000);

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = 'Message Sent! <i class="fa fa-check"></i>';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = 'Send Me Message <i class="fa fa-paper-plane"></i>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===== STAGGERED SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// add reveal class to all animatable elements
const revealSelectors = [
  '.service-card', '.skill-item', '.work-item', '.blog-card',
  '.pricing-card', '.testi-card', '.timeline-item', '.edu-card',
  '.about-left', '.about-right', '.contact-info', '.contact-form',
  '.section-title', '.section-tag'
];
document.querySelectorAll(revealSelectors.join(',')).forEach((el, i) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// section tags get tagPop animation
document.querySelectorAll('.section-tag').forEach(tag => {
  const tagObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { tag.classList.add('animate'); tagObs.unobserve(tag); }
    });
  }, { threshold: 0.5 });
  tagObs.observe(tag);
});
