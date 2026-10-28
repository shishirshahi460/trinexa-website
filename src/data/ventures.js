// Pratyek venture page ko content. Key = page ko URL.
// status: afno product ko sahi stage lekhnus (Concept stage / In development / Launched)
// note (optional): page ma dekhine sano sutra
// Naya venture ko lagi tyahi pattern ma naya entry thapnus.
export const ventures = {
  '/ventures/business-power-platform': {
    label: 'Business Power Platform',
    status: 'Concept stage',
    intro:
      'A planned platform that helps non-technical entrepreneurs build and manage simple business websites and applications without writing code. Our goal is to make the first step into digital business easier and more affordable.',
    problemTitle: 'The problem we want to solve',
    problems: [
      { title: 'Technology feels out of reach', text: 'Many founders have good business ideas but no technical team to turn them into a website or app.' },
      { title: 'Development can be costly', text: 'Hiring developers for every small change can be expensive and slow for small businesses.' },
      { title: 'Changes take too long', text: 'Updating text, images or products should not require waiting for a developer.' },
      { title: 'Too many separate tools', text: 'Websites, forms, media and marketing are often spread across different tools that do not work together.' },
    ],
    featuresTitle: 'Planned features',
    features: [
      { title: 'Drag-and-drop builder', text: 'Build pages and sections visually, without writing code.' },
      { title: 'Business data manager', text: 'Manage products, services and other business information in one place and show it across your site.' },
      { title: 'Inline editing', text: 'Update content directly on the page and see the change right away.' },
      { title: 'Form builder', text: 'Collect enquiries, orders or registrations with simple custom forms.' },
      { title: 'Media manager', text: 'Keep all your images and files organized in one central place.' },
      { title: 'Menu & SEO tools', text: 'Create clear navigation and basic search-friendly settings for your pages.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Non-technical founders', text: 'People with a business idea who want to start online without a development team.' },
      { title: 'Small businesses', text: 'Shops and service providers who want to manage their own website content.' },
      { title: 'Partner agencies', text: 'Teams who want to build solutions for their clients on a shared platform.' },
    ],
    interestTitle: 'Want to explore more?',
    interestText:
      'Tell us your area of interest, whether it is development, partnership or feedback, and we will get back to you.',
  },

  '/ventures/education': {
    label: 'Education',
    status: 'Concept stage',
    intro:
      'A planned digital learning venture that aims to make learning more accessible, interactive and personal for students, and to give teachers simple tools to guide them.',
    problemTitle: 'The problem we want to solve',
    problems: [
      { title: 'Limited access', text: 'Good learning materials are not always easy for every student to reach.' },
      { title: 'One pace for everyone', text: 'In a busy classroom, it is hard to adjust lessons to each student\'s speed and needs.' },
      { title: 'Hard to track progress', text: 'Students and teachers often lack a clear view of how learning is going over time.' },
      { title: 'Theory without practice', text: 'Students need examples and practical tasks, not only textbook content.' },
    ],
    featuresTitle: 'Planned features',
    features: [
      { title: 'Digital learning content', text: 'Lessons and materials organized by level and subject, available on phones and computers.' },
      { title: 'Self-paced learning', text: 'Students can learn at a comfortable speed and revisit topics when they need to.' },
      { title: 'Progress tracking', text: 'Students and teachers can see progress and identify areas that need more attention.' },
      { title: 'Teacher tools', text: 'A simple learning management system where teachers can share content and review student performance.' },
      { title: 'Practical examples', text: 'Lessons that combine theory with real-life, example-based learning.' },
      { title: 'Learning insights', text: 'Simple reports that help teachers improve their lessons based on how students are doing.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Students', text: 'Learners who want accessible, engaging study material they can use at their own pace.' },
      { title: 'Teachers & schools', text: 'Educators who want to organize content and understand how their students are progressing.' },
      { title: 'Content creators', text: 'Authors, educators and tutors who want to share their material with learners.' },
    ],
    interestTitle: 'Interested in collaborating?',
    interestText:
      'We are open to hearing from educators, authors, tutors and institutions who want to learn more or work with us. Tell us about your interest and we will get back to you.',
  },

  '/ventures/health-care': {
    label: 'Health Care',
    status: 'Concept stage',
    intro:
      'A planned digital health venture that aims to make it easier for patients and healthcare providers to connect, share records and follow up, especially for people who live far from clinics and hospitals.',
    problemTitle: 'The problem we want to solve',
    problems: [
      { title: 'Distance from care', text: 'In many places, health workers are concentrated in a few areas, and travelling to them takes time and money.' },
      { title: 'Scattered records', text: 'Reports, scans and prescriptions are often on paper or spread across different places, and are easy to lose.' },
      { title: 'Difficult follow-up', text: 'Keeping in touch after a visit can be hard for both patients and healthcare workers.' },
      { title: 'Slow, manual processes', text: 'Appointments and record keeping at clinics are often handled by hand.' },
    ],
    featuresTitle: 'Planned features',
    features: [
      { title: 'Digital health records', text: 'Patients can keep their reports, prescriptions and history organized in one secure place.' },
      { title: 'Appointment booking', text: 'Book and manage appointments with clinics and healthcare providers online.' },
      { title: 'Remote consultation', text: 'Allow patients and licensed providers to talk remotely, where appropriate.' },
      { title: 'Follow-up support', text: 'Simple tools for providers to check in with patients after a visit.' },
      { title: 'Provider tools', text: 'A simple system for clinics to manage patients, schedules and records.' },
      { title: 'Privacy by design', text: 'Health data is sensitive. We plan to build with strong privacy and access controls from the start.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Patients & families', text: 'People who want easier access to care and a clear record of their health information.' },
      { title: 'Clinics & providers', text: 'Healthcare professionals who want to organize records and stay in touch with patients.' },
      { title: 'Healthcare partners', text: 'Organizations interested in working with us on responsible digital health solutions.' },
    ],
    note: 'This venture is in the planning stage. It does not provide medical advice, diagnosis or emergency services. In an emergency, contact your local emergency services or the nearest hospital.',
    interestTitle: 'Interested in working together?',
    interestText:
      'If you are a healthcare provider, institution or partner, tell us about your interest and we will get back to you.',
  },

  '/ventures/food-delivery': {
    label: 'Food & Delivery',
    status: 'Concept stage',
    intro:
      'A planned digital ordering venture that aims to help restaurants, cafes and eateries take orders more easily, and help customers browse menus and order from their phones.',
    problemTitle: 'The problem we want to solve',
    problems: [
      { title: 'Waiting to order', text: 'Customers often wait for staff just to see a menu or place an order, especially at busy times.' },
      { title: 'Printed menus are hard to update', text: 'Changing prices, items or offers means reprinting menus, which costs time and money.' },
      { title: 'Staff time is stretched', text: 'Taking orders by hand keeps staff busy with routine tasks instead of serving guests.' },
      { title: 'Hard to reach new customers', text: 'Small restaurants often have limited ways to show their menu and offers online.' },
    ],
    featuresTitle: 'Planned features',
    features: [
      { title: 'Digital menu', text: 'A clear menu with prices, photos and descriptions that restaurants can update at any time.' },
      { title: 'QR code ordering', text: 'Customers scan a code at the table or counter to browse the menu and place an order.' },
      { title: 'Orders to the kitchen', text: 'Orders are sent directly to the kitchen, which reduces mistakes and waiting time.' },
      { title: 'Offers & events', text: 'Restaurants can show discounts, specials and upcoming events on their page.' },
      { title: 'Restaurant dashboard', text: 'A simple view of orders and menu items so owners can manage their business.' },
      { title: 'Payment options', text: 'Support for suitable payment methods, to be decided together with restaurant partners.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Restaurants & cafes', text: 'Owners who want a simpler way to show their menu and take orders.' },
      { title: 'Customers', text: 'Diners who want to browse, choose and order quickly from their own phone.' },
      { title: 'Food business partners', text: 'Eateries and service providers who want to work with us on this idea.' },
    ],
    interestTitle: 'Run a restaurant or cafe?',
    interestText:
      'Tell us about your business and what would make ordering easier for you and your customers. We would like to hear your ideas.',
  },

  '/ventures/hr-care': {
    label: 'HR Care',
    status: 'Concept stage',
    intro:
      'A planned HR management venture that aims to help organizations move employee records, attendance, leave and payroll from spreadsheets into one clear, easy-to-use online system.',
    problemTitle: 'The problem we want to solve',
    problems: [
      { title: 'Endless spreadsheets', text: 'Many organizations still track staff data in spreadsheets and paper files, which are slow to update and easy to get wrong.' },
      { title: 'Repeated manual work', text: 'Attendance, leave and payroll calculations take HR staff a lot of time every month.' },
      { title: 'Employees depend on managers', text: 'Simple requests, like applying for leave or checking records, often need someone else\'s help.' },
      { title: 'No single view', text: 'Information is spread across files and tools, so it is hard to see the full picture of your team.' },
    ],
    featuresTitle: 'Planned features',
    features: [
      { title: 'Employee records', text: 'Keep staff profiles, documents and contact details organized in one place.' },
      { title: 'Attendance & leave', text: 'Track attendance and handle leave requests and approvals online.' },
      { title: 'Payroll support', text: 'Help prepare payroll from attendance and leave data, with fewer manual calculations.' },
      { title: 'Employee self-service', text: 'Let employees view their records and submit simple requests themselves.' },
      { title: 'Access by role', text: 'Different people see only the information that is relevant to their role.' },
      { title: 'Reports', text: 'Simple reports that give managers a clear overview of their team.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Small and medium businesses', text: 'Organizations that want to replace spreadsheets with a simple HR system.' },
      { title: 'HR teams & managers', text: 'People who spend a lot of time on records, attendance and leave.' },
      { title: 'Employees', text: 'Staff who want an easy way to view their records and make common requests.' },
    ],
    interestTitle: 'Looking for a better HR process?',
    interestText:
      'Tell us how your organization manages HR today and what you would like to improve. We would like to hear your needs.',
  },

  '/ventures/travel-recreation': {
    label: 'Travel & Recreation',
    status: 'Concept stage',
    intro:
      'A planned digital venture that aims to make it easier for travellers to discover places, book tickets and activities, and for local travel and recreation businesses to reach more visitors online.',
    problemTitle: 'The problem we want to solve',
    problems: [
      { title: 'Hard to find information', text: 'Travellers often struggle to find clear, up-to-date details about places, activities and prices.' },
      { title: 'Manual bookings', text: 'Many local operators still take bookings by phone or message, which is slow and easy to mix up.' },
      { title: 'Queues and paper tickets', text: 'Buying and checking tickets in person takes time for both visitors and staff.' },
      { title: 'Limited online presence', text: 'Small tour, tourism and recreation businesses often have few ways to show what they offer.' },
    ],
    featuresTitle: 'Planned features',
    features: [
      { title: 'Destination & activity listings', text: 'Clear pages that show places, activities, photos and practical details in one place.' },
      { title: 'Online ticketing', text: 'Let visitors choose a date and ticket type and receive a digital ticket.' },
      { title: 'Booking requests', text: 'Travellers can request bookings for tours, stays and activities, and operators can confirm them.' },
      { title: 'Operator dashboard', text: 'A simple view where businesses manage listings, availability and bookings.' },
      { title: 'Event & package pages', text: 'Present special packages, seasonal offers and upcoming events.' },
      { title: 'Mobile-friendly design', text: 'Everything works well on phones, since most travellers plan on the go.' },
    ],
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Travellers & visitors', text: 'People who want to find, compare and book travel and recreation experiences easily.' },
      { title: 'Tour & recreation operators', text: 'Local businesses that want to reach more visitors and manage bookings clearly.' },
      { title: 'Tourism partners', text: 'Organizations and agencies interested in working with us on this idea.' },
    ],
    interestTitle: 'Work in travel or recreation?',
    interestText:
      'Tell us about your business and what would make bookings and visitor management easier for you. We would like to hear your ideas.',
  },
}