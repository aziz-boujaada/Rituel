import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const TripadvisorIcon = () => (
   <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" className="shrink-0" fill="#34E0A1">
     <path d="M23.16 8.55h-4.3c-.3-.93-1.01-1.64-1.93-1.99l2.76-4.72a.7.7 0 00-.23-.97.7.7 0 00-.97.23L15.34 6.55H8.67l-3.14-5.45a.7.7 0 00-.97-.23.7.7 0 00-.23.97l2.72 4.72a3.02 3.02 0 00-1.9.14c-.67.33-1.2.86-1.54 1.53H.84a.8.8 0 000 1.6h2.15C2.6 11.23 3.65 14.65 6.4 16.51c1.23.83 2.72 1.25 4.24 1.25H12h1.36c1.52 0 3.01-.42 4.24-1.25 2.75-1.86 3.8-5.28 3.41-6.66h2.15a.8.8 0 000-1.6zm-10.87.1l.36 1.83-1.12-1.48H9.84l1.29-.69v-1.1h1.49v1.1l1.29.69h-1.62zM3.48 9.35c.17-1.16.89-2.07 1.96-2.5.9-.36 1.94-.3 2.8.18.96.53 1.63 1.51 1.76 2.59H3.48zm5.17 6.17a5.55 5.55 0 01-5-3.08h10.02a5.55 5.55 0 01-5 3.08zm8.79-.1l-1.97.86a6.83 6.83 0 00-1.46-2.04 5.92 5.92 0 00-6.1-.88 6.89 6.89 0 00-2 1.41c2.14 2 5.43 2.81 8.35 1.5.39.24.8.44 1.23.6v-.01l-.05-.04c.06-.63.26-1.25.56-1.8.86-1.61 2.55-2.61 4.38-2.61 2.37 0 4.41 1.62 4.96 3.9h-8v-2.4l1.12 1.48h1.69l-1.29.69v1.1h-1.49v-1.1l-1.29-.69h1.62V15.34z" />
   </svg>
);

const reviews = [
  {
    name: "Sophie M.",
    platform: "tripadvisor",
    date: "Il y a 2 semaines",
    text: "Goûteux et visuel agréable de l'assiette. Cuisine soignée, portions généreuses. C'est l'un des meilleurs rapport qualité prix de tout Agadir ! Je recommande.",
    rating: 5,
  },
  {
    name: "A. Karim",
    platform: "google",
    date: "Il y a 1 mois",
    text: "Superbe adresse ! Un cadre magnifique, un personnel aux petits soins, et les plats sont divins. Le risotto aux gambas est juste parfait.",
    rating: 5,
  },
  {
    name: "Nathalie D.",
    platform: "google",
    date: "Il y a 3 semaines",
    text: "Top pour un goûter ensoleillé ou un repas le soir. Portions généreuses et très bon service. L'ambiance ajoute un vrai charme à cet endroit.",
    rating: 5,
  },
  {
    name: "Jean-Pierre L.",
    platform: "tripadvisor",
    date: "Il y a 2 mois",
    text: "A l'unanimité : Royale cantine !!! Restaurant très propre, produits de qualité. On recommande vivement la poêlée de la mer.",
    rating: 5,
  },
  {
    name: "Mohamed R.",
    platform: "google",
    date: "Il y a 1 mois",
    text: "Une vraie découverte. Le filet de bœuf était tendre et excellemment bien accompagné. Le rapport qualité prix est indéniable.",
    rating: 5,
  },
  {
    name: "Yasmine B.",
    platform: "tripadvisor",
    date: "Il y a quelques jours",
    text: "Superbe expérience ! La nouvelle décoration est somptueuse. On se sent comme dans un cocon. Service rapide et avec le sourire. On reviendra !",
    rating: 5,
  }
];

export default function Reviews() {
  return (
    <section id="reviews" aria-label="Avis clients" className="py-24 bg-[#0a0a0a] transition-colors duration-500 overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 bg-[#fcfaf5] dark:bg-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-widest leading-tight">
              L'Expérience<br/><span className="text-gold-500 italic lowercase tracking-normal">Rituel</span>
            </h2>
            <div className="w-16 h-px bg-gold-500" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3 flex flex-col items-start md:items-end"
          >
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-[300px] md:text-right mb-4">
              Ce que disent nos clients
            </p>
            <div className="flex gap-4 items-center">
              <a href="https://www.tripadvisor.fr/Restaurant_Review-g293731-d8870764-Reviews-Rituels-Agadir_Souss_Massa.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-white/20 rounded-full hover:border-[#34E0A1] transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-md">
                <TripadvisorIcon />
                <span className="font-sans text-xs font-semibold text-gray-700 dark:text-gray-300">Tripadvisor</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-white/20 rounded-full hover:border-[#4285F4] transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-md">
                <GoogleIcon />
                <span className="font-sans text-xs font-semibold text-gray-700 dark:text-gray-300">Google Maps</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white/80 dark:bg-zinc-900/40 p-8 rounded-2xl border border-gray-200/60 dark:border-white/5 hover:border-gold-500/40 transition-all duration-300 shadow-xl shadow-black/5 dark:shadow-none hover:-translate-y-1 flex flex-col group backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1" role="img" aria-label={`${review.rating} étoiles sur 5`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold-500 text-gold-500" aria-hidden="true" />
                  ))}
                </div>
                {review.platform === 'google' ? <GoogleIcon /> : <TripadvisorIcon />}
              </div>
              
              <p className="font-sans text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed text-sm md:text-base flex-1">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-black flex items-center justify-center text-gold-600 dark:text-gold-400 font-serif font-bold text-lg border border-gray-200 dark:border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.05)] group-hover:bg-gold-500 group-hover:text-white group-hover:border-transparent transition-colors">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-gray-900 dark:text-white leading-tight font-medium">{review.name}</h3>
                  <p className="font-sans text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                    Avis {review.platform} • {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
