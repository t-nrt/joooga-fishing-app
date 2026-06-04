// src/components/ResearchButton.tsx
'use client';

import LoadingSpinner from './LoadingSpinner';

interface ResearchButtonProps {
  onResearch: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function ResearchButton({ onResearch, loading, disabled = false }: ResearchButtonProps) {
  return (
    <button
      onClick={onResearch}
      disabled={disabled || loading}
      className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg
                 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:bg-gray-400 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2
                 transition duration-200"
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" className="border-white" />
          リサーチ中...
        </>
      ) : (
        'リサーチ実行'
      )}
    </button>
  );
}