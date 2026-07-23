import { Building2 } from 'lucide-react';
import { Startup } from '../types';

interface StartupCardProps {
  key?: string | number;
  startup: Startup;
  onClick?: () => void;
}

export default function StartupCard({ startup, onClick }: StartupCardProps) {
  return (
    <div className="group cursor-pointer flex flex-col h-full border border-gray-200 rounded-sm p-3 hover:border-gray-300 transition-colors" onClick={onClick}>
      <div className="relative aspect-video w-full overflow-hidden rounded-none bg-gray-100 mb-3">
        {startup.logoUrl ? (
          <img 
            src={startup.logoUrl} 
            alt={startup.name} 
            className="w-full h-full object-cover object-center" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Building2 className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      
      <div className="flex gap-3 items-start">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-gray-100 flex-shrink-0 overflow-hidden mt-0.5">
          {startup.logoUrl ? (
            <img 
              src={startup.logoUrl} 
              alt={`${startup.name} logo`} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-50">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-normal text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:underline">
            {startup.tagline}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{startup.name}</p>
        </div>
      </div>
    </div>
  );
}

