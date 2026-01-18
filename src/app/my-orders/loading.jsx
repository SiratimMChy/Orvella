import { HiOutlineShoppingBag } from "react-icons/hi2";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center gap-3">
            <HiOutlineShoppingBag className="w-8 h-8 text-gray-300" />
            <div>
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Orders Loading Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6 animate-pulse">
                {/* Order Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div>
                      <div className="w-32 h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="w-40 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                    <div className="w-24 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Order Summary Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>

                {/* Order Items Preview Skeleton */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div>
                        <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;