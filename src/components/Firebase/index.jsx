import React from 'react';
import { Redirect } from 'react-router-dom'
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = async (email, password) =>{
    debugger
      this.auth.signInWithEmailAndPassword(email, password)
      .then(user => {console.log(user); debugger})
      .catch(error => {console.log(error); debugger; return false})
  }
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doSignOut = () => {this.auth.signOut(); return <Redirect exact to='/'/> }
}

const firebase = new Firebase()

export default firebase

