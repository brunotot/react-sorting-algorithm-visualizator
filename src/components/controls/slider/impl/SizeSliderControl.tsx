import SliderControl from "../SliderControl";
import DataArrayIcon from "@mui/icons-material/DataArray";
import { useContext } from "react";
import { AlgorithmContext } from "../../../Dashboard";
import { buildDataArray } from "../../../../algorithms/Algorithm";

export default function SizeSliderControl() {
	const state = useContext(AlgorithmContext);

	function onChangeEnd(value: number) {
		state.setInProgress(false);
		state.setDataSample(buildDataArray(value));
	}
	return (
		<SliderControl
			label="Size"
			icon={DataArrayIcon}
			min={15}
			defaultValue={20}
			onChangeEnd={onChangeEnd}
		/>
	);
}
