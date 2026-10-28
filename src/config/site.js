// Central site configuration. Deploy agadi sabai YOUR_* placeholder badalnus.
export const site = {
  name: 'TRINEXA',
  legalName: 'TRINEXA Technologies Pvt. Ltd.',
  tagline: 'Simple Ideas. Thoughtful Technology. Real Solutions.',
  description:
    'TRINEXA builds modern websites, custom software and digital experiences designed around real business needs.',
  founder: { name: 'Shishir Shahi', role: 'Founder & CEO', photo: '/shishir.jpg' },
  contact: {
    email: 'YOUR_BUSINESS_EMAIL', // naya business email banepachi yaha halnus
    whatsapp: '9779704786598', // international format, digits matra, + chhaina
    phone: '+977 9704786598', // dekhaune phone (optional)
    address: 'YOUR_OFFICE_ADDRESS', // jastai 'Kathmandu, Nepal' (optional)
  },
  // Real profile bhayepachi thapnus: { label: 'LinkedIn', href: 'https://...' }
  social: [],
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
}

const isSet = (v) => v && !v.startsWith('YOUR_')

export const contactInfo = {
  phone: isSet(site.contact.phone) ? site.contact.phone : null,
  address: isSet(site.contact.address) ? site.contact.address : null,
}

export const contactLinks = [
  isSet(site.contact.email) && { label: 'Email us', href: `mailto:${site.contact.email}`, icon: 'mail' },
  isSet(site.contact.whatsapp) && { label: 'WhatsApp', href: `https://wa.me/${site.contact.whatsapp}`, icon: 'chat' },
].filter(Boolean)