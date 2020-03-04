import React, { useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import Firebase from '../Firebase';

const NavBar = ({ isLoggedIn, user, doSetCurrentUser }) => {
    useEffect(()=> {
        Firebase.doAuthStateChanged()
    }, [])
    const logoutUser = () => {
        try {
            Firebase.doSignOut()
            doSetCurrentUser({})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id="my-nav">
            <ul id="side-nav">
            <li className='brand-logo'>{user.userName}</li>
                <NavLink exact to='/main'>Home</NavLink>
                <NavLink
                    exact
                    to='/login'
                    left='false'
                    children='Logout'
                    onClick={logoutUser}
                />
                <NavLink
                to='/make-announcement'
                children='Make Announcement'
                />
            </ul>
        </div>
    )
}

export default NavBar