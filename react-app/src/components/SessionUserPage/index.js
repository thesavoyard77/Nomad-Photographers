import { useState } from "react";
import { useSelector } from 'react-redux'
import ReactSlider from './SessionCarousel';
import GoogleMapTest from './SessionGoogleMap'
import Comments from './SessionComments/SessionComments'
import TestAddComments from './SessionComments/SessionAddComments'
import Modal from "react-modal";
import './session.css'

const RenderPage = () => {

    const photos = useSelector(store => Object.values(store?.photo))
    const [index, setIndex] = useState(0);

    return (
        <div className="container">
            <div className="slider">
                <ReactSlider index={index} setIndex={setIndex} />
            </div>

            <div className="comments">
                <TestAddComments photo={photos[index]}/>
                <Comments photo={photos[index]}/>
            </div>
            <div className="photogrpher-info">
                <h3 className="photographer-name">
                    Photographed by {photos[index]?.users?.username?.split("")[0].toUpperCase() + photos[index]?.users?.username?.slice(1)}
                </h3>
                
                <p className="photographer-bio">
                    <hr className="photo-bio-hr"></hr>
                    {photos[index]?.users?.bio}
                    <hr className="photo-bio-hr"></hr>
                </p>
                
            </div>
            <div className="location-map">
            <GoogleMapTest index={index} setIndex={setIndex} />
            </div>
        </div>
    )
}

export default RenderPage;