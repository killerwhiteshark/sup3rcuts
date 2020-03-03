import React, { useState, useEffect } from 'react';
import Routes from './components/Routes';
import Navbar from './components/NavBar';

import './App.css'

import Firebase from './components/Firebase'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const doSetCurrentUser = (user) => {
    setCurrentUser(user)
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(() => {
    Firebase.auth.onAuthStateChanged(authUser => {
      //if user is Auth, search users DB for usernames tied to user.uid
      if (authUser) {
        Firebase.db.collection('users').doc(authUser.uid)
          .get()
          .then((querySnapshot) => {
            //set currentUser to {userName: userName from DB}
            doSetCurrentUser({ userName: querySnapshot.data().userName, uid: authUser.uid })
            setIsLoggedIn(true)
          })
      }
    })
  }, [])

  return (
    <div className='section'>
      <header>
        <div className='red darken-4 brand-logo center'><h1 id='title'>Sup3rcuts!</h1></div>
      </header>
      <div className="row">
        <div className="col s3 red darken-4" id='side-nav'>
          {(isLoggedIn) ? (<Navbar user={currentUser} doSetCurrentUser={doSetCurrentUser} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />) : ''}
        </div>
        <div className="col s9" style={{ height: "50vw" }}>
          <Routes user={currentUser} isLoggedIn={isLoggedIn} doSetCurrentUser={doSetCurrentUser} />
        </div>
        </div>
    </div>
  );
}

export default App;
