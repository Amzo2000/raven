import { useState } from 'react';
import { motion } from 'motion/react';
import { investors, startups, talents } from '../../data';
import StartupDetailView from './StartupDetailView';
import { Investor, Startup, Talent } from '../../types';
import { ChevronRight } from 'lucide-react';

interface WorkplaceViewProps {
  onInvestorClick?: (investor: Investor) => void;
  onTalentClick?: (talent: Talent) => void;
  onProfileClick?: (profile: any) => void;
  onViewChange?: (view: any) => void;
}

export default function WorkplaceView({ onInvestorClick, onTalentClick, onProfileClick, onViewChange }: WorkplaceViewProps) {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  const handleStartupSelect = (startup: Startup) => {
    setSavedScrollPosition(window.scrollY);
    setSelectedStartup(startup);
  };

  const handleBack = () => {
    setSelectedStartup(null);
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition, behavior: 'instant' });
    }, 0);
  };

  if (selectedStartup) {
    return <StartupDetailView startup={selectedStartup} onBack={handleBack} onProfileClick={onProfileClick} onInvestorClick={onInvestorClick} />;
  }

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
    >
      <div className="mb-10 mt-2 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Workplace</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-[14px] sm:text-[15px] max-w-2xl leading-relaxed">
            Gérez vos startups, vos talents et vos relations investisseurs depuis votre espace de travail centralisé.
          </p>
        </div>
        <button 
          onClick={() => onViewChange && onViewChange('statistics')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-[13.5px] font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm self-start"
        >
          Voir les statistiques &rarr;
        </button>
      </div>

      <div className="space-y-12">
        {/* Startups Section */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">Nos Startups</h2>
          </div>
          <div className="flex flex-col gap-3">
            {startups.slice(0, 5).map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleStartupSelect(startup)}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#151515] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] ring-1 ring-gray-900/5 dark:ring-white/5 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 ring-1 ring-gray-900/5 dark:ring-white/10">
                    {startup.logoUrl ? (
                      <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        {getInitials(startup.name)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">{startup.name}</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{startup.tagline}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 ml-4 flex-shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[12px] font-medium text-gray-900 dark:text-gray-200">{startup.industry}</span>
                    <span className="text-[11px] text-gray-500 uppercase tracking-wide mt-0.5">{startup.stage || 'En cours'}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] ring-1 ring-gray-900/5 dark:ring-white/10 flex items-center justify-center text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Employés Section */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">Nos Employés</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onTalentClick && onTalentClick(talent)}
                className={`bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-4.5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors ${onTalentClick ? 'cursor-pointer' : ''}`}
              >
                <div className="w-[42px] h-[42px] rounded-full bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-[14px] mb-3.5 overflow-hidden">
                  {talent.avatarUrl ? (
                    <img src={talent.avatarUrl} alt={talent.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(talent.name)
                  )}
                </div>
                <div className="font-semibold text-[14.5px] text-gray-900 dark:text-white">{talent.name}</div>
                <div className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5 mb-2.5">{talent.title}</div>
                <div className="text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {talent.bio}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Investors Section */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">Investisseurs</h2>
          </div>
          <div className="flex flex-col gap-3">
            {investors.map((investor, index) => {
              const isCompany = investor.type === 'entreprise_fonds';
              return (
                <motion.div
                  key={investor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onInvestorClick && onInvestorClick(investor)}
                  className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#151515] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] ring-1 ring-gray-900/5 dark:ring-white/5 transition-all duration-200 ${onInvestorClick ? 'cursor-pointer' : ''}`}
                >
                  <div className="flex items-center gap-4 min-w-0 mb-3 sm:mb-0">
                    <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 text-[#3F6B4A] dark:text-[#9BDBA8] font-medium text-sm overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10 ${isCompany ? 'rounded-xl' : 'rounded-full'}`}>
                      {investor.avatarUrl ? (
                         <img src={investor.avatarUrl} alt={investor.name} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full bg-gray-100 dark:bg-[#222] flex items-center justify-center">
                            {getInitials(investor.name)}
                         </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">{investor.name}</h3>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium uppercase tracking-wider bg-gray-100 dark:bg-[#222] text-gray-500">
                          {isCompany ? 'Fonds' : 'BA'}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{investor.subtitle || investor.investmentRange}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6 ml-16 sm:ml-4 overflow-x-auto hide-scrollbar sm:overflow-visible">
                    <div className="flex flex-col hidden sm:flex">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Secteurs</span>
                      <div className="flex gap-1.5">
                        {investor.focus.slice(0, 2).map((focus, idx) => (
                          <span key={idx} className="text-[12px] font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {focus}{idx < Math.min(investor.focus.length, 2) - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                    {investor.avgTicket && (
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Ticket moyen</span>
                        <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{investor.avgTicket}</span>
                      </div>
                    )}
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] ring-1 ring-gray-900/5 dark:ring-white/10 flex items-center justify-center text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-shrink-0 ml-auto sm:ml-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
