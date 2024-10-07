// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyALCVqFiEfTChY2bSKk0ZDkK1vd-M1MR4I",
    authDomain: "auto-ecole-react.firebaseapp.com",
    projectId: "auto-ecole-react",
    storageBucket: "auto-ecole-react.appspot.com",
    messagingSenderId: "148990119022",
    appId: "1:148990119022:web:818a572d788c7dac9caa7f",
    measurementId: "G-0TEWF5W0T7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, auth, googleProvider, facebookProvider };