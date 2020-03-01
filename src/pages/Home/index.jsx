import React from 'react';
import AnnounceList from '../../components/Announcements';
const Home = ({ isLoggedIn, user}) => {

    return <div>
        <h1> This is the home page</h1>
        <h4>
            {(isLoggedIn) ? (
                `${user.userName} is logged in`,
                <AnnounceList />
            ) : (
                'No User is signed in'
            )}
        </h4>
        </div>
}

export default Home
