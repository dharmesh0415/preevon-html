// Keep dismissal scoped to this project so the reusable bar can persist across refreshes.
const ANNOUNCEMENT_STORAGE_KEY = 'preevon-announcement-dismissed';

export const announcementBar = () => `
  <aside
    class="announcement-bar"
    data-announcement-bar
    aria-label="Site announcement"
  >
    <div class="announcement-bar__inner">
      <div class="announcement-bar__badge" aria-label="New Release">
        <span aria-hidden="true">✨</span>
        <span>New Release</span>
      </div>

      <p class="announcement-bar__message">
        <strong>Launch Preevon AI SaaS Template</strong>
        <span>Early Access Discount Available</span>
      </p>

      <div class="announcement-bar__actions">
        <a class="announcement-bar__cta" href="#main-content" aria-label="Explore Preevon AI SaaS Template now">
          <span>Explore Now</span>
          <span aria-hidden="true">→</span>
        </a>
        <button
          class="announcement-bar__close"
          type="button"
          data-announcement-close
          aria-label="Dismiss announcement"
        >
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </aside>
`;

export const initAnnouncementBar = () => {
  const bar = document.querySelector('[data-announcement-bar]');
  const close = document.querySelector('[data-announcement-close]');

  if (!bar || !close) return;

  if (window.localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY) === 'true') {
    bar.remove();
    return;
  }

  // Let the initial hidden state paint first, then transition the bar into view.
  requestAnimationFrame(() => {
    bar.dataset.visible = 'true';
  });

  close.addEventListener('click', () => {
    window.localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, 'true');
    bar.dataset.visible = 'false';
    bar.dataset.dismissed = 'true';

    bar.addEventListener('transitionend', () => bar.remove(), { once: true });
  });
};
