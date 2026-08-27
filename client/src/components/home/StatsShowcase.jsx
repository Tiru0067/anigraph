import { STATS_ITEMS } from '../../constants/homeData.js';

export const StatsShowcase = ({ stats = {} }) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10" aria-label="Knowledge Graph Statistics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {STATS_ITEMS.map((item) => (
          <div
            key={item.key}
            className="flex flex-col text-left p-4 sm:p-5 rounded-xl bg-background-200/60 border border-background-400/30 backdrop-blur-md"
          >
            <span className="text-2xl sm:text-3xl font-black font-display text-typography-100 tracking-tight mb-0.5">
              {stats[item.key] || 0}+
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-300 mb-1">
              {item.title}
            </span>
            <p className="text-[11px] text-typography-300 leading-snug">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsShowcase;
