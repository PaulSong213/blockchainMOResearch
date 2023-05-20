import { database } from "../firebase_setup/firebase";
import { ref, set } from "firebase/database";

export const storeReceipt = (tokenId, transactionReceipt) => {
	const db = database;
	set(ref(db, "receipts/" + tokenId), transactionReceipt);
};
