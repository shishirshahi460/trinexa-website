export const menu = [
  {
    label: 'Services',
    groups: [
      {
        title: 'Industry Types',
        items: [
          { label: 'Startups', to: '/services/startups' },
          { label: 'SMEs', to: '/services/smes' },
          { label: 'Corporations', to: '/services/corporations' },
          { label: 'Government Organizations', to: '/services/government' },
        ],
      },
      {
        title: 'Services',
        items: [
          { label: 'Website & Portals', to: '/services/website-portals' },
          { label: 'Custom Web & Mobile App', to: '/services/custom-apps' },
          { label: 'Enterprise Application', to: '/services/enterprise' },
          { label: 'Training & Consulting', to: '/services/training-consulting' },
        ],
      },
    ],
  },
  {
    label: 'Ventures',
    groups: [
      {
        items: [
          { label: 'All Ventures', to: '/ventures' },
          { label: 'Business Power Platform', to: '/ventures/business-power-platform' },
          { label: 'Education', to: '/ventures/education' },
          { label: 'Health Care', to: '/ventures/health-care' },
          { label: 'Food & Delivery', to: '/ventures/food-delivery' },
          { label: 'HR Care', to: '/ventures/hr-care' },
          { label: 'Travel & Recreation', to: '/ventures/travel-recreation' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    groups: [
      {
        items: [
          { label: 'Blogs', to: '/resources/blogs' },
          { label: 'Working Methodology', to: '/resources/working-methodology' },
          { label: 'Become a Partner', to: '/resources/partner' },
        ],
      },
    ],
  },
  { label: 'Academy', to: '/academy' },
  {
    label: 'Company',
    groups: [
      {
        items: [
          { label: 'About Us', to: '/company/about' },
          { label: 'Careers', to: '/company/careers' },
        ],
      },
    ],
  },
]

// Sabai page ko list (Page template le title khojna use garchha)
export const allPages = menu.flatMap((m) =>
  m.to ? [{ label: m.label, to: m.to }] : m.groups.flatMap((g) => g.items),
)