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


const featureItems = [
  {
    icon: 'sparkles',
    title: 'AI Workspace',
    description: 'Work with intelligent AI tools designed to help your team think, create, and execute faster.',
    featured: true,
    visual: 'ai',
  },
  {
    icon: 'workflow',
    title: 'Smart Automation',
    description: 'Automate repetitive processes and let intelligent workflows handle the work for you.',
    featured: false,
  },
  {
    icon: 'bot',
    title: 'AI Agents',
    description: 'Deploy specialized AI agents that can reason, act, and complete tasks across your workflows.',
    featured: false,
  },
  {
    icon: 'chart-no-axes-combined',
    title: 'Intelligent Analytics',
    description: 'Turn business activity into actionable insights with real-time analytics and intelligent reporting.',
    featured: false,
  },
  {
    icon: 'plug',
    title: 'Seamless Integrations',
    description: 'Connect the tools your team already uses and bring your entire workflow into one place.',
    featured: false,
  },
  {
    icon: 'users-round',
    title: 'Team Collaboration',
    description: 'Keep people, AI, workflows, and important business context aligned in one shared workspace.',
    featured: true,
    visual: 'workflow',
  },
];

const aiWorkspacePreview = () => `
  <div class="feature-preview feature-preview--ai" aria-hidden="true" data-feature-visual>
    <div class="feature-preview__toolbar"><span></span><span></span><span></span></div>
    <div class="ai-thread">
      <div class="ai-thread__message ai-thread__message--user">
        <span>User</span>
        <p>Summarize this week's workflow performance.</p>
      </div>
      <div class="ai-thread__message ai-thread__message--ai">
        <span>AI</span>
        <p>Your team's workflow efficiency improved this week. Three processes are ready for further automation.</p>
      </div>
    </div>
  </div>
`;

const workflowPreview = () => `
  <div class="feature-preview feature-preview--workflow" aria-hidden="true" data-feature-visual>
    ${['Trigger', 'AI Agent', 'Analyze', 'Action']
      .map(
        (node, index) => `
          <div class="workflow-preview__step ${index === 1 ? 'is-active' : ''}">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${node}</strong>
          </div>
        `,
      )
      .join('')}
  </div>
`;

const featureVisuals = {
  ai: aiWorkspacePreview,
  workflow: workflowPreview,
};

const featureCard = (feature, index) => `
  <article class="feature-card ${feature.featured ? 'feature-card--featured' : ''}" data-feature-card style="--feature-index: ${index};">
    <div class="feature-card__content">
      <div class="feature-card__icon" aria-hidden="true"><i data-lucide="${feature.icon}"></i></div>
      <div class="feature-card__copy">
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </div>
      <span class="feature-card__indicator" aria-hidden="true">Explore <i data-lucide="arrow-up-right"></i></span>
    </div>
    ${feature.visual ? featureVisuals[feature.visual]() : '<span class="feature-card__decor" aria-hidden="true"></span>'}
  </article>
`;

const featuresSection = () => `
  <section class="features-section" id="features" aria-labelledby="features-title" data-features-section>
    <div class="features-section__background" aria-hidden="true"><span></span><span></span></div>
    <div class="container features-section__inner">
      <div class="features-section__header">
        <p class="features-section__eyebrow" data-features-animate>Powerful by design</p>
        <h2 id="features-title" data-features-animate>Everything you need to build smarter with AI.</h2>
        <p data-features-animate>Bring intelligent automation, AI-powered workflows, analytics, and collaboration together in one powerful workspace.</p>
      </div>
      <div class="features-grid">
        ${featureItems.map(featureCard).join('')}
      </div>
    </div>
  </section>
`;


const workflowSteps = [
  {
    number: '01',
    icon: 'message-square',
    title: 'Understand',
    description: 'Bring your request, context, and business data into one intelligent workspace.',
    preview: 'understand',
  },
  {
    number: '02',
    icon: 'brain',
    title: 'Think',
    description: 'AI interprets context, evaluates information, and determines the best next action.',
    preview: 'think',
  },
  {
    number: '03',
    icon: 'workflow',
    title: 'Automate',
    description: 'Connect AI decisions to workflows that can trigger actions across your tools.',
    preview: 'automate',
  },
  {
    number: '04',
    icon: 'check-circle-2',
    title: 'Deliver',
    description: 'Complete the action and surface the result where your team needs it.',
    preview: 'deliver',
  },
];

const understandPreview = () => `
  <div class="ai-workflow-preview ai-workflow-preview--understand" aria-hidden="true">
    <div class="workflow-prompt-card">
      <span>User input</span>
      <p>Analyze this week's sales performance and identify opportunities.</p>
    </div>
    <div class="workflow-signal-row">
      <span>Analytics</span><span>CRM</span><span>Documents</span>
    </div>
  </div>
`;

const thinkPreview = () => `
  <div class="ai-workflow-preview ai-workflow-preview--think" aria-hidden="true">
    <div class="workflow-ai-card">
      <div><i data-lucide="sparkles"></i><strong>AI Insight</strong></div>
      <p>Analyzing trends, workflow history, and available data...</p>
      <span class="workflow-progress"><i></i></span>
    </div>
    <div class="workflow-context-chips"><span>Context</span><span>Intent</span><span>Action</span></div>
  </div>
`;

const automatePreview = () => `
  <div class="ai-workflow-preview ai-workflow-preview--automate" aria-hidden="true">
    ${['AI Decision', 'Create Task', 'Notify Team']
      .map(
        (node, index) => `
          <div class="workflow-node ${index === 0 ? 'is-primary' : ''}">
            <span>${String(index + 1).padStart(2, '0')}</span><strong>${node}</strong>
          </div>
        `,
      )
      .join('')}
  </div>
`;

const deliverPreview = () => `
  <div class="ai-workflow-preview ai-workflow-preview--deliver" aria-hidden="true">
    <div class="workflow-result-card">
      <div><i data-lucide="check-circle-2"></i><strong>Workflow completed</strong></div>
      <span>3 tasks created</span>
      <span>Team notified</span>
    </div>
  </div>
`;

const workflowPreviews = {
  understand: understandPreview,
  think: thinkPreview,
  automate: automatePreview,
  deliver: deliverPreview,
};

const workflowConnector = (index) => `
  <div class="ai-workflow-connector" aria-hidden="true" data-workflow-connector style="--connector-index: ${index};">
    <span></span><i data-lucide="arrow-right"></i>
  </div>
`;

const workflowStep = (step, index) => `
  <article class="ai-workflow-card" data-workflow-card style="--workflow-index: ${index};">
    <div class="ai-workflow-card__topline">
      <span>${step.number}</span>
      <div class="ai-workflow-card__icon" aria-hidden="true"><i data-lucide="${step.icon}"></i></div>
    </div>
    <div class="ai-workflow-card__copy">
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </div>
    ${workflowPreviews[step.preview]()}
  </article>
`;

const aiWorkflowSection = () => `
  <section class="ai-workflow-section" id="ai-workflow" aria-labelledby="ai-workflow-title" data-ai-workflow-section>
    <div class="ai-workflow-section__background" aria-hidden="true"><span></span><span></span></div>
    <div class="container ai-workflow-section__inner">
      <div class="ai-workflow-section__header">
        <p class="ai-workflow-section__eyebrow" data-workflow-animate>AI Workflow</p>
        <h2 id="ai-workflow-title" data-workflow-animate>Turn ideas into intelligent actions.</h2>
        <p data-workflow-animate>Connect your goals, data, and tools into intelligent workflows that understand context, make decisions, and take action.</p>
      </div>
      <div class="ai-engine-card" aria-hidden="true" data-workflow-animate>
        <div><i data-lucide="cpu"></i><strong>Preevon AI</strong></div>
        <span>Processing workflow</span>
        <ul><li>Context</li><li>Intent</li><li>Action</li></ul>
      </div>
      <div class="ai-workflow-track" aria-label="Preevon AI workflow stages" data-workflow-track>
        ${workflowSteps.map((step, index) => `${workflowStep(step, index)}${index < workflowSteps.length - 1 ? workflowConnector(index) : ''}`).join('')}
      </div>
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
    ${featuresSection()}
    ${aiWorkflowSection()}
  </main>
  ${footer()}
`;
