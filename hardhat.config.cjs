require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	artifacts: "./src/artifacts",
	networks: {
		sepolia: {
			url: "https://eth-sepolia.g.alchemy.com/v2/H8FXSCwpMG6YmhK4PNz7TS8cCKC1KiUC",
			accounts: [
				`0x1e83e6c65c8fc56b32b85fd08489743044b6f4078f44ad510fe93ba0c59b128b`,
			],
		},
	},
};
