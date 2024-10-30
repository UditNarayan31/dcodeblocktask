// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBE67kkXHTDZcfkuyUaXHUiupmA0E045P8",
    authDomain: "shop-ecom-2aaef.firebaseapp.com",
    projectId: "shop-ecom-2aaef",
    storageBucket: "shop-ecom-2aaef.appspot.com",
    messagingSenderId: "845151899941",
    appId: "1:845151899941:web:af80128cf1d0dbfd8bcacc",
    measurementId: "G-HGRXMC12K9",
    databaseURL: "https://shop-ecom-2aaef-default-rtdb.firebaseio.com" // Add this line
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
