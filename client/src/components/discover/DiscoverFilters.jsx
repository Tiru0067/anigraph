import { Search, X, Filter, ArrowUpDown } from 'lucide-react';

const FORMATS = ['ALL', 'TV', 'MOVIE', 'OVA', 'ONA'];

const GENRES = [
  'All',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Supernatural',
  'Thriller'
];

export const DiscoverFilters = ({
  searchQuery,
  onSearchChange,
  onSearchClear,
  selectedFormat,
  onFormatChange,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Top Row: Search Input & Format Filter & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-typography-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles, studios (e.g. WIT, MAPPA), directors, tags..."
            className="w-full bg-background-200 border border-background-400/30 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-typography-100 placeholder:text-typography-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-500/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onSearchClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-typography-400 hover:text-typography-100 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right controls: Format tabs + Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Format Tabs */}
          <div className="inline-flex rounded-xl bg-background-200 border border-background-400/30 p-0.5">
            {FORMATS.map((format) => {
              const isSelected = selectedFormat === format;
              return (
                <button
                  key={format}
                  type="button"
                  onClick={() => onFormatChange(format)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-500 text-typography-000 shadow-sm'
                      : 'text-typography-300 hover:text-typography-100 hover:bg-background-300'
                  }`}
                >
                  {format}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="relative inline-flex items-center">
            <div className="absolute left-2.5 pointer-events-none text-typography-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-background-200 border border-background-400/30 text-typography-200 text-xs rounded-xl pl-8 pr-7 py-1.75 appearance-none focus:outline-none focus:border-primary-400 cursor-pointer"
            >
              <option value="score">Top Score</option>
              <option value="year">Newest Year</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Row: Genre Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-typography-400 text-[11px] font-semibold uppercase tracking-wider mr-1 flex items-center gap-1 flex-shrink-0">
          <Filter className="w-3 h-3 text-primary-300" />
          Genres:
        </span>
        {GENRES.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreChange(genre)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer flex-shrink-0 ${
                isSelected
                  ? 'bg-primary-500/20 text-primary-100 border-primary-400/50 shadow-sm'
                  : 'bg-background-200/80 border-background-400/30 text-typography-300 hover:text-typography-100 hover:bg-background-300'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverFilters;
