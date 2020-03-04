import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Firebase from '../../components/Firebase'

import CommentForm from '../../components/Comments'
import ShowComments from '../../components/Comments/Show'

const ShowAnnounce = (props) => {
    const [announce, setAnnouce] = useState({});
    const announceId = props.match.params.id;
    useEffect(() => {
        Firebase.getAnnouceById(announceId)
            .then(snapShot => setAnnouce(snapShot))
    }, [props.match.params.id, announceId]);

    return (
        <div>
            <h4 className='title'>Announcement</h4>
            <div className="row">
                <div className="col">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <h4 className="card-title">{announce.title}</h4>
                            <>{announce.userName}</>
                            <h5>Announcement:</h5>
                                <div class="card-content">
                                    <h4>{announce.content}</h4>
                                </div>
                                <div>
                                    {announce.date}
                                </div>
                            {(Firebase.auth.currentUser.uid === announce.uid) ? (
                                <div className="card-action">
                                <><i className="material-icons left">build</i><Link to={`/announce/edit/${announceId}`}>Edit Announcement</Link></>
                                </div>
                            ) : ('')}
                        </div>
                    </div>
                </div>
            </div>
                            <CommentForm post={announceId} />
                            <ShowComments post={announceId} />
                        </div>
                        )
                    }
                    
                    export default ShowAnnounce;
