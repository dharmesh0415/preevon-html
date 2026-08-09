const footerNavigation = {
  product: {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'AI Workflow', href: '#ai-workflow' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  solutions: {
    heading: 'Solutions',
    links: [
      { label: 'AI Automation', href: '#ai-automation' },
      { label: 'AI Agents', href: '#ai-agents' },
      { label: 'Workflow Automation', href: '#workflow-automation' },
      { label: 'Team Collaboration', href: '#team-collaboration' },
      { label: 'Analytics', href: '#analytics' },
      { label: 'Business Intelligence', href: '#business-intelligence' },
    ],
  },
  resources: {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#documentation' },
      { label: 'Blog', href: '#blog' },
      { label: 'Support Center', href: '#support-center' },
      { label: 'Community', href: '#community' },
      { label: 'Help Center', href: '#help-center' },
      { label: 'API Reference', href: '#api-reference' },
    ],
  },
  company: {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Terms & Conditions', href: '#terms' },
    ],
  },
};

const socialLinks = [
  { label: 'X / Twitter', href: '#', text: 'X' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'GitHub', href: '#', icon: 'github' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
];

const renderFooterGroup = ([key, group]) => `
  <section class="site-footer__group" aria-labelledby="footer-${key}-heading">
    <button class="site-footer__group-toggle" type="button" aria-expanded="false" aria-controls="footer-${key}-links" data-footer-toggle>
      <span id="footer-${key}-heading">${group.heading}</span>
      <i data-lucide="chevron-down" aria-hidden="true"></i>
    </button>
    <ul class="site-footer__links" id="footer-${key}-links" data-footer-panel>
      ${group.links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join('')}
    </ul>
  </section>
`;

export const footer = () => `
  <footer class="site-footer" aria-labelledby="site-footer-title" data-animate="float-in">
    <div class="site-footer__glow" aria-hidden="true"></div>
    <div class="container site-footer__inner">
      <div class="site-footer__top">
        <section class="site-footer__brand" aria-labelledby="site-footer-title">
          <a class="premium-navbar__logo site-footer__logo" href="#main-content" aria-label="Preevon home">
            <span class="premium-navbar__mark" aria-hidden="true">P</span>
            <span id="site-footer-title">Preevon</span>
          </a>
          <p>Build smarter products, automate workflows, and scale your business with intelligent AI-powered tools.</p>
          <p class="site-footer__trust"><i data-lucide="shield-check" aria-hidden="true"></i>Built for modern teams building with AI.</p>
          <div class="site-footer__social" aria-label="Social links">
            ${socialLinks
              .map(
                (link) => `
                  <a class="site-footer__social-link" href="${link.href}" aria-label="${link.label}">
                    ${link.icon ? `<i data-lucide="${link.icon}" aria-hidden="true"></i>` : `<span aria-hidden="true">${link.text}</span>`}
                  </a>
                `,
              )
              .join('')}
          </div>
        </section>

        <section class="site-footer__newsletter" aria-labelledby="footer-newsletter-heading">
          <span class="eyebrow">Newsletter</span>
          <h2 id="footer-newsletter-heading">Stay ahead with AI.</h2>
          <p>Get product updates, AI insights, and useful resources delivered to your inbox.</p>
          <form class="site-footer__form" novalidate data-newsletter-form>
            <label class="sr-only" for="footer-email">Email address</label>
            <div class="site-footer__field">
              <input id="footer-email" name="email" type="email" placeholder="Enter your email" autocomplete="email" aria-describedby="footer-newsletter-message" data-newsletter-email />
              <button type="submit">Subscribe</button>
            </div>
            <p class="site-footer__message" id="footer-newsletter-message" aria-live="polite" data-newsletter-message></p>
          </form>
        </section>
      </div>

      <nav class="site-footer__nav" aria-label="Footer navigation">
        ${Object.entries(footerNavigation).map(renderFooterGroup).join('')}
      </nav>

      <div class="site-footer__bottom">
        <p>© <span data-current-year>2026</span> Preevon. All rights reserved.</p>
        <nav class="site-footer__legal" aria-label="Legal navigation">
          <a href="#privacy-policy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#cookies">Cookies</a>
        </nav>
      </div>
    </div>
  </footer>
`;
