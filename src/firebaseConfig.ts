// Import the necessary Firebase modules
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase config here
const firebaseConfig = {
  apiKey: 'AIzaSyCXnin9JndDxAS-AszMrxkKlfVQ_0er_84',
  authDomain: 'react-careers-app-react.firebaseapp.com',
  databaseURL: 'https://react-careers-app-react-default-rtdb.firebaseio.com',
  projectId: 'react-careers-app-react',
  storageBucket: 'react-careers-app-react.appspot.com',
  messagingSenderId: '12415350380',
  appId: '1:12415350380:web:d64eb106948b61ad4a8a49',
  measurementId: 'G-0VEVNP80T7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default database;
