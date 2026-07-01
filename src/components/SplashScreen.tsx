import { motion, useReducedMotion } from 'motion/react';
import { useThemeLogo } from '../hooks/useThemeLogo';

interface SplashScreenProps {
  isExiting: boolean;
  isMobile: boolean;
}

export default function SplashScreen({ isExiting, isMobile }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const logoSrc = useThemeLogo();

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex min-h-[100dvh] items-center justify-center bg-white dark:bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: prefersReducedMotion || isExiting ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ willChange: 'opacity' }}
      aria-hidden="true"
      onAnimationComplete={() => isExiting && !prefersReducedMotion}
    >
      <div className={`flex flex-col items-center justify-center px-6 text-center ${isMobile ? 'gap-4' : 'gap-5'}`}>
        <motion.img
          src={logoSrc}
          alt=""
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: prefersReducedMotion ? 1 : 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          className={`w-auto object-contain will-change-transform ${isMobile ? 'h-16' : 'h-20 sm:h-24 md:h-28'}`}
          width={160}
          height={160}
        />

        <motion.div
          className={`h-px bg-gold-500 origin-left will-change-transform ${isMobile ? 'w-16' : 'w-20 sm:w-24'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: prefersReducedMotion ? 1 : 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}