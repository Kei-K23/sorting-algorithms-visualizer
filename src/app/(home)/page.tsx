"use client";

import SortingVisualizer from "@/components/sorting-visualizer";
import { bubbleSort } from "@/sorting-algorithms/bubble-sort";
import { useEffect, useState } from "react";

const algorithms = [{ name: "Bubble Sort", algorithm: bubbleSort }];

export default function HomePage() {
  const [arr, setArr] = useState<number[]>([]);
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
    <div className="h-full p-8 pt-16">
      <SortingVisualizer arr={arr} />
      <h1 className="text-center mt-10 text-3xl font-bold">
        Welcome to the Sorting Algorithm Visualizer!
      </h1>
    </div>
  );
}
