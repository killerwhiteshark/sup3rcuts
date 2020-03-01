import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import Firebase from '../../components/Firebase'


const Announcements = (props) => {
    const [input, setInput] = useState({});
    const user = Firebase.auth.currentUser;

    useEffect(() => {
        Firebase.doAuthStateChanged()
    })
    if (!Firebase.auth.currentUser) {
       return <Redirect to='/login'/>
    };

    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
    }

    const handleFormSubmit = async e => {
        const { content } = input;
        e.preventDefault()
        try {
            debugger
            await Firebase.db.collection('announcements').doc(user.uid).set({
                'content': content
            }).then(()=> <Redirect to='/' />)
        } catch (error) {
            debugger
            console.log('failed to db collection',error);
            throw Error;
        }
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