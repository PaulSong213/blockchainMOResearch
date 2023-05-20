// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCWClXJ7y97v4aWym4xFpX_V4Wi2Jl_kcs",
	authDomain: "blockchain-diploma.firebaseapp.com",
	projectId: "blockchain-diploma",
	storageBucket: "blockchain-diploma.appspot.com",
	messagingSenderId: "337687541450",
	appId: "1:337687541450:web:fbc3784c48eb1f74dd2633",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
