import SortBox from "./SortBox";
import styles from "./../assets/scss/SortBoxContainer.module.scss";
import { useContext } from "react";
import { AlgorithmContext } from "./Dashboard";

export type SortBoxContainerProps = {};

export default function SortBoxContainer(props: SortBoxContainerProps) {
	const state = useContext(AlgorithmContext);
	const algorithms = state.algorithms;

	return (
		<div className={styles["bar-container"]}>
			{algorithms.map((name) => (
				<SortBox key={name} algorithmName={name} />
			))}
		</div>
	);
}
