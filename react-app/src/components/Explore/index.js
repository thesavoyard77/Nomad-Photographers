import { useState } from "react";
import { useSelector } from 'react-redux'
import ReactSlider from './ExploreCarousel';
import GoogleMapTest from './ExploreGoogleMap'
import Comments from './ExploreComments/ExploreComments'
import TestAddComments from './ExploreComments/ExploreAddComment'

import './explore.css'

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
                <div className="comment-inner">
                 <Comments photo={photos[index]}/>
                </div>
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
                <GoogleMapTest index={index} setIndex={setIndex} />
            </div>
        </div>
    )
}

export default RenderPage;