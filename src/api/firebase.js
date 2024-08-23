// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCgjilMMJRvi2J6A7UWJ1HlPytfgw-SEZ8',
  authDomain: 'e-commerce-mi-tienda.firebaseapp.com',
  projectId: 'e-commerce-mi-tienda',
  storageBucket: 'e-commerce-mi-tienda.appspot.com',
  messagingSenderId: '800543410493',
  appId: '1:800543410493:web:c3d3b6b8b91fcf8f701d54',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
