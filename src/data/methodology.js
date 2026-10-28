import {
  ClipboardList,
  ListChecks,
  Rocket,
  Layers,
  BadgeCheck,
  Users,
  ShieldCheck,
  LifeBuoy,
  Wallet,
} from 'lucide-react'

// TRINEXA ko working methodology. Afno actual process anusar edit garnus.
export const methodology = {
  label: 'Working Methodology',
  intro:
    'We follow a clear, step-by-step process to understand your project requirements in detail and streamline our work, so that we aim to deliver the expected solution on schedule. Our approach is simple: understand the problem, design a suitable solution and build software that is clear, useful and maintainable.',
  phases: [
    {
      id: 'requirement-analysis',
      icon: ClipboardList,
      title: 'Business Requirement Analysis',
      summary: 'Understand your needs and agree on scope, timeline and cost.',
      text: 'Good software starts with a clear understanding of what you need.',
      steps: [
        { title: 'Identify your requirements', text: 'We talk with you to understand your business, your users and the problem you want to solve.' },
        { title: 'Check feasibility', text: 'We review the requirements and discuss the possible technical approaches, so we can choose a sensible one.' },
        { title: 'Agree on scope, timeline and cost', text: 'We share an estimated timeline and cost, and agree on what will be built before the work begins.' },
      ],
    },
    {
      id: 'project-management',
      icon: ListChecks,
      title: 'Project Management',
      summary: 'Plan, design and build in small stages, with your feedback along the way.',
      text: 'We build in small, clear stages so you can see progress and adjust along the way.',
      steps: [
        { title: 'Project planning', text: 'We organize the work into tasks and a schedule, and decide how we will share progress with you.' },
        { title: 'Solution design', text: 'We design the structure and the interface of the product before development, so everyone understands the direction.' },
        { title: 'Iterative development', text: 'We build in short cycles, testing each part as we go, and improve it step by step.' },
        { title: 'Review & feedback', text: 'We share working versions with you, collect your feedback and make improvements before the final handover.' },
      ],
    },
    {
      id: 'deployment-support',
      icon: Rocket,
      title: 'Deployment & Support',
      summary: 'Launch the product, train your team and keep supporting you.',
      text: 'A project is not finished when it goes live. We help you start well and keep going.',
      steps: [
        { title: 'Deployment', text: 'We put the product online and check that it runs correctly on the devices and environments it is meant for.' },
        { title: 'Training', text: 'We explain how to use and manage the product, so your team feels confident.' },
        { title: 'Ongoing support', text: 'After launch, we can help with questions, fixes and improvements, based on what we agree with you.' },
      ],
    },
  ],

  factorsTitle: 'Key factors',
  factorsSubtitle: 'we consider for every project',
  factors: [
    {
      icon: Layers,
      title: 'Extensible architecture',
      text: 'We structure our products so that new or changed features can be added later without rebuilding everything.',
    },
    {
      icon: BadgeCheck,
      title: 'Quality assurance',
      text: 'We test our work throughout development and review it before delivery, so the product meets the standards we set for ourselves.',
    },
    {
      icon: Users,
      title: 'Customer-centric design',
      text: 'We discuss your requirements and review the design with you, so the product addresses your specific needs.',
    },
    {
      icon: ShieldCheck,
      title: 'Security at core',
      text: 'We follow sound security practices and discuss your requirements for protecting data and controlling access.',
    },
    {
      icon: LifeBuoy,
      title: 'Reliable support',
      text: 'We stay in touch after launch and respond to your questions and technical issues.',
    },
    {
      icon: Wallet,
      title: 'Clear, fair pricing',
      text: 'We explain what is included and aim to offer quality work at a fair price, so there are no surprises about the cost.',
    },
  ],
}