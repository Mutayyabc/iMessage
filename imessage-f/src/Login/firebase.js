import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyB_GeIowYer7okipijGoUiKjg4xweu82x8",
  authDomain: "imessage-final.firebaseapp.com",
  projectId: "imessage-final",
  storageBucket: "imessage-final.appspot.com",
  messagingSenderId: "687002680244",
  appId: "1:687002680244:web:07bfc3435cc4a54be450e1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
