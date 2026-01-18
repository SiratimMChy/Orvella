const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
        {/* Image Skeleton */}
        <div className="relative h-[500px] rounded-2xl bg-gray-200"></div>

        {/* Info Skeleton */}
        <div className="flex flex-col">
          {/* Brand & Category */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b">
            <div className="h-10 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Material & Fit */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="h-6 w-24 bg-gray-200 rounded mb-3"></div>
            <div className="flex gap-2">
              <div className="h-10 w-12 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-12 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-12 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Stock */}
          <div className="mb-6">
            <div className="h-10 w-40 bg-gray-200 rounded-full"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 h-14 bg-gray-200 rounded-xl"></div>
            <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
            </div>
            <div className="text-center">
              <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
            </div>
            <div className="text-center">
              <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
