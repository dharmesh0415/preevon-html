import { createIcons, icons } from 'lucide';
import { lockBodyScroll, qs, qsa, unlockBodyScroll } from './helpers.js';
import { popularSearches, searchCatalog, suggestedItems } from './search-data.js';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

const escapeHtml = (value) =>
  value.replace(/[&<>\"']/g, (character) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' })[character],
  );

const resultTemplate = (item, index, selectedIndex) => `
  <a class="search-overlay__result ${index === selectedIndex ? 'is-active' : ''}" href="${escapeHtml(item.href)}" role="option" aria-selected="${index === selectedIndex}" data-search-result data-result-index="${index}" aria-label="Open ${escapeHtml(item.title)}, ${escapeHtml(item.category)}: ${escapeHtml(item.description)}">
    <span class="search-overlay__result-icon" aria-hidden="true"><i data-lucide="${item.icon}"></i></span>
    <span class="search-overlay__result-copy">
      <span class="search-overlay__result-title">${escapeHtml(item.title)}</span>
      <span class="search-overlay__result-description">${escapeHtml(item.description)}</span>
    </span>
    <span class="search-overlay__result-meta">
      <span>${escapeHtml(item.category)}</span>
      ${index === selectedIndex ? '<kbd>Enter</kbd>' : ''}
    </span>
  </a>
`;

export const searchOverlay = () => `
  <div class="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-overlay-title" aria-describedby="search-overlay-description" aria-hidden="true" inert data-search-overlay>
    <button class="search-overlay__backdrop" type="button" aria-label="Close search" data-search-close></button>
    <section class="search-overlay__panel" aria-label="Search Preevon">
      <div class="search-overlay__header">
        <span class="search-overlay__field-icon" aria-hidden="true"><i data-lucide="search"></i></span>
        <div class="search-overlay__field">
          <h2 id="search-overlay-title" class="sr-only">Search Preevon</h2>
          <p id="search-overlay-description" class="sr-only">Search pages, resources, and product information.</p>
          <label class="sr-only" for="global-search-input">Search Preevon</label>
          <input id="global-search-input" class="search-overlay__input" type="search" placeholder="Search Preevon..." autocomplete="off" autocapitalize="none" spellcheck="false" data-search-input />
        </div>
        <button class="search-overlay__clear" type="button" aria-label="Clear search" hidden data-search-clear><i data-lucide="x-circle" aria-hidden="true"></i></button>
        <button class="search-overlay__close" type="button" aria-label="Close search" data-search-close><i data-lucide="x" aria-hidden="true"></i></button>
      </div>
      <div class="search-overlay__content" data-search-content></div>
      <div class="search-overlay__footer" aria-label="Search keyboard shortcuts">
        <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
        <span><kbd>Enter</kbd> Open</span>
        <span><kbd>Esc</kbd> Close</span>
      </div>
    </section>
  </div>
`;

export const initSearchOverlay = () => {
  const overlay = qs('[data-search-overlay]');
  if (!overlay) return;

  const input = qs('[data-search-input]', overlay);
  const content = qs('[data-search-content]', overlay);
  const clearButton = qs('[data-search-clear]', overlay);
  const closeButtons = qsa('[data-search-close]', overlay);
  let activeTrigger = null;
  let selectedIndex = -1;
  let currentResults = [];

  const refreshIcons = () => createIcons({ icons });

  const renderInitial = () => {
    selectedIndex = -1;
    currentResults = suggestedItems;
    content.innerHTML = `
      <div class="search-overlay__section">
        <span class="search-overlay__label">Popular searches</span>
        <div class="search-overlay__chips">${popularSearches.map((term) => `<button class="search-overlay__chip" type="button" data-search-chip="${escapeHtml(term)}">${escapeHtml(term)}</button>`).join('')}</div>
      </div>
      <div class="search-overlay__section">
        <span class="search-overlay__label">Suggested pages</span>
        <div class="search-overlay__results" role="listbox" aria-label="Suggested search results">${suggestedItems.map((item, index) => resultTemplate(item, index, selectedIndex)).join('')}</div>
      </div>
      <div class="search-overlay__shortcuts"><span>Press <kbd>/</kbd> anywhere to search</span><span>Use <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> for command search</span></div>
    `;
    refreshIcons();
  };

  const renderResults = () => {
    const term = input.value.trim();
    clearButton.hidden = !term;
    if (!term) {
      renderInitial();
      return;
    }

    currentResults = searchCatalog(term);
    selectedIndex = currentResults.length ? Math.max(0, Math.min(selectedIndex, currentResults.length - 1)) : -1;
    content.innerHTML = currentResults.length
      ? `<div class="search-overlay__section"><span class="search-overlay__label">${currentResults.length} result${currentResults.length === 1 ? '' : 's'} for “${escapeHtml(term)}”</span><div class="search-overlay__results" role="listbox" aria-label="Search results">${currentResults.map((item, index) => resultTemplate(item, index, selectedIndex)).join('')}</div></div>`
      : `<div class="search-overlay__empty"><span aria-hidden="true"><i data-lucide="search-x"></i></span><strong>No results found</strong><p>Try another search term.</p></div>`;
    refreshIcons();
  };

  const setOpen = (isOpen, trigger = null) => {
    const wasOpen = overlay.classList.contains('is-open');
    if (isOpen === wasOpen) return;

    overlay.classList.toggle('is-open', isOpen);
    overlay.setAttribute('aria-hidden', String(!isOpen));
    overlay.toggleAttribute('inert', !isOpen);
    document.documentElement.classList.toggle('search-is-open', isOpen);

    if (isOpen) {
      activeTrigger = trigger || document.activeElement;
      lockBodyScroll('search-lock');
      renderResults();
      requestAnimationFrame(() => input.focus({ preventScroll: true }));
      return;
    }

    unlockBodyScroll('search-lock');
    input.value = '';
    clearButton.hidden = true;
    renderInitial();
    activeTrigger?.focus?.({ preventScroll: true });
  };

  qsa('[data-search-trigger]').forEach((trigger) =>
    trigger.addEventListener('click', () => setOpen(true, trigger)),
  );

  closeButtons.forEach((button) => button.addEventListener('click', () => setOpen(false)));
  clearButton.addEventListener('click', () => {
    input.value = '';
    renderResults();
    input.focus({ preventScroll: true });
  });
  input.addEventListener('input', () => {
    selectedIndex = -1;
    renderResults();
  });
  content.addEventListener('click', (event) => {
    const chip = event.target.closest?.('[data-search-chip]');
    if (chip) {
      input.value = chip.dataset.searchChip;
      selectedIndex = 0;
      renderResults();
      input.focus({ preventScroll: true });
      return;
    }
    if (event.target.closest?.('[data-search-result]')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    const isOpen = overlay.classList.contains('is-open');
    const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    const isSlash = event.key === '/' && !isEditableTarget(event.target);

    if (!isOpen && (isCommandK || isSlash)) {
      event.preventDefault();
      setOpen(true);
      return;
    }
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key) || !currentResults.length) return;

    if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault();
      qs(`[data-result-index="${selectedIndex}"]`, overlay)?.click();
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      selectedIndex = (selectedIndex + direction + currentResults.length) % currentResults.length;
      renderResults();
    }
  });

  overlay.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusableItems = qsa(focusableSelector, overlay).filter((item) => !item.hidden);
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

  renderInitial();
};
