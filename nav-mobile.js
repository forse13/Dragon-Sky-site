(() => {
  const navRoot = document.querySelector('.nav');
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelectorAll('.site-nav a');
  if (!navRoot || !toggle) return;

  const closeMenu = () => {
    navRoot.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = navRoot.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
})();
