import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { GRAPH_FEATURES } from '../../constants/homeData.js';

export const GraphFeatures = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 border-t border-background-400/20" aria-label="Features and Graph Benefits">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-300">
          Intelligent Traversal
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-typography-100 mt-1 mb-2">
          Why Graph Traversal Beats Standard SQL
        </h2>
        <p className="text-typography-300 text-xs sm:text-sm">
          Instead of heavy junction table joins, AniGraph traverses creative staff, studio DNA, and deep thematic ranks in single openCypher queries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GRAPH_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="rounded-xl bg-background-200/70 border border-background-400/30 p-4 sm:p-5 flex flex-col justify-between hover:border-primary-400/40 transition-colors"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300 mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold font-display text-typography-100 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-typography-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-background-400/20 text-xs font-mono text-primary-300">
                {feature.snippet}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-typography-000 font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-400/30 hover:-translate-y-0.5"
        >
          <Compass className="w-4 h-4" />
          <span>Start Exploring Knowledge Graph</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default GraphFeatures;
