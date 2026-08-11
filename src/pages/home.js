import { announcementBar } from './announcement-bar.js';
import { navbar } from './navbar.js';
import { footer } from './footer.js';

const trustedCompanies = [
  { name: 'Northstar', mark: 'star', tone: 'northstar' },
  { name: 'Orbit Labs', mark: 'orbit', tone: 'orbit' },
  { name: 'Vertex', mark: 'triangle', tone: 'vertex' },
  { name: 'Nova Systems', mark: 'spark', tone: 'nova' },
  { name: 'Elevate', mark: 'chevron', tone: 'elevate' },
  { name: 'Flux', mark: 'wave', tone: 'flux' },
];

const companyLogo = ({ name, mark, tone }) => `
  <li class="trusted-by__logo" data-trusted-logo style="--logo-tone: var(--trusted-tone-${tone});">
    <span class="trusted-by__mark trusted-by__mark--${mark}" aria-hidden="true"></span>
    <span class="trusted-by__name">${name}</span>
  </li>
`;

const trustedBySection = () => `
  <section class="trusted-by" aria-labelledby="trusted-by-title" data-trusted-by>
    <div class="container trusted-by__inner">
      <h2 class="trusted-by__eyebrow" id="trusted-by-title" data-trusted-animate>Trusted by teams building the future with AI</h2>
      <ul class="trusted-by__logos" aria-label="Illustrative demo brands">
        ${trustedCompanies.map(companyLogo).join('')}
      </ul>
      <p class="trusted-by__microcopy" data-trusted-animate><span aria-hidden="true"></span>AI-first workflows • Secure by design • Built to scale</p>
    </div>
  </section>
`;

const dashboardNav = [
  ['Overview', 'layout-dashboard'],
  ['AI Assistant', 'sparkles'],
  ['Workflows', 'workflow'],
  ['Analytics', 'chart-no-axes-combined'],
  ['Integrations', 'plug'],
  ['Settings', 'settings'],
];

const dashboardPreview = () => `
  <div class="hero-product" data-hero-product aria-hidden="true">
    <div class="hero-product__glow"></div>
    <div class="dashboard-preview">
      <div class="dashboard-preview__topbar">
        <div class="dashboard-preview__brand">
          <span class="dashboard-preview__mark">P</span>
          <span>Preevon Workspace</span>
        </div>
        <div class="dashboard-preview__search"><i data-lucide="search"></i><span>Ask AI or search workflows</span></div>
        <div class="dashboard-preview__controls"><span></span><span></span></div>
      </div>

      <div class="dashboard-preview__body">
        <aside class="dashboard-preview__sidebar">
          ${dashboardNav
            .map(
              ([label, icon], index) => `
                <span class="dashboard-preview__nav ${index === 1 ? 'is-active' : ''}">
                  <i data-lucide="${icon}"></i>${label}
                </span>
              `,
            )
            .join('')}
        </aside>

        <div class="dashboard-preview__main">
          <div class="dashboard-preview__header">
            <span>Demo workspace</span>
            <strong>Intelligent operations hub</strong>
          </div>

          <div class="ai-insight-card">
            <div class="ai-insight-card__icon"><i data-lucide="bot"></i></div>
            <div>
              <span>AI Insight</span>
              <p>Sample insight: three routine approvals are ready to automate in your weekly workflow.</p>
            </div>
          </div>

          <div class="dashboard-preview__metrics">
            <div><span>Tasks routed</span><strong>128</strong><small>Demo data</small></div>
            <div><span>Automations</span><strong>42</strong><small>Active flows</small></div>
            <div><span>Signals</span><strong>9.4k</strong><small>Analyzed</small></div>
          </div>

          <div class="dashboard-preview__grid">
            <div class="workflow-card">
              <span>Workflow status</span>
              <div class="workflow-card__row"><strong>AI triage</strong><em>Ready</em></div>
              <div class="workflow-card__row"><strong>Team handoff</strong><em>Live</em></div>
              <div class="workflow-card__row"><strong>Weekly summary</strong><em>Draft</em></div>
            </div>
            <div class="activity-card">
              <span>Activity trend</span>
              <div class="activity-card__chart">
                <i style="--height:42%"></i><i style="--height:68%"></i><i style="--height:51%"></i><i style="--height:86%"></i><i style="--height:73%"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const homePage = () => `
  ${announcementBar()}
  ${navbar()}
  <main id="main-content" class="home-shell">
    <section class="hero-section" aria-labelledby="page-title" data-hero-section>
      <div class="hero-background" aria-hidden="true">
        <span class="hero-background__orb hero-background__orb--one"></span>
        <span class="hero-background__orb hero-background__orb--two"></span>
        <span class="hero-background__grid"></span>
      </div>

      <div class="container hero-section__inner">
        <div class="hero-section__content">
          <div class="status-pill hero-section__badge" data-hero-animate>
            <i data-lucide="sparkles" aria-hidden="true"></i>
            The AI workspace for modern teams
          </div>

          <div class="hero-section__copy">
            <h1 id="page-title" data-hero-animate>Build smarter. Move faster with <span>AI.</span></h1>
            <p data-hero-animate>
              Preevon brings AI automation, intelligent workflows, analytics, and team-ready tools into one modern workspace built for momentum.
            </p>
          </div>

          <div class="hero-section__actions" data-hero-animate>
            <a class="hero-button hero-button--primary" href="#get-started">
              Start Building Free <i data-lucide="arrow-right" aria-hidden="true"></i>
            </a>
            <a class="hero-button hero-button--secondary" href="#features">
              Explore Platform <i data-lucide="play-circle" aria-hidden="true"></i>
            </a>
          </div>

          <div class="hero-trust" data-hero-animate>
            <div class="hero-trust__avatars" aria-hidden="true"><span></span><span></span><span></span></div>
            <p><strong>Trusted workspace patterns</strong> for modern teams building with AI.</p>
          </div>
        </div>

        ${dashboardPreview()}
      </div>
    </section>
    ${trustedBySection()}
  </main>
  ${footer()}
`;
