// # terminal 1
// npx hardhat node

// # terminal 2
// npx hardhat compile
// npx hardhat run scripts/sample-script.js --network localhost

import Install from "./components/Install";
import Home from "./components/Home";
function App() {
	if (window.ethereum) {
		return <Home />;
	} else {
		return <Install />;
	}
}

export default App;
