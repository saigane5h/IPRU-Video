'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function RequireAuth({ children }) {
  const { user, ready } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (ready && !user) router.replace('/login')
  }, [ready, user, router])

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#002244' }}>
        <div className="w-8 h-8 border-2 border-ipru-orange border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return children
}
