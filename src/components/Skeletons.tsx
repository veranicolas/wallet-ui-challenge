export const UserSkeleton = () => (
  <div className="flex items-center space-x-3 p-4 animate-pulse">
    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
    <div className="flex-1">
      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

export const TransactionSkeleton = () => (
  <div className="flex items-center justify-between p-4 animate-pulse">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    <div className="text-right">
      <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-12"></div>
    </div>
  </div>
);

export const BalanceSkeleton = () => (
  <div className="text-center animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-40 mx-auto"></div>
  </div>
);

export const ContactSkeleton = () => (
  <div className="flex flex-col items-center p-3 animate-pulse">
    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-16"></div>
  </div>
);