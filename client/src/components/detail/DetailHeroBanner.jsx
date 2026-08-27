import { Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';

export const DetailHeroBanner = ({ anime }) => {
  const cover = typeof anime.coverImage === 'string'
    ? anime.coverImage
    : (anime.coverImage?.extraLarge || anime.coverImage?.large || '');

  const banner = anime.bannerImage || cover;

  const quickStats = [
    anime.format || 'Anime',
    anime.seasonYear,
    anime.episodes ? `${anime.episodes} ${anime.episodes === 1 ? 'Episode' : 'Episodes'}` : null
  ].filter(Boolean);

  return (
    <div className="relative w-full overflow-hidden bg-background-100 pb-6 -mt-16 sm:-mt-20">
      {/* Background Banner Image with Clear Top and Smooth Bottom Gradient */}
      <div className="relative w-full h-56 sm:h-78 overflow-hidden bg-background-000">
        {banner ? (
          <img
            src={banner}
            alt={anime.titleEnglish || anime.titleRomaji || 'Anime Banner'}
            className="w-full h-full object-cover object-center opacity-90 sm:opacity-100"
          />
        ) : (
          <div className="w-full h-full bg-radial from-primary-900/40 via-background-100 to-background-000" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background-100 via-background-100/40 via-40% to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl flex flex-col sm:flex-row sm:gap-5 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="-mt-30 sm:-mt-28 md:-mt-35 lg:-mt-40">
          {/* Navigation Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <Link
              to="/discover"
              className="inline-flex items-center gap-1.5 text-shadow-lg text-xs font-medium text-typography-200 hover:text-typography-100 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Discover</span>
            </Link>
          </nav>

          {/* Poster Image */}
          <div className="relative w-26 sm:w-32 md:w-46 aspect-2/3 shrink-0 rounded-md overflow-hidden bg-background-200">
            {cover ? (
              <img
                src={cover}
                alt={anime.titleEnglish || anime.titleRomaji || 'Anime Poster'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-typography-400">
                <Film className="w-8 h-8 opacity-40" />
              </div>
            )}
          </div>
        </div>

        {/* Titles & Quick Metadata */}
        <div className="flex-1 flex flex-col mt-5">
          {/* Main Title */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold font-display text-typography-100 tracking-tight mb-1 leading-tight">
            {anime.titleEnglish || anime.titleRomaji}
          </h1>

          {/* Subtitle (Romaji / Native) */}
          {anime.titleEnglish && anime.titleRomaji && anime.titleEnglish !== anime.titleRomaji && (
            <p className="text-xs md:text-sm text-typography-300 mb-2 font-medium">
              {anime.titleRomaji}
            </p>
          )}

          {/* Quick Stats Badges */}
          {quickStats.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {quickStats.map((stat, idx) => (
                <span
                  key={`stat-${idx}`}
                  className="px-2.5 py-0.5 rounded-md bg-background-200/80 border border-background-400/30 text-typography-300 text-[11px] font-medium"
                >
                  {stat}
                </span>
              ))}
            </div>
          )}

          {/* Genres Pills */}
          {Array.isArray(anime.genres) && anime.genres.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-0.5 rounded-md bg-primary-500/10 border border-primary-400/25 text-xs text-primary-200 font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailHeroBanner;
