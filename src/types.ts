export type Role = 'startup' | 'investor' | 'talent';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  type: 'cofounder' | 'associate' | 'employee' | 'partner';
  bio?: string;
  skills?: string[];
  location?: string;
  experience?: string;
  education?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
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
  type: 'particulier' | 'entreprise_fonds';
  subtitle?: string;
  verified?: boolean;
  focus: string[];
  bio: string;
  about?: string;
  investmentRange: string;
  totalInvested?: string;
  avgTicket?: string;
  avatarUrl?: string;
  coverUrl?: string;
  location?: string;
  website?: string;
  portfolioCount?: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  stages?: string[];
  portfolio?: { name: string; logoUrl?: string; industry: string; url?: string }[];
  team?: { name: string; role: string; avatarUrl?: string; linkedin?: string }[];
}

export interface Talent {
  id: string;
  name: string;
  title: string;
  skills: string[];
  bio: string;
  avatarUrl?: string;
  location?: string;
  experience?: string;
  education?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export type ViewState = 'startups' | 'investors' | 'talents' | 'statistics';
