import './globals.css'
import Providers from '@/components/Providers'
import AppChrome from '@/components/AppChrome'

export const metadata = {
  title: 'ICICI Prudential Life Insurance Academy',
  description: 'Video-first life insurance learning hub by ICICI Prudential',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gray-50 text-navy antialiased">
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  )
}
