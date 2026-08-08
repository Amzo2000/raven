import { motion } from 'motion/react';
import { ArrowLeft, Building2, ExternalLink, Globe, Linkedin, MapPin, Twitter, Target, Briefcase, Euro, CheckCircle2, LayoutGrid, Users, User } from 'lucide-react';
import { Investor } from '../../types';

interface InvestorDetailViewProps {
  investor: Investor;
  onBack: () => void;
}

export default function InvestorDetailView({ investor, onBack }: InvestorDetailViewProps) {
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-white dark:bg-[#111111] z-50 overflow-y-auto"
    >
      {/* Cover Header */}
      <div className="relative h-48 sm:h-64 md:h-72 w-full bg-gray-200 dark:bg-gray-800">
        {investor.coverUrl ? (
          <img src={investor.coverUrl} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#3F6B4A]/20 to-[#6FC97F]/20"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-sm z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 -mt-16 sm:-mt-24">
          
          {/* Left Column - Profile Summary */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start relative z-10">
            <div className={`w-32 h-32 sm:w-40 sm:h-40 shadow-xl ring-4 ring-white dark:ring-[#111111] bg-white dark:bg-gray-800 flex items-center justify-center text-[#3F6B4A] dark:text-[#9BDBA8] font-bold text-4xl overflow-hidden mb-6 ${isCompany ? 'rounded-xl' : 'rounded-full'}`}>
              {investor.avatarUrl ? (
                <img src={investor.avatarUrl} alt={investor.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(investor.name)
              )}
            </div>
            
            <div className="w-full bg-white dark:bg-[#151515] rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">{investor.name}</h1>
                {investor.verified && (
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-800/50 text-[11px] font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1.5 ">
                  {isCompany ? (
                    <><Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Fonds / Entreprise</>
                  ) : (
                    <><User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Particulier</>
                  )}
                </span>
              </div>
              
              {investor.subtitle && (
                <p className="text-[14.5px] text-gray-600 dark:text-gray-400 font-medium mb-6">{investor.subtitle}</p>
              )}

              <button className="w-full font-medium text-[13.5px] px-4 py-3 rounded-xl bg-[#3F6B4A] dark:bg-[#6FC97F] text-white dark:text-gray-900 hover:bg-[#2C4E35] dark:hover:bg-[#5CB56C] transition-all flex items-center justify-center gap-1.5 shadow-sm mb-8">
                Proposer un dossier (Pitch)
              </button>

              <div className="w-full space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                {investor.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">Localisation</div>
                      <div className="text-[13.5px] font-medium text-gray-900 dark:text-gray-200">{investor.location}</div>
                    </div>
                  </div>
                )}
                {investor.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">Site web</div>
                      <a href={`https://${investor.website}`} target="_blank" rel="noopener noreferrer" className="text-[13.5px] font-medium text-[#3F6B4A] dark:text-[#6FC97F] hover:underline flex items-center gap-1">
                        {investor.website} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {(investor.socialLinks?.linkedin || investor.socialLinks?.twitter) && (
                <div className="w-full flex justify-center md:justify-start gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                  {investor.socialLinks?.linkedin && (
                    <a href={`https://linkedin.com/in/${investor.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {investor.socialLinks?.twitter && (
                    <a href={`https://twitter.com/${investor.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-2/3 flex flex-col gap-8 pt-8 md:pt-16">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 pb-8 border-b border-gray-100 dark:border-gray-800">
              <div className="bg-gray-50/80 dark:bg-gray-800/40 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5"><Euro className="w-3.5 h-3.5" /> Ticket Moy.</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{investor.avgTicket || investor.investmentRange}</span>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-800/40 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Déployé</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{investor.totalInvested || 'N/C'}</span>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-800/40 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Portfolio</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{investor.portfolioCount || 0} Deals</span>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-800/40 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5" /> Stades</span>
                <div className="flex flex-wrap gap-1">
                  {(investor.stages || ['Seed']).map((s, i) => (
                    <span key={i} className="text-[12px] font-medium text-gray-900 dark:text-gray-200">{s}{i < (investor.stages?.length || 1) - 1 ? ',' : ''}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* About Section */}
            <section className="pt-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-4">À propos</h2>
              <p className="text-[14.5px] text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {investor.about || investor.bio}
              </p>
              
              <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                <h3 className="font-semibold text-[13.5px] text-gray-900 dark:text-white mb-3">Secteurs privilégiés</h3>
                <div className="flex flex-wrap items-center gap-2 text-[13.5px]">
                  {investor.focus.map((sector, index) => (
                    <span 
                      key={index}
                      className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2"
                    >
                      {sector}
                      {index < investor.focus.length - 1 && (
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Fund Team (if applicable) */}
            {investor.team && investor.team.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" /> Équipe d'investissement
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {investor.team.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800/50 last:border-0 group">
                      <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover bg-gray-100 dark:bg-gray-800" />
                      <div>
                        <h4 className="font-semibold text-[14px] text-gray-900 dark:text-white">{member.name}</h4>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">{member.role}</p>
                      </div>
                      {member.linkedin && (
                        <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#3F6B4A] hover:bg-[#3F6B4A]/10 transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Portfolio Highlights */}
            {investor.portfolio && investor.portfolio.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" /> Portfolio
                  </h2>
                  <span className="text-[13px] font-medium text-[#3F6B4A] dark:text-[#6FC97F] cursor-pointer hover:underline">
                    Voir les {investor.portfolioCount} investissements
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {investor.portfolio.map((startup, idx) => (
                    <div key={idx} className="py-4 border-b border-gray-100 dark:border-gray-800/50 group flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800/50 overflow-hidden mb-4 p-0.5">
                        <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <h4 className="font-bold text-[15px] text-gray-900 dark:text-white mb-1">{startup.name}</h4>
                      <p className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-3">{startup.industry}</p>
                      
                      {startup.url && (
                        <a href={`https://${startup.url}`} target="_blank" rel="noopener noreferrer" className="mt-auto text-[12.5px] font-medium text-gray-500 group-hover:text-[#3F6B4A] flex items-center gap-1 transition-colors">
                          Visiter le site <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
}
