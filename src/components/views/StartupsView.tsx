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
    <div className="mb-12 relative group/section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors">
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer transition-colors hidden sm:block mr-4">
            Tout voir
          </button>
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className={`absolute -left-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all items-center justify-center ${canScrollLeft ? 'hidden sm:flex' : 'hidden'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto pb-6 px-4 sm:mx-0 sm:px-0 gap-4 sm:gap-6 snap-x hide-scrollbar scroll-smooth after:content-[''] after:w-px after:pr-4 after:sm:pr-0"
        >
          {items.map((startup) => (
            <div key={startup.id} className="w-[240px] sm:w-[280px] flex-shrink-0 snap-start">
              <StartupCard startup={startup} onClick={() => onSelect(startup)} />
            </div>
          ))}
          
          <div className="w-[240px] sm:w-[280px] flex-shrink-0 snap-start flex items-stretch">
            <div className="w-full h-full border border-gray-200 rounded-sm bg-gray-50/50 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-gray-300 transition-colors group">
              <div className="w-12 h-12 rounded-sm bg-gray-100 text-gray-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="font-medium text-gray-900">Voir plus</span>
              <span className="text-sm text-gray-500 text-center mt-1">Découvrir d'autres projets</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scroll('right')}
          className={`absolute -right-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all items-center justify-center ${canScrollRight ? 'hidden sm:flex' : 'hidden'}`}
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
    return <StartupDetailView startup={selectedStartup} onBack={() => setSelectedStartup(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Découvrez les startups</h1>
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
          Explorez les projets innovants à la recherche de financements et de talents pour accélérer leur croissance.
        </p>
      </div>

      <div className="relative mb-8">
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex space-x-3 overflow-x-auto hide-scrollbar scroll-smooth whitespace-nowrap py-1 -mx-4 px-4 sm:mx-0 sm:px-2 after:content-[''] after:w-px after:pr-4 after:sm:pr-0"
        >
          {CATEGORIES.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`flex items-center p-1.5 pr-4 rounded-sm text-sm transition-colors border ${
                activeCategory === name 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="w-7 h-7 rounded-sm bg-gray-100 flex items-center justify-center mr-3 text-gray-600">
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {!isFiltering ? (
        <>
          <div className="flex flex-col">
            <StartupSection title="Tendances" items={trendingStartups} onSelect={setSelectedStartup} />
            <StartupSection title="Recommandés pour vous" items={recommendedStartups} onSelect={setSelectedStartup} />
            <StartupSection title="Les plus populaires actuellement" items={popularStartups} onSelect={setSelectedStartup} />
          </div>

          <hr className="my-4 sm:my-6 border-gray-200" />

          <div className="mb-12">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-6">Explorez plus de projets</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6">
              {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} onClick={() => setSelectedStartup(startup)} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
              Projets dans la catégorie {activeCategory}
            </h2>
          </div>
          
          {filteredStartups.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6">
              {filteredStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} onClick={() => setSelectedStartup(startup)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500">Aucun projet trouvé dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
