// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  homePage: path('', '/'),
};
export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
  features: '/features',
  client: '/client',
  enterprise: '/enterprise',
  driver: '/driver',
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  analytics: path(ROOTS_DASHBOARD, '/analytics'),
  general: {
    brandMap: path(ROOTS_DASHBOARD, '/brand-map'),
    comingSoon: path(ROOTS_DASHBOARD, '/coming-soon'),
  },
  store: {
    root: path(ROOTS_DASHBOARD, '/manage-store'),
    add: path(ROOTS_DASHBOARD, '/manage-store/add'),
    details: path(ROOTS_DASHBOARD, '/manage-store/details'),
    editInfo: path(ROOTS_DASHBOARD, '/manage-store/details/edit-info'),
    editAttrs: path(ROOTS_DASHBOARD, '/manage-store/details/edit-attrs'),
    editTemplates: path(ROOTS_DASHBOARD, '/manage-store/details/edit-templates'),
  },
  poi: {
    root: path(ROOTS_DASHBOARD, '/pois'),
    add: path(ROOTS_DASHBOARD, '/pois/add'),
    edit: path(ROOTS_DASHBOARD, '/pois/edit'),
  },
  poiBrand: {
    root: path(ROOTS_DASHBOARD, '/brand-pois'),
    add: path(ROOTS_DASHBOARD, '/brand-pois/add'),
    edit: path(ROOTS_DASHBOARD, '/brand-pois/edit'),
  },
  template: {
    root: path(ROOTS_DASHBOARD, '/templates'),
    edit: path(ROOTS_DASHBOARD, '/templates/edit-templates'),
  },
  asset: {
    root: path(ROOTS_DASHBOARD, '/manage-assets'),
    assets: path(ROOTS_DASHBOARD, '/manage-assets/list'),
    violations: path(ROOTS_DASHBOARD, '/manage-assets/violation/list'),
    add: path(ROOTS_DASHBOARD, '/manage-assets/add'),
    edit: path(ROOTS_DASHBOARD, '/manage-assets/edit'),
  },
  groupZone: {
    root: path(ROOTS_DASHBOARD, '/group-zones'),
    add: path(ROOTS_DASHBOARD, '/group-zones/add'),
    edit: path(ROOTS_DASHBOARD, '/group-zones/edit'),
  },
  tradeZone: {
    root: path(ROOTS_DASHBOARD, '/trade-zones'),
    tradeZoneCalendar: path(ROOTS_DASHBOARD, '/trade-zones/calendar'),
    tradeZoneVersion: path(ROOTS_DASHBOARD, '/trade-zones/versions-list'),
    tzVersionEdit: path(ROOTS_DASHBOARD, '/trade-zones/versions-list/edit'),
    tzVersionDetails: path(ROOTS_DASHBOARD, '/trade-zones/versions-list/details'),
    add: path(ROOTS_DASHBOARD, '/trade-zones/versions-list/add'),
    tradeZones: path(ROOTS_DASHBOARD, '/trade-zones/list'),
    addTz: path(ROOTS_DASHBOARD, '/trade-zones/list/add'),
    editTz: path(ROOTS_DASHBOARD, '/trade-zones/list/edit'),
  },
  task: {
    root: path(ROOTS_DASHBOARD, '/tasks'),
    add: path(ROOTS_DASHBOARD, '/tasks/add'),
    edit: path(ROOTS_DASHBOARD, '/tasks/edit'),
    details: path(ROOTS_DASHBOARD, '/tasks/details'),
  },
  team: {
    root: path(ROOTS_DASHBOARD, '/teams'),
    add: path(ROOTS_DASHBOARD, '/teams/add'),
    edit: path(ROOTS_DASHBOARD, '/teams/edit'),
  },
  agent: {
    root: path(ROOTS_DASHBOARD, '/agents'),
    add: path(ROOTS_DASHBOARD, '/agents/add'),
    edit: path(ROOTS_DASHBOARD, '/agents/edit'),
  },
  tracking: {
    root: path(ROOTS_DASHBOARD, '/trackings'),
  },
  order: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    add: path(ROOTS_DASHBOARD, '/orders/add'),
    edit: path(ROOTS_DASHBOARD, '/orders/edit'),
  },
  system: {
    root: path(ROOTS_DASHBOARD, '/settings'),
  },
};
