import React, { useState } from 'react';
import ReactSlider from './ReactSlider';


const RenderPage = () => {
    const [index, setIndex] = useState(0);
    console.log(index)
    return (
        <>
        <ReactSlider index={index} setIndex={setIndex} />
        <div>
            <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adip id el <br /> 
            Lorem ipsum dolor sit amet, consectetur adip id el <br /> </p>
        </div>
        </>
    )
}

export default RenderPage;