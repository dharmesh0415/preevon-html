export const qs = (selector, scope = document) => scope.querySelector(selector);

export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const setCurrentYear = (selector = '[data-current-year]') => {
  const target = qs(selector);

  if (target) {
    target.textContent = new Date().getFullYear().toString();
  }
};

const scrollLocks = new Set();
let lockedScrollPosition = 0;

export const lockBodyScroll = (lockId = 'global-lock') => {
  if (scrollLocks.has(lockId)) return;

  if (!scrollLocks.size) {
    lockedScrollPosition = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add('nav-lock');
    document.body.style.top = `-${lockedScrollPosition}px`;
    document.body.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : '';
  }

  scrollLocks.add(lockId);
};

export const unlockBodyScroll = (lockId = 'global-lock') => {
  if (!scrollLocks.has(lockId)) return;

  scrollLocks.delete(lockId);
  if (scrollLocks.size) return;

  document.body.classList.remove('nav-lock');
  document.body.style.top = '';
  document.body.style.paddingRight = '';
  window.scrollTo(0, lockedScrollPosition);
};
