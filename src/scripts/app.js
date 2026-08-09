import Lenis from 'lenis';
import gsap from 'gsap';
import { createIcons, icons } from 'lucide';
import '../styles/app.css';
import { homePage } from '../pages/home.js';
import { initFooter } from './footer.js';
import { initAnnouncementBar } from '../pages/announcement-bar.js';
import { initNavbar } from './navbar.js';
import { initSearchOverlay, searchOverlay } from './search-overlay.js';
import { initThemeManager, setTheme, subscribeToTheme } from './theme.js';
import { qs, qsa, setCurrentYear } from './helpers.js';

const mountApp = () => {
  qs('#app').innerHTML = `${homePage()}${searchOverlay()}`;
  createIcons({ icons });
  setCurrentYear();
  initAnnouncementBar();
  initNavbar();
  initSearchOverlay();
  initFooter();
};

const getThemeIconName = (preference) => {
  if (preference === 'light') return 'sun';
  if (preference === 'dark') return 'moon';
  return 'monitor-cog';
};

const initThemeControls = () => {
  const labels = qsa('[data-theme-label]');
  const iconsTargets = qsa('[data-theme-icon]');
  const triggers = qsa('[data-theme-trigger]');
  const options = qsa('[data-theme-option]');

  const syncThemeControls = ({ preference, resolvedTheme }) => {
    const label = preference[0].toUpperCase() + preference.slice(1);
    const iconName = getThemeIconName(preference);

    labels.forEach((item) => {
      item.textContent = label;
    });

    iconsTargets.forEach((target) => {
      target.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
    });

    triggers.forEach((trigger) => {
      trigger.setAttribute(
        'aria-label',
        `Choose color theme. Current theme: ${label}, showing ${resolvedTheme}.`,
      );
      trigger.setAttribute('aria-pressed', String(preference !== 'system'));
    });

    options.forEach((option) => {
      const isActive = option.dataset.themeOption === preference;
      option.setAttribute('aria-checked', String(isActive));
      option.tabIndex = isActive ? 0 : -1;
    });

    createIcons({ icons });
  };

  syncThemeControls(initThemeManager());

  options.forEach((option) => {
    option.addEventListener('click', () => {
      syncThemeControls(setTheme(option.dataset.themeOption));
    });
  });

  subscribeToTheme(syncThemeControls);
};

const initSmoothScroll = () => {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
};

const initAnimations = () => {
  gsap.from('[data-animate="float-in"]', {
    autoAlpha: 0,
    y: 24,
    duration: 0.9,
    ease: 'power3.out',
  });
};

mountApp();
initThemeControls();
initSmoothScroll();
initAnimations();
