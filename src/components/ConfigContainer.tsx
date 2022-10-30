import { Stack } from "@mui/material";
import AlgorithmSelection from "./AlgorithmSelection";
import Card from "./ui/Card";
import SpeedSliderControl from "./controls/slider/impl/SpeedSliderControl";
import SizeSliderControl from "./controls/slider/impl/SizeSliderControl";

export type ConfigContainerProps = {
	spacing?: number;
};

export default function ConfigContainer(props: ConfigContainerProps) {
	const spacing = props.spacing ?? 2;

	return (
		<Card>
			<Stack direction="column" spacing={spacing}>
				<AlgorithmSelection />
				<SpeedSliderControl />
				<SizeSliderControl />
			</Stack>
		</Card>
	);
}
