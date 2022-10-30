import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SortIcon from "@mui/icons-material/Sort";
import Algorithm, {
	ALGORITHM_KEYS,
	IAlgorithmKey,
	SortingState,
} from "../algorithms/Algorithm";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { AlgorithmContext } from "./Dashboard";
import { useContext } from "react";

export type AlgorithmSelectionProps = {};

export default function AlgorithmSelection(props: AlgorithmSelectionProps) {
	const state = useContext(AlgorithmContext);

	const handleAlgorithmSelection = (
		event: React.MouseEvent<HTMLElement>,
		algorithms: IAlgorithmKey[]
	) => {
		if (algorithms.length > 0) {
			const sortingStateEval: SortingState = algorithms.reduce(
				(prev, algorithmKey) => ({ ...prev, [algorithmKey]: false }),
				{}
			);
			state.setSortingState(sortingStateEval);
			state.setAlgorithms(algorithms);
			state.setInProgress(false);
		}
	};

	return (
		<Stack spacing={1} direction="row" alignItems="center">
			<SortIcon fontSize="large" />
			<Typography gutterBottom>Algorithms</Typography>
			<ToggleButtonGroup
				value={state.algorithms}
				onChange={handleAlgorithmSelection}
			>
				{ALGORITHM_KEYS.map((key) => (
					<ToggleButton key={key} value={key}>
						{Algorithm[key].name}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Stack>
	);
}
