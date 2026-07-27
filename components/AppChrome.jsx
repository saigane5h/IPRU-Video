'use client'
import { usePathname } from 'next/navigation'

const BARE_ROUTES = ['/login', '/portal', '/academy']

export default function AppChrome({ children }) {
  const pathname = usePathname()
  const bare = pathname === '/' || BARE_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))

  if (bare) return <main>{children}</main>

  return <main>{children}</main>
}
