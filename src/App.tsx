import { HelmetProvider } from 'react-helmet-async';
import { motion, useScroll } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Signatures from './components/Signatures';
import MenuSection from './components/Menu';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <HelmetProvider>
      <SEO />
      <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans selection:bg-gold-500 selection:text-white dark:selection:text-black transition-colors duration-500">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gold-500 origin-left z-[100] shadow-[0_0_10px_rgba(212,175,55,0.7)]"
          style={{ scaleX: scrollYProgress }}
        />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Signatures />
          <MenuSection />
          <Reviews />
          <Location />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
}
