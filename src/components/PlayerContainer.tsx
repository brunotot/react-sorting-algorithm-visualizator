import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { AlgorithmContext } from "./Dashboard";
import { useContext } from "react";
import Card from "./ui/Card";
import ReplayIcon from "@mui/icons-material/Replay";
import { buildDataArray } from "../algorithms/Algorithm";

export type PlayerContainerProps = {};

export default function PlayerContainer(props: PlayerContainerProps) {
	const state = useContext(AlgorithmContext);

	function onProgressToggle() {
		state.setInProgress((curr) => !curr);
	}

	function onShuffleClick() {
		state.setInProgress(false);
		state.setDataSample(buildDataArray(state.dataSample.length));
	}

	return (
		<Card>
			<Button
				variant="contained"
				color={state.inProgress ? "warning" : "success"}
				startIcon={<PlayArrowIcon />}
				onClick={onProgressToggle}
			>
				{state.inProgress ? "Pause" : "Resume"}
			</Button>
			<Button
				variant="text"
				color="primary"
				startIcon={<ReplayIcon />}
				onClick={onShuffleClick}
			>
				Shuffle
			</Button>
		</Card>
	);
}
