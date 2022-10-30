import bubbleSortAlgorithm from "./impl/BubbleSortAlgorithm";
import heapSortAlgorithm from "./impl/HeapSortAlgorithm";
import quickSortAlgorithm from "./impl/QuickSortAlgorithm";

function getRandomInt(min: number, max: number): number {
	let ceilMin = Math.ceil(min);
	let floorMax = Math.floor(max);
	return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
}

export type IGeneratorParam = number[];

export type IAlgorithm = {
	name: string;
	generator: (data: IGeneratorParam) => Generator<IGeneratorParam>;
};

export type IAlgorithmKey = "bubbleSort" | "quickSort" | "heapSort";

export type SortingState = {
	bubbleSort?: boolean;
	quickSort?: boolean;
	heapSort?: boolean;
};

export type IDataArray =
	| number
	| {
			count: number;
			min?: number;
			max?: number;
	  };

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;
const DEFAULT_COUNT = 100;

export function buildDataArray(config: IDataArray): IGeneratorParam {
	let count = DEFAULT_COUNT;
	let min = DEFAULT_MIN;
	let max = DEFAULT_MAX;

	if (typeof config === "number") {
		count = config;
	} else {
		count = typeof config.count === "number" ? config.count : count;
		min = typeof config.min === "number" ? config.min : min;
		max = typeof config.max === "number" ? config.max : max;
	}

	if (min >= max) {
		min = DEFAULT_MIN;
		max = DEFAULT_MAX;
	}

	return [...Array(count)].map(() => getRandomInt(min, max));
}

export type IAlgorithmConfig = {
	speed: number;
};

const Algorithm: {
	[K in IAlgorithmKey]: IAlgorithm;
} = {
	bubbleSort: bubbleSortAlgorithm,
	quickSort: quickSortAlgorithm,
	heapSort: heapSortAlgorithm,
};

const ALGORITHM_KEYS: IAlgorithmKey[] = Object.keys(
	Algorithm
) as IAlgorithmKey[];

export default Algorithm;

export { ALGORITHM_KEYS };
