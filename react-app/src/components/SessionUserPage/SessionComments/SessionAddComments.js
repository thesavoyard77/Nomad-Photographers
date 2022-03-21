import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk } from '../../../store/comment'
import { getSessionPhotosThunk } from '../../../store/photo'
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function TestAddComments(photo) {

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [ body, setBody ] = useState();
    const sessionUser = useSelector((state) => state.session?.user);
    const user_id = sessionUser?.id
    const photo_id = photo?.photo?.id


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addCommentThunk(body, photo_id, user_id))
        await dispatch(getSessionPhotosThunk(user_id))
        setBody('')
        if (data) {
            setErrors(data);
          }

    }

        const updateBody = (e) => {
        setBody(e.target.value)
    }

    return (
        <div className="test-add-comments-section">
            <form className="test-add-comment-form" onSubmit={handleSubmit}>
                {errors.map((error, ind) => (
                <div key={ind} style={{color: "red"}}><b>{error}</b></div>
                ))}
                <label className="add-comment-text">
                    <b>Enter Your Comment</b>
                    </label>
                    <textarea 
                    className="add-comment-box"
                    name="add-comment-box"
                    value={body}
                    onChange={updateBody}
                    placeholder="Your Comment"
                    ></textarea>
               
                    <Button variant="outline-light" size="sm" className="add-comment-submit" type="submit" value="submit">submit</Button>
        
            </form> 

        </div>
    )
}

