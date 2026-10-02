import { useState } from 'react';
import { Navbar } from './Navbar';
import { ScrollIndicator } from './ScrollIndicator';
import { AboutSection } from './AboutSection';
import { ContentSection } from './ContentSection';
import { PortfolioSection } from './PortfolioSection';
import { ProcessSection } from './ProcessSection';
import { StudioSection } from './StudioSection';
import { InsightsSection } from './InsightsSection';
import { Footer } from './Footer';
import { DemoModal } from './DemoModal';
import { DesignSpecDrawer } from './DesignSpecDrawer';
import { ShieldCheck } from 'lucide-react';

export function EvvySecSite() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoPrefillEmail, setDemoPrefillEmail] = useState('');
  const [demoPrefillTier, setDemoPrefillTier] = useState('Cloud-Native Enterprise');
  const [specDrawerOpen, setSpecDrawerOpen] = useState(false);

  const handleOpenDemo = (prefillEmail?: string, tier?: string) => {
    if (prefillEmail !== undefined) setDemoPrefillEmail(prefillEmail);
    if (tier !== undefined) setDemoPrefillTier(tier);
    setDemoModalOpen(true);
  };

  return (
    <div
      className="relative min-h-screen bg-black text-white selection:bg-[#1676d1] selection:text-white"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      <ScrollIndicator
        onOpenDemo={() => handleOpenDemo()}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      <main>
        {/* Evvy Hero */}
        <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold mb-6">
            <ShieldCheck className="w-4 h-4" /> Next-Gen Cloud Infrastructure
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
            Zero-Trust Cloud Governance & Digital Architecture
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Securing mission-critical data platforms with automated compliance, threat isolation, and liquid glass interfaces.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => handleOpenDemo()}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
            >
              Request Enterprise Demo
            </button>
            <button
              onClick={() => setSpecDrawerOpen(true)}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all"
            >
              View Security Specs
            </button>
          </div>
        </section>

        <AboutSection onOpenDemo={handleOpenDemo} />
        <ContentSection onOpenDemo={handleOpenDemo} />
        <PortfolioSection onOpenDemo={handleOpenDemo} />
        <ProcessSection />
        <StudioSection />
        <InsightsSection onOpenDemo={handleOpenDemo} />
      </main>

      <Footer
        onOpenDemo={handleOpenDemo}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialEmail={demoPrefillEmail}
        initialTier={demoPrefillTier}
      />

      <DesignSpecDrawer
        isOpen={specDrawerOpen}
        onClose={() => setSpecDrawerOpen(false)}
      />
    </div>
  );
}

export default EvvySecSite;
