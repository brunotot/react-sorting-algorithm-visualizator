import SpeedIcon from "@mui/icons-material/Speed";
import { AlgorithmContext } from "../../../Dashboard";
import SliderControl from "../SliderControl";
import { useContext } from "react";

export default function SpeedSliderControl() {
	const state = useContext(AlgorithmContext);

	function onChangeEnd(value: number) {
		state.setConfig({ speed: Math.abs(value - 100) });
	}

	return (
		<SliderControl
			label="Speed"
			icon={SpeedIcon}
			defaultValue={50}
			onChangeEnd={onChangeEnd}
		/>
	);
}
