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
  setAlgorithm: (algorithm: AlgorithmType) => void;
  setDuration: Dispatch<SetStateAction<number>>;
  setArrSize: Dispatch<SetStateAction<number>>;
  onStart: () => void;
  onRest: () => void;
}

export default function ControlPanel({
  algorithms,
  currentAlgorithm,
  arrSize,
  duration,
  isSorting,
  setAlgorithm,
  setDuration,
  setArrSize,
  onRest,
  onStart,
}: ControlPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
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
            onClick={onRest}
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
            <span className="text-xl">Algorithms:</span>
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
    </div>
  );
}
