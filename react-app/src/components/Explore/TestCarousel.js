import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap';
import { getPhotosThunk } from "../../store/photo";
import { getUsersThunk } from "../../store/user";

import './test.css'


const HeroSlider = ({ index, setIndex }) => {
    
    const dispatch = useDispatch();
    const photos = useSelector(store => Object.values(store?.photo))
    

    useEffect(() => {
        dispatch(getPhotosThunk())
        dispatch(getUsersThunk())
        return
    }, [dispatch])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };



    if(!photos.length) {
        return null;
    }
    
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect} autoPlay={false}>
                
                {photos?.map(photo => {
                    return (
                    <Carousel.Item autoPlay={false}  key={photo.id} className="carousel-background">
                    <img
                    className="d-block w-100"
                    src={photo?.url}
                    alt="slide"
                    />
                    <Carousel.Caption>
                    <h3 className="over-photo">{photo?.place_name}</h3>
                    <p className="over-photo">{photo?.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>)
                })}
            </Carousel>
        </>
    )
}

export default HeroSlider;