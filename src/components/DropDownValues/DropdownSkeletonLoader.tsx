"use client";
import React from "react";

const DropdownSkeletonLoader: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 mb-3 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownSkeletonLoader;
