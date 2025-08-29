import { Search, Filter, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface FlowControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  viewMode: 'flow' | 'comparison';
  onViewModeChange: (mode: 'flow' | 'comparison') => void;
}

const FlowControls = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  viewMode,
  onViewModeChange
}: FlowControlsProps) => {
  const categories = [
    { id: 'education', name: 'Education', color: 'civic' },
    { id: 'infrastructure', name: 'Infrastructure', color: 'teal' },
    { id: 'healthcare', name: 'Healthcare', color: 'gold' },
    { id: 'safety', name: 'Public Safety', color: 'civic' }
  ];

  return (
    <Card className="glass border-0 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search spending streams..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 glass-light border-0 text-foreground placeholder:text-muted-foreground 
                     focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(null)}
            className={`glass-light border-0 ${
              selectedCategory === null 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'text-foreground hover:bg-primary/10'
            }`}
          >
            <Filter className="w-3 h-3 mr-1" />
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(
                selectedCategory === category.id ? null : category.id
              )}
              className={`glass-light border-0 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-foreground hover:bg-primary/10'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'flow' ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange('flow')}
            className={`glass-light border-0 ${
              viewMode === 'flow'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-primary/10'
            }`}
          >
            <Eye className="w-3 h-3 mr-1" />
            Flow
          </Button>
          
          <Button
            variant={viewMode === 'comparison' ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange('comparison')}
            className={`glass-light border-0 ${
              viewMode === 'comparison'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-primary/10'
            }`}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Compare
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FlowControls;