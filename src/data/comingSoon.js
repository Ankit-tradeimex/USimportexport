export const COMING_SOON = {
  clients: {
    title: 'Clients',
    text: 'Our client network and the teams that trust USImportdata are coming to this page.',
    features: [
      {
        icon: 'building',
        title: 'Client network',
        text: 'The companies and teams that use USImportdata every day.',
      },
      {
        icon: 'users',
        title: 'Who we support',
        text: 'Importers, exporters, freight forwarders, analysts and more.',
      },
      {
        icon: 'shield',
        title: 'Quality you can trust',
        text: 'How we keep our trade records accurate and up to date.',
      },
      {
        icon: 'chart',
        title: 'Results',
        text: 'What clients achieve with US import and export data.',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    text: 'Answers to the most common questions about our US trade data are on the way.',
    features: [
      {
        icon: 'search',
        title: 'Find answers fast',
        text: 'Questions grouped by topic, so you can jump to what you need.',
      },
      {
        icon: 'database',
        title: 'About the data',
        text: 'Where our records come from and how often they are updated.',
      },
      {
        icon: 'users',
        title: 'Accounts and access',
        text: 'How sign up, plans and the dashboard work.',
      },
      {
        icon: 'mail',
        title: 'Still stuck?',
        text: 'A direct line to our team for anything not covered.',
      },
    ],
  },
  'data-sample': {
    title: 'Data Sample',
    text: 'A full sample of our US trade data, with every field, is coming to this page.',
    features: [
      {
        icon: 'file',
        title: 'Full sample records',
        text: 'Real-looking bill of lading records with all fields.',
      },
      { icon: 'database', title: 'Import and export', text: 'Samples for both sides of US trade.' },
      {
        icon: 'search',
        title: 'Your product',
        text: 'Request a sample for your own product or HS code.',
      },
      {
        icon: 'zap',
        title: 'Fast reply',
        text: 'Our team sends your sample as soon as it is ready.',
      },
    ],
  },
  'about-us': { title: 'About Us' },
  'privacy-policy': { title: 'Privacy Policy', stage: 1 },
  'terms-of-use': { title: 'Terms & Conditions', stage: 1 },

  // login and sign up, in every spelling a header or footer might use
  login: { title: 'Login', text: 'Login to the dashboard is opening soon.', stage: 3 },
  'log-in': { title: 'Login', text: 'Login to the dashboard is opening soon.', stage: 3 },
  signin: { title: 'Login', text: 'Login to the dashboard is opening soon.', stage: 3 },
  'sign-in': { title: 'Login', text: 'Login to the dashboard is opening soon.', stage: 3 },
  signup: { title: 'Sign Up', text: 'Sign up for the dashboard is opening soon.', stage: 3 },
  'sign-up': { title: 'Sign Up', text: 'Sign up for the dashboard is opening soon.', stage: 3 },
  register: { title: 'Sign Up', text: 'Sign up for the dashboard is opening soon.', stage: 3 },
};

// ['about-us'] -> { title: 'About Us' }, or null when the path is not on the list
export const comingSoonFor = (segments = []) =>
  COMING_SOON[segments.join('/').toLowerCase()] || null;
