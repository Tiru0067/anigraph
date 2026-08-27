import { Link } from 'react-router-dom';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
      <section className="max-w-4xl mx-auto flex flex-col items-center" aria-label="Hero Section">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/15 border border-primary-400/30 text-primary-200 text-xs font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary-300" />
          <span>Graph-Powered Recommendation Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-typography-100 max-w-3xl mb-4">
          Explore Anime via <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-200 to-primary-100">Knowledge Graph</span>
        </h1>

        <p className="text-typography-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Discover anime through shared creative directors, animation studios, and deep thematic tag rankings using live graph database traversals.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-typography-000 font-medium text-sm transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-400/40"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
