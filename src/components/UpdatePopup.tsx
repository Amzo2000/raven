import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

const CURRENT_UPDATE_ID = 'update-v1.5';
const UPDATE_POINTS = [
  "Bouton d'investissement ajouté dans la page détaillée des startups",
  "Visualisation en temps réel des personnes et entreprises ayant investi",
  "Toutes les valeurs financières ont été converties en devise MRU",
  "Améliorations générales de l'affichage dans l'espace investisseurs"
];

export default function UpdatePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('last_seen_update_id');
    if (storedId !== CURRENT_UPDATE_ID) {
      // Small delay so it doesn't pop up instantly on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('last_seen_update_id', CURRENT_UPDATE_ID);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Glass backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-[#3F6B4A]/30 dark:border-[#6FC97F]/30 shadow-2xl rounded-2xl p-6 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3F6B4A] to-[#6FC97F]"></div>
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DCE8DD] dark:bg-[#3F6B4A]/30 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 dark:text-white text-xl">Quoi de neuf ?</h3>
              </div>
              
              <div className="pt-1">
                <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-4">
                  Découvrez les dernières nouveautés de cette mise à jour :
                </p>
                
                <ul className="space-y-3 mb-6">
                  {UPDATE_POINTS.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-[14px] text-gray-700 dark:text-gray-300">
                      <span className="text-[#3F6B4A] dark:text-[#6FC97F] mt-1 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={handleClose}
                  className="font-medium text-[14.5px] px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all w-full shadow-sm"
                >
                  Continuer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
