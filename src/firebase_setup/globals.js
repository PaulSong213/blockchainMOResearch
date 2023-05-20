import { database } from "../firebase_setup/firebase";
import { ref, set, push, child } from "firebase/database";

export const storeReceipt = (tokenId, transactionReceipt) => {
	const db = database;
	set(ref(db, "receipts/" + tokenId), transactionReceipt);
};

export const firebaseCreateBatch = async (batchInfo) => {
	const db = database;
	const batchKey = push(child(ref(db), "batches")).key;
	await set(ref(db, "batches/" + batchKey), batchInfo);
	return batchKey;
};
