import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { fetchAnimeList } from "../api/client.js";
import Pagination from "../components/common/Pagination.jsx";
import DiscoverHeader from "../components/discover/DiscoverHeader.jsx";
import DiscoverFilters from "../components/discover/DiscoverFilters.jsx";
import DiscoverGrid from "../components/discover/DiscoverGrid.jsx";

const PAGE_SIZE = 28;

export const DiscoverPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const [selectedFormat, setSelectedFormat] = useState("ALL");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("score");
  const [currentPage, setCurrentPage] = useState(1);

  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync search input if URL changes externally
  if (prevUrlSearch !== urlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchInput(urlSearch);
    setCurrentPage(1);
  }

  // Fetch anime list from backend when search parameter changes
  useEffect(() => {
    let isMounted = true;
    const loadAnime = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryTerm = urlSearch.trim();
        const res = await fetchAnimeList({
          search: queryTerm,
          page: 1,
          limit: 250,
        });
        if (isMounted) {
          setAnimeList(res.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching anime:", err);
          setError(
            "Failed to fetch anime from knowledge graph. Please check if the server is running.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnime();
    return () => {
      isMounted = false;
    };
  }, [urlSearch]);

  // Handle Search Input Change (typing only)
  const handleSearchInputChange = (val) => {
    setSearchInput(val);
  };

  // Handle Search Form Submit (triggers search on Enter or button click)
  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = searchInput.trim();
    setCurrentPage(1);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  // Handle Clear Search
  const handleSearchClear = () => {
    setSearchInput("");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Handle Genre Toggle (Multi-select)
  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
    setCurrentPage(1);
  };

  // Handle Genre Clear (Reset to All)
  const handleGenreClear = () => {
    setSelectedGenres([]);
    setCurrentPage(1);
  };

  // Filter & Sort Pipeline
  const filteredAndSortedAnime = useMemo(() => {
    let result = [...animeList];

    // Format Filter
    if (selectedFormat !== "ALL") {
      result = result.filter((a) => a.format === selectedFormat);
    }

    // Genre Filter (Multi-select: Anime must contain all selected genres)
    if (selectedGenres.length > 0) {
      result = result.filter(
        (a) =>
          Array.isArray(a.genres) &&
          selectedGenres.every((g) => a.genres.includes(g)),
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "score") {
        return (b.averageScore || 0) - (a.averageScore || 0);
      }
      if (sortBy === "year") {
        return (b.seasonYear || 0) - (a.seasonYear || 0);
      }
      if (sortBy === "title") {
        const titleA = a.titleEnglish || a.titleRomaji || "";
        const titleB = b.titleEnglish || b.titleRomaji || "";
        return titleA.localeCompare(titleB);
      }
      return 0;
    });

    return result;
  }, [animeList, selectedFormat, selectedGenres, sortBy]);

  // Pagination Calculation
  const totalItems = filteredAndSortedAnime.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const paginatedAnime = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedAnime.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedAnime, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSelectedFormat("ALL");
    setSelectedGenres([]);
    setSortBy("score");
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      {/* Header */}
      <DiscoverHeader totalItems={totalItems} loading={loading} />

      {/* Filters & Search Toolbar */}
      <DiscoverFilters
        searchInput={searchInput}
        onSearchInputChange={handleSearchInputChange}
        onSearchSubmit={handleSearchSubmit}
        onSearchClear={handleSearchClear}
        selectedFormat={selectedFormat}
        onFormatChange={(fmt) => {
          setSelectedFormat(fmt);
          setCurrentPage(1);
        }}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
        onGenreClear={handleGenreClear}
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

      {/* Grid & States */}
      <DiscoverGrid
        loading={loading}
        animeList={paginatedAnime}
        onResetFilters={handleResetFilters}
      />

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
