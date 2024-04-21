// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from './firebase'; // Import firebaseConfig

// Initialize Firebase
// Note: You might need to initialize other Firebase services here if required
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
