import { Briefcase, Building2, Users, Rocket, Search, Mic, Plus, Bell, ChevronLeft, ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { ViewState } from '../types';
import { useState, useRef, useEffect } from 'react';
import logoUrl from '../../assets/logo.png';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  return (
    <nav className="bg-white sticky top-0 z-50 flex flex-col">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between border-b border-gray-100">
        {/* Left: Logo */}
        <div className={`flex items-center cursor-pointer sm:min-w-[200px] ${isMobileSearchOpen ? 'hidden sm:flex' : ''}`} onClick={() => onViewChange('startups')}>
          <div className="w-8 h-8 flex items-center justify-center mr-3">
            <img src={logoUrl} alt="Raven Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900 tracking-tight hidden lg:block">
            Raven
          </span>
        </div>
        
        {/* Center: Search */}
        <div className={`flex-1 flex justify-end sm:justify-center max-w-2xl sm:px-4 ${isMobileSearchOpen ? 'w-full' : ''}`}>
          {!isMobileSearchOpen && (
            <button 
              className="p-2 sm:hidden rounded-full hover:bg-gray-100 text-gray-600 mr-2"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <div className={`flex w-full items-center ${isMobileSearchOpen ? '' : 'hidden sm:flex'}`}>
            {isMobileSearchOpen && (
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="mr-3 p-2 sm:hidden rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="flex w-full rounded-lg border border-gray-300 overflow-hidden bg-white h-10">
              <input
                type="text"
                placeholder="Rechercher"
                className="w-full px-4 py-2 outline-none text-base"
                autoFocus={isMobileSearchOpen}
              />
              <button className="px-4 sm:px-5 bg-gray-50 border-l border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors h-full">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className={`flex items-center justify-end sm:min-w-[200px] space-x-2 sm:space-x-4 ${isMobileSearchOpen ? 'hidden sm:flex' : ''}`}>
          <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 ml-1 sm:ml-2">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - Keeping this for mobile UX */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50 pb-safe">
        <button onClick={() => onViewChange('startups')} className={`flex flex-col items-center justify-center w-full py-2 ${currentView === 'startups' ? 'text-gray-900' : 'text-gray-500'}`}>
          <Building2 className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Startups</span>
        </button>
        <button onClick={() => onViewChange('investors')} className={`flex flex-col items-center justify-center w-full py-2 ${currentView === 'investors' ? 'text-gray-900' : 'text-gray-500'}`}>
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Investisseurs</span>
        </button>
        <button onClick={() => onViewChange('talents')} className={`flex flex-col items-center justify-center w-full py-2 ${currentView === 'talents' ? 'text-gray-900' : 'text-gray-500'}`}>
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Talents</span>
        </button>
      </div>
    </nav>
  );
}
