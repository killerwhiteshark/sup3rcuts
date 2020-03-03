import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Firebase from '../../components/Firebase'

import AnnounceCommentForm from '../../components/Announcements/AnnounceComments'

const ShowAnnounce = (props) => {
    const [announce, setAnnouce] = useState({});
    const announceId = props.match.params.id;
    useEffect(() => {
        Firebase.getAnnouceById(announceId)
            .then(snapShot => setAnnouce(snapShot))
        }, [props.match.params.id]);

    return(
        <div>
            <h4 className='title'>Announcement</h4>
            <h2>{announce.userName}</h2>
            <h3>Title: {announce.title}</h3>
            <p>Announcement: {announce.content}</p>
            {(Firebase.auth.currentUser.uid === announce.uid) ? (<><i class="material-icons left">build</i><Link to={`/announce/edit/${announceId}`}>Edit Announcement</Link></>): ('')}
            <AnnounceCommentForm />
        </div>
    )
}

export default ShowAnnounce;
