import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyA5zoRIkabqdiX319_4RUmQ1AhOZ6iRHmw',
  authDomain: 'graphiql-app-1bd52.firebaseapp.com',
  projectId: 'graphiql-app-1bd52',
  storageBucket: 'graphiql-app-1bd52.appspot.com',
  messagingSenderId: '901294650446',
  appId: '1:901294650446:web:ec7173413363add76bff1f',
  measurementId: 'G-2QHT56BNB4',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,

      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
