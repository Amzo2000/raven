import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Globe, MapPin, Search } from 'lucide-react';
import { Startup } from '../../types';

interface StartupDetailViewProps {
  startup: Startup;
  onBack: () => void;
}

export default function StartupDetailView({ startup, onBack }: StartupDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'apercu' | 'equipe' | 'investisseurs'>('apercu');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">{startup.name}</h1>
          <p className="text-gray-500 mt-1">{startup.metrics?.find(m => m.label === 'Création')?.value || '2023'} · {startup.industry} · {startup.stage || startup.metrics?.find(m => m.label === 'Stade')?.value || 'Amorçage'}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-full hover:bg-indigo-100 transition-colors">
            Contacter
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors">
            Site web
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-8 space-x-8 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('apercu')}
          className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
            activeTab === 'apercu' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Aperçu
          {activeTab === 'apercu' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('equipe')}
          className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
            activeTab === 'equipe' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          L'équipe
          {activeTab === 'equipe' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('investisseurs')}
          className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
            activeTab === 'investisseurs' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Espace Investisseurs
          {activeTab === 'investisseurs' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
          )}
        </button>
      </div>

      {activeTab === 'apercu' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row gap-3 md:h-[400px]">
              <div className="flex-1 rounded-sm overflow-hidden relative group cursor-pointer bg-gray-100 h-64 md:h-full">
                <img 
                  src={startup.logoUrl || "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1600"} 
                  alt={startup.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-row md:flex-col gap-3 md:w-1/3">
                {(startup.images || [startup.logoUrl, startup.logoUrl]).slice(0, 2).map((img, idx) => (
                  <div key={idx} className="flex-1 bg-gray-100 rounded-sm overflow-hidden relative group cursor-pointer min-h-[120px]">
                    <img 
                      src={img || "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800"} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{startup.tagline}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{startup.description}</p>
            </div>

            {startup.team && startup.team.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Membres clés</h3>
                  <button onClick={() => setActiveTab('equipe')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    Voir toute l'équipe <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                  </button>
                </div>
                <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
                  {startup.team.slice(0, 4).map(member => (
                    <div key={member.id} className="flex-shrink-0 w-32 flex flex-col items-center">
                      <img src={member.avatarUrl} alt={member.name} className="w-20 h-20 rounded-sm object-cover mb-3 bg-gray-100" />
                      <span className="font-medium text-gray-900 text-center text-sm">{member.name}</span>
                      <span className="text-gray-500 text-xs text-center">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">À propos</h3>
              <p className="text-gray-600 text-sm mb-6">
                {startup.description}
              </p>

              <div className="space-y-4">
                {startup.metrics ? startup.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-500 text-sm">{metric.label}</span>
                    <span className="text-gray-900 font-medium">{metric.value}</span>
                  </div>
                )) : (
                  <>
                    <div className="flex flex-col border-b border-gray-100 pb-3">
                      <span className="text-gray-500 text-sm">Objectif de financement</span>
                      <span className="text-gray-900 font-medium">{startup.fundingGoal.toLocaleString()} €</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-100 pb-3">
                      <span className="text-gray-500 text-sm">Fonds levés</span>
                      <span className="text-gray-900 font-medium">{startup.raised.toLocaleString()} €</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'equipe' ? (
        <div className="space-y-12">
          {['cofounder', 'associate', 'employee', 'partner'].map((type) => {
            const members = startup.team?.filter(m => m.type === type) || [];
            if (members.length === 0) return null;
            
            const titles: Record<string, string> = {
              cofounder: 'Cofondateurs',
              associate: 'Associés',
              employee: 'Salariés & Équipe',
              partner: 'Partenaires'
            };

            return (
              <div key={type}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{titles[type]}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map(member => (
                    <div key={member.id} className="flex flex-col items-center text-center cursor-pointer group">
                      <img src={member.avatarUrl} alt={member.name} className="w-20 h-20 rounded-sm object-cover mb-4 bg-gray-100 group-hover:scale-105 transition-transform" />
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {(!startup.team || startup.team.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              L'équipe n'a pas encore été ajoutée pour ce projet.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-12 max-w-4xl">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Les chiffres de la Levée de Fonds</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border-y border-gray-200">
              <div className="py-4 sm:py-6 sm:pr-6">
                <span className="text-gray-500 text-sm block mb-1">Objectif de la levée actuelle</span>
                <span className="text-gray-900 font-bold text-xl">{startup.fundingGoal.toLocaleString()} €</span>
              </div>
              <div className="py-4 sm:py-6 sm:px-6">
                <span className="text-gray-500 text-sm block mb-1">Montants déjà levés</span>
                <span className="text-gray-900 font-bold text-xl">{startup.raised.toLocaleString()} €</span>
              </div>
              <div className="py-4 sm:py-6 sm:pl-6">
                <span className="text-gray-500 text-sm block mb-1">Capital Social</span>
                <span className="text-gray-900 font-bold text-xl">{startup.investorData?.capitalSocial || 'Non communiqué'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Les chiffres de la Traction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border-y border-gray-200">
              <div className="py-4 sm:py-6 sm:pr-6">
                <span className="text-gray-500 text-sm block mb-1">Volume d'utilisateurs/clients</span>
                <span className="text-gray-900 font-bold text-xl">{startup.investorData?.users || 'Non communiqué'}</span>
              </div>
              <div className="py-4 sm:py-6 sm:px-6">
                <span className="text-gray-500 text-sm block mb-1">Taux de croissance</span>
                <span className="text-emerald-600 font-bold text-xl">{startup.investorData?.growthRate || 'Non communiqué'}</span>
              </div>
              <div className="py-4 sm:py-6 sm:pl-6">
                <span className="text-gray-500 text-sm block mb-1">Chiffre d'Affaires</span>
                <span className="text-gray-900 font-bold text-xl">{startup.investorData?.revenue || 'Non communiqué'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Les chiffres de l'Équipe et du Marché</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border-y border-gray-200">
              <div className="py-4 sm:py-6 sm:pr-6">
                <span className="text-gray-500 text-sm block mb-1">Taille de l'équipe</span>
                <span className="text-gray-900 font-bold text-xl">{startup.investorData?.teamSize || 'Non communiqué'}</span>
              </div>
              <div className="py-4 sm:py-6 sm:pl-6">
                <span className="text-gray-500 text-sm block mb-1">Taille du marché visé (TAM)</span>
                <span className="text-gray-900 font-bold text-xl">{startup.investorData?.marketSize || 'Non communiqué'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
