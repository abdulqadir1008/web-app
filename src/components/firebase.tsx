import {getAuth} from 'firebase/auth'
import {initializeApp} from 'firebase/app'

const config = {
  apiKey: 'AIzaSyASaaTh3uHmvprlhdhsZr8AFa-lLOHAxvQ',
  authDomain: 'infila-368815.firebaseapp.com',
  projectId: 'infila-368815',
  storageBucket: 'infila-368815.appspot.com',
  messagingSenderId: '60466305550',
  appId: '1:60466305550:web:7edc2904796931ee20ba5f',
  measurementId: 'G-MQ7EBCMYEK'
};
const app = initializeApp(config);
export const auth = getAuth(app);
export default config;