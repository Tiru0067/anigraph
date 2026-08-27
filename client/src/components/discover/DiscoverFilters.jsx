import { Search, X, Check, Filter, ArrowUpDown, Film } from 'lucide-react';
import CustomDropdown from '../common/CustomDropdown.jsx';

const FORMAT_OPTIONS = [
  { value: 'TV', label: 'TV' },
  { value: 'MOVIE', label: 'Movie' },
  { value: 'OVA', label: 'OVA' },
  { value: 'ONA', label: 'ONA' }
];

const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
];

const SORT_OPTIONS = [
  { value: 'score', label: 'Top Score' },
  { value: 'year', label: 'Newest Year' },
  { value: 'title', label: 'Title (A-Z)' }
];

export const DiscoverFilters = ({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  onSearchClear,
  selectedFormat,
  onFormatChange,
  selectedGenres = [],
  onGenreToggle,
  onGenreClear,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Top Row: Search Input & Format Filter & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar Form */}
        <form onSubmit={onSearchSubmit} className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-typography-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder="Search titles, studios (e.g. WIT, MAPPA), directors, tags..."
            className="w-full bg-background-200 border border-background-400/30 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-typography-100 placeholder:text-typography-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-500/30 transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={onSearchClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-typography-400 hover:text-typography-100 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Right controls: Format Dropdown + Sort Dropdown */}
        <div className="flex items-center gap-2.5">
          {/* Custom Format Dropdown */}
          <CustomDropdown
            options={FORMAT_OPTIONS}
            value={selectedFormat}
            onChange={onFormatChange}
            placeholder="Format"
            allowDeselect={true}
            icon={Film}
          />

          {/* Custom Sort Dropdown */}
          <CustomDropdown
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={onSortChange}
            icon={ArrowUpDown}
          />
        </div>
      </div>

      {/* Bottom Row: Genre Pills */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-typography-400 text-xs font-semibold uppercase tracking-wider mr-1.5 flex items-center gap-1.5 flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-primary-300" />
          <span>Genres{selectedGenres.length > 0 ? ` (${selectedGenres.length})` : ''}:</span>
        </span>

        {/* All Pill */}
        <button
          type="button"
          onClick={onGenreClear}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer shrink-0 ${selectedGenres.length === 0
            ? 'bg-primary-500/20 text-primary-100 border-primary-400/50 shadow-sm'
            : 'bg-background-200/80 border-background-400/30 text-typography-300 hover:text-typography-100 hover:bg-background-300'
            }`}
        >
          All
        </button>

        {GENRES.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreToggle(genre)}
              className={`group px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer shrink-0 flex items-center gap-1.5 ${isSelected
                ? 'bg-primary-500/20 text-primary-100 border-primary-400/50 hover:bg-rose-500/15 hover:border-rose-400/40 hover:text-rose-200 shadow-sm'
                : 'bg-background-200/80 border-background-400/30 text-typography-300 hover:text-typography-100 hover:bg-background-300'
                }`}
            >
              <span>{genre}</span>
              {isSelected && (
                <span className="inline-flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-300 group-hover:hidden transition-transform" />
                  <X className="w-3 h-3 text-rose-300 hidden group-hover:block transition-transform" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverFilters;
