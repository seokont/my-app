import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV8ZCbnfuvksMKK8RX7EUZlk4GBStJnx4",
  authDomain: "rrrr-84251.firebaseapp.com",
  databaseURL: "https://rrrr-84251-default-rtdb.firebaseio.com",
  projectId: "rrrr-84251",
  storageBucket: "rrrr-84251.appspot.com",
  messagingSenderId: "949212196893",
  appId: "1:949212196893:web:c7c2bca72f37285e40d6f4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
