import { useState, useEffect, useMemo } from 'react';
import logoDark from '@/assets/logoR.png';

// logoLight is in /public and served at base URL
const logoLightPath = `${import.meta.env.BASE_URL}logoLight.webp`;

/**
 * Returns the correct logo source based on the current theme.
 * - Dark mode → logoR.png (bundled asset)
 * - Light mode → logoLight.webp (public asset)
 */
export function useThemeLogo() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return useMemo(() => (isDark ? logoDark : logoLightPath), [isDark]);
}
