import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const DetailSynopsis = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return (
      <div className="rounded-2xl border border-background-400/25 bg-background-200/50 p-6 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-typography-400 mb-2">
          Synopsis
        </h2>
        <p className="text-xs sm:text-sm text-typography-400 italic">
          No synopsis available for this anime.
        </p>
      </div>
    );
  }

  // Clean description string: remove raw HTML tags or replace <br> with newlines
  const formattedDescription = description
    .replace(/<br\s*\/?>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .trim();

  const isLong = formattedDescription.length > 400;

  return (
    <section className="rounded-2xl border border-background-400/25 bg-background-200/50 p-6 mb-8 backdrop-blur-md">
      <h2 className="text-sm font-bold uppercase tracking-wider text-typography-300 mb-3">
        Synopsis
      </h2>

      <div
        className={`relative text-xs sm:text-sm text-typography-400 leading-relaxed whitespace-pre-line ${
          !isExpanded && isLong ? "line-clamp-4" : ""
        }`}
      >
        {formattedDescription}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-300 hover:text-primary-200 transition-colors cursor-pointer"
        >
          <span>{isExpanded ? "Show less" : "Read more"}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </section>
  );
};

export default DetailSynopsis;
