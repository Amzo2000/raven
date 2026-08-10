import { motion } from 'motion/react';
import { Mail, MapPin, Briefcase, Camera, Settings, Shield, Bell, Key } from 'lucide-react';

export default function MyProfileView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full pb-12"
    >
      <div className="w-full bg-white dark:bg-[#111111]">
        {/* Cover Image */}
        <div className="h-48 sm:h-64 bg-gradient-to-r from-[#3F6B4A] to-[#6FC97F] relative w-full">
          <button className="absolute bottom-4 right-4 sm:right-8 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Modifier la couverture</span>
          </button>
        </div>

        {/* Profile Info - Full width */}
        <div className="w-full px-4 sm:px-8 lg:px-12 pb-10">
          <div className="relative flex justify-between items-end -mt-16 sm:-mt-20 mb-8">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-[#111111] overflow-hidden bg-white">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white dark:bg-gray-800 p-2.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <button className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm mb-2 sm:mb-4">
              Modifier le profil
            </button>
          </div>

          <div className="mb-10">
             <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Jean Dupont</h1>
             <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2 text-[15px]">
               <Briefcase className="w-4 h-4" /> Investisseur / Business Angel
             </p>
             <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2 text-[15px]">
               <MapPin className="w-4 h-4" /> Paris, France
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Informations personnelles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</label>
                    <input type="text" defaultValue="Jean" className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3F6B4A] focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                    <input type="text" defaultValue="Dupont" className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3F6B4A] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input type="email" defaultValue="jean.dupont@example.com" className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg pl-11 pr-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3F6B4A] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                  <textarea rows={4} defaultValue="Passionné par l'innovation technologique et l'investissement early-stage. Plus de 10 ans d'expérience dans l'accompagnement de startups." className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3F6B4A] focus:border-transparent outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#151515] rounded-xl p-5 border border-gray-100 dark:border-gray-800/60">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Paramètres du compte
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300 group">
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                      Notifications
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300 group">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                      Confidentialité
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300 group">
                    <div className="flex items-center gap-2.5">
                      <Key className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                      Mot de passe
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-5 border border-red-100 dark:border-red-900/20">
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Zone de danger</h3>
                <p className="text-[12.5px] text-red-500/80 mb-4">
                  Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. Veuillez être certain.
                </p>
                <button className="w-full px-4 py-2 bg-white dark:bg-transparent border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 hover:bg-red-50 hover:dark:bg-red-900/20 rounded-lg text-sm font-medium transition-colors">
                  Supprimer le compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
