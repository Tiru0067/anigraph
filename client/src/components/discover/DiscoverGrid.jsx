import AnimeCard from "../common/AnimeCard.jsx";
import DiscoverEmptyState from "./DiscoverEmptyState.jsx";

export const DiscoverGrid = ({
  loading = false,
  animeList = [],
  onResetFilters,
}) => {
  // Loading Skeleton State
  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-7 gap-2.5 sm:gap-3.5 min-h-[60vh] sm:min-h-[70vh] content-start">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="flex flex-col animate-pulse">
            <div className="aspect-2/3 w-full bg-background-200 rounded-lg border border-background-400/20" />
            <div className="pt-2 space-y-1">
              <div className="h-4 bg-background-200 rounded w-full" />
              <div className="mt-1 h-3 bg-background-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Zero results Empty State
  if (animeList.length === 0) {
    return <DiscoverEmptyState onReset={onResetFilters} />;
  }

  // Active Anime Cards Grid
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-7 gap-3 sm:gap-5 min-h-[60vh] sm:min-h-[70vh] content-start">
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
};

export default DiscoverGrid;
