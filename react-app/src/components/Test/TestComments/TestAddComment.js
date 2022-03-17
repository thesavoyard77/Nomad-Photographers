import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk } from '../../../store/comment'
import { getPhotosThunk } from '../../../store/photo'
import Form from 'react-bootstrap/Form'

export default function TestAddComments(photoId) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addCommentThunk(body, photo_id, user_id))
        await dispatch(getPhotosThunk(user_id))
        if (data) {
            setErrors(data);
          }

    }

    return (
        <div>
            <form className="add-comment-form" onSubmit={handleSubmit}>
             {errors.map((error, ind) => (
                <div key={ind} style={{color: "red"}}><b>{error}</b></div>
                ))}
                <label><b>~Enter Your Comment~</b></label>
                    <div className="add-wrapper">
                 <textarea 
                    className="add-comment-box"
                    name="add-comment-box"
                    value={body}
                    onChange={updateBody}
                    placeholder="Your Comment"
                    ></textarea>
                 <button className="add-submit" type="submit" value="submit">Submit</button>
            </div>
        </form>
    </div>
    )
}