"use client";

import ControlPanel from "@/components/control-panel";
import SortingVisualizer from "@/components/sorting-visualizer";
import { bubbleSort } from "@/sorting-algorithms/bubble-sort";
import { quickSort } from "@/sorting-algorithms/quick-sort";
import { useEffect, useState } from "react";

const algorithms = [
  { name: "Bubble Sort", algorithm: bubbleSort },
  { name: "Quick Sort", algorithm: quickSort },
];

export default function HomePage() {
  const [arr, setArr] = useState<number[]>([]);
  const [color, setColor] = useState<string>("#3b82f6");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState(algorithms[0]);
  const [duration, setDuration] = useState<number>(50);
  const [arrSize, setArrSize] = useState<number>(50);

  const resetArr = () => {
    const newArr = Array.from({ length: arrSize }, () =>
      Math.floor(Math.random() * 100 + 1)
    );

    setArr(newArr);
    setIsSorting(false);
  };

  useEffect(() => {
    resetArr();
  }, [arrSize]);

  const startSorting = async () => {
    setIsSorting(true);
    await algorithm.algorithm({ arr, setArr, duration });
    setIsSorting(false);
  };

  return (
    <div className="h-full p-8 md:p-16 pt-16 md:pt-32">
      <div className="">
        <SortingVisualizer arr={arr} color={color} />
        <ControlPanel
          algorithms={algorithms}
          currentAlgorithm={algorithm}
          arrSize={arrSize}
          duration={duration}
          isSorting={isSorting}
          color={color}
          setAlgorithm={setAlgorithm}
          setArrSize={setArrSize}
          setDuration={setDuration}
          onStart={startSorting}
          onRest={resetArr}
          setColor={setColor}
        />
      </div>
      <h1 className="text-center mt-10 text-3xl font-bold">
        Welcome to the Sorting Algorithm Visualizer!
      </h1>
    </div>
  );
}
