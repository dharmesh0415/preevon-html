import { lockBodyScroll, qs, qsa, unlockBodyScroll } from './helpers.js';

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

const createDisclosure = ({ root, triggerSelector, panelSelector, openClass, onOpen }) => {
  if (!root) return null;

  const trigger = qs(triggerSelector, root);
  const panel = qs(panelSelector, root);
  if (!trigger || !panel) return null;

  const setOpen = (isOpen) => {
    root.classList.toggle(openClass, isOpen);
    trigger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) onOpen?.();
  };

  const close = () => setOpen(false);
  const toggle = () => setOpen(!root.classList.contains(openClass));

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggle();
  });
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) close();
  });
  root.addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('click', close);
  document.addEventListener('keydown', closeOnEscape(close));

  return { close, setOpen };
};

const initThemeMenus = (navbar) => {
  qsa('[data-theme-menu]', navbar).forEach((menu) => {
    const disclosure = createDisclosure({
      root: menu,
      triggerSelector: '[data-theme-trigger]',
      panelSelector: '[data-theme-panel]',
      openClass: 'is-open',
      onOpen: () =>
        qs('[data-theme-option][aria-checked="true"]', menu)?.focus({ preventScroll: true }),
    });
    const trigger = qs('[data-theme-trigger]', menu);
    const options = qsa('[data-theme-option]', menu);

    options.forEach((option, index) => {
      option.addEventListener('click', () => disclosure?.close());
      option.addEventListener('keydown', (event) => {
        const lastIndex = options.length - 1;
        let nextIndex = null;

        if (event.key === 'ArrowDown') nextIndex = index === lastIndex ? 0 : index + 1;
        if (event.key === 'ArrowUp') nextIndex = index === 0 ? lastIndex : index - 1;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = lastIndex;

        if (nextIndex !== null) {
          event.preventDefault();
          options[nextIndex].focus();
        }

        if (event.key === 'Escape') {
          disclosure?.close();
          trigger?.focus({ preventScroll: true });
        }
      });
    });
  });
};

export const initNavbar = () => {
  const navbar = qs('[data-navbar]');
  if (!navbar) return;

  const updateScrolledState = () => {
    navbar.dataset.scrolled = String(window.scrollY > 12);
  };

  updateScrolledState();
  window.addEventListener('scroll', updateScrolledState, { passive: true });

  initThemeMenus(navbar);

  createDisclosure({
    root: qs('[data-pages-menu]', navbar),
    triggerSelector: '[data-pages-trigger]',
    panelSelector: '[data-pages-panel]',
    openClass: 'is-open',
  });

  const mobileMenu = qs('[data-mobile-menu]', navbar);
  const openButton = qs('[data-mobile-open]', navbar);
  const closeButtons = qsa('[data-mobile-close]', navbar);

  const lockMobileScroll = () => lockBodyScroll('mobile-nav');

  const unlockMobileScroll = () => unlockBodyScroll('mobile-nav');

  const focusFirstPanelControl = () => {
    qs('[data-mobile-close]', mobileMenu)?.focus({
      preventScroll: true,
    });
  };

  const setMobileOpen = (isOpen) => {
    if (!mobileMenu || !openButton) return;

    const wasOpen = navbar.classList.contains('is-mobile-open');

    if (isOpen === wasOpen) return;

    navbar.classList.toggle('is-mobile-open', isOpen);

    mobileMenu.setAttribute(
      'aria-hidden',
      String(!isOpen)
    );

    mobileMenu.toggleAttribute('inert', !isOpen);

    openButton.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    if (isOpen) {
      lockMobileScroll();

      requestAnimationFrame(() => {
        focusFirstPanelControl();
      });

      return;
    }

    unlockMobileScroll();

    openButton.focus({
      preventScroll: true,
    });
  };

  openButton?.addEventListener('click', () => {
    setMobileOpen(true);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setMobileOpen(false);
    });
  });

  qsa('.mobile-nav a', navbar).forEach((control) => {
    control.addEventListener('click', () => {
      setMobileOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!navbar.classList.contains('is-mobile-open')) return;

    if (event.key === 'Escape') {
      setMobileOpen(false);
      return;
    }

    if (event.key !== 'Tab' || !mobileMenu) return;

    const focusableItems = qsa(
      focusableSelector,
      mobileMenu
    ).filter(
      (item) => !item.closest('[hidden]')
    );

    const firstItem = focusableItems[0];
    const lastItem = focusableItems.at(-1);

    if (!firstItem || !lastItem) return;

    if (
      event.shiftKey &&
      document.activeElement === firstItem
    ) {
      event.preventDefault();
      lastItem.focus();
    }

    if (
      !event.shiftKey &&
      document.activeElement === lastItem
    ) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  const handleResize = () => {
    if (window.innerWidth >= 1080) {
      setMobileOpen(false);
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize();
};

