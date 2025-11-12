import React from 'react'

const NavItem = ({ label, active }) => (
  <a
    href={`#${label.toLowerCase()}`}
    className={[
      'relative px-4 py-2 text-sm tracking-wide uppercase',
      'transition-colors duration-200',
      active ? 'text-white' : 'text-white/70 hover:text-white',
    ].join(' ')}
  >
    <span className={[
      'relative',
      active ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : '',
    ].join(' ')}>
      {label}
    </span>
    {active && (
      <span className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-8 -translate-x-1/2 bg-white/80 shadow-[0_0_12px_2px_rgba(255,255,255,0.45)]" />
    )}
  </a>
)

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white antialiased">
      {/* Frame borders */}
      <div className="pointer-events-none absolute inset-4 rounded-xl border border-white/10" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-4 rounded-xl"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(100% 100% at 50% 50%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(100% 100% at 50% 50%, black, transparent 70%)',
            opacity: 0.08,
          }}
        />
      </div>

      {/* Subtle stars/grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0)), \
               radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.6), rgba(255,255,255,0)), \
               radial-gradient(1px 1px at 35% 75%, rgba(255,255,255,0.6), rgba(255,255,255,0)), \
               radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.6), rgba(255,255,255,0))',
          }}
        />
      </div>

      {/* Top Navigation with tech tab shape */}
      <header className="relative z-10 flex items-center justify-center px-6 pt-8">
        <nav className="relative">
          {/* Angular tab container */}
          <div
            className="relative mx-auto flex items-center justify-center gap-1 px-3 py-1"
            style={{
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              border: '1px solid rgba(255,255,255,0.16)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.06)',
              backdropFilter: 'blur(6px)',
            }}
          >
            {/* Left + */}
            <span className="absolute left-2 top-1/2 -translate-y-1/2 select-none text-xs text-white/60">+</span>

            {/* Nav items */}
            <div className="flex items-center gap-1">
              {[
                { label: 'Home', active: true },
                { label: 'Works' },
                { label: 'Awards' },
                { label: 'Team' },
                { label: 'Prices' },
                { label: 'Contacts' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  style={{
                    clipPath:
                      'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                  }}
                >
                  <div className="mx-0.5 rounded-md border border-white/10 bg-white/0 px-1.5">
                    <NavItem label={item.label} active={item.active} />
                  </div>
                  {/* metallic edges */}
                  <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/10" />
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20 opacity-60" />
                </div>
              ))}
            </div>

            {/* Right + */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 select-none text-xs text-white/60">+</span>
          </div>
        </nav>
      </header>

      {/* Branding + hero */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-32 pt-20">
        <section className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">v0.9.3</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="font-mono text-xs text-white/50">LAT 40.71 · LON -74.00</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="font-mono text-xs text-white/50">UTC {new Date().toUTCString().slice(17, 22)}</span>
          </div>

          <h1 className="text-5xl leading-[1.05] tracking-tight md:text-7xl">
            <span className="block font-light text-white/90">COSMOS</span>
            <span className="block font-semibold text-white">STUDIO</span>
          </h1>

          <p className="max-w-2xl text-lg text-white/70">
            A creative UI/UX practice crafting precise, elegant, and futuristic interfaces. Minimal cosmic aesthetics. Maximal clarity.
          </p>

          <div className="mt-4 inline-flex flex-wrap items-center gap-3">
            {['Futuristic UI', 'Cosmic Minimalism', 'Tech Dashboard', 'Dark Mode Elegance'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Minimal feature grid */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: 'Design Systems', desc: 'Scalable components, tokens, and motion tuned for premium brands.' },
            { title: 'Interactive Prototypes', desc: 'High-fidelity flows with tactile micro-interactions.' },
            { title: '3D + WebGL Touches', desc: 'Tasteful depth and light without the noise.' },
          ].map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                   style={{ background: 'radial-gradient(400px 120px at 20% 0%, rgba(255,255,255,0.08), transparent 60%)' }} />
              <h3 className="text-lg font-medium text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-white/70">{card.desc}</p>
              <div className="mt-6 h-px w-full bg-white/10" />
              <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                <span className="font-mono">READY</span>
                <span className="font-mono">00:{Math.floor(Math.random()*59).toString().padStart(2,'0')}</span>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Floating CONTACT orb */}
      <a
        href="#contacts"
        className="group fixed bottom-8 right-8 z-20"
        aria-label="Contact"
      >
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-black/60">
          {/* Halo */}
          <span className="absolute -inset-2 rounded-full bg-white/20 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
          {/* Ring */}
          <span className="absolute inset-0 rounded-full ring-2 ring-white/70 shadow-[0_0_30px_rgba(255,255,255,0.55)]" />
          {/* Inner */}
          <span className="relative font-semibold tracking-wide text-white">CONTACT</span>
        </div>
      </a>

      {/* Footer microtext */}
      <footer className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center">
        <div className="flex items-center gap-4 text-[10px] text-white/50">
          <span className="font-mono">COSMOS STUDIO</span>
          <span>—</span>
          <span className="font-mono">BUILD {new Date().toISOString().slice(0,10).replace(/-/g,'.')}</span>
        </div>
      </footer>
    </div>
  )
}
