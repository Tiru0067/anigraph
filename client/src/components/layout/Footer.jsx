import { Network, Database } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background-000 border-t border-background-400/20 py-10 mt-auto text-typography-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-typography-100">AniGraph</p>
            <p className="text-xs text-typography-400">
              Anime Knowledge Graph & Recommendation Engine
            </p>
          </div>
        </div>

        {/* Attribution & Tech Stack */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-typography-300">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-primary-300" />
            <span>
              Powered by <strong className="text-typography-100 font-medium">CognoDB Cloud</strong> & <strong className="text-typography-100 font-medium">AniList GraphQL</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
