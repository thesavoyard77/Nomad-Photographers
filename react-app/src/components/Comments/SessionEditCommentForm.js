import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCommentThunk, deleteCommentThunk } from '../../store/comment'
import { getSessionPhotosThunk } from '../../store/photo';
import './Comments.css'

export default function EditCommentForm({ comment, photo_id }) {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [ body, setBody ] = useState('');
    const sessionUser = useSelector((state) => state.session?.user);
    const user_id = sessionUser?.id
    const id = comment?.id


    const payload = {
        id: id,
        body: body,
        photo_id: photo_id,
        user_id: user_id
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
       const data =  await dispatch(editCommentThunk(payload))
        await dispatch(getSessionPhotosThunk(user_id))
        if (data) {
            setErrors(data);
          }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommentThunk(payload))
        await dispatch(getSessionPhotosThunk(user_id))
    }

    const updateBody = (e) => {
        setBody(e.target.value)
    }

    return (
        <div>
            <form className="edit-comment-form" onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
             <div key={ind} style={{color: "red"}}><b>{error}</b></div>
              ))}
                <label><b>~Update Your Comment~</b></label>
                <textarea 
                className="Edit-comment-box"
                name="Edit-comment-box"
                defaultValue={comment.body}
                onChange={updateBody}
                ></textarea>
                <div className="comment-buttons">
                <button className="edit-comment-submit" type="submit" value="submit">Submit</button>
                <button className="delete-comment" onClick={handleDelete}>Remove</button>
                </div>
            </form>
        </div>
    )
}