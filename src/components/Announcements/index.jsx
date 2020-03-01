import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';

const AnnounceList = () => {
    const [allAnnoun, setAnnoun] = useState([]);
    const [secondList, setSecond] = useState([]);
    useEffect(() => {
        Firebase.db
        .collection('announcements')
        .orderBy("timestamp", 'desc')
        .onSnapshot((snapShot) => {
            const announce = snapShot.docs.map((ann) => ({
                id: ann.id,
                ...ann.data()
            }))
        setAnnoun(announce)
        })
    }, []);
    return <div>
        <h3>Current Announcements!</h3>
        <ul>
        {allAnnoun.map((doc) =>
            <li key={doc.id}>{doc.content} - User {doc.uid} {doc.date}</li> 
        )}    
        </ul>
    </div>
}

export default AnnounceList;