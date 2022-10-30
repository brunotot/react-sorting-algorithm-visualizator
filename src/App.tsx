import "./App.scss";
import BarContainer from "./components/Dashboard";

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
