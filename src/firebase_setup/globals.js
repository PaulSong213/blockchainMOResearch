import { database } from "../firebase_setup/firebase";
import { ref, set, push, child } from "firebase/database";

export const storeReceipt = async (
	batchKey,
	tokenId,
	CPN,
	certifiedDate,
	txReceipt,
	isLast
) => {
	const db = database;
	let status = "pending";
	console.log(status);
	await set(ref(db, `batches/${batchKey}/tokens/${tokenId}`), {
		CPN: CPN,
		certifiedDate: certifiedDate,
		txReceipt: txReceipt,
	});
	if (isLast) {
		await set(ref(db, `batches/${batchKey}/status`), "complete");
	}
};

export const firebaseCreateBatch = async (batchInfo) => {
	const db = database;
	batchInfo.status = "pending";
	const batchKey = push(child(ref(db), "batches")).key;
	await set(ref(db, "batches/" + batchKey), batchInfo);
	return batchKey;
};
