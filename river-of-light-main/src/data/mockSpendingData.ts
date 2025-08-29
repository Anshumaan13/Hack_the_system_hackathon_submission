import { SpendingCategory } from '@/types/spending';

export const mockSpendingData: SpendingCategory[] = [
  {
    id: 'education',
    name: 'Education',
    amount: 850000000,
    percentage: 35,
    color: 'civic',
    description: 'Investment in schools, universities, and educational programs',
    subcategories: [
      {
        id: 'k12',
        name: 'K-12 Schools',
        amount: 500000000,
        percentage: 58.8,
        projects: [
          { id: 'school-renovation', name: 'Jefferson High Renovation', amount: 15000000, location: 'Downtown', status: 'active' },
          { id: 'stem-program', name: 'STEM Education Initiative', amount: 25000000, location: 'Citywide', status: 'active' },
          { id: 'teacher-training', name: 'Teacher Development Program', amount: 18000000, location: 'District-wide', status: 'planned' }
        ]
      },
      {
        id: 'higher-ed',
        name: 'Higher Education',
        amount: 250000000,
        percentage: 29.4,
        projects: [
          { id: 'community-college', name: 'Community College Expansion', amount: 45000000, location: 'North Campus', status: 'active' },
          { id: 'research-grants', name: 'Research & Innovation Grants', amount: 35000000, location: 'University District', status: 'completed' }
        ]
      }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    amount: 675000000,
    percentage: 28,
    color: 'teal',
    description: 'Roads, bridges, public transit, and utilities',
    subcategories: [
      {
        id: 'transportation',
        name: 'Transportation',
        amount: 400000000,
        percentage: 59.3,
        projects: [
          { id: 'metro-expansion', name: 'Metro Line Extension', amount: 180000000, location: 'East Side', status: 'active' },
          { id: 'bridge-repair', name: 'City Bridge Maintenance', amount: 75000000, location: 'River District', status: 'active' },
          { id: 'bike-lanes', name: 'Cycling Infrastructure', amount: 25000000, location: 'Citywide', status: 'planned' }
        ]
      },
      {
        id: 'utilities',
        name: 'Utilities & Digital',
        amount: 275000000,
        percentage: 40.7,
        projects: [
          { id: 'fiber-network', name: 'Citywide Fiber Network', amount: 120000000, location: 'Citywide', status: 'active' },
          { id: 'water-systems', name: 'Water System Upgrades', amount: 85000000, location: 'Multiple Districts', status: 'completed' }
        ]
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Social Services',
    amount: 525000000,
    percentage: 22,
    color: 'gold',
    description: 'Public health, social programs, and community support',
    subcategories: [
      {
        id: 'public-health',
        name: 'Public Health',
        amount: 300000000,
        percentage: 57.1,
        projects: [
          { id: 'community-clinics', name: 'Community Health Centers', amount: 95000000, location: 'Underserved Areas', status: 'active' },
          { id: 'mental-health', name: 'Mental Health Programs', amount: 65000000, location: 'Citywide', status: 'active' }
        ]
      },
      {
        id: 'social-services',
        name: 'Social Services',
        amount: 225000000,
        percentage: 42.9,
        projects: [
          { id: 'housing-assistance', name: 'Affordable Housing Initiative', amount: 125000000, location: 'Multiple Neighborhoods', status: 'active' },
          { id: 'food-programs', name: 'Community Food Programs', amount: 45000000, location: 'Citywide', status: 'completed' }
        ]
      }
    ]
  },
  {
    id: 'safety',
    name: 'Public Safety',
    amount: 375000000,
    percentage: 15,
    color: 'civic',
    description: 'Police, fire, emergency services, and community safety',
    subcategories: [
      {
        id: 'emergency-services',
        name: 'Emergency Services',
        amount: 225000000,
        percentage: 60,
        projects: [
          { id: 'fire-stations', name: 'Fire Station Modernization', amount: 85000000, location: 'Multiple Stations', status: 'active' },
          { id: 'emergency-response', name: 'Emergency Response Equipment', amount: 45000000, location: 'Citywide', status: 'planned' }
        ]
      },
      {
        id: 'community-safety',
        name: 'Community Safety',
        amount: 150000000,
        percentage: 40,
        projects: [
          { id: 'community-policing', name: 'Community Policing Initiative', amount: 65000000, location: 'Neighborhoods', status: 'active' },
          { id: 'crime-prevention', name: 'Crime Prevention Programs', amount: 35000000, location: 'High-Risk Areas', status: 'completed' }
        ]
      }
    ]
  }
];

export const totalBudget = 2425000000; // $2.425 billion