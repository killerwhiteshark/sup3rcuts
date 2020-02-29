import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import Firebase from '../../components/Firebase'


const Announcements = ({ user }) => {
    useEffect(() => {
        Firebase.doAuthStateChanged()
    })
    if (!Firebase.auth.currentUser) {
       return <Redirect to='/login'/>
    };
    return (
    <div>
        <h1> This is the Make Announcements page</h1>
        <form>
            <input type="text" placeholder="Make Announcment"/>
            <button type="submit">Submit</button>
        </form>
    </div>)
}

export default Announcements;