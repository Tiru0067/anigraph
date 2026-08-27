import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Network, Compass, Sparkles } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isAnimeDetailPage = location.pathname.startsWith("/anime/");

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isAnimeDetailPage ? 140 : 20;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAnimeDetailPage]);

  // Determine background styling based on page and scroll position
  const getHeaderClasses = () => {
    if (isScrolled) {
      return "bg-background-100/85 backdrop-blur-md border-b border-background-400/20 shadow-lg shadow-background-000/30";
    }
    if (isAnimeDetailPage) {
      return "bg-background-100/40 border-b border-white/5";
    }
    return "bg-transparent border-b border-transparent";
  };

  const isCompact = isScrolled || isAnimeDetailPage;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 hover:bg-background-100 hover:backdrop-blur-none hover:border-background-400/30 hover:shadow-xl hover:shadow-background-000/40 ${getHeaderClasses()}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isCompact ? "h-16" : "h-20"
        }`}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="AniGraph Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-500/20 border border-primary-400/20 flex items-center justify-center text-primary-300">
            <Network className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-typography-100">
            Ani<span className="text-primary-300">Graph</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav
          className="flex items-center gap-1.5 sm:gap-2"
          aria-label="Main Navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-1.75 rounded-[10px] border text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-500/20 text-primary-100 border-primary-400/40 shadow-sm"
                  : "border-transparent text-typography-100 hover:text-typography-200 hover:bg-background-200 hover:border-background-200"
              }`
            }
          >
            <Sparkles className="size-3.25 text-primary-100" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-1.75 rounded-[10px] border text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-500/20 text-primary-100 border-primary-400/40 shadow-sm"
                  : "border-transparent text-typography-100 hover:text-typography-200 hover:bg-background-200 hover:border-background-200"
              }`
            }
          >
            <Compass className="size-3.75 text-primary-100" />
            <span>Discover</span>
          </NavLink>

          <div
            className="h-5 w-px bg-background-400/40 mx-1 hidden sm:block"
            role="separator"
          />

          {/* GitHub Repo */}
          <a
            href="https://github.com/Tiru0067/AniGraph"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-typography-300 hover:text-typography-100 hover:bg-background-200 rounded-[10px] transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
