// Nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.card, .claim-row, .stat-card, .market-card, .swot-card, .axis-card, .phase-card, .crisis-card, .contrib-card, .conclusion-item, .kpi-branch, .lo-card, .inf-tier, .principle-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => { el.classList.add('hidden-before'); revealObserver.observe(el); });

// Inject reveal styles
const style = document.createElement('style');
style.textContent = `
.hidden-before { opacity:0; transform:translateY(20px); transition: opacity .5s ease, transform .5s ease; }
.revealed { opacity:1 !important; transform:none !important; }
.nav-links a.active { color: var(--gold) !important; }
`;
document.head.appendChild(style);
