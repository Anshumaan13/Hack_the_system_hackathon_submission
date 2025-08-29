export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: 'civic' | 'teal' | 'gold';
  description: string;
  subcategories?: SpendingSubcategory[];
}

export interface SpendingSubcategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  projects: SpendingProject[];
}

export interface SpendingProject {
  id: string;
  name: string;
  amount: number;
  location: string;
  status: 'active' | 'completed' | 'planned';
}

export interface FlowNode {
  id: string;
  type: 'source' | 'category' | 'subcategory' | 'project';
  data: {
    label: string;
    amount: number;
    percentage?: number;
    color: 'civic' | 'teal' | 'gold';
    description?: string;
    status?: string;
  };
  position: { x: number; y: number };
  style?: React.CSSProperties;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: 'river';
  data?: {
    amount: number;
    color: 'civic' | 'teal' | 'gold';
  };
  animated?: boolean;
}