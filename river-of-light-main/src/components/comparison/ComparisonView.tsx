import { Card } from '@/components/ui/card';
import { mockSpendingData } from '@/data/mockSpendingData';
import { formatCurrency } from '@/lib/formatters';
import { Progress } from '@/components/ui/progress';

interface ComparisonViewProps {
  searchTerm: string;
  selectedCategory: string | null;
}

const ComparisonView = ({ searchTerm, selectedCategory }: ComparisonViewProps) => {
  const filteredData = mockSpendingData.filter(category => {
    const matchesSearch = searchTerm === '' || 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalBudget = filteredData.reduce((sum, cat) => sum + cat.amount, 0);

  const colorClasses = {
    civic: 'from-civic to-civic-light',
    teal: 'from-teal to-teal-light', 
    gold: 'from-gold to-gold-light'
  };

  return (
    <div className="space-y-6 p-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass border-0 p-6 text-center">
          <div className="text-2xl font-bold heading-flow mb-2">
            {formatCurrency(totalBudget)}
          </div>
          <p className="text-sm text-muted-foreground">Total Budget</p>
        </Card>
        
        <Card className="glass border-0 p-6 text-center">
          <div className="text-2xl font-bold text-civic mb-2">
            {filteredData.length}
          </div>
          <p className="text-sm text-muted-foreground">Categories</p>
        </Card>
        
        <Card className="glass border-0 p-6 text-center">
          <div className="text-2xl font-bold text-teal mb-2">
            {filteredData.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)}
          </div>
          <p className="text-sm text-muted-foreground">Programs</p>
        </Card>
        
        <Card className="glass border-0 p-6 text-center">
          <div className="text-2xl font-bold text-gold mb-2">
            {filteredData.reduce((sum, cat) => 
              sum + (cat.subcategories?.reduce((subSum, sub) => subSum + sub.projects.length, 0) || 0), 0
            )}
          </div>
          <p className="text-sm text-muted-foreground">Projects</p>
        </Card>
      </div>

      {/* Category Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold heading-flow mb-6">Budget Allocation</h2>
        
        {filteredData.map((category) => (
          <Card key={category.id} className="glass border-0 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colorClasses[category.color]}`} />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-foreground">
                  {formatCurrency(category.amount)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {category.percentage}% of budget
                </div>
              </div>
            </div>
            
            <Progress 
              value={category.percentage} 
              className="h-3 mb-4"
            />
            
            {/* Subcategories */}
            {category.subcategories && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {category.subcategories.map((sub) => (
                  <div key={sub.id} className="glass-light rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{sub.name}</h4>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(sub.amount)}
                      </span>
                    </div>
                    <Progress 
                      value={sub.percentage} 
                      className="h-2 mb-3"
                    />
                    <div className="space-y-2">
                      {sub.projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground truncate flex-1 mr-2">
                            {project.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-foreground font-medium">
                              {formatCurrency(project.amount)}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                              ${project.status === 'active' ? 'bg-green-500/20 text-green-300' : 
                                project.status === 'completed' ? 'bg-blue-500/20 text-blue-300' : 
                                'bg-yellow-500/20 text-yellow-300'}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      {sub.projects.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{sub.projects.length - 3} more projects
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComparisonView;