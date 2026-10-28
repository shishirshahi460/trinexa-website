import { Briefcase, GraduationCap, Lightbulb, Award, Target, Users, BookOpen } from 'lucide-react'

// Careers page ko content. Afno sahi jankari anusar edit garnus.
export const careers = {
  title: "Let's work together",
  intro:
    'We are building a small, focused team that cares about learning, clear communication and well-made software. If you enjoy solving real problems with technology, we would like to hear from you.',

  ways: [
    {
      icon: Briefcase,
      title: 'Current Vacancies',
      text: 'Apply for open positions and become part of our team.',
      cta: 'See Open Positions',
      to: '#openings', // # le shuru bhaye isi page ma scroll huncha
    },
    {
      icon: GraduationCap,
      title: 'Internship Program',
      text: 'Learn by working on real tasks with guidance from the team, in a professional workflow.',
      cta: 'Apply Now',
      to: '/academy/internship',
    },
    {
      icon: Lightbulb,
      title: 'Contributor',
      text: 'Have a useful idea or skill to share? Tell us how you would like to contribute.',
      cta: 'Join Now',
      to: '/contact',
    },
  ],

  culture: {
    eyebrow: 'We are a',
    title: 'People-centric company',
    text: 'We want TRINEXA to be a place where people can learn, try things, make mistakes and improve. Good software is built by people who feel trusted and supported.',
    points: [
      { icon: Award, title: 'Recognition', text: 'Good work should be noticed. We acknowledge effort and results openly.' },
      { icon: Target, title: 'Ownership', text: 'Take responsibility for your tasks, share ideas and help lead work to completion.' },
      { icon: Users, title: 'Mentoring', text: 'Questions are welcome. We help each other learn and grow.' },
      { icon: BookOpen, title: 'Learning first', text: 'We value curiosity and practice over knowing everything on day one.' },
    ],
  },

  fitTitle: 'Is TRINEXA the right place for you?',
  fitText:
    'You may be a good fit if you enjoy learning, take ownership of your work and like solving real problems with technology. Tell us about yourself, we would like to get to know you.',
  fitCta: 'Be Part of Our Team',

  openingsTitle: 'Current openings',
  // Real vacancy bhayepachi yaha thapnus. Udaharan:
  // { title: 'Frontend Developer', type: 'Full Time', text: 'Short description of the role.' },
  openings: [],
  noOpenings:
    'There are no open positions right now. You can still send us your CV and a short introduction, and we will keep it in mind for future roles.',
}