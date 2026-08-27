import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStats, fetchAnimeList } from '../api/client.js';
import { FALLBACK_ANIME } from '../constants/homeData.js';
import HeroSection from '../components/home/HeroSection.jsx';
import AnimeMarqueeWall from '../components/home/AnimeMarqueeWall.jsx';
import StatsShowcase from '../components/home/StatsShowcase.jsx';
import GraphFeatures from '../components/home/GraphFeatures.jsx';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [row1Anime, setRow1Anime] = useState(() =>
    FALLBACK_ANIME.filter((_, idx) => idx % 2 === 0)
  );
  const [row2Anime, setRow2Anime] = useState(() =>
    FALLBACK_ANIME.filter((_, idx) => idx % 2 !== 0)
  );
  const [stats, setStats] = useState({
    totalAnime: 100,
    totalStudios: 25,
    totalGenres: 80,
    totalRelationships: 500
  });

  useEffect(() => {
    // 1. Fetch live database stats
    const loadStats = async () => {
      try {
        const res = await fetchStats();
        if (res && res.data) {
          setStats({
            totalAnime: res.data.totalAnime || 100,
            totalStudios: res.data.totalStudios || 25,
            totalGenres: res.data.totalGenres || 80,
            totalRelationships: res.data.totalRelationships || 500
          });
        }
      } catch (err) {
        console.debug('Using cached stats data:', err.message);
      }
    };

    // 2. Fetch anime from backend, shuffle them, and split into even (row 1) and odd (row 2)
    const loadAnimeShowcase = async () => {
      try {
        const res = await fetchAnimeList({ limit: 40 });
        if (res && res.data && res.data.length > 0) {
          const shuffled = [...res.data].sort(() => Math.random() - 0.5);
          const evenItems = shuffled.filter((_, idx) => idx % 2 === 0);
          const oddItems = shuffled.filter((_, idx) => idx % 2 !== 0);

          if (evenItems.length > 0) setRow1Anime(evenItems);
          if (oddItems.length > 0) setRow2Anime(oddItems);
        }
      } catch (err) {
        console.debug('Using fallback anime for marquee:', err.message);
      }
    };

    loadStats();
    loadAnimeShowcase();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/discover');
    }
  };

  const handleQuickSearch = (term) => {
    navigate(`/discover?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onQuickSearch={handleQuickSearch}
        totalAnime={stats.totalAnime}
      />

      <AnimeMarqueeWall
        row1Anime={row1Anime}
        row2Anime={row2Anime}
      />

      <StatsShowcase stats={stats} />

      <GraphFeatures />
    </div>
  );
};

export default HomePage;
