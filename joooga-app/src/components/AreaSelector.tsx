// src/components/AreaSelector.tsx
'use client';

interface AreaSelectorProps {
  value: string;
  onChange: (area: string) => void;
  disabled?: boolean;
}

export default function AreaSelector({ value, onChange, disabled = false }: AreaSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        エリア選択
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="jogashima">城ヶ島</option>
        <option value="miura" disabled>三浦半島全体 (Phase 2)</option>
        <option value="sagami" disabled>相模湾エリア (Phase 2)</option>
        <option value="chiba" disabled>千葉エリア (Phase 2)</option>
      </select>
    </div>
  );
}