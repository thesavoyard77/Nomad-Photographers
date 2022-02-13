import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import CameraIcon from '../SessionUserPage/public/cameraIcon.png'
import mapStyle from "../SessionUserPage/public/mapStyle";
import './Carousels.css'
import { getPhotosThunk } from "../../store/photo";
import { getUsersThunk } from "../../store/user";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'
import CommentsModal from "../Comments/ExploreCommentsModal";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export default function SessionUserPage() {

const dispatch = useDispatch();
const photos = useSelector(store => Object.values(store?.photo))
let [ key, setKey ] = useState('')
const [ picture, setPicture ] = useState(0)
const length = photos.length;

useEffect(() => {
    if (!key) {
        (async () => {
            const response = await fetch('api/photos/key');
            const keyResponse = await response.json()
            setKey(keyResponse)
        })();
    }
})
let REACT_APP_MAPS_KEY = key.api


let locationArray = [];

const locationMap = () => {
    photos?.map(photo => {
        let geo_location = JSON.parse(photo?.geo_location)
        locationArray.push(geo_location)
        return
    })
}
locationMap()

const [currentPosition, setCurrentPosition] = useState(locationArray[0])
const [ locationPopulated, setLocationPopulated ] = useState(false)

useEffect(() => {
    dispatch(getPhotosThunk())
    dispatch(getUsersThunk())
    return
}, [dispatch])

useEffect(() => {
    
    if (locationPopulated === false && locationArray.length > 1) {

    setCurrentPosition(locationArray[0])
    setLocationPopulated(true)
    
    }
},[locationArray, locationPopulated]);


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
                <h2 className="photographer-name">Photo by {photo?.users?.username?.split("")[0].toUpperCase() + photo?.users?.username?.slice(1)} </h2>
                <h3 className="location-name">{photo?.place_name}</h3>
              <h5 className="description-text"><hr className="carousel-hr"></hr>{photo?.description}<hr className="carousel-hr"></hr></h5>
                </div>
                <div className="map_page__container">
                <div id="map-page-container-inner" style={{ height: '300px', width: '300px' }}>
                {isLoaded && currentPosition ?<GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={12}
                    center={currentPosition}
                    options={{styles: mapStyle, disableDefaultUI: true, fullscreenControl: true}}
                    onUnmount={onUnmount}
                    >
                    <Marker 
                        position={currentPosition}
                        title="Camera Marker"
                        icon={{
                            url: CameraIcon,
                            scaledSize: new window.google.maps.Size(25, 25)
                        }}
                        streetView={false} 
                    />
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