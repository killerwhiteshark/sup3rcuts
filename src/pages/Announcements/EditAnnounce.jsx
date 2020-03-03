import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Firebase from '../../components/Firebase';
import './style.css'


const EditAnnounce = (props) => {
    const [announce, setAnnouce] = useState({content: '', uid: ''});
    const [showButton, setButton] = useState(false);
    const [madeChange, setChange] = useState(false);
    const announceId = props.match.params.id;

    const handleChange = e => {
        setAnnouce({
            ...announce, [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Firebase.db.collection('announcements')
        .doc(announceId)
        .set({
            timestamp: Firebase.time,
            ...announce
        })
        setChange(true)
    }
        
    const handleDelete = (e) => {
        e.preventDefault()
        debugger
        Firebase.doDeletePost(announceId)
        .then(()=>{ debugger; return true})
        .catch((err)=>{debugger; console.log(err)});
        setChange(true)
    }
    const showDelete = (e) => {
        e.preventDefault();
        setButton(true)
    }
    useEffect(() => {
        Firebase.getAnnouceById(announceId)
            .then(snapShot => setAnnouce(snapShot))
        }, [props.match.params.id, announceId]);

    if(!Firebase.auth.currentUser.uid === announceId){
        return <Redirect to='/main'/>
    }
    if(madeChange){
        return <Redirect to='/main' />
    }
    return(
        <div>
            <h1>Edit/Delete Announcement</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='content' value={announce.content} onChange={handleChange}/>
                <button type="submit">Submit Edit</button>
            </form>
            <form onSubmit={handleDelete}>
                <button className='danger warning waves-effect waves-light btn' onClick={showDelete}>Delete Announcement</button>
                {(showButton)? (<><p className='danger warning'><i class="material-icons left">error_outline</i>Are you sure you want to delete?</p><button className='danger warning waves-effect waves-light btn'><i class="material-icons left">delete_forever</i>Delete</button></>) : ('')}
            </form>
        </div>
    )
}

export default EditAnnounce