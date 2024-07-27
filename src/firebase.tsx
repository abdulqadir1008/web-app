import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCBSuV3FzkhZ9pUW8dPq77A-Hy3QI_DYc8',
  authDomain: 'otp-infila.firebaseapp.com',
  projectId: 'otp-infila',
  storageBucket: 'otp-infila.appspot.com',
  messagingSenderId: '591630679806',
  appId: '1:591630679806:web:63295d2110f1c6404c2faf'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default firebaseConfig;
