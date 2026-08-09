import { announcementBar } from './announcement-bar.js';
import { navbar } from './navbar.js';
import { footer } from './footer.js';

export const homePage = () => `
  ${announcementBar()}
  ${navbar()}
  <main id="main-content" class="home-shell">
    <section class="container hero-card" data-animate="float-in" aria-labelledby="page-title">
      <div class="status-pill eyebrow">
        <i data-lucide="sparkles" aria-hidden="true"></i>
        Sprint 1 foundation
      </div>

      <div class="hero-copy">
        <h1 id="page-title">Preevon is ready to build.</h1>
        <p>
          A clean Vite foundation with Tailwind CSS, PostCSS, ESLint, Prettier, GSAP,
          Lenis smooth scrolling, Lucide icons, Plus Jakarta Sans, and a scalable theme system.
        </p>
      </div>

      <div class="hero-actions">
        <span class="status-pill">Production-ready structure</span>
      </div>
    </section>
  </main>
  ${footer()}
`;
