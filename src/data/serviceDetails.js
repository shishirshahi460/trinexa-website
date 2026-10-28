// Pratyek service page ko content. Key = page ko URL.
// Naya service ko lagi tyahi pattern ma naya entry thapnus.
export const serviceDetails = {
  '/services/website-portals': {
    label: 'Website & Portals Development',
    intro:
      'A good website gives customers one clear place to find your information and contact you. TRINEXA designs and builds responsive websites and portals that are easy to use and easy to maintain.',
    featuresTitle: 'What we can help with',
    features: [
      { title: 'Planning & design', text: 'We start by understanding your audience and goals, then design a clear structure and layout.' },
      { title: 'Responsive development', text: 'Your site is built to work well on phones, tablets and computers.' },
      { title: 'Content management', text: 'We can discuss ways to let your team update content without needing a developer for every change.' },
      { title: 'Hosting & domain setup', text: 'We can guide you through choosing hosting and connecting your domain with a secure (HTTPS) setup.' },
      { title: 'Search visibility basics', text: 'We build with clean structure and good page details so search engines can understand your site.' },
      { title: 'Support & updates', text: 'After launch, we can help with fixes, updates and improvements.' },
    ],
    buildTitle: 'What are you looking to build?',
    build: [
      { title: 'eCommerce Store', text: 'Present and sell your products or services online with a clear, simple shopping experience.' },
      { title: 'Business Website', text: 'A digital home where customers can learn about your company, services and how to reach you.' },
      { title: 'Blog / News Portal', text: 'Keep your audience informed with articles, updates and announcements.' },
      { title: 'Travel & Tourism Website', text: 'A travel portal that presents destinations, packages and booking enquiries.' },
      { title: 'Event Management Website', text: 'Share event details, schedules and registrations in one place.' },
    ],
    faqs: [
      { q: 'How long does a website take to build?', a: 'It depends on the size and features. After we understand your requirements, we can give you a realistic estimate.' },
      { q: 'Can I update the content myself?', a: 'Yes, this is something we can plan for. We will discuss the best way to manage your content during planning.' },
      { q: 'Do you help with domain and hosting?', a: 'We can guide you through choosing and setting these up. Details depend on your project and will be agreed with you.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of what you want to build. We will discuss it and suggest the next step.' },
    ],
  },

  '/services/custom-apps': {
    label: 'Custom Web & Mobile App Development',
    intro:
      'When ready-made tools do not fit your workflow, a custom application can. TRINEXA designs and builds web and mobile applications around your specific requirements, with a focus on usability and long-term maintainability.',
    featuresTitle: 'What we can help with',
    features: [
      { title: 'Project architecture', text: 'We plan how the parts of your application fit and communicate together, before development begins.' },
      { title: 'Graphic & UI design', text: 'We design clear, consistent interfaces so your application is easy for people to understand and use.' },
      { title: 'Web application development', text: 'We build responsive web applications that work in the browser on any device.' },
      { title: 'Mobile application development', text: 'We build mobile experiences designed around usability, accessibility and performance.' },
      { title: 'eCommerce features', text: 'We can add product listings, carts and ordering features where your business needs them.' },
      { title: 'Support & maintenance', text: 'After launch, we can help with fixes, updates and new features as your needs change.' },
    ],
    buildTitle: 'What are you looking to build?',
    build: [
      { title: 'Business Web Application', text: 'Tools to manage your internal processes, records and daily operations in one place.' },
      { title: 'Customer Portal', text: 'A secure space where your customers can view information, make requests or track progress.' },
      { title: 'Mobile Application', text: 'An app designed around how your users actually work, on the devices they use.' },
      { title: 'Online Ordering or Booking', text: 'Let customers order products or book services through a simple, clear flow.' },
      { title: 'Dashboard & Reporting', text: 'Present your data in clear views that help you and your team make decisions.' },
      { title: 'Something Else', text: 'Have a different idea or special requirement? Tell us and we will discuss what is possible.' },
    ],
    faqs: [
      { q: 'How do I know if I need a custom application?', a: 'If existing tools do not match how your business works, or you repeat a lot of manual steps, a custom application may help. We will give you an honest opinion.' },
      { q: 'Can you build both web and mobile versions?', a: 'Yes, we can discuss which makes sense for your users. Sometimes a good web application is enough to start with.' },
      { q: 'How is the cost decided?', a: 'The cost depends on the scope and features. After we understand your requirements, we can discuss a suitable plan and estimate.' },
      { q: 'Can we start with a small first version?', a: 'Yes, and we often recommend it. A focused first version lets you test your idea and add features based on real use.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of your project. We will discuss it and suggest the next step.' },
    ],
  },

  '/services/enterprise': {
    label: 'Enterprise Application Development',
    intro:
      'Enterprise applications bring your organization\'s processes into one organized system. TRINEXA helps plan and build business applications that support smoother workflows, clearer records and better day-to-day efficiency.',
    featuresTitle: 'What we can help with',
    features: [
      { title: 'Project architecture', text: 'We plan how the parts of your system fit together, so the structure is clear before development begins.' },
      { title: 'Graphic & UI design', text: 'We design interfaces that staff can learn quickly and use comfortably every day.' },
      { title: 'Business logic & workflows', text: 'We turn your approval steps, rules and processes into a system that follows them consistently.' },
      { title: 'Data & reporting', text: 'We help organize your data and present it in reports that support decisions.' },
      { title: 'Integration', text: 'Where possible, we connect your new system with the tools you already use.' },
      { title: 'Support & maintenance', text: 'After launch, we can help with fixes, updates and new features as your organization grows.' },
    ],
    buildTitle: 'What are you looking to build?',
    build: [
      { title: 'Enterprise Resource Planning (ERP)', text: 'Bring core business processes such as finance, HR and procurement into one organized system.' },
      { title: 'Healthcare Management System', text: 'Organize patient records, appointments and services so staff can work more efficiently.' },
      { title: 'Customer Relationship Management (CRM)', text: 'Keep track of customers and prospects, and manage your interactions with them in one place.' },
      { title: 'Human Resource Management (HRM)', text: 'Manage employee records, attendance, leave and other HR processes digitally.' },
      { title: 'Inventory Management System', text: 'Track stock, purchases and sales with a clear view of what you have and what you need.' },
      { title: 'Custom Development', text: 'Have a special requirement? Describe it and we will discuss how to build a suitable application.' },
    ],
    faqs: [
      { q: 'Do we need a full ERP, or something smaller?', a: 'Many organizations do not need a full ERP. We can start with the one or two processes that matter most and add more later.' },
      { q: 'Can the system match our own workflow?', a: 'Yes. A custom system can be built around your own steps, roles and approvals.' },
      { q: 'Can you connect it with our existing software?', a: 'Often, yes. It depends on the tools involved. We will review them with you and explain what is possible.' },
      { q: 'Do you provide support after launch?', a: 'Yes. We can discuss ongoing support and improvements based on your needs.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of your requirements. We will discuss them and suggest the next step.' },
    ],
  },

  '/services/training-consulting': {
    label: 'Training & Consulting',
    intro:
      'Good technology decisions start with good understanding. TRINEXA offers practical training and technical consulting to help individuals, teams and businesses learn modern tools and choose suitable solutions.',
    featuresTitle: 'What we can help with',
    features: [
      { title: 'Technical consulting', text: 'We review your goals and current tools, then suggest practical, suitable technology options.' },
      { title: 'Product validation', text: 'We help you review your product idea or early version and identify what to improve before you invest further.' },
      { title: 'Hands-on training', text: 'Practical sessions focused on real tasks, so learners can apply what they learn straight away.' },
      { title: 'Mentorship', text: 'Guidance for aspiring developers and tech entrepreneurs as they plan and build their first products.' },
      { title: 'Team workshops', text: 'Short, focused workshops that help your staff understand and use new digital tools.' },
      { title: 'Technology planning', text: 'We help you plan the steps of a digital project so the work is organized and realistic.' },
    ],
    buildTitle: 'How can we help you?',
    build: [
      { title: 'I want to learn', text: 'Ask us about training and mentorship for students and aspiring tech professionals.' },
      { title: 'My team needs training', text: 'Discuss a workshop or training plan suited to your organization.' },
      { title: 'I have a product idea', text: 'Talk to us about validating your idea and planning a sensible first version.' },
      { title: 'I need technical advice', text: 'Get guidance on which technologies and tools fit your business needs.' },
    ],
    faqs: [
      { q: 'Who are your training programs for?', a: 'Students, aspiring developers, tech entrepreneurs and business teams. The content is adjusted to the level of the learners.' },
      { q: 'Is the training on-site or online?', a: 'This depends on the program and the group. Contact us and we will discuss what suits you.' },
      { q: 'Can you design a training for our team?', a: 'Yes, we can discuss your needs and plan a workshop or training around them.' },
      { q: 'How do we get started?', a: 'Contact us with a short description of what you want to learn or achieve. We will discuss it and suggest the next step.' },
    ],
  },
}