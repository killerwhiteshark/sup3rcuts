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

  doSignInWithEmailAndPassword = async (email, password, userName) => {
    await this.auth.signInWithEmailAndPassword(email, password)
  }

  doAuthStateChanged = () => {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.db.collection('users').doc(user.uid)
          .get()
          .then(querySnapshot => {
            this.user = {
              userName: querySnapshot.data().userName,
              email: user.email,
              uid: user.uid,
              logIn: true
            }
          })
      }
    })
  };

  doSignOut = () => {
    this.user = {
      logIn: false,
    }
    this.auth.signOut();
    return <Redirect exact to='/' />
  };

  doDeletePost = async (post) => {
    try {
      this.db.collection("announcements").doc(post).delete()
    } catch (error) {
        console.log(error)
        return error
      }
  };

  doUpdatepost = async (post) => {
    this.db.collection('announcements').doc(post.id).update(post)
      .then(() => { return true })
      .catch(() => { return false });
  }

  getAnnouceById = async (announceId) => {
    try {
      const docRef = this.db.collection('announcements').doc(announceId)
      const data = await docRef.get()
      if (data.exists) {
        return data.data()
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
  doPostComment = ({comment, postId}) => {
    try {
      this.db.collection('comments')
      .add({
        timestamp: this.time,
        uid: this.user.uid,
        userName: this.user.userName,
        comment,
        postId,
        date: new Date().toDateString(),
    });
    } catch (error) {
      console.log(error, 'Failed to post Comment')
    }
  }
  findUser = async (userNameQuery) => {
    let doesExist = false
      const docRef = this.db.collection('users').where('userName', '==', userNameQuery)
      await docRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if(doc.exists){
            doesExist = true
            return
          }
        });
    })
    .catch(function(error) {
        return false
    });
    return doesExist
  }
}

const firebase = new Firebase()

export default firebase

