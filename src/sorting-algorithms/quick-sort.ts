import { sleep } from "@/lib/sleep";

export const quickSort = async ({
  arr,
  setArr,
  duration,
}: {
  arr: number[];
  setArr: React.Dispatch<React.SetStateAction<number[]>>;
  duration: number;
}) => {
  const n = arr.length - 1; // Total length of array

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap the adjacent value
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArr([...arr]);
        // Sleep for visualization
        await sleep(duration);
      }
    }
  }
};
