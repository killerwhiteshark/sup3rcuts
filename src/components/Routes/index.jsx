import React, {useEffect} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Firebase from '../Firebase'

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Announcements from '../../pages/Announcements';
import ShowAnnounce from '../../pages/Announcements/show';
import Landing from '../../pages/Landing';
import EditAnnounce from '../../pages/Announcements/EditAnnounce'
import PasswordForgetForm from '../../pages/PasswordForget';

export default ({ isLoggedIn, user, doSetCurrentUser }) => {
  useEffect(()=> {
    Firebase.doAuthStateChanged()
}, [])
 return(
  <Switch>
  <Route
    exact
    path='/'
    component={Landing}
  />
  <Route
    exact
    path='/login'
    render={() => <Login doSetCurrentUser={doSetCurrentUser} />}
  />
  <Route
    exact
    path='/signup'
    render={() => <Signup doSetCurrentUser={doSetCurrentUser} />}
  />
  <Route 
  exact
  path='/password-forget'
  component={PasswordForgetForm}
  />
  {(isLoggedIn) ? (
    <>
      <Route
        exact
        path='/main'
        render={() => <Home user={user} />}
      />
      <Route
        exact
        path='/make-announcement'
        render={() => <Announcements currentUser={user} />}
      />
      <Route
      exact
      path='/announce/edit/:id'
      component={EditAnnounce} 
      />
      <Route
        exact
        path='/announce/:id'
        component={ShowAnnounce}
      />
    </>
  ) : (
      <Redirect exact to='/' />
    )}
</Switch>
 )
}


