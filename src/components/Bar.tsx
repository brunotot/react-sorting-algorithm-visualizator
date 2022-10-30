import styles from "./../assets/scss/Bar.module.scss";

export type BarProps = {
	value: number;
};

export default function Bar(props: BarProps) {
	let value = props.value;
	const style = { "--bar": value } as React.CSSProperties;
	return <div className={styles["bar"]} style={style} data-value={value}></div>;
}
