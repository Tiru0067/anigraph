import { Film, RotateCcw } from "lucide-react";

export const DiscoverEmptyState = ({ onReset }) => {
  return (
    <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-12 text-center my-6 flex flex-col items-center justify-center min-h-[45vh]">
      <Film className="w-10 h-10 text-typography-400/60 mb-3" />
      <h2 className="text-base font-bold text-typography-100 mb-1">
        No anime found
      </h2>
      <p className="text-xs text-typography-300 max-w-sm mb-5">
        We couldn&apos;t find any anime matching your current search query or
        filter criteria in the graph database.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-400 text-typography-000 text-xs font-semibold transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
};

export default DiscoverEmptyState;
