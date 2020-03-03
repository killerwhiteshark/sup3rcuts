import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import {Link} from 'react-router-dom';

const AnnounceList = () => {
    const [allAnnoun, setAnnoun] = useState([]);
    
    useEffect(() => {
    Firebase.db
            .collection('announcements')
            .orderBy("timestamp", 'desc')
            .onSnapshot((snapShot) => {
                const announce = snapShot.docs.map((ann) => ({
                    id: ann.id,
                    ...ann.data()
                }))
                return setAnnoun(announce)
            });
    }, []);
    return (
        <div style={{display: 'flex', flexDirection:'column'}} className='container'>
            <h3>Current Announcements!</h3>
            <ul>
                {allAnnoun.map((doc, idx) => {
                return <li className="card-panel red darken-4" key={doc.id}>By: {doc.userName} - <Link to={`/announce/${doc.id}`}>{doc.title}</Link> - Date {doc.date}</li>
                })}
            </ul>
        </div>)
}

export default AnnounceList;
