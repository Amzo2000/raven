import { motion } from 'motion/react';
import { Briefcase, Euro, MapPin, ExternalLink, User, Building2, CheckCircle2 } from 'lucide-react';
import { Investor } from '../types';

interface InvestorCardProps {
  key?: string | number;
  investor: Investor;
}

export default function InvestorCard({ investor }: InvestorCardProps) {
  const isCompany = investor.type === 'entreprise_fonds';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white dark:bg-[#151515] rounded-xl ring-1 ring-gray-900/5 dark:ring-white/5 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#3F6B4A]/30 dark:hover:border-[#6FC97F]/30 group flex flex-col h-full"
    >
      {/* Cover Image */}
      <div className="h-28 w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
        {investor.coverUrl ? (
          <img src={investor.coverUrl} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#3F6B4A]/20 to-[#6FC97F]/20"></div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-black/90 backdrop-blur-sm text-[11px] font-medium flex items-center gap-1.5 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
            {isCompany ? (
              <><Building2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> <span className="text-gray-800 dark:text-gray-200">Entreprise / Fonds</span></>
            ) : (
              <><User className="w-3 h-3 text-blue-600 dark:text-blue-400" /> <span className="text-gray-800 dark:text-gray-200">Particulier</span></>
            )}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col relative pt-0">
        {/* Avatar/Logo */}
        <div className="flex justify-between items-end mb-4 -mt-8 relative z-10">
          <div className={`w-16 h-16 shadow-sm border-[1.5px] border-white dark:border-[#151515] bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-[#3F6B4A] dark:text-[#9BDBA8] font-bold text-xl overflow-hidden ${isCompany ? 'rounded-xl' : 'rounded-full'}`}>
            {investor.avatarUrl ? (
               <img src={investor.avatarUrl} alt={investor.name} className="w-full h-full object-cover" />
            ) : (
              getInitials(investor.name)
            )}
          </div>
          {investor.website && (
            <a href={`https://${investor.website}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-white/10 flex items-center justify-center text-gray-500 hover:text-[#3F6B4A] dark:hover:text-[#6FC97F] transition-colors" title="Visiter le site web">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white leading-tight truncate">{investor.name}</h3>
            {investor.verified && (
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            )}
          </div>
          {investor.subtitle && (
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{investor.subtitle}</p>
          )}
        </div>
        
        <p className="text-[13.5px] text-gray-700 dark:text-gray-300 mt-4 line-clamp-3 leading-relaxed flex-1">
          {investor.bio}
        </p>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {investor.totalInvested && (
            <div className="bg-gray-50 dark:bg-[#111111]/50 rounded-lg p-2.5 ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-1">Investi</span>
              <span className="text-[13px] font-semibold text-gray-900 dark:text-white">{investor.totalInvested}</span>
            </div>
          )}
          {investor.portfolioCount && (
            <div className="bg-gray-50 dark:bg-[#111111]/50 rounded-lg p-2.5 ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-1">Deals</span>
              <span className="text-[13px] font-semibold text-gray-900 dark:text-white">{investor.portfolioCount} deals</span>
            </div>
          )}
          {investor.avgTicket && (
            <div className="bg-gray-50 dark:bg-[#111111]/50 rounded-lg p-2.5 ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-1">Ticket moy.</span>
              <span className="text-[13px] font-semibold text-[#3F6B4A] dark:text-[#6FC97F]">{investor.avgTicket}</span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/60">
          <div className="flex flex-wrap gap-1.5">
            {investor.focus.map((sector, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-1 rounded-md text-[11.5px] font-medium bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/5 dark:ring-white/10 lowercase"
              >
                {sector}
              </span>
            ))}
            {investor.location && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[11.5px] font-medium bg-gray-50 dark:bg-gray-800/50 text-gray-500 ring-1 ring-gray-900/5 dark:ring-white/10 ml-auto">
                <MapPin className="w-3 h-3 mr-1" /> {investor.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-[#111111]/50 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <span className="text-[12px] font-medium text-gray-500">
          {isCompany ? 'Fonds' : 'Business Angel'}
        </span>
        <button className="text-[13px] font-medium text-[#3F6B4A] dark:text-[#6FC97F] hover:text-[#2C4E35] dark:hover:text-[#5CB56C] transition-colors">
          Voir le profil &rarr;
        </button>
      </div>
    </motion.div>
  );
}
