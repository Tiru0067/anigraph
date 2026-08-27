import { Link } from "react-router-dom";
import { Tag, Building, User, Info } from "lucide-react";

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
    { label: "Format", value: anime.format },
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

  const altTitles = [
    { label: "English", value: anime.titleEnglish },
    { label: "Romaji", value: anime.titleRomaji },
    { label: "Native", value: anime.titleNative },
  ].filter((t) => t.value);

  const creatorSections = [
    { title: "Animation Studios", icon: Building, items: studios },
    { title: "Series Directors", icon: User, items: directors },
  ].filter((s) => s.items.length > 0);

  return (
    <aside
      className="w-full flex flex-col gap-6"
      aria-label="Anime Information"
    >
      {/* Information Overview Card */}
      <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-5 backdrop-blur-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-typography-300 flex items-center gap-1.5 mb-4 pb-2.5 border-b border-background-400/20">
          <Info className="w-3.5 h-3.5 text-primary-300" />
          <span>Information</span>
        </h3>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 gap-3.5 text-xs">
          {metaItems.map(({ label, value, className }) => (
            <div key={label}>
              <span className="text-[11px] uppercase tracking-wider text-typography-400 font-semibold block mb-0.5">
                {label}
              </span>
              <span className={className || "font-medium text-typography-100"}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Alternative Titles */}
        {altTitles.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-background-400/20">
            <span className="text-[11px] uppercase tracking-wider text-typography-400 font-semibold block mb-2">
              Alternative Titles
            </span>
            <div className="space-y-1.5 text-xs">
              {altTitles.map(({ label, value }) => (
                <div key={label} className="leading-snug">
                  <span className="text-[10.5px] text-typography-400 font-medium mr-1.5">
                    {label}:
                  </span>
                  <span className="text-typography-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Animation Studios & Series Directors (Placed at the end of info) */}
        {creatorSections.map(({ title, icon: Icon, items }) => (
          <div
            key={title}
            className="mt-3.5 pt-3 border-t border-background-400/20"
          >
            <span className="text-[11px] uppercase tracking-wider text-typography-400 font-semibold flex items-center gap-1 mb-1.5">
              <Icon className="w-3 h-3 text-primary-300" />
              <span>{title}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <Link
                  key={item}
                  to={`/discover?search=${encodeURIComponent(item)}`}
                  className="px-2 py-0.5 rounded-md bg-background-300/80 hover:bg-background-400/80 border border-background-400/30 text-xs text-typography-200 hover:text-typography-100 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Thematic Tags Card */}
      {tags.length > 0 && (
        <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-5 backdrop-blur-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-typography-300 flex items-center gap-1.5 mb-3.5 pb-2.5 border-b border-background-400/20">
            <Tag className="w-3.5 h-3.5 text-primary-300" />
            <span>Tags</span>
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => {
              const tagName = typeof tag === "string" ? tag : tag.name;
              const tagRank =
                typeof tag === "object" && tag.rank ? tag.rank : null;
              return (
                <Link
                  key={tagName}
                  to={`/discover?search=${encodeURIComponent(tagName)}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background-300/60 hover:bg-background-300 border border-background-400/25 text-[11.5px] text-typography-300 hover:text-typography-100 hover:border-primary-400/40 transition-all cursor-pointer"
                  title={`Search for anime tagged with "${tagName}"`}
                >
                  <span>#{tagName}</span>
                  {tagRank && (
                    <span className="text-[10.5px] text-typography-400 font-medium">
                      {tagRank}%
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Genres */}
      {genres.length > 0 && (
        <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-5 backdrop-blur-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-typography-300 mb-3 pb-2 border-b border-background-400/20">
            Genres
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <Link
                key={genre}
                to={`/discover?search=${encodeURIComponent(genre)}`}
                className="px-2.5 py-0.75 rounded-md bg-primary-500/10 hover:bg-primary-500/20 border border-primary-400/25 text-xs text-primary-200 hover:text-primary-100 transition-colors cursor-pointer"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default DetailMetadataSidebar;
