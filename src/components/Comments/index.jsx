import React, { useState } from 'react'
import Firebase from '../Firebase';

const CommentForm = ({post}) => {
    const [input, setInput] = useState({comment:''});
    const [madeComment, setComment] = useState(false)

    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            Firebase.doPostComment({
                comment: input.comment,
                postId: post
            })
            setInput({comment:''});
            setComment(true)
        } catch (error) {
            console.log(error)
            return error
        }
    }
    if(madeComment){
        Firebase.doAuthStateChanged()
    }
    return(
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Comment' value={input.comment} onChange={handleChange} name='comment'/>
        <button className='btn grey darken-2' type='submit'>Submit Comment</button>
        </form>
    )
}

export default CommentForm