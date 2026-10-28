import {
  Layers,
  Terminal,
  ShieldCheck,
  Palette,
  BrainCircuit,
  Bug,
  ClipboardList,
  PenTool,
  Globe,
  Video,
  Megaphone,
  Search,
  CalendarDays,
  BookOpen,
  Laptop,
  Users,
  Target,
  GraduationCap,
  Clock,
} from 'lucide-react'

// Photo: `public` folder ma rakhnus (landscape 4:3, 300 KB bhanda sano, lowercase naam, space bina).
// Photo tayar bhayepachhi null ko thau ma '/campus.jpg' jasto lekhnus.
export const institutions = {
  heroImage: null, // '/campus.jpg'
  heroTitle: 'Empower Your Campus with Practical IT Training',
  heroText:
    'We want to partner with universities and colleges to offer flexible technology courses that fit into your curriculum, helping students build practical skills and supporting faculty development.',

  learnersTitle: 'Why Academic Learners Choose Us',
  learnersText:
    'We understand the scheduling and structural needs of academic institutions, and we plan our programs to adapt to your academic calendar.',
  learners: [
    {
      icon: CalendarDays,
      title: 'Flexible Scheduling',
      text: "Training modules that can fit into busy academic semesters, with schedules planned around your institution's needs.",
    },
    {
      icon: BookOpen,
      title: 'Tailored Curriculum',
      text: 'Learning paths can be adjusted to match your existing programs or upskilling goals. Choose the modules that suit you.',
    },
    {
      icon: Laptop,
      title: 'Hands-on Practice',
      text: 'Students practise with real tasks and small projects, so they apply what they learn rather than only reading about it.',
    },
    {
      icon: Users,
      title: 'Guidance from Practitioners',
      text: 'We plan to bring in practitioners who work with these technologies to guide sessions and support your faculty.',
    },
  ],

  partnerImage: null, // '/partner.jpg'
  partnerTitle: 'Why Academic Institutions Partner With Us',
  partnerText:
    'We offer flexible ways to work together that fit your operational needs, so delivery stays smooth for both students and faculty.',
  partners: [
    {
      icon: Target,
      title: 'Capstone & Project-Based Learning',
      text: 'Students work on practical projects with mentor guidance, linking classroom learning with real-world skills and building work they can show.',
    },
    {
      icon: GraduationCap,
      title: 'Faculty Enablement & Train-the-Trainer',
      text: 'We can support educators with training sessions and teaching resources, so they can confidently deliver course content themselves.',
    },
    {
      icon: Clock,
      title: 'Microlearning & Short Courses',
      text: 'Short, focused modules on specific skills, suited to quick upskilling and assessment preparation.',
    },
  ],

  coursesTitle: 'Explore Our Courses',
  coursesText: 'Practical IT and digital skills courses. Schedules, duration and fees are shared when you enquire.',
}

// Course ko jankari. Afno real curriculum anusar edit garnus.
// Optional: duration, format, fee (halepachhi course page ma dekhinchha). image: '/mern.jpg' jasto.
export const courses = [
  {
    slug: 'mern-stack-genai',
    title: 'MERN Stack Development with GenAI',
    icon: Layers,
    image: null,
    summary: 'Build full-stack web applications with MongoDB, Express, React and Node.js, and learn to use AI tools responsibly while you code.',
    overview:
      'This course takes you from JavaScript basics to building and deploying a complete full-stack project. You will also learn how generative AI tools can support your coding, and why generated code must always be reviewed and tested.',
    topics: ['JavaScript fundamentals', 'React components and state', 'Node.js and Express APIs', 'MongoDB data modelling', 'Authentication basics', 'Using GenAI tools to assist coding', 'Deploying a project'],
    outcomes: ['Build and deploy a full-stack web project', 'Connect a React front end to your own API', 'Use AI tools responsibly: review, test and understand generated code'],
    audience: ['Students interested in web development', 'Beginners with basic programming knowledge', 'Learners who want a portfolio project'],
    prerequisite: 'Basic computer skills. Some programming exposure helps but is not required.',
  },
  {
    slug: 'python',
    title: 'Python Training',
    icon: Terminal,
    image: null,
    summary: 'Learn Python from the basics and use it to solve everyday problems, automate tasks and work with data.',
    overview:
      'Python is a friendly language to start programming with. This course builds your fundamentals step by step and applies them to small practical projects.',
    topics: ['Variables, loops and functions', 'Lists, dictionaries and data structures', 'Working with files', 'Object-oriented basics', 'Using libraries', 'Simple automation scripts', 'Introduction to working with data'],
    outcomes: ['Write clear Python programs', 'Automate small repetitive tasks', 'Read and organise simple data'],
    audience: ['Complete beginners to programming', 'Students in IT and related fields', 'Professionals who want to automate work'],
    prerequisite: 'No programming experience needed.',
  },
  {
    slug: 'cybersecurity',
    title: 'Advanced Cybersecurity Course',
    icon: ShieldCheck,
    image: null,
    summary: 'Understand how systems and networks are protected, and learn the practices that reduce security risk.',
    overview:
      'This course covers the core ideas of cybersecurity, from how threats work to how organisations defend against them. It focuses on understanding risk and applying sound security practice.',
    topics: ['Security fundamentals', 'Network basics for security', 'Common threats and how they work', 'Authentication and access control', 'Secure configuration', 'Monitoring and incident response basics', 'Security awareness and good habits'],
    outcomes: ['Explain common threats and defences', 'Review a small system for basic security gaps', 'Apply good security practice in daily work'],
    audience: ['IT and computing students', 'System and network beginners', 'Professionals responsible for protecting data'],
    prerequisite: 'Basic understanding of computers and networks.',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design Training',
    icon: Palette,
    image: null,
    summary: 'Learn to design clear, easy-to-use interfaces, from understanding users to testing a prototype.',
    overview:
      'Good design starts with understanding people. This course walks you through the design process: researching users, sketching ideas, designing screens and testing them.',
    topics: ['User research', 'User flows and wireframes', 'Visual design basics', 'Layout, colour and typography', 'Prototyping', 'Usability testing', 'Preparing designs for developers'],
    outcomes: ['Design screens for a website or app', 'Build a clickable prototype', 'Test a design and improve it from feedback'],
    audience: ['Aspiring designers', 'Developers who want better design skills', 'Marketing and product staff'],
    prerequisite: 'No design experience needed.',
  },
  {
    slug: 'ai-for-everyone',
    title: 'AI For Everyone',
    icon: BrainCircuit,
    image: null,
    summary: 'A non-technical introduction to artificial intelligence and how to use AI tools well at work and in study.',
    overview:
      'You do not need to be a programmer to understand AI. This course explains the key ideas in plain language and shows how to use AI tools effectively, and carefully.',
    topics: ['What AI and machine learning are', 'Generative AI tools', 'Writing effective prompts', 'Using AI for study and work', 'Limits, errors and bias', 'Privacy and responsible use'],
    outcomes: ['Explain AI in simple terms', 'Use AI tools to save time on everyday tasks', 'Spot the limits and risks of AI answers'],
    audience: ['Students from any field', 'Working professionals', 'Business owners and managers'],
    prerequisite: 'No technical background needed.',
  },
  {
    slug: 'ethical-hacking',
    title: 'Ethical Hacking Training',
    icon: Bug,
    image: null,
    summary: 'Learn how security testing works, within legal and ethical limits, so you can help protect systems.',
    overview:
      'Ethical hacking means testing systems only with permission, to find weaknesses before others do. This course focuses on authorised testing, practised in controlled learning environments, and on reporting and fixing problems.',
    topics: ['Legal and ethical boundaries', 'How security testing works', 'Information gathering basics', 'Vulnerability assessment', 'Web application security basics', 'Writing clear findings reports', 'Defensive measures'],
    outcomes: ['Explain the process of an authorised security test', 'Identify common weaknesses in a lab setting', 'Report findings clearly and suggest fixes'],
    audience: ['IT and security students', 'Developers who want to build safer software', 'System administrators'],
    prerequisite: 'Basic networking and computer knowledge. All practice is done only in authorised learning environments.',
  },
  {
    slug: 'qa-testing',
    title: 'QA Training',
    icon: ClipboardList,
    image: null,
    summary: 'Learn how to test software carefully, find bugs and help teams release reliable products.',
    overview:
      'Quality assurance helps teams catch problems before users do. This course covers practical manual testing, clear bug reporting and an introduction to test automation.',
    topics: ['Testing fundamentals', 'Writing test cases', 'Manual testing', 'Bug reporting', 'API testing basics', 'Introduction to test automation', 'Working in agile teams'],
    outcomes: ['Plan and run tests for a web application', 'Write clear, useful bug reports', 'Understand where automation helps'],
    audience: ['Students and fresh graduates', 'Developers who want to test better', 'Career changers interested in QA'],
    prerequisite: 'No testing experience needed.',
  },
  {
    slug: 'graphic-design',
    title: 'Graphics Design Training',
    icon: PenTool,
    image: null,
    summary: 'Learn the principles of good design and use them to create posters, social media graphics and brand materials.',
    overview:
      'This course teaches the fundamentals of visual design and gives you hands-on practice creating graphics for print and digital use.',
    topics: ['Design principles', 'Colour and typography', 'Layout and composition', 'Logo and brand basics', 'Social media graphics', 'Print and digital formats', 'Working with design tools'],
    outcomes: ['Create clean, consistent graphics', 'Design simple brand materials', 'Prepare files for print and the web'],
    audience: ['Beginners interested in design', 'Marketing and content staff', 'Small business owners'],
    prerequisite: 'No design experience needed.',
  },
  {
    slug: 'web-design',
    title: 'Web Design Training',
    icon: Globe,
    image: null,
    summary: 'Design and build responsive websites that look good and work well on every device.',
    overview:
      'This course combines design thinking with practical front-end skills, so you can take a website from idea to a published page.',
    topics: ['HTML and CSS', 'Responsive layouts', 'Design principles for the web', 'Accessibility basics', 'Basic JavaScript', 'Images and performance', 'Publishing a website'],
    outcomes: ['Build a responsive website', 'Apply good layout and readability', 'Publish a site online'],
    audience: ['Beginners to web design', 'Students and graduates', 'Small business owners'],
    prerequisite: 'No coding experience needed.',
  },
  {
    slug: 'video-editing',
    title: 'Video Editing',
    icon: Video,
    image: null,
    summary: 'Edit videos for business and social media, from rough footage to a finished export.',
    overview:
      'Learn a complete editing workflow: organising footage, cutting a story, adding sound and titles, and exporting for different platforms.',
    topics: ['Editing workflow', 'Cutting and sequencing', 'Audio and music', 'Colour basics', 'Titles and effects', 'Storytelling for short videos', 'Exporting for platforms'],
    outcomes: ['Edit a short video from start to finish', 'Improve audio and visual quality', 'Export for social media and the web'],
    audience: ['Aspiring editors', 'Content creators', 'Marketing and media staff'],
    prerequisite: 'No editing experience needed.',
  },
  {
    slug: 'content-creation',
    title: 'Social and Multimedia Content Creation',
    icon: Megaphone,
    image: null,
    summary: 'Plan and create content for social media, from ideas and writing to photos, short videos and simple graphics.',
    overview:
      'This course shows how to create content with a purpose: planning what to share, producing it with simple tools, and checking what works.',
    topics: ['Content planning', 'Writing for social media', 'Photos and short videos', 'Simple graphics for posts', 'Brand voice and consistency', 'Scheduling', 'Reading basic analytics'],
    outcomes: ['Plan a month of content', 'Create posts in different formats', 'Review results and improve'],
    audience: ['Students and beginners', 'Small business owners', 'Marketing and communication staff'],
    prerequisite: 'No experience needed. A smartphone is enough to start.',
  },
  {
    slug: 'seo',
    title: 'SEO',
    icon: Search,
    image: null,
    summary: 'Learn how search engines work and how to help your website be found by the people who need it.',
    overview:
      'Search engine optimisation is about making your website useful and easy to find. This course covers the basics that matter most and how to measure progress.',
    topics: ['How search works', 'Keyword research', 'On-page SEO', 'Writing content for search', 'Technical SEO basics', 'Links and authority basics', 'Tracking with analytics tools'],
    outcomes: ['Improve a page for search', 'Plan content around what people search for', 'Track and report SEO progress'],
    audience: ['Marketing staff and students', 'Website owners', 'Content writers'],
    prerequisite: 'No experience needed. Basic knowledge of websites helps.',
  },
]