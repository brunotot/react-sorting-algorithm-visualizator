import { IAlgorithm, IGeneratorParam } from "../Algorithm";

function swap(items: number[], leftIndex: number, rightIndex: number) {
	let temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}

function* partition(items: number[], left: number, right: number) {
	let pivot = items[Math.floor((right + left) / 2)],
		i = left,
		j = right;
	while (i <= j) {
		while (items[i] < pivot) {
			i++;
		}
		while (items[j] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j);
			yield items;
			i++;
			j--;
		}
	}
	return i;
}

function* quickSort(items: number[], left: number, right: number): any {
	let index: number;
	if (items.length > 1) {
		index = yield* partition(items, left, right);
		if (left < index - 1) {
			yield* quickSort(items, left, index - 1);
		}
		if (index < right) {
			yield* quickSort(items, index, right);
		}
	}
	return items;
}

function* quickSortGenerator(data: IGeneratorParam) {
	let array: IGeneratorParam = [...data];
	yield* quickSort(array, 0, array.length - 1);
}

const quickSortAlgorithm: IAlgorithm = {
	name: "Quick Sort",
	generator: quickSortGenerator,
};

export default quickSortAlgorithm;
