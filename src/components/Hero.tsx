import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { motion } from 'motion/react';
import { InfiniteSlider } from './ui/infinite-slider';
import { cn } from '../lib/utils';

export interface HeroProps {
  onBookCall?: () => void;
  className?: string;
}

const CUSTOMER_LOGOS = [
  {
    name: 'OpenAI',
    src: 'https://html.tailus.io/blocks/customers/openai.svg',
    width: 'w-28 sm:w-32',
  },
  {
    name: 'Nvidia',
    src: 'https://html.tailus.io/blocks/customers/nvidia.svg',
    width: 'w-24 sm:w-28',
  },
  {
    name: 'GitHub',
    src: 'https://html.tailus.io/blocks/customers/github.svg',
    width: 'w-24 sm:w-28',
  },
  {
    name: 'Nike',
    src: 'https://html.tailus.io/blocks/customers/nike.svg',
    width: 'w-18 sm:w-20',
  },
  {
    name: 'GE',
    src: 'https://html.tailus.io/blocks/customers/ge.svg',
    width: 'w-16 sm:w-20',
  },
  {
    name: 'Laravel',
    src: 'https://html.tailus.io/blocks/customers/laravel.svg',
    width: 'w-24 sm:w-28',
  },
  {
    name: 'Lilly',
    src: 'https://html.tailus.io/blocks/customers/lilly.svg',
    width: 'w-20 sm:w-24',
  },
  {
    name: 'Lemon Squeezy',
    src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg',
    width: 'w-32 sm:w-36',
  },
];

export const Hero: React.FC<HeroProps> = ({ onBookCall, className }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl =
      'https://customer-cbeadsgr09pnsezs.cloudflarestream.com/697945ca6b876878dba3b23fbd2f1561/manifest/video.m3u8';
    const mp4Fallback =
      '/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1';

    let hls: Hls | null = null;
    let isCleanedUp = false;

    const switchToFallback = () => {
      if (isCleanedUp) return;
      if (hls) {
        hls.destroy();
        hls = null;
      }
      if (video.src !== mp4Fallback) {
        video.src = mp4Fallback;
        video.load();
        video.play().catch(() => {});
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!isCleanedUp) {
          video.play().catch(() => {});
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal || data.response?.code === 404) {
          switchToFallback();
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple WebKit HLS
      video.src = hlsUrl;
      video.addEventListener('error', switchToFallback, { once: true });
      video.play().catch(() => {});
    } else {
      switchToFallback();
    }

    return () => {
      isCleanedUp = true;
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-[#010101] text-white pt-24 sm:pt-32 pb-0 flex flex-col items-center justify-start',
        className
      )}
    >
      {/* Background radial glow accents with brand purple/pink gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[550px] rounded-full bg-gradient-to-tr from-[#FA93FA]/12 via-[#C967E8]/10 to-[#983AD6]/5 blur-[140px] -z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[#983AD6]/8 blur-[120px] -z-0"
      />

      {/* Hero Text Content Container (z-20 above video) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[rgba(28,27,36,0.15)] backdrop-blur-md border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all duration-200">
            {/* Zap Icon inside gradient-filled box with glow effect */}
            <div className="w-5 h-5 rounded-[5px] bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] p-[2px] flex items-center justify-center shadow-[0_0_12px_rgba(201,103,232,0.7)] shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            {/* Text: Used by founders. Loved by devs. in light grey */}
            <span className="text-xs sm:text-sm font-medium text-zinc-300 tracking-wide select-none">
              Used by founders. Loved by devs.
            </span>
          </div>
        </motion.div>

        {/* Main Headline (H1): Responsive 48px to 80px */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="text-[48px] sm:text-[62px] md:text-[72px] lg:text-[80px] font-bold tracking-tight leading-[1.05] text-center max-w-4xl mx-auto"
        >
          <span className="block bg-gradient-to-r from-white via-white/95 to-[#FA93FA] bg-clip-text text-transparent">
            Your Vision
          </span>
          <span className="block bg-gradient-to-r from-white via-[#F3D5FF] to-[#C967E8] bg-clip-text text-transparent">
            Our Digital Reality.
          </span>
        </motion.h1>

        {/* Subheadline: text-white/80 */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed text-pretty text-center"
        >
          We turn bold ideas into modern designs that don't just look amazing,
          they grow your business fast.
        </motion.p>

        {/* CTA Button with outer glass wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 sm:mt-10 mb-6"
        >
          {/* Outer border wrapper with a glass effect */}
          <div className="inline-block p-1 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_0_30px_rgba(201,103,232,0.18)] hover:shadow-[0_0_42px_rgba(201,103,232,0.32)] transition-all duration-300">
            {/* Rounded full button with white background and black text */}
            <button
              onClick={onBookCall}
              type="button"
              className="group relative inline-flex items-center gap-3.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-zinc-100 active:scale-[0.98] transition-all duration-160 cursor-pointer shadow-sm"
            >
              <span>Book a 15-min call</span>
              {/* Circle icon with an arrow inside, styled with the primary purple gradient */}
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FA93FA] via-[#C967E8] to-[#983AD6] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(152,58,214,0.45)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Video Container (z-10 below z-20 text, -mt-[150px] negative top margin) */}
      <div className="relative z-10 w-full -mt-[150px] pointer-events-none select-none">
        {/* Native video tag with HLS / MP4 fallback, 100% width, auto height, edge-to-edge */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto mix-blend-screen block"
        />

        {/* Gradient fade overlay: from-[#010101] via-transparent to-[#010101] */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#010101] via-transparent to-[#010101]" />
      </div>

      {/* Logo Cloud Section (Animated), placed immediately below the video */}
      <div className="relative z-20 w-full bg-black/20 backdrop-blur-sm border-t border-white/5 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Desktop Left / Mobile Top: "Powering the best teams" text */}
            <div className="flex items-center justify-center md:justify-start shrink-0">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold whitespace-nowrap">
                Powering the best teams
              </span>
            </div>

            {/* Vertical divider on desktop */}
            <div
              aria-hidden="true"
              className="hidden md:block w-px h-8 bg-white/10 shrink-0"
            />

            {/* Animated logo slider on the right */}
            <div className="flex-1 overflow-hidden min-w-0">
              <InfiniteSlider gap={56} duration={26} className="py-1">
                {CUSTOMER_LOGOS.map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    className="flex items-center justify-center shrink-0 px-2 group"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={cn(
                        'h-7 sm:h-8 w-auto max-w-[130px] object-contain brightness-0 invert opacity-65 group-hover:opacity-100 transition-opacity duration-200 select-none',
                        logo.width
                      )}
                      loading="lazy"
                      onError={(e) => {
                        // In case external CDN fails, fallback to local cached SVG
                        const target = e.currentTarget;
                        const filename = logo.name.toLowerCase().replace(/\s+/g, '') + '.svg';
                        if (!target.src.includes('/assets/customers/')) {
                          target.src = `/assets/customers/${filename}`;
                        }
                      }}
                    />
                  </div>
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
