// Course ko extra jankari (tab ko content). Afno real curriculum anusar edit garnus.
// Kunai course ko entry nabhaye, tyo course ma sadharan (default) content dekhinchha.
//
// curriculum ko dui format chalchha:
//   (a) lessons ma sections:  { title: 'Lesson 1: ...', sections: [{ title: '1.1 ...', topics: ['...'] }] }
//   (b) sadharan list:        { title: 'Module', topics: ['...'] }
//
// testimonials / stories: SACHHO student ko, unko anumati sahit matra halnus. Khali bhaye tab chhupchha.
//   testimonials: [{ name: 'Student name', course: 'Course name', text: 'Their own words' }]
//   stories: [{ name: 'Student name', college: 'College', company: 'Company', position: 'Position' }]
export const courseExtras = {
  'mern-stack-genai': {
    overviewLong: [
      'The MERN Stack Development with GenAI course teaches you to build complete web applications with MongoDB, Express.js, React and Node.js, using JavaScript on both the front end and the back end. You will learn how the pieces fit together: designing the database, building the server and API, and creating the interface people use.',
      'Throughout the course you will practise with tools used in real projects, such as Git and GitHub, TypeScript, Tailwind CSS and Postman. You will also learn how to use AI coding assistants responsibly, to speed up learning and debugging while still understanding and testing the code yourself.',
      'The course is project-based. You will build and deploy full-stack applications, so you finish with working projects you can show and explain.',
    ],
    tools: [
      'JavaScript (ES6+)',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Redux Toolkit',
      'React Hook Form',
      'Git and GitHub',
      'Postman',
      'Jest',
      'JWT authentication',
      'Nodemailer',
      'Cloudinary',
      'WebSockets',
      'AI coding assistants',
      'Vercel and Render',
    ],
    curriculum: [
      {
        title: 'Lesson 1: JavaScript with Git',
        sections: [
          {
            title: '1.1 Introduction to Web Development and Git Basics',
            topics: [
              'An overview of web development',
              'The MERN stack roadmap',
              'Setting up Node.js, MongoDB, VS Code and Git',
            ],
          },
          {
            title: '1.2 JavaScript Basics',
            topics: ['Data types and variables', 'Operators and expressions', 'Functions, arrays and objects'],
          },
          {
            title: '1.3 Functions in Depth',
            topics: [
              'Function declarations and expressions',
              'Arrow functions',
              'Scope and closures',
              'Higher-order functions and callbacks',
              'async / await',
            ],
          },
          {
            title: '1.4 Data Structures and Algorithms Overview',
            topics: ['Stacks and queues', 'Linked lists', 'Searching and sorting'],
          },
          {
            title: '1.5 Modern JavaScript (ES6+)',
            topics: [
              'let, const and template literals',
              'Promises and async / await',
              'Hoisting and prototypes',
              'Object-oriented JavaScript',
            ],
          },
          {
            title: '1.6 Git and Version Control',
            topics: [
              'Git and GitHub basics',
              'Branching, merging and resolving conflicts',
              'Collaboration with pull requests, tags and releases',
              'Good version-control practice',
            ],
          },
          {
            title: '1.7 TypeScript',
            topics: [
              'Why use TypeScript',
              'Setting up TypeScript in a project',
              'Types and interfaces',
              'Enums and tuples',
              'Functions and generics',
            ],
          },
        ],
      },
      {
        title: 'Lesson 2: Front-End Technology, React and Next.js with AI',
        sections: [
          {
            title: '2.1 The Web and Web Applications',
            topics: [
              'What the web is and how it grew from static pages to dynamic applications',
              'Websites compared with web applications',
              'HTML, CSS and JavaScript as the foundations',
            ],
          },
          {
            title: '2.2 HTML and CSS Basics',
            topics: [
              'Semantic tags and accessibility',
              'Using AI tools to draft HTML, and checking what they produce',
              'The CSS box model, styling and positioning',
              'Responsive design with media queries and flexible grids',
              'Design prototyping with Figma',
            ],
          },
          {
            title: '2.3 Tailwind CSS',
            topics: ['The utility-first approach', 'Setting up and using Tailwind', 'Customising the configuration'],
          },
          {
            title: '2.4 DOM Manipulation with JavaScript',
            topics: [
              'Events, traversal and manipulation',
              'Asynchronous operations with callbacks and promises',
            ],
          },
        ],
      },
      {
        title: 'Lesson 3: React Fundamentals (with TypeScript)',
        sections: [
          {
            title: '3.1 Introduction',
            topics: ['Why React', 'Setting up a React project'],
          },
          {
            title: '3.2 Core Concepts',
            topics: [
              'JSX and components',
              'State and props',
              'Lifecycle and hooks such as useState and useEffect',
            ],
          },
          {
            title: '3.3 The React Ecosystem',
            topics: [
              'React frameworks (Next.js, Remix, Gatsby) and how to choose',
              'Client-side routing with ',
            ],
          },
          {
            title: '3.4 Advanced React',
            topics: [
              'Dynamic and nested routes',
              'Forms and validation with Formik or React Hook Form',
              'REST, gRPC, SOAP and GraphQL compared',
              'Error handling and debugging with AI help',
              'Global state with Redux Toolkit or Zustand',
              'Real-time communication with WebSockets',
              'GraphQL queries, mutations and schemas',
              'Test-driven development with Jest and React Testing Library',
              'Performance: React DevTools, memoisation and code splitting',
              'AI in the front end: using AI APIs and building chatbot interfaces',
            ],
          },
        ],
      },
      {
        title: 'Lesson 4: React with Next.js',
        sections: [
          {
            title: '4.1 Introduction to Next.js',
            topics: ['What Next.js is and its benefits', 'How it compares with other frameworks'],
          },
          {
            title: '4.2 Project Architecture',
            topics: ['Structuring files and folders so the project can grow'],
          },
          {
            title: '4.3 Next.js Features',
            topics: [
              'File-based and dynamic routing',
              'Server-side rendering: when and how to use it',
              'Static site generation',
              'Client-side data fetching with SWR and useEffect',
              'Creating and securing API routes',
              'Middleware',
            ],
          },
          {
            title: '4.4 AI in React and Next.js',
            topics: [
              'Adding AI features such as chatbots or recommendations',
              'Using AI tools to speed up debugging and performance checks',
            ],
          },
        ],
      },
      {
        title: 'Lesson 5: Front-End Project Module',
        sections: [
          {
            title: '5.1 Front-End Project',
            topics: [
              'Designing and building a web application with React',
              'Building admin (MIS / CMS) modules with React and external APIs',
              'Building sites with Next.js, such as a blog, e-commerce store or POS application',
              'Debugging and live coding with AI assistance',
            ],
          },
        ],
      },
      {
        title: 'Lesson 6: Node.js with Express',
        sections: [
          {
            title: '6.1 Introduction to Node.js',
            topics: [
              'Event-driven architecture',
              'npm and managing packages',
              'Built-in modules: fs, path and http',
              'Asynchronous programming in Node.js',
            ],
          },
          {
            title: '6.2 Express.js with AI',
            topics: [
              'Setting up a basic Express application',
              'Project structure and the MVC pattern',
              'Built-in, third-party and custom middleware',
              'File uploads with cloud services such as AWS S3 or Cloudinary',
              'Sending email with Nodemailer',
              'Using AI tools such as GitHub Copilot or OpenAI Codex to analyse and debug errors',
            ],
          },
          {
            title: '6.3 Authentication and Authorisation',
            topics: [
              'JWT authentication',
              'OAuth and session management',
              'Roles and permissions',
              'Role-based access control in an application',
            ],
          },
        ],
      },
      {
        title: 'Lesson 7: Databases and How to Use Them',
        sections: [
          {
            title: '7.1 MongoDB (NoSQL)',
            topics: [
              'NoSQL basics, and SQL compared with NoSQL',
              'CRUD operations',
              'Indexing and aggregation',
              'Connecting MongoDB to Express with Mongoose and modelling data',
              'Using AI tools to help write aggregation pipelines, then checking them',
              'Error handling and debugging',
            ],
          },
          {
            title: '7.2 SQL Databases',
            topics: [
              'An introduction to SQL and popular databases: MySQL, PostgreSQL and SQLite',
              'MySQL compared with PostgreSQL',
              'Tables, joins, indexing and transactions',
              'Normalisation and why it matters',
              'ORMs compared with raw SQL queries',
              'Writing complex queries for normalised tables, with AI help',
            ],
          },
        ],
      },
      {
        title: 'Lesson 8: Project Modules',
        sections: [
          {
            title: '8.1 Backend Projects',
            topics: ['Building a REST API with Node.js and Express, connected to a database'],
          },
          {
            title: '8.2 AI Modules',
            topics: ['Chatbot integration', 'Content recommendations', 'Intelligent form validation'],
          },
          {
            title: '8.3 Final Full-Stack Project',
            topics: [
              'A full-stack project combining Next.js, Express.js and MongoDB, PostgreSQL or MySQL',
              'Project ideas: a management system, real-time chat application, e-commerce store or blog platform',
            ],
          },
          {
            title: '8.4 Deployment',
            topics: ['Deploying your application to platforms such as Vercel and Render'],
          },
        ],
      },
    ],
    why: [
      { title: 'One language, full stack', text: 'JavaScript runs on both the front end and the back end, so you can build a complete application with one language.' },
      { title: 'Project-based learning', text: 'You learn by building real applications, not only by reading about concepts.' },
      { title: 'Modern tools', text: 'You work with tools used in current projects, such as TypeScript, Git, Tailwind CSS and Postman.' },
      { title: 'AI used responsibly', text: 'You learn to use AI assistants to learn faster and debug better, while checking and understanding every line you ship.' },
      { title: 'Guidance from the team', text: 'Ask questions and get feedback on your work from people who build software for a living.' },
      { title: 'Work you can show', text: 'You finish with working, deployed projects that you can explain in an interview or add to a portfolio.' },
    ],
    faqs: [
      {
        q: 'What are the prerequisites for joining the MERN stack course?',
        a: 'Basic computer skills and a willingness to practise. Some programming experience helps but is not required, because the course begins with JavaScript fundamentals.',
      },
      {
        q: 'What outcome can I expect after completing this course?',
        a: 'You will be able to build and deploy a full-stack web application, connect a React front end to your own API and database, and work with Git. Your results depend on how much you practise.',
      },
      {
        q: 'How is AI used in this course?',
        a: 'AI assistants are used as learning and productivity tools, for example to explain errors, suggest approaches and draft code. You are taught to read, test and understand any generated code, and you are expected to understand what you submit.',
      },
      {
        q: 'What roles can I apply for after this course?',
        a: 'Common starting points include junior front-end, back-end or full-stack developer roles and related internships. We cannot promise a job; it depends on your practice, your portfolio and the job market.',
      },
      {
        q: 'What kind of support do I get during the course?',
        a: 'You can ask questions during sessions and get feedback on your work from the team. Support details are confirmed for each batch.',
      },
      {
        q: 'Can I choose a class schedule that fits my availability?',
        a: 'We plan to offer flexible schedules. Tell us what suits you when you enquire, and we will check what is possible for the next batch.',
      },
      {
        q: 'What is the training mode for the course?',
        a: 'Whether a batch runs online, on-site or both is confirmed when you enquire.',
      },
    ],
    testimonials: [],
    stories: [],
    related: ['web-design', 'python', 'ui-ux-design'],
  },
}