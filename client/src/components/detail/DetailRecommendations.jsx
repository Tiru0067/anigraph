import { Link } from "react-router-dom";
import { Film, Building, User, Tag, ArrowRight } from "lucide-react";

const REASON_ORDER = {
  HAS_GENRE: 1,
  HAS_TAG: 2,
  PRODUCED_BY: 3,
  DIRECTED_BY: 4,
};

export const DetailRecommendations = ({
  recommendations = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <section className="mb-10" aria-label="Loading Recommendations">
        <h2 className="text-sm font-bold uppercase tracking-wider text-typography-300 mb-3">
          Recommendations
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3.5 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`rec-skel-${i}`}
              className="h-36 rounded-xl bg-background-200 animate-pulse border border-background-400/20"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <section className="mb-10" aria-label="Recommendations">
        <h2 className="text-sm font-bold uppercase tracking-wider text-typography-300 mb-3">
          Recommendations
        </h2>
        <div className="rounded-xl border border-background-400/25 bg-background-200/40 p-6 text-center text-xs text-typography-400">
          No recommendations found for this anime.
        </div>
      </section>
    );
  }

  // Format reason tag badges cleanly
  const renderReasonBadge = (reason, idx) => {
    let icon = null;
    let label = reason.name;
    let badgeClass =
      "bg-background-300/80 border-background-400/30 text-typography-300";

    if (reason.type === "HAS_GENRE") {
      badgeClass = "bg-primary-500/10 border-primary-400/20 text-primary-200";
    } else if (reason.type === "DIRECTED_BY") {
      icon = <User className="w-2.5 h-2.5 text-primary-300" />;
      label = `Director: ${reason.name}`;
      badgeClass =
        "bg-background-300/80 border-background-400/30 text-typography-200";
    } else if (reason.type === "PRODUCED_BY") {
      icon = <Building className="w-2.5 h-2.5 text-primary-300" />;
      label = `Studio: ${reason.name}`;
      badgeClass =
        "bg-background-300/80 border-background-400/30 text-typography-200";
    } else {
      icon = <Tag className="w-2.5 h-2.5 text-typography-400" />;
    }

    return (
      <span
        key={`reason-${idx}`}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10.5px] font-medium whitespace-nowrap ${badgeClass}`}
      >
        {icon}
        <span>{label}</span>
      </span>
    );
  };

  return (
    <section className="mb-10" aria-label="Recommendations">
      <h2 className="text-sm font-bold uppercase tracking-wider text-typography-300 mb-3">
        Recommendations
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3.5 sm:gap-4">
        {recommendations.map((anime) => {
          const cover =
            typeof anime.coverImage === "string"
              ? anime.coverImage
              : anime.coverImage?.large || anime.coverImage?.extraLarge || "";

          const reasons = Array.isArray(anime.reasons)
            ? [...anime.reasons]
                .sort(
                  (a, b) =>
                    (REASON_ORDER[a.type] || 99) - (REASON_ORDER[b.type] || 99),
                )
                .slice(0, 4)
            : [];

          return (
            <Link
              to={`/anime/${anime.id}`}
              key={anime.id}
              className="group flex gap-3.5 p-3 rounded-xl bg-background-200/60 hover:bg-background-200/90 border border-background-400/25 hover:border-primary-400/50 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary-500/10 cursor-pointer"
            >
              {/* Cover Poster */}
              <div className="relative w-22 sm:w-24 shrink-0 aspect-2/3 rounded-lg overflow-hidden bg-background-300 border border-background-400/20">
                {cover ? (
                  <img
                    src={cover}
                    alt={anime.titleEnglish || anime.titleRomaji || "Poster"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-typography-400">
                    <Film className="w-5 h-5 opacity-40" />
                  </div>
                )}
              </div>

              {/* Information & Reasons */}
              <div className="flex-1 flex flex-col justify-between min-w-0 mt-0.5">
                <div className="space-y-2">
                  {/* 1. Title */}
                  <h3 className="text-sm font-semibold text-typography-100 line-clamp-1 leading-snug group-hover:text-primary-300 transition-colors">
                    {anime.titleEnglish || anime.titleRomaji}
                  </h3>

                  {/* 2. Format • Year */}
                  <div className="text-[11.5px] text-typography-400 font-medium">
                    {anime.format || "Anime"}
                    {anime.seasonYear ? ` • ${anime.seasonYear}` : ""}
                  </div>

                  {/* 3 & 4. Genres & Tags (Pills) */}
                  <div className="flex flex-wrap gap-1">
                    {reasons.map(renderReasonBadge)}
                  </div>
                </div>

                {/* 5. Match Score (Last) */}
                <div className="mt-2.5 pt-2 border-t border-background-400/20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-200">
                    <span>
                      Match Score:{" "}
                      <strong className="text-typography-100 font-semibold">
                        {anime.matchScore ?? "N/A"}
                      </strong>
                    </span>
                  </span>

                  <div className="flex items-center text-[10.5px] text-primary-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DetailRecommendations;
