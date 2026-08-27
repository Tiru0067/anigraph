export const DetailSkeleton = () => {
  return (
    <div className="w-full flex-1 flex flex-col animate-pulse -mt-16 sm:-mt-20">
      {/* Banner Skeleton */}
      <div className="w-full h-64 sm:h-80 md:h-92 bg-background-200" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 md:-mt-36 pt-16 sm:pt-20 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-start gap-5 md:gap-7 mb-10">
          {/* Poster Skeleton */}
          <div className="w-32 sm:w-40 md:w-48 aspect-2/3 rounded-xl bg-background-300 shrink-0 border border-background-400/30 shadow-xl" />

          {/* Title & Metadata Skeleton */}
          <div className="flex-1 w-full pt-4 space-y-2.5">
            <div className="h-4.5 w-32 bg-background-300 rounded-md" />
            <div className="h-7 sm:h-9 w-3/4 bg-background-300 rounded-lg" />
            <div className="h-3.5 w-1/2 bg-background-300 rounded-md" />
            <div className="flex gap-2 pt-1.5">
              <div className="h-6 w-24 bg-background-300 rounded-lg" />
              <div className="h-6 w-24 bg-background-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* 2-Column Body Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Main Area (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-40 rounded-2xl bg-background-200/80 border border-background-400/20" />
            <div className="h-52 rounded-2xl bg-background-200/80 border border-background-400/20" />
            <div className="h-64 rounded-2xl bg-background-200/80 border border-background-400/20" />
          </div>

          {/* Sidebar Area (1 col) */}
          <div className="space-y-6">
            <div className="h-64 rounded-2xl bg-background-200/80 border border-background-400/20" />
            <div className="h-44 rounded-2xl bg-background-200/80 border border-background-400/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
