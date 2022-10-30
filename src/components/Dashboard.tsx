import React, { useEffect, useState } from "react";
import styles from "./../assets/scss/Dashboard.module.scss";
import ConfigContainer from "./ConfigContainer";
import PlayerContainer from "./PlayerContainer";
import SortBoxContainer from "./SortBoxContainer";
import {
	ALGORITHM_KEYS,
	buildDataArray,
	IAlgorithmConfig,
	IAlgorithmKey,
	IGeneratorParam,
	SortingState,
} from "../algorithms/Algorithm";

export type BarContainerProps = {
	speed?: number;
	count?: number;
	min?: number;
	max?: number;
};

export interface IAlgorithmContext {
	algorithms: IAlgorithmKey[];
	setAlgorithms: (algorithms: IAlgorithmKey[]) => void;
	sortingState: SortingState;
	setSortingState: (
		sortingState: SortingState | ((value: SortingState) => SortingState)
	) => void;
	config: IAlgorithmConfig;
	setConfig: (config: IAlgorithmConfig) => void;
	dataSample: IGeneratorParam;
	setDataSample: (dataSample: IGeneratorParam) => void;
	inProgress: boolean;
	setInProgress: (inProgress: boolean | ((value: boolean) => boolean)) => void;
}

export const AlgorithmContext: React.Context<IAlgorithmContext> =
	React.createContext({} as any);

export default function BarContainer(props: BarContainerProps) {
	const speed = props.speed ?? 50;
	const count = props.count ?? 100;
	const min = props.min ?? 1;
	const max = props.max ?? 100;

	const initialAlgorithmName = ALGORITHM_KEYS[0];
	const dataSampleInitialValue = buildDataArray({ count, min, max });
	const [dataSample, setDataSample] = useState(dataSampleInitialValue);
	const [algorithms, setAlgorithms] = useState([initialAlgorithmName]);
	const [inProgress, setInProgress] = useState(false);
	const [config, setConfig] = useState({ speed });
	const [sortingState, setSortingState] = useState({
		[initialAlgorithmName]: false,
	});

	const state: IAlgorithmContext = {
		algorithms,
		setAlgorithms,
		inProgress,
		setInProgress,
		config,
		setConfig,
		dataSample,
		setDataSample,
		sortingState,
		setSortingState,
	};

	useEffect(() => {
		if (state.inProgress) {
			const inProgressEval = Object.values(state.sortingState).some(
				(bool) => bool === false
			);
			state.setInProgress(inProgressEval);
		}
	}, [state.sortingState]);

	useEffect(() => {
		if (!state.inProgress) {
			const sortingStateEval = Object.keys(state.sortingState).reduce(
				(prev, algorithmKey) => ({ ...prev, [algorithmKey]: false }),
				{}
			);
			state.setSortingState(sortingStateEval);
		}
	}, [state.inProgress]);

	return (
		<AlgorithmContext.Provider value={state}>
			<div className={styles["dashboard"]}>
				<ConfigContainer />
				<SortBoxContainer />
				<PlayerContainer />
			</div>
		</AlgorithmContext.Provider>
	);
}
