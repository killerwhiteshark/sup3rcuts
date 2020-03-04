import React, { useEffect, useState } from 'react'
import Firebase from '../Firebase';

const ShowComments = ({post}) => {
    const [commentList, setComments] = useState([])
    useEffect(()=>{
        const ref =Firebase.db
        .collection('comments')
        .orderBy("timestamp", "desc")
        ref.where('postId', '==', post)
        .get()
        .then((querySnapshot) => {
            const snapShot = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            snapShot.sort(function(x, y){
                return x.timestamp - y.timestamp;
            })
            return setComments(snapShot)
      });
    },[post])
    return(
        <div className="row">
        <ul style={{border: 'none'}}className="collection with-header col s9">
        {commentList.map(comment => (
            <li style={{margin: '5px'}}className="collection-item" key={comment.id}>
                <span class="title">{comment.userName}</span>
                <p>Comment: {comment.comment}</p>
            </li>
        ))}
        </ul>
        </div>
    )
}

export default ShowComments;