import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyD849RuUUme4YhQrzi19ZJpxRmptaUTArc',
	authDomain: 'card-creator-a93e4.firebaseapp.com',
	databaseURL: 'https://card-creator-a93e4.firebaseio.com',
	projectId: 'card-creator-a93e4',
	storageBucket: 'card-creator-a93e4.appspot.com',
	messagingSenderId: '1013132877384',
	appId: '1:1013132877384:web:a5b831b5b68c057effc27d',
});
firebase.auth();

const db = firebaseApp.firestore();

export { db };
