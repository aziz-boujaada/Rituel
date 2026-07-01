import { useRef, useCallback, useState, useEffect, memo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

const ImageCarousel = memo(({ images, altPrefix }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', duration: 30 }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex((prev) => (prev === index ? prev : index));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden w-full h-full relative group" ref={emblaRef}>
      <div className="flex h-full transform-gpu">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] min-w-0 relative h-full bg-stone-200 dark:bg-stone-900" key={src}>
             <img 
              src={src} 
              alt={`${altPrefix} — photo ${index + 1}`} 
              className="w-full h-full object-cover select-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-black/10 md:bg-transparent pointer-events-none" />
      
      <div className="absolute inset-x-4 md:inset-x-6 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
        <button 
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/90 border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer pointer-events-auto duration-300 ease-out"
          aria-label="Image précédente"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        <button 
          onClick={scrollNext}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/90 border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center text-white hover:text-black transition-all opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer pointer-events-auto duration-300 ease-out"
          aria-label="Image suivante"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
          {images.map((_, idx) => (
             <button
                key={idx}
                aria-label={`Aller à l'image ${idx + 1}`}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-[2px] rounded-full transition-all duration-300 ${idx === selectedIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/70 w-3'}`}
             />
          ))}
        </div>
      </div>
    </div>
  );
});

ImageCarousel.displayName = 'ImageCarousel';

interface SignatureBlockProps {
  images: string[];
  subtitle: string;
  title: string;
  desc1: string;
  desc2?: string;
  quote?: string;
  reverse?: boolean;
}

const SignatureBlock = ({ images, subtitle, title, desc1, desc2, quote, reverse = false }: SignatureBlockProps) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full max-w-[1400px] mx-auto px-4 md:px-12 my-20 md:my-32 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Carousel Container */}
      <div className="w-full md:w-2/3 h-[50vh] md:h-[75vh] relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl z-10 group bg-stone-100 dark:bg-[#111]">
        <div className="absolute inset-0 w-full h-full transform-gpu">
          <ImageCarousel images={images} altPrefix={subtitle} />
        </div>
      </div>

      {/* Glassmorphism Text Card Overlay */}
      <div 
        className={`w-[92%] md:w-[45%] relative z-20 -mt-20 md:mt-0 ${reverse ? 'md:-mr-20' : 'md:-ml-20'} bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-6 md:p-12 lg:p-14 shadow-xl rounded-2xl md:rounded-3xl transition-transform duration-300`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-3xl opacity-80" />
        
        <h4 className="text-amber-500 tracking-[0.25em] uppercase text-xs font-bold mb-3">{subtitle}</h4>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-5 leading-tight">{title}</h2>
        
        <div className="w-12 h-px bg-amber-500/50 mb-6" />

        <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-sm md:text-base mb-4">
          {desc1}
        </p>
        {desc2 && (
          <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-sm md:text-base mb-6">
            {desc2}
          </p>
        )}
        
        {quote && (
          <div className="pl-4 border-l-2 border-amber-500/60 mt-4">
            <p className="text-gray-800 dark:text-gray-200 font-serif italic text-base md:text-lg leading-relaxed">
              "{quote}"
            </p>
          </div>
        )}
      </div>

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
    "https://res.cloudinary.com/dawxg1ygh/image/upload/f_auto,q_auto/DSC08433_copie_vz9ufv.webp", 
    "https://res.cloudinary.com/dawxg1ygh/image/upload/f_auto,q_auto/DSC08361_copie_ijg9cr.webp", 
    "https://res.cloudinary.com/dawxg1ygh/image/upload/f_auto,q_auto/DSC08706_copie_xqkx35.webp", 
    "https://res.cloudinary.com/dawxg1ygh/image/upload/f_auto,q_auto/DSC08613_copie_lwyvcq.webp" 
  ];

  return (
    <section className="bg-gray-50/50 dark:bg-[#050505] transition-colors duration-300 overflow-hidden relative border-t border-gray-100 dark:border-white/5 py-6">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none hidden dark:flex opacity-[0.01] justify-center" aria-hidden="true">
        <span className="font-serif text-[26vw] leading-none whitespace-nowrap text-white block">RITUEL</span>
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