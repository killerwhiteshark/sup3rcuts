import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import Firebase from '../../components/Firebase'

const ShowAnnounce = (props) => {
    const [announce, setAnnouce] = useState({username: '', content: ''});
    const [input, setInput] = useState({});

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
        </div>
    )
}

export default ShowAnnounce;
