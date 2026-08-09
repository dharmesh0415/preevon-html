import { qsa } from './helpers.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  qsa('[data-newsletter-form]').forEach((form) => {
    const email = form.querySelector('[data-newsletter-email]');
    const message = form.querySelector('[data-newsletter-message]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = email.value.trim();

      form.dataset.state = '';
      email.removeAttribute('aria-invalid');

      if (!value) {
        form.dataset.state = 'error';
        email.setAttribute('aria-invalid', 'true');
        message.textContent = 'Please enter your email address.';
        email.focus();
        return;
      }

      if (!emailPattern.test(value)) {
        form.dataset.state = 'error';
        email.setAttribute('aria-invalid', 'true');
        message.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
      }

      form.dataset.state = 'success';
      message.textContent = "Thanks! You're on the list.";
      email.value = '';
    });
  });
};
