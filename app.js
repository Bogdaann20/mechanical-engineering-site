const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const heroBg = document.querySelector('.hero-bg');
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  if (window.scrollY < window.innerHeight && heroBg) {
    heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
  }
});

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach((anchor) => {
  anchor.addEventListener('click', () => navLinks.classList.remove('open'));
});

function animateCounter(element) {
  const target = Number(element.dataset.target);
  const duration = 1800;
  const start = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    element.textContent = Math.floor(eased * target).toLocaleString('ro-RO');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

const revealElements = document.querySelectorAll(
  '.domain-card, .career-card, .mini-card, .about-text, .section-title, .code-showcase, .tool-item, .contact-form, .hero-panel, .about-strip, .lab-panel, .lab-dashboard, .case-card, .case-timeline article, .roadmap-step, .contact-copy, .contact-box'
);

revealElements.forEach((element) => element.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((element) => revealObserver.observe(element));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.style.display = 'none';
    successMsg.style.display = 'block';
  });
}

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((anchor) => anchor.classList.remove('nav-active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.classList.add('nav-active');
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll('.gear-icon').forEach((gear) => {
  gear.addEventListener('mouseenter', () => {
    gear.style.animationDuration = '0.5s';
  });

  gear.addEventListener('mouseleave', () => {
    gear.style.animationDuration = '6s';
  });
});

const labTabs = document.querySelectorAll('.lab-tab');
const labPanes = document.querySelectorAll('.lab-pane');

labTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    labTabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    labPanes.forEach((pane) => pane.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const nextPane = document.querySelector(`.lab-pane[data-pane="${target}"]`);
    if (nextPane) {
      nextPane.classList.add('active');
    }
  });
});
