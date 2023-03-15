// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDM5PS3ezqlOB2XIQvoEDucra33Ny9_MrE',
  authDomain: 'kanbantaskmanager-843c3.firebaseapp.com',
  projectId: 'kanbantaskmanager-843c3',
  storageBucket: 'kanbantaskmanager-843c3.appspot.com',
  messagingSenderId: '479966640279',
  appId: '1:479966640279:web:29df7e1b12b076bdd451d2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
