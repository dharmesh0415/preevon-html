const footerGroups = [
  {
    title: 'Product',
    links: [
      ['Features', '#features'],
      ['Solutions', '#solutions'],
      ['Pricing', '#pricing'],
      ['Integrations', '#integrations'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '#about'],
      ['Blog', '#blog'],
      ['Careers', '#careers'],
      ['Contact', '#contact'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Documentation', '#documentation'],
      ['Support Center', '#support-center'],
      ['Changelog', '#changelog'],
      ['Privacy Policy', '#privacy-policy'],
    ],
  },
];

const socialLinks = [
  ['Twitter / X', 'twitter'],
  ['LinkedIn', 'linkedin'],
  ['GitHub', 'github'],
];

const logo = () => `
  <a class="premium-navbar__logo site-footer__logo" href="#main-content" aria-label="Preevon home">
    <span class="premium-navbar__mark" aria-hidden="true">P</span>
    <span>Preevon</span>
  </a>
`;

export const footer = () => `
  <footer class="site-footer" aria-labelledby="site-footer-title">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        ${logo()}
        <h2 id="site-footer-title" class="sr-only">Preevon footer</h2>
        <p>AI SaaS workflows, polished interfaces, and scalable product foundations for modern teams.</p>
        <div class="site-footer__social" aria-label="Social links">
          ${socialLinks
            .map(
              ([label, icon]) => `
                <a href="#${label.toLowerCase().replaceAll(' / ', '-').replaceAll(' ', '-')}" aria-label="${label}">
                  <i data-lucide="${icon}" aria-hidden="true"></i>
                </a>
              `,
            )
            .join('')}
        </div>
      </div>

      <nav class="site-footer__nav" aria-label="Footer navigation">
        ${footerGroups
          .map(
            (group) => `
              <div class="site-footer__group">
                <h2>${group.title}</h2>
                <ul>
                  ${group.links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}
                </ul>
              </div>
            `,
          )
          .join('')}
      </nav>

      <form class="site-footer__newsletter" aria-label="Newsletter signup">
        <h2>Stay in the loop</h2>
        <p>Get layout updates, release notes, and product news from Preevon.</p>
        <div class="site-footer__form-row">
          <label class="sr-only" for="footer-email">Email address</label>
          <input id="footer-email" type="email" placeholder="you@example.com" autocomplete="email" />
          <button type="submit">Subscribe</button>
        </div>
      </form>

      <div class="site-footer__bottom">
        <span>© <span data-current-year></span> Preevon. All rights reserved.</span>
        <a href="#terms">Terms</a>
      </div>
    </div>
  </footer>
`;
