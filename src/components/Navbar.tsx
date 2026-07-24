import { Briefcase, Building2, Users, Rocket, Search, Mic, Plus, Bell, ChevronLeft, ChevronRight, ArrowLeft, Home, Sun, Moon } from 'lucide-react';
import { ViewState } from '../types';
import { useState, useRef, useEffect } from 'react';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-white dark:bg-[#111111] sticky top-0 z-50 flex flex-col">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        {/* Left: Logo */}
        <div className={`flex items-center cursor-pointer sm:min-w-[200px] ${isMobileSearchOpen ? 'hidden sm:flex' : ''}`} onClick={() => onViewChange('startups')}>
          <div className="w-8 h-8 flex items-center justify-center mr-2 sm:hidden rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img src={logoLight} alt="Raven Logo" className="w-full h-full object-cover dark:hidden" />
            <img src={logoDark} alt="Raven Logo" className="w-full h-full object-cover hidden dark:block" />
          </div>
          <div className="flex items-baseline font-display font-bold text-xl text-gray-900 dark:text-white tracking-tight">
            <span>Raven</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1DBF73] ml-0.5"></div>
          </div>
        </div>
        
        {/* Center: Search */}
        <div className={`flex-1 flex justify-end sm:justify-center max-w-2xl sm:px-4 ${isMobileSearchOpen ? 'w-full' : ''}`}>
          {!isMobileSearchOpen && (
            <button 
              className="p-2 sm:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 mr-2"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <div className={`flex w-full items-center ${isMobileSearchOpen ? '' : 'hidden sm:flex'}`}>
            {isMobileSearchOpen && (
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="mr-3 p-2 sm:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}
            <div className="flex w-full rounded-lg border border-gray-300 dark:border-gray-800 overflow-hidden bg-white dark:bg-[#111111] h-10 focus-within:ring-1 focus-within:ring-[#1DBF73] focus-within:border-[#1DBF73] dark:focus-within:ring-[#1DBF73] dark:focus-within:border-[#1DBF73]">
              <input
                type="text"
                placeholder="Rechercher"
                className="w-full px-4 py-2 outline-none text-base bg-transparent dark:text-white"
                autoFocus={isMobileSearchOpen}
              />
              <button className="px-4 sm:px-5 bg-gray-50 dark:bg-gray-800/50 border-l border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors h-full">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className={`flex items-center justify-end sm:min-w-[200px] space-x-2 sm:space-x-4 ${isMobileSearchOpen ? 'hidden sm:flex' : ''}`}>
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300"
            title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 ml-1 sm:ml-2 sm:hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - Keeping this for mobile UX */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-gray-800 flex justify-around p-2 z-50 pb-safe">
        <button onClick={() => onViewChange('startups')} className={`flex flex-col items-center justify-center w-full py-2 ${currentView === 'startups' ? 'text-[#1DBF73]' : 'text-gray-500 dark:text-gray-400'}`}>
          <Building2 className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Startups</span>
        </button>
        <button onClick={() => onViewChange('investors')} className={`flex flex-col items-center justify-center w-full py-2 ${currentView === 'investors' ? 'text-[#1DBF73]' : 'text-gray-500 dark:text-gray-400'}`}>
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Investisseurs</span>
        </button>
        <button onClick={() => onViewChange('talents')} className={`flex flex-col items-center justify-center w-full py-2 ${currentView === 'talents' ? 'text-[#1DBF73]' : 'text-gray-500 dark:text-gray-400'}`}>
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Talents</span>
        </button>
      </div>
    </nav>
  );
}
