import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Announcements from '../../pages/Announcements';
// import PasswordForgetForm from '../../pages/PasswordForget';

export default ({ isLoggedIn, user, doSetCurrentUser }) => (
  <Switch>
    <Route
      exact 
      path='/'
      render={() => <Home  user={user} isLoggedIn={isLoggedIn}/>}/>
    <Route
      exact
      path='/login'
      render={() => <Login  isLoggedIn={isLoggedIn} doSetCurrentUser={doSetCurrentUser}/>}
    />
    <Route
    exact
    path='/make-announcement'
    render={() => <Announcements currentUser={user}/>}
    />
    <Route
      exact
      path='/signup'
      render={() => <Signup doSetCurrentUser={doSetCurrentUser}/>}
    />
  </Switch>
)
