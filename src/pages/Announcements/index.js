import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import Firebase from '../../components/Firebase'
import '../../App.css'

const Announcements = ({currentUser}) => {
    const [input, setInput] = useState({});
    const [madePost, setMadePost] = useState(false)

    useEffect(() => {
        Firebase.doAuthStateChanged()
    }, [])

    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
    }
    const handleFormSubmit = e => {
        const { content } = input;
        e.preventDefault()
        try {
            Firebase.db.collection('announcements').add({
                timestamp: Firebase.time,
                uid: Firebase.user.uid,
                userName: currentUser.userName,
                content: content,
                date: new Date().toDateString(),
            });
            setMadePost(true)
        } catch (error) {
            console.log('failed to db collection',error);
            throw Error;
        }
    }
    if(madePost){
        return <Redirect to='/' />
    }
    return (
    <div>
        <h1> This is the Make Announcements page</h1>
        <form onSubmit={handleFormSubmit}>
            <input 
            type="text" 
            placeholder="Make Announcment"
            name='content'
            onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    </div>)
}

export default Announcements;