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
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroItems = qsa('[data-hero-animate]');
  const heroProduct = qs('[data-hero-product]');

  if (reduceMotion) {
    gsap.set([...heroItems, heroProduct].filter(Boolean), {
      autoAlpha: 1,
      clearProps: 'transform',
    });
    return;
  }

  if (heroItems.length) {
    gsap.from(heroItems, {
      autoAlpha: 0,
      y: 22,
      duration: 0.75,
      stagger: 0.09,
      ease: 'power3.out',
    });
  }

  if (heroProduct) {
    gsap.from(heroProduct, {
      autoAlpha: 0,
      x: 34,
      y: 18,
      duration: 0.9,
      delay: 0.18,
      ease: 'power3.out',
    });

    gsap.to(heroProduct, {
      y: -8,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      heroProduct.addEventListener('pointermove', (event) => {
        const bounds = heroProduct.getBoundingClientRect();
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
        const rotateX = -((event.clientY - bounds.top) / bounds.height - 0.5) * 5;
        gsap.to(heroProduct, { rotateX, rotateY, duration: 0.35, ease: 'power2.out' });
      });

      heroProduct.addEventListener('pointerleave', () => {
        gsap.to(heroProduct, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power2.out' });
      });
    }
  }
};

mountApp();
initThemeControls();
initSmoothScroll();
initAnimations();
