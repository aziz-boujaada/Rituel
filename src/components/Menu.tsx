import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText } from 'lucide-react';
import MenuModal from './MenuModal';

const menuData = {
  "Entrées Froides": [
    { name: "Salade quinoa au guacamole", price: "60", desc: "Quinoa, poivron mixte, oignon, guacamole" },
    { name: "Salade RITUEL", price: "70", desc: "Crudités, cœur de palmier, crevettes, maïs, thon, ananas, œufs de caille" },
    { name: "Salade César à l'avocat", price: "60", desc: "Poulet mariné grillé, croûtons, parmesan, avocat, tomate confite" },
    { name: "Salade César aux gambas", price: "65", desc: "Gambas panées, croûtons, parmesan, tomate confite, sauce césar" },
    { name: "Salade fruits de mer", price: "75", desc: "Poulpe, calamars, crevettes, moules, gambas, avocat, maïs, ananas" },
    { name: "Salade avocat crevettes", price: "65", desc: "Crevettes, avocat, sauce cocktail" },
    { name: "Tartare mango salmone", price: "70", desc: "Saumon, mangue, avocat" },
    { name: "Carpaccio de poisson blanc", price: "60", desc: "Sauce pesto" },
    { name: "Carpaccio de poulpe cuit", price: "60", desc: "Sauce vinaigrette" },
    { name: "Vitello tonnato", price: "60", desc: "" },
    { name: "Assortiment de huitres", price: "80", desc: "6 pièces" }
  ],
  "Entrées Chaudes": [
    { name: "Crème de légumes", price: "45", desc: "" },
    { name: "Velouté de volaille", price: "55", desc: "Au fromage" },
    { name: "Soupe de la mer royal", price: "70", desc: "" },
    { name: "Millefeuilles d'aubergines", price: "50", desc: "" },
    { name: "Gratin fruits de mer", price: "80", desc: "" },
    { name: "Huitres gratinées", price: "100", desc: "6 pièces" },
    { name: "Crostini au chèvre & miel", price: "60", desc: "Noix toastées" }
  ],
  "Les Poêlées": [
    { name: "Poêlée de la mer", price: "85", desc: "" },
    { name: "Poêlée de gambas", price: "75", desc: "À l’ail" },
    { name: "Poêlée de crevettes pilpil", price: "75", desc: "" },
    { name: "Poêlée de poulpe", price: "75", desc: "À la pignata, saveurs méditerranéennes" },
    { name: "Poêlée de moules", price: "75", desc: "À la crème d’ail" },
    { name: "Poêlée de calamars", price: "90", desc: "Sauce armoricaine douce et crémeuse" }
  ],
  "Risottos": [
    { name: "Risotto gamberi e zucchini", price: "90", desc: "" },
    { name: "Risotto au saumon", price: "100", desc: "" },
    { name: "Risotto de la mer", price: "100", desc: "" },
    { name: "Risotto carbonara", price: "80", desc: "" },
    { name: "Risotto au poulet", price: "90", desc: "Sauce au choix : Roquefort, champignons..." },
    { name: "Risotto truffe noire", price: "90", desc: "À la crème de truffe noire" }
  ],
  "Pizzas & Calzones": [
    { name: "Margherita", price: "50", desc: "Sauce tomate, mozzarella, basilic" },
    { name: "Al tonno", price: "70", desc: "Thon, oignons, olives noires" },
    { name: "Norvégienne", price: "85", desc: "Sauce blanche, saumon, mozzarella" },
    { name: "Fruits de mer", "price": "85", desc: "Calamars, crevettes, thon, mozzarella" },
    { name: "Basquaise", price: "75", desc: "Poulet, champignons, poivrons marinés" },
    { name: "Portofino", price: "75", desc: "Viande hachée, poivrons, champignons" },
    { name: "Quatre fromages", price: "80", desc: "Fromage bleu, emmental, parmesan" },
    { name: "Quatre saisons", price: "80", desc: "Poulet, thon, viande hachée, jambon" },
    { name: "Végétariana", price: "65", desc: "Aubergines, courgettes, champignons, olives" },
    { name: "Regina", "price": "75", desc: "Sauce blanche, jambon, champignons" },
    { name: "Calzone Chicken", price: "65", desc: "Sauce blanche, poulet, champignons" },
    { name: "Calzone Viande hachée", price: "65", desc: "Sauce tomate, champignons, poivrons" }
  ],
  "Pâtes & Lasagnes": [
    { name: "Lasagnes bolognaises", price: "80", desc: "" },
    { name: "Lasagnes saumon & épinards", price: "100", desc: "" },
    { name: "Lasagnes fruits de mer", price: "100", desc: "" },
    { name: "Pomodoro", price: "50", desc: "Sauce tomate, tomates cerises, parmesan" },
    { name: "Alla Norma", price: "65", desc: "Aubergines, tomates, ricotta, basilic" },
    { name: "Primavera", price: "70", desc: "Aubergines, courgettes, champignons, poivrons" },
    { name: "Bolognaise", price: "75", desc: "Sauce bolognaise, parmesan, basilic" },
    { name: "Gamba al Pesto", price: "80", desc: "Gambas, crème de pesto, parmesan" },
    { name: "Quattro fromaggi", price: "80", desc: "Fromage bleu, parmesan, edam, emmental" },
    { name: "Alla Carbonara", price: "80", desc: "Bacon de bœuf, parmesan" },
    { name: "Alfredo", price: "80", desc: "Poulet, champignons, sauce alfredo" },
    { name: "Frutti di Mare", price: "90", desc: "Calamars, crevettes, moules" },
    { name: "Al salmone", price: "95", desc: "Saumon, sauce blanche, parmesan" }
  ],
  "Poissons": [
    { name: "Saint-Pierre meunière", price: "100", desc: "À la crème de citronnelle" },
    { name: "Filet Saint-Pierre grillé", price: "115", desc: "Sauce normande aux crevettes" },
    { name: "Saint-Pierre à la provençale", price: "100", desc: "" },
    { name: "Saumon à la crème", price: "150", desc: "Ail, épinards et champignons" },
    { name: "Saumon grillé", price: "150", desc: "Sauce crème à l’aneth" },
    { name: "Brochette d’espadon", price: "135", desc: "Aux herbes de l’Atlas" },
    { name: "Loup de mer bonne femme", price: "150", desc: "" },
    { name: "Filet de loup bar", price: "150", desc: "Aux agrumes" },
    { name: "Calamar farcis", price: "140", desc: "" },
    { name: "Sole meunière", price: "150", desc: "" },
    { name: "Paupiette de sole", price: "150", desc: "Farci à la mousse de crevettes" },
    { name: "Filet de daurade", price: "150", desc: "À la crème safranée" },
    { name: "Marmite de poissons", price: "170", desc: "Sauce américaine" }
  ],
  "Viandes & Volailles": [
    { name: "Filet de boeuf mignon", price: "160", desc: "En croûte, sauce béarnaise" },
    { name: "Souris d’agneau braisée", price: "150", desc: "" },
    { name: "Brochette filet de bœuf", price: "140", desc: "Marinée à la marocaine" },
    { name: "Émincé de filet de bœuf", price: "140", desc: "Sauce au choix" },
    { name: "Entrecôte grillée", price: "150", desc: "Sauce au choix" },
    { name: "Magret de canard", price: "150", desc: "À l’orange" },
    { name: "Roulade de poulet", price: "110", desc: "Sauce safranée" },
    { name: "Brochette de poulet", price: "90", desc: "Citron et coriandre" },
    { name: "Poulet parmigiana", price: "95", desc: "Garni" },
    { name: "Cordon bleu", price: "100", desc: "" },
    { name: "Couscous bœuf (Vendredi)", price: "75", desc: "Légumes et tfaia" },
    { name: "Couscous poulet (Vendredi)", price: "65", desc: "Légumes et tfaia" }
  ],
  "Desserts & Enfants": [
    { name: "Menu Enfant", price: "60", desc: "Pizza/Pâtes/Nuggets + Jus + Glace" },
    { name: "Fondant chocolat", price: "40", desc: "Servi avec boule de glace vanille" },
    { name: "Fondant pistache", price: "45", desc: "Servi avec boule de glace vanille" },
    { name: "Tiramisu café", price: "45", desc: "Servi avec boule de glace vanille" },
    { name: "Saint Sébastien brûlé", price: "50", desc: "Servi avec chocolat au lait" },
    { name: "Crème brulée safran", price: "40", desc: "Au pistil de safran" },
    { name: "Boule de glace", price: "15", desc: "Parfum au choix" },
    { name: "Salade de fruits", price: "35", desc: "À la fleur d'oranger" }
  ],
  "Boissons & Smoothies": [
    { name: "Jus d'orange / pomme / banane", price: "25", desc: "" },
    { name: "Jus spéciaux au choix", price: "30", desc: "Kiwi, ananas, mangue, fraise, avocat..." },
    { name: "Bahamas", price: "40", desc: "Mangue, ananas, papaye, framboise, orange" },
    { name: "Mango banana", price: "40", desc: "Mangue, banane, ananas, orange" },
    { name: "Green Booster", price: "40", desc: "Avocat, kiwi, banane, epinard, orange" },
    { name: "Detox fraicheur", price: "35", desc: "Ananas, concombre, citron, menthe, orange" },
    { name: "Green power detox", price: "40", desc: "Ananas, épinards, citron, gingembre, pomme, orange" },
    { name: "Red vitality detox", "price": "40", desc: "Betterave, pomme, ananas, citron, gingembre, orange" }
  ]
};

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(Object.keys(menuData)[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="menu" className="py-24 md:py-32 bg-white dark:bg-[#050505] transition-colors duration-500 relative border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h4 className="text-gold-500 tracking-[0.2em] uppercase text-xs font-semibold mb-4">Notre Carte</h4>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">Le Menu Rituel</h2>
          <div className="w-16 h-px bg-gold-500/50 mx-auto mb-8" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
            Explorez notre sélection exquise de plats élaborés avec passion. 
            Pour découvrir l'intégralité de nos propositions, incluant nos pizzas, jus frais et créations spéciales,
            nous vous invitons à consulter notre carte complète.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.keys(menuData).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'border-gold-500 bg-gold-500 text-white dark:text-black font-semibold shadow-md' 
                  : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gold-500/50 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
            >
              {menuData[activeCategory as keyof typeof menuData].map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-100 dark:border-white/5 pb-4 group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif text-xl tracking-wide text-gray-900 dark:text-white group-hover:text-gold-500 transition-colors">{item.name}</h3>
                    <div className="flex-1 mx-4 border-b border-dashed border-gray-300 dark:border-white/10 relative -top-1" />
                    <span className="font-sans text-gold-500 font-semibold">{item.price} Dhs</span>
                  </div>
                  {item.desc && (
                    <p className="text-gray-500 text-sm italic font-light font-sans">{item.desc}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Menu */}
        <div className="mt-20 flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black uppercase tracking-widest text-sm font-semibold rounded-sm hover:bg-black dark:hover:bg-gray-200 shadow-md transition-colors"
          >
            <FileText size={18} />
            Consulter le menu complet
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 border border-gold-500 bg-gold-50 dark:bg-gold-500/10 text-gold-600 dark:text-gold-500 uppercase tracking-widest text-sm font-semibold rounded-sm hover:bg-gold-500 hover:text-white dark:hover:text-black shadow-none hover:shadow-md transition-all"
          >
            <Download size={18} />
            Télécharger (PDF)
          </button>
        </div>

      </div>

      <MenuModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        menuData={menuData}
      />
    </section>
  );
}
