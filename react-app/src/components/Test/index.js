import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosThunk } from "../../store/photo";
import { getUsersThunk } from "../../store/user";
import CommentsModal from "../Comments/ExploreCommentsModal";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import ReactSlider from './ReactSlider';

import './test.css'

const RenderPage = () => {

    const photos = useSelector(store => Object.values(store?.photo))
    const [index, setIndex] = useState(0);
    return (
        <>
        <ReactSlider index={index} setIndex={setIndex} />
        <div className="under-slider"> 
        <div className="comment-box">
            <ul>
                {photos[index]?.comments.map(comment => {
                    return (
                        <li key={comment.id}>{comment.body}</li>
                    )
                })}
            </ul>
        </div>
        
        </div>
        </>
    )
}

export default RenderPage;