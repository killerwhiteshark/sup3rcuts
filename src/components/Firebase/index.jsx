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
    this.time = app.firestore.FieldValue.serverTimestamp()
    this.user = false;
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = async (email, password) =>{
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(() => { return true})
      .catch((err) => { throw Error;})
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
  
  doAuthStateChanged = async () => {
    return this.auth.onAuthStateChanged(user => {
      if (user) {
        this.db.collection('users').doc(user.uid)
        .get()
        .then(querySnapshot => {
        this.user = {
          userName: querySnapshot.data().userName,
          email: user.email,
          uid: user.uid
        }
      })
        return true;
      } else {
        return false;
      }      
  })
};

  doSignOut = () => {this.auth.signOut(); return <Redirect exact to='/'/> }
}

const firebase = new Firebase()

export default firebase

