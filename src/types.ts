export type Role = 'startup' | 'investor' | 'talent';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  type: 'cofounder' | 'associate' | 'employee' | 'partner';
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  industry: string;
  fundingGoal: number;
  raised: number;
  logoUrl?: string;
  openRoles: string[];
  team?: TeamMember[];
  images?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  stage?: 'Idéation' | 'Amorçage' | 'Croissance';
  investorData?: {
    capitalSocial: string;
    users: string;
    growthRate: string;
    revenue: string;
    teamSize: string;
    marketSize: string;
  };
}

export interface Investor {
  id: string;
  name: string;
  focus: string[];
  bio: string;
  investmentRange: string;
  avatarUrl?: string;
}

export interface Talent {
  id: string;
  name: string;
  title: string;
  skills: string[];
  bio: string;
  avatarUrl?: string;
}

export type ViewState = 'home' | 'startups' | 'investors' | 'talents';
