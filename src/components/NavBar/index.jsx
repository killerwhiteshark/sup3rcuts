import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import Firebase from '../Firebase';
import firebase from '../Firebase';

const NavBar = ({ isLoggedIn, user, doSetCurrentUser }) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=> {
        firebase.doAuthStateChanged()
    }, [])
    useEffect(()=> {
        setCurrentUser(firebase.user)
    }, [])
    const logoutUser = async () => {
        try {
            await Firebase.doSignOut()
            doSetCurrentUser({})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav>
            <NavLink exact to='/'>Home</NavLink>
            {Firebase.auth.currentUser ? (
                <span style={{ margin: 10 }}>
                    <h3 style={{display: 'inline'}}>Welcome back warrior! -  {currentUser.userName}</h3>
                    <NavLink
                        exact
                        to='/login'
                        left='false'
                        children='Logout'
                        onClick={logoutUser}
                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                    />
                    <NavLink
                    to='/make-announcement'
                    children='Make Announcement'
                    />
                </span>
            ) : (
                    <>
                        <NavLink exact to='/signup'>Sign Up</NavLink>
                        <NavLink exact to='/login'>Log In</NavLink>
                    </>
                )}
        </nav>
    )
}

export default NavBar