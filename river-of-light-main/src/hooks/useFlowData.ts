import { useMemo } from 'react';
import { mockSpendingData, totalBudget } from '@/data/mockSpendingData';
import { FlowNode, FlowEdge } from '@/types/spending';

export const useFlowData = (searchTerm: string, selectedCategory: string | null) => {
  const { nodes, edges } = useMemo(() => {
    const filteredData = mockSpendingData.filter(category => {
      const matchesSearch = searchTerm === '' || 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || category.id === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const nodes: FlowNode[] = [];
    const edges: FlowEdge[] = [];

    // Create source node (total budget)
    nodes.push({
      id: 'source',
      type: 'source',
      data: {
        label: 'Total Budget',
        amount: totalBudget,
        color: 'civic',
        description: 'Annual government spending allocation'
      },
      position: { x: 100, y: 300 }
    });

    // Create category nodes and edges from source
    filteredData.forEach((category, categoryIndex) => {
      const categoryY = 150 + categoryIndex * 200;
      
      // Category node
      nodes.push({
        id: category.id,
        type: 'category',
        data: {
          label: category.name,
          amount: category.amount,
          percentage: category.percentage,
          color: category.color,
          description: category.description
        },
        position: { x: 500, y: categoryY }
      });

      // Edge from source to category
      edges.push({
        id: `source-${category.id}`,
        source: 'source',
        target: category.id,
        type: 'river',
        data: {
          amount: category.amount,
          color: category.color
        },
        animated: true
      });

      // Create subcategory nodes and edges
      if (category.subcategories) {
        category.subcategories.forEach((subcategory, subIndex) => {
          const subcategoryId = `${category.id}-${subcategory.id}`;
          const subcategoryY = categoryY - 80 + subIndex * 160;
          
          // Subcategory node
          nodes.push({
            id: subcategoryId,
            type: 'subcategory',
            data: {
              label: subcategory.name,
              amount: subcategory.amount,
              percentage: subcategory.percentage,
              color: category.color,
              description: `${subcategory.projects.length} active projects`
            },
            position: { x: 900, y: subcategoryY }
          });

          // Edge from category to subcategory
          edges.push({
            id: `${category.id}-${subcategoryId}`,
            source: category.id,
            target: subcategoryId,
            type: 'river',
            data: {
              amount: subcategory.amount,
              color: category.color
            },
            animated: true
          });

          // Create project nodes and edges
          subcategory.projects.slice(0, 2).forEach((project, projectIndex) => {
            const projectId = `${subcategoryId}-${project.id}`;
            const projectY = subcategoryY - 40 + projectIndex * 80;
            
            // Project node
            nodes.push({
              id: projectId,
              type: 'project',
              data: {
                label: project.name,
                amount: project.amount,
                color: category.color,
                description: `${project.location} • ${project.status}`,
                status: project.status
              },
              position: { x: 1300, y: projectY }
            });

            // Edge from subcategory to project
            edges.push({
              id: `${subcategoryId}-${projectId}`,
              source: subcategoryId,
              target: projectId,
              type: 'river',
              data: {
                amount: project.amount,
                color: category.color
              },
              animated: true
            });
          });
        });
      }
    });

    return { nodes, edges };
  }, [searchTerm, selectedCategory]);

  return { nodes, edges };
};