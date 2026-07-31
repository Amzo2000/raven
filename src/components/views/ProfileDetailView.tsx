import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Github, Linkedin, Twitter, Globe, ArrowUpRight } from 'lucide-react';
import { TeamMember, Talent } from '../../types';

interface ProfileDetailViewProps {
  profile: TeamMember | Talent;
  onBack: () => void;
}

export default function ProfileDetailView({ profile, onBack }: ProfileDetailViewProps) {
  // Normalize fields between TeamMember and Talent
  const roleTitle = 'role' in profile ? profile.role : profile.title;
  const isCofounder = 'type' in profile && profile.type === 'cofounder';
  const bio = profile.bio || "Expert passionné avec une forte expérience dans son domaine. Dédié à la création de produits innovants et à l'excellence opérationnelle.";
  const skills = profile.skills || ['Leadership', 'Stratégie', 'Innovation', 'Management', 'Développement produit'];
  const location = profile.location || 'Paris, France';
  const experience = profile.experience || '+5 ans d\'expérience';
  const education = profile.education || 'Master en Ingénierie / Commerce';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-white dark:bg-[#111111] z-50 overflow-y-auto"
    >
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-sm sm:text-lg shrink-0 overflow-hidden">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="font-display font-bold text-base sm:text-lg tracking-tight text-gray-900 dark:text-white leading-tight truncate">
                    {profile.name}
                  </h1>
                  <div className="font-mono text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5 truncate">
                    {roleTitle} {isCofounder ? '· Co-fondateur' : ''}
                  </div>
                </div>
              </div>
            </div>

            <button className="hidden sm:flex font-medium text-[13.5px] px-4 py-2 rounded-lg bg-[#3F6B4A] dark:bg-[#6FC97F] text-white dark:text-gray-900 hover:bg-[#2C4E35] dark:hover:bg-[#5CB56C] transition-all items-center justify-center gap-1.5 shadow-sm">
              Contacter
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Column - Profile Info */}
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 w-full mb-6">
              <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-md bg-[#DCE8DD] dark:bg-gray-800 text-[#2C4E35] dark:text-[#9BDBA8] flex items-center justify-center font-display font-bold text-3xl md:text-4xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 md:mb-6">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                )}
              </div>
              
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-1.5 sm:mb-2 truncate text-left">{profile.name}</h1>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium">{roleTitle}</span>
                  {isCofounder && (
                    <span className="px-2.5 py-1 rounded-full bg-[#E8F3EB] dark:bg-[#3F6B4A]/20 text-[#2C4E35] dark:text-[#9BDBA8] font-mono text-[11px] uppercase tracking-wider font-semibold">
                      Co-fondateur
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8 w-full">
              <button className="flex-1 font-medium text-[13.5px] px-4 py-2.5 rounded-lg bg-[#3F6B4A] dark:bg-[#6FC97F] text-white dark:text-gray-900 hover:bg-[#2C4E35] dark:hover:bg-[#5CB56C] transition-all flex items-center justify-center gap-1.5 shadow-sm">
                Contacter
              </button>
            </div>

            <div className="w-full space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">Localisation</div>
                  <div className="text-[13.5px] font-medium text-gray-900 dark:text-gray-200">{location}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">Expérience</div>
                  <div className="text-[13.5px] font-medium text-gray-900 dark:text-gray-200">{experience}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">Formation</div>
                  <div className="text-[13.5px] font-medium text-gray-900 dark:text-gray-200">{education}</div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            <section className="bg-gray-50/50 dark:bg-[#151515] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
              <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-4">À propos</h2>
              <p className="text-[14.5px] text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {bio}
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-4">Compétences clés</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-[13.5px] font-medium border border-gray-200 dark:border-gray-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-4">Expériences récentes</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white dark:border-[#111111] bg-[#3F6B4A] dark:bg-[#6FC97F] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm ml-0.5 md:ml-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#111111]"></div>
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#151515] shadow-sm ml-4 md:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[14.5px] text-gray-900 dark:text-white">{roleTitle}</h3>
                      <span className="text-[11.5px] font-medium text-[#3F6B4A] dark:text-[#6FC97F]">2023 - Présent</span>
                    </div>
                    <div className="text-[13px] text-gray-500 dark:text-gray-400 mb-2">Startup Tech Actuelle</div>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Direction de la stratégie et développement des opérations clés. Supervision d'une équipe pluridisciplinaire et pilotage de la croissance.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white dark:border-[#111111] bg-gray-200 dark:bg-gray-700 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-0.5 md:ml-0">
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#151515] shadow-sm ml-4 md:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[14.5px] text-gray-900 dark:text-white">Senior Manager</h3>
                      <span className="text-[11.5px] font-medium text-gray-500">2019 - 2023</span>
                    </div>
                    <div className="text-[13px] text-gray-500 dark:text-gray-400 mb-2">Grande Entreprise</div>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      Gestion de projets à fort impact, optimisation des processus internes et lancement de nouvelles initiatives de croissance.
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
