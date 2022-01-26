import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom';
import './Carousels.css'
import { getPhotosThunk } from "../../store/photo";
import { getUsersThunk } from "../../store/user";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'
import CommentsModal from "../Comments/ExploreCommentsModal";
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

export default function SessionUserPage() {
// const sessionUser = useSelector((state) => state.session?.user);
const dispatch = useDispatch();
const photos = useSelector(store => Object.values(store?.photo))

const [ picture, setPicture ] = useState(0)
const length = photos.length;
// let id;



useEffect(() => {
    dispatch(getPhotosThunk())
    dispatch(getUsersThunk())
    return
}, [dispatch])

let locationArray = [];

const locationMap = () => {
    photos?.map(photo => {
      let oneLatitude = photo?.geo_location?.split(',')[0]
      let oneLongitude = photo?.geo_location?.split(',')[1]
      oneLatitude = +oneLatitude
      oneLongitude = +oneLongitude
      locationArray.push({lat:oneLatitude,lng:oneLongitude})
      return
    })
}
locationMap()

const [currentPosition, setCurrentPosition] = useState(locationArray[0])

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })
  
  const containerStyle = {
    width: '400px',
    height: '250px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

const nextSlide = () => {
    setPicture(picture === length - 1 ? 0 : picture + 1)
    setCurrentPosition(locationArray[picture === length - 1 ? 0 : picture + 1])
}

const prevSlide = () => {
    setPicture(picture === 0 ? length -1 : picture - 1)
    setCurrentPosition(locationArray[picture === 0 ? length -1 : picture - 1])
}


if(!photos.length) {
    return null;
}



return (
<section id="grandfather">
    <div className="carousel">
    <BiLeftArrow className="left-arrow" onClick={prevSlide}/>
    <BiRightArrow className="right-arrow" onClick={nextSlide}/>
    {photos?.map((photo, index) => {
      
        return (
            <div className={index === picture ? 'slide active' : 'slide'} key={index}>
                <div className="inner">
              {index === picture && (<img src={photo?.url} alt='travel' className="current-image"></img>)}
                <h2 className="photographer-name">{photo?.users?.username?.split("")[0].toUpperCase() + photo?.users?.username?.slice(1)} </h2>
                <h3 className="location-name">{photo?.place_name}</h3>
              <h5 className="description-text"><hr className="carousel-hr"></hr>{photo?.description}<hr className="carousel-hr"></hr></h5>
                </div>
                <div className="map_page__container">
                <div id="map-page-container-inner" style={{ height: '300px', width: '300px' }}>
                {isLoaded && currentPosition ?<GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={12}
                    center={currentPosition}
                    onUnmount={onUnmount}
                    >
                <InfoWindow position={currentPosition} >
                    <div>
                        <span style={{color: `blue`}}>{photo?.users?.username?.split("")[0].toUpperCase() + photo?.users?.username?.slice(1)}</span>
                    </div>
                </InfoWindow>
                </GoogleMap>:null}
                </div>
                </div>
                <CommentsModal photo={photos[picture]} />
            </div>
        )
    })}

    </div>


</section>
)
}