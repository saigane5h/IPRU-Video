'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useAuth } from '@/lib/auth'
import RequireAuth from '@/components/ProtectedRoute'
import { portalPolicies, portalUser, personalisedShorts, featuredVideos, policyVideos } from '@/lib/data'
import { Search, Play, X, MessageSquareText, Home, CreditCard, Percent, User, ChevronRight, Shield, Bell, Menu, ArrowRight, TrendingUp, FileText } from 'lucide-react'

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

function SearchVideoBar({ onPlay }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const pool = [...featuredVideos, ...policyVideos]
  const results = q.trim()
    ? pool.filter(v => v.title.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8)
    : []
  return (
    <div className="relative">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={q} onChange={e => { setQ(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)}
            placeholder="Search policies, FAQs, claims..."
            className="w-full bg-white/10 border border-white/15 rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-ipru-orange" />
          {(q || open) && (
            <button onClick={() => { setQ(''); setOpen(false) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"><X size={14} /></button>
          )}
        </div>
        <button onClick={() => setOpen(true)} className="bg-ipru-orange text-white rounded-full px-6 font-semibold text-sm flex items-center gap-2 whitespace-nowrap">
          <Play size={14} /> Video answers
        </button>
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {results.map(v => (
            <button key={v.id} onClick={() => { onPlay(v.gccId, v.title); setOpen(false); setQ('') }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0">
              <span className="w-8 h-8 rounded-full bg-ipru-orange/10 flex items-center justify-center flex-shrink-0"><Play size={12} className="text-ipru-orange ml-0.5" /></span>
              <span className="text-sm text-navy font-medium">{v.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ShortsStrip() {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  useEffect(() => {
    function init() {
      if (!containerRef.current || playerRef.current) return
      playerRef.current = window.VXPlayer(containerRef.current, {
        hostname: REELS_HOST, type: 'reels',
        videoIds: personalisedShorts.map(r => r.id), mode: 'popup',
      })
    }
    if (window.VXPlayer) init()
    else { document.addEventListener('vxplayerready', init); return () => document.removeEventListener('vxplayerready', init) }
  }, [])
  const open = (id) => playerRef.current?.jumpTo(id)
  return (
    <div>
      <Script src="https://assets.kpoint.com/orca/media/embed/player-vx.js" strategy="afterInteractive" />
      <div ref={containerRef} />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-ipru-maroon text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><Play size={10} /> Shorts</span>
          <h3 className="text-white font-bold">Personalised for you</h3>
        </div>
        <Link href="/academy" className="text-white/50 text-sm hover:text-white">See all &rarr;</Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {personalisedShorts.map((reel) => (
          <div key={reel.id} onClick={() => open(reel.id)} className="group cursor-pointer flex-shrink-0" style={{ width: '120px' }}>
            <div className="relative rounded-xl overflow-hidden" style={{ width: '120px', height: '200px', background: '#0d1b35' }}>
              <img src={vthumb(reel.id)} alt={reel.title} style={{ width: '120px', height: '200px', objectFit: 'cover' }}
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

function PolicyCard({ policy, onPlay }) {
  const typeColor = policy.type === 'TERM' ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-green-600 bg-green-50 border-green-200'
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #8B1A1A, #F7941D)' }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="inline-block bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">{policy.status}</span>
            <h3 className="text-navy font-bold text-sm leading-snug">{policy.planName}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={16} className="text-ipru-blue" />
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${typeColor}`}>{policy.type}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div><p className="text-gray-400 text-xs">Insured name</p><p className="text-navy font-semibold text-sm">{policy.insuredName}</p></div>
          <div><p className="text-gray-400 text-xs">Policy number</p><p className="text-navy font-semibold text-sm">{policy.policyNo}</p></div>
          <div><p className="text-gray-400 text-xs">Sum Assured</p><p className="text-navy font-bold text-base">{policy.sumAssured}</p></div>
          <div><p className="text-gray-400 text-xs">Premium</p><p className="text-navy font-semibold text-sm">{policy.premium} / {policy.premiumCadence}</p></div>
        </div>
        {policy.nudge && <div className="bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg px-3 py-2 mb-3 flex items-center gap-2"><TrendingUp size={14} />{policy.nudge}</div>}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button className="text-ipru-maroon text-sm font-semibold hover:underline">View Details</button>
          <div className="flex items-center gap-2 group/explainer">
            <span className="hidden sm:inline-block bg-gray-100 text-gray-600 text-[11px] font-semibold rounded-full px-2.5 py-1">Policy Explainer</span>
            <button onClick={() => onPlay(policy.gccId, policy.planName)}
              className="relative w-10 h-10 rounded-full bg-ipru-orange flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Play size={16} className="text-white ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickLinks() {
  const links = [
    { icon: '📜', label: 'Premium Paid\nCertificate' },
    { icon: '🔄', label: 'Standing\nInstruction' },
    { icon: '👥', label: 'Update\nNominee Details' },
    { icon: '📊', label: 'Fund\nValue' },
  ]
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold">Quick Links</h3>
        <span className="text-ipru-orange text-sm font-semibold">View All</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {links.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 transition-colors cursor-pointer">
            <span className="text-2xl block mb-1">{s.icon}</span>
            <span className="text-white/70 text-[10px] font-medium whitespace-pre-line leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AlertsSection() {
  const alerts = [
    { icon: '🔔', title: 'Premium due reminder', desc: 'Your Signature ULIP premium is due on 1st Aug', action: 'Pay Now', actionColor: 'bg-ipru-maroon' },
    { icon: '📊', title: 'Fund performance update', desc: 'Your ULIP fund has grown 18.2% this year', action: 'View Fund', actionColor: 'bg-ipru-blue' },
    { icon: '💰', title: 'Tax saving season', desc: 'Save tax under Section 80C with your ICICI Pru plan', action: 'Learn More', actionColor: 'bg-ipru-orange' },
  ]
  return (
    <div>
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <Bell size={16} className="text-ipru-orange" /> Alerts & Notifications
      </h3>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{a.title}</p>
              <p className="text-white/50 text-xs truncate">{a.desc}</p>
            </div>
            <button className={`${a.actionColor} text-white text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0`}>{a.action}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoverageWheel() {
  const items = [
    { label: 'Term Insurance', covered: true },
    { label: 'ULIPs', covered: true },
    { label: 'Savings Plan', covered: false },
    { label: 'Annuity/Pension', covered: false },
    { label: 'Health Insurance', covered: false },
  ]
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Are you covered</p>
      <h3 className="text-white font-bold text-lg mb-4">360 Degrees?</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item.label} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
            item.covered ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {item.covered ? '✓' : '✗'} {item.label}
          </span>
        ))}
      </div>
      <Link href="/academy" className="text-ipru-orange text-sm font-semibold mt-4 inline-flex items-center gap-1 hover:underline">
        Learn what you&apos;re missing <ArrowRight size={14} />
      </Link>
    </div>
  )
}

function PortalDashboard() {
  const { user, logout } = useAuth()
  const [overlay, setOverlay] = useState(null)
  const play = (videoId, title) => setOverlay({ videoId, title })

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(180deg, #002244 0%, #001a33 100%)' }}>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #B71C1C 40%, #002244 100%)' }}>
        <div className="flex items-center gap-3">
          <Menu size={20} className="text-white" />
          <div>
            <p className="text-white/60 text-xs">Welcome back</p>
            <p className="text-white font-bold text-lg">{user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/academy" className="text-white/80 text-sm font-semibold hover:text-white">Academy</Link>
          <button onClick={logout} className="text-white/60 text-sm hover:text-white">Logout</button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <SearchVideoBar onPlay={play} />
        <CoverageWheel />

        {/* My Policies */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
            <FileText size={18} /> My Policy(ies)
          </h2>
          <div className="space-y-4">
            {portalPolicies.map(p => <PolicyCard key={p.id} policy={p} onPlay={play} />)}
          </div>
        </div>

        <QuickLinks />
        <AlertsSection />
        <ShortsStrip />

        {/* Product banner */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #F7941D 0%, #E8810B 100%)' }}>
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">Featured Product</p>
              <h3 className="text-white font-bold text-lg">ICICI Pru Guaranteed Income for Tomorrow</h3>
              <p className="text-white/70 text-sm mt-1">Guaranteed returns + life cover</p>
              <button className="mt-3 bg-white text-ipru-maroon text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Know More</button>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">💰</span>
            </div>
          </div>
        </div>

        {/* Academy promo */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-ipru-orange font-bold text-lg mb-1">Looking to Crack the Code of Insurance?</p>
          <p className="text-white/60 text-sm mb-3">Check out our Academy for guides, video explainers, and FAQs.</p>
          <Link href="/academy" className="inline-flex items-center gap-2 bg-ipru-blue text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors">
            Head over there now! <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-around py-2">
          <button className="flex flex-col items-center gap-0.5 px-3 py-1 text-ipru-blue"><Home size={20} /><span className="text-[10px] font-medium">Home</span></button>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-400"><CreditCard size={20} /><span className="text-[10px] font-medium">Pay Premium</span></button>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-400"><Percent size={20} /><span className="text-[10px] font-medium">Offers</span></button>
          <button className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-400"><User size={20} /><span className="text-[10px] font-medium">Profile</span></button>
        </div>
      </nav>

      {/* Floating chat */}
      <div className="fixed bottom-20 right-4 flex items-center gap-2 z-40">
        <span className="bg-ipru-darkblue text-white text-xs rounded-full px-3 py-1.5 shadow-lg">Need Help?</span>
        <button className="w-12 h-12 rounded-full bg-ipru-orange flex items-center justify-center shadow-xl">
          <MessageSquareText size={20} className="text-white" />
        </button>
      </div>

      {overlay && <VideoOverlay videoId={overlay.videoId} title={overlay.title} onClose={() => setOverlay(null)} />}
    </div>
  )
}

export default function Page() {
  return (
    <RequireAuth>
      <PortalDashboard />
    </RequireAuth>
  )
}
