export const qs = (selector, scope = document) => scope.querySelector(selector);

export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const setCurrentYear = (selector = '[data-current-year]') => {
  const target = qs(selector);

  if (target) {
    target.textContent = new Date().getFullYear().toString();
  }
};
