import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { fetchAnimeById, fetchAnimeRecommendations } from "../api/client.js";
import DetailHeroBanner from "../components/detail/DetailHeroBanner.jsx";
import DetailSynopsis from "../components/detail/DetailSynopsis.jsx";
import DetailMetadataSidebar from "../components/detail/DetailMetadataSidebar.jsx";
import DetailCastList from "../components/detail/DetailCastList.jsx";
import DetailRecommendations from "../components/detail/DetailRecommendations.jsx";
import DetailSkeleton from "../components/detail/DetailSkeleton.jsx";

export const AnimeDetailPage = () => {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when navigating to an anime
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Fetch anime details and recommendations concurrently
  useEffect(() => {
    let isMounted = true;

    const loadAnimeData = async () => {
      if (!id) return;
      setLoading(true);
      setRecLoading(true);
      setError(null);

      // 1. Fetch Primary Details
      try {
        const detailsRes = await fetchAnimeById(id);
        if (isMounted) {
          if (detailsRes.success && detailsRes.data) {
            setAnime(detailsRes.data);
          } else {
            setError(`Anime #${id} was not found.`);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching anime details:", err);
          setError(
            `Failed to load anime #${id}. Please check your connection.`,
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }

      // 2. Fetch Graph Recommendations
      try {
        const recRes = await fetchAnimeRecommendations(id, 6);
        if (isMounted) {
          if (recRes.success && Array.isArray(recRes.data)) {
            setRecommendations(recRes.data);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Error fetching recommendations:", err);
          // Recommendations failure is non-blocking for details view
        }
      } finally {
        if (isMounted) {
          setRecLoading(false);
        }
      }
    };

    loadAnimeData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading State
  if (loading) {
    return <DetailSkeleton />;
  }

  // Error State
  if (error || !anime) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-typography-100 mb-2">
          Anime Not Found
        </h1>
        <p className="text-xs sm:text-sm text-typography-300 max-w-md mb-6">
          {error || `We couldn't find the requested anime.`}
        </p>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-typography-000 text-xs font-semibold transition-all shadow-md shadow-primary-500/20 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog Explorer</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col pb-16">
      {/* Top Banner Hero */}
      <DetailHeroBanner anime={anime} />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area (Synopsis, Graph Recommendations, Character Cast) */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Synopsis */}
            <DetailSynopsis description={anime.description} />

            {/* Multi-Hop Graph Recommendations */}
            <DetailRecommendations
              recommendations={recommendations}
              loading={recLoading}
            />

            {/* Cast & Voice Actors */}
            <DetailCastList cast={anime.cast} />
          </div>

          {/* Sidebar Area (Graph Node Metadata, Studios, Directors, Tags) */}
          <div className="lg:col-span-1">
            <DetailMetadataSidebar anime={anime} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimeDetailPage;
