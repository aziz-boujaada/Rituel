import { useState, useEffect, useMemo } from 'react';
import heroDay from '@/assets/DayImages/hero.JPG';
import conceptDay from '@/assets/DayImages/concept.JPG';
import espaceDay from '@/assets/DayImages/espace.JPG';

const dayImagesMap: Record<string, string> = {
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018368/PAGE_DE_GARDE_zeqcbp.jpg": heroDay,
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018507/Page_secondaire_uy6crg.jpg": conceptDay,
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018865/LOC2_omkfty.webp": espaceDay,
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018865/LOC1_irmeam.webp": espaceDay,
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018866/LOC5_fnuoib.webp": espaceDay,
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018866/LOC7_x6wrhm.webp": espaceDay,
  "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018868/LOC4_qtjdbr.webp": espaceDay
};

export function useThemeImage(originalSrc: string) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true; // Default to dark as per original logic
  });

  useEffect(() => {
    // Observe class changes on the HTML element for theme toggling
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

  return useMemo(() => {
    if (!isDark && dayImagesMap[originalSrc]) {
      return dayImagesMap[originalSrc];
    }
    return originalSrc;
  }, [isDark, originalSrc]);
}

export function useThemeImages(originalSrcs: string[]) {
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

  return useMemo(() => {
    return originalSrcs.map(src => (!isDark && dayImagesMap[src] ? dayImagesMap[src] : src));
  }, [isDark, originalSrcs]);
}
