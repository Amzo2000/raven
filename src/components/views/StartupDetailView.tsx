import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, Globe, MapPin, Search, Linkedin, Twitter, Users, Rocket, ArrowUpRight, LayoutDashboard, TrendingUp } from 'lucide-react';
import { Startup } from '../../types';

interface StartupDetailViewProps {
  startup: Startup;
  onBack: () => void;
  onProfileClick?: (profile: any) => void;
}

export default function StartupDetailView({ startup, onBack, onProfileClick }: StartupDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'apercu' | 'equipe' | 'investisseurs'>('apercu');
  const [activeFilter, setActiveFilter] = useState('all');
  const [composerTag, setComposerTag] = useState('produit');
  const [composerText, setComposerText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      tag: 'produit',
      author: 'Paul Bernard',
      authorInitials: 'PB',
      date: '12 juin 2026',
      title: 'Lancement du module de compensation automatisée',
      desc: "Les entreprises peuvent désormais compenser leurs émissions résiduelles directement depuis le tableau de bord, sans passer par un tiers.",
      visualType: 'svg-produit'
    },
    {
      id: 2,
      tag: 'traction',
      author: 'Alice Renard',
      authorInitials: 'AR',
      date: '2 mai 2026',
      title: 'Le cap des 140 clients actifs est franchi',
      desc: "Portée notamment par les PME industrielles, la base clients a doublé depuis septembre 2025. Merci à toutes les équipes qui utilisent EcoTrack au quotidien.",
      visualType: 'svg-traction'
    },
    {
      id: 3,
      tag: 'presse',
      author: 'Alice Renard',
      authorInitials: 'AR',
      date: '18 mars 2026',
      title: 'Partenariat avec la Fédération des PME industrielles',
      desc: "Un accord facilitant l'accès à la plateforme pour plus de 3 000 adhérents, avec un tarif préférentiel sur le premier bilan carbone."
    },
    {
      id: 4,
      tag: 'equipe',
      author: 'Hugo Dubois',
      authorInitials: 'HD',
      date: '14 novembre 2025',
      title: "Clôture du tour d'amorçage à 850 000 MRU",
      desc: "Une levée menée par Green Origin Capital pour accélérer le développement produit et doubler l'équipe technique d'ici fin 2026.",
      visualType: 'svg-equipe'
    }
  ]);

  const publishPost = () => {
    if (!composerText.trim()) return;
    const newPost = {
      id: Date.now(),
      tag: composerTag,
      author: 'Alice Renard',
      authorInitials: 'AR',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: 'Mise à jour',
      desc: composerText,
    };
    setPosts([newPost, ...posts]);
    setComposerText('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#111111] min-h-screen text-gray-900 dark:text-gray-100 font-sans pb-20"
    >
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5 gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#3F6B4A] text-white flex items-center justify-center font-display font-bold text-lg shrink-0 overflow-hidden">
                  {startup.logoUrl ? (
                    <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
                  ) : (
                    startup.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white leading-tight">
                    {startup.name}
                  </h1>
                  <div className="font-mono text-[11.5px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                    {startup.metrics?.find(m => m.label === 'Création')?.value || '2023'} · {startup.industry} · {startup.stage || startup.metrics?.find(m => m.label === 'Stade')?.value || 'Amorçage'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-2.5 w-full sm:w-auto">
              <button className="flex-[1.5] sm:flex-none font-medium text-[13.5px] px-4 sm:px-5 py-2.5 rounded-lg bg-[#3F6B4A] dark:bg-[#6FC97F] text-white dark:text-gray-900 hover:bg-[#2C4E35] dark:hover:bg-[#5CB56C] transition-all flex items-center justify-center gap-1.5 shadow-sm">
                Investir
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <nav className="flex gap-1 -mb-px overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('apercu')}
              className={`font-mono text-[12.5px] font-medium px-1.5 py-3 mr-6 uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'apercu' 
                  ? 'border-[#3F6B4A] text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Aperçu
            </button>
            <button
              onClick={() => setActiveTab('equipe')}
              className={`font-mono text-[12.5px] font-medium px-1.5 py-3 mr-6 uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'equipe' 
                  ? 'border-[#3F6B4A] text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              L'équipe
            </button>
            <button
              onClick={() => setActiveTab('investisseurs')}
              className={`font-mono text-[12.5px] font-medium px-1.5 py-3 mr-6 uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'investisseurs' 
                  ? 'border-[#3F6B4A] text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Espace investisseurs
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= APERÇU ================= */}
        {activeTab === 'apercu' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Section */}
            <section className="py-14 pb-10">
              <div className="font-mono text-[12px] text-[#2C4E35] dark:text-[#9BDBA8] uppercase tracking-widest mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F6B4A] dark:bg-[#6FC97F] animate-pulse"></span>
                {startup.industry} & Technologie
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-[44px] leading-[1.12] tracking-tight text-gray-900 dark:text-white max-w-3xl mb-5">
                {startup.tagline || `${startup.name} simplifie l'industrie.`}
              </h1>
              <p className="text-[17px] text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
                {startup.description}
              </p>
              
              <div className="flex gap-3 mb-12">
                <button className="font-medium text-[13.5px] px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all">
                  Contacter l'équipe
                </button>
                <button className="font-medium text-[13.5px] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all flex items-center gap-1.5">
                  Voir le site <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Readout Block (Signature) */}
              <div className="bg-[#16211B] rounded-2xl p-6 sm:p-7 text-white flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-center justify-between">
                <div className="w-full sm:w-auto pb-1 sm:pb-0">
                  <div className="font-mono text-[10px] sm:text-[11px] text-[#9FB09F] uppercase tracking-widest mb-2.5">
                    Métrique principale
                  </div>
                  <div className="font-mono text-[28px] sm:text-[38px] font-medium flex items-baseline gap-2">
                    {startup.metrics?.[0]?.value || '+42'}<span className="text-[13px] sm:text-[15px] text-[#9FB09F] font-normal">{startup.metrics?.[0]?.label || '% / an'}</span>
                  </div>
                  <div className="font-mono text-[11px] sm:text-[13px] text-[#9BDBA8] mt-1.5">
                    ↑ Évolution positive
                  </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-end">
                  <div className="h-14 sm:h-16 w-full">
                    <svg className="w-full h-full" viewBox="0 0 260 56" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6FC97F" stopOpacity="0.35"/>
                          <stop offset="100%" stopColor="#6FC97F" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path fill="url(#sparkfill)" opacity="0.8" d="M0,40 L30,36 L60,38 L90,26 L120,30 L150,18 L180,20 L210,10 L240,12 L260,4 L260,56 L0,56 Z"/>
                      <path fill="none" stroke="#6FC97F" strokeWidth="2" d="M0,40 L30,36 L60,38 L90,26 L120,30 L150,18 L180,20 L210,10 L240,12 L260,4"/>
                    </svg>
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-[#9FB09F] mt-2 mb-1">
                    Trajectoire d'adoption 12 mois
                  </div>
                </div>
              </div>
            </section>

            {/* À propos & Facts */}
            <section className="py-14 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
                <div>
                  <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
                    <h2 className="font-display font-semibold text-2xl tracking-tight">À propos</h2>
                  </div>
                  <p className="text-[15.5px] text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    {startup.description} {startup.name} s'engage à transformer son secteur avec des solutions innovantes. La plateforme connecte les données opérationnelles de l'entreprise pour produire un impact continu, plutôt qu'une solution ponctuelle.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                    Fiche technique
                  </div>
                  <div className="space-y-0">
                    <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 text-[14px]">
                      <span className="text-gray-500 dark:text-gray-400">Création</span>
                      <span className="font-semibold font-mono text-[13px]">{startup.metrics?.find(m => m.label === 'Création')?.value || '2023'}</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 text-[14px]">
                      <span className="text-gray-500 dark:text-gray-400">Siège</span>
                      <span className="font-semibold font-mono text-[13px]">Paris, France</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 text-[14px]">
                      <span className="text-gray-500 dark:text-gray-400">Secteur</span>
                      <span className="font-semibold font-mono text-[13px]">{startup.industry}</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 text-[14px]">
                      <span className="text-gray-500 dark:text-gray-400">Stade</span>
                      <span className="font-semibold font-mono text-[13px]">{startup.stage || 'Amorçage'}</span>
                    </div>
                    <div className="flex justify-between py-2.5 text-[14px]">
                      <span className="text-gray-500 dark:text-gray-400">Effectif</span>
                      <span className="font-semibold font-mono text-[13px]">{startup.team?.length ? `${startup.team.length} personnes` : '12 personnes'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Métriques clés */}
            <section className="py-14 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-baseline justify-between mb-7">
                <h2 className="font-display font-semibold text-2xl tracking-tight">Métriques clés</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors hover:-translate-y-0.5 duration-200">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                    CA récurrent (MRR)
                  </div>
                  <div className="font-display font-bold text-[26px] tracking-tight">38 400 MRU</div>
                  <div className="font-mono text-[12px] text-[#2C4E35] dark:text-[#9BDBA8] mt-1.5">
                    ↑ 14 % MoM
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors hover:-translate-y-0.5 duration-200">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                    Clients actifs
                  </div>
                  <div className="font-display font-bold text-[26px] tracking-tight">142</div>
                  <div className="font-mono text-[12px] text-[#2C4E35] dark:text-[#9BDBA8] mt-1.5">
                    ↑ 9 nouveaux ce mois
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors hover:-translate-y-0.5 duration-200">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                    Rétention à 12 mois
                  </div>
                  <div className="font-display font-bold text-[26px] tracking-tight">93 %</div>
                  <div className="font-mono text-[12px] text-[#2C4E35] dark:text-[#9BDBA8] mt-1.5">
                    ↑ 2 pts vs. T1
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors hover:-translate-y-0.5 duration-200">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                    Cycle de vente
                  </div>
                  <div className="font-display font-bold text-[26px] tracking-tight">27 j</div>
                  <div className="font-mono text-[12px] text-[#2C4E35] dark:text-[#9BDBA8] mt-1.5">
                    ↓ 5 j vs. T1
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Strip */}
            <section className="py-14 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-baseline justify-between mb-7">
                <h2 className="font-display font-semibold text-2xl tracking-tight">Impact mesuré</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <div className="bg-white dark:bg-[#111111] p-6 sm:py-7 sm:px-6">
                  <div className="font-mono font-medium text-[30px] text-[#C1602E] dark:text-[#F3DCC9]">18 400 t</div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5">Unités mesurées ou évitées</div>
                </div>
                <div className="bg-white dark:bg-[#111111] p-6 sm:py-7 sm:px-6">
                  <div className="font-mono font-medium text-[30px] text-[#C1602E] dark:text-[#F3DCC9]">142</div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5">Entreprises accompagnées</div>
                </div>
                <div className="bg-white dark:bg-[#111111] p-6 sm:py-7 sm:px-6">
                  <div className="font-mono font-medium text-[30px] text-[#C1602E] dark:text-[#F3DCC9]">4,2 sem.</div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5">Temps moyen de déploiement</div>
                </div>
              </div>
            </section>

            {/* Membres clés */}
            {startup.team && startup.team.length > 0 && (
              <section className="py-14 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-baseline justify-between mb-7">
                  <h2 className="font-display font-semibold text-2xl tracking-tight">Membres clés</h2>
                  <button 
                    onClick={() => setActiveTab('equipe')} 
                    className="font-mono text-[12.5px] font-medium text-[#2C4E35] dark:text-[#6FC97F] hover:underline"
                  >
                    Voir toute l'équipe →
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {startup.team.slice(0, 4).map((member) => (
                    <div key={member.id} className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-4.5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors">
                      <div className="w-[42px] h-[42px] rounded-full bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-[14px] mb-3.5 overflow-hidden">
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="font-semibold text-[14.5px]">{member.name}</div>
                      <div className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5">{member.role}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Actualités & mises à jour */}
            <section className="py-14 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-baseline justify-between mb-7">
                <h2 className="font-display font-semibold text-2xl tracking-tight">Actualités & mises à jour</h2>
              </div>

              {/* Composer */}
              <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-4.5 sm:p-5 mb-5">
                <div className="flex gap-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-[14px] shrink-0 overflow-hidden">
                    AR
                  </div>
                  <textarea
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    placeholder="Partager une avancée : lancement, chiffre clé, recrutement, presse…"
                    className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-[14px] resize-none min-h-[56px] bg-[#F5F6F0] dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#3F6B4A] dark:focus:border-[#6FC97F] transition-colors"
                  ></textarea>
                </div>
                <div className="flex justify-between items-start mt-3 flex-wrap gap-2.5">
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'produit', label: 'Produit' },
                      { id: 'traction', label: 'Traction' },
                      { id: 'presse', label: 'Presse' },
                      { id: 'equipe', label: 'Équipe' }
                    ].map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => setComposerTag(tag.id)}
                        className={`font-mono text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                          composerTag === tag.id
                            ? 'bg-[#3F6B4A] border-[#3F6B4A] text-white'
                            : 'border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input type="file" ref={fileInputRef} accept="image/*" className="hidden" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="font-mono text-[12px] text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 flex items-center gap-1.5 hover:border-[#3F6B4A] hover:text-[#2C4E35] dark:hover:border-[#6FC97F] dark:hover:text-[#9BDBA8] transition-colors bg-transparent"
                    >
                      ＋ Image
                    </button>
                    <button
                      onClick={publishPost}
                      className="font-medium text-[13.5px] px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                    >
                      Publier
                    </button>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {[
                  { id: 'all', label: 'Tout' },
                  { id: 'produit', label: 'Produit' },
                  { id: 'traction', label: 'Traction' },
                  { id: 'presse', label: 'Presse' },
                  { id: 'equipe', label: 'Équipe' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`font-mono text-[11.5px] px-3.5 py-1.5 rounded-full border transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Feed */}
              <div className="flex flex-col gap-3.5">
                <AnimatePresence>
                  {posts.filter(p => activeFilter === 'all' || p.tag === activeFilter).map(post => {
                    const badgeStyles: Record<string, string> = {
                      produit: 'bg-[#F3DCC9] text-[#C1602E] dark:bg-[#C1602E]/20 dark:text-[#F3DCC9]',
                      traction: 'bg-[#DCE8DD] text-[#2C4E35] dark:bg-[#3F6B4A]/30 dark:text-[#9BDBA8]',
                      presse: 'bg-[#F5F6F0] text-[#5B675D] border border-[#D7DCD1] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
                      equipe: 'bg-[#E6E9F5] text-[#38406B] dark:bg-[#38406B]/30 dark:text-[#E6E9F5]',
                    };
                    const badgeLabels: Record<string, string> = {
                      produit: 'Produit',
                      traction: 'Traction',
                      presse: 'Presse',
                      equipe: 'Équipe',
                    };

                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-5"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-[42px] h-[42px] rounded-full bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-[14px] shrink-0 overflow-hidden">
                            {post.authorInitials}
                          </div>
                          <div>
                            <div className="font-semibold text-[13.5px]">{post.author}</div>
                            <div className="font-mono text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{post.date}</div>
                          </div>
                          <span className={`ml-auto font-mono text-[10.5px] uppercase tracking-widest px-2.5 py-1 rounded-md shrink-0 ${badgeStyles[post.tag] || badgeStyles.presse}`}>
                            {badgeLabels[post.tag]}
                          </span>
                        </div>
                        <div className="font-semibold text-[15px] mb-1.5">{post.title}</div>
                        <div className="text-[13.5px] text-gray-600 dark:text-gray-400 leading-relaxed">
                          {post.desc}
                        </div>
                        {post.visualType === 'svg-produit' && (
                          <div className="mt-3.5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                            <svg viewBox="0 0 600 220" className="w-full block bg-[#101915]">
                              <rect x="0" y="0" width="600" height="36" fill="#16211B"/>
                              <circle cx="20" cy="18" r="4" fill="#C1602E"/><circle cx="34" cy="18" r="4" fill="#D9A441"/><circle cx="48" cy="18" r="4" fill="#3F6B4A"/>
                              <text x="290" y="23" fill="#9FB09F" fontFamily="IBM Plex Mono" fontSize="11">EcoTrack — Tableau de compensation</text>
                              <rect x="24" y="56" width="168" height="140" rx="8" fill="#182420" stroke="#2A362F"/>
                              <text x="40" y="82" fill="#9FB09F" fontFamily="IBM Plex Mono" fontSize="10">SOLDE RÉSIDUEL</text>
                              <text x="40" y="112" fill="#fff" fontFamily="IBM Plex Mono" fontSize="24" fontWeight="500">6,4 t</text>
                              <rect x="40" y="128" width="136" height="8" rx="4" fill="#2A362F"/>
                              <rect x="40" y="128" width="96" height="8" rx="4" fill="#6FC97F"/>
                              <text x="40" y="158" fill="#6FC97F" fontFamily="IBM Plex Mono" fontSize="10">70% compensé</text>
                              <rect x="210" y="56" width="366" height="140" rx="8" fill="#182420" stroke="#2A362F"/>
                              <text x="226" y="80" fill="#9FB09F" fontFamily="IBM Plex Mono" fontSize="10">PROJETS DE COMPENSATION RECOMMANDÉS</text>
                              <rect x="226" y="94" width="334" height="30" rx="6" fill="#101915"/>
                              <text x="238" y="113" fill="#fff" fontFamily="IBM Plex Mono" fontSize="11">Reforestation — Landes, FR</text>
                              <text x="500" y="113" fill="#9BDBA8" fontFamily="IBM Plex Mono" fontSize="11">+2,1 t</text>
                              <rect x="226" y="130" width="334" height="30" rx="6" fill="#101915"/>
                              <text x="238" y="149" fill="#fff" fontFamily="IBM Plex Mono" fontSize="11">Méthanisation agricole — Bretagne</text>
                              <text x="500" y="149" fill="#9BDBA8" fontFamily="IBM Plex Mono" fontSize="11">+3,0 t</text>
                              <rect x="226" y="166" width="334" height="18" rx="4" fill="none"/>
                            </svg>
                          </div>
                        )}
                        {post.visualType === 'svg-traction' && (
                          <div className="mt-3.5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                            <svg viewBox="0 0 600 200" className="w-full block bg-white">
                              <line x1="50" y1="20" x2="50" y2="170" stroke="#D7DCD1"/>
                              <line x1="50" y1="170" x2="580" y2="170" stroke="#D7DCD1"/>
                              <rect x="80" y="140" width="46" height="30" fill="#DCE8DD"/>
                              <rect x="160" y="118" width="46" height="52" fill="#DCE8DD"/>
                              <rect x="240" y="100" width="46" height="70" fill="#DCE8DD"/>
                              <rect x="320" y="80" width="46" height="90" fill="#DCE8DD"/>
                              <rect x="400" y="55" width="46" height="115" fill="#3F6B4A"/>
                              <rect x="480" y="30" width="46" height="140" fill="#3F6B4A"/>
                              <text x="88" y="185" fill="#5B675D" fontFamily="IBM Plex Mono" fontSize="10">S1</text>
                              <text x="168" y="185" fill="#5B675D" fontFamily="IBM Plex Mono" fontSize="10">S2</text>
                              <text x="248" y="185" fill="#5B675D" fontFamily="IBM Plex Mono" fontSize="10">S3</text>
                              <text x="328" y="185" fill="#5B675D" fontFamily="IBM Plex Mono" fontSize="10">S4</text>
                              <text x="405" y="185" fill="#2C4E35" fontFamily="IBM Plex Mono" fontSize="10">S5</text>
                              <text x="485" y="185" fill="#2C4E35" fontFamily="IBM Plex Mono" fontSize="10">S6</text>
                              <text x="480" y="22" fill="#2C4E35" fontFamily="IBM Plex Mono" fontSize="12" fontWeight="500">142 clients</text>
                            </svg>
                          </div>
                        )}
                        {post.visualType === 'svg-equipe' && (
                          <div className="mt-3.5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                            <svg viewBox="0 0 600 180" className="w-full block bg-[#F5F6F0]">
                              <circle cx="180" cy="90" r="46" fill="#DCE8DD"/>
                              <circle cx="300" cy="90" r="54" fill="#3F6B4A"/>
                              <circle cx="420" cy="90" r="46" fill="#F3DCC9"/>
                              <text x="180" y="96" fill="#2C4E35" fontFamily="Space Grotesk" fontWeight="700" fontSize="16" textAnchor="middle">AR</text>
                              <text x="300" y="96" fill="#fff" fontFamily="Space Grotesk" fontWeight="700" fontSize="18" textAnchor="middle">PB</text>
                              <text x="420" y="96" fill="#C1602E" fontFamily="Space Grotesk" fontWeight="700" fontSize="16" textAnchor="middle">SM</text>
                              <text x="300" y="165" fill="#5B675D" fontFamily="IBM Plex Mono" fontSize="11" textAnchor="middle">L'équipe fondatrice, novembre 2025</text>
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>
          </motion.div>
        )}

        {/* ================= EQUIPE ================= */}
        {activeTab === 'equipe' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-14"
          >
            <div className="flex items-baseline justify-between mb-7">
              <h2 className="font-display font-semibold text-2xl tracking-tight">L'équipe</h2>
            </div>
            
            {startup.team && startup.team.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {startup.team.map((member) => (
                  <div 
                    key={member.id} 
                    className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-4.5 hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors cursor-pointer"
                    onClick={() => onProfileClick && onProfileClick(member)}
                  >
                    <div className="w-[42px] h-[42px] rounded-full bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-[14px] mb-3.5 overflow-hidden">
                      {member.avatarUrl ? (
                        <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="font-semibold text-[14.5px]">{member.name}</div>
                    <div className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5 mb-2.5">{member.role}</div>
                    <div className="text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Expertise dans le domaine. Pilote la vision produit et les partenariats stratégiques.
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center py-12">
                Aucun membre de l'équipe renseigné pour l'instant.
              </div>
            )}
          </motion.div>
        )}

        {/* ================= INVESTISSEURS ================= */}
        {activeTab === 'investisseurs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-14"
          >
            <div className="flex items-baseline justify-between mb-7">
              <h2 className="font-display font-semibold text-2xl tracking-tight">Espace investisseurs</h2>
            </div>

            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Levée à ce jour · Tour actuel ({startup.stage || 'Seed'})
                </div>
                <div className="font-display font-bold text-[40px] tracking-tight text-gray-900 dark:text-white mt-2">
                  {startup.raised.toLocaleString()} MRU
                </div>
                <div className="text-[13.5px] text-gray-500 dark:text-gray-400 mt-1.5">
                  Objectif: {startup.fundingGoal.toLocaleString()} MRU · Prochain tour envisagé : Série A
                </div>
              </div>
              <div className="flex flex-col gap-3.5 justify-center">
                <div className="grid grid-cols-[110px_1fr_40px] items-center gap-2.5 text-[12.5px]">
                  <span className="text-gray-600 dark:text-gray-300">Produit & R&D</span>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3F6B4A] dark:bg-[#6FC97F] rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <span className="font-medium">55%</span>
                </div>
                <div className="grid grid-cols-[110px_1fr_40px] items-center gap-2.5 text-[12.5px]">
                  <span className="text-gray-600 dark:text-gray-300">Commercial</span>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3F6B4A] dark:bg-[#6FC97F] rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="font-medium">30%</span>
                </div>
                <div className="grid grid-cols-[110px_1fr_40px] items-center gap-2.5 text-[12.5px]">
                  <span className="text-gray-600 dark:text-gray-300">Opérations</span>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3F6B4A] dark:bg-[#6FC97F] rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="font-medium">15%</span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display font-semibold text-[18px] tracking-tight">Investisseurs au capital (Temps Réel)</h2>
            </div>
            <div className="flex flex-col gap-3.5 mb-8">
              {[
                { name: 'Green Origin Capital', type: 'Fonds climat · Lead', amount: Math.floor(startup.raised * 0.55), avatar: 'GO' },
                { name: 'Nova Angels', type: 'Business angels', amount: Math.floor(startup.raised * 0.20), avatar: 'NA' },
                { name: 'Fonds Tech Régional', type: 'Fonds public régional', amount: Math.floor(startup.raised * 0.15), avatar: 'FT' },
                { name: 'Marc Dubois', type: 'Business angel', amount: Math.floor(startup.raised * 0.07), avatar: 'MD' },
                { name: 'Sarah El Amine', type: 'Business angel', amount: Math.floor(startup.raised * 0.03), avatar: 'SE' },
              ].sort((a, b) => b.amount - a.amount).map((investor, idx) => (
                <div key={idx} className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-xl p-4.5 text-[13.5px] flex items-center justify-between hover:border-[#3F6B4A] dark:hover:border-[#6FC97F] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="font-display font-bold text-gray-400 dark:text-gray-600 w-4 text-right">
                      {idx + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-[13px] overflow-hidden">
                      {investor.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-[14.5px] mb-0.5 group-hover:text-[#3F6B4A] dark:group-hover:text-[#6FC97F] transition-colors">{investor.name}</div>
                      <div className="font-mono text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">{investor.type}</div>
                    </div>
                  </div>
                  <div className="font-display font-bold text-[16px] text-[#3F6B4A] dark:text-[#6FC97F]">
                    {investor.amount.toLocaleString()} MRU
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="font-medium text-[13.5px] px-5 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm">
                Demander le pitch deck
              </button>
            </div>
          </motion.div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-10 py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {['IA', 'SaaS B2B', 'Climate tech', 'Impact'].map(tag => (
                <span key={tag} className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-[13px] text-gray-500 dark:text-gray-400">
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</button>
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</button>
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
