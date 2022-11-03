import styles from "./../assets/scss/SortBox.module.scss";
import Algorithm, { IAlgorithmKey } from "../algorithms/Algorithm";
import Bar from "./Bar";
import { useContext, useEffect, useMemo, useState } from "react";
import { AlgorithmContext } from "./Dashboard";

export type SortBoxProps = {
	algorithmName: IAlgorithmKey;
};

export default function SortBox(props: SortBoxProps) {
	const algorithmName = props.algorithmName;
	const state = useContext(AlgorithmContext);

	const algorithmData = Algorithm[algorithmName];
	const inProgress = state.inProgress;
	const speed = state.config.speed;
	const label = algorithmData.name;
	const [data, setData] = useState([...state.dataSample]);
	const generator = useMemo(
		() => algorithmData.generator(state.dataSample),
		[state.dataSample]
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (generator && state.inProgress && !state.sortingState[algorithmName]) {
				let next = generator.next();
				if (next.done) {
					state.setSortingState((curr) => ({
						...curr,
						[algorithmName]: true,
					}));
				} else {
					setData([...next.value]);
				}
			}
		}, speed);
		return () => clearTimeout(timer);
	}, [inProgress, data]);

	useEffect(() => {
		setData([...state.dataSample]);
	}, [state.dataSample]);

	return (
		<div className={styles["sort-box-group"]}>
			<span>{label}</span>
			<div className={styles["sort-box"]}>
				{data.map((value, index) => (
					<Bar key={index} value={value} />
				))}
			</div>
		</div>
	);
}
