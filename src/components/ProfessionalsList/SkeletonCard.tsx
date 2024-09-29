import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full bg-gray-300"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-300 rounded w-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonCard;
