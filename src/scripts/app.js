import Lenis from 'lenis';
import gsap from 'gsap';
import { createIcons, icons } from 'lucide';
import '../styles/app.css';
import { homePage } from '../pages/home.js';
import { initAnnouncementBar } from '../pages/announcement-bar.js';
import { initNavbar } from './navbar.js';
import { applyTheme, getStoredTheme, watchSystemTheme } from './theme.js';
import { qs, qsa, setCurrentYear } from './helpers.js';

const mountApp = () => {
  qs('#app').innerHTML = homePage();
  createIcons({ icons });
  setCurrentYear();
  initAnnouncementBar();
  initNavbar();
};

const initThemeControls = () => {
  const label = qs('[data-theme-label]');
  const options = qsa('[data-theme-option]');

  const syncThemeControls = ({ preference }) => {
    if (label) {
      label.textContent = preference[0].toUpperCase() + preference.slice(1);
    }

    options.forEach((option) => {
      option.setAttribute('aria-checked', String(option.dataset.themeOption === preference));
    });
  };

  syncThemeControls(applyTheme(getStoredTheme()));

  options.forEach((option) => {
    option.addEventListener('click', () => {
      syncThemeControls(applyTheme(option.dataset.themeOption));
    });
  });

  watchSystemTheme(() => {
    if (getStoredTheme() === 'system') syncThemeControls(applyTheme('system'));
  });
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
