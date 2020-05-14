import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import Routes from './components/Routes';
import Navbar from './components/NavBar';

import useStyles from './components/Theme/Style';


import './App.css'

import Firebase from './components/Firebase'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();
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
      <div className={classes.main}>
    <header>
      <Typography variant='h2' align='center'>Sup3rcuts!</Typography>
    </header>
    <main>
      <div className="row">
          <div style={{margin: '5px'}}>
          {(isLoggedIn) ? (<Navbar user={currentUser} doSetCurrentUser={doSetCurrentUser} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />) : ''}
          </div>
          <Routes user={currentUser} isLoggedIn={isLoggedIn} doSetCurrentUser={doSetCurrentUser} />            
      </div>
    </main>
    <div className='row' >
      <div className='center'><footer>Sup3rcuts est. 2015-2020</footer></div>
    </div>
    </div>
  );
}

export default App;
