const initYearStamp = () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
};

const initNav = () => {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  const links = menu?.querySelectorAll('a');

  if (!toggle || !menu || !links) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) =>
    link.addEventListener('click', () => {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      }
    })
  );

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
};

const initIntersectionNav = () => {
  const navLinks = document.querySelectorAll('.nav__links a, .footer__nav a');
  const sections = [...document.querySelectorAll('section')];
  if (!navLinks.length || !sections.length) return;

  const activateLink = (id) => {
    navLinks.forEach((link) => {
      if (link.hash === `#${id}`) {
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
          activateLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-55% 0px -35% 0px',
      threshold: 0.2,
    }
  );

  sections.forEach((section) => observer.observe(section));
};

const initTabs = () => {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');
      if (!targetId) return;

      tabs.forEach((other) => {
        other.classList.toggle('is-active', other === tab);
        other.setAttribute('aria-selected', other === tab ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === targetId);
      });
    });
  });
};

const buildGradient = (ctx, colors) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  return gradient;
};

const initCharts = () => {
  if (typeof Chart === 'undefined') return;

  const coverageCanvas = document.getElementById('coverage-chart');
  const casesCanvas = document.getElementById('cases-chart');

  if (coverageCanvas) {
    const ctx = coverageCanvas.getContext('2d');
    const gradient = buildGradient(ctx, ['rgba(93, 123, 255, 0.45)', 'rgba(93, 123, 255, 0)']);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4', 'Нед 5', 'Нед 6'],
        datasets: [
          {
            label: 'Источники',
            data: [120, 138, 162, 175, 181, 195],
            fill: true,
            tension: 0.4,
            borderColor: 'rgba(125, 152, 255, 0.95)',
            backgroundColor: gradient,
            pointRadius: 4,
            pointHoverRadius: 5,
          },
          {
            label: 'Алерты',
            data: [56, 62, 58, 71, 83, 88],
            tension: 0.35,
            borderColor: 'rgba(255, 200, 97, 0.9)',
            borderDash: [4, 4],
            pointRadius: 4,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#d4dcff',
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(8, 10, 18, 0.9)',
            titleColor: '#f7f9ff',
            bodyColor: '#d4dcff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: { color: '#9aa4c8' },
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
          },
          y: {
            ticks: { color: '#9aa4c8' },
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            beginAtZero: true,
          },
        },
      },
    });
  }

  if (casesCanvas) {
    const ctx = casesCanvas.getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Киберугрозы', 'Финансы', 'Социальная динамика', 'Кризисы'],
        datasets: [
          {
            data: [42, 25, 18, 15],
            backgroundColor: [
              'rgba(93, 123, 255, 0.9)',
              'rgba(255, 200, 97, 0.85)',
              'rgba(255, 93, 143, 0.8)',
              'rgba(83, 224, 165, 0.8)',
            ],
            borderColor: 'rgba(5, 6, 10, 0.9)',
            borderWidth: 2,
            hoverOffset: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#d4dcff',
              usePointStyle: true,
            },
          },
        },
      },
    });
  }
};

const init = () => {
  initYearStamp();
  initNav();
  initIntersectionNav();
  initTabs();
  initCharts();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
