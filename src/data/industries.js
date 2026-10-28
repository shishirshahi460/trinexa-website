// Pratyek industry page ko content. Key = page ko URL.
// Naya page ko lagi tyahi pattern ma naya entry thapnus.
// Optional: eyebrow, numbered: false, offeredTitle, offered (afno service cards)
export const industries = {
  '/services/startups': {
    label: 'Startups',
    intro:
      'Starting a business means making many decisions with limited time and budget. TRINEXA helps startups plan, build and launch practical digital products without unnecessary complexity.',
    stepsTitle: 'How we can support your startup',
    steps: [
      { title: 'Consulting', text: 'We listen to your idea, understand the problem it solves and suggest a sensible technical direction.' },
      { title: 'Validating', text: 'We help you define a focused first version so you can test your idea before investing in everything.' },
      { title: 'Developing', text: 'We design and build your product with clean, maintainable code that can grow with your business.' },
      { title: 'Expanding', text: 'Once your product is live, we help you improve it and add features as your needs change.' },
    ],
    whyTitle: 'Why work with TRINEXA',
    why: [
      { title: 'Practical solutions', text: 'We recommend what your business actually needs, not the most complicated option.' },
      { title: 'Clear communication', text: 'You always know what is being built, why, and what comes next.' },
      { title: 'Built to grow', text: 'We use modern, widely supported technologies so your product is easy to extend later.' },
      { title: 'Focus on usability', text: 'Good design matters. We aim for interfaces that are simple for your users to understand.' },
    ],
    faqs: [
      { q: 'What digital tools can you help us with?', a: 'It depends on your needs. After understanding your goals, we suggest a suitable option such as a website, web application or mobile application.' },
      { q: 'Do you also help with planning, not just development?', a: 'Yes. Consulting and planning are part of our services, and we are happy to discuss your idea before any development begins.' },
      { q: 'How can a website or app help my startup?', a: 'It gives customers a place to find you, understand what you offer and contact you or use your service. The right choice depends on your business.' },
      { q: 'Are there alternatives to building a full app?', a: 'Often, yes. A simple website or a small first version can be a good starting point. We will discuss options that match your budget and goals.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of your idea. We will discuss it and suggest the next step.' },
    ],
  },

  '/services/smes': {
    label: 'Small & Medium Enterprises',
    eyebrow: 'Industry size',
    numbered: false,
    intro:
      'Running a small or medium business means managing many tasks with limited time and people. TRINEXA helps SMEs use technology to simplify daily work and serve customers better.',
    stepsTitle: 'How we can support your business',
    steps: [
      { title: 'Digitize operations', text: 'We help move manual and paper-based processes into simple digital systems that save time and reduce errors.' },
      { title: 'Be competitive', text: 'A clear online presence and the right tools help you reach customers locally and beyond.' },
      { title: 'Technical consulting', text: 'We help you understand which software and tools suit your business, so you invest only in what you need.' },
      { title: 'Improve productivity', text: 'We build tools that help your team spend less time on repetitive work and more time on what matters.' },
    ],
    whyTitle: 'Why SMEs work with TRINEXA',
    why: [
      { title: 'Suited to your size', text: 'We recommend solutions that fit your budget and team, not enterprise-scale systems you do not need.' },
      { title: 'Start small', text: 'We can begin with one process or one tool, and add more as your business grows.' },
      { title: 'Easy to use', text: 'Your staff should be able to use the system without long training. We design with that in mind.' },
      { title: 'Ongoing support', text: 'We stay in touch after launch to answer questions and help with improvements.' },
    ],
    faqs: [
      { q: 'Which part of my business should I digitize first?', a: 'Usually the process that takes the most repeated manual effort. We can help you identify it during a short discussion.' },
      { q: 'Do we need a custom application, or is a website enough?', a: 'Many businesses start with a website. If you have specific workflows to manage, a custom application may help. We will explain the options honestly.' },
      { q: 'Can you work with our existing tools?', a: 'In many cases, yes. We will review what you currently use and suggest what to keep, improve or replace.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of your business and what you want to improve. We will discuss it and suggest the next step.' },
    ],
  },

  '/services/corporations': {
    label: 'Big Organizations & Corporations',
    numbered: false,
    intro:
      'Large organizations have complex systems, many teams and high expectations. TRINEXA helps corporations improve their digital tools and connect the systems they already use.',
    stepsTitle: 'How we can support your organization',
    steps: [
      { title: 'Regular meetings', text: 'We keep in regular contact to understand your requirements and adjust the work as your needs change.' },
      { title: 'Digitize workflows', text: 'We help plan and build digital solutions for the work functions that matter most to your organization.' },
      { title: 'Technical guidance', text: 'We share practical insights on suitable technologies so you can make informed decisions.' },
      { title: 'Post-launch support', text: 'After delivery, we help with questions, fixes and improvements so your systems keep running smoothly.' },
    ],
    offeredTitle: 'What are you looking to build?',
    offered: [
      {
        title: 'Business System Integration',
        text: 'Connect existing business applications so information flows between them without repeated manual entry.',
        to: '/#contact',
        linkLabel: 'Get started',
      },
      {
        title: 'Third-Party API Integration',
        text: 'Add the features of external services to your website or application through their APIs.',
        to: '/#contact',
        linkLabel: 'Get started',
      },
      {
        title: 'CRM, Accounts & Inventory',
        text: 'Connect your business with your CRM, accounting and inventory tools to improve day-to-day operations.',
        to: '/#contact',
        linkLabel: 'Get started',
      },
    ],
    whyTitle: 'Why corporations work with TRINEXA',
    why: [
      { title: 'Clear process', text: 'We follow a simple process: understand the problem, design a suitable solution and build it clearly.' },
      { title: 'Maintainable code', text: 'We write clean, documented code so your own team can understand and extend it later.' },
      { title: 'Respect for existing systems', text: 'We work with what you already have wherever possible, instead of replacing everything.' },
      { title: 'Open communication', text: 'You get regular updates and a direct line to the people building your solution.' },
    ],
    faqs: [
      { q: 'Can you connect our existing business systems?', a: 'Often, yes. It depends on the systems involved and what they allow. We will review them with you and explain what is possible.' },
      { q: 'How do you handle large or long projects?', a: 'We break the work into smaller stages with regular reviews, so you can see progress and adjust along the way.' },
      { q: 'Do you provide support after launch?', a: 'Yes. We can discuss ongoing support and improvements based on your needs.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of your requirements. We will discuss them and suggest the next step.' },
    ],
  },

  '/services/government': {
    label: 'Government Organizations',
    numbered: false,
    intro:
      'Public organizations serve many people and often work with older, paper-based processes. TRINEXA offers technical consulting and custom software to help government organizations modernize their work and serve the public more clearly.',
    stepsTitle: 'How we can support your organization',
    steps: [
      { title: 'Technical consulting', text: 'We review your current processes and suggest practical ways to digitize them and connect better with the public.' },
      { title: 'System architecture design', text: 'We plan how your system should be structured, so the work process is clear before development begins.' },
      { title: 'Data migration', text: 'We help move data from old systems, files or databases into a new system in an organized, careful way.' },
      { title: 'Data analysis', text: 'We help organize and study your data so that it can support better, evidence-based decisions.' },
      { title: 'Enterprise application development', text: 'We build applications around your workflows and requirements, designed to be maintained over the long term.' },
      { title: 'Support & upgrades', text: 'After launch, we can help with fixes, questions and upgrades so your system continues to work well.' },
    ],
    whyTitle: 'What we focus on',
    why: [
      { title: 'Clarity first', text: 'We document how the system works so that your team can understand, manage and extend it.' },
      { title: 'Step-by-step delivery', text: 'We break large projects into stages, with reviews along the way.' },
      { title: 'Careful with data', text: 'We treat your data with care and discuss security requirements with you from the start.' },
      { title: 'Public-friendly design', text: 'We design interfaces that are simple for citizens and staff to use.' },
    ],
    faqs: [
      { q: 'Can you help digitize our existing paper-based processes?', a: 'Yes, this is something we can discuss. We would first understand your current process, then suggest a practical way to move it online.' },
      { q: 'Can you move data from our old system?', a: 'In many cases, yes. It depends on the format and quality of the existing data. We would review it with you before planning the work.' },
      { q: 'How do you approach security and data protection?', a: 'We discuss your security requirements at the start and build with them in mind. The exact measures depend on the project and your organization\'s policies.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of your requirements. We will discuss them and suggest the next step.' },
    ],
    offeredTitle: 'Related services',
    offered: [
      {
        title: 'Training & Consulting',
        text: 'Guidance and training to help your team make suitable technology decisions.',
        to: '/services/training-consulting',
      },
      {
        title: 'Enterprise Application',
        text: 'Larger applications built around your organization\'s workflows and requirements.',
        to: '/services/enterprise',
      },
      {
        title: 'Website & Portals',
        text: 'Clear, accessible portals that help the public find information and services.',
        to: '/services/website-portals',
      },
    ],
  },
}