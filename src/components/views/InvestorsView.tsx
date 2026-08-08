import { useState } from 'react';
import { motion } from 'motion/react';
import { investors } from '../../data';
import InvestorCard from '../InvestorCard';
import { Filter, Search, Users, Building2, Grid } from 'lucide-react';
import { Investor } from '../../types';

const CATEGORIES = [
  { id: 'tous', label: 'Tous', icon: Grid },
  { id: 'particulier', label: 'Particuliers', icon: Users },
  { id: 'entreprise_fonds', label: 'Entreprises & Fonds', icon: Building2 },
];

interface InvestorsViewProps {
  onInvestorClick?: (investor: Investor) => void;
}

export default function InvestorsView({ onInvestorClick }: InvestorsViewProps) {
  const [activeCategory, setActiveCategory] = useState('tous');

  const filteredInvestors = investors.filter(investor => {
    return activeCategory === 'tous' || investor.type === activeCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 self-start md:self-auto shrink-0">Investisseurs</h1>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#151515] hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3F6B4A] transition-colors">
            <Filter className="h-4 w-4 sm:mr-2 text-gray-500 dark:text-gray-400" />
            <span className="hidden sm:inline">Filtres</span>
          </button>
        </div>
      </div>

      <div className="flex sm:justify-center border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-6 px-1">
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 pb-3 text-[12.5px] font-mono font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${
                activeCategory === id 
                  ? 'text-[#3F6B4A] dark:text-[#6FC97F]' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {activeCategory === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3F6B4A] dark:bg-[#6FC97F]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredInvestors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredInvestors.map((investor, index) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onInvestorClick && onInvestorClick(investor)}
              className="cursor-pointer"
            >
              <InvestorCard investor={investor} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#151515] rounded-xl ring-1 ring-gray-900/5 dark:ring-white/10 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucun investisseur trouvé</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Nous n'avons pas trouvé d'investisseur correspondant à vos critères de recherche. Essayez de modifier vos filtres.
          </p>
          <button 
            onClick={() => setActiveCategory('tous')}
            className="mt-6 font-medium text-[13px] px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Réinitialiser la recherche
          </button>
        </div>
      )}
    </motion.div>
  );
}
