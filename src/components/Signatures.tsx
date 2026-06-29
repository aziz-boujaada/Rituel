import { useRef, useCallback, useState, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = memo(({ images, altPrefix }: { images: string[]; altPrefix: string }) => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', duration: 35 }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      emblaApi.plugins().autoplay?.reset();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden w-full h-full relative group" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
             <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={src} 
              alt={`${altPrefix} — photo ${index + 1}`} 
              className="w-full h-full object-cover select-none"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
            />
          </div>
        ))}
      </div>
      
      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent transition-opacity duration-700 pointer-events-none" />
      
      {/* Elegant Side Navigation Arrows on Hover */}
      <div className="absolute inset-x-4 md:inset-x-6 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
        <button 
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/90 border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer pointer-events-auto duration-500 ease-out"
          aria-label="Image précédente"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        <button 
          onClick={scrollNext}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/90 border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer pointer-events-auto duration-500 ease-out"
          aria-label="Image suivante"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Very subtle lines for indicator instead of big dots */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
        <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
          {images.map((_, idx) => (
             <button
                key={idx}
                aria-label={`Aller à l'image ${idx + 1}`}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-[2px] rounded-full transition-all duration-500 ${idx === selectedIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/70 w-3'}`}
             />
          ))}
        </div>
      </div>
    </div>
  );
});

const SignatureBlock = ({ images, subtitle, title, desc1, desc2, quote, reverse }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax effect on the container moving relative to scroll
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center w-full max-w-[1400px] mx-auto px-4 md:px-12 my-24 md:my-40 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Carousel Container */}
      <div className="w-full md:w-2/3 h-[60vh] md:h-[80vh] relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl z-10 group bg-stone-100 dark:bg-[#111]">
        <motion.div 
          style={{ y, scale: 1.1 }} 
          className="absolute inset-0 w-full h-full"
        >
          <ImageCarousel images={images} altPrefix={subtitle} />
        </motion.div>
      </div>

      {/* Glassmorphism Text Card Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`w-[92%] md:w-[45%] relative z-20 -mt-24 md:mt-0 ${reverse ? 'md:-mr-24' : 'md:-ml-24'} bg-white/85 dark:bg-[#0a0a0a]/85 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-8 md:p-14 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-2xl md:rounded-3xl hover:-translate-y-2 transition-transform duration-500`}
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-t-3xl opacity-80" />
        
        <h4 className="text-gold-500 tracking-[0.25em] uppercase text-xs font-bold mb-4">{subtitle}</h4>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 leading-tight">{title}</h2>
        
        <div className="w-12 h-px bg-gold-500/50 mb-8" />

        <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-base mb-4">
          {desc1}
        </p>
        {desc2 && (
          <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-base mb-8">
            {desc2}
          </p>
        )}
        
        {quote && (
          <div className="pl-6 border-l-2 border-gold-500/60 mt-4">
            <p className="text-gray-800 dark:text-gray-200 font-serif italic text-lg md:text-xl leading-relaxed">
              "{quote}"
            </p>
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default function Signatures() {
  const imagesEspace = [
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018865/LOC2_omkfty.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018865/LOC1_irmeam.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018866/LOC5_fnuoib.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018866/LOC7_x6wrhm.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018868/LOC4_qtjdbr.webp"
  ];

  const imagesPlats = [
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018182/ESP1_cfwipp.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018181/ESP3_cp6tjz.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018182/ESP4_d7xlvy.webp",
    "https://res.cloudinary.com/dqhuqkeq2/image/upload/v1777018182/ESP2_i0h2zu.webp"
  ];

  return (
    <section className="bg-gray-50/50 dark:bg-[#050505] transition-colors duration-500 overflow-hidden relative border-t border-gray-100 dark:border-white/5 py-10">
      
      {/* Background Typography Watermark - Dark Mode Only */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none hidden dark:flex opacity-[0.02] justify-center" aria-hidden="true">
        <span className="font-serif text-[28vw] leading-none whitespace-nowrap text-black dark:text-white block">RITUEL</span>
      </div>

      <SignatureBlock 
        images={imagesEspace}
        subtitle="L'Espace"
        title="Un Cadre Sublime"
        desc1="Plongez dans l'univers Rituel. Une atmosphère soigneusement étudiée pour vous offrir une parenthèse enchantée au cœur d'Agadir."
        desc2="Chaque espace a été imaginé pour allier confort absolu et design intemporel. De l'éclairage feutré à l'agencement luxueux, tout est conçu pour le plaisir des sens."
        quote="Éveillez vos sens dans un lieu où le temps et l'espace s'harmonisent."
        reverse={false}
      />

      <SignatureBlock 
        images={imagesPlats}
        subtitle="Savoir-Faire"
        title="L'Art Culinaire"
        desc1="Notre carte est le fruit d'une recherche constante d'excellence. Des produits de premier choix pour une cuisine généreuse, raffinée et internationale."
        desc2="Laissez notre chef vous surprendre avec des créations audacieuses qui respectent l'âme et la tradition des terroirs mondiaux."
        quote="L'art de la cuisine, partagé avec passion et savouré avec gourmandise."
        reverse={true}
      />

    </section>
  );
}
