import { Card as CardMUI } from "@mui/material";
import styles from "./../../assets/scss/Card.module.scss";

export type CardProps = {
	spacing?: number;
	children: any;
};

export default function Card(props: CardProps) {
	const spacing = props.spacing ?? 1;
	return (
		<CardMUI style={{ gap: `${spacing}rem` }} className={styles["card"]}>
			{props.children}
		</CardMUI>
	);
}
