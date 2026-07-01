import { HelmetProvider } from 'react-helmet-async';
import { useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
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
import SplashScreen from './components/SplashScreen';

const SPLASH_EXIT_DURATION_MS = 300;
const SPLASH_MAX_VISIBLE_MS = 1000;

type SplashPhase = 'hidden' | 'visible' | 'exiting';

export default function App() {
  const { scrollYProgress } = useScroll();
  const [splashPhase, setSplashPhase] = useState<SplashPhase>(() => {
    if (typeof window === 'undefined') {
      return 'hidden';
    }
    return document.readyState === 'complete' ? 'hidden' : 'visible';
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth < 768;
  });

  // Handle splash lifecycle
  useEffect(() => {
    if (splashPhase === 'hidden') {
      return;
    }

    if (document.readyState === 'complete') {
      setSplashPhase('exiting');
      return;
    }

    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      setSplashPhase('exiting');
    };

    const handleLoad = () => {
      finish();
    };

    window.addEventListener('load', handleLoad, { once: true });
    const timeoutId = window.setTimeout(finish, SPLASH_MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.clearTimeout(timeoutId);
    };
  }, [splashPhase]);

  // Handle splash exit
  useEffect(() => {
    if (splashPhase !== 'exiting') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSplashPhase('hidden');
    }, SPLASH_EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [splashPhase]);

  // Handle mobile detection with throttle
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Handle scroll progress bar
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${latest})`;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <HelmetProvider>
      {splashPhase !== 'hidden' && <SplashScreen isExiting={splashPhase === 'exiting'} isMobile={isMobile} />}
      <SEO />
      <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans selection:bg-gold-500 selection:text-white dark:selection:text-black transition-colors duration-500">
        <div
          id="scroll-progress"
          className="fixed top-0 left-0 right-0 h-1 bg-gold-500 origin-left z-[100] shadow-[0_0_10px_rgba(212,175,55,0.7)] will-change-transform"
          style={{ transform: 'scaleX(0)' }}
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
