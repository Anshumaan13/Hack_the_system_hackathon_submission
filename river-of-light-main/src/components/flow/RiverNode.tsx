import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { formatCurrency } from '@/lib/formatters';

const RiverNode = memo((props: NodeProps) => {
  const { data } = props;
  
  // Type guard to ensure data has the expected structure
  if (!data || typeof data !== 'object' || 
      !('label' in data) || !('amount' in data) || !('color' in data)) {
    return <div>Invalid node data</div>;
  }

  const nodeData = data as {
    label: string;
    amount: number;
    percentage?: number;
    color: 'civic' | 'teal' | 'gold';
    description?: string;
    status?: string;
  };
  
  const colorClasses = {
    civic: 'from-civic to-civic-light border-civic/20 shadow-civic/30',
    teal: 'from-teal to-teal-light border-teal/20 shadow-teal/30',
    gold: 'from-gold to-gold-light border-gold/20 shadow-gold/30'
  };

  const glowClasses = {
    civic: 'drop-shadow-glow-civic',
    teal: 'drop-shadow-glow-teal',
    gold: 'drop-shadow-glow-gold'
  };

  return (
    <div className={`glass rounded-2xl p-4 min-w-[200px] max-w-[280px] 
                    bg-gradient-to-br ${colorClasses[nodeData.color]} 
                    ${glowClasses[nodeData.color]}
                    border transition-all duration-300 hover:scale-105
                    hover:shadow-2xl group relative overflow-hidden`}>
      
      {/* Flowing particle overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="particle absolute top-2 left-4 w-1 h-1 bg-white rounded-full"></div>
        <div className="particle absolute top-6 left-12 w-0.5 h-0.5 bg-white rounded-full" style={{ animationDelay: '1s' }}></div>
        <div className="particle absolute top-4 left-20 w-1 h-1 bg-white rounded-full" style={{ animationDelay: '2s' }}></div>
      </div>

      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-white/20 border-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white text-sm truncate pr-2">
            {nodeData.label}
          </h3>
          {nodeData.percentage && (
            <span className="text-white/80 text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full">
              {nodeData.percentage}%
            </span>
          )}
        </div>
        
        <div className="mb-3">
          <p className="text-white font-bold text-lg">
            {formatCurrency(nodeData.amount)}
          </p>
        </div>
        
        {nodeData.description && (
          <p className="text-white/70 text-xs leading-relaxed">
            {nodeData.description}
          </p>
        )}
        
        {nodeData.status && (
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium
              ${nodeData.status === 'active' ? 'bg-green-500/20 text-green-300' : 
                nodeData.status === 'completed' ? 'bg-blue-500/20 text-blue-300' : 
                'bg-yellow-500/20 text-yellow-300'}`}>
              {nodeData.status.charAt(0).toUpperCase() + nodeData.status.slice(1)}
            </span>
          </div>
        )}
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-white/20 border-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
});

RiverNode.displayName = 'RiverNode';

export default RiverNode;