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
    <div>
      <header>
        <div className='red darken-4 brand-logo center'><h1 id='title'>Sup3rcuts!</h1></div>
      </header>
      <div className="row">
          <div className="col s3">
            {(isLoggedIn) ? (<Navbar user={currentUser} doSetCurrentUser={doSetCurrentUser} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />) : ''}
          </div>
          <div className="col s9">
          <Routes user={currentUser} isLoggedIn={isLoggedIn} doSetCurrentUser={doSetCurrentUser} />
          </div>
        </div>
      <footer>
        <p>Sup3rcuts est. 2015-2020</p>
      </footer>
    </div>
  );
}

export default App;
