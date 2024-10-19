import React from "react";

interface SortingVisualizerProps {
  color: string;
  arr: number[];
  showValue: boolean;
}

export default function SortingVisualizer({
  arr,
  color,
  showValue,
}: SortingVisualizerProps) {
  const maxValue = Math.max(...arr);

  return (
    <div className="h-80 flex items-end justify-center bg-white rounded-lg shadow-lg p-4 mb-8">
      {arr.map((value, index) => {
        const heightVal = (value / maxValue) * 100;
        return (
          <div
            key={index}
            className="relative w-3.5 mx-px"
            style={{
              height: `${heightVal}%`,
              backgroundColor: color,
            }}
          >
            {showValue && (
              <span className="absolute text-[12px] transform rotate-90 left-1/2 -translate-x-1/2 -top-7">
                {heightVal.toFixed(1)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
