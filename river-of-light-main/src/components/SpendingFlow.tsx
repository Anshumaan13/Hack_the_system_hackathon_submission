import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeTypes,
  EdgeTypes,
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import RiverNode from './flow/RiverNode';
import RiverEdge from './flow/RiverEdge';
import FlowControls from './flow/FlowControls';
import ComparisonView from './comparison/ComparisonView';
import { useFlowData } from '@/hooks/useFlowData';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

const nodeTypes: NodeTypes = {
  source: RiverNode,
  category: RiverNode,
  subcategory: RiverNode,
  project: RiverNode,
};

const edgeTypes: EdgeTypes = {
  river: RiverEdge,
};

const SpendingFlow = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'comparison'>('flow');
  
  const { nodes: initialNodes, edges: initialEdges } = useFlowData(searchTerm, selectedCategory);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when data changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback((params: any) => {
    // Custom connection logic if needed
  }, []);

  return (
    <div className="h-screen w-full bg-background relative overflow-hidden">
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-90" />
      
      {/* Header */}
      <div className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold heading-flow mb-4">
              Rivers of Progress
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Trace the flow of every dollar through our government spending ecosystem. 
              Watch as budget streams flow from source to community impact.
            </p>
          </div>
          
          <FlowControls
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-[calc(100vh-300px)]">
        <Card className="h-full glass border-0 mx-6 overflow-hidden">
          {viewMode === 'flow' ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={{
                padding: 0.2,
                includeHiddenNodes: false,
              }}
              connectionLineType={ConnectionLineType.Bezier}
              defaultMarkerColor="#4285F4"
              style={{ 
                background: 'transparent'
              }}
              proOptions={{ hideAttribution: true }}
            >
              <Background 
                color="#ffffff10" 
                gap={20} 
                size={1}
              />
              
              <Controls 
                className="glass-light border-0 shadow-lg"
                showInteractive={false}
              />
              
              <MiniMap 
                nodeColor={(node) => {
                  if (node.data?.color === 'civic') return '#4285F4';
                  if (node.data?.color === 'teal') return '#17A2B8';
                  if (node.data?.color === 'gold') return '#FFC107';
                  return '#4285F4';
                }}
                className="glass-light border-0 shadow-lg"
                style={{
                  backgroundColor: 'transparent',
                }}
              />
            </ReactFlow>
          ) : (
            <ScrollArea className="h-full">
              <ComparisonView 
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />
            </ScrollArea>
          )}
        </Card>
      </div>

      {/* Floating summary stats */}
      <div className="absolute bottom-6 left-6 z-20">
        <Card className="glass border-0 p-4 max-w-sm">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Total Annual Budget</p>
            <p className="text-2xl font-bold heading-flow">$2.43B</p>
            <div className="flex justify-between mt-3 text-xs">
              <span className="text-civic">Education: 35%</span>
              <span className="text-teal">Infrastructure: 28%</span>
              <span className="text-gold">Health: 22%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpendingFlow;