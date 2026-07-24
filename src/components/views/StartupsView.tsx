import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { startups } from '../../data';
import StartupCard from '../StartupCard';
import StartupDetailView from './StartupDetailView';
import { 
  ChevronRight, ChevronLeft, ArrowRight, Grid, Cpu, Leaf, CreditCard, 
  Activity, Sprout, GraduationCap, Truck, Shield, Utensils, Car 
} from 'lucide-react';
import { Startup } from '../../types';

const CATEGORIES = [
  { name: "Tous", icon: Grid },
  { name: "IA", icon: Cpu },
  { name: "Greentech", icon: Leaf },
  { name: "Fintech", icon: CreditCard },
  { name: "HealthTech", icon: Activity },
  { name: "AgriTech", icon: Sprout },
  { name: "EdTech", icon: GraduationCap },
  { name: "Logistics", icon: Truck },
  { name: "Cybersécurité", icon: Shield },
  { name: "FoodTech", icon: Utensils },
  { name: "Mobility", icon: Car },
];

function StartupSection({ title, items, onSelect }: { title: string, items: Startup[], onSelect: (s: Startup) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6 relative group/section">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-mono text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:underline cursor-pointer transition-colors hidden sm:block mr-4">
            Tout voir
          </button>
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className={`absolute -left-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all items-center justify-center ${canScrollLeft ? 'hidden sm:flex' : 'hidden'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto pb-6 px-4 sm:mx-0 sm:px-0 gap-3 sm:gap-4 snap-x hide-scrollbar scroll-smooth after:content-[''] after:w-px after:pr-4 after:sm:pr-0"
        >
          {items.map((startup) => (
            <div key={startup.id} className="w-[110px] sm:w-[140px] flex-shrink-0 snap-start">
              <StartupCard startup={startup} onClick={() => onSelect(startup)} />
            </div>
          ))}
          
          <div className="w-[110px] sm:w-[140px] flex-shrink-0 snap-start flex items-stretch">
            <div className="w-full h-full border border-gray-200 dark:border-gray-800 rounded-md bg-gray-50/50 dark:bg-gray-800/50 flex flex-col items-center justify-center p-2 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors group">
              <div className="w-10 h-10 rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Voir plus</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">Découvrir d'autres projets</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scroll('right')}
          className={`absolute -right-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all items-center justify-center ${canScrollRight ? 'hidden sm:flex' : 'hidden'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default function StartupsView() {
  const trendingStartups = startups.slice(0, 5);
  const recommendedStartups = startups.slice(5, 10);
  const popularStartups = startups.slice(2, 8); // Mixed
  
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  const handleStartupSelect = (startup: Startup) => {
    setSavedScrollPosition(window.scrollY);
    setSelectedStartup(startup);
  };

  const handleBack = () => {
    setSelectedStartup(null);
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition, behavior: 'instant' });
    }, 0);
  };

  const [activeCategory, setActiveCategory] = useState("Tous");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const isFiltering = activeCategory !== 'Tous';
  const filteredStartups = isFiltering 
    ? startups.filter(s => s.industry === activeCategory)
    : startups;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (selectedStartup) {
    return <StartupDetailView startup={selectedStartup} onBack={handleBack} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
    >
      <div className="relative mb-10">
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="flex sm:justify-center border-b border-gray-200 dark:border-gray-800">
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex space-x-4 sm:space-x-6 overflow-x-auto hide-scrollbar scroll-smooth whitespace-nowrap p-0 after:content-[''] after:w-px after:pr-4 after:sm:pr-0 max-w-full"
          >
          {CATEGORIES.map(({ name }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`flex items-center pb-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors relative ${
                activeCategory === name 
                  ? 'text-[#1DBF73]' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span>{name}</span>
              {activeCategory === name && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1DBF73]" />
              )}
            </button>
          ))}
          </div>
        </div>

        {canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {!isFiltering ? (
        <>
          <div className="flex flex-col">
            <StartupSection title="01 — Tendances" items={trendingStartups} onSelect={handleStartupSelect} />
            <StartupSection title="02 — Recommandés pour vous" items={recommendedStartups} onSelect={handleStartupSelect} />
            <StartupSection title="03 — Les plus populaires actuellement" items={popularStartups} onSelect={handleStartupSelect} />
          </div>

          <hr className="my-3 border-gray-200 dark:border-gray-800" />

          <div className="mb-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Explorez plus de projets</h2>
            <div className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 sm:gap-4">
              {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} onClick={() => handleStartupSelect(startup)} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mb-6">
          <div className="mb-3">
            <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Projets dans la catégorie {activeCategory}
            </h2>
          </div>
          
          {filteredStartups.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 sm:gap-4">
              {filteredStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} onClick={() => handleStartupSelect(startup)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400">Aucun projet trouvé dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
