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
    <>
    <header>
      <div className='row red darken-4 brand-logo center s6'><h1 className='s6 center' id='title'>Sup3rcuts!</h1></div>
    </header>
    <main>
      <div className="row">
        <div className="col s3 red darken-4" id='side-nav'>
          <div style={{margin: '5px'}}>
          {(isLoggedIn) ? (<Navbar user={currentUser} doSetCurrentUser={doSetCurrentUser} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />) : ''}
          </div>
        </div>
        <div className="col s9">
          <div className='row'>
          <Routes user={currentUser} isLoggedIn={isLoggedIn} doSetCurrentUser={doSetCurrentUser} />            
          </div>
        </div>
      </div>
    </main>
    <div className='row' >
      <div className='center'><footer className="page-footer red darken-4">Sup3rcuts est. 2015-2020</footer></div>
    </div>
    </>
  );
}

export default App;
