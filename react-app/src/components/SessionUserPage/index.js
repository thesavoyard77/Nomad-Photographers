import { useState } from "react";
import { useSelector } from 'react-redux'
import ReactSlider from './SessionCarousel';
import SessionGoogleMap from './SessionGoogleMap'
import Comments from './SessionComments/SessionComments'
import SessionAddComments from './SessionComments/SessionAddComments'
import { Redirect } from 'react-router-dom';
import './session.css'

const RenderPage = () => {

    const photos = useSelector(store => Object.values(store?.photo))
    const [index, setIndex] = useState(0);

//   const length = photos.length;
//   console.log(length);
//     if (length === 0) {
//         return <Redirect to='/upload' />;
//     }

    return (
        <div className="container">
            <div className="slider">
                <ReactSlider index={index} setIndex={setIndex} />
            </div>

            <div className="comments">
                <SessionAddComments photo={photos[index]}/>
                <Comments photo={photos[index]}/>
            </div>
            <div className="photogrpher-info">
                <h3 className="photographer-name">
                    Photographed by {photos[index]?.users?.username?.split("")[0].toUpperCase() + photos[index]?.users?.username?.slice(1)}
                </h3>
                <span>
                <hr className="photo-bio-hr"></hr>
                <p className="photographer-bio">
                    {photos[index]?.users?.bio}
                </p>
                <hr className="photo-bio-hr"></hr>
                </span>
                
            </div>
            <div className="location-map">
            <SessionGoogleMap index={index} setIndex={setIndex} />
            </div>
        </div>
    )
}

export default RenderPage;