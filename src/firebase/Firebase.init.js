import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB7_fZoPURxa_IjWwAUTUlRUEiAixddAqs",
    authDomain: "login-auth-b2c9d.firebaseapp.com",
    projectId: "login-auth-b2c9d",
    storageBucket: "login-auth-b2c9d.appspot.com",
    messagingSenderId: "906846674970",
    appId: "1:906846674970:web:a68e0a66bf45952551b1a3"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export default firebaseApp;