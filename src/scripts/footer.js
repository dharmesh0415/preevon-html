import { qsa } from './helpers.js';

export const initFooter = () => {
  qsa('[data-footer-toggle]').forEach((toggle) => {
    const panel = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!panel) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      panel.dataset.open = String(!isOpen);
    });
  });
};
