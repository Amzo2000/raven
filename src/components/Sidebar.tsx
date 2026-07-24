import { Building2, Briefcase, Users } from 'lucide-react';
import { ViewState } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { theme } = useTheme();
  
  return (
    <div className="hidden sm:flex flex-col w-20 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111111] items-center py-6 h-screen sticky top-0 shrink-0 z-50">
      {/* Logo */}
      <div className="mb-10 cursor-pointer" onClick={() => onViewChange('startups')}>
        <div className="w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img src={logoLight} alt="Raven Logo" className="w-full h-full object-cover dark:hidden" />
          <img src={logoDark} alt="Raven Logo" className="w-full h-full object-cover hidden dark:block" />
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col space-y-6 flex-1 w-full px-3">
        <button 
          onClick={() => onViewChange('startups')} 
          className={`p-3 rounded-xl transition-colors flex items-center justify-center ${currentView === 'startups' ? 'bg-gray-100 dark:bg-gray-800 text-[#1DBF73]' : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          title="Startups"
        >
          <Building2 className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onViewChange('investors')} 
          className={`p-3 rounded-xl transition-colors flex items-center justify-center ${currentView === 'investors' ? 'bg-gray-100 dark:bg-gray-800 text-[#1DBF73]' : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          title="Investisseurs"
        >
          <Briefcase className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onViewChange('talents')} 
          className={`p-3 rounded-xl transition-colors flex items-center justify-center ${currentView === 'talents' ? 'bg-gray-100 dark:bg-gray-800 text-[#1DBF73]' : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          title="Talents"
        >
          <Users className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Profile */}
      <div className="mt-auto">
        <button className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
}
