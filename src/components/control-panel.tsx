import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

type AlgorithmType = {
  name: string;
  algorithm: ({
    arr,
    setArr,
    duration,
  }: {
    arr: number[];
    setArr: React.Dispatch<React.SetStateAction<number[]>>;
    duration: number;
  }) => Promise<void>;
};

interface ControlPanelProps {
  algorithms: AlgorithmType[];
  currentAlgorithm: AlgorithmType;
  arrSize: number;
  duration: number;
  isSorting: boolean;
  showValue: boolean;
  color: string;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  setDuration: Dispatch<SetStateAction<number>>;
  setArrSize: Dispatch<SetStateAction<number>>;
  setColor: Dispatch<SetStateAction<string>>;
  setShowValue: Dispatch<SetStateAction<boolean>>;
  onStart: () => void;
  onReset: () => void;
  onResetAll: () => void;
}

export default function ControlPanel({
  algorithms,
  currentAlgorithm,
  arrSize,
  duration,
  isSorting,
  showValue,
  color,
  setAlgorithm,
  setDuration,
  setArrSize,
  setColor,
  setShowValue,
  onStart,
  onReset,
  onResetAll,
}: ControlPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-8 space-y-6">
      <div className="flex items-center justify-between gap-x-8">
        <div className="flex items-center gap-x-2">
          <Button
            disabled={isSorting}
            onClick={onStart}
            className="disabled:cursor-not-allowed text-lg"
          >
            {isSorting ? (
              <>
                <Pause className="size-5" />
                Sorting...
              </>
            ) : (
              <>
                <Play className="size-6" />
                Start
              </>
            )}
          </Button>
          <Button
            disabled={isSorting}
            onClick={onReset}
            variant={"secondary"}
            className="disabled:cursor-not-allowed text-lg"
          >
            <RotateCcw className="size-6" />
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="algo-select" className="flex items-center gap-1">
            <Settings className="size-6" />
            <span className="text-lg">Algorithms:</span>
          </Label>
          <Select
            defaultValue={currentAlgorithm.name}
            onValueChange={(e) => {
              const selectedAlgo = algorithms.find((a) => a.name === e);
              if (!selectedAlgo) return;
              setAlgorithm(selectedAlgo);
            }}
          >
            <SelectTrigger id="algo-select" className="w-[180px]">
              <SelectValue placeholder="Sorting algorithms" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((algo) => (
                <SelectItem key={algo.name} value={algo.name}>
                  {algo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <div className="flex items-center gap-x-2">
          <Label htmlFor="algo-speed" className="flex items-center gap-1">
            <span className="text-lg">Speed:</span>
          </Label>
          <input
            id="algo-speed"
            type="range"
            min="1"
            max="100"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={isSorting}
            className="ml-2"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="algo-array-size" className="flex items-center gap-1">
            <span className="text-lg">Array Size:</span>
          </Label>
          <input
            id="algo-array-size"
            type="range"
            min="10"
            max="100"
            value={arrSize}
            onChange={(e) => setArrSize(Number(e.target.value))}
            disabled={isSorting}
            className="ml-2"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <div className="flex items-center gap-x-2">
          <Label htmlFor="bar-color" className="flex items-center gap-1">
            <span className="text-lg">Color:</span>
          </Label>
          <input
            id="bar-color"
            type="color"
            value={color}
            disabled={isSorting}
            onChange={(e) => setColor(e.target.value)}
            className="rounded-md w-16 h-8 disabled:opacity-65"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="show-value" className="flex items-center gap-1">
            <span className="text-lg">Show value:</span>
          </Label>
          <Checkbox
            disabled={isSorting}
            checked={showValue}
            id="show-value"
            onClick={() => setShowValue(!showValue)}
          />
        </div>
      </div>
      <Button disabled={isSorting} onClick={onResetAll}>
        Reset All
      </Button>
    </div>
  );
}
