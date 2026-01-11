import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'
import ToastProvider from '@/app/components/Common/ToastProvider'
import I18nWrapper from '@/app/components/I18nWrapper'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`}>
        <I18nWrapper>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <ToastProvider />
        </I18nWrapper>
      </body>
    </html>
  )
}
