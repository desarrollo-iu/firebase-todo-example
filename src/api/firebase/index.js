var firebase = require('firebase');

var firebaseConfig = {
  apiKey: "AIzaSyBV3z5iuNtvTxon5uVd8cLVr4RiEDdWpjw",
  authDomain: "desarrollo-ui-todo.firebaseapp.com",
  databaseURL: "https://desarrollo-ui-todo.firebaseio.com",
  projectId: "desarrollo-ui-todo",
  storageBucket: "desarrollo-ui-todo.appspot.com",
  messagingSenderId: "1001654487452"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
