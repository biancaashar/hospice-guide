export enum Page {
  HOME = 'home',
  OPTIONS = 'options',
  PLANNING = 'planning',
  SUPPORT = 'support',
  FIND_HOSPICE = 'find_hospice',
  RESOURCES = 'resources'
}

export interface HospiceFacility {
  id: string;
  name: string;
  type: 'Non-profit' | 'For-profit' | 'Government';
  city: string;
  state: string;
  address: string;
  phone: string;
  website: string;
  rating: number; // 1-5
  services: string[]; // e.g., "Inpatient", "Home Hospice"
  languages: string[];
  medicareCertified: boolean;
  acceptsMedicaid: boolean;
  nursing247: boolean;
  pediatric: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}