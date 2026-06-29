import { Instagram, Facebook, Phone } from 'lucide-react';
import { Link } from 'react-scroll';
import logo from '@/assets/logoR.png';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black pt-20 pb-10 border-t border-gray-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <img 
            src={logo}
            alt="Rituel Agadir Logo" 
            className="h-20 mb-6 rounded-md opacity-90 shadow-sm dark:shadow-none"
            loading="lazy"
            decoding="async"
            width={80}
            height={80}
          />
          <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
            L'excellence culinaire et l'élégance d'un lounge luxueux au cœur d'Agadir.
          </p>
        </div>

        {/* Liens Rapides */}
        <div className="col-span-1 hidden md:block">
          <h5 className="text-gray-900 dark:text-white font-serif text-lg mb-6 tracking-wider">Navigation</h5>
          <ul className="space-y-3">
            {['Accueil', 'Concept', 'Menu', 'Galerie', 'Contact'].map((item, idx) => (
              <li key={idx}>
                <Link 
                  to={item.toLowerCase() === 'accueil' ? 'home' : item.toLowerCase() === 'contact' ? 'location' : item.toLowerCase()} 
                  smooth={true} 
                  className="text-gray-600 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-500 cursor-pointer font-sans text-sm tracking-wide transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1 text-center md:text-left">
          <h5 className="text-gray-900 dark:text-white font-serif text-lg mb-6 tracking-wider">Réservation & Contact</h5>
          <ul className="space-y-4">
            <li>
              <a href="https://wa.me/212672374080" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400 hover:text-gold-500 transition-colors">
                <Phone size={18} />
                <span className="font-sans text-sm tracking-wide">+212 6 72 37 40 80</span>
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400">
              <span className="text-gold-500 text-xs uppercase tracking-widest border border-gold-500/50 px-2 py-1 rounded-sm">WhatsApp</span>
            </li>
          </ul>
        </div>

        {/* Réseaux Sociaux */}
        <div className="col-span-1 text-center md:text-left">
          <h5 className="text-gray-900 dark:text-white font-serif text-lg mb-6 tracking-wider">Suivez-nous</h5>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a 
              href="https://www.instagram.com/rituelagadir/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Suivre Rituel Agadir sur Instagram"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-gold-500 hover:text-gold-500 dark:hover:border-gold-500 dark:hover:text-gold-500 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://web.facebook.com/rituelagadir/?locale=fr_FR&_rdc=1&_rdr#" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Suivre Rituel Agadir sur Facebook"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-gold-500 hover:text-gold-500 dark:hover:border-gold-500 dark:hover:text-gold-500 transition-colors"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center pt-8 border-t border-gray-200 dark:border-white/10">
        <p className="text-gray-500 text-xs font-sans tracking-wide text-center">
          © {new Date().getFullYear()} Rituel Restaurant & Lounge. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
