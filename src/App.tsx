import { useState, useRef, useEffect } from 'react'
import {
  Zap,
  Car,
  Plug,
  Lightbulb,
  BatteryCharging,
  ShieldCheck,
  Phone,
  MessageSquare,
  ChevronRight,
  Star,
  ChevronLeft,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  Users,
  Menu,
  X,
  Upload,
  Flame,
  Wrench,
  Home,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const PHONE = '(978) XXX-XXXX'
const PHONE_TEL = 'tel:+19780000000'
const SMS_LINK = 'sms:+19780000000?body=Hi%2C%20I%20need%20help%20with...'

const services = [
  {
    icon: Zap,
    title: 'Panel Upgrades & Replacements',
    desc: 'Outdated 100A panels, Federal Pacific boxes, or failed breakers — we upgrade to modern 200A+ service with full permits and inspection.',
  },
  {
    icon: Car,
    title: 'EV Charger Installation',
    desc: 'Level 2 home chargers for all makes and models. We pull the permit, handle the install, and pass inspection — first time.',
  },
  {
    icon: Plug,
    title: 'Outlet & Switch Repair',
    desc: 'Dead outlets, flickering lights, GFCI failures, or adding new circuits — same-day appointments often available.',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design & Retrofit',
    desc: 'Under-cabinet LED, recessed lighting, exterior security lights, and smart dimmer integration. Beautiful results, energy savings.',
  },
  {
    icon: BatteryCharging,
    title: 'Generator Hookups',
    desc: 'Whole-home standby generators and transfer switches. Stay powered through New England winters without extension cords.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety Inspections',
    desc: 'Pre-purchase electrical inspections, code-compliance reports, and aluminum wiring assessments. Written report delivered same day.',
  },
]

const plans = [
  {
    name: 'Basic',
    price: '$199',
    period: '/yr',
    badge: null,
    tagline: 'Essential peace of mind',
    features: [
      'Annual electrical safety inspection',
      '1 free service call per year',
      'Priority scheduling (48-hour)',
      'Written inspection report',
    ],
    cta: 'Start with Basic',
    highlight: false,
  },
  {
    name: 'Plus',
    price: '$499',
    period: '/yr',
    badge: 'Most Popular',
    tagline: 'For homeowners who want priority access',
    features: [
      'Everything in Basic',
      '24/7 priority phone access',
      '10% off all repairs & materials',
      '2 free service calls per year',
      'Smoke & CO detector check',
    ],
    cta: 'Get Plus',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$999',
    period: '/yr',
    badge: null,
    tagline: 'Total electrical protection',
    features: [
      'Everything in Plus',
      'Quarterly safety inspections',
      '3 free service calls per year',
      '15% off all repairs & materials',
      'Panel thermal imaging scan',
      'Emergency same-day response',
    ],
    cta: 'Go Premium',
    highlight: false,
  },
]

const reviews = [
  {
    initials: 'TM',
    name: 'Homeowner in Chelmsford',
    text: 'Had my panel upgraded last month — couldn\'t be happier. The crew showed up exactly when they said, explained every step, and cleaned up after themselves. Zero surprises on the final bill.',
    stars: 5,
    color: 'bg-blue-600',
  },
  {
    initials: 'SR',
    name: 'Homeowner in Tewksbury',
    text: 'Our kitchen renovation needed all new outlets and under-cabinet lighting. Fast quote, fair price, finished ahead of schedule. Will call again for the garage project.',
    stars: 5,
    color: 'bg-emerald-600',
  },
  {
    initials: 'DK',
    name: 'Homeowner in Billerica',
    text: 'Called at 8pm about a breaker that wouldn\'t reset. They walked me through the issue, sent someone at 7am sharp. Had the fix done before I left for work.',
    stars: 5,
    color: 'bg-violet-600',
  },
  {
    initials: 'PL',
    name: 'Homeowner in Lowell',
    text: 'Installed two Level 2 EV chargers in our garage — permit pulled, inspection passed first try. Cleanest conduit run I\'ve ever seen. Professional all the way.',
    stars: 5,
    color: 'bg-orange-600',
  },
  {
    initials: 'JH',
    name: 'Homeowner in Dracut',
    text: 'I\'ve hired three electricians in this area over the years. These are the only ones who showed up when they said they would — and they were upfront about pricing before starting.',
    stars: 5,
    color: 'bg-rose-600',
  },
]

const towns = [
  'Tewksbury', 'Lowell', 'Chelmsford', 'Billerica',
  'Dracut', 'Westford', 'Wilmington', 'Andover',
  'Methuen', 'Burlington', 'Woburn', 'Acton',
]

// ─── Sticky Header ────────────────────────────────────────────────────────────

function StickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Plans', href: '#plans' },
    { label: 'About', href: '#about' },
    { label: 'Get a Quote', href: '#quote' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-black shadow-lg' : 'bg-black/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#FFDD00] rounded flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-black" />
          </div>
          <span className="font-black text-white text-base tracking-tight leading-none">
            COGNATO<span className="text-[#FFDD00]"> ELECTRIC</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-[#FFDD00] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={SMS_LINK}
            className="hidden sm:flex items-center gap-1.5 text-gray-300 hover:text-[#FFDD00] text-sm transition-colors"
          >
            <MessageSquare size={15} />
            <span>Text Us</span>
          </a>
          <a
            href={PHONE_TEL}
            className="flex items-center gap-1.5 bg-[#FFDD00] text-black text-sm font-bold px-3 py-1.5 rounded hover:bg-[#FACB00] transition-colors"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Call Now</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-[#FFDD00] text-sm font-medium border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
          <div className="px-4 pt-3 flex gap-3">
            <a
              href={PHONE_TEL}
              className="flex-1 flex items-center justify-center gap-2 bg-[#FFDD00] text-black font-bold py-2.5 rounded text-sm"
            >
              <Phone size={15} /> Call Now
            </a>
            <a
              href={SMS_LINK}
              className="flex-1 flex items-center justify-center gap-2 border border-[#FFDD00] text-[#FFDD00] font-bold py-2.5 rounded text-sm"
            >
              <MessageSquare size={15} /> Text Us
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-14"
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80&auto=format&fit=crop)',
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/88 via-black/75 to-gray-900/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFDD00]/10 border border-[#FFDD00]/30 rounded-full px-4 py-1.5 mb-6">
          <Award size={14} className="text-[#FFDD00]" />
          <span className="text-[#FFDD00] text-xs font-semibold tracking-wide uppercase">
            MA Licensed Master Electrician · Lic #A12345
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1.0] mb-5 max-w-3xl mx-auto">
          The On-Time{' '}
          <span className="text-[#FFDD00]">Electrician.</span>
          <br />
          Guaranteed.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
          Residential &amp; commercial electrical — Tewksbury, Lowell &amp; the
          Merrimack Valley. 24/7 emergency response, upfront pricing, no
          surprise invoices.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <a
            href={PHONE_TEL}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFDD00] text-black font-black text-lg px-8 py-4 rounded-lg hover:bg-[#FACB00] active:scale-95 transition-all shadow-lg shadow-yellow-400/20"
          >
            <Phone size={20} />
            Call {PHONE}
          </a>
          <a
            href={SMS_LINK}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all"
          >
            <MessageSquare size={20} />
            Text Us
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle size={15} className="text-[#FFDD00]" />
            Licensed &amp; Insured in MA
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-[#FFDD00]" />
            24/7 Emergency Response
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle size={15} className="text-[#FFDD00]" />
            Upfront Pricing — No Surprises
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle size={15} className="text-[#FFDD00]" />
            Family-Owned &amp; Operated
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="flex flex-col items-center gap-1 text-gray-500 text-xs animate-bounce">
          <ChevronRight size={16} className="rotate-90" />
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#FFDD00] text-xs font-bold tracking-widest uppercase bg-black px-3 py-1 rounded-full">
            What We Do
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-black mt-4 mb-3">
            Electrical Services
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            From a single tripped breaker to a full-home panel upgrade — we
            handle it, permit and all.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <a
              key={s.title}
              href="#quote"
              className="group relative bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-[#FFDD00] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFDD00] transition-colors">
                <s.icon size={22} className="text-[#FFDD00] group-hover:text-black transition-colors" />
              </div>
              <h3 className="font-bold text-base text-black mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-black font-semibold text-sm group-hover:text-[#111] transition-colors">
                Get a quote <ChevronRight size={14} />
              </span>
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#FFDD00] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Maintenance Plans ────────────────────────────────────────────────────────

function MaintenancePlans() {
  return (
    <section id="plans" className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-[#FFDD00] text-xs font-bold tracking-widest uppercase">
            Protection Plans
          </span>
        </div>
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            Save thousands when{' '}
            <span className="text-[#FFDD00]">something breaks</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Most emergency electrical calls run $400–$900. One plan pays for
            itself the first time you need us after hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border ${
                plan.highlight
                  ? 'bg-[#FFDD00] text-black border-[#FFDD00] scale-[1.02] shadow-2xl shadow-yellow-400/30'
                  : 'bg-white/5 border-white/10 hover:border-white/25 transition-colors'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-[#FFDD00] text-xs font-black px-4 py-1 rounded-full tracking-wider uppercase whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${plan.highlight ? 'text-black/60' : 'text-[#FFDD00]'}`}>
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`font-black text-5xl ${plan.highlight ? 'text-black' : 'text-white'}`}>
                  {plan.price}
                </span>
                <span className={`text-lg ${plan.highlight ? 'text-black/60' : 'text-gray-400'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-black/70' : 'text-gray-400'}`}>
                {plan.tagline}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-black' : 'text-[#FFDD00]'}`}
                    />
                    <span className={plan.highlight ? 'text-black' : 'text-gray-300'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className={`block text-center font-bold py-3 rounded-lg text-sm transition-all ${
                  plan.highlight
                    ? 'bg-black text-[#FFDD00] hover:bg-gray-900'
                    : 'bg-[#FFDD00] text-black hover:bg-[#FACB00]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          All plans include written documentation. Cancel anytime. Call to
          customize for multi-family or commercial properties.
        </p>
      </div>
    </section>
  )
}

// ─── Emergency Band ───────────────────────────────────────────────────────────

function EmergencyBand() {
  return (
    <section className="relative py-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 40%, #ea580c 100%)' }}>
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 11px)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
        <div className="flex justify-center mb-3">
          <Flame size={36} className="animate-pulse" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-3">
          Need help right now?
        </h2>
        <p className="text-red-100 text-lg mb-6">We answer 24/7 — real people, not voicemail.</p>
        <a
          href={PHONE_TEL}
          className="inline-flex items-center gap-3 bg-white text-red-600 font-black text-3xl sm:text-4xl px-8 py-4 rounded-xl hover:bg-red-50 active:scale-95 transition-all shadow-xl"
        >
          <Phone size={32} />
          {PHONE}
        </a>
        <p className="text-red-200 text-xs mt-5 max-w-sm mx-auto">
          AI assistant available 24/7 — captures your details &amp; texts the owner
          immediately for after-hours emergencies
        </p>
      </div>
    </section>
  )
}

// ─── Financing ────────────────────────────────────────────────────────────────

function FinancingBand() {
  return (
    <section className="py-5 bg-[#FFDD00]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-black text-center">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-black" />
            <span className="font-black text-lg">0% financing available</span>
          </div>
          <span className="hidden sm:block text-black/40 text-xl">·</span>
          <span className="font-medium text-base">Approved in minutes — no hard credit pull</span>
          <span className="hidden sm:block text-black/40 text-xl">·</span>
          <a href="#quote" className="bg-black text-[#FFDD00] font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-gray-900 transition-colors">
            See Options →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
              <img
                src="https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=800&q=80&auto=format&fit=crop"
                alt="Cognato Electric — licensed electrician at work"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 right-0 md:-right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FFDD00] rounded-xl flex items-center justify-center">
                <Award size={24} className="text-black" />
              </div>
              <div>
                <div className="font-black text-sm text-black">MA Licensed</div>
                <div className="text-xs text-gray-500">Master Electrician</div>
              </div>
            </div>
            {/* Owner initial circle */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-[#FFDD00] font-black text-xl">JC</span>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-[#FFDD00] text-xs font-bold tracking-widest uppercase bg-black px-3 py-1 rounded-full">
              About Us
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-black mt-4 mb-6">
              Tewksbury-born,<br />
              <span className="text-gray-500">built on referrals</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cognato Electric started the way most great trade shops do — one
              homeowner telling a neighbor. We grew up doing work across the
              Merrimack Valley and built our reputation the only way that
              actually works: showing up on time, quoting straight, and standing
              behind what we install.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We're not a franchise. There's no 1-800 number routing your call
              to a stranger. When you call Cognato Electric, you reach someone
              who lives in this community, pulls permits in these towns, and
              passes inspections the first time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              From 60A fuse boxes to commercial tenant fit-outs, every job gets
              the same standard: licensed, permitted, inspected. No short cuts,
              no "we'll make it work."
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Home, label: 'Residential', val: '500+' },
                { icon: Wrench, label: 'Commercial', val: '150+' },
                { icon: Users, label: 'Referrals', val: '85%' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon size={18} className="text-[#FFDD00]" />
                  </div>
                  <div className="font-black text-2xl text-black">{stat.val}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const scroll = (dir: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.clientWidth < 640 ? track.clientWidth : 380
    const next = dir === 'right'
      ? Math.min(current + 1, reviews.length - 1)
      : Math.max(current - 1, 0)
    track.scrollTo({ left: next * (cardWidth + 16), behavior: 'smooth' })
    setCurrent(next)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
              Real Customers
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-black mt-2">
              What our neighbors say
            </h2>
            <div className="flex items-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#FFDD00] text-[#FFDD00]" />
              ))}
              <span className="text-gray-500 text-sm ml-1">5.0 · Google</span>
            </div>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          className="reviews-track flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              className="review-card bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-4"
              style={{ minWidth: 'min(340px, calc(100vw - 2rem))' }}
            >
              <div className="flex gap-1">
                {[...Array(r.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#FFDD00] text-[#FFDD00]" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className={`w-9 h-9 ${r.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{r.initials}</span>
                </div>
                <span className="text-gray-500 text-xs font-medium">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Service Area ─────────────────────────────────────────────────────────────

function ServiceArea() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Map photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop"
              alt="Greater Lowell / Merrimack Valley area"
              loading="lazy"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={40} className="text-[#FFDD00] mx-auto mb-2" />
                <div className="font-black text-white text-xl">Greater Lowell Area</div>
                <div className="text-gray-300 text-sm">Merrimack Valley, MA</div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[#FFDD00] text-xs font-bold tracking-widest uppercase">
              Service Area
            </span>
            <h2 className="font-display text-4xl text-white mt-3 mb-2">
              We come to you
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Serving the Merrimack Valley and surrounding communities — same-day
              and next-day appointments available in most towns.
            </p>

            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 mb-6">
              {towns.map((town) => (
                <li key={town} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#FFDD00] rounded-full flex-shrink-0" />
                  {town}
                </li>
              ))}
            </ul>

            <p className="text-gray-500 text-xs">
              Not on the list? Call — we often service surrounding towns for
              larger projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Quote Form ───────────────────────────────────────────────────────────────

function QuoteForm() {
  const [replyPref, setReplyPref] = useState<'text' | 'call'>('text')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="quote" className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-[#FFDD00] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-black" />
          </div>
          <h2 className="font-display text-3xl text-black mb-3">Request received!</h2>
          <p className="text-gray-500 mb-6">
            We'll follow up via your preferred method within 1 hour during business
            hours. For emergencies, call us directly at{' '}
            <a href={PHONE_TEL} className="text-black font-bold underline">{PHONE}</a>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm text-gray-400 underline"
          >
            Submit another request
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="quote" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
            Free Estimates
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-black mt-4 mb-3">
            Get a Quote
          </h2>
          <p className="text-gray-500">
            Tell us about your project — we'll respond same day with a straight price.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="(978) 555-0100"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
              Property Address
            </label>
            <input
              type="text"
              placeholder="123 Main St, Tewksbury, MA"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
              Describe Your Project *
            </label>
            <textarea
              required
              rows={4}
              placeholder="E.g. Need panel upgraded from 100A to 200A, two EV chargers installed in garage. House was built 1972."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition resize-none"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
              Upload Photos (optional)
            </label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg p-5 cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
              <Upload size={20} className="text-gray-400" />
              <span className="text-sm text-gray-500">Tap to attach photos of the work area</span>
              <input type="file" accept="image/*" multiple className="hidden" />
            </label>
          </div>

          {/* Reply preference */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Reply via
            </label>
            <div className="flex gap-3">
              {(['text', 'call'] as const).map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2 flex-1 justify-center py-2.5 border-2 rounded-lg cursor-pointer transition-all text-sm font-semibold ${
                    replyPref === opt
                      ? 'border-black bg-black text-[#FFDD00]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="reply"
                    value={opt}
                    checked={replyPref === opt}
                    onChange={() => setReplyPref(opt)}
                    className="sr-only"
                  />
                  {opt === 'text' ? <MessageSquare size={15} /> : <Phone size={15} />}
                  {opt === 'text' ? 'Text me' : 'Call me'}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFDD00] text-black font-black text-base py-4 rounded-xl hover:bg-[#FACB00] active:scale-[0.99] transition-all"
          >
            Send My Request →
          </button>

          <p className="text-center text-xs text-gray-400">
            No spam. We'll only contact you about this project.
          </p>
        </form>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FFDD00] rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-black" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                COGNATO<span className="text-[#FFDD00]"> ELECTRIC</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">
              Licensed master electrician serving Tewksbury and the greater
              Lowell area. Residential, commercial, and 24/7 emergency.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={14} className="text-[#FFDD00] flex-shrink-0" />
                <span>[PLACEHOLDER: street], Tewksbury, MA 01876</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={14} className="text-[#FFDD00] flex-shrink-0" />
                <a href={PHONE_TEL} className="hover:text-[#FFDD00] transition-colors">
                  {PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#quote" className="hover:text-[#FFDD00] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              {[
                { label: 'Protection Plans', href: '#plans' },
                { label: 'About Us', href: '#about' },
                { label: 'Service Area', href: '#services' },
                { label: 'Get a Quote', href: '#quote' },
                { label: 'Facebook', href: 'https://facebook.com', target: '_blank' },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.target}
                    rel={l.target ? 'noopener noreferrer' : undefined}
                    className="hover:text-[#FFDD00] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-600 space-y-1">
              <div>MA Licensed Master Electrician</div>
              <div>License #A12345</div>
              <div>Fully Insured · Bonded</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Cognato Electric. All rights reserved.</span>
          <span>Research prototype — not affiliated with the business</span>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <StickyHeader />
      <main>
        <Hero />
        <Services />
        <MaintenancePlans />
        <EmergencyBand />
        <FinancingBand />
        <About />
        <Reviews />
        <ServiceArea />
        <QuoteForm />
      </main>
      <Footer />
    </>
  )
}
