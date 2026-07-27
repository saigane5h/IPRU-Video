'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Eye, EyeOff, ChevronRight, ChevronDown } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  useEffect(() => { logout() }, [])

  const ready = mobile.trim() && password.trim()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!ready) return
    login()
    router.push('/portal')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top nav bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-ipru-blue font-extrabold text-xl tracking-tight">ICICI</span>
                <span className="text-ipru-blue font-bold text-xl ml-1">Prudential</span>
              </div>
              <div className="flex flex-col items-start ml-1">
                <span className="text-ipru-orange text-[9px] font-bold tracking-wider leading-none">LIFE INSURANCE</span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Plans</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Fund Performance</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Claims</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Library</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Service</span>
              <Link href="/academy" className="text-sm text-ipru-blue font-semibold cursor-pointer hover:text-ipru-orange">Academy</Link>
            </nav>

            {/* Login dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="flex items-center gap-1 bg-ipru-maroon text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-ipru-red transition-colors"
              >
                Login <ChevronDown size={14} />
              </button>

              {showLogin && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="bg-ipru-maroon px-5 py-4">
                    <h3 className="text-white font-bold text-lg">LOGIN AS CUSTOMER</h3>
                  </div>
                  <form onSubmit={handleLogin} className="p-5 space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                        Mobile Number / Email
                      </label>
                      <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter here"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-ipru-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPwd ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-ipru-blue pr-10"
                        />
                        <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!ready}
                      className={`w-full py-2.5 rounded-lg font-bold text-white text-sm transition-all ${
                        ready ? 'bg-ipru-maroon hover:bg-ipru-red' : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      SIGN IN
                    </button>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ipru-blue cursor-pointer hover:underline">New User?</span>
                      <span className="text-ipru-blue cursor-pointer hover:underline">Forgot Password?</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #B71C1C 30%, #F7941D 100%)' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)' }} />
          <div className="absolute top-40 -left-10 w-60 h-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              India&apos;s Leading Private Life Insurer
            </div>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
              iProtect Smart
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-6">
              Pure term insurance with comprehensive coverage at an affordable premium.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-ipru-maroon font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Buy Now
              </button>
              <button className="border-2 border-white text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🛒', label: 'Buy Now', desc: 'Explore plans' },
              { icon: '💳', label: 'Pay Premium', desc: 'Quick payment' },
              { icon: '📄', label: 'Statements Download', desc: 'Policy documents' },
              { icon: '📋', label: 'Claims Registration', desc: 'File a claim' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-ipru-orange hover:shadow-md transition-all cursor-pointer group">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-ipru-maroon">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academy link banner */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #002244 0%, #003B71 100%)' }}>
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-ipru-orange text-white text-xs font-bold px-2.5 py-1 rounded">NEW</span>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Learning Hub</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">ICICI Prudential Academy</h2>
              <p className="text-white/60 text-sm max-w-md">
                India&apos;s first interactive video-learning hub for life insurance. Understand your coverage, plan smarter, protect better.
              </p>
            </div>
            <Link href="/academy" className="group inline-flex flex-col items-center gap-1.5">
              <span className="inline-flex items-center gap-2 bg-ipru-orange text-white font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-amber-500 transition-colors">
                Visit Academy <ChevronRight size={16} />
              </span>
              <span className="text-white/40 text-[10px]">New to insurance? Learn before you buy</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-ipru-blue font-extrabold text-sm">ICICI Prudential</span>
            <span className="text-ipru-orange text-[8px] font-bold tracking-wider">LIFE INSURANCE</span>
          </div>
          <span className="text-xs text-gray-400">IRDAI Reg. No. 105 | CIN: L66010MH2000PLC127837</span>
        </div>
      </footer>
    </div>
  )
}
