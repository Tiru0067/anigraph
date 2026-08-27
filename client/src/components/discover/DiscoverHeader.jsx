import { Compass } from "lucide-react";

export const DiscoverHeader = ({ totalItems = 0, loading = false }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-background-400/25 mb-6">
      <div>
        <div className="flex items-center gap-1.5 text-primary-300 text-[11.5px] font-semibold uppercase tracking-wider mb-1">
          <Compass className="mb-0.5 w-3.25 h-3.25" />
          <span>Catalog Explorer</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-typography-100">
          Discover Anime
        </h1>
      </div>

      <div className="text-xs text-typography-300">
        {!loading && (
          <span>
            Showing{" "}
            <strong className="text-typography-100 font-semibold">
              {totalItems}
            </strong>{" "}
            entries
          </span>
        )}
      </div>
    </header>
  );
};

export default DiscoverHeader;
