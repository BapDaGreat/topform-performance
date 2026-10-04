import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import Player from '@vimeo/player';
import { motion } from 'motion/react';
import { BluePerformanceState3D } from './BluePerformanceState3D';
import { InteractiveHero3D } from './InteractiveHero3D';
import { Tilt3DCard } from './Tilt3DCard';

const WHATSAPP_URL =
  "https://wa.me/447575203332?text=Hi%20Mark%2C%20I've%20been%20looking%20at%20TOPFORM%20and%20I'm%20interested%20in%20working%20with%20you.";

const BIM_VIMEO_EMBED_URL =
  'https://player.vimeo.com/video/1230904160?h=26a94e858b&app_id=122963&dnt=1&autoplay=0&muted=1&loop=1&autopause=0&controls=1&title=0&byline=0&portrait=0&color=22c5fe';

/**
 * Resolves static assets cleanly across both local dev (/) and GitHub Pages (/topform-performance/)
 */
const getAssetUrl = (assetPath: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${normalizedBase}${cleanPath}`;
};

interface CaseStudy {
  number: string;
  title: string;
  startedParagraphs: string[];
  wentIntro: string;
  wentBullets?: string[];
  summary: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    number: '01',
    title: 'RELEASED BY THREE PREMIER LEAGUE ACADEMIES. NOW PLAYING AT ONE OF EUROPE\'S ELITE CLUBS.',
    startedParagraphs: [
      'He had been released by three Premier League academies and was rebuilding his career in the Championship.',
    ],
    wentIntro:
      'He established himself as one of the outstanding young players in the Championship before moving on to one of Europe\'s elite clubs.',
    summary:
      'From three academy releases to the highest levels of European football.',
  },
  {
    number: '02',
    title: 'ZERO GAME TIME IN JANUARY. PLAYER OF THE YEAR BY MAY.',
    startedParagraphs: [
      'Halfway through the season, he was at a Championship club and hadn\'t played a single minute.',
      'His confidence was at rock bottom.',
      'We started working together in January.',
    ],
    wentIntro: 'By the end of that same season, he had won both:',
    wentBullets: ['Young Player of the Year.', 'Player of the Year.'],
    summary:
      'From zero game time to two end-of-season awards in a matter of months.',
  },
  {
    number: '03',
    title:
      'CONSIDERING QUITTING FOOTBALL. TWO SEASONS LATER: PREMIER LEAGUE & FULL INTERNATIONAL.',
    startedParagraphs: [
      'His career wasn\'t going where he\'d hoped.',
      'He was facing the prospect of dropping into League Two and was seriously considering walking away from football altogether.',
    ],
    wentIntro: 'Two seasons later, he had become:',
    wentBullets: ['A Premier League player.', 'A full international.'],
    summary:
      'From considering whether he had a future in the game to playing at the highest level of English football and representing his country.',
  },
  {
    number: '04',
    title:
      'SIX MONTHS WITHOUT A GAME. THEN A MULTI-MILLION-POUND PREMIER LEAGUE MOVE.',
    startedParagraphs: [
      'He had joined a League One club but couldn\'t get into the team.',
      'For the first six months, he didn\'t play a single game.',
    ],
    wentIntro:
      'By the end of the following season, his performances had earned him a move to the Premier League for a multi-million-pound fee.',
    summary:
      'From struggling to get on the pitch in League One to becoming a Premier League player.',
  },
];

const ONGOING_QUESTIONS = [
  'What\'s going well?',
  'What could be better?',
  'What are you working on with your coaches?',
  'What keeps appearing in training or matches?',
  'What do you want to improve?',
];

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.51 0 .16 5.35.16 11.91c0 2.09.55 4.14 1.59 5.95L0 24l6.33-1.66a11.88 11.88 0 0 0 5.74 1.46h.01c6.56 0 11.91-5.35 11.91-11.91 0-3.18-1.24-6.17-3.47-8.41zM12.08 21.8c-1.78 0-3.52-.48-5.05-1.39l-.36-.21-3.75.98 1-3.65-.24-.38a9.85 9.85 0 0 1-1.52-5.24C2.16 6.45 6.61 2 12.08 2c2.65 0 5.14 1.03 7.02 2.9 1.87 1.88 2.9 4.37 2.9 7.02 0 5.46-4.45 9.88-9.92 9.88zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z" />
  </svg>
);

/**
 * Signature Figma Work With Mark Button:
 * Dark matte surface, hairline border, uppercase tracking, WhatsApp icon, glowing cyan indicator dot, and WhatsApp subcaption.
 * Ensures all CTAs make it completely clear that clicking contacts Mark via WhatsApp.
 */
const WorkWithMarkButton: React.FC<{
  layout?: 'inline' | 'stacked-left' | 'stacked-center';
  className?: string;
  label?: string;
  subtext?: string;
}> = ({
  layout = 'inline',
  className = '',
  label = 'Message Mark on WhatsApp',
  subtext = 'Opens a private, confidential WhatsApp conversation directly with Mark.',
}) => {
  const containerClass =
    layout === 'stacked-center'
      ? 'flex flex-col items-center text-center gap-2.5'
      : layout === 'stacked-left'
      ? 'flex flex-col items-start text-left gap-2.5'
      : 'inline-flex flex-col sm:flex-row sm:items-center gap-4';

  return (
    <div className={`${containerClass} ${className}`}>
      <motion.a
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="tf-figma-btn tf-control inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-white hover:text-white transition-all duration-200 group shadow-lg"
      >
        <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <span>{label}</span>
      </motion.a>
      <span className="text-[13px] text-zinc-200 font-normal">
        {subtext}
      </span>
    </div>
  );
};

/**
 * Autoplaying, playable Vimeo video player for Bim Pepple's press conference.
 * Located on the right side of the section.
 * Automatically plays (muted) when the user scrolls into view and pauses when scrolled away.
 * Features full native player controls and a floating quick-tap sound toggle button.
 */
const BimPeppleVideoPlayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    // Start muted to comply with browser autoplay security policies
    player.setMuted(true).catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User scrolled down to section — auto-play video
            player.play().catch((err) => {
              console.log('Autoplay deferred or prevented:', err);
            });
          } else {
            // User scrolled away — pause playback
            player.pause().catch(() => {});
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      player.pause().catch(() => {});
    };
  }, []);

  const toggleSound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        await playerRef.current.setMuted(false);
        await playerRef.current.setVolume(1);
        setIsMuted(false);
      } else {
        await playerRef.current.setMuted(true);
        setIsMuted(true);
      }
    } catch (err) {
      console.error('Error toggling sound:', err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/[0.12] shadow-2xl tf-figma-card group mx-auto lg:mx-0"
    >
      <iframe
        ref={iframeRef}
        src={BIM_VIMEO_EMBED_URL}
        title="Bim Pepple Press Conference"
        className="w-full h-full border-0 block"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      {/* Floating Quick Sound Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute top-3.5 right-3.5 z-20 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black/95 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all duration-200 cursor-pointer"
        title={isMuted ? 'Click to unmute sound' : 'Click to mute sound'}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#22c5fe]" />
            <span>Tap for sound</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#22c5fe]" />
            <span>Sound on</span>
          </>
        )}
      </button>
    </div>
  );
};

export const TopformSite: React.FC = () => {
  const [activeModalVideo, setActiveModalVideo] = useState<{
    title: string;
    subtitle: string;
    vimeoEmbedUrl?: string;
  } | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'TOPFORM | Play Consistently At Your Best. Make Your Best Even Better.';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModalVideo(null);
      }
    };
    if (activeModalVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalVideo]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] selection:bg-[#22c5fe] selection:text-[#000000]">
      {/* =====================================================================
          TOP BLUE ACCENT LINE & NAVBAR — Matches Figma Artboard (figma_slice_8.png)
         ===================================================================== */}
      <div className="w-full h-[1px] bg-[#0099FF]" />
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-12 py-3.5 sm:py-4">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-3 sm:gap-3.5 group min-w-0">
            <img
              src={getAssetUrl('/assets/topform-roundel-white.png')}
              alt="TOPFORM"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-white font-bold tracking-[0.14em] text-[14px] sm:text-base leading-none">
                TOPFORM
              </span>
              <span className="hidden sm:block text-[10px] text-zinc-300 font-semibold tracking-[0.18em] uppercase mt-1 truncate">
                PLAY AT YOUR BEST. MAKE YOUR BEST BETTER.
              </span>
            </div>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border border-white/15 bg-white/[0.04] text-[11px] sm:text-[13px] font-bold tracking-[0.12em] uppercase text-white hover:border-[#22c5fe]/50 hover:bg-[#22c5fe]/10 hover:text-white transition-all duration-200 group whitespace-nowrap shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span>WhatsApp Mark</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* ===================================================================
            01 | HERO — Premium Editorial Black-Led Direction
            Wide floodlit players banner across top + crisp solid white headline & CTA
           =================================================================== */}
        <section className="relative bg-[#000000] text-white pt-0 pb-24 sm:pb-32 overflow-hidden border-b border-white/[0.08]">
          {/* Full-bleed monochrome picture expanding to fill the screen without cropping */}
          <div className="w-full relative overflow-hidden">
            <img
              src={getAssetUrl('/assets/topform-players-bw.jpg')}
              alt="Professional footballers working with Mark Bowden"
              className="w-full h-auto block object-cover sm:object-cover object-top max-h-[820px]"
              fetchPriority="high"
            />
            {/* Seamless gradient fade at the bottom into pure black */}
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-36 md:h-56 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent pointer-events-none" />
          </div>

          {/* Interactive 3D Ambient Kinetic Mesh in Hero Space */}
          <div className="absolute right-0 top-1/2 -translate-y-1/4 w-full lg:w-[640px] h-[440px] lg:h-[600px] opacity-30 pointer-events-none z-0 hidden sm:block">
            <InteractiveHero3D />
          </div>

          {/* Centered Editorial Hero Content Block — Pure Typography & Restraint */}
          <div className="max-w-[680px] mx-auto px-4 pt-8 sm:pt-12 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="text-white font-bold tracking-tight text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.08]">
                Play consistently<br />
                at your best.<br />
                Make your best<br />
                even better.
              </h1>
            </motion.div>

            {/* Reiss Nelson Testimonial Feature — Quiet, Tactile Panel with 3D Tilt */}
            <motion.div
              className="my-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              <Tilt3DCard maxTilt={5}>
                <div className="tf-figma-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-7 items-center sm:items-start">
                  <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl mx-auto sm:mx-0">
                    <img
                      src={getAssetUrl('/assets/topform-reiss-nelson.jpg')}
                      alt="Reiss Nelson"
                      className="w-full h-full object-cover object-center filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="space-y-3 text-left flex-1 pt-1">
                    <h3 className="text-white font-black tracking-tight text-xl sm:text-2xl uppercase leading-tight">
                      &ldquo;I RECOMMEND HIM<br />TO EVERY FOOTBALLER.&rdquo;
                    </h3>
                    <p className="text-zinc-200 text-[14px] sm:text-[15px] leading-relaxed font-normal">
                      &ldquo;I started working with Mark when I was on loan at Feyenoord. A difficult time for me... with weekly sessions Mark made me realise that everything I do and think is on me and gave me the confidence I needed to finish the season strong.&rdquo;
                    </p>
                    <p className="text-white font-semibold text-xs sm:text-sm">
                      Reiss Nelson
                    </p>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>

            <p className="text-zinc-200 text-[16px] sm:text-[18px] leading-relaxed mt-6">
              Private 1-to-1 performance coaching and bespoke Off-Pitch Training for professional footballers.
            </p>

            <div className="mt-8">
              <WorkWithMarkButton layout="inline" />
            </div>
          </div>
        </section>

        {/* ===================================================================
            02 | THE CORE IDEA — Quieter Black-and-White Visual System
            Staggered 01 & 02 Dark Matte Panels without loud glowing rings
           =================================================================== */}
        <section id="core-idea" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08] relative">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
            <div className="text-left mb-16 sm:mb-20">
              <h2 className="text-white font-bold tracking-tight text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1]">
                There are two sides<br />
                to becoming the best<br />
                footballer you can be.
              </h2>
            </div>

            {/* Staggered Cards Layout — Matte Editorial Panels */}
            <div className="relative">
              {/* Card 01 — Left Aligned */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[500px] mr-auto relative z-10"
              >
                <Tilt3DCard maxTilt={6}>
                  <div className="tf-figma-card rounded-2xl p-7 sm:p-10 transition-all duration-300 hover:border-white/20">
                    <p className="text-xs text-zinc-300 font-bold tracking-wider mb-4">01</p>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                      Bring out the football you already have.
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-zinc-200 leading-relaxed mb-4">
                      You've spent years developing your game. But having ability and consistently showing that ability when it matters aren't always the same thing.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-zinc-200 leading-relaxed">
                      TOPFORM helps you understand what allows your best football to come out — and conditions you to get there more consistently.
                    </p>
                  </div>
                </Tilt3DCard>
              </motion.div>

              {/* Card 02 — Right Aligned & Staggered */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[500px] ml-auto mt-8 lg:-mt-12 relative z-20"
              >
                <Tilt3DCard maxTilt={6}>
                  <div className="tf-figma-card rounded-2xl p-7 sm:p-10 transition-all duration-300 hover:border-white/20">
                    <p className="text-xs text-zinc-300 font-bold tracking-wider mb-4">02</p>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                      Keep developing the football you have.
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-zinc-200 leading-relaxed mb-3">
                      There's always something you can get better at.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-white font-medium leading-relaxed mb-4">
                      Your movement. Finishing. Positioning. Decision-making. Composure. Confidence. How you respond to mistakes. Whatever matters most to your game.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-zinc-200 leading-relaxed">
                      Through bespoke Off-Pitch Training, we identify what you want to improve and deliberately rehearse it.
                    </p>
                  </div>
                </Tilt3DCard>
              </motion.div>

              {/* Bottom Divider & Left-Aligned Kicker */}
              <div className="mt-20 pt-12 border-t border-white/[0.08] text-left">
                <p className="text-zinc-200 text-base sm:text-lg">
                  Play at your best. <strong className="text-white font-bold">Make your best better. Keep doing both.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            03 | BLUE PERFORMANCE STATE — Matched in-line with paragraph height
            Left: Full portrait bounded to match the text height, non-overlapping
            Right: Editorial copy
           =================================================================== */}
        <section id="performance" className="py-20 sm:py-28 lg:py-32 bg-[#000000] border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-stretch">
              {/* Left Column: Player Portrait uncropped on mobile, centered */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start items-center lg:items-stretch">
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none lg:h-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.08] shadow-2xl flex items-center justify-center mx-auto lg:mx-0">
                  <img
                    src={getAssetUrl('/assets/topform-portrait-cover.jpg')}
                    alt="Professional footballer looking into camera"
                    className="w-full h-auto max-h-[680px] lg:max-h-none lg:h-full block object-contain lg:object-cover filter contrast-105 brightness-100"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column: Editorial Copy */}
              <div className="lg:col-span-7 flex flex-col justify-between py-1 text-left space-y-6">
                <div>
                  <h2 className="text-white font-bold text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.1] tracking-tight mb-6">
                    You know what<br />
                    it feels like when<br />
                    you're at your best.
                  </h2>

                  <p className="text-white font-bold text-lg mb-4">
                    You're in the game.
                  </p>

                  <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed mb-4">
                    Your mind is clear. You're present. You're not overthinking anything.
                  </p>

                  <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed mb-4">
                    You see things quickly. Decisions come naturally. You trust yourself. Your game feels instinctive, automatic and effortless.
                  </p>

                  <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed mb-4">
                    Some players call it being in the zone. Others call it flow.
                  </p>

                  <p className="text-[#22c5fe] font-bold text-2xl sm:text-3xl py-2 mb-4">
                    I call it your Blue Performance State.
                  </p>

                  <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed mb-4">
                    One of the first things we'll work on in TOPFORM is understanding what takes you away from that state — and conditioning you to get there more consistently.
                  </p>

                  <p className="text-white font-semibold text-[15px] sm:text-[16px] leading-relaxed">
                    Because having the ability is one thing. Being able to consistently bring it onto the pitch is another.
                  </p>
                </div>

                {/* Subtle Hairline Divider from Figma */}
                <div className="w-12 h-px bg-white/20 my-3" />

                <div className="space-y-4">
                  <h3 className="text-white font-bold text-xl sm:text-2xl leading-snug">
                    But playing at your best is only half of it.<br />
                    Because what if we can make your best even better?
                  </h3>

                  <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                    No matter how well you're playing, there's always something you can get better at.
                  </p>

                  <p className="text-white font-medium text-[15px] sm:text-[16px] leading-relaxed">
                    Your movement. Finishing. First touch. Positioning. Scanning. Decision-making. Composure. Confidence. How you respond to mistakes. Whatever matters most to your game.
                  </p>

                  <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                    Through bespoke Off-Pitch Training, we take what you want to improve and deliberately rehearse it.
                  </p>

                  <p className="text-white font-bold text-base sm:text-lg pt-1">
                    Play at your best. Make your best better. Keep doing both.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            04 | WHAT STOPS YOUR BEST FOOTBALL & BRAIN STATES
            Conceptual Arrival of Color: Red & Green monochromatic restraint,
            Blue Performance State is the arrival of color.
           =================================================================== */}
        <section className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-xl mx-auto px-4 text-left">
            <h2 className="text-white font-bold text-[clamp(2.2rem,4.5vw,3.2rem)] leading-tight mb-8">
              What stops your best<br />football coming out?
            </h2>

            <div className="space-y-5 text-left mb-12">
              <p className="text-white font-bold text-lg">
                Sometimes it's pressure.
              </p>
              <p className="text-zinc-200 text-[16px] sm:text-[17px] leading-relaxed">
                Sometimes it's a mistake, a missed chance, a bad decision or something the referee has done.
              </p>
              <p className="text-zinc-200 text-[16px] sm:text-[17px] leading-relaxed">
                Sometimes your mind has gone to what happens if you lose the ball, whether you're going to start next week, or you're trying too hard to make something happen.
              </p>
              <p className="text-zinc-200 text-[16px] sm:text-[17px] leading-relaxed">
                And sometimes you're simply trying to consciously control parts of your game that you've spent years learning to do automatically.
              </p>
            </div>

            {/* Clear Red / Green / Blue Separation */}
            <div className="space-y-6">
              {/* Red Brain — Monochromatic & Quiet with Subtle 3D Depth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Tilt3DCard maxTilt={3} className="rounded-2xl">
                  <div className="tf-figma-card rounded-2xl p-6 sm:p-9 space-y-4">
                    <h3 className="text-2xl font-bold text-white">Red Brain</h3>
                    <div className="space-y-3 text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                      <p>Your Red Brain isn't something we're trying to get rid of.</p>
                      <p className="text-white font-semibold">But we don't want it in control.</p>
                      <p className="text-zinc-200">
                        Left in control, anger can become frustration. Nerves can become anxiety. Thinking can become overthinking. Pressure can make you rush, hesitate, force things or play safe.
                      </p>
                      <p className="text-zinc-200">
                        But those same raw ingredients can be incredibly useful when they're controlled in the right way.
                      </p>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>

              {/* Green Brain — Monochromatic & Quiet with Subtle 3D Depth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Tilt3DCard maxTilt={3} className="rounded-2xl">
                  <div className="tf-figma-card rounded-2xl p-6 sm:p-9 space-y-4">
                    <h3 className="text-2xl font-bold text-white">Green Brain</h3>
                    <div className="space-y-3 text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                      <p>This is where your Green Brain comes in.</p>
                      <p className="text-zinc-200">
                        Your Green Brain keeps you present and puts your attention onto the things you can control.
                      </p>
                      <p className="text-zinc-200">
                        And rather than allowing Red Brain to take over, Green Brain takes control of what Red Brain gives you.
                      </p>
                      <div className="space-y-2 py-2 border-y border-white/[0.06] my-2 text-zinc-200 text-[15px]">
                        <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                          <span>Anger can become aggression and intensity.</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                          <span>Nerves and anxiety can become sharpness, awareness and energy.</span>
                        </p>
                      </div>
                      <p className="text-zinc-200">
                        You're not trying to become emotionless or completely calm.
                      </p>
                      <p className="text-white font-semibold">
                        You're using what you've got.
                      </p>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>

              {/* Blue Performance State — The Arrival of Color with Interactive 3D Flow Orb */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="tf-blue-state-card rounded-2xl p-7 sm:p-11 relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    <div className="lg:col-span-7 space-y-5 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0099ff]/15 border border-[#0099ff]/30 text-[#22c5fe] text-xs font-bold tracking-wider uppercase">
                        <span>03 &mdash; Flow State</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#22c5fe] tracking-tight">
                        Blue Performance State
                      </h3>
                      <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                        When Green Brain is in control and those raw ingredients from Red Brain are working for you rather than against you, you create your <strong className="text-white font-bold">Blue Performance State</strong>.
                      </p>
                      <p className="text-white font-bold text-[16px] sm:text-[17px] leading-relaxed pt-1">
                        Your mind is clear. You're present.
                      </p>
                      <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                        You're seeing, reacting and deciding rather than consciously trying to control your football.
                      </p>
                      <p className="text-[#22c5fe] font-black text-2xl sm:text-3xl pt-2 tracking-tight">
                        Your football takes over.
                      </p>
                    </div>

                    {/* Interactive 3D Blue Performance State Flow Orb */}
                    <div className="lg:col-span-5 flex justify-center items-center">
                      <BluePerformanceState3D />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            04B | FABIO CARVALHO TESTIMONIAL & PROOF
            Immediately follows Red/Green/Blue content.
            Monochrome image on one side and large quote treatment on the other.
           =================================================================== */}
        <section id="fabio-proof" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Image Left — Centered on mobile */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative overflow-hidden rounded-2xl max-w-[440px] border border-white/[0.12] shadow-2xl bg-zinc-950 mx-auto lg:mx-0">
                  <img
                    src={getAssetUrl('/assets/topform-kevin-celebration.jpg')}
                    alt="Fabio Carvalho"
                    className="w-full h-auto block object-contain sm:object-cover filter contrast-105 brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 sm:h-20 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Quote Right */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h2 className="text-white font-black tracking-tight text-[clamp(2.1rem,4.8vw,3.6rem)] uppercase leading-[1.08]">
                  &ldquo;PLAYING CONSISTENTLY IN MY <span className="text-[#22c5fe]">BLUE PERFORMANCE STATE</span>.&rdquo;
                </h2>

                <div className="space-y-4 text-zinc-200 text-base sm:text-lg lg:text-[19px] leading-relaxed font-normal max-w-xl">
                  <p>
                    &ldquo;He's helped me to approach training sessions and matches by being able to bounce back quickly from mistakes and playing consistently in my Blue Performance State.&rdquo;
                  </p>
                  <p>
                    &ldquo;Helping me to keep going and continue trying new things and risking things.&rdquo;
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-white font-bold text-base sm:text-lg">
                    Fabio Carvalho
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            05 | BESPOKE OFF-PITCH TRAINING (Positions)
            Matches Figma (above_gap3_2.png, above_gap3_3.png, scan_slice_01.png)
           =================================================================== */}
        <section id="off-pitch-training" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 space-y-12">
            <div className="text-left max-w-xl mx-auto space-y-6">
              <h2 className="text-white font-bold text-[clamp(2.2rem,4.5vw,3.2rem)] leading-tight">
                Work on your game<br />
                — even when you're<br />
                not on the pitch.
              </h2>
              <p className="text-white font-semibold text-lg">
                There's only so much physical training you can do.
              </p>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                Your club controls your training load. You have matches to play, recovery to manage and a body that needs to be ready to perform.
              </p>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                But that doesn't mean you have to stop working on your game.
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
                Through bespoke Off-Pitch Training, we take the situations that matter to your football and deliberately rehearse them.
              </p>
            </div>

            <div className="pt-8 text-left max-w-xl mx-auto md:max-w-none">
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-8">
                Your position. Your game. Your situations.
              </h3>

              {/* 3 Horizontal Cards Side by Side with 3D Tilt */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* 01 STRIKERS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Tilt3DCard maxTilt={6}>
                    <div className="tf-figma-card rounded-2xl p-6 sm:p-8 space-y-4 h-full hover:border-white/20">
                      <p className="text-xs text-zinc-300 font-semibold tracking-wider">
                        01  STRIKERS
                      </p>
                      <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                        <strong className="text-white">If you're a striker</strong>, we might rehearse the movement you're working on with your striker coach. Attacking a particular type of cross. Creating separation from a centre-back. A 1v1 with the goalkeeper. Or what you do immediately after missing a chance.
                      </p>
                    </div>
                  </Tilt3DCard>
                </motion.div>

                {/* 02 MIDFIELDERS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Tilt3DCard maxTilt={6}>
                    <div className="tf-figma-card rounded-2xl p-6 sm:p-8 space-y-4 h-full hover:border-white/20">
                      <p className="text-xs text-zinc-300 font-semibold tracking-wider">
                        02  MIDFIELDERS
                      </p>
                      <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                        <strong className="text-white">If you're a midfielder</strong>, it might be scanning before you receive, recognising where the pressure is coming from, receiving on the half-turn or seeing the next pass earlier.
                      </p>
                    </div>
                  </Tilt3DCard>
                </motion.div>

                {/* 03 DEFENDERS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Tilt3DCard maxTilt={6}>
                    <div className="tf-figma-card rounded-2xl p-6 sm:p-8 space-y-4 h-full hover:border-white/20">
                      <p className="text-xs text-zinc-300 font-semibold tracking-wider">
                        03  DEFENDERS
                      </p>
                      <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                        <strong className="text-white">If you're a defender</strong>, it might be decision-making, breaking lines, stepping in with the ball, playing more effective diagonal passes, 1v1 defending, leadership or composure.
                      </p>
                    </div>
                  </Tilt3DCard>
                </motion.div>
              </div>

              {/* Kicker Below Cards */}
              <div className="mt-12 text-left max-w-xl mx-auto md:max-w-none">
                <p className="text-zinc-200 text-base sm:text-lg">
                  And next week it could be something completely different. <strong className="text-white font-bold">Because the work changes as your football changes.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            06 | BIM PEPPLE TESTIMONIAL — Video Player on Right Side
            Playable, always seen on the right, and automatically autoplays when scrolled into view
           =================================================================== */}
        <section id="bim-proof" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Quote & Proof */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h2 className="text-white font-black tracking-tight text-[clamp(2.4rem,5.5vw,4.25rem)] uppercase leading-none">
                  &ldquo;IT&apos;S JUST LIKE<br />PRACTISING.&rdquo;
                </h2>

                <p className="text-zinc-200 text-lg sm:text-2xl leading-relaxed font-normal max-w-xl">
                  &ldquo;When you are in that position on the pitch, it feels like you&apos;ve been there before.&rdquo;
                </p>

                <div className="pt-2">
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Bim Pepple
                  </p>
                  <p className="text-xs text-zinc-300 font-medium tracking-wider uppercase mt-1">
                    Plymouth Argyle Press Conference
                  </p>
                </div>
              </div>

              {/* Right Column: Always Visible Autoplaying Video Player — Centered on mobile */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <BimPeppleVideoPlayer />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            07 | YOUR FOOTBALL DECIDES WHAT WE WORK ON — Matches Figma (scan_slice_04.png)
           =================================================================== */}
        <section className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[680px] mx-auto px-4 text-left space-y-8">
            <div>
              <h2 className="text-white font-bold text-[clamp(2.2rem,4.5vw,3.2rem)] leading-tight mb-4">
                Your football decides<br />what we work on.
              </h2>
              <p className="text-zinc-200 text-base sm:text-lg">
                Every time we work together, we look at what's actually happening in your football.
              </p>
            </div>

            {/* Cyan Bullet List */}
            <div className="space-y-3.5 text-left">
              {ONGOING_QUESTIONS.map((q) => (
                <div key={q} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#22c5fe] tf-dot-pulse shrink-0" />
                  <span className="text-white font-medium text-[16px] sm:text-[17px]">
                    {q}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-left text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
              <p className="text-white font-semibold text-lg">
                Then we decide what will make the biggest difference to your game — and we work on it.
              </p>
              <p>
                It might be something that happened in your last match. Something you're working on in training. Something your coach wants from you. A situation that keeps appearing. Or simply something you want to add to your game.
              </p>
              <p>
                We can then turn that into bespoke Off-Pitch Training — deliberately rehearsing the situations that matter to you.
              </p>
              <p>
                And as your football changes, the work changes with it.
              </p>
              <p className="text-white font-semibold">
                The better I understand you, your game, your position and the situations you face, the more specific the work becomes.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            08 | WORKING WITH YOUR COACHING — Matches Figma (scan_slice_05.png & 06.png)
           =================================================================== */}
        <section className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[720px] mx-auto px-4">
            <div className="tf-figma-card rounded-2xl p-8 sm:p-12 text-left space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Your coaches are<br />working on your game.<br />So are we.
              </h3>
              <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                If your striker coach is working with you on making a particular movement, we can rehearse it.
              </p>
              <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                If your manager wants something different from you tactically, we can work on recognising those situations.
              </p>
              <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                If you've been doing something on the training pitch that isn't quite appearing naturally in matches yet, we can work on that too.
              </p>
              <p className="text-white font-semibold text-[15px] sm:text-[16px] pt-2">
                You work on it with your coaches on the pitch. We can deliberately rehearse it off the pitch.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            09 | EMILIANO MARCONDES TESTIMONIAL — Matches Figma (scan_slice_07.png)
           =================================================================== */}
        <section id="emiliano-proof" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Quote Left */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-white font-black tracking-tight text-[clamp(2.2rem,5vw,3.8rem)] uppercase leading-none">
                  &ldquo;IT HAS DEFINITELY<br />
                  IMPROVED ME<br />
                  AS A PLAYER.&rdquo;
                </h2>

                <p className="text-zinc-200 text-lg sm:text-xl leading-relaxed font-normal max-w-xl">
                  &ldquo;Mark and I have been working together for a few years, working on the psychological part of my game and building good habits and focus points for each game. It has definitely improved me as a player.&rdquo;
                </p>

                <p className="text-white font-semibold text-base">
                  Emiliano Marcondes
                </p>
              </div>

              {/* Matchday Action Photo Right — Centered on mobile */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative overflow-hidden rounded-2xl max-w-[480px] border border-white/[0.10] shadow-2xl bg-zinc-950 mx-auto lg:mx-0">
                  <img
                    src={getAssetUrl('/assets/topform-emiliano-bournemouth-bw.jpg')}
                    alt="Emiliano Marcondes celebrating — AFC Bournemouth"
                    className="w-full h-auto block object-contain sm:object-cover filter contrast-105 brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-6 sm:h-16 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            10 | WHERE THEY STARTED. WHERE THEIR FOOTBALL TOOK THEM
            Editorial Layout with dynamic visual rhythm, alternating alignment,
            large architectural numerals, and 2-column comparative split.
           =================================================================== */}
        <section id="career-journeys" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-left space-y-4 max-w-2xl mb-14 sm:mb-20">
              <h2 className="text-white font-bold text-[clamp(2.2rem,4.8vw,3.6rem)] leading-tight">
                Where they started.<br />
                Where their<br />
                football took them.
              </h2>
              <p className="text-white font-semibold text-base sm:text-lg">
                Every player's journey is different.
              </p>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                The following players came to me at very different points in their careers, with very different challenges.
              </p>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                This is where they were when we started working together — and where their careers went next.
              </p>
            </div>

            {/* Alternating Editorial Stories with Large Numerals */}
            <div className="space-y-10 sm:space-y-12">
              {CASE_STUDIES.map((study, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <motion.div
                    key={study.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={isEven ? 'lg:ml-auto lg:max-w-[980px]' : 'lg:mr-auto lg:max-w-[980px]'}
                  >
                    <Tilt3DCard maxTilt={3} className="rounded-2xl">
                      <div className="tf-figma-card rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-300 hover:border-white/20">
                        <p className="text-xs text-zinc-300 font-bold tracking-wider mb-4">
                          {study.number}
                        </p>

                        <h3 className="text-xl sm:text-2xl lg:text-[25px] font-bold text-white uppercase leading-snug tracking-tight mb-8">
                          {study.title}
                        </h3>

                        {/* Editorial 2-Column Comparative Split on Desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pt-6 border-t border-white/[0.08]">
                          {/* Left: Started */}
                          <div className="md:col-span-5 space-y-3 text-left">
                            <p className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.14em]">
                              WHEN WE STARTED WORKING TOGETHER
                            </p>
                            <div className="space-y-2.5">
                              {study.startedParagraphs.map((p, pIdx) => (
                                <p key={pIdx} className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                                  {p}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Right: Where career went */}
                          <div className="md:col-span-7 space-y-3 text-left border-t border-white/[0.08] pt-6 md:border-t-0 md:pt-0 md:border-l md:border-white/[0.08] md:pl-8 lg:pl-10">
                            <p className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.14em]">
                              WHERE HIS CAREER WENT
                            </p>
                            <p className="text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
                              {study.wentIntro}
                            </p>
                            {study.wentBullets && (
                              <div className="space-y-2 mt-2">
                                {study.wentBullets.map((b) => (
                                  <div key={b} className="flex items-center gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c5fe] shrink-0" />
                                    <span className="text-[#22c5fe] text-[15px] sm:text-[16px] font-semibold">{b}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Takeaway / Summary Bar */}
                        <div className="pt-6 mt-6 border-t border-white/[0.08]">
                          <p className="text-white font-semibold text-[15px] sm:text-[16px] leading-relaxed">
                            {study.summary}
                          </p>
                        </div>
                      </div>
                    </Tilt3DCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            11 | WHY I BUILT TOPFORM — Matches Figma (scan_slice_15.png)
           =================================================================== */}
        <section id="why-topform" className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[680px] mx-auto px-4 text-left space-y-8">
            <h2 className="text-white font-bold text-[clamp(2.2rem,4.5vw,3.2rem)] leading-tight">
              Why I built TOPFORM.
            </h2>

            <div className="space-y-5 text-left text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
              <p>
                I've spent years working with professional footballers and trying to understand one thing:
              </p>
              <p className="text-white font-semibold text-lg">
                What allows a player's best football to come out consistently?
              </p>
              <p>
                That question led to the ideas I first explored in <em>Use Your Brain, Raise Your Game</em> — Red Brain, Green Brain and eventually the Blue Performance State.
              </p>
              <p>
                But the longer I've worked with players, the more the work has evolved.
              </p>
              <p>
                It isn't only about helping a player bring out the football they already have.
              </p>
              <p className="text-white font-semibold">
                It's also about helping them develop the football they have.
              </p>
              <p className="text-[#22c5fe] font-bold text-lg">
                That's what TOPFORM has become.
              </p>
              <p className="text-white font-semibold">
                Helping you play consistently at your best — while continually working to make your best even better.
              </p>

              {/* Founder Profile Badge (scan_slice_15.png) */}
              <div className="pt-6 flex items-center gap-4">
                <img
                  src={getAssetUrl('/assets/topform-mark-bowden.jpg')}
                  alt="Mark Bowden"
                  className="w-12 h-12 rounded object-cover border border-white/10"
                />
                <div>
                  <p className="text-white font-bold text-[15px]">Mark Bowden</p>
                  <p className="text-xs text-zinc-300">Founder, TOPFORM</p>
                </div>
              </div>

              <div className="w-16 h-px bg-white/20 mt-12" />
            </div>
          </div>
        </section>

        {/* ===================================================================
            12 | YOU DON'T NEED TO BE STRUGGLING — Matches Figma (scan_slice_16.png)
           =================================================================== */}
        <section className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[680px] mx-auto px-4 text-left space-y-8">
            <h2 className="text-white font-bold text-[clamp(2.2rem,4.5vw,3.2rem)] leading-tight">
              You don't need to be<br />struggling to get better.
            </h2>

            <div className="space-y-5 text-left text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
              <p className="text-white font-medium">
                TOPFORM is for professional footballers who are serious about getting everything they can from their ability — and continuing to improve it.
              </p>

              {/* 3 Cyan Bullets */}
              <div className="space-y-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c5fe] shrink-0" />
                  <span className="text-zinc-200 text-[15px] font-medium">You don't need to be struggling.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c5fe] shrink-0" />
                  <span className="text-zinc-200 text-[15px] font-medium">You don't need to have lost confidence.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c5fe] shrink-0" />
                  <span className="text-zinc-200 text-[15px] font-medium">You don't need to be out of form.</span>
                </div>
              </div>

              <p>
                You can be playing some of the best football of your career and still want more:
              </p>
              <p className="text-white font-bold text-lg pt-1">
                How do I keep this coming out?<br />
                And how do I get even better?
              </p>
              <p className="text-[#22c5fe] font-semibold">
                That's what TOPFORM is built around.
              </p>

              <div className="w-16 h-px bg-white/20 mt-12" />
            </div>
          </div>
        </section>

        {/* ===================================================================
            13 | PRIVATE 1-TO-1 COACHING — Matches Figma (scan_slice_18.png)
           =================================================================== */}
        <section className="py-24 sm:py-32 bg-[#000000] border-b border-white/[0.08]">
          <div className="max-w-[680px] mx-auto px-4 text-left space-y-8">
            <h2 className="text-white font-bold text-[clamp(2.2rem,4.5vw,3.2rem)] leading-tight">
              Private. Bespoke.<br />Built around your football.
            </h2>

            <div className="space-y-5 text-left text-zinc-200 text-[15px] sm:text-[16px] leading-relaxed">
              <p className="text-white font-medium">
                I work personally with a limited number of professional footballers at any one time.
              </p>
              <p>
                Our work is ongoing and built around you, your football and what you want to achieve.
              </p>
              <p>
                We'll work together privately through regular 1-to-1 sessions, with prescribed training and bespoke Off-Pitch Training to continue the work between our sessions.
              </p>
              <p className="text-white font-semibold">
                The better I understand your game, the more specific our work can become.
              </p>
            </div>

            <div className="pt-4 flex justify-start">
              <WorkWithMarkButton layout="stacked-left" />
            </div>
          </div>
        </section>

        {/* ===================================================================
            14 | FINAL CLOSE — Matches Figma (scan_slice_19.png & 20.png)
           =================================================================== */}
        <section className="py-28 sm:py-36 bg-[#000000] text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-8">
            {/* Centered Brand Roundel Logo */}
            <div className="flex flex-col items-center">
              <img
                src={getAssetUrl('/assets/topform-roundel-white.png')}
                alt="TOPFORM"
                className="w-14 h-14 object-contain mb-3"
              />
              <span className="text-white font-bold tracking-[0.14em] text-sm uppercase">
                TOPFORM
              </span>
              <span className="text-[10px] text-zinc-300 font-semibold tracking-[0.18em] uppercase mt-1">
                PLAY AT YOUR BEST. MAKE YOUR BEST BETTER.
              </span>
            </div>

            <h2 className="text-white font-bold text-[clamp(2.4rem,5.5vw,4.2rem)] leading-tight pt-4">
              How good can you become?
            </h2>

            <div className="space-y-3 text-zinc-200 text-[16px] sm:text-[18px]">
              <p>You've spent years building your game.</p>
              <p className="text-white font-semibold">There's the player you are today.</p>
              <p className="text-white font-semibold">And there's the player you can still become.</p>
              <p className="text-zinc-200 pt-2 text-[15px] sm:text-[16px]">
                TOPFORM is built to help you get the best from both.
              </p>
            </div>

            <div className="pt-6 space-y-6">
              <p className="text-white font-bold text-xl sm:text-2xl">
                Play consistently at your best.<br />
                <span className="text-[#22c5fe]">Make your best even better.</span>
              </p>

              <div className="flex justify-center">
                <WorkWithMarkButton layout="stacked-center" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER — Matches Figma (scan_slice_20.png)
          Full-width cyan/blue hairline accent border + brand info + contact
         ===================================================================== */}
      <footer className="bg-[#000000] border-t border-[#0099FF] py-12 px-6 sm:px-12 text-zinc-200 text-xs">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <img
              src={getAssetUrl('/assets/topform-roundel-white.png')}
              alt="TOPFORM"
              className="w-8 h-8 object-contain"
            />
            <div>
              <p className="text-white font-bold tracking-[0.1em] text-sm">TOPFORM</p>
              <p className="text-[10px] text-zinc-300 font-semibold tracking-[0.18em] uppercase">
                PLAY AT YOUR BEST. MAKE YOUR BEST BETTER.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end text-center sm:text-right gap-1.5 text-[13px] text-zinc-200 font-normal">
            <p className="text-white font-semibold text-[13px]">Mark Bowden</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-2.5 gap-y-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#22c5fe] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>WhatsApp: 07575 203332</span>
              </a>
              <span className="text-zinc-400 hidden sm:inline">·</span>
              <a href="mailto:mark@topform.global" className="hover:text-white transition-colors">
                mark@topform.global
              </a>
              <span className="text-zinc-400 hidden sm:inline">·</span>
              <a href="https://www.topform.global" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                www.topform.global
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          VIDEO MODAL (Bim Pepple Vimeo Video)
         ===================================================================== */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalVideo.title}
          onClick={() => setActiveModalVideo(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] tf-figma-card rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-4 flex items-center justify-between gap-4 border-b border-white/[0.08]">
              <div>
                <p className="text-sm font-bold text-white">
                  {activeModalVideo.title}
                </p>
                <p className="text-xs text-zinc-300">
                  {activeModalVideo.subtitle}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close video modal"
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-lg text-zinc-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full aspect-[9/16] bg-black">
              <iframe
                src={activeModalVideo.vimeoEmbedUrl}
                title={activeModalVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopformSite;
