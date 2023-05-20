import { expect } from "chai";
import hre from "hardhat";

describe("MyNFT", function () {
	it("Should mint and transer NFT", async function () {
		const FiredGuys = await hre.ethers.getContractFactory("FiredGuys");
		const firedGuys = await FiredGuys.deploy();
		await firedGuys.deployed();
		const recipient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
		const metadataURI = "cid/test.png";
		let balance = await firedGuys.balanceOf(recipient);
		expect(balance).to.equal(0);
		const newlyMintedToken = await firedGuys.mintAcademicDocument(
			recipient,
			metadataURI
		);
		// wait until the transaction is mined
		await newlyMintedToken.wait();

		balance = await firedGuys.balanceOf(recipient);
		expect(balance).to.equal(1);
		expect(await firedGuys.isContentOwned(metadataURI)).to.equal(true);
	});
});
