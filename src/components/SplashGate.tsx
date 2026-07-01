import { useEffect, useState, type ReactNode } from 'react';
import SplashScreen from './SplashScreen';

const SPLASH_EXIT_DURATION_MS = 3000;
const SPLASH_MAX_VISIBLE_MS = 8000;

type SplashPhase = 'hidden' | 'visible' | 'exiting';

interface SplashGateProps {
  children: ReactNode;
}

export default function SplashGate({ children }: SplashGateProps) {
  const [phase, setPhase] = useState<SplashPhase>(() => {
    if (typeof window === 'undefined') {
      return 'hidden';
    }

    return document.readyState === 'complete' ? 'hidden' : 'visible';
  });

  useEffect(() => {
    if (phase === 'hidden') {
      return;
    }

    if (document.readyState === 'complete') {
      setPhase('exiting');
      return;
    }

    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      setPhase('exiting');
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
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exiting') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase('hidden');
    }, SPLASH_EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  return (
    <>
      {children}
      {phase !== 'hidden' && <SplashScreen isExiting={phase === 'exiting'} />}
    </>
  );
}