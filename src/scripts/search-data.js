export const searchItems = [
  { title: 'Home', description: 'Return to the Preevon product homepage and hero overview.', category: 'Pages', href: '#main-content', icon: 'home', keywords: ['overview', 'landing', 'start'] },
  { title: 'About', description: 'Learn about Preevon\'s vision for intelligent SaaS workflows.', category: 'Pages', href: '#about', icon: 'building-2', keywords: ['company', 'team', 'mission'] },
  { title: 'Features', description: 'Explore automation, analytics, collaboration, and AI features.', category: 'Pages', href: '#features', icon: 'sparkles', keywords: ['product', 'tools', 'ai'] },
  { title: 'Integrations', description: 'Connect Preevon with the tools your team already uses.', category: 'Pages', href: '#integrations', icon: 'plug-zap', keywords: ['apps', 'connectors', 'workflow'] },
  { title: 'Pricing', description: 'Compare plans and find the right package for your team.', category: 'Pages', href: '#pricing', icon: 'badge-dollar-sign', keywords: ['plans', 'billing', 'subscription'] },
  { title: 'Blog', description: 'Read product updates, workflow strategy, and AI SaaS insights.', category: 'Pages', href: '#blog', icon: 'newspaper', keywords: ['articles', 'news', 'insights'] },
  { title: 'Contact', description: 'Talk with the Preevon team about sales, support, or partnerships.', category: 'Pages', href: '#contact', icon: 'send', keywords: ['sales', 'message', 'email'] },
  { title: 'Careers', description: 'Discover open roles and help build the future of work.', category: 'Pages', href: '#careers', icon: 'briefcase-business', keywords: ['jobs', 'hiring', 'work'] },
  { title: 'Support Center', description: 'Find guides, FAQs, and help resources for Preevon.', category: 'Pages', href: '#support-center', icon: 'life-buoy', keywords: ['help', 'faq', 'customer'] },
  { title: 'Documentation', description: 'Browse developer-ready references and implementation guidance.', category: 'Pages', href: '#documentation', icon: 'book-open-text', keywords: ['docs', 'api', 'developer'] },
  { title: 'Changelog', description: 'Review the latest releases, improvements, and product fixes.', category: 'Resources', href: '#changelog', icon: 'list-checks', keywords: ['release', 'updates', 'versions'] },
  { title: 'Privacy Policy', description: 'Understand how Preevon protects customer data and privacy.', category: 'Resources', href: '#privacy-policy', icon: 'shield-check', keywords: ['security', 'data', 'compliance'] },
  { title: 'Terms & Conditions', description: 'Read the policies and terms for using Preevon.', category: 'Resources', href: '#terms-and-conditions', icon: 'file-text', keywords: ['legal', 'terms', 'conditions'] },
];

const normalize = (value) => value.toLowerCase().trim();

export const popularSearches = ['Features', 'Pricing', 'Integrations', 'Documentation'];

export const suggestedItems = searchItems.filter((item) =>
  ['Features', 'Integrations', 'Pricing', 'Support Center'].includes(item.title),
);

export const searchCatalog = (query) => {
  const term = normalize(query);
  if (!term) return [];

  return searchItems.filter((item) => {
    const haystack = [item.title, item.description, item.category, ...item.keywords]
      .map(normalize)
      .join(' ');

    return haystack.includes(term);
  });
};
