// import {secureStorage} from '../storage/secureStorage';

// export function login() {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(() => {
//       const uid = response.user.uid;
//       const usersRef = firebase.firestore().collection('users');

//       usersRef
//         .doc(uid)
//         .get()
//         .then((firestoreDocument) => {
//           if (!firestoreDocument.exists) {
//             alert('User does not exist!');
//             return;
//           }
//           const user = firestoreDocument.data();
//           secureStorage(user);
//         });
//     });
// }

// export function registration() {}
