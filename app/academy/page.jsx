'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useAuth } from '@/lib/auth'
import { featuredVideos, videoSeries, policyVideos, shortReels, categories, portalPolicies, coverageGaps, othersAlsoBought, userLevels } from '@/lib/data'
import { Play, X, Search, ChevronRight, ChevronDown, Shield, TrendingUp, BookOpen, Award, Star, ArrowRight, Menu, User, LogOut } from 'lucide-react'

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

function AcademyVideoOverlay({ videoId, title, onClose }) {
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

function ShortsStrip({ reels, label, size }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const isLarge = size === 'large'
  const w = isLarge ? 160 : 120
  const h = isLarge ? 270 : 200
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
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-ipru-maroon text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><Play size={10} /> Shorts</span>
        <h3 className={`font-bold text-navy ${isLarge ? 'text-lg' : ''}`}>{label || 'Quick Bites'}</h3>
      </div>
      <div className={`flex ${isLarge ? 'gap-4' : 'gap-3'} overflow-x-auto pb-2`} style={{ scrollbarWidth: 'none' }}>
        {reels.map((reel) => (
          <div key={reel.id} onClick={() => open(reel.id)} className="group cursor-pointer flex-shrink-0" style={{ width: `${w}px` }}>
            <div className="relative rounded-xl overflow-hidden" style={{ width: `${w}px`, height: `${h}px`, background: '#1a1a2e' }}>
              <img src={vthumb(reel.id)} alt={reel.title} style={{ width: `${w}px`, height: `${h}px`, objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }} />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
              <span className="absolute top-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white">{reel.duration}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center group-hover:bg-ipru-orange group-hover:border-ipru-orange transition-all`}><Play size={isLarge ? 18 : 14} className="text-white ml-0.5" /></span>
              </div>
              <p className={`absolute bottom-2 left-2 right-2 text-white ${isLarge ? 'text-xs' : 'text-[11px]'} font-semibold leading-tight drop-shadow`}>{reel.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoCard({ video, onPlay }) {
  return (
    <div className="group cursor-pointer" onClick={() => onPlay(video.gccId, video.title)}>
      <div className="relative rounded-xl overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded ${video.tagColor}`}>{video.tag}</span>
        <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{video.duration}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-14 h-14 rounded-full bg-ipru-orange/90 flex items-center justify-center shadow-xl"><Play size={22} className="text-white ml-1" /></span>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-navy leading-snug group-hover:text-ipru-maroon transition-colors">{video.title}</h3>
    </div>
  )
}

function YourPoliciesSection({ onPlay }) {
  return (
    <section className="py-5 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} className="text-ipru-maroon" />
          <h2 className="text-lg font-bold text-navy">Your Policies</h2>
        </div>
        <p className="text-gray-400 text-xs mb-4">Watch video explainers for each of your active plans</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {portalPolicies.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">{p.status}</span>
                  <h3 className="text-navy font-bold text-sm">{p.planName}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${p.type === 'TERM' ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-green-600 bg-green-50 border-green-200'}`}>{p.type}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div><p className="text-gray-400 text-xs">Sum Assured</p><p className="text-navy font-bold">{p.sumAssured}</p></div>
                <div><p className="text-gray-400 text-xs">Premium</p><p className="text-navy font-semibold">{p.premium}/{p.premiumCadence}</p></div>
              </div>
              <button onClick={() => onPlay(p.gccId, p.planName)} className="w-full flex items-center justify-center gap-2 bg-ipru-maroon/5 hover:bg-ipru-maroon/10 text-ipru-maroon text-sm font-semibold py-2.5 rounded-lg transition-colors">
                <Play size={14} /> How are your funds performing
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoverageGapSection({ onPlay }) {
  return (
    <section className="py-5 px-4 bg-ipru-lightblue/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={18} className="text-ipru-orange" />
          <h2 className="text-lg font-bold text-navy">Coverage Gaps</h2>
        </div>
        <p className="text-gray-400 text-xs mb-4">Areas where you may need additional protection</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {coverageGaps.map(gap => (
            <div key={gap.category} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{gap.icon}</span>
                <div>
                  <h3 className="text-navy font-bold text-sm">{gap.category}</h3>
                  <span className="text-red-500 text-[10px] font-semibold">Not covered</span>
                </div>
              </div>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">{gap.desc}</p>
              <div className="bg-ipru-lightblue rounded-lg p-3 mb-3">
                <p className="text-ipru-blue text-xs font-semibold">{gap.product}</p>
                <p className="text-ipru-blue/60 text-[10px]">{gap.premium}</p>
              </div>
              <button onClick={() => onPlay(gap.gccId, gap.title)} className="w-full flex items-center justify-center gap-2 text-ipru-maroon text-xs font-semibold py-2 rounded-lg border border-ipru-maroon/20 hover:bg-ipru-maroon/5 transition-colors">
                <Play size={12} /> Watch & Learn
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OthersAlsoBoughtSection({ onPlay }) {
  return (
    <section className="py-5 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Star size={18} className="text-amber-500" />
          <h2 className="text-lg font-bold text-navy">Others Also Added</h2>
        </div>
        <p className="text-gray-400 text-xs mb-4">Popular add-ons among iProtect Smart holders like you</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {othersAlsoBought.map(rec => (
            <div key={rec.id} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 hover:shadow-lg transition-shadow">
              <button onClick={() => onPlay(rec.gccId, rec.title)}
                className="w-12 h-12 rounded-full bg-ipru-orange/10 flex items-center justify-center flex-shrink-0 hover:bg-ipru-orange/20">
                <Play size={16} className="text-ipru-orange ml-0.5" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-navy font-bold text-sm">{rec.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 flex-shrink-0">{rec.tag}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1">{rec.desc}</p>
                <p className="text-ipru-maroon text-xs font-semibold">{rec.premium}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UserLevelSection({ onPlay }) {
  const [level, setLevel] = useState(null)
  const filtered = level ? featuredVideos.filter(v => userLevels.find(l => l.id === level)?.videos.includes(v.id)) : []
  return (
    <section className="py-5 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Award size={18} className="text-ipru-blue" />
          <h2 className="text-lg font-bold text-navy">Your Learning Path</h2>
        </div>
        <p className="text-gray-400 text-xs mb-4">Content curated for where you are in your insurance journey</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {userLevels.map(l => (
            <button key={l.id} onClick={() => setLevel(l.id === level ? null : l.id)}
              className={`p-4 rounded-xl border text-left transition-all ${level === l.id ? 'border-ipru-maroon bg-ipru-maroon/5 shadow-md' : 'border-gray-200 bg-white hover:border-ipru-orange'}`}>
              <span className="text-2xl block mb-2">{l.icon}</span>
              <p className="text-navy font-bold text-sm">{l.label}</p>
              <p className="text-gray-400 text-[10px]">{l.desc}</p>
            </button>
          ))}
        </div>
        {level && filtered.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-3">
            {filtered.map(v => <VideoCard key={v.id} video={v} onPlay={onPlay} />)}
          </div>
        )}
      </div>
    </section>
  )
}

export default function AcademyPage() {
  const auth = useAuth()
  const isLoggedIn = auth?.ready && auth?.user
  const [overlay, setOverlay] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const play = (videoId, title) => setOverlay({ videoId, title })

  const filteredVideos = activeCategory === 'All'
    ? featuredVideos
    : featuredVideos.filter(v => v.tag === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Academy header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-ipru-blue font-extrabold text-lg tracking-tight">ICICI</span>
                <span className="text-ipru-blue font-bold text-lg">Prudential</span>
                <span className="text-ipru-orange text-[8px] font-bold tracking-wider ml-1">LIFE</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-ipru-maroon font-bold text-sm">Academy</span>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (<>
                <Link href="/portal" className="text-sm text-ipru-blue font-semibold hover:underline flex items-center gap-1">
                  <Shield size={14} /> My Policies
                </Link>
                <button onClick={() => auth.logout()} className="text-gray-400 text-sm hover:text-gray-600 flex items-center gap-1"><LogOut size={14} /> Logout</button>
              </>) : (
                <Link href="/login" className="bg-ipru-maroon text-white text-sm font-semibold px-4 py-2 rounded hover:bg-ipru-red transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative overflow-hidden" style={{ background: isLoggedIn ? 'linear-gradient(135deg, #002244 0%, #003B71 100%)' : 'linear-gradient(135deg, #8B1A1A 0%, #B71C1C 30%, #003B71 100%)' }}>
        <div className="relative max-w-5xl mx-auto px-6 py-5 md:py-7">
          {isLoggedIn ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-ipru-orange flex items-center justify-center text-white font-bold text-lg">{auth.user.name.charAt(0)}</div>
                <div>
                  <h1 className="text-white text-lg font-bold leading-tight">Welcome back, {auth.user.name}</h1>
                  <p className="text-white/50 text-xs">Content curated for your policies and coverage gaps</p>
                </div>
              </div>
              <Link href="/portal" className="text-ipru-orange text-sm font-semibold hover:underline flex items-center gap-1">My Dashboard <ChevronRight size={14} /></Link>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                <BookOpen size={14} /> Powered by KPOINT
              </div>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-3">
                Life insurance, finally explained.
              </h1>
              <p className="text-white/70 text-base max-w-lg mx-auto mb-4">
                Video guides, interactive explainers, and real talk — no jargon, no sales pitch.
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 bg-ipru-orange text-white font-bold text-sm px-8 py-3 rounded-lg hover:bg-amber-500 transition-colors">
                Login to personalise <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Logged-in: Your Policies */}
      {isLoggedIn && <YourPoliciesSection onPlay={play} />}

      {/* Logged-in: Shorts — prominent placement */}
      {isLoggedIn && (
        <section className="py-5 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <ShortsStrip reels={shortReels} label="You might be missing out" size="large" />
          </div>
        </section>
      )}

      {/* Logged-in: Coverage Gaps */}
      {isLoggedIn && <CoverageGapSection onPlay={play} />}

      {/* Logged-in: Others Also Bought */}
      {isLoggedIn && <OthersAlsoBoughtSection onPlay={play} />}

      {/* Logged-in: Learning Path */}
      {isLoggedIn && <UserLevelSection onPlay={play} />}

      {/* Video library — Category filter */}
      <section className="py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-navy mb-3">{isLoggedIn ? 'All Videos' : 'Featured Videos'}</h2>
          <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat ? 'bg-ipru-maroon text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>{cat}</button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {filteredVideos.map(v => <VideoCard key={v.id} video={v} onPlay={play} />)}
          </div>
        </div>
      </section>

      {/* Non-logged-in: Browse by series */}
      {!isLoggedIn && (<section className="py-5 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-navy mb-3">Browse by Series</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videoSeries.map(series => (
              <div key={series.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <img src={series.thumbnail} alt={series.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded ${series.tagColor}`}>{series.tag}</span>
                  <span className="absolute bottom-3 right-3 text-white text-xs font-semibold">{series.videos} videos</span>
                </div>
                <div className="p-4">
                  <h3 className="text-navy font-bold text-sm mb-0.5">{series.title}</h3>
                  <p className="text-gray-400 text-xs">{series.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>)}

      {/* Non-logged-in: Policy & Regulatory updates */}
      {!isLoggedIn && (<section className="py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-navy mb-3">Policy & Regulatory Updates</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {policyVideos.slice(0, 4).map(v => (
              <div key={v.id} onClick={() => play(v.gccId, v.title)} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-ipru-orange/90 flex items-center justify-center"><Play size={12} className="text-white ml-0.5" /></span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${v.tagColor}`}>{v.tag}</span>
                    <span className="text-[10px] text-gray-400">{v.date}</span>
                  </div>
                  <h3 className="text-navy font-semibold text-sm leading-snug group-hover:text-ipru-maroon transition-colors">{v.title}</h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{v.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>)}

      {/* Shorts — non-logged-in only (logged-in has it above coverage gaps) */}
      {!isLoggedIn && (
        <section className="py-5 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <ShortsStrip reels={shortReels} label="Quick Bites" />
          </div>
        </section>
      )}

      {/* Non-logged-in: India's protection gap */}
      {!isLoggedIn && (<section className="py-8 px-4" style={{ background: 'linear-gradient(135deg, #002244 0%, #003B71 100%)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-white text-xl font-bold mb-2">India&apos;s Protection Gap</h2>
          <p className="text-white/50 text-sm mb-5 max-w-lg mx-auto">The numbers behind why insurance education matters more than ever.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '₹11T', label: 'Life insurance market size', sub: '₹11.2L Cr' },
              { num: '12.7%', label: 'ICICI Prudential CAGR', sub: 'Ahead of market' },
              { num: '34%', label: 'Term coverage among insured', sub: 'Major gap' },
              { num: '2.8%', label: 'India insurance penetration', sub: 'vs 5.6% global' },
            ].map(stat => (
              <div key={stat.num} className="text-center">
                <p className="text-ipru-orange text-3xl md:text-4xl font-bold">{stat.num}</p>
                <p className="text-white text-sm font-semibold mt-1">{stat.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>)}

      {/* Non-logged-in: CTA */}
      {!isLoggedIn && (<section className="py-6 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-navy mb-2">Ready to take control of your financial future?</h2>
          <p className="text-gray-400 text-sm mb-4">Login to get personalised recommendations based on your policies and coverage.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-ipru-maroon text-white font-bold px-8 py-3.5 rounded-lg hover:bg-ipru-red transition-colors">
            Login Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>)}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-ipru-blue font-extrabold text-sm">ICICI Prudential</span>
            <span className="text-ipru-orange text-[8px] font-bold tracking-wider">LIFE INSURANCE</span>
            <span className="text-gray-300 ml-2">|</span>
            <span className="text-ipru-maroon text-xs font-bold ml-2">Academy</span>
          </div>
          <span className="text-xs text-gray-400">IRDAI Reg. No. 105</span>
        </div>
      </footer>

      {overlay && <AcademyVideoOverlay videoId={overlay.videoId} title={overlay.title} onClose={() => setOverlay(null)} />}
    </div>
  )
}
