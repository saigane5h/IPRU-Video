'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  useEffect(() => { router.replace('/login') }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#002244' }}>
      <div className="w-8 h-8 border-2 border-ipru-orange border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
