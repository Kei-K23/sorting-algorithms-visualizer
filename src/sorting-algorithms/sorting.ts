export const bubbleSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 101 - speed));
      }
    }
  }
};

export const insertionSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
    }
    arr[j + 1] = key;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));
  }
};

export const quickSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  low = 0,
  high = arr.length - 1
) => {
  if (low < high) {
    const pi = await partition(arr, setArray, speed, low, high);
    await quickSort(arr, setArray, speed, low, pi - 1);
    await quickSort(arr, setArray, speed, pi + 1, high);
  }
};

const partition = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  low: number,
  high: number
): Promise<number> => {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setArray([...arr]);
  await new Promise((resolve) => setTimeout(resolve, 101 - speed));

  return i + 1;
};

export const mergeSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  low = 0,
  high = arr.length - 1
) => {
  if (low < high) {
    const mid = Math.floor((low + high) / 2);
    await mergeSort(arr, setArray, speed, low, mid);
    await mergeSort(arr, setArray, speed, mid + 1, high);
    await merge(arr, setArray, speed, low, mid, high);
  }
};

const merge = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  low: number,
  mid: number,
  high: number
) => {
  const leftArr = arr.slice(low, mid + 1);
  const rightArr = arr.slice(mid + 1, high + 1);

  let i = 0,
    j = 0,
    k = low;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));
  }
};

export const selectionSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
    }
  }
};

export const heapSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, setArray, speed);
  }

  // One by one extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));

    // Call max heapify on the reduced heap
    await heapify(arr, i, 0, setArray, speed);
  }
};

const heapify = async (
  arr: number[],
  n: number,
  i: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // left = 2*i + 1
  const right = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));

    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest, setArray, speed);
  }
};

export const shellSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 101 - speed));
      }
      arr[j] = temp;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
    }
  }
};

export const radixSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countSort(arr, exp, setArray, speed);
  }
};

const countSort = async (
  arr: number[],
  exp: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  // Store count of occurrences
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  // Change count[i] so that it contains the actual
  // position of this digit in the output array
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const idx = Math.floor(arr[i] / exp) % 10;
    output[count[idx] - 1] = arr[i];
    count[idx]--;
  }

  // Copy the output array to arr[]
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));
  }
};
