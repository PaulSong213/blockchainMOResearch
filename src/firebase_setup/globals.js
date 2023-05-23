import { database } from "../firebase_setup/firebase";
import { get, ref, set, push, child } from "firebase/database";

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

export const firebaseGetBatch = async (batchKey) => {
	const db = database;
	let batches = null;
	await get(child(ref(db), `batches/${batchKey}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				batches = snapshot.val();
				console.log("GET BATCH: ", batches);
			} else {
				console.log("No data available");
			}
		})
		.catch((error) => {
			console.error(error);
		});
	return batches;
};

export const firebaseGetAllBatch = async (x) => {
	const db = database;
	let batches = null;
	await get(child(ref(db), `batches/`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				batches = snapshot.val();
				console.log("GET BATCH: ", batches);
			} else {
				console.log("No data available");
			}
		})
		.catch((error) => {
			console.error(error);
		});
	return batches;
};
