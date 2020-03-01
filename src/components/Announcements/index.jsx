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
        <ol>
        {allAnnoun.map((doc) =>
            <li key={doc.id}>{doc.content} - {doc.uid}</li> 
        )}    
        </ol>
    </div>
}

export default AnnounceList;