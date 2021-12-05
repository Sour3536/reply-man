import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA5wxrmckDaHe6vkiiN1Vkr-6a4rMZH5F8',
	authDomain: 'reply-man.firebaseapp.com',
	projectId: 'reply-man',
	storageBucket: 'reply-man.appspot.com',
	messagingSenderId: '313751208432',
	appId: '1:313751208432:web:eec9465c423bcc57719d35'
};
const app = initializeApp(firebaseConfig);
export default getFirestore();
