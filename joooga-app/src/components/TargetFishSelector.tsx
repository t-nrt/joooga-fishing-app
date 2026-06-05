// src/components/TargetFishSelector.tsx
'use client';

import { FishingCondition } from '../lib/types';

interface TargetFishSelectorProps {
  value: FishingCondition;
  onChange: (condition: FishingCondition) => void;
  disabled?: boolean;
}

export default function TargetFishSelector({ value, onChange, disabled = false }: TargetFishSelectorProps) {
  const options = [
    { species: 'grey' as const, name: 'グレ専用', description: '(デフォルト・推薦)' },
    { species: 'blacksea' as const, name: 'チヌ狙い', description: '(チヌ特化)' },
    { species: 'jackfish' as const, name: '磯釣り全般', description: '(グレ+チヌ+イサキ等)' },
    { species: 'migrating' as const, name: '回遊系狙い', description: '(イサキ・アジ・サバ中心)' }
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        対象魚種
      </label>
      <select
        value={value.species}
        onChange={(e) => {
          const selected = options.find(opt => opt.species === e.target.value);
          if (selected) {
            onChange({
              species: selected.species,
              speciesName: selected.name
            });
          }
        }}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {options.map(option => (
          <option key={option.species} value={option.species}>
            {option.name} {option.description}
          </option>
        ))}
      </select>
    </div>
  );
}