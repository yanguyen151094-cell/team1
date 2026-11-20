import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SiteHeader from '@/components/feature/SiteHeader';
import LiveChatWidget from '@/components/feature/LiveChatWidget';
import Hero from '@/pages/home/components/Hero';
import Features from '@/pages/home/components/Features';
import Countries from '@/pages/home/components/Countries';
import Process from '@/pages/home/components/Process';
import Testimonials from '@/pages/home/components/Testimonials';
import FAQ from '@/pages/home/components/FAQ';
import Footer from '@/pages/home/components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const timer = window.setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] font-body">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Countries />
        <Process />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <LiveChatWidget />
    </div>
  );
}