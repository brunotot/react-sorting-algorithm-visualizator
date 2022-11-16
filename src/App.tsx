import "./App.scss";
import BarContainer from "./components/Dashboard";

function isFullScreen(): boolean {
	let params = new URLSearchParams(document.location.search);
	let isFullScreen = params.get("fullscreen") === "true";
	return isFullScreen;
}

function App() {
	const fullScreen = isFullScreen();

	return (
		<div data-fullscreen={fullScreen ? "" : undefined}>
			<div className="context">
				<BarContainer count={15} speed={60} />
			</div>

			<div className="area">
				<ul className="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
}

export default App;
