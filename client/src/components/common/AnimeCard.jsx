import { Link } from 'react-router-dom';
import { Star, ArrowRight, Film } from 'lucide-react';

export const AnimeCard = ({ anime }) => {
  const cover = typeof anime.coverImage === 'string'
    ? anime.coverImage
    : (anime.coverImage?.large || anime.coverImage?.extraLarge || '');

  return (
    <Link
      to={`/anime/${anime.id}`}
      className="group flex flex-col cursor-pointer"
    >
      {/* Compact Poster Container */}
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-background-200 border border-background-400/25 group-hover:border-primary-400/60 transition-colors">
        {cover ? (
          <img
            src={cover}
            alt={anime.titleEnglish || anime.titleRomaji || 'Anime Poster'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-typography-400">
            <Film className="w-5 h-5 opacity-40" />
          </div>
        )}

        {/* Score Badge (Top Right) */}
        {anime.averageScore ? (
          <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-background-000/80 backdrop-blur-md border border-white/10 flex items-center gap-0.5 text-[9px] font-bold text-amber-300">
            <Star className="w-2 h-2 fill-amber-300 mr-px" />
            <span>{(anime.averageScore / 10).toFixed(1)}</span>
          </div>
        ) : null}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background-000/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-1.5">
          <span className="text-[9.5px] font-medium text-primary-200 flex items-center gap-0.5">
            <span>View details</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

      {/* Compact Typography */}
      <div className="pt-2 flex flex-col gap-1">
        <h3
          className="text-[14px] font-medium text-typography-100 line-clamp-2 leading-tight mt-0.5 group-hover:text-primary-300 transition-colors"
          title={anime.titleEnglish || anime.titleRomaji}
        >
          {anime.titleEnglish || anime.titleRomaji}
        </h3>

        <div className="flex items-center text-[11px] text-typography-300">
          {`${anime.format || ''} • ${anime.seasonYear || ''}`}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
