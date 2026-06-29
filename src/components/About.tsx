import { motion } from 'motion/react';
import { useThemeImage } from '../hooks/useThemeImage';

export default function About() {
  const imgSrc = useThemeImage("https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018507/Page_secondaire_uy6crg.jpg");

  return (
    <section id="about" className="py-24 md:py-32 bg-amber-50 dark:bg-[#0a0a0a] transition-colors duration-500 relative">
      {/* Subtle gold decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold-500/50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="relative">
            <div className="absolute -inset-4 border border-gold-500/20 translate-x-4 translate-y-4" />
            <img 
              src={imgSrc} 
              alt="Intérieur Rituel Agadir" 
              className="relative z-10 w-full h-[500px] object-cover filter brightness-90 contrast-125"
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div>
            <h4 className="text-gold-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">Notre Concept</h4>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-gray-900 dark:text-white">
              Plus qu'un repas,<br />
              <span className="italic text-gray-500 dark:text-gray-400 font-light">Une cérémonie des sens</span>
            </h2>
          </div>
          
          <div className="w-12 h-px bg-gold-500/50" />

          <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-sm md:text-base">
            Situé au cœur vibrant d'Agadir, <strong>Rituel</strong> redéfinit l'expérience lounge et gastronomique. 
            Pensé comme un sanctuaire d'élégance, notre établissement fusionne une esthétique contemporaine avec une chaleur enveloppante.
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-sm md:text-base">
            Chaque plat est une œuvre minutieuse, chaque cocktail une exploration. Nous avons imaginé ce lieu 
            pour les épicuriens en quête d'un cadre sophistiqué où le temps semble s'arrêter. Découvrez un service 
            sur mesure dans une atmosphère chic, vibrante et infiniment mémorable.
          </p>

          <div className="pt-4 flex gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-gold-500">Premium</span>
              <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">Cuisine</span>
            </div>
            <div className="w-px bg-gray-300 dark:bg-gray-800" />
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-gold-500">Lounge</span>
              <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">Ambiance</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
