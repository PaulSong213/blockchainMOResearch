// npx hardhat test
import { expect } from "chai";
import hre from "hardhat";

describe("MyNFT", function () {
	let FiredGuys;
	let firedGuys;

	before(async function () {
		FiredGuys = await hre.ethers.getContractFactory("FiredGuys");
		firedGuys = await FiredGuys.deploy();
		await firedGuys.deployed();
	});

	it("Should mint multiple NFTs in batch", async function () {
		const recipients = [
			"0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
			"0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
			// Add more recipient addresses as needed
		];

		const metadataURIs = [
			"cid/test1.png",
			"cid/test2.png",
			// Add more metadata URIs as needed
		];

		const values = [
			"test1",
			"test2",
			// Add more values as needed
		];

		await firedGuys.mintAcademicDocument(
			recipients[0],
			metadataURIs[0],
			values[0]
		);
		const totalNow = await firedGuys.count();
		const value = await firedGuys.getMintedValue(parseInt(totalNow) - 1);
		console.log(totalNow);
		expect(value).to.equal(values[0]);

		await firedGuys.mintAcademicDocument(
			recipients[1],
			metadataURIs[1],
			values[1]
		);
		const totalNow2 = await firedGuys.count();
		const value2 = await firedGuys.getMintedValue(parseInt(totalNow2) - 1);
		console.log(totalNow2);
		expect(value2).to.equal(values[1]);
	});
});
