import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const AnimeDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 text-sm text-typography-300 hover:text-typography-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </Link>
      </nav>

      <section aria-label="Anime Details" className="rounded-2xl border border-background-400/30 bg-background-100/60 p-8 text-center text-typography-300">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/15 text-primary-200 text-xs font-medium mb-3 border border-primary-400/30">
          <Sparkles className="w-3.5 h-3.5 text-primary-300" />
          <span>Anime ID: #{id}</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-typography-100 mb-2">Anime Details & Graph Recommendations</h1>
        <p className="text-typography-300">AniList-style banner, metadata sidebar, character cast, and graph recommendations will be built here.</p>
      </section>
    </div>
  );
};

export default AnimeDetailPage;
