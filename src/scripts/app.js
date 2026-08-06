import Lenis from 'lenis';
import gsap from 'gsap';
import { createIcons, icons } from 'lucide';
import '../styles/app.css';
import { homePage } from '../pages/home.js';
import { initAnnouncementBar } from '../pages/announcement-bar.js';
import { applyTheme, getStoredTheme, toggleTheme } from './theme.js';
import { qs, setCurrentYear } from './helpers.js';

const mountApp = () => {
  qs('#app').innerHTML = homePage();
  createIcons({ icons });
  setCurrentYear();
  initAnnouncementBar();
};

const initThemeControls = () => {
  const activeTheme = applyTheme(getStoredTheme());
  const toggle = qs('[data-theme-toggle]');
  const label = qs('[data-theme-label]');

  const setLabel = (theme) => {
    if (label) {
      label.textContent = `${theme === 'dark' ? 'Dark' : 'Light'} mode`;
    }
  };

  setLabel(activeTheme);
  toggle?.addEventListener('click', () => setLabel(toggleTheme()));
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
