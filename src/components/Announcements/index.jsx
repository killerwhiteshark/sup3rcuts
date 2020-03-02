import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import {Link} from 'react-router-dom';

const AnnounceList = ({ currentUser }) => {
    const [allAnnoun, setAnnoun] = useState([]);
    const [users, setUsers] = useState([]);
    
    const handleDelete = (e) => {
        e.preventDefault()
        Firebase.doDeletePost(e.target.post.value)
        .then(()=>{console.log('Deleted!')})
        .catch(()=>{console.log('Failed to delete')})
    }
    
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
        <div>
            <h3>Current Announcements!</h3>
            <ul>
                {allAnnoun.map((doc, idx) => {
                return <li key={doc.id}>UserName: {doc.userName} - {doc.content} - Date {doc.date} <Link exact to={`/announce/${doc.id}`}>See Announcement</Link> {(currentUser.uid === doc.uid) ? (<form style={{display: 'inline'}} onSubmit={handleDelete}><input style={{display:'none'}}name={'post'} value={doc.id}/><button>Delete Post</button></form>) : ('')}</li>
                })}
            </ul>
        </div>)
}

export default AnnounceList;
