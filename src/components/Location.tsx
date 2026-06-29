import { MapPin } from 'lucide-react';

export default function Location() {
  return (
    <section id="location" className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 relative border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 items-center">
        
        <div className="flex-1 space-y-8">
          <div>
            <h4 className="text-gold-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">Emplacement</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">Venez nous rendre visite à Agadir</h2>
          </div>
          
          <div className="w-12 h-px bg-gold-500/50" />
          
          <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300">
            <MapPin className="text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-sans text-lg font-medium text-gray-900 dark:text-white mb-1">Rituel Restaurant & Lounge</p>
              <p className="font-sans leading-relaxed">Agadir, Maroc</p>
              <p className="font-sans text-sm text-gray-500 mt-2 italic">L'adresse de référence pour vos dîners chics et soirées mémorables.</p>
            </div>
          </div>

          <div className="pt-8">
            <a 
              href="https://www.google.com/maps/place/Rituel/@30.4225445,-9.600412,1115m/data=!3m1!1e3!4m6!3m5!1s0xdb3b6f274e377fd:0x849e8616b315b541!8m2!3d30.4225401!4d-9.6004168!16s%2Fg%2F11bw74h12h?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-white dark:text-black uppercase tracking-widest text-sm font-semibold rounded-sm hover:bg-gold-400 transition-colors shadow-md"
            >
              Voir sur Google Maps
            </a>
          </div>
        </div>

        <div className="flex-1 w-full h-[500px] relative rounded-sm overflow-hidden border border-gray-200 dark:border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1115.0!2d-9.600412!3d30.4225445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6f274e377fd%3A0x849e8616b315b541!2sRituel!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte d'emplacement Rituel"
          />
          <div className="absolute inset-0 bg-gold-500/10 pointer-events-none transition-opacity duration-700 opacity-100 dark:hover:opacity-0 hover:opacity-0" />
        </div>

      </div>
    </section>
  );
}
