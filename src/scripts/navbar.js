import { qs, qsa } from './helpers.js';

const closeOnEscape = (callback) => (event) => {
  if (event.key === 'Escape') callback();
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

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
  const pagesTrigger = qs('[data-mobile-pages-trigger]', navbar);
  const pagesPanel = qs('[data-mobile-pages-panel]', navbar);
  let scrollPosition = 0;
  let pagesAnimationTimer;

  const setMobilePagesOpen = (isOpen) => {
    if (!pagesTrigger || !pagesPanel) return;

    window.clearTimeout(pagesAnimationTimer);
    pagesTrigger.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      pagesPanel.hidden = false;
      pagesPanel.style.maxHeight = `${pagesPanel.scrollHeight}px`;
      return;
    }

    pagesPanel.style.maxHeight = '0px';
    pagesAnimationTimer = window.setTimeout(() => {
      pagesPanel.hidden = true;
    }, 260);
  };

  const lockBodyScroll = () => {
    scrollPosition = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add('nav-lock');
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : '';
  };

  const unlockBodyScroll = () => {
    document.body.classList.remove('nav-lock');
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, scrollPosition);
  };

  const focusFirstPanelControl = () => {
    qs('[data-mobile-close]', mobileMenu)?.focus({ preventScroll: true });
  };

  const setMobileOpen = (isOpen) => {
    if (!mobileMenu || !openButton) return;

    const wasOpen = navbar.classList.contains('is-mobile-open');
    if (isOpen === wasOpen) return;

    navbar.classList.toggle('is-mobile-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.toggleAttribute('inert', !isOpen);
    openButton.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      lockBodyScroll();
      requestAnimationFrame(focusFirstPanelControl);
      return;
    }

    setMobilePagesOpen(false);
    unlockBodyScroll();
    openButton.focus({ preventScroll: true });
  };

  openButton?.addEventListener('click', () => setMobileOpen(true));
  closeButtons.forEach((button) => button.addEventListener('click', () => setMobileOpen(false)));
  pagesTrigger?.addEventListener('click', () => {
    const isOpen = pagesTrigger.getAttribute('aria-expanded') === 'true';
    setMobilePagesOpen(!isOpen);
  });
  qsa('.mobile-nav a', navbar).forEach((link) =>
    link.addEventListener('click', () => setMobileOpen(false)),
  );
  document.addEventListener('keydown', (event) => {
    if (!navbar.classList.contains('is-mobile-open')) return;

    if (event.key === 'Escape') {
      setMobileOpen(false);
      return;
    }

    if (event.key !== 'Tab' || !mobileMenu) return;

    const focusableItems = qsa(focusableSelector, mobileMenu).filter(
      (item) => !item.closest('[hidden]'),
    );
    const firstItem = focusableItems[0];
    const lastItem = focusableItems.at(-1);

    if (!firstItem || !lastItem) return;

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    }

    if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });
};
