import { motion } from 'motion/react';
import { Search, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { POPULAR_SEARCHES } from '../../constants/homeData.js';

export const HeroSection = ({ searchQuery, setSearchQuery, onSearchSubmit, onQuickSearch, totalAnime = 100 }) => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6 flex flex-col items-center text-center relative z-10">
      {/* Glow badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/15 border border-primary-400/30 text-primary-200 text-[11px] font-semibold tracking-wide uppercase mb-4 shadow-sm backdrop-blur-md"
      >
        <Sparkles className="w-3 h-3 text-primary-300 animate-pulse" />
        <span>Graph Traversal & Staff Recommendation Engine</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-typography-100 max-w-3xl mb-3 leading-tight"
      >
        {totalAnime}+ Anime Entries <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-primary-300 to-primary-100">
          Connected as a Knowledge Graph
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-typography-300 text-xs sm:text-sm max-w-xl mb-6 leading-relaxed"
      >
        Explore anime connections across shared animation studios, creative directors, voice actors, and ranked thematic tags using openCypher graph traversals.
      </motion.p>

      {/* Compact Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-lg mb-3"
      >
        <form
          onSubmit={onSearchSubmit}
          className="relative flex items-center rounded-xl bg-background-200/90 border border-background-400/40 shadow-xl shadow-background-000/50 backdrop-blur-xl p-1 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all group"
        >
          <div className="pl-3 pr-1 text-typography-300 group-focus-within:text-primary-300 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime, studios (e.g. WIT Studio), directors, tags..."
            className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-typography-100 placeholder:text-typography-400 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-400 text-typography-000 font-semibold text-xs transition-all shadow-sm shadow-primary-500/25 cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Popular Search Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px]">
          <span className="text-typography-400 font-medium flex items-center gap-1 text-[11px]">
            <Flame className="w-3 h-3 text-primary-300" />
            Popular:
          </span>
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onQuickSearch(tag)}
              className="px-2 py-0.5 rounded-md bg-background-200 hover:bg-background-300 border border-background-400/30 text-typography-200 hover:text-typography-100 transition-all cursor-pointer text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
