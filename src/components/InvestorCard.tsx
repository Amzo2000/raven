import { Briefcase, Target, Euro } from 'lucide-react';
import { Investor } from '../types';

interface InvestorCardProps {
  key?: string | number;
  investor: Investor;
}

export default function InvestorCard({ investor }: InvestorCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-xl">
            {investor.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900">{investor.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Euro className="w-4 h-4 mr-1" />
              <span>{investor.investmentRange}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-5">{investor.bio}</p>
        
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <Target className="w-3 h-3 mr-1" /> Secteurs
          </h4>
          <div className="flex flex-wrap gap-2">
            {investor.focus.map((sector, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
          Contacter &rarr;
        </button>
      </div>
    </div>
  );
}
