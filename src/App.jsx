import React, { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Calendar as CalendarIcon, ArrowRight, Sparkles, Phone, Mail, Clock, MapPin } from 'lucide-react'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

function getMonthMatrix(date) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)
  const startWeekDay = (firstDay.getDay() + 6) % 7 // make Monday=0
  const daysInMonth = lastDay.getDate()

  const matrix = []
  let week = []

  // leading blanks
  for (let i = 0; i < startWeekDay; i++) {
    week.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(y, m, d))
    if (week.length === 7) {
      matrix.push(week)
      week = []
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null)
    matrix.push(week)
  }
  return matrix
}

const Badge = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs tracking-wide text-cyan-200 backdrop-blur-md">
    <Sparkles size={14} className="text-cyan-300" />
    {children}
  </div>
)

const Stat = ({ value, label }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
    <div className="text-3xl md:text-4xl font-semibold text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]">
      {value}
    </div>
    <div className="mt-1 text-sm text-cyan-100/70">{label}</div>
  </div>
)

export default function App() {
  const now = useClock()
  const [selected, setSelected] = useState(new Date())
  const calendarMatrix = useMemo(() => getMonthMatrix(now), [now])

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Spline cosmic background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle grid lines overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute inset-0" style={{
          backgroundImage:
            'linear-gradient(to right, rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Cosmic gradient glows */}
      <div className="pointer-events-none absolute inset-0"> 
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Top HUD: coordinates + clock */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3 text-cyan-100/80">
          <MapPin size={16} className="text-cyan-300" />
          <span className="font-mono text-xs md:text-sm">IND 50° 27' N · 30° 31' E</span>
        </div>
        <div className="flex items-center gap-3 text-cyan-100/80">
          <Clock size={16} className="text-cyan-300" />
          <span className="font-mono text-xs md:text-sm">{dateStr} · {timeStr} IST</span>
        </div>
      </div>

      {/* Hero content */}
      <main className="relative z-10 px-6 pb-24 pt-4 md:px-10 md:pt-10">
        <section className="mx-auto max-w-7xl">
          {/* Headline + CTA */}
          <div className="mb-8 flex flex-col items-start gap-6 md:mb-12 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge>Futuristic · Elegant · Immersive</Badge>
              <h1 className="mt-4 text-3xl leading-tight md:text-5xl lg:text-6xl font-semibold">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]">We create memorable</span>
                <br />
                <span className="text-white/90">digital experiences.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-cyan-100/80">
                A cosmic blend of Daft Punk attitude and Apple-grade precision. Interfaces that feel liquid, alive, and effortlessly usable.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#works" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-medium text-white shadow-[0_0_0_2px_rgba(255,255,255,0.06)] ring-1 ring-white/20 transition hover:shadow-[0_0_32px_rgba(34,211,238,0.45)]">
                View Works
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </a>
              <a href="#consult" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-5 py-3 text-sm font-medium text-cyan-100 backdrop-blur-md hover:bg-white/10">
                Get Consultation
                <Phone size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-md hover:bg-white/10">
                Contact
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            {/* Intro card */}
            <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:col-span-3">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-semibold">Immersive UI Systems</h3>
                <p className="mt-2 max-w-lg text-cyan-100/80">
                  We architect fluid interfaces with soft glassmorphism, depth, and motion — crafted for clarity and delight across every touchpoint.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-black/30 px-4 py-2 text-xs text-cyan-100/90 backdrop-blur">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" />
                  Realtime collaboration enabled
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="relative col-span-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:col-span-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-cyan-200">
                <Sparkles size={16} className="text-cyan-300" /> Impact Metrics
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Stat value="50+" label="Projects" />
                <Stat value="258+" label="Members" />
                <Stat value="12" label="Awards" />
                <Stat value="8yrs" label="Experience" />
              </div>
            </div>

            {/* Calendar / booking */}
            <div id="consult" className="relative col-span-1 overflow-hidden rounded-3xl border border-cyan-300/20 bg-white/5 p-6 backdrop-blur-xl md:col-span-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-100">
                  <CalendarIcon size={18} className="text-cyan-300" />
                  <span className="font-medium">Book a free consultation</span>
                </div>
                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-cyan-200/80">
                  {now.toLocaleString([], { month: 'long', year: 'numeric' })}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-cyan-200/80">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                  <div key={d} className="py-1 opacity-70">{d}</div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-2">
                {calendarMatrix.flat().map((d, i) => {
                  const isToday = d && d.toDateString() === new Date().toDateString()
                  const isSelected = d && selected && d.toDateString() === selected.toDateString()
                  return (
                    <button
                      key={i}
                      disabled={!d}
                      onClick={() => d && setSelected(d)}
                      className={[
                        'aspect-square rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
                        d ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-transparent',
                        isSelected ? 'bg-cyan-500/30 border-cyan-300/40 shadow-[0_0_24px_rgba(34,211,238,0.35)]' : '',
                        isToday && !isSelected ? 'ring-1 ring-cyan-300/40' : '',
                      ].join(' ')}
                    >
                      <span className={[
                        'text-sm',
                        isSelected ? 'text-white' : 'text-cyan-100/90',
                      ].join(' ')}>
                        {d ? d.getDate() : ''}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div className="text-cyan-100/80">
                  Selected: <span className="font-mono text-cyan-200">{selected.toDateString()}</span>
                </div>
                <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_2px_rgba(255,255,255,0.06)] ring-1 ring-white/20 transition hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]">
                  Confirm Free Call
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Showcase / Works CTA */}
            <div id="works" className="relative col-span-1 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:col-span-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="absolute inset-0 pointer-events-none" style={{
                background:
                  'radial-gradient(600px 180px at 20% 20%, rgba(34,211,238,0.15), transparent 50%), radial-gradient(600px 180px at 80% 80%, rgba(59,130,246,0.12), transparent 50%)',
              }} />
              <div className="relative">
                <h3 className="text-xl font-semibold">Signature Workflows</h3>
                <p className="mt-2 max-w-xl text-cyan-100/80">
                  Modular bento systems, liquid transitions, and tactile interactions tuned for premium brands.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {['Bento Systems','Motion Design','Design Systems','3D & WebGL'].map(tag => (
                    <span key={tag} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-cyan-100/80 backdrop-blur">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div id="contact" className="col-span-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:col-span-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h3 className="text-xl font-semibold">Let’s build the future</h3>
              <p className="mt-2 text-cyan-100/80">Tell us about your vision. We’ll craft a plan in 24 hours.</p>
              <form className="mt-4 space-y-3">
                <input placeholder="Your email" type="email" className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm placeholder:text-cyan-200/50 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" />
                <textarea placeholder="Project brief" rows={3} className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm placeholder:text-cyan-200/50 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" />
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]">
                  Send Inquiry
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom subtle divider line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </div>
  )
}
