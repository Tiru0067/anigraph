import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <section
        className="max-w-md mx-auto flex flex-col items-center"
        aria-label="Error 404"
      >
        <div className="text-7xl font-extrabold font-display text-primary-400/30 mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-typography-100 mb-2">
          Page Not Found
        </h1>
        <p className="text-typography-300 text-sm mb-8 leading-relaxed">
          The page or node you are looking for does not exist in this graph.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-typography-000 text-sm font-medium transition-all shadow-lg shadow-primary-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background-300 hover:bg-background-400 border border-background-400/40 text-typography-100 text-sm font-medium transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Discover</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
