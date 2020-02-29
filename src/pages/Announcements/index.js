import React from 'react';
import { Redirect } from 'react-router-dom'

const Announcements = ({ isLoggedIn, user}) => {
    if (!isLoggedIn) {

        return <Redirect to='/login' />
    }
    return (<div>
        <h1> This is the Make Announcements page</h1>
        </div>)
}

export default Announcements;