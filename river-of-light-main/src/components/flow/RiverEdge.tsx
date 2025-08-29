import { memo } from 'react';
import { BaseEdge, getBezierPath, EdgeProps } from '@xyflow/react';

const RiverEdge = memo((props: EdgeProps) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
  } = props;
  
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.4,
  });

  const colorStrokes = {
    civic: '#4285F4',
    teal: '#17A2B8',
    gold: '#FFC107'
  };

  // Type guard for edge data
  const edgeData = data as { color?: 'civic' | 'teal' | 'gold'; amount?: number } | undefined;
  const strokeColor = edgeData?.color ? colorStrokes[edgeData.color] : colorStrokes.civic;
  const strokeWidth = Math.max(2, Math.min(8, (edgeData?.amount || 0) / 50000000));

  return (
    <>
      {/* Gradient definitions */}
      <defs>
        <linearGradient id={`riverGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="50%" stopColor={strokeColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.3" />
        </linearGradient>
        
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Glow effect */}
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          stroke: strokeColor,
          strokeWidth: strokeWidth + 2,
          opacity: 0.3,
          filter: `url(#glow-${id})`,
        }}
      />

      {/* Main river flow */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: `url(#riverGradient-${id})`,
          strokeWidth,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
        className="animate-flow-pulse"
      />

      {/* Flowing particles along the edge */}
      <circle
        r="2"
        fill={strokeColor}
        className="animate-particle-drift opacity-60"
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={edgePath}
        />
      </circle>
      
      <circle
        r="1.5"
        fill="white"
        className="opacity-80"
      >
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
          path={edgePath}
        />
      </circle>
    </>
  );
});

RiverEdge.displayName = 'RiverEdge';

export default RiverEdge;