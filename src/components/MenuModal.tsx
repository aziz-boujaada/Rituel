import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: Record<string, any[]>;
}

export default function MenuModal({ isOpen, onClose, menuData }: MenuModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  const getCategoryData = (catNames: string[]) => {
    return catNames.map(cat => ({ category: cat, items: menuData[cat] || [] })).filter(c => c.items.length > 0);
  };

  const pages = [
    { type: 'cover', title: 'La Carte' },
    { type: 'multi', blocks: getCategoryData(['Entrées Froides', 'Entrées Chaudes']) },
    { type: 'multi', blocks: getCategoryData(['Les Poêlées', 'Pizzas & Calzones']) },
    { type: 'multi', blocks: getCategoryData(['Pâtes & Lasagnes', 'Risottos']) },
    { type: 'multi', blocks: getCategoryData(['Poissons', 'Viandes & Volailles']) },
    { type: 'multi', blocks: getCategoryData(['Desserts & Enfants', 'Boissons & Smoothies']) },
    { type: 'back', title: 'Fin' }
  ];
  
  // Pad if needed for desktop (must be even length so we always show 2 pages)
  if (!isMobile && pages.length % 2 !== 0) {
    pages.push({ type: 'empty' , title:''   });
  }

  const handleNext = () => {
    setDirection(1);
    setCurrentPage(prev => {
      const step = isMobile ? 1 : 2;
      return Math.min(prev + step, pages.length - step);
    });
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage(prev => {
      const step = isMobile ? 1 : 2;
      return Math.max(prev - step, 0);
    });
  };

  if (!isOpen) return null;

  const variants: Variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 60 : -60,
      z: -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      rotateY: 0,
      z: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 120, damping: 20 }
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 60 : -60,
      z: -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    })
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm no-print transition-all duration-300 flex items-center justify-center p-0 md:p-8"
        onClick={onClose}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-[80]"
        >
          <X size={24} />
        </button>

        {/* Outer Wrapper for positioning nav buttons */}
        <div 
          className="relative w-full max-w-5xl flex items-center justify-center"
          onClick={e => e.stopPropagation()}
          style={{ perspective: "2000px" }}
        >
          
          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`fixed bottom-6 left-6 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:-left-20 z-[90] p-3 md:p-4 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-gold-500/30 text-gold-500 shadow-2xl backdrop-blur-md transition-all ${
              currentPage === 0 ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 hover:scale-110 hover:bg-white dark:hover:bg-zinc-800'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Book Container with perspective */}
          <div className="relative w-full h-[100dvh] md:h-[85vh] flex flex-col md:flex-row perspective-1000">
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: "preserve-3d" }}
                className="flex w-full h-full bg-[#fcfaf5] dark:bg-[#0a0a0a] md:rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border-y md:border border-gold-500/20 transition-colors"
                >
                {isMobile ? (
                   <BookPage page={pages[currentPage]} pageNumber={currentPage + 1} isLeft={true} />
                ) : (
                  <>
                   <BookPage page={pages[currentPage]} pageNumber={currentPage + 1} isLeft={true} />
                   {/* Spine simulation */}
                   <div className="w-1 md:w-3 bg-black/10 dark:bg-black/60 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] z-20"></div>
                   <BookPage page={pages[currentPage + 1]} pageNumber={currentPage + 2} isLeft={false} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            disabled={currentPage >= pages.length - (isMobile ? 1 : 2)}
            className={`fixed bottom-6 right-6 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:-right-20 z-[90] p-3 md:p-4 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-gold-500/30 text-gold-500 shadow-2xl backdrop-blur-md transition-all ${
              currentPage >= pages.length - (isMobile ? 1 : 2) ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 hover:scale-110 hover:bg-white dark:hover:bg-zinc-800'
            }`}
          >
            <ChevronRight size={28} />
          </button>

        </div>
      </div>
    </>
  );
}

const BookPage = ({ page, pageNumber, isLeft }: { page: any, pageNumber: number, isLeft: boolean }) => {
  if (!page || page.type === 'empty') return (
     <div className={`flex-1 h-full bg-[#fcfaf5] dark:bg-[#0f0f0f] relative ${isLeft ? 'md:border-r border-gray-200 dark:border-white/5 md:shadow-[inset_-12px_0_20px_-12px_rgba(0,0,0,0.1)] dark:md:shadow-[inset_-12px_0_20px_-12px_rgba(0,0,0,0.8)]' : 'md:shadow-[inset_12px_0_20px_-12px_rgba(0,0,0,0.1)] dark:md:shadow-[inset_12px_0_20px_-12px_rgba(0,0,0,0.8)]'}`} />
  );

  return (
    <div className={`flex-1 h-full pt-16 md:pt-14 pb-0 flex flex-col relative bg-[#fcfaf5] dark:bg-[#0f0f0f]
      ${isLeft ? 'md:border-r md:border-gray-300 dark:border-white/5 md:shadow-[inset_-12px_0_20px_-12px_rgba(0,0,0,0.1)] dark:md:shadow-[inset_-12px_0_20px_-12px_rgba(0,0,0,0.8)]' : 'md:shadow-[inset_12px_0_20px_-12px_rgba(0,0,0,0.1)] dark:md:shadow-[inset_12px_0_20px_-12px_rgba(0,0,0,0.8)]'}`}
    >
      <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10 w-full h-full pb-28 md:pb-16 px-6 md:px-14">
        {page.type === 'cover' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
             <img 
               src="https://res.cloudinary.com/dqhuqkeq2/image/upload/v1773743350/305767663_487947273340174_727780467991398628_n_s5d6rs.jpg" 
               alt="Rituel Logo" 
               className="w-32 md:w-48 mx-auto mb-10 rounded-lg shadow-sm opacity-90 dark:opacity-100 mix-blend-multiply dark:mix-blend-normal"
               loading="lazy"
               decoding="async"
               width={192}
               height={192}
             />
             <h1 className="font-serif text-4xl md:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-widest">{page.title}</h1>
             <div className="w-16 md:w-24 h-px bg-gold-500 mx-auto" />
          </div>
        )}
        
        {page.type === 'multi' && (
          <div className="h-full pt-2">
            {page.blocks.map((block: any, bIdx: number) => (
              <div key={bIdx} className="mb-5 md:mb-6 last:mb-0">
                <h3 className="font-serif text-center md:text-left text-[17px] md:text-xl text-gold-500 mb-3 md:mb-4 uppercase tracking-widest border-b border-gold-500/20 pb-1.5">{block.category}</h3>
                <div className="space-y-2.5">
                  {block.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-serif text-[13.5px] md:text-[15px] font-medium text-gray-900 dark:text-white leading-tight">{item.name}</span>
                        <div className="flex-1 mx-2 md:mx-3 border-b border-dotted border-gray-300 dark:border-white/20 relative -top-1" />
                        <span className="font-sans text-[13px] md:text-[14px] text-gold-600 dark:text-gold-400 font-semibold shrink-0 whitespace-nowrap">{item.price} Dhs</span>
                      </div>
                      {item.desc && (
                         <span className="text-[10.5px] md:text-[11.5px] font-sans text-gray-500 dark:text-gray-400 italic leading-[1.2] w-full pr-2 overflow-hidden">{item.desc}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {page.type === 'back' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
             <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-2 uppercase tracking-widest text-center mt-[-40px]">Rituel Agadir</h2>
             <p className="font-sans text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-10">Restaurant & Lounge</p>
             
             <button 
               onClick={() => window.print()}
               className="flex items-center gap-3 px-6 py-3 border border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400 uppercase tracking-widest text-xs font-semibold rounded hover:bg-gold-500 hover:text-white dark:hover:text-black transition-all shadow-lg"
             >
               <Download size={16} />
               Télécharger PDF
             </button>
          </div>
        )}
      </div>

      {/* Background Page Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04] z-0" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }} />

      {/* Page Number */}
      {page.type !== 'cover' && page.type !== 'back' && page.type !== 'empty' && (
        <div className={`absolute bottom-6 font-serif text-sm text-gold-600/70 dark:text-gold-600/50 left-1/2 -translate-x-1/2 md:translate-x-0 ${isLeft ? 'md:left-14 md:right-auto' : 'md:right-14 md:left-auto'}`}>
          — {pageNumber} —
        </div>
      )}
    </div>
  );
};
