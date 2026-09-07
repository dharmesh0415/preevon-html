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

const initPricing = () => {
  const options = qsa('[data-billing-option]');
  const prices = qsa('[data-pricing-price]');
  const periods = qsa('[data-pricing-period]');
  const billingNotes = qsa('[data-pricing-billing]');

  if (!options.length) return;

  const setBillingPeriod = (period) => {
    const isYearly = period === 'yearly';

    options.forEach((option) => {
      const isActive = option.dataset.billingOption === period;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-checked', String(isActive));
      option.tabIndex = isActive ? 0 : -1;
    });

    prices.forEach((price) => {
      price.textContent = isYearly ? price.dataset.yearlyPrice : price.dataset.monthlyPrice;
    });
    periods.forEach((periodLabel, index) => {
      const isCustom = prices[index].dataset.monthlyPrice === 'Custom';
      periodLabel.textContent = isCustom ? 'Talk to our team' : '/ month';
    });
    billingNotes.forEach((note, index) => {
      const isCustom = prices[index].dataset.monthlyPrice === 'Custom';
      note.textContent = isCustom
        ? 'Flexible options for your needs'
        : isYearly
          ? 'Billed yearly'
          : '\u00a0';
    });
  };

  options.forEach((option, index) => {
    option.addEventListener('click', () => setBillingPeriod(option.dataset.billingOption));
    option.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? options.length - 1
            : (index + (event.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
      options[nextIndex].focus();
      setBillingPeriod(options[nextIndex].dataset.billingOption);
    });
  });
};

const initFaq = () => {
  const items = qsa('[data-faq-item]');

  if (!items.length) return;

  const setOpenItem = (activeItem) => {
    items.forEach((item) => {
      const isOpen = item === activeItem && !item.classList.contains('is-open');
      const trigger = item.querySelector('[data-faq-trigger]');
      const panel = item.querySelector('[data-faq-panel]');

      item.classList.toggle('is-open', isOpen);
      trigger.setAttribute('aria-expanded', String(isOpen));
      panel.setAttribute('aria-hidden', String(!isOpen));
    });
  };

  items.forEach((item) => {
    item.querySelector('[data-faq-trigger]').addEventListener('click', () => setOpenItem(item));
  });
};

const initAnimations = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroItems = qsa('[data-hero-animate]');
  const heroProduct = qs('[data-hero-product]');
  const trustedItems = qsa('[data-trusted-animate], [data-trusted-logo]');
  const featureItems = qsa('[data-features-animate], [data-feature-card], [data-feature-visual]');
  const workflowItems = qsa('[data-workflow-animate], [data-workflow-track], [data-workflow-card], [data-workflow-connector]');
  const dashboardItems = qsa('[data-dashboard-animate], [data-dashboard-frame]');
  const integrationItems = qsa('[data-integrations-animate]');
  const statisticsItems = qsa('[data-statistics-animate]');
  const statisticsSection = qs('[data-statistics-section]');
  const pricingItems = qsa('[data-pricing-animate], [data-pricing-card]');
  const pricingSection = qs('[data-pricing-section]');
  const testimonialItems = qsa('[data-testimonials-animate], [data-testimonial-card]');
  const testimonialsSection = qs('[data-testimonials-section]');
  const faqItems = qsa('[data-faq-animate], [data-faq-item]');
  const faqSection = qs('[data-faq-section]');

  if (reduceMotion) {
    gsap.set([...heroItems, heroProduct, ...trustedItems, ...featureItems, ...workflowItems, ...dashboardItems, ...integrationItems, ...statisticsItems, ...pricingItems, ...testimonialItems, ...faqItems].filter(Boolean), {
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

  if (trustedItems.length) {
    gsap.from(trustedItems, {
      autoAlpha: 0,
      y: 14,
      duration: 0.6,
      stagger: 0.055,
      delay: 0.28,
      ease: 'power3.out',
    });
  }

  if (featureItems.length) {
    gsap.from(featureItems, {
      autoAlpha: 0,
      y: 18,
      duration: 0.65,
      stagger: 0.06,
      delay: 0.4,
      ease: 'power3.out',
    });
  }

  if (workflowItems.length) {
    gsap.from(workflowItems, {
      autoAlpha: 0,
      y: 18,
      duration: 0.65,
      stagger: 0.055,
      delay: 0.52,
      ease: 'power3.out',
    });
  }

  if (dashboardItems.length) {
    gsap.from(dashboardItems, {
      autoAlpha: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.055,
      delay: 0.64,
      ease: 'power3.out',
    });
  }

  if (integrationItems.length) {
    gsap.from(integrationItems, {
      autoAlpha: 0,
      y: 18,
      duration: 0.65,
      stagger: 0.055,
      delay: 0.72,
      ease: 'power3.out',
    });
  }

  if (statisticsItems.length && statisticsSection) {
    const revealStatistics = () => {
      gsap.from(statisticsItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
      });
    };

    if (!('IntersectionObserver' in window)) {
      revealStatistics();
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          revealStatistics();
        },
        { threshold: 0.2 },
      );

      observer.observe(statisticsSection);
    }
  }

  if (pricingItems.length && pricingSection) {
    const revealPricing = () => {
      gsap.from(pricingItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
      });
    };

    if (!('IntersectionObserver' in window)) {
      revealPricing();
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          revealPricing();
        },
        { threshold: 0.15 },
      );

      observer.observe(pricingSection);
    }
  }

  if (testimonialItems.length && testimonialsSection) {
    const revealTestimonials = () => {
      gsap.from(testimonialItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
      });
    };

    if (!('IntersectionObserver' in window)) {
      revealTestimonials();
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          revealTestimonials();
        },
        { threshold: 0.15 },
      );

      observer.observe(testimonialsSection);
    }
  }

  if (faqItems.length && faqSection) {
    const revealFaq = () => {
      gsap.from(faqItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.045,
        ease: 'power3.out',
      });
    };

    if (!('IntersectionObserver' in window)) {
      revealFaq();
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          revealFaq();
        },
        { threshold: 0.15 },
      );

      observer.observe(faqSection);
    }
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
initPricing();
initFaq();
initSmoothScroll();
initAnimations();
