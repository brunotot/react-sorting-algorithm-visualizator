import { IAlgorithm, IGeneratorParam } from "../Algorithm";

function* sort(array: number[]) {
	let n = array.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) yield* heapify(array, n, i);

	for (let i = n - 1; i > 0; i--) {
		let temp = array[0];
		array[0] = array[i];
		array[i] = temp;
		yield array;

		yield* heapify(array, i, 0);
	}
}

function* heapify(array: number[], n: number, i: number): any {
	let largest = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;

	if (l < n && array[l] > array[largest]) {
		largest = l;
	}

	if (r < n && array[r] > array[largest]) {
		largest = r;
	}

	if (largest != i) {
		let swap = array[i];
		array[i] = array[largest];
		array[largest] = swap;
		yield array;

		yield* heapify(array, n, largest);
	}
}

function* heapSortGenerator(data: IGeneratorParam) {
	let array: IGeneratorParam = [...data];
	yield* sort(array);
}

const heapSortAlgorithm: IAlgorithm = {
	name: "Heap Sort",
	generator: heapSortGenerator,
};

export default heapSortAlgorithm;
