import { motion } from 'motion/react';
import { talents } from '../../data';
import TalentCard from '../TalentCard';
import { Filter, Search } from 'lucide-react';

export default function TalentsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Talents Qualifiés</h1>
          <p className="text-gray-600 max-w-2xl">
            Recrutez les meilleures compétences pour rejoindre votre équipe et concrétiser votre vision.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
              placeholder="Rechercher un talent..."
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            Filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {talents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </motion.div>
  );
}
