import { useState } from "react";
import { useSelector } from 'react-redux'
import ReactSlider from './ReactSlider';

import './test.css'

const RenderPage = () => {

    const photos = useSelector(store => Object.values(store?.photo))
    const [index, setIndex] = useState(0);

    return (
        <div className="container">
            <div className="slider">
                <ReactSlider index={index} setIndex={setIndex} />
            </div>

            <div class="comments"></div>
            <div class="add-comments">
                <h3 className="photographer-name">
                    Photographed by {photos[index]?.photographer_name}
                </h3>
            </div>
            <div class="location-map"></div>
        </div>
    )
}

export default RenderPage;