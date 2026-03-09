// Smooth scroll for nav links
document.addEventListener('click', function (event) {
  var target = event.target;
  if (target.tagName === 'A' && target.hash && target.href.includes('#')) {
    var href = target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    var section = document.querySelector(href);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var nav = document.querySelector('.nav');
      if (nav) nav.classList.remove('nav--open');
    }
  }
});

// Mobile nav toggle
var navToggle = document.querySelector('.nav__toggle');
var nav = document.querySelector('.nav');

if (navToggle) {
  navToggle.addEventListener('click', function () {
    if (nav) nav.classList.toggle('nav--open');
  });
}

// Typing effect in hero
var typingElement = document.getElementById('hero-typing');
var typingPhrases = [
  'Scaling data pipelines to 20M+ listings.',
  'Orchestrating multi-agent AI systems.',
  'Making government schemes accessible with voice.',
  'Shipping production-ready Rails backends.'
];

var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;

function type() {
  if (!typingElement) return;

  var phrase = typingPhrases[phraseIndex];
  var current = isDeleting
    ? phrase.slice(0, charIndex--)
    : phrase.slice(0, charIndex++);
  typingElement.textContent = current;

  var delay = isDeleting ? 35 : 70;

  if (!isDeleting && charIndex === phrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 350;
  }

  setTimeout(type, delay);
}

if (typingElement) {
  type();
}

// IntersectionObserver for scroll reveal and counter animations
var revealElements = document.querySelectorAll(
  '.timeline__item, .project-card, .project-card--compact, .skills__group, .stat'
);
var counterElements = document.querySelectorAll('[data-counter]');

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.classList.add('is-visible');

        if (el.hasAttribute('data-counter')) {
          var valueEl = el.querySelector('.stat__value');
          if (valueEl && !valueEl.dataset.animated) {
            var target = Number(valueEl.dataset.target || '0');
            var suffix = valueEl.dataset.suffix || '';
            var duration = 1200;
            var start = performance.now();

            function animate(time) {
              var progress = Math.min((time - start) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              var current = Math.floor(target * eased);
              valueEl.textContent = current + suffix;
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            }

            requestAnimationFrame(animate);
            valueEl.dataset.animated = 'true';
          }
        }

        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(function (el) {
  observer.observe(el);
});
counterElements.forEach(function (el) {
  observer.observe(el);
});

// Set current year in footer
var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
