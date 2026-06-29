import { motion } from 'motion/react';
import { Link } from 'react-scroll';
import { useThemeImage } from '../hooks/useThemeImage';
import logo from '@/assets/logoR.png';

export default function Hero() {
  const imgSrc = useThemeImage("https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018368/PAGE_DE_GARDE_zeqcbp.jpg");

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
        <link rel="preload" as="image" href={imgSrc} fetchPriority="high" />
        <img
          src={imgSrc}
          alt="Rituel Agadir Hero"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={1920}
          height={1080}
        />
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold mb-4 leading-tight text-white drop-shadow-md"
        >
          Rituel Agadir <br/>
          <span className="text-gold-500 italic font-light text-3xl md:text-5xl drop-shadow-lg">L'art de la cuisine</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-gray-200 font-sans tracking-wide mb-10 max-w-2xl mx-auto text-sm md:text-base drop-shadow-md"
        >
          Découvrez une cuisine d'exception dans un cadre élégant au cœur d'Agadir. 
          L'alliance parfaite entre tradition et modernité.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
        >
          <Link
            to="menu"
            smooth={true}
            duration={800}
            className="cursor-pointer px-8 py-3 bg-gold-500 text-white dark:text-black uppercase tracking-widest text-sm font-semibold rounded-sm hover:bg-gold-400 transition-colors shadow-lg"
          >
            Voir le menu
          </Link>
          <a
            href="https://wa.me/212672374080?text=Bonjour,%20je%20souhaite%20r%C3%A9server%20chez%20Rituel%20Agadir."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-black/40 backdrop-blur-sm border border-gray-300 dark:border-gray-400 text-white uppercase tracking-widest text-sm font-semibold rounded-sm hover:border-gold-500 hover:text-gold-500 transition-colors shadow-lg"
          >
            Réserver
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Link to="about" smooth={true} duration={800} className="cursor-pointer text-white/50 hover:text-gold-500 transition-colors" aria-label="Faire défiler vers la section Concept">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
