import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

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
      <div>
        <div className="flex items-center gap-x-2">
          <Button
            disabled={isSorting}
            onClick={onStart}
            className="disabled:cursor-not-allowed"
          >
            {isSorting ? (
              <>
                <Pause className="size-5" />
                Sorting...
              </>
            ) : (
              <>
                <Play className="size-5" />
                Start
              </>
            )}
          </Button>
          <Button
            disabled={isSorting}
            onClick={onRest}
            variant={"secondary"}
            className="disabled:cursor-not-allowed"
          >
            <RotateCcw className="size-5" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
