import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Film, RotateCcw, AlertCircle } from 'lucide-react';
import { fetchAnimeList } from '../api/client.js';
import AnimeCard from '../components/common/AnimeCard.jsx';
import Pagination from '../components/common/Pagination.jsx';
import DiscoverFilters from '../components/discover/DiscoverFilters.jsx';

const PAGE_SIZE = 28;

export const DiscoverPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedFormat, setSelectedFormat] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('score');
  const [currentPage, setCurrentPage] = useState(1);

  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state if URL query param changes
  useEffect(() => {
    const urlQuery = searchParams.get('search') || '';
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Fetch anime list from backend
  useEffect(() => {
    let isMounted = true;
    const loadAnime = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch up to 250 items to enable client-side multi-filtering and instant sorting
        const res = await fetchAnimeList({ search: searchQuery.trim(), page: 1, limit: 250 });
        if (isMounted) {
          setAnimeList(res.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching anime:', err);
          setError('Failed to fetch anime from knowledge graph. Please check if the server is running.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(loadAnime, 300); // 300ms debounce
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Handle Search Input Change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Pipeline
  const filteredAndSortedAnime = useMemo(() => {
    let result = [...animeList];

    // Format Filter
    if (selectedFormat !== 'ALL') {
      result = result.filter((a) => a.format === selectedFormat);
    }

    // Genre Filter
    if (selectedGenre !== 'All') {
      result = result.filter(
        (a) => Array.isArray(a.genres) && a.genres.includes(selectedGenre)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'score') {
        return (b.averageScore || 0) - (a.averageScore || 0);
      }
      if (sortBy === 'year') {
        return (b.seasonYear || 0) - (a.seasonYear || 0);
      }
      if (sortBy === 'title') {
        const titleA = a.titleEnglish || a.titleRomaji || '';
        const titleB = b.titleEnglish || b.titleRomaji || '';
        return titleA.localeCompare(titleB);
      }
      return 0;
    });

    return result;
  }, [animeList, selectedFormat, selectedGenre, sortBy]);

  // Pagination Calculation
  const totalItems = filteredAndSortedAnime.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const paginatedAnime = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedAnime.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedAnime, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFormat('ALL');
    setSelectedGenre('All');
    setSortBy('score');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-background-400/25 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Catalog Explorer</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-typography-100">
            Discover Anime
          </h1>
        </div>

        <div className="text-xs text-typography-300">
          {!loading && (
            <span>
              Showing <strong className="text-typography-100 font-semibold">{totalItems}</strong> entries
            </span>
          )}
        </div>
      </header>

      {/* Filters & Search Toolbar */}
      <DiscoverFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        selectedFormat={selectedFormat}
        onFormatChange={(fmt) => {
          setSelectedFormat(fmt);
          setCurrentPage(1);
        }}
        selectedGenre={selectedGenre}
        onGenreChange={(gnr) => {
          setSelectedGenre(gnr);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-center gap-2 mb-6">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton Grid */}
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2.5 sm:gap-3">
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
      ) : paginatedAnime.length > 0 ? (
        /* Anime Grid */
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-5">
          {paginatedAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-12 text-center my-6 flex flex-col items-center">
          <Film className="w-10 h-10 text-typography-400/60 mb-3" />
          <h2 className="text-base font-bold text-typography-100 mb-1">No anime found</h2>
          <p className="text-xs text-typography-300 max-w-sm mb-5">
            We couldn&apos;t find any anime matching your current search query or filter criteria in the graph database.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-400 text-typography-000 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DiscoverPage;
