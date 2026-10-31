import AcademyCoursesPage from '@/views/AcademyCoursesPage'
import { getCourseTerms } from '@/lib/courseTerms'

// Admin bata save garda aafai naya huncha; yo 5 minute ko backup
export const revalidate = 300

export const metadata = {
  title: 'Courses | Academy',
  description:
    'Practical IT and digital skills courses from TRINEXA Academy, including MERN, Python, cybersecurity, UI/UX, SEO and more.',
}

export default async function Page() {
  const terms = await getCourseTerms()
  return <AcademyCoursesPage terms={terms} />
}