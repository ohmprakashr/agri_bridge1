// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAsfNGv3YtvZTJIRGHe3AZVv7OUqzghtgQ",
    authDomain: "agribridge-login.firebaseapp.com",
    projectId: "agribridge-login",
    storageBucket: "agribridge-login.firebasestorage.app",
    messagingSenderId: "325242239939",
    appId: "1:325242239939:web:4ad5b7faaabfaf0e4d5b76",
    measurementId: "G-73TLZEHKKJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
