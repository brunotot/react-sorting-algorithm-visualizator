import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap, Typography } from "@mui/material";

export type SliderControlProps = {
	onChangeEnd?: (value: number) => void;
	step?: number;
	min?: number;
	max?: number;
	defaultValue: number;
	spacing?: number;
	direction?: "row" | "row-reverse" | "column" | "column-reverse";
	alignItems?: "flex-start" | "center" | "flex-end";
	label?: string;
	icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string;
	};
	iconFontSize?: "small" | "inherit" | "large" | "medium";
};

export default function SliderControl(props: SliderControlProps) {
	const iconFontSize = props.iconFontSize ?? "large";
	const min = props.min ?? 0;
	const max = props.max ?? 100;
	const step = props.step ?? 1;
	const spacing = props.spacing ?? 1;
	const direction = props.direction ?? "row";
	const alignItems = props.alignItems ?? "center";
	const IconElement = props.icon;
	const [value, setValue] = useState(props.defaultValue);
	const handleChange = (event: Event, newValue: number | number[]) => {
		let newValueNumber = newValue as number;
		setValue(newValueNumber);
		props.onChangeEnd?.(newValueNumber);
	};

	return (
		<Stack
			style={{ width: "100%" }}
			spacing={spacing}
			direction={direction}
			alignItems={alignItems}
		>
			{IconElement && <IconElement fontSize={iconFontSize} />}
			{props.label && <Typography gutterBottom>{props.label}</Typography>}
			<Slider
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={handleChange}
			/>
		</Stack>
	);
}
