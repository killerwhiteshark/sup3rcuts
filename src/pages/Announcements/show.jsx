import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Firebase from '../../components/Firebase'

import AnnounceCommentForm from '../../components/Announcements/AnnounceComments'

const ShowAnnounce = (props) => {
    const [announce, setAnnouce] = useState({});
    useEffect(() => {
        const announceId = props.match.params.id;
        Firebase.getAnnouceById(announceId)
            .then(snapShot => setAnnouce(snapShot))
        }, []);

    return(
        <div>
            <h3>this is the show page!</h3>
            <h2>{announce.userName}</h2>
            <h4 className='title'>Announcement</h4>
            <p>{announce.content}</p>
            {(Firebase.auth.currentUser.uid === announce.uid) ? (<Link exact to={`/announce/edit/${announce.uid}`}>Edit Announcement</Link>): ('')}
            <AnnounceCommentForm />
        </div>
    )
}

export default ShowAnnounce;
