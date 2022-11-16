import Algorithm, {
	ALGORITHM_KEYS,
	IAlgorithmKey,
	SortingState,
} from "../algorithms/Algorithm";
import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { AlgorithmContext } from "./Dashboard";
import { useContext, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";

export type AlgorithmSelectionProps = {};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 450,
		},
	},
};

function getStyles(algorithmKey: string, textValue: string[], theme: Theme) {
	return {
		fontWeight:
			textValue.indexOf(algorithmKey) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function AlgorithmSelection(props: AlgorithmSelectionProps) {
	const state = useContext(AlgorithmContext);
	const theme = useTheme();
	const [textValue, setTextValue] = useState<string[]>(state.algorithms);

	const handleChange = (event: SelectChangeEvent<typeof ALGORITHM_KEYS>) => {
		const {
			target: { value },
		} = event;

		const algorithms = (
			Array.isArray(value) ? value : !value ? [] : [value]
		) as IAlgorithmKey[];

		if (algorithms.length > 0) {
			setTextValue(typeof value === "string" ? value.split(",") : value);
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
		<div>
			<FormControl sx={{ width: "80vw" }}>
				<InputLabel id="algorithm-selection">Algorithms</InputLabel>
				<Select
					labelId="algorithm-selection"
					multiple
					value={textValue as IAlgorithmKey[]}
					onChange={handleChange}
					input={<OutlinedInput label="Algorithms" />}
					MenuProps={MenuProps}
				>
					{ALGORITHM_KEYS.map((algorithmKey) => (
						<MenuItem
							key={algorithmKey}
							value={algorithmKey}
							style={getStyles(algorithmKey, textValue, theme)}
						>
							{Algorithm[algorithmKey].name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
