import { qs, qsa } from './helpers.js';

const closeOnEscape = (callback) => (event) => {
  if (event.key === 'Escape') callback();
};

const createDisclosure = ({ root, triggerSelector, panelSelector, openClass }) => {
  if (!root) return null;

  const trigger = qs(triggerSelector, root);
  const panel = qs(panelSelector, root);
  if (!trigger || !panel) return null;

  const setOpen = (isOpen) => {
    root.classList.toggle(openClass, isOpen);
    trigger.setAttribute('aria-expanded', String(isOpen));
  };

  const close = () => setOpen(false);
  const toggle = () => setOpen(!root.classList.contains(openClass));

  trigger.addEventListener('click', toggle);
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) close();
  });
  document.addEventListener('keydown', closeOnEscape(close));

  return { close };
};

export const initNavbar = () => {
  const navbar = qs('[data-navbar]');
  if (!navbar) return;

  const updateScrolledState = () => {
    navbar.dataset.scrolled = String(window.scrollY > 12);
  };

  updateScrolledState();
  window.addEventListener('scroll', updateScrolledState, { passive: true });

  createDisclosure({
    root: qs('[data-theme-menu]', navbar),
    triggerSelector: '[data-theme-trigger]',
    panelSelector: '[data-theme-panel]',
    openClass: 'is-open',
  });

  createDisclosure({
    root: qs('[data-pages-menu]', navbar),
    triggerSelector: '[data-pages-trigger]',
    panelSelector: '[data-pages-panel]',
    openClass: 'is-open',
  });

  const mobileMenu = qs('[data-mobile-menu]', navbar);
  const openButton = qs('[data-mobile-open]', navbar);
  const closeButtons = qsa('[data-mobile-close]', navbar);

  const setMobileOpen = (isOpen) => {
    navbar.classList.toggle('is-mobile-open', isOpen);
    mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
    openButton?.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-lock', isOpen);
    if (isOpen) qs('[data-mobile-close]', mobileMenu)?.focus();
  };

  openButton?.addEventListener('click', () => setMobileOpen(true));
  closeButtons.forEach((button) => button.addEventListener('click', () => setMobileOpen(false)));
  qsa('.mobile-nav a', navbar).forEach((link) =>
    link.addEventListener('click', () => setMobileOpen(false)),
  );
  document.addEventListener(
    'keydown',
    closeOnEscape(() => setMobileOpen(false)),
  );
};
