import React, { useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import Firebase from '../Firebase';

const NavBar = ({ isLoggedIn, user, doSetCurrentUser }) => {
    useEffect(()=> {
        Firebase.doAuthStateChanged()
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
        <>
            <div className=" red darken-4">
                <ul id="side-nav">
                    <li><NavLink exact to='/main'>Home</NavLink></li>
                    <li className='brand-logo'>{user.userName}</li>
                    <li><NavLink
                        exact
                        to='/login'
                        left='false'
                        children='Logout'
                        onClick={logoutUser}
                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                    /></li>
                    <li><NavLink
                    to='/make-announcement'
                    children='Make Announcement'
                    /></li>
                </ul>
            </div>
        </>
    )
}

export default NavBar