import { IAlgorithm, IGeneratorParam } from "../Algorithm";

function* bubbleSortGenerator(data: IGeneratorParam) {
	let array: IGeneratorParam = [...data];
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				let temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
				yield array;
			}
		}
	}
}

const bubbleSortAlgorithm: IAlgorithm = {
	name: "Bubble Sort",
	generator: bubbleSortGenerator,
};

export default bubbleSortAlgorithm;
