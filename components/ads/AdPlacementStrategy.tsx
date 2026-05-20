"use client";

import AdContainer from './AdContainer';

interface AdPlacementProps {
  pageType: 'calculator' | 'blog' | 'landing';
  position: 'above-content' | 'below-header' | 'mid-content' | 'below-content';
}

export default function AdPlacementStrategy({ pageType, position }: AdPlacementProps) {
  // Slot IDs optimized for different page types and positions
  const slotConfig = {
    calculator: {
      'above-content': { id: '7263945283', size: 'leaderboard' as const },
      'below-header': { id: '8194756829', size: 'rectangle' as const },
      'mid-content': { id: '4057982103', size: 'square' as const },
      'below-content': { id: '1475703853', size: 'rectangle' as const },
    },
    blog: {
      'above-content': { id: '3847192654', size: 'leaderboard' as const },
      'below-header': { id: '2956473819', size: 'rectangle' as const },
      'mid-content': { id: '5821640937', size: 'leaderboard' as const },
      'below-content': { id: '6374829105', size: 'rectangle' as const },
    },
    landing: {
      'above-content': { id: '1706594832', size: 'leaderboard' as const },
      'below-header': { id: '9284756301', size: 'rectangle' as const },
      'mid-content': { id: '4019283746', size: 'square' as const },
      'below-content': { id: '1475703853', size: 'rectangle' as const },
    },
  };

  const config = slotConfig[pageType][position];

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-4xl px-4">
        <AdContainer slotId={config.id} size={config.size} />
      </div>
    </div>
  );
}
