import { Compass } from 'lucide-react';

export const DiscoverPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-background-400/30 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary-300 text-sm font-medium mb-1">
            <Compass className="w-4 h-4" />
            <span>Discover & Search</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-typography-100">
            Anime Catalog & Exploration
          </h1>
        </div>
      </header>

      <section aria-label="Catalog Content" className="rounded-2xl border border-background-400/30 bg-background-100/60 p-8 text-center text-typography-300">
        <p>Discover page skeleton — Search, filters, and anime catalog grid will be built here.</p>
      </section>
    </div>
  );
};

export default DiscoverPage;
