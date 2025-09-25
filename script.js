const initYearStamp = () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
};

const registerCardInteractions = () => {
  const cards = document.querySelectorAll('.card[data-section]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('card--active');
    });
  });
};

const observeSections = () => {
  const navLinks = document.querySelectorAll('.footer__nav a, .hero__cta a');
  const sections = [...document.querySelectorAll('section')];

  const toggleActiveLink = (targetId) => {
    navLinks.forEach((link) => {
      if (link.hash === `#${targetId}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          toggleActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0.2,
    }
  );

  sections.forEach((section) => observer.observe(section));
};

const hydrateDiscipline = () => {
  const discipline = document.getElementById('discipline');
  if (!discipline) return;

  const params = new URLSearchParams(window.location.search);
  const area = params.get('expertise');

  if (area) {
    discipline.textContent = area;
  }
};

const init = () => {
  initYearStamp();
  hydrateDiscipline();
  registerCardInteractions();
  observeSections();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
