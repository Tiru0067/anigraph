export const DetailSkeleton = () => {
  return (
    <div className="w-full flex-1 flex flex-col animate-pulse -mt-16 sm:-mt-20">
      {/* Banner Skeleton */}
      <div className="w-full h-56 sm:h-78 bg-background-200" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Poster & Titles */}
        <div className="flex flex-col sm:flex-row sm:gap-5 mb-6">
          <div className="-mt-26 sm:-mt-18 lg:-mt-24">
            <div className="w-26 sm:w-32 md:w-36 lg:w-42 aspect-2/3 rounded-sm bg-background-300 shrink-0" />
          </div>
          <div className="flex-1 mt-5 space-y-2.5">
            <div className="h-6 w-3/4 bg-background-300 rounded-md" />
            <div className="h-3.5 w-1/3 bg-background-300 rounded-md" />
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-16 bg-background-300 rounded-md" />
              <div className="h-5 w-16 bg-background-300 rounded-md" />
            </div>
          </div>
        </div>

        {/* 2-Column Body (Left Sidebar on md+, Right Content) */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start pb-16">
          {/* Left Sidebar Skeleton */}
          <div className="hidden md:block w-52 sm:w-56 md:w-60 lg:w-64 shrink-0">
            <div className="h-96 rounded-2xl bg-background-200/80 border border-background-400/20" />
          </div>

          {/* Right Main Area Skeleton */}
          <div className="flex-1 w-full space-y-6">
            <div className="h-36 rounded-2xl bg-background-200/80 border border-background-400/20" />
            <div className="h-44 rounded-2xl bg-background-200/80 border border-background-400/20" />
            <div className="h-60 rounded-2xl bg-background-200/80 border border-background-400/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
