import { Mic, User } from "lucide-react";

export const DetailCastList = ({ cast = [] }) => {
  const validCast = Array.isArray(cast)
    ? cast.filter((member) => member && (member.character || member.voiceActor))
    : [];

  if (validCast.length === 0) {
    return null;
  }

  return (
    <section className="mb-10" aria-label="Characters and Voice Cast">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-typography-100/80">
          Characters & Voice Cast
        </h2>
        <span className="text-xs text-typography-100/80">
          {validCast.length} {validCast.length === 1 ? "member" : "members"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {validCast.map((member, idx) => (
          <div
            key={`cast-${idx}-${member.character || "char"}`}
            className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-background-200/50 border border-background-400/25 hover:border-background-400/40 transition-colors"
          >
            {/* Character Info */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-primary-500/15 border border-primary-400/20 flex items-center justify-center text-primary-300 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-semibold text-typography-100 block truncate">
                  {member.character || "Unknown Character"}
                </span>
                <span className="text-[10.5px] text-typography-400 block">
                  Character
                </span>
              </div>
            </div>

            {/* Voice Actor Info */}
            {member.voiceActor && (
              <div className="text-right shrink-0 min-w-0">
                <span className="text-xs font-medium text-primary-200 truncate flex items-center justify-end gap-1">
                  <Mic className="w-3 h-3 text-primary-300 shrink-0" />
                  <span className="truncate">{member.voiceActor}</span>
                </span>
                <span className="text-[10.5px] text-typography-400 block">
                  Voice Actor
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailCastList;
