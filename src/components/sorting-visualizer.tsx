import React from "react";

interface SortingVisualizerProps {
  arr: number[];
}

export default function SortingVisualizer({ arr }: SortingVisualizerProps) {
  const maxValue = Math.max(...arr);

  return (
    <div className="h-80 flex items-end justify-center bg-white rounded-lg shadow-lg p-4 mb-8">
      {arr.map((value, index) => (
        <div
          key={index}
          className="bg-blue-500 w-3.5 mx-px"
          style={{
            height: `${(value / maxValue) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
