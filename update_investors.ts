import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

const detailedInvestors = `export const investors: Investor[] = [
  {
    id: 'i1',
    name: 'Julien Roche',
    type: 'particulier',
    subtitle: 'Business angel · Ex-fondateur SaaS',
    verified: true,
    focus: ['Fintech', 'Greentech', 'SaaS B2B'],
    stages: ['Pre-seed', 'Seed'],
    bio: "A revendu sa startup logistique en 2022. Investit à titre personnel dans des SaaS B2B early-stage.",
    about: "Ancien ingénieur devenu entrepreneur, j'ai fondé et revendu deux entreprises dans la logistique et le SaaS B2B. Aujourd'hui, j'accompagne de jeunes fondateurs ambitieux en phase d'amorçage. Au-delà de l'apport financier, je m'implique fortement sur les volets produit, go-to-market et structuration de l'équipe tech. Je recherche des équipes résilientes, obsédées par leur marché et capables d'itérer très vite.",
    investmentRange: 'Ticket 3 500 € moy.',
    totalInvested: '86 000 €',
    avgTicket: '3 500 €',
    coverUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800',
    location: 'Paris, France',
    portfolioCount: 9,
    socialLinks: { linkedin: 'julienroche', twitter: 'jroche_invest' },
    portfolio: [
      { name: 'EcoTrack', industry: 'Greentech', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200', url: 'ecotrack.io' },
      { name: 'PayFlow', industry: 'Fintech', logoUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=200' },
      { name: 'DataSync', industry: 'SaaS B2B', logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'i2',
    name: 'Impact Ventures',
    type: 'entreprise_fonds',
    subtitle: 'Fonds d\\'investissement à impact',
    verified: true,
    focus: ['HealthTech', 'Greentech', 'Impact', 'EdTech'],
    stages: ['Seed', 'Série A'],
    bio: "Fonds d'investissement engagé. Nous cherchons à financer les innovations qui améliorent la vie et protègent la planète, avec une approche centrée sur l'ESG.",
    about: "Impact Ventures est un fonds de dotation de 50M€ dédié aux startups à fort impact social et environnemental. Notre thèse d'investissement repose sur la conviction que les entreprises les plus rentables de demain seront celles qui résolvent les défis fondamentaux de notre époque. Nous investissons des tickets allant de 200k€ à 1M€, majoritairement en tant que lead investor lors des tours de Seed ou Série A.",
    investmentRange: 'Tickets de 200k€ à 1M€',
    totalInvested: '12M €',
    avgTicket: '500 000 €',
    avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800',
    location: 'Nouakchott, Mauritanie',
    website: 'impact-ventures.mru',
    portfolioCount: 15,
    socialLinks: { linkedin: 'impact-ventures' },
    team: [
      { name: 'Amadou Fall', role: 'Managing Partner', avatarUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200', linkedin: 'amadoufall' },
      { name: 'Sophie Diallo', role: 'Investment Principal', avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200', linkedin: 'sophiediallo' }
    ],
    portfolio: [
      { name: 'AgriSense', industry: 'AgriTech', logoUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=200' },
      { name: 'Solaris', industry: 'Greentech', logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDY8l7Je8y-Ybcqlp5K0Fw_W8hETgAI0gBCjC9ilKoYbJM20awYbgm2Yk&s=10' }
    ]
  },
  {
    id: 'i3',
    name: 'Capital Innovation',
    type: 'entreprise_fonds',
    subtitle: 'Seed fund spécialisé DeepTech',
    verified: false,
    focus: ['IA', 'Cybersécurité', 'DeepTech', 'Quantique'],
    stages: ['Pre-seed', 'Seed'],
    bio: "Fonds d'amorçage spécialisé dans les technologies de rupture et la deeptech. Nous soutenons les chercheurs et ingénieurs visionnaires depuis la genèse de leur projet.",
    about: "Nous sommes un fonds composé exclusivement d'anciens chercheurs et ingénieurs. Notre mission est de faire le pont entre la recherche académique et le monde de l'entreprise. Nous n'avons pas peur du risque technologique ou des temps de développement longs. Nous finançons les premières étapes de l'industrialisation, le dépôt de brevets et les premiers POC industriels.",
    investmentRange: 'Tickets 500k€ - 2M€',
    totalInvested: '25M €',
    avgTicket: '1M €',
    avatarUrl: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    location: 'Dakar, Sénégal',
    website: 'capital-inno.vc',
    portfolioCount: 32,
    team: [
      { name: 'Dr. Jean-Marc Blanc', role: 'Partner & IA Expert', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
      { name: 'Cécile Ndiaye', role: 'Venture Partner', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'i4',
    name: 'Sophie Laurent',
    type: 'particulier',
    subtitle: 'Executive Tech & Angel Investor',
    verified: true,
    focus: ['EdTech', 'AgriTech', 'Future of Work'],
    stages: ['Seed'],
    bio: "Executive dans la tech reconvertie en investisseuse. J'apporte mon réseau et mon expertise opérationnelle pour accélérer le développement des projets ambitieux.",
    about: "Après 15 ans passés à des postes de direction dans de grandes entreprises technologiques, je me consacre désormais au développement de l'écosystème startup. J'investis des tickets de 10k€ à 20k€ dans des projets ayant déjà une première traction ou un prototype fonctionnel. Mon objectif est d'aider les fondateurs à structurer leur croissance, recruter leurs premiers talents clés et préparer leur levée de fonds institutionnelle.",
    investmentRange: 'Ticket 15 000 € moy.',
    totalInvested: '120 000 €',
    avgTicket: '15 000 €',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?auto=format&fit=crop&q=80&w=800',
    location: 'Lyon, France',
    portfolioCount: 4,
    socialLinks: { linkedin: 'sophielaurent' },
    portfolio: [
      { name: 'EduSpace', industry: 'EdTech', logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200' }
    ]
  }
];`;

content = content.replace(/export const investors: Investor\[\] = \[[\s\S]*?\];/, detailedInvestors);
fs.writeFileSync('src/data.ts', content);
