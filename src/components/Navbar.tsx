import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useThemeLogo } from '../hooks/useThemeLogo';
const navItems = [
  { name: 'Accueil', to: 'home' },
  { name: 'Concept', to: 'about' },
  { name: 'Menu', to: 'menu' },
  { name: 'Contact', to: 'location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoSrc = useThemeLogo();

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-4 shadow-lg dark:shadow-none border-b border-gray-100 dark:border-transparent' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            to="home"
            smooth={true}
            duration={800}
            className="cursor-pointer"
          >
            <img 
              src={logoSrc}
              alt="Rituel Agadir Logo" 
              loading='lazy'
              className="h-12 w-auto md:h-20 md:w-36 object-contain rounded-lg shadow-sm dark:shadow-none transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth={true}
                duration={800}
                className={`text-sm tracking-[0.15em] uppercase cursor-pointer transition-colors ${scrolled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-300'} hover:text-gold-500`}
                activeClass="!text-gold-500 font-medium"
                spy={true}
              >
                {item.name}
              </Link>
            ))}
            
            <ThemeToggle />

            <a
              href="https://wa.me/212672374080?text=Bonjour,%20je%20souhaite%20r%C3%A9server%20chez%20Rituel%20Agadir."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white dark:hover:text-black transition-all duration-300 uppercase tracking-widest text-xs rounded-sm ml-2"
            >
              Réserver
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="text-gold-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col gap-8 items-center" aria-label="Menu mobile">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={800}
                  className="text-2xl tracking-[0.2em] uppercase text-black dark:text-white hover:text-gold-500 cursor-pointer transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://wa.me/212672374080?text=Bonjour,%20je%20souhaite%20r%C3%A9server%20chez%20Rituel%20Agadir."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 px-8 py-3 bg-gold-500 text-white dark:text-black uppercase tracking-widest text-sm rounded-sm font-semibold"
              >
                Réserver
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
