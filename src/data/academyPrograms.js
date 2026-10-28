import { Palette, Megaphone, Video, Smartphone, FileText, Code2 } from 'lucide-react'

// Academy ka program haru. Afno real jankari anusar edit garnus.
// course ma duration / format halepachhi matra card ma dekhinchha (ahile null).
// tracks ma intake ko thau ma real date halnus (jastai 'Batch starts 1 January').
export const programs = [
  {
    slug: 'professional-courses',
    title: 'Professional Courses',
    text: 'Focused, well-organized lessons in web development and related skills, built around practical projects.',
    intro:
      'Focused, well-organized lessons in web development and related digital skills, built around practical projects. Schedules, duration and fees are shared when you enquire.',
    highlights: [
      { title: 'Project-based', text: 'Each course is built around practical work, so you apply what you learn.' },
      { title: 'Clear structure', text: 'Lessons follow an organized plan, from the basics to more advanced topics.' },
      { title: 'Guidance from the team', text: 'Ask questions and get feedback from people who work with this technology.' },
    ],
    coursesTitle: 'Course areas',
    coursesText: 'Choose the area you want to learn. Contact us for the schedule, duration and fees.',
    courses: [
      {
        title: 'UX/UI Design',
        icon: Palette,
        text: 'Learn how to plan screens and flows and design clear, easy-to-use interfaces.',
        topics: ['User research', 'Wireframes', 'Interface design', 'Prototyping'],
        duration: null, // jastai '8 weeks'
        format: null, // jastai 'Live classes'
      },
      {
        title: 'Digital Marketing',
        icon: Megaphone,
        text: 'Plan and run basic online marketing for a business, from content to simple reporting.',
        topics: ['Social media', 'Content planning', 'Search visibility', 'Basic reporting'],
        duration: null,
        format: null,
      },
      {
        title: 'Video Editing',
        icon: Video,
        text: 'Edit short videos for business and social media, from rough footage to a finished export.',
        topics: ['Cutting and sequencing', 'Sound and music', 'Titles and effects', 'Exporting'],
        duration: null,
        format: null,
      },
      {
        title: 'Mobile Development',
        icon: Smartphone,
        text: 'Build the basics of mobile apps: screens, navigation and working with data.',
        topics: ['App screens', 'Navigation', 'Working with data', 'Testing'],
        duration: null,
        format: null,
      },
      {
        title: 'Proposal Writing',
        icon: FileText,
        text: 'Learn to write clear project and business proposals that explain the problem, the plan and the cost.',
        topics: ['Understanding requirements', 'Structuring a proposal', 'Budgets and timelines', 'Clear writing'],
        duration: null,
        format: null,
      },
      {
        title: 'Web Development',
        icon: Code2,
        text: 'Build responsive websites and learn how modern web applications are put together.',
        topics: ['HTML and CSS', 'JavaScript', 'Responsive layouts', 'Working with APIs'],
        duration: null,
        format: null,
      },
    ],
  },

  {
    slug: 'internship',
    title: 'Internship Program',
    text: 'Students and fresh graduates learn by working on real tasks with guidance from the team.',
    intro:
      'A practical way for students and fresh graduates to build real experience. Work on real tasks, learn how a professional team plans and delivers work, and get guidance along the way. Choose the format that fits your time and goals.',
    highlights: [
      { title: 'Real tasks', text: 'Work on practical tasks instead of only reading about them.' },
      { title: 'Guidance', text: 'Get feedback and support from team members while you learn.' },
      { title: 'Work habits', text: 'Learn how a team plans, communicates and delivers work.' },
    ],
    tracksTitle: 'Choose your path',
    tracksText: 'Three ways to join. Start dates and selection details are shared when a batch opens.',
    tracks: [
      {
        badge: 'Short trial',
        title: '4-Week Program',
        text: 'A short, focused introduction to working in a technology team, designed for people who are busy with their studies and want to try the field first.',
        bestFor: 'Students who want a short trial before committing.',
        duration: '4 weeks',
        intake: 'Start date shared when a batch opens',
        cta: 'Apply Now',
        action: 'contact',
      },
      {
        badge: 'In-depth',
        title: '3-Month Program',
        text: 'A longer placement for people who are ready to build a career in technology but do not yet have working experience. Experience a professional work environment and take on real tasks.',
        bestFor: 'Learners ready to build hands-on experience.',
        duration: '3 months',
        intake: 'Start date shared when a batch opens',
        cta: 'Apply Now',
        action: 'contact',
      },
      {
        badge: 'Open applications',
        title: 'Join Our Intern Pool',
        text: 'We welcome applications from motivated, curious people at any time. Send your CV with a short introduction, and we will get in touch when a suitable opportunity opens.',
        bestFor: 'Self-motivated people who want to be considered for future openings.',
        duration: 'Flexible',
        intake: 'You can apply anytime',
        cta: 'Drop Your CV',
        action: 'cv',
      },
    ],
    areasTitle: 'Areas you can apply for',
    areasText: 'Availability depends on our current needs. Tell us your area of interest when you apply.',
    areas: ['Web development', 'UI/UX design', 'Digital marketing', 'Content and video', 'Operations and admin'],
    stepsTitle: 'How it works',
    steps: [
      { title: 'Apply', text: 'Send your details or CV and tell us which area interests you.' },
      { title: 'Talk with us', text: 'We have a short conversation to understand your goals and skills.' },
      { title: 'Start working', text: 'Get tasks suited to your level, with guidance from the team.' },
      { title: 'Review and grow', text: 'Receive feedback along the way and see how far you have progressed.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Students', text: 'Learners who want practical experience alongside their studies.' },
      { title: 'Fresh graduates', text: 'Graduates who want to build confidence before their first job.' },
    ],
  },

  {
    slug: 'community-programs',
    title: 'Community Programs',
    text: 'Workshops and sessions where young entrepreneurs can learn the basics of turning an idea into a product.',
    intro:
      'Workshops and sessions where young entrepreneurs can learn the basics of turning an idea into a product. Topics and dates are shared when you enquire.',
    highlights: [
      { title: 'Start with the idea', text: 'Learn how to describe a problem and shape a simple first version.' },
      { title: 'Learn together', text: 'Meet others who are building their own ideas and share experience.' },
      { title: 'Practical basics', text: 'Understand the basic steps from planning to launching a product.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Young entrepreneurs', text: 'Founders with an idea who want to understand how products are built.' },
      { title: 'Students', text: 'Learners interested in technology and starting something of their own.' },
    ],
  },

  {
    slug: 'mentorship',
    title: 'Mentorship',
    text: 'One-to-one guidance for learners and founders who want advice on their first technology project.',
    intro:
      'One-to-one guidance for learners and founders who want advice on their first technology project. Tell us what you are working on and we will discuss how we can help.',
    highlights: [
      { title: 'One-to-one', text: 'Discuss your own project and questions, not a general lesson.' },
      { title: 'Practical advice', text: 'Get suggestions on planning, tools and the next sensible step.' },
      { title: 'Honest feedback', text: 'Hear clear opinions on your idea or your work so far.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Learners', text: 'People building their first technology project and looking for direction.' },
      { title: 'Founders', text: 'Early-stage founders who want an outside view on their plan.' },
    ],
  },
]