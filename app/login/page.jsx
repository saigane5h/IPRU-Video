'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { featuredVideos, shortReels } from '@/lib/data'
import { Eye, EyeOff, ChevronRight, ChevronDown, Play, X, Shield, TrendingUp, Wallet } from 'lucide-react'

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

function ShortsStrip({ reels }) {
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
          <div key={reel.id} onClick={() => open(reel.id)} className="group cursor-pointer flex-shrink-0" style={{ width: '150px' }}>
            <div className="relative rounded-xl overflow-hidden" style={{ width: '150px', height: '250px', background: '#1a1a2e' }}>
              <img src={vthumb(reel.id)} alt={reel.title} style={{ width: '150px', height: '250px', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }} />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
              <span className="absolute top-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white">{reel.duration}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-11 h-11 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center group-hover:bg-ipru-orange group-hover:border-ipru-orange transition-all"><Play size={16} className="text-white ml-0.5" /></span>
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

  const heroVideo = featuredVideos[0]
  const moreVideos = featuredVideos.slice(1, 4)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nav */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="text-ipru-blue font-extrabold text-xl tracking-tight">ICICI</span>
              <span className="text-ipru-blue font-bold text-xl">Prudential</span>
              <span className="text-ipru-orange text-[9px] font-bold tracking-wider ml-1">LIFE</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <span className="text-sm text-gray-600 cursor-pointer hover:text-ipru-blue">Plans</span>
              <span className="text-sm text-gray-600 cursor-pointer hover:text-ipru-blue">Fund Performance</span>
              <span className="text-sm text-gray-600 cursor-pointer hover:text-ipru-blue">Claims</span>
              <Link href="/academy" className="text-sm text-ipru-blue font-semibold hover:text-ipru-orange">Academy</Link>
            </nav>
            <div className="relative">
              <button onClick={() => setShowLogin(!showLogin)}
                className="flex items-center gap-1 bg-ipru-maroon text-white text-sm font-semibold px-5 py-2 rounded hover:bg-ipru-red transition-colors">
                Login <ChevronDown size={14} />
              </button>
              {showLogin && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="bg-ipru-maroon px-5 py-3">
                    <h3 className="text-white font-bold">LOGIN AS CUSTOMER</h3>
                  </div>
                  <form onSubmit={handleLogin} className="p-5 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 font-medium">Mobile / Email</label>
                      <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter here"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-ipru-blue" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 font-medium">Password</label>
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

      {/* Full-width video with overlaid product info */}
      <div className="relative bg-black">
        <div className="max-w-6xl mx-auto">
          <div style={{ aspectRatio: '16/9' }}>
            <GCCVideoPlayer key={heroVideo.gccId} videoId={heroVideo.gccId} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,22,44,0.95) 0%, rgba(0,22,44,0.7) 40%, transparent 100%)' }}>
          <div className="max-w-6xl mx-auto px-6 pb-5 pt-16 pointer-events-auto">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">iProtect Smart</h1>
                <p className="text-white/50 text-sm mt-1">Term insurance &middot; Cover up to ₹2 Cr &middot; From ₹490/month</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                  {[
                    { icon: <Shield size={13} />, label: 'Life Cover' },
                    { icon: <Wallet size={13} />, label: 'Tax Benefits' },
                    { icon: <TrendingUp size={13} />, label: '97.8% Claims' },
                  ].map(item => (
                    <span key={item.label} className="flex items-center gap-1 text-white/50 text-xs">
                      {item.icon} {item.label}
                    </span>
                  ))}
                </div>
                <button className="bg-ipru-orange text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-amber-500 transition-colors">Talk to an Advisor</button>
                <button className="border border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors">Know More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watch to know more — 3 video cards */}
      <div className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy">Watch to know more</h2>
            <Link href="/academy" className="text-ipru-orange text-sm font-semibold hover:underline flex items-center gap-1">
              Explore Academy <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {moreVideos.map(v => (
              <div key={v.id} onClick={() => play(v.gccId, v.title)} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${v.tagColor}`}>{v.tag}</span>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{v.duration}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-14 h-14 rounded-full bg-ipru-orange/90 flex items-center justify-center shadow-xl"><Play size={20} className="text-white ml-0.5" /></span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-navy leading-snug mt-2 group-hover:text-ipru-maroon transition-colors">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Explained — shorts */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-ipru-maroon text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><Play size={10} /> Shorts</span>
              <h2 className="text-lg font-bold text-navy">Benefits Explained</h2>
            </div>
            <Link href="/academy" className="text-ipru-orange text-sm font-semibold hover:underline flex items-center gap-1">
              More <ChevronRight size={14} />
            </Link>
          </div>
          <ShortsStrip reels={shortReels} />
        </div>
      </div>

      {/* Academy banner */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #002244 0%, #003B71 100%)' }}>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-white text-lg font-bold">ICICI Prudential Academy</h2>
              <p className="text-white/50 text-sm">Video-first learning hub for life insurance</p>
            </div>
            <Link href="/academy" className="inline-flex items-center gap-2 bg-ipru-orange text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-amber-500 transition-colors">
              Visit Academy <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-ipru-blue font-extrabold text-sm">ICICI Prudential</span>
            <span className="text-ipru-orange text-[8px] font-bold tracking-wider">LIFE INSURANCE</span>
          </div>
          <span className="text-xs text-gray-400">IRDAI Reg. No. 105</span>
        </div>
      </footer>

      {overlay && <VideoOverlay videoId={overlay.videoId} title={overlay.title} onClose={() => setOverlay(null)} />}
    </div>
  )
}
