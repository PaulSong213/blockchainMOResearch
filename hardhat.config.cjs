require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	artifacts: "./src/artifacts",
	networks: {
		sepolia: {
			url: "https://eth-sepolia.g.alchemy.com/v2/EvEvQwyNU3wMa104KAw8E_S8cGt2FvnS",
			accounts: [
				`0x66a9ce188ff8ebba8b6098391655e0adffd3f4206474796ea62130fecea19535`,
			],
		},
	},
};
