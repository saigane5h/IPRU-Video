'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { learningTracks, featuredVideos } from '@/lib/data'
import RequireAuth from '@/components/ProtectedRoute'
import { Play, Clock, ChevronRight, Check, Shield, LogOut, ArrowLeft } from 'lucide-react'

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

function LearnPage() {
  const { user, logout } = useAuth()
  const [activeTrackId, setActiveTrackId] = useState(learningTracks[0].id)
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)

  const currentTrack = learningTracks.find(t => t.id === activeTrackId)
  const currentModule = currentTrack?.modules[activeModuleIndex]
  const currentVideo = currentModule ? featuredVideos.find(v => currentModule.videoIds.includes(v.id)) : null

  const selectTrack = useCallback((trackId) => {
    setActiveTrackId(trackId)
    setActiveModuleIndex(0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
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
              <Link href="/academy" className="text-sm text-ipru-blue font-semibold hover:underline flex items-center gap-1">
                <ArrowLeft size={14} /> Academy
              </Link>
              <Link href="/portal" className="text-sm text-gray-500 font-medium hover:text-ipru-blue flex items-center gap-1">
                <Shield size={14} /> Dashboard
              </Link>
              <button onClick={logout} className="text-gray-400 text-sm hover:text-gray-600"><LogOut size={14} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Guide title bar */}
      <div style={{ background: 'linear-gradient(135deg, #002244 0%, #003B71 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-white text-2xl font-bold">{currentTrack?.label}</h1>
          <p className="text-white/50 text-sm mt-0.5">{currentTrack?.desc}</p>
        </div>
      </div>

      {/* Main content: Video player + Playlist */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Video player */}
          <div className="lg:col-span-2">
            {currentVideo && (
              <>
                <div className="bg-black rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
                  <GCCVideoPlayer key={currentVideo.gccId} videoId={currentVideo.gccId} />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 mt-4">
                  <h2 className="text-navy font-bold text-lg">{currentModule.title}</h2>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-gray-400 text-xs"><Clock size={12} /> {currentModule.duration}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${currentVideo.tagColor}`}>{currentVideo.tag}</span>
                    {currentModule.completed && <span className="text-green-600 text-[10px] font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1"><Check size={10} /> Completed</span>}
                  </div>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{currentModule.desc}</p>
                </div>
              </>
            )}
          </div>

          {/* Right: Playlist sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-20">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-navy font-bold text-sm">Videos in this guide</h3>
                <span className="text-gray-400 text-xs">{currentTrack?.modules.length} videos</span>
              </div>
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {currentTrack?.modules.map((mod, i) => {
                  const isActive = i === activeModuleIndex
                  const video = featuredVideos.find(v => mod.videoIds.includes(v.id))
                  return (
                    <button key={mod.id} onClick={() => setActiveModuleIndex(i)}
                      className={`w-full text-left px-5 py-3.5 flex items-start gap-3 transition-colors border-l-3 ${isActive ? 'bg-ipru-maroon/5 border-l-[3px] border-l-ipru-maroon' : 'border-l-[3px] border-l-transparent hover:bg-gray-50'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${mod.completed ? 'bg-green-500 text-white' : isActive ? 'bg-ipru-maroon text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {mod.completed ? <Check size={12} /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-snug ${isActive ? 'text-ipru-maroon' : 'text-navy'}`}>{mod.title}</p>
                        <span className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5"><Clock size={10} /> {mod.duration}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Other tracks */}
            <div className="mt-4">
              <h3 className="text-navy font-bold text-sm mb-3">Other Guides</h3>
              <div className="space-y-2">
                {learningTracks.filter(t => t.id !== activeTrackId).map(track => {
                  const completed = track.modules.filter(m => m.completed).length
                  return (
                    <button key={track.id} onClick={() => selectTrack(track.id)}
                      className="w-full bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 text-left hover:border-ipru-orange hover:shadow-sm transition-all">
                      <span className="text-2xl">{track.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-navy font-bold text-sm">{track.label}</p>
                        <p className="text-gray-400 text-[10px]">{completed}/{track.modules.length} completed</p>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-5 px-6 bg-white mt-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-ipru-blue font-extrabold text-sm">ICICI Prudential</span>
            <span className="text-ipru-orange text-[8px] font-bold tracking-wider">LIFE INSURANCE</span>
            <span className="text-gray-300 ml-2">|</span>
            <span className="text-ipru-maroon text-xs font-bold ml-2">Academy</span>
          </div>
          <span className="text-xs text-gray-400">IRDAI Reg. No. 105</span>
        </div>
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <RequireAuth>
      <LearnPage />
    </RequireAuth>
  )
}
