import React, {useState} from 'react';
import { Carousel } from 'react-bootstrap';
import {photos} from './Photos'
export const CurrentIndex = React.createContext();

const ReactSlider = ({ index, setIndex }) => {


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect} >
                
                {photos.map(photo => {
                    return (
                    <Carousel.Item interval={5000} key={photo.id} className="carousel-background">
                    <img
                    className="d-block w-100"
                    src={photo?.image}
                    alt="slide"
                    />
                    <Carousel.Caption>
                    <h3 className="over-photo">{photo?.placeName}</h3>
                    <p className="over-photo">{photo?.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>)
                })}
            </Carousel>
        </>
    )
}

export default ReactSlider;