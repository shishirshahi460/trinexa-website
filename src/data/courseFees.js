// Course ko duration, offer price, batch ra photo yaha edit garnus.
// original = regular price, offer = abhako offer price.
export const offer = {
  label: 'Limited-time offer',
  ends: null, // jastai 'Poush 30' lekhyo bhane "Valid until Poush 30" dekhinchha
}

export const npr = (n) => `NPR ${n.toLocaleString('en-US')}`

const big = { duration: '3 months', fee: { original: 35000, offer: 25000 } }
const mid = { duration: '2.5 months', fee: { original: 30000, offer: 20000 } }
const short = { duration: '2 months', fee: { original: 20000, offer: 15000 } }

// Kun course kun group ma: big (3 months), mid (2.5 months), short (2 months)
export const courseTerms = {
  'mern-stack-genai': big,
  python: big,
  cybersecurity: big,
  'ethical-hacking': big,
  'ui-ux-design': mid,
  'qa-testing': mid,
  'web-design': mid,
  'ai-for-everyone': short,
  'graphic-design': short,
  'video-editing': short,
  'content-creation': short,
  seo: short,
}

// Course ko photo: public/Resources/Courses folder ma. File ko naam exact milnu parchha.
const dir = '/Resources/Courses'
export const courseImages = {
  'mern-stack-genai': `${dir}/mern.jpg`,
  python: `${dir}/python.jpg`,
  cybersecurity: `${dir}/cyber.jpg`,
  'ui-ux-design': `${dir}/uiux.jpg`,
  'ai-for-everyone': `${dir}/ai.jpg`,
  'ethical-hacking': `${dir}/ethical.jpg`,
  'qa-testing': `${dir}/qa.jpg`,
  'graphic-design': `${dir}/design.jpg`,
  'web-design': `${dir}/web.jpg`,
  'video-editing': `${dir}/editing.jpg`,
  'content-creation': `${dir}/social.jpg`,
  seo: `${dir}/seo.jpg`,
}

// Real batch tay bhayepachhi yaha halnus (khali bhaye "dates not announced" dekhinchha).
// Udaharan:
// python: [
//   { date: '15 Jan 2027', times: ['07:00 AM - 08:30 AM', '05:00 PM - 06:30 PM'] },
//   { date: '01 Feb 2027', times: ['07:00 AM - 08:30 AM'] },
// ],
export const courseBatches = {}

// Course ma duration, fee, photo ra batch jodne
export const withTerms = (course) => ({
  ...course,
  ...courseTerms[course.slug],
  image: courseImages[course.slug] ?? course.image,
  batches: courseBatches[course.slug] ?? [],
})