import React, {useEffect} from 'react';
import Firebase from '../../components/Firebase';

const Home = ({ isLoggedIn, user}) => {
    useEffect(async () => {
        const announcCollection = await Firebase.db.collection('announcements').onSnapshot((snapShot) => {
            console.log(snapShot.content)
        })
    }, [])
    return <div>
        <h1> This is the home page</h1>
        <h4>
            {(isLoggedIn) ? `${user.userName} is logged in` : 'No User is signed in'}
        </h4>
        </div>
}

export default Home
