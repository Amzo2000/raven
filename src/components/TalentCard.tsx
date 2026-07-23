import { Code, MapPin, UserCircle } from 'lucide-react';
import { Talent } from '../types';

interface TalentCardProps {
  key?: string | number;
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-xl">
            {talent.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900">{talent.name}</h3>
            <p className="text-sm font-medium text-blue-600">{talent.title}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-5">{talent.bio}</p>
        
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <Code className="w-3 h-3 mr-1" /> Compétences
          </h4>
          <div className="flex flex-wrap gap-2">
            {talent.skills.map((skill, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          Voir le CV &rarr;
        </button>
      </div>
    </div>
  );
}
