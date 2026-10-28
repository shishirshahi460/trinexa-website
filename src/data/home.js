// Home page ko sabai text yaha edit garnus.
// image: afno photo ko path (jastai '/photo1.jpg'). null bhaye hariyo T illustration dekhincha.
export const home = {
  hero: {
    title: 'Empowering Businesses Through Technology',
    text: 'We design and develop smart, scalable, and affordable software solutions that help startups, SMEs, and growing businesses streamline operations, improve efficiency, and accelerate digital growth. From custom software and web development to business automation and digital transformation, we turn innovative ideas into powerful digital solutions.',
  },

  digital: {
    title: 'Connect your business with the digital world',
    paragraphs: [
      'Technology is now part of everyday life. Customers search, compare and contact businesses from their phones, and expect a clear, fast digital experience.',
      'Businesses that do not have a suitable digital presence risk being left behind. It is a good time to put the right digital tools in place and reach a wider audience.',
      'TRINEXA provides fitting solutions to help your business connect with the digital world.',
    ],
    image: '/photo1.jpg',
  },

  // "Let's Talk" card. Real client testimonial bhayepachi text/name/role badalna sakinchha.
  talk: {
    text: 'Have an idea, a problem to solve or a project to plan? Tell us what you are working on, and we will discuss how technology can help.',
    name: "Let's build something useful together",
    role: 'TRINEXA Technologies Pvt. Ltd.',
    button: "Let's Talk",
  },

  industries: {
    title: 'Focus on your business, we will help with the technology',
    text: 'Managing technical infrastructure can be costly and difficult. Let us help with the technical side, so you can focus on your core business.',
    items: [
      {
        title: 'Startups',
        text: 'We support emerging startups with consulting, planning and practical technical solutions that help them build and launch their products.',
        to: '/services/startups',
      },
      {
        title: 'SMEs',
        text: 'Running a small or medium business is challenging. We help SMEs simplify daily work with suitable digital tools.',
        to: '/services/smes',
      },
      {
        title: 'Corporations',
        text: 'We help large organizations improve their digital tools and connect the systems they already use.',
        to: '/services/corporations',
      },
      {
        title: 'Government',
        text: 'We offer technical consulting and custom solutions to help public organizations modernize their work.',
        to: '/services/government',
      },
    ],
  },

  support: {
    title: 'Support for startups and young innovators',
    text: 'We want to help aspiring founders turn their ideas into real products, with technical guidance, practical advice and learning resources.',
    items: [
      {
        title: 'Ventures',
        text: 'Our own planned digital ventures in areas such as education, health care, food, HR and travel.',
        to: '/ventures',
      },
      {
        title: 'Startup Support',
        text: 'Technical help and planning support to bring your product idea to life.',
        to: '/services/startups',
      },
      {
        title: 'Academy',
        text: 'Learning and guidance for students and young innovators interested in technology and product development.',
        to: '/academy',
      },
    ],
  },
}