import AnimeMarqueeCard from './AnimeMarqueeCard.jsx';

export const AnimeMarqueeWall = ({ row1Anime = [], row2Anime = [] }) => {
  return (
    <section className="w-full py-4 overflow-hidden relative mask-marquee-edges my-1" aria-label="Anime Showcase Marquee">
      {/* Row 1 - Even Index Anime (Scrolling Left) */}
      <div className="mb-3">
        <div className="animate-marquee-slow flex gap-3 sm:gap-3.5">
          {[...row1Anime, ...row1Anime].map((anime, index) => (
            <AnimeMarqueeCard
              key={`r1-${anime.id}-${index}`}
              anime={anime}
              uniqueKey={`r1-${anime.id}-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Row 2 - Odd Index Anime (Scrolling Right) */}
      <div>
        <div className="animate-marquee-reverse-slow flex gap-3 sm:gap-3.5">
          {[...row2Anime, ...row2Anime].map((anime, index) => (
            <AnimeMarqueeCard
              key={`r2-${anime.id}-${index}`}
              anime={anime}
              uniqueKey={`r2-${anime.id}-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeMarqueeWall;
