import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './components/Hero';
import { TopformSite } from './components/TopformSite';
import { EvvySecSite } from './components/EvvySecSite';
import { cn } from './lib/utils';
import {
  Sparkles,
  Layers,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Clock,
  Globe,
  Shield,
  Menu,
  X,
  Star,
} from 'lucide-react';

export function ModernLandingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');
  const [bookingDate, setBookingDate] = useState('Tomorrow, 2:00 PM EST');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'High-Impact Landing Page',
    budget: '$5k - $15k',
  });

  const handleOpenBooking = () => {
    setBookingStep('form');
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep('success');
  };

  return (
    <div className="relative min-h-screen bg-[#010101] text-white selection:bg-[#C967E8] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* =========================================================================
          TOP FLOATING GLASS NAVIGATION BAR
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-6 py-3 rounded-full bg-[rgba(15,15,20,0.65)] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] p-[1.5px] flex items-center justify-center shadow-[0_0_16px_rgba(201,103,232,0.6)] group-hover:shadow-[0_0_22px_rgba(201,103,232,0.85)] transition-shadow duration-300">
              <div className="w-full h-full bg-[#0c0c10] rounded-[6.5px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#FA93FA] to-[#C967E8] font-black text-sm tracking-tighter">
                  VR
                </span>
              </div>
            </div>
            <span className="font-bold text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              VISION<span className="text-[#C967E8]">REALITY</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <a
              href="#services"
              className="hover:text-white transition-colors duration-150"
            >
              Services
            </a>
            <a
              href="#work"
              className="hover:text-white transition-colors duration-150"
            >
              Work
            </a>
            <a
              href="#process"
              className="hover:text-white transition-colors duration-150"
            >
              Process
            </a>
            <a
              href="#reviews"
              className="hover:text-white transition-colors duration-150"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors duration-150"
            >
              FAQ
            </a>
          </div>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenBooking}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md active:scale-[0.97] transition-all duration-150 cursor-pointer shadow-[0_0_14px_rgba(201,103,232,0.2)]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FA93FA]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-auto absolute top-20 left-4 right-4 p-5 rounded-2xl bg-[#0c0c12]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-4 text-center"
            >
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-white text-base font-medium"
              >
                Services
              </a>
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-white text-base font-medium"
              >
                Work
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-white text-base font-medium"
              >
                Process
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-white text-base font-medium"
              >
                Reviews
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] text-white font-semibold text-sm shadow-lg shadow-purple-600/30"
              >
                Book a 15-min call
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          HERO SECTION (Includes H1, Announcement Pill, Video Stream & Logo Cloud)
          ========================================================================= */}
      <main>
        <Hero onBookCall={handleOpenBooking} />

        {/* =======================================================================
            SECTION: VALUE PROPOSITION / BENTO SERVICES
            ======================================================================= */}
        <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Subtle ambient light */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C967E8]/10 rounded-full blur-[140px] pointer-events-none -z-10"
          />

          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(28,27,36,0.5)] border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#FA93FA] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Engineered for Exponential Growth
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Every detail is calibrated to{' '}
              <span className="bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] bg-clip-text text-transparent">
                captivate & convert.
              </span>
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              We combine deep design engineering, native animation physics, and high-performance frontend architecture to deliver products users genuinely love.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 - Double Span */}
            <div className="md:col-span-2 relative p-8 sm:p-10 rounded-3xl bg-[rgba(18,17,25,0.45)] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FA93FA]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] p-0.5 mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(201,103,232,0.4)]">
                <div className="w-full h-full bg-[#0a0a0e] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#FA93FA]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Sub-Second Core Web Vitals & Streaming UI
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                Built with React 19, Tailwind CSS v4, and modern streaming architecture. Instant First Contentful Paint, silky 60fps animations, and zero layout shift.
              </p>

              {/* Visual preview pill indicators */}
              <div className="mt-8 flex flex-wrap gap-3">
                {['100 Lighthouse Score', 'Zero Cumulative Layout Shift', 'Sub-400ms LCP', 'HLS & WebAssembly Ready'].map(
                  (badge, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-white/5 border border-white/10"
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="relative p-8 rounded-3xl bg-[rgba(18,17,25,0.45)] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] p-0.5 mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(201,103,232,0.4)]">
                <div className="w-full h-full bg-[#0a0a0e] rounded-[10px] flex items-center justify-center">
                  <Layers className="w-6 h-6 text-[#C967E8]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Design Systems with Real Taste
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tokens, micro-interactions, responsive typography, and tactile glass surfaces that align your entire product organization.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400">
                <span className="text-[#FA93FA]">const</span> palette = &#123; accent: <span className="text-[#C967E8]">'#C967E8'</span> &#125;;
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="relative p-8 rounded-3xl bg-[rgba(18,17,25,0.45)] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] p-0.5 mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(201,103,232,0.4)]">
                <div className="w-full h-full bg-[#0a0a0e] rounded-[10px] flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#983AD6]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                SEO & AI Search Visibility
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Structured JSON-LD schema, semantic entity maps, clean canonical hierarchies, and fast crawlability for Google and generative AI search agents.
              </p>
            </div>

            {/* Bento Card 4 - Double Span */}
            <div className="md:col-span-2 relative p-8 sm:p-10 rounded-3xl bg-[rgba(18,17,25,0.45)] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] p-0.5 mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(201,103,232,0.4)]">
                <div className="w-full h-full bg-[#0a0a0e] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FA93FA]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                High-Conversion Storytelling
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                We craft intentional user journeys: starting with immediate clarity, building technical credibility with physical demonstrations, and driving decisive conversion.
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center sm:text-left">
                <div>
                  <div className="text-2xl font-bold text-white">4.2x</div>
                  <div className="text-xs text-zinc-400 mt-1">Average Conversion Lift</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">14 Days</div>
                  <div className="text-xs text-zinc-400 mt-1">Typical Launch Cycle</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">TypeScript Strict</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">99.8%</div>
                  <div className="text-xs text-zinc-400 mt-1">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION: FEATURED CASE STUDIES / WORK
            ======================================================================= */}
        <section id="work" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Selected Digital Products
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              Explore recent platforms built with dark-mode aesthetic, tactile animations, and relentless attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 */}
            <div className="group relative rounded-3xl bg-[rgba(18,17,25,0.4)] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#1c1426] via-[#100d18] to-[#010101] relative p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#FA93FA]">TOPFORM HIGH PERFORMANCE</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#C967E8]/20 text-[#FA93FA] border border-[#C967E8]/30">LIVE DEPLOYMENT</span>
                  </div>
                  <div className="my-auto text-center">
                    <h4 className="text-2xl font-bold text-white">Elite Athlete Physical Intelligence</h4>
                    <p className="text-xs text-zinc-400 mt-2">Editorial Monochrome & High-Voltage Cyan Analytics</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-zinc-400 pt-4 border-t border-white/5">
                    <span>Core Web Vitals: 99</span>
                    <span>Stack: React + Tailwind + Three.js</span>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white group-hover:text-[#FA93FA] transition-colors">
                  TOPFORM Athletic Intelligence Platform
                </h3>
                <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
                  Analog depth, 3D stadium tunnel perspective, and real-time biometric tracking for Premier League and international athletes.
                </p>
              </div>
            </div>

            {/* Work Item 2 */}
            <div className="group relative rounded-3xl bg-[rgba(18,17,25,0.4)] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#121324] via-[#090b16] to-[#010101] relative p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#69E0FA]">EVVYDIGITAL // SECCLOUD</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">ENTERPRISE SAAS</span>
                  </div>
                  <div className="my-auto text-center">
                    <h4 className="text-2xl font-bold text-white">Zero-Trust Cloud Governance</h4>
                    <p className="text-xs text-zinc-400 mt-2">Liquid Glassmorphism & Enterprise Digital Architecture</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-zinc-400 pt-4 border-t border-white/5">
                    <span>Threat Detection: 99.99%</span>
                    <span>Stack: React 19 + Tailwind v4</span>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white group-hover:text-[#C967E8] transition-colors">
                  EvvyDigital SecCloud Enterprise Infrastructure
                </h3>
                <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
                  Liquid glass surfaces, interactive security spec drawer, and full SOC2 cloud defense architecture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION: OUR PROCESS TIMELINE
            ======================================================================= */}
        <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              The Sprint to Market
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              A disciplined, high-velocity roadmap that takes you from strategic concept to a live, production-grade deployment in days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Vision & Architecture',
                desc: 'Deep positioning alignment, technical discovery, wireframes, and design token foundations.',
              },
              {
                step: '02',
                title: 'High-Fidelity Interface',
                desc: 'Glassmorphism aesthetic, responsive layout typography, and physical motion design.',
              },
              {
                step: '03',
                title: 'Full-Stack Build',
                desc: 'Tailwind CSS v4, motion/react springs, HLS streaming video, and micro-interactions.',
              },
              {
                step: '04',
                title: 'SEO & Global Launch',
                desc: 'Core Web Vitals tuning, JSON-LD schema, edge caching, and zero-downtime DNS cutover.',
              },
            ].map((phase, idx) => (
              <div
                key={idx}
                className="relative p-6 sm:p-8 rounded-2xl bg-[rgba(18,17,25,0.4)] border border-white/10 hover:border-[#C967E8]/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#FA93FA] mb-4">
                  STAGE // {phase.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =======================================================================
            SECTION: SOCIAL PROOF / REVIEWS
            ======================================================================= */}
        <section id="reviews" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-1 text-[#FA93FA] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Trusted by Ambitious Teams
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              Here's how partnering with our design engineering studio changed the trajectory of their business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'They transformed our tired SaaS marketing site into a jaw-dropping digital experience. Our demo bookings literally tripled in the first 30 days.',
                author: 'Sarah Lin',
                role: 'Founder & CEO, ScaleVenture',
              },
              {
                quote:
                  'The speed and technical craft are unmatched. The animations run at a lock-solid 60fps on mobile, and the HLS video streaming integration is completely seamless.',
                author: 'David Vance',
                role: 'Head of Engineering, CloudCore',
              },
              {
                quote:
                  'Not only did they nail the visual world with the purple glassmorphism, but their technical SEO setup got our product indexed and ranking in record time.',
                author: 'Elena Rostova',
                role: 'VP Product, Lumina Studio',
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[rgba(18,17,25,0.4)] backdrop-blur-xl border border-white/10 flex flex-col justify-between"
              >
                <p className="text-zinc-300 text-base leading-relaxed italic">
                  "{review.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="font-semibold text-white">{review.author}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =======================================================================
            SECTION: FINAL HIGH-IMPACT CTA BANNER
            ======================================================================= */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-12 text-center">
          <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[rgba(28,27,40,0.7)] to-[rgba(15,14,22,0.8)] backdrop-blur-2xl border border-white/15 shadow-[0_0_60px_rgba(201,103,232,0.15)] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#FA93FA]/20 via-[#C967E8]/15 to-[#983AD6]/10 blur-[100px] pointer-events-none" />

            <h2 className="relative z-10 text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
              Ready to turn your boldest vision into{' '}
              <span className="bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] bg-clip-text text-transparent">
                reality?
              </span>
            </h2>
            <p className="relative z-10 mt-4 text-zinc-300 text-base sm:text-lg max-w-xl mx-auto">
              Schedule your 15-minute roadmap call. We'll audit your current product, review your goals, and show you exactly what we can build.
            </p>

            <div className="relative z-10 mt-8 flex justify-center">
              <div className="inline-block p-1 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_35px_rgba(201,103,232,0.3)]">
                <button
                  onClick={handleOpenBooking}
                  type="button"
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-base hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <span>Book a 15-min call</span>
                  <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="relative bg-[#050507] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 text-zinc-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-[#FA93FA] to-[#983AD6] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0a0e] rounded-[5px] flex items-center justify-center">
                <span className="text-[#C967E8] text-xs font-bold">VR</span>
              </div>
            </div>
            <span className="text-white font-bold tracking-tight">VISION REALITY</span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs text-zinc-400">High-End Design Engineering</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All systems operational • Accepting select Q4 projects</span>
          </div>

          <div className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Vision Reality Studio. All rights reserved.
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE 15-MIN CALL BOOKING MODAL
          ========================================================================= */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0c0c14] border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(201,103,232,0.25)] text-white overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingStep === 'form' ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FA93FA] mb-2">
                    <Calendar className="w-4 h-4" /> 15-Minute Strategy Call
                  </div>
                  <h3 className="text-2xl font-bold text-white">Let's talk about your project</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Pick a time and tell us a bit about your product vision.
                  </p>

                  <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elon Musk"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#C967E8] focus:ring-1 focus:ring-[#C967E8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="founder@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#C967E8] focus:ring-1 focus:ring-[#C967E8]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">
                          Project Focus
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) =>
                            setFormData({ ...formData, projectType: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14141e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C967E8]"
                        >
                          <option>Landing Page Redesign</option>
                          <option>Full Web Application</option>
                          <option>Design System & Motion</option>
                          <option>SEO Migration & Perf</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">
                          Estimated Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14141e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C967E8]"
                        >
                          <option>$5k - $15k</option>
                          <option>$15k - $30k</option>
                          <option>$30k+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Selected Time
                      </label>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300">
                        <Clock className="w-4 h-4 text-[#FA93FA]" />
                        <span>{bookingDate}</span>
                        <button
                          type="button"
                          onClick={() => setBookingDate('In 2 Days, 4:00 PM EST')}
                          className="ml-auto text-xs text-[#FA93FA] hover:underline"
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] text-white font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(201,103,232,0.4)] cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Call Confirmed!</h3>
                  <p className="mt-2 text-zinc-400 text-sm max-w-xs mx-auto">
                    We've emailed a Google Meet calendar invitation to <strong className="text-white">{formData.email || 'your inbox'}</strong> for {bookingDate}.
                  </p>
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function App() {
  const [activeSite, setActiveSite] = useState<'landing' | 'topform' | 'seccloud'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const querySite = params.get('site')?.toLowerCase();
      if (querySite === 'topform') return 'topform';
      if (querySite === 'seccloud' || querySite === 'evvy') return 'seccloud';

      const path = window.location.pathname.toLowerCase();
      if (path.includes('topform')) return 'topform';
      if (path.includes('evvydigital') || path.includes('seccloud')) return 'seccloud';
    }
    return 'landing';
  });

  return (
    <>
      {/* Site Switcher Ribbon for Pair-Programming & Multi-Surface Review */}
      <div className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 p-1 rounded-full bg-black/80 backdrop-blur-lg border border-white/15 text-xs text-zinc-400 shadow-xl">
        <button
          onClick={() => setActiveSite('landing')}
          className={cn(
            'px-3 py-1 rounded-full font-medium transition-all',
            activeSite === 'landing'
              ? 'bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] text-white shadow-sm'
              : 'hover:text-white'
          )}
        >
          Landing Page
        </button>
        <button
          onClick={() => setActiveSite('topform')}
          className={cn(
            'px-2.5 py-1 rounded-full font-medium transition-all',
            activeSite === 'topform'
              ? 'bg-[#008BCE] text-white shadow-sm'
              : 'hover:text-white'
          )}
        >
          TOPFORM
        </button>
        <button
          onClick={() => setActiveSite('seccloud')}
          className={cn(
            'px-2.5 py-1 rounded-full font-medium transition-all',
            activeSite === 'seccloud'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'hover:text-white'
          )}
        >
          SecCloud
        </button>
      </div>

      {activeSite === 'topform' && <TopformSite />}
      {activeSite === 'seccloud' && <EvvySecSite />}
      {activeSite === 'landing' && <ModernLandingPage />}
    </>
  );
}

export default App;
