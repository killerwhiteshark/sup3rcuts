import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';

const AnnounceList = () => {
    const [allAnnoun, setAnnoun] = useState([]);
    useEffect(() => {
        Firebase.db
        .collection('announcements')
        .onSnapshot((snapShot) => {
            const announce = snapShot.docs.map((ann) => ({
                id: ann.id,
                ...ann.data()
            }))
        setAnnoun(announce)
        })
    }, []);
    return <div>
        {allAnnoun.map((doc) => 
            <li key={doc.id}>
                {doc.content} at {doc.date}
            </li>
        )}
    </div>
}

export default AnnounceList;