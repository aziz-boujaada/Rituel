import { motion, useReducedMotion } from 'motion/react';
import { useThemeLogo } from '../hooks/useThemeLogo';

interface SplashScreenProps {
  isExiting: boolean;
}

export default function SplashScreen({ isExiting }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const logoSrc = useThemeLogo();

  const logoAnimation = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: isExiting ? 0 : 1, scale: isExiting ? 1 : 1 };

  const lineAnimation = prefersReducedMotion
    ? { opacity: 1, scaleX: 1 }
    : { opacity: isExiting ? 0 : 1, scaleX: isExiting ? 1 : 1 };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex min-h-[100dvh] items-center justify-center bg-white dark:bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
      style={{ willChange: 'opacity' }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center gap-5 px-6 text-center">
        <motion.img
          src={logoSrc}
          alt=""
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          animate={logoAnimation}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          className="h-20 w-auto sm:h-24 md:h-28 object-contain will-change-transform"
          width={160}
          height={160}
        />

        <motion.div
          className="h-px w-20 sm:w-24 bg-gold-500 origin-left will-change-transform"
          initial={prefersReducedMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          animate={lineAnimation}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}