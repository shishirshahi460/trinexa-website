import EnrollPage from '@/views/EnrollPage'

export const metadata = {
  title: 'Enroll Now',
  description:
    'Enroll in a TRINEXA Academy course. Choose your course, select a payment method and review your details.',
  robots: { index: false }, // enroll form Google ma dekhaunu pardaina
}

export default async function Page({ searchParams }) {
  const { course } = await searchParams
  return <EnrollPage initialCourse={typeof course === 'string' ? course : ''} />
}
