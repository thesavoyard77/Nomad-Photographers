import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk } from '../../store/comment'
import { getSessionPhotosThunk } from '../../store/photo'
import './Comments.css'

export default function AddCommentForm (photoId) {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [ body, setBody ] = useState();
    const sessionUser = useSelector((state) => state.session?.user);
    const user_id = sessionUser?.id
    const photo_id = photoId?.photo_id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addCommentThunk(body, photo_id, user_id))
        await dispatch(getSessionPhotosThunk(user_id))
        if (data) {
            setErrors(data);
          }

    }

    const updateBody = (e) => {
        setBody(e.target.value)
    }

    return (
        <div>
            <form className="add-comment-form" onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
             <div key={ind} style={{color: "red"}}><b>{error}</b></div>
              ))}
                <label><b>~Enter Your Comment~</b></label>
                <textarea 
                className="add-comment-box"
                name="add-comment-box"
                value={body}
                onChange={updateBody}
                placeholder="Your Comment"
                ></textarea>
                <button className="add-submit" type="submit" value="submit">Submit</button>
            </form>
        </div>
    )

}