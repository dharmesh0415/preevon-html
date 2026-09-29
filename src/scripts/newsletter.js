import { qsa } from './helpers.js';

const setFeedback = (form, message, state = '') => {
  const status = form.querySelector('[data-newsletter-message]');
  form.dataset.state = state;
  status.textContent = message;
  status.setAttribute('role', state === 'error' ? 'alert' : 'status');
  status.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite');
};

export const initNewsletter = () => {
  qsa('[data-newsletter-form]').forEach((form) => {
    const email = form.querySelector('[data-newsletter-email]');
    const submit = form.querySelector('[data-newsletter-submit]');
    let isProcessing = false;

    const clearFeedback = () => {
      email.removeAttribute('aria-invalid');
      setFeedback(form);
    };

    email.addEventListener('input', clearFeedback);
    email.addEventListener('invalid', () => {
      const message = email.validity.valueMissing
        ? 'Please enter your email address.'
        : 'Please enter a valid email address.';
      email.setAttribute('aria-invalid', 'true');
      setFeedback(form, message, 'error');
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (isProcessing) return;

      if (!email.validity.valid) {
        email.setAttribute('aria-invalid', 'true');
        email.reportValidity();
        return;
      }

      isProcessing = true;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      setFeedback(form, 'Preparing the demo confirmation…', 'processing');

      window.setTimeout(() => {
        setFeedback(
          form,
          'Thanks for your interest! Newsletter subscription is a demo feature in this template.',
          'success',
        );
        email.value = '';
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
        isProcessing = false;
      }, 250);
    });
  });
};
