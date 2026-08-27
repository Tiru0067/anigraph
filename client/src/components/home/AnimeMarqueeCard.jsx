import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

export const AnimeMarqueeCard = ({ anime, uniqueKey }) => {
  const cover = typeof anime.coverImage === 'string'
    ? anime.coverImage
    : (anime.coverImage?.large || anime.coverImage?.extraLarge || '');
  const studioName = Array.isArray(anime.studios) && anime.studios.length > 0
    ? anime.studios[0]
    : (anime.studio || 'Studio');

  return (
    <Link
      to={`/anime/${anime.id}`}
      key={uniqueKey}
      className="group relative flex-shrink-0 w-28 sm:w-32 md:w-36 aspect-[2/3] rounded-xl overflow-hidden bg-background-200 border border-background-400/30 hover:border-primary-400/60 shadow-md hover:shadow-xl hover:shadow-primary-500/15 transition-all duration-300 hover:-translate-y-1"
    >
      <img
        src={cover}
        alt={anime.titleEnglish || anime.titleRomaji || 'Anime poster'}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Score badge top-right */}
      {anime.averageScore && (
        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-background-000/75 backdrop-blur-md border border-white/10 flex items-center gap-0.5 text-[10px] font-bold text-amber-300">
          <Star className="w-2.5 h-2.5 fill-amber-300" />
          <span>{anime.averageScore}</span>
        </div>
      )}
      {/* Gradient info overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-000 via-background-000/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-left">
        <span className="text-[9px] font-semibold text-primary-300 uppercase tracking-wider">
          {studioName}
        </span>
        <p className="text-[11px] font-bold text-typography-100 line-clamp-2 leading-tight">
          {anime.titleEnglish || anime.titleRomaji}
        </p>
        <div className="flex items-center justify-between text-[9px] text-typography-300 mt-1">
          <span>{anime.format || 'TV'} {anime.seasonYear ? `• ${anime.seasonYear}` : ''}</span>
          <span className="text-primary-300 font-medium flex items-center gap-0.5">
            Graph <ArrowRight className="w-2 h-2" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AnimeMarqueeCard;
