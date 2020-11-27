import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzT5Mr1xSwzbvHBUGu5X4uF3JzqP6rgbo',
  authDomain: 'padelr-49efc.firebaseapp.com',
  databaseURL: 'https://padelr-49efc.firebaseio.com',
  projectId: 'padelr-49efc',
  storageBucket: 'your-project-id-1234.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: '1:1087998311546:ios:b400ed508f131e3c42cfc3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
