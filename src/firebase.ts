import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDG7PBRzb9F3oYLklEI1Sb4pa0QSAY5hwc",
  authDomain: "retirement-calculator-18a40.firebaseapp.com",
  projectId: "retirement-calculator-18a40",
  storageBucket: "retirement-calculator-18a40.appspot.com",
  messagingSenderId: "546281613250",
  appId: "1:546281613250:web:472cc48dac72c380ec585b",
  measurementId: "G-6GYWYDS657",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default database;
