import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { Link } from 'react-router-dom';

const AnnounceList = () => {
    const [allAnnoun, setAnnoun] = useState([]);

    useEffect(() => {
        Firebase.db
            .collection('announcements')
            .orderBy("timestamp", 'desc')
            .onSnapshot(snapShot => {
                const announce = snapShot.docs.map((ann) => ({
                    id: ann.id,
                    ...ann.data()
                }))
                return setAnnoun(announce)
            });
    }, []);
    return (
        <div className='row'>
            <div className='col s6 center'>
            <h3>Current Announcements!</h3>                
            </div>
            <ul style={{ border: 'none' }} className="collection with-header col s9">
                {allAnnoun.map((doc) => {
                    return <li style={{ margin: '5px' }} className="collection-item" key={doc.id}><span className="title"><Link to={`/announce/${doc.id}`}>{doc.title}</Link></span><p>{doc.date}</p></li>
                })}
            </ul>
        </div>
    )
}

export default AnnounceList;