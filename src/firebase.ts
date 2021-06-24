import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { store } from './store';
import { setCurrentUserID } from './store/auth/authActionCreators';

const app = Firebase.initializeApp({
	apiKey: 'AIzaSyD849RuUUme4YhQrzi19ZJpxRmptaUTArc',
	authDomain: 'card-creator-a93e4.firebaseapp.com',
	databaseURL: 'https://card-creator-a93e4.firebaseio.com',
	projectId: 'card-creator-a93e4',
	storageBucket: 'card-creator-a93e4.appspot.com',
	messagingSenderId: '1013132877384',
	appId: '1:1013132877384:web:a5b831b5b68c057effc27d',
});
Firebase.auth();

const auth = app.auth();

const storage = app.storage();

app.auth().onAuthStateChanged((user: Firebase.User) => {
	store.dispatch(setCurrentUserID(user?.uid));
});

const db: Firebase.firestore.Firestore = app.firestore();

export { db, storage, auth };
