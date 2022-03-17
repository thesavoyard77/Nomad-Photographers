import { useState } from "react";
import { useSelector } from 'react-redux'
import ReactSlider from './ReactSlider';
import GoogleMapTest from './GoogleMapTest'

import './test.css'

const RenderPage = () => {

    const photos = useSelector(store => Object.values(store?.photo))
    const [index, setIndex] = useState(0);
    return (
        <div className="container">
            <div className="slider">
                <ReactSlider index={index} setIndex={setIndex} />
            </div>

            <div className="comments"></div>
            <div className="photogrpher-info">
                <h3 className="photographer-name">
                    Photographed by {photos[index]?.users?.username?.split("")[0].toUpperCase() + photos[index]?.users?.username?.slice(1)}
                </h3>
            </div>
            <div className="location-map">
            <GoogleMapTest index={index} setIndex={setIndex} />
            </div>
        </div>
    )
}

export default RenderPage;