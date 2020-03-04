import React from 'react';
import AnnounceList from '../../components/Announcements'
import Firebase from '../../components/Firebase'

const Home = () => {

    return(
            <div className="container">
                <button className='btn' onClick={Firebase.findUser}>Find User</button>
                <AnnounceList />
            </div>
    )
}

export default Home
