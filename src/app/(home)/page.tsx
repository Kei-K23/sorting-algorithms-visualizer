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
  const [showValue, setShowValue] = useState<boolean>(false);
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

  const startSorting = async () => {
    setIsSorting(true);
    await algorithm.algorithm({ arr, setArr, duration });
    setIsSorting(false);
  };

  const resetAll = () => {
    setColor("#3b82f6");
    setShowValue(false);
    setAlgorithm(algorithms[0]);
    setDuration(50);
    setArrSize(50);
  };

  useEffect(() => {
    resetArr();
  }, [arrSize]);

  return (
    <div className="h-full p-8 md:p-16 pt-16 md:pt-32">
      <div className="">
        <SortingVisualizer arr={arr} color={color} showValue={showValue} />
        <ControlPanel
          algorithms={algorithms}
          currentAlgorithm={algorithm}
          arrSize={arrSize}
          duration={duration}
          isSorting={isSorting}
          color={color}
          showValue={showValue}
          setAlgorithm={setAlgorithm}
          setArrSize={setArrSize}
          setDuration={setDuration}
          setColor={setColor}
          setShowValue={setShowValue}
          onStart={startSorting}
          onReset={resetArr}
          onResetAll={resetAll}
        />
      </div>
      <h1 className="text-center mt-10 text-3xl font-bold">
        Welcome to the Sorting Algorithm Visualizer!
      </h1>
    </div>
  );
}
