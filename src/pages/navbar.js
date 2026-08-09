const navLinks = [
  { label: 'Home', href: '#main-content', active: true },
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const pageLinks = [
  ['About', 'Company vision and AI workflow story'],
  ['Integrations', 'Connect Preevon to your stack'],
  ['Careers', 'Build the future of intelligent work'],
  ['Support Center', 'Guides, FAQs, and product help'],
  ['Documentation', 'Developer-ready product references'],
  ['Changelog', 'Latest releases and improvements'],
  ['Privacy Policy', 'How data is protected'],
  ['Terms', 'Policies for using Preevon'],
  ['404', 'Helpful not-found experience'],
  ['Coming Soon', 'Preview upcoming launches'],
];

const themeMenu = (variant = 'desktop') => `
  <div class="theme-switcher theme-switcher--${variant}" data-theme-menu>
    <button class="theme-switcher__trigger" type="button" aria-label="Choose color theme" aria-haspopup="menu" aria-expanded="false" aria-pressed="false" data-theme-trigger>
      <span class="theme-switcher__icon" data-theme-icon aria-hidden="true"><i data-lucide="monitor-cog"></i></span>
      <span class="theme-switcher__label" data-theme-label>System</span>
      <i class="theme-switcher__chevron" data-lucide="chevron-down" aria-hidden="true"></i>
    </button>
    <div class="theme-switcher__panel" role="menu" aria-label="Color theme" data-theme-panel>
      ${['light', 'dark', 'system']
        .map((theme) => {
          const icon = theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'monitor-cog';
          return `
            <button class="theme-switcher__option" type="button" role="menuitemradio" aria-checked="false" data-theme-option="${theme}">
              <span class="theme-switcher__option-icon"><i data-lucide="${icon}" aria-hidden="true"></i></span>
              <span>${theme[0].toUpperCase() + theme.slice(1)}</span>
              <i class="theme-switcher__check" data-lucide="check" aria-hidden="true"></i>
            </button>
          `;
        })
        .join('')}
    </div>
  </div>
`;

const slugify = (value) => value.toLowerCase().replaceAll(' ', '-');

const pagesMenuItems = () =>
  pageLinks
    .map(
      ([label, description]) => `
        <a class="navbar-pages__item" href="#${slugify(label)}" role="menuitem">
          <span>${label}</span>
          <small>${description}</small>
        </a>
      `,
    )
    .join('');

export const navbar = () => `
  <header class="premium-navbar" data-navbar>
    <nav class="premium-navbar__inner" aria-label="Primary navigation">
      <a class="premium-navbar__logo" href="#main-content" aria-label="Preevon home">
        <span class="premium-navbar__mark" aria-hidden="true">P</span>
        <span>Preevon</span>
      </a>

      <div class="premium-navbar__links" data-desktop-nav>
        ${navLinks
          .slice(0, 4)
          .map(
            (link) => `
              <a class="premium-navbar__link" href="${link.href}" ${link.active ? 'aria-current="page"' : ''}>${link.label}</a>
            `,
          )
          .join('')}
        <div class="premium-navbar__pages" data-pages-menu>
          <button class="premium-navbar__link premium-navbar__link--button" type="button" aria-haspopup="true" aria-expanded="false" data-pages-trigger>
            Pages <i data-lucide="chevron-down" aria-hidden="true"></i>
          </button>
          <div class="navbar-pages" role="menu" data-pages-panel>
            <div class="navbar-pages__header">
              <span class="eyebrow">Explore Preevon</span>
              <strong>Premium pages for every SaaS journey.</strong>
            </div>
            <div class="navbar-pages__grid">${pagesMenuItems()}</div>
          </div>
        </div>
        ${navLinks
          .slice(4)
          .map((link) => `<a class="premium-navbar__link" href="${link.href}">${link.label}</a>`)
          .join('')}
      </div>

      <div class="premium-navbar__actions">
        <button class="premium-navbar__search" type="button" aria-label="Open search" data-search-trigger>
          <i data-lucide="search" aria-hidden="true"></i>
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
        ${themeMenu()}
        <a class="premium-navbar__login" href="#login">Login</a>
        <a class="premium-navbar__cta" href="#get-started">Get Started</a>
        <button class="premium-navbar__hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-navigation" data-mobile-open>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <div class="mobile-nav" id="mobile-navigation" aria-hidden="true" inert data-mobile-menu>
      <button class="mobile-nav__overlay" type="button" aria-label="Close menu" data-mobile-close></button>
      <aside class="mobile-nav__panel" aria-label="Mobile navigation">
        <div class="mobile-nav__header">
          <span class="premium-navbar__logo"><span class="premium-navbar__mark" aria-hidden="true">P</span><span>Preevon</span></span>
          <button class="mobile-nav__close" type="button" aria-label="Close menu" data-mobile-close><i data-lucide="x" aria-hidden="true"></i></button>
        </div>
        <div class="mobile-nav__links">
          <button class="mobile-nav__search" type="button" data-search-trigger>
            <span><i data-lucide="search" aria-hidden="true"></i> Search Preevon</span>
            <kbd>⌘K</kbd>
          </button>
          ${navLinks
            .slice(0, 4)
            .map(
              (link) =>
                `<a href="${link.href}" ${link.active ? 'aria-current="page"' : ''}>${link.label}</a>`,
            )
            .join('')}
          ${themeMenu('mobile')}
          <div class="mobile-nav__details">
            <button class="mobile-nav__pages-trigger" type="button" aria-expanded="false" aria-controls="mobile-pages-submenu" data-mobile-pages-trigger>
              <span>Pages</span>
              <i data-lucide="chevron-down" aria-hidden="true"></i>
            </button>
            <div class="mobile-nav__subnav" id="mobile-pages-submenu" hidden data-mobile-pages-panel>${pagesMenuItems()}</div>
          </div>
          ${navLinks
            .slice(4)
            .map((link) => `<a href="${link.href}">${link.label}</a>`)
            .join('')}
        </div>
        <div class="mobile-nav__footer">
          <a class="premium-navbar__login" href="#login">Login</a>
          <a class="premium-navbar__cta" href="#get-started">Get Started</a>
        </div>
      </aside>
    </div>
  </header>
`;
