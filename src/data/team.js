// Team ko jankari yaha edit garnus.
// useFounder: true bhaye site.js ko founder (Shishir Shahi) ko naam, position ra photo aaucha.
// photo: public folder ma rakheko photo ko path (jastai '/cto.jpg'). null bhaye icon dekhincha.
// summary (optional): card ma dekhine chhoto professional line.
// bio (optional): popup ma dekhine pura bivaran.
// website (optional): popup ma link ko rupma dekhincha.
// Kunai section chahidaina bhane tyo object hataidinus.
export const team = {
  title: 'Leadership & Teams',
  text: 'A vision can come from one person, but building it takes a team.',
  groups: [
    {
      title: 'Leadership',
      members: [
        {
          useFounder: true,
          summary:
            "Leading TRINEXA's mission to build practical, well-designed digital solutions for startups and growing businesses.",
          bio: "Shishir Shahi is the Founder & CEO of TRINEXA Technologies Pvt. Ltd. He leads the company's vision of building practical digital solutions through thoughtful design and modern technology: understanding the problem, designing a suitable solution and building software that is clear, useful and maintainable.",
          website: 'https://shishirshahi.com.np',
        },
      ],
    },
    {
      title: 'Management Team',
      members: [
        { name: 'Team Member Name', role: 'Chief Technology Officer (CTO)', photo: null },
        { name: 'Team Member Name', role: 'Head of Design (UI/UX)', photo: null },
        { name: 'Team Member Name', role: 'Operations & Business Development Manager', photo: null },
      ],
    },
    {
      title: 'Core Team',
      members: [
        { name: 'Team Member Name', role: 'Full-Stack Developer', photo: null },
        { name: 'Team Member Name', role: 'Frontend Developer', photo: null },
        { name: 'Team Member Name', role: 'UI/UX Designer', photo: null },
        { name: 'Team Member Name', role: 'QA Engineer', photo: null },
      ],
    },
  ],
}