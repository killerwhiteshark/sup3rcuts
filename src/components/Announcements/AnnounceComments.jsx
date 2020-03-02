import React, { useState } from 'react'

const AnnounceCommentForm = (props) => {
    const [input, setInput] = useState({});

    const handleChange = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (comment) => {
        comment.preventDefault()
        console.log(input.comment)
    }
    return(
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Comment' onChange={handleChange} name={'comment'}/>
        <button type='submit'>Submit Comment</button>
        </form>
    )
}

export default AnnounceCommentForm