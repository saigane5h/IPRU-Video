'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { featuredVideos, shortReels } from '@/lib/data'
import { Eye, EyeOff, ChevronRight, ChevronDown, Play, X, Shield, TrendingUp, Heart, Wallet } from 'lucide-react'

const REELS_HOST = 'ktpl.kpoint.com'
const vthumb = (id) => `https://${REELS_HOST}/media/data.ap-southeast-1.kpoint/ktpl.kpoint.in/ktpl.kpoint.com/kapsule/${id}/v4/i/vthumb.jpg`

function GCCVideoPlayer({ videoId }) {
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://ktpl.kpoint.com/assets/orca/media/embed/videofront-vega.js'
    s.async = true
    document.body.appendChild(s)
    return () => s.remove()
  }, [])
  return (
    <div className="video-wrapper" style={{ width: '100%' }}>
      <div data-init-dynamic data-video-host="ktpl.kpoint.com" data-kvideo-id={videoId}
        data-state="PUBLISHED" data-samesite="true" style={{ width: '100%' }} />
    </div>
  )
}

function VideoOverlay({ videoId, title, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(0,0,0,0.88)' }} onClick={onClose}>
      <div className="relative" style={{ width: 'min(900px, 70vw, calc(75vh * 16 / 9))' }} onClick={e => e.stopPropagation()}>
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16 / 9' }}>
          <GCCVideoPlayer key={videoId} videoId={videoId} />
          <button onClick={onClose} className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white"><X size={16} /></button>
        </div>
        {title && <p className="text-white/75 text-sm font-medium mt-3 px-1 truncate">{title}</p>}
      </div>
    </div>
  )
}

function ShortsStrip({ reels, onPlay }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  useEffect(() => {
    function init() {
      if (!containerRef.current || playerRef.current) return
      playerRef.current = window.VXPlayer(containerRef.current, {
        hostname: REELS_HOST, type: 'reels',
        videoIds: reels.map(r => r.id), mode: 'popup',
      })
    }
    if (window.VXPlayer) init()
    else { document.addEventListener('vxplayerready', init); return () => document.removeEventListener('vxplayerready', init) }
  }, [reels])
  const open = (id) => playerRef.current?.jumpTo(id)
  return (
    <div>
      <Script src="https://assets.kpoint.com/orca/media/embed/player-vx.js" strategy="afterInteractive" />
      <div ref={containerRef} />
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {reels.map((reel) => (
          <div key={reel.id} onClick={() => open(reel.id)} className="group cursor-pointer flex-shrink-0" style={{ width: '130px' }}>
            <div className="relative rounded-xl overflow-hidden" style={{ width: '130px', height: '210px', background: '#1a1a2e' }}>
              <img src={vthumb(reel.id)} alt={reel.title} style={{ width: '130px', height: '210px', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }} />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
              <span className="absolute top-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white">{reel.duration}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center group-hover:bg-ipru-orange group-hover:border-ipru-orange transition-all"><Play size={14} className="text-white ml-0.5" /></span>
              </div>
              <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold leading-tight drop-shadow">{reel.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { login, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [overlay, setOverlay] = useState(null)

  useEffect(() => { logout() }, [])

  const ready = mobile.trim() && password.trim()
  const play = (videoId, title) => setOverlay({ videoId, title })

  const handleLogin = (e) => {
    e.preventDefault()
    if (!ready) return
    login()
    router.push('/portal')
  }

  const heroVideos = featuredVideos.slice(0, 3)
  const explainerVideos = featuredVideos.slice(3, 9)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top nav bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-ipru-blue font-extrabold text-xl tracking-tight">ICICI</span>
                <span className="text-ipru-blue font-bold text-xl ml-1">Prudential</span>
              </div>
              <div className="flex flex-col items-start ml-1">
                <span className="text-ipru-orange text-[9px] font-bold tracking-wider leading-none">LIFE INSURANCE</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Plans</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Fund Performance</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Claims</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Library</span>
              <span className="text-sm text-gray-700 font-medium cursor-pointer hover:text-ipru-blue">Service</span>
              <Link href="/academy" className="text-sm text-ipru-blue font-semibold cursor-pointer hover:text-ipru-orange">Academy</Link>
            </nav>
            <div className="relative">
              <button onClick={() => setShowLogin(!showLogin)}
                className="flex items-center gap-1 bg-ipru-maroon text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-ipru-red transition-colors">
                Login <ChevronDown size={14} />
              </button>
              {showLogin && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="bg-ipru-maroon px-5 py-4">
                    <h3 className="text-white font-bold text-lg">LOGIN AS CUSTOMER</h3>
                  </div>
                  <form onSubmit={handleLogin} className="p-5 space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">Mobile Number / Email</label>
                      <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter here"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-ipru-blue" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium">Password</label>
                      <div className="relative">
                        <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-ipru-blue pr-10" />
                        <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={!ready}
                      className={`w-full py-2.5 rounded-lg font-bold text-white text-sm transition-all ${ready ? 'bg-ipru-maroon hover:bg-ipru-red' : 'bg-gray-300 cursor-not-allowed'}`}>
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

      {/* Hero — product landing with featured video */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #B71C1C 30%, #F7941D 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                India&apos;s Leading Private Life Insurer
              </div>
              <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
                iProtect Smart
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-4">
                Pure term insurance with comprehensive coverage at an affordable premium.
              </p>
              <div className="flex items-center gap-4 mb-6">
                {[
                  { icon: <Shield size={16} />, label: 'Life Cover' },
                  { icon: <Wallet size={16} />, label: 'Tax-free maturity' },
                  { icon: <TrendingUp size={16} />, label: 'Market linked returns' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5 text-white/90 text-xs">
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-ipru-maroon font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">Talk to an Advisor</button>
                <button className="border-2 border-white text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">Know More</button>
              </div>
            </div>
            {/* Featured video card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-ipru-darkblue px-4 py-2.5 flex items-center justify-between">
                <span className="text-white text-sm font-bold">Watch & Understand</span>
                <span className="text-ipru-orange text-xs font-semibold">Video Explainer</span>
              </div>
              <div onClick={() => play(heroVideos[0].gccId, heroVideos[0].title)}
                className="relative cursor-pointer group" style={{ aspectRatio: '16/9' }}>
                <img src={heroVideos[0].thumbnail} alt={heroVideos[0].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-ipru-orange/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-white ml-1" />
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white font-bold text-sm">{heroVideos[0].title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{heroVideos[0].duration} min</p>
                </div>
              </div>
              <div className="p-3 flex gap-2">
                {heroVideos.slice(1).map(v => (
                  <div key={v.id} onClick={() => play(v.gccId, v.title)}
                    className="flex-1 relative rounded-lg overflow-hidden cursor-pointer group" style={{ aspectRatio: '16/9' }}>
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center"><Play size={10} className="text-white ml-0.5" /></span>
                    </div>
                    <p className="absolute bottom-1.5 left-2 right-2 text-white text-[10px] font-semibold leading-tight">{v.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits strip */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🛡️', label: 'Life Cover', desc: 'Up to ₹2 Cr protection' },
              { icon: '💸', label: 'Save up to ₹3.77L', desc: 'In tax benefits' },
              { icon: '📊', label: 'Fund Performance', desc: 'Track your investments' },
              { icon: '📋', label: 'Easy Claims', desc: '97.8% settlement ratio' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-navy">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video explainers section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-navy">Understand Before You Buy</h2>
              <p className="text-gray-400 text-sm mt-0.5">Watch video explainers to make informed decisions</p>
            </div>
            <Link href="/academy" className="text-ipru-orange text-sm font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {explainerVideos.map(v => (
              <div key={v.id} onClick={() => play(v.gccId, v.title)} className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${v.tagColor}`}>{v.tag}</span>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{v.duration}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-12 h-12 rounded-full bg-ipru-orange/90 flex items-center justify-center shadow-xl"><Play size={18} className="text-white ml-0.5" /></span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-navy leading-snug group-hover:text-ipru-maroon transition-colors">{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shorts section */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-ipru-maroon text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><Play size={10} /> Shorts</span>
              <h2 className="text-lg font-bold text-navy">Quick Insurance Bites</h2>
            </div>
            <Link href="/academy" className="text-ipru-orange text-sm font-semibold hover:underline flex items-center gap-1">
              More shorts <ChevronRight size={14} />
            </Link>
          </div>
          <ShortsStrip reels={shortReels} onPlay={play} />
        </div>
      </div>

      {/* Academy promo banner */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #002244 0%, #003B71 100%)' }}>
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-ipru-orange text-white text-xs font-bold px-2.5 py-1 rounded">NEW</span>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Learning Hub</span>
              </div>
              <h2 className="text-white text-xl font-bold mb-1">ICICI Prudential Academy</h2>
              <p className="text-white/60 text-sm max-w-md">
                India&apos;s first interactive video-learning hub for life insurance.
              </p>
            </div>
            <Link href="/academy" className="group inline-flex flex-col items-center gap-1">
              <span className="inline-flex items-center gap-2 bg-ipru-orange text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors">
                Visit Academy <ChevronRight size={16} />
              </span>
              <span className="text-white/40 text-[10px]">New to insurance? Learn before you buy</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-5 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-ipru-blue font-extrabold text-sm">ICICI Prudential</span>
            <span className="text-ipru-orange text-[8px] font-bold tracking-wider">LIFE INSURANCE</span>
          </div>
          <span className="text-xs text-gray-400">IRDAI Reg. No. 105 | CIN: L66010MH2000PLC127837</span>
        </div>
      </footer>

      {overlay && <VideoOverlay videoId={overlay.videoId} title={overlay.title} onClose={() => setOverlay(null)} />}
    </div>
  )
}
