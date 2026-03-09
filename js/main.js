// Smooth scroll for nav links
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement && target.hash && target.href.includes('#')) {
    const href = target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const section = document.querySelector(href);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nav = document.querySelector('.nav');
      nav?.classList.remove('nav--open');
    }
  }
});

// Mobile nav toggle
const navToggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
const nav = document.querySelector<HTMLElement>('.nav');

navToggle?.addEventListener('click', () => {
  nav?.classList.toggle('nav--open');
});

// Typing effect in hero
const typingElement = document.getElementById('hero-typing');
const typingPhrases = [
  'Scaling data pipelines to 20M+ listings.',
  'Orchestrating multi-agent AI systems.',
  'Making government schemes accessible with voice.',
  'Shipping production-ready Rails backends and React frontends.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout: number;

function type() {
  if (!typingElement) return;

  const phrase = typingPhrases[phraseIndex];
  const current = isDeleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);
  typingElement.textContent = current;

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === phrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 350;
  }

  typingTimeout = window.setTimeout(type, delay);
}

if (typingElement) {
  type();
}

// IntersectionObserver for reveal animations and counters
const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal], .timeline__item, .project-card, .skills__group, .stat');
const counterElements = document.querySelectorAll<HTMLElement>('[data-counter]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');

        if (el.matches('[data-counter]')) {
          const valueEl = el.querySelector<HTMLElement>('.stat__value');
          if (valueEl && !valueEl.dataset.animated) {
            const target = Number(valueEl.dataset.target || '0');
            const suffix = valueEl.dataset.suffix || '';
            const duration = 1200;
            const start = performance.now();

            const animate = (time: number) => {
              const progress = Math.min((time - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(target * eased);
              valueEl.textContent = `${current}${suffix}`;
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            valueEl.dataset.animated = 'true';
          }
        }

        observer.unobserve(el);
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach((el) => observer.observe(el));
counterElements.forEach((el) => observer.observe(el));

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

