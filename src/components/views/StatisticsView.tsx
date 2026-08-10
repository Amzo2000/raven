import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Users, Package, Wallet, Banknote, ArrowUpRight, ArrowDownRight, Box } from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 45000, expenses: 32000 },
  { name: 'Fév', revenue: 52000, expenses: 34000 },
  { name: 'Mar', revenue: 48000, expenses: 33000 },
  { name: 'Avr', revenue: 61000, expenses: 35000 },
  { name: 'Mai', revenue: 59000, expenses: 38000 },
  { name: 'Juin', revenue: 75000, expenses: 42000 },
];

const salesData = [
  { name: 'Lun', sales: 120 },
  { name: 'Mar', sales: 150 },
  { name: 'Mer', sales: 180 },
  { name: 'Jeu', sales: 140 },
  { name: 'Ven', sales: 210 },
  { name: 'Sam', sales: 250 },
  { name: 'Dim', sales: 220 },
];

export default function StatisticsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="mb-10 mt-2">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Statistiques Détaillées</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-[14px] sm:text-[15px] max-w-2xl leading-relaxed">
          Vue d'ensemble complète de la performance de vos activités : finances, ventes, masse salariale et inventaire.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800 pb-10 mb-10">
        <div className="flex flex-col py-6 sm:px-6 sm:py-0 sm:pl-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <div className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-1">Fonds actuels (Trésorerie)</div>
          <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">1 245 000 €</div>
        </div>

        <div className="flex flex-col py-6 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3 h-3" /> +24.8%
            </span>
          </div>
          <div className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-1">Revenu du mois</div>
          <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">75 000 €</div>
        </div>

        <div className="flex flex-col py-6 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Package className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3 h-3" /> +8.2%
            </span>
          </div>
          <div className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-1">Produits vendus (Mois)</div>
          <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">4 289</div>
        </div>

        <div className="flex flex-col py-6 sm:px-6 sm:py-0 sm:pr-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Banknote className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-red-600 dark:text-red-400">
              <ArrowDownRight className="w-3 h-3" /> -2.4%
            </span>
          </div>
          <div className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-1">Masse salariale mensuelle</div>
          <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">42 000 €</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 mb-10 border-b border-gray-200 dark:border-gray-800 pb-10">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">Revenus vs Dépenses</h2>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">Évolution sur les 6 derniers mois</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3F6B4A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3F6B4A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(value) => `${value / 1000}k€`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" name="Revenus" stroke="#3F6B4A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" name="Dépenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:border-l border-gray-200 dark:border-gray-800 lg:pl-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">Ventes Journalières</h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">Volume de la semaine en cours</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#333', opacity: 0.1 }}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
                />
                <Bar dataKey="sales" name="Ventes" radius={[4, 4, 0, 0]}>
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === salesData.length - 1 ? '#3F6B4A' : '#9ca3af'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Details Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">
        <div className="lg:pr-8 lg:border-r border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">État des Stocks</h2>
            </div>
            <button className="text-[13px] font-medium text-[#3F6B4A] dark:text-[#6FC97F] hover:underline">Voir tout</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Licences Pro Annuelles', stock: 'Illimité', status: 'available', sold: 1250 },
              { name: 'Modules Matériels IoT', stock: 45, status: 'warning', sold: 320 },
              { name: 'Packs Serveur Enterprise', stock: 12, status: 'danger', sold: 85 },
              { name: 'Formation Onboarding', stock: 'Dispo.', status: 'available', sold: 450 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800/60 last:border-0">
                <div>
                  <div className="text-[14px] font-medium text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-[12px] text-gray-500 mt-0.5">{item.sold} ventes ce mois</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[12px] font-medium px-2 py-1 rounded-md ${
                    item.status === 'warning' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                    item.status === 'danger' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                    'bg-gray-50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-300'
                  }`}>
                    Stock : {item.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pl-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white tracking-tight">Salaires Employés</h2>
            </div>
            <button className="text-[13px] font-medium text-[#3F6B4A] dark:text-[#6FC97F] hover:underline">Gérer</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Thomas Leroy', role: 'Lead Developer', salary: '5 200 € / mois', type: 'CDI' },
              { name: 'Camille Dubois', role: 'Data Scientist', salary: '4 800 € / mois', type: 'CDI' },
              { name: 'Lucas Martin', role: 'UX/UI Designer', salary: '3 900 € / mois', type: 'CDI' },
              { name: 'Julie Rivière', role: 'CMO', salary: '5 500 € / mois', type: 'CDI' },
            ].map((employee, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-medium text-sm">
                    {employee.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-gray-900 dark:text-white">{employee.name}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{employee.role}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-[14px] font-semibold text-gray-900 dark:text-white">{employee.salary}</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{employee.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
