import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD260co_m0cOXtstsqA2Xv6qZwLvaZKVaU",
    authDomain: "playgrounds-c6dfe.firebaseapp.com",
    projectId: "playgrounds-c6dfe",
    storageBucket: "playgrounds-c6dfe.appspot.com",
    messagingSenderId: "527171418881",
    appId: "1:527171418881:web:4148bf0ef446134318f900",
    measurementId: "G-R1PP7LDRG8"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export { firebase }