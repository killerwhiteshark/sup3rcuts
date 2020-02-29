import React, { useState, useEffect } from 'react';
import Routes from './components/Routes';
import Navbar from './components/NavBar';

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
      if(authUser) {
        Firebase.db.collection('users').doc(authUser.uid)
        .get()
        .then(querySnapshot => {
          //set currentUser to {userName: userName from DB}
          doSetCurrentUser({userName: querySnapshot.data().userName})
        })
        setIsLoggedIn(true)
      }
    })
  }, [])

  return (
    <div>
      <header >
        <h1>Sup3rcuts!</h1>
      </header>
      <Navbar user={currentUser} doSetCurrentUser={doSetCurrentUser} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />
      <div>
        <Routes user={currentUser} isLoggedIn={isLoggedIn} doSetCurrentUser={doSetCurrentUser}/>
      </div>
      <footer>
        <p>Sup3rcuts est. 2015-2020</p>
        <script src="/__/firebase/7.9.2/firebase-app.js"></script>
        <script src="/__/firebase/7.9.2/firebase-analytics.js"></script>
        <script src="/__/firebase/init.js"></script>
      </footer>
    </div>
  );
}

export default App;
