/* eslint-disable @typescript-eslint/no-unsafe-function-type */
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

interface ControlPanelProps {
  arrSize: number;
  speed: number;
  sorting: boolean;
  showValue: boolean;
  color: string;
  algorithms: {
    name: string;
    algorithm: (
      arr: number[],
      setArray: Dispatch<SetStateAction<number[]>>,
      speed: number,
      low?: number,
      high?: number
    ) => Promise<void>;
  }[];
  currentAlgorithm: {
    name: string;
    algorithm: (
      arr: number[],
      setArray: Dispatch<SetStateAction<number[]>>,
      speed: number,
      low?: number,
      high?: number
    ) => Promise<void>;
  };
  setAlgorithm: (algorithm: {
    name: string;
    algorithm: (
      arr: number[],
      setArray: Dispatch<SetStateAction<number[]>>,
      speed: number,
      low?: number,
      high?: number
    ) => Promise<void>;
  }) => void;
  setSpeed: Dispatch<SetStateAction<number>>;
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
  speed,
  sorting,
  showValue,
  color,
  setAlgorithm,
  setSpeed,
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
            disabled={sorting}
            onClick={onStart}
            className="disabled:cursor-not-allowed text-lg"
          >
            {sorting ? (
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
            disabled={sorting}
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
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={sorting}
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
            disabled={sorting}
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
            disabled={sorting}
            onChange={(e) => setColor(e.target.value)}
            className="rounded-md w-16 h-8 disabled:opacity-65"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="show-value" className="flex items-center gap-1">
            <span className="text-lg">Show value:</span>
          </Label>
          <Checkbox
            disabled={sorting}
            checked={showValue}
            id="show-value"
            onClick={() => setShowValue(!showValue)}
          />
        </div>
      </div>
      <Button disabled={sorting} onClick={onResetAll}>
        Reset All
      </Button>
    </div>
  );
}
