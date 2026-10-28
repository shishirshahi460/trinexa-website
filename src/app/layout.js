import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const siteTitle = 'TRINEXA Technologies Pvt. Ltd. | Software & Digital Solutions'
const siteDescription =
  'TRINEXA Technologies builds websites, custom software and digital experiences for businesses.'

export const metadata = {
  // Real domain tay bhayepachhi .env.local ma NEXT_PUBLIC_SITE_URL=https://yourdomain.com halnus
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: siteTitle, template: '%s | TRINEXA' },
  description: siteDescription,
  openGraph: {
    type: 'website',
    siteName: 'TRINEXA Technologies Pvt. Ltd.',
    title: siteTitle,
    description: siteDescription,
  },
}

export const viewport = { themeColor: '#16834A' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}