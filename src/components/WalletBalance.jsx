import { useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
	const [balance, setBalance] = useState();
	const getBalance = async () => {
		const [account] = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
		const balance = await provider.getBalance(account);
		setBalance(ethers.utils.formatEther(balance));
	};

	return (
		<div>
			<div>
				<h5>Your Balance: {balance}</h5>
				<button className="btn btn-primary" onClick={getBalance}>
					Get Balance
				</button>
			</div>
		</div>
	);
}
export default WalletBalance;
