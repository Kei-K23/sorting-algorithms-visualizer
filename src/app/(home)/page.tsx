"use client";

import ControlPanel from "@/components/control-panel";
import SortingVisualizer from "@/components/sorting-visualizer";
import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "@/sorting-algorithms/sorting";
import { useEffect, useState } from "react";

const algorithms = [
  { name: "Bubble Sort", algorithm: bubbleSort },
  { name: "Quick Sort", algorithm: quickSort },
  { name: "Insertion Sort", algorithm: insertionSort },
  { name: "Merge Sort", algorithm: mergeSort },
  { name: "Selection Sort", algorithm: selectionSort },
  { name: "Heap Sort", algorithm: heapSort },
];

export default function HomePage() {
  const [array, setArray] = useState<number[]>([]);
  const [color, setColor] = useState<string>("#3b82f6");
  const [showValue, setShowValue] = useState<boolean>(false);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState(algorithms[0]);
  const [speed, setSpeed] = useState(50);
  const [arrSize, setArrSize] = useState<number>(50);

  const resetArr = () => {
    const newArr = Array.from({ length: arrSize }, () =>
      Math.floor(Math.random() * 100 + 1)
    );

    setArray(newArr);
    setSorting(false);
  };

  const startSorting = async () => {
    setSorting(true);
    await algorithm.algorithm(array, setArray, speed);
    setSorting(false);
  };

  const resetAll = () => {
    setColor("#3b82f6");
    setShowValue(false);
    setAlgorithm(algorithms[0]);
    setSpeed(50);
    setArrSize(50);
  };

  useEffect(() => {
    resetArr();
  }, [arrSize]);

  return (
    <div className="h-full p-8 md:p-16 pt-16 md:pt-32">
      <div className="">
        <SortingVisualizer arr={array} color={color} showValue={showValue} />
        <ControlPanel
          algorithms={algorithms}
          currentAlgorithm={algorithm}
          arrSize={arrSize}
          speed={speed}
          sorting={sorting}
          color={color}
          showValue={showValue}
          setAlgorithm={setAlgorithm}
          setArrSize={setArrSize}
          setSpeed={setSpeed}
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
