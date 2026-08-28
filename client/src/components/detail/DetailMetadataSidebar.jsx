import { Link } from "react-router-dom";

const formatDuration = (mins) => {
  if (!mins || mins <= 0) return null;
  if (mins < 60) return `${mins} mins`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `${hrs} hr ${rem} mins` : `${hrs} hr${hrs > 1 ? "s" : ""}`;
};

const formatStatus = (status) => {
  if (!status) return null;
  return status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const formatSeason = (season, year) => {
  if (!season && !year) return null;
  const seasonName = season
    ? season.charAt(0).toUpperCase() + season.slice(1).toLowerCase()
    : "";
  return `${seasonName} ${year || ""}`.trim();
};

export const DetailMetadataSidebar = ({ anime }) => {
  const studios = Array.isArray(anime.studios) ? anime.studios : [];
  const directors = Array.isArray(anime.directors) ? anime.directors : [];
  const tags = Array.isArray(anime.tags) ? anime.tags : [];
  const genres = Array.isArray(anime.genres) ? anime.genres : [];

  const metaItems = [
    {
      label: "Format",
      value: anime.format
        ? anime.format.charAt(0).toUpperCase() +
          anime.format.slice(1).toLowerCase()
        : "Anime",
    },
    { label: "Episodes", value: anime.episodes || null },
    { label: "Episode Duration", value: formatDuration(anime.duration) },
    { label: "Status", value: formatStatus(anime.status) },
    { label: "Season", value: formatSeason(anime.season, anime.seasonYear) },
    {
      label: "Average Score",
      value: anime.averageScore ? `${anime.averageScore}%` : null,
      className: "text-amber-300 font-medium",
    },
    {
      label: "Popularity",
      value: anime.popularity ? anime.popularity.toLocaleString() : null,
    },
  ].filter((item) => item.value);

  const titles = [
    { label: "Romaji", value: anime.titleRomaji },
    { label: "English", value: anime.titleEnglish },
    { label: "Native", value: anime.titleNative },
  ].filter((t) => t.value);

  return (
    <aside className="w-full" aria-label="Anime Information">
      {/* Single Unified Information Card */}
      <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-4 sm:p-5 backdrop-blur-md flex flex-col gap-3.5 text-xs">
        {/* Core Metadata Items (Single Column Stack) */}
        {metaItems.map(({ label, value, className }) => (
          <div key={label}>
            <span className="text-[13px] font-medium text-typography-100/80 block mb-1.25">
              {label}
            </span>
            <span className={className || "text-xs text-typography-400"}>
              {value}
            </span>
          </div>
        ))}

        {/* Animation Studios */}
        {studios.length > 0 && (
          <div>
            <span className="text-[13px] font-medium text-typography-100/80 block mb-1">
              Studios
            </span>
            <div className="flex flex-col gap-1">
              {studios.map((studio) => (
                <Link
                  key={studio}
                  to={`/discover?search=${encodeURIComponent(studio)}`}
                  className="text-xs text-typography-400 hover:text-primary-400 transition-colors cursor-pointer leading-snug"
                >
                  {studio}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Series Directors */}
        {directors.length > 0 && (
          <div>
            <span className="text-[13px] font-medium text-typography-100/80 block mb-1">
              Directors
            </span>
            <div className="flex flex-col gap-1">
              {directors.map((director) => (
                <Link
                  key={director}
                  to={`/discover?search=${encodeURIComponent(director)}`}
                  className="text-xs text-typography-400 hover:text-primary-400 transition-colors cursor-pointer leading-snug"
                >
                  {director}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Genres */}
        {genres.length > 0 && (
          <div>
            <span className="text-[13px] font-medium text-typography-100/80 block mb-1.5">
              Genres
            </span>
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <Link
                  key={genre}
                  to={`/discover?search=${encodeURIComponent(genre)}`}
                  className="px-2 py-0.5 rounded-md bg-primary-500/10 hover:bg-primary-500/20 border border-primary-400/25 text-[11px] text-primary-200 hover:text-primary-100 transition-colors cursor-pointer"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Titles (Romaji, English, Native as individual items) */}
        {titles.map(({ label, value }) => (
          <div key={label}>
            <span className="text-[13px] font-medium text-typography-100/80 block mb-0.5">
              {label}
            </span>
            <span className="text-xs text-typography-400 leading-snug block">
              {value}
            </span>
          </div>
        ))}

        {/* Thematic Tags */}
        {tags.length > 0 && (
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-typography-100/80 block mb-2">
              Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => {
                const tagName = typeof tag === "string" ? tag : tag.name;
                const tagRank =
                  typeof tag === "object" && tag.rank ? tag.rank : null;
                return (
                  <Link
                    key={tagName}
                    to={`/discover?search=${encodeURIComponent(tagName)}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background-300/60 hover:bg-background-300 border border-background-400/25 text-[11px] text-typography-300 hover:text-typography-100 transition-all cursor-pointer"
                    title={`Search for anime tagged with "${tagName}"`}
                  >
                    <span>#{tagName}</span>
                    {tagRank && (
                      <span className="text-[10px] text-typography-400 font-medium">
                        {tagRank}%
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DetailMetadataSidebar;
