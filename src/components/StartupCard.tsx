import { Building2 } from 'lucide-react';
import { Startup } from '../types';

interface StartupCardProps {
  key?: string | number;
  startup: Startup;
  onClick?: () => void;
}

export default function StartupCard({ startup, onClick }: StartupCardProps) {
  return (
    <div className="group cursor-pointer flex flex-col h-full transition-colors" onClick={onClick}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-gray-100 mb-2">
        {startup.logoUrl ? (
          <img 
            src={startup.logoUrl} 
            alt={startup.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Building2 className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-start px-1">
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {startup.name}
        </h3>
        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 line-clamp-2">{startup.tagline}</p>
      </div>
    </div>
  );
}

