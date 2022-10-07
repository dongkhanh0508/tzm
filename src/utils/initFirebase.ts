import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDSxCd191lfP-8cclNT-Bms19ycL6RPd6A',
  authDomain: 'loginkhanhnd.firebaseapp.com',
  databaseURL: 'https://loginkhanhnd.firebaseio.com',
  projectId: 'loginkhanhnd',
  storageBucket: 'loginkhanhnd.appspot.com',
  messagingSenderId: '320102385552',
  appId: '1:320102385552:web:9b0cc6e50df6f7a5f95515',
  measurementId: 'G-FNV8FL7NF1',
};
// function initFirebase() {
//   if (!firebase.getApp.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
// }

// initFirebase();
// export { firebase };

const app = initializeApp(firebaseConfig);
export { app };
