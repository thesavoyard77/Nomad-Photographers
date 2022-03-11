import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { editPhotoThunk, deletePhotosThunk } from '../../store/photo';
import { useDispatch } from 'react-redux';
import { getSessionPhotosThunk } from '../../store/photo';
import CameraIcon from './public/cameraIcon.png'
import mapStyle from "./public/mapStyle";
import { GoogleMap, Marker } from '@react-google-maps/api';
// import './PhotoForm.css'

export default function EditPhotoForm({photo}) {
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session?.user);
    const user_id = sessionUser.id
    const dispatch = useDispatch()
    const {id} = photo;
    let [ key, setKey ] = useState('')
    const [ description, setDescription ] = useState(photo.description)
    const [placeName, setPlaceName] = useState(photo.place_name)
    const starterLoc = JSON.parse(photo?.geo_location)
    const [currentPosition, setCurrentPosition] = useState(starterLoc)

    useEffect(() => {
        if (!key) {
            (async () => {
                const response = await fetch('api/photos/key');
                const keyResponse = await response.json();
                setKey(keyResponse);
            })();
        }
    });

    // const { isLoaded, loadError } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
    //   });
      
      
      const containerStyle = {
        width: '600px',
        height: '400px'
      };
      
      const [map, setMap] = useState(null)

      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, []);

      const [marker, setMarker] = useState(starterLoc)

      const geo_location = JSON.stringify(marker)

    const payload = {
        id: id,
        url: photo.url,
        description: description,
        user_id: photo.user_id,
        geo_location: geo_location,
        place_name: placeName
    }
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(editPhotoThunk(payload))
        await dispatch(getSessionPhotosThunk(user_id))

        if (data) {
            setErrors(data);
          }
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deletePhotosThunk(payload))
        await dispatch(getSessionPhotosThunk(user_id))
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updatePlaceName = (e) => {
        setPlaceName(e.target.value)
    }

    const onMapClick = React.useCallback((event)=> {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    },[]);

    return  (
        <div className="edit-photo-wrapper">
            <form className="edit-photo-form" onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
             <div key={ind} style={{color: "red"}}><b>{error}</b></div>
              ))}
                <label className="form-label">Edit Description</label>
                <textarea
                className="edit-description"
                defaultValue={description}
                onChange={updateDescription}
                name="description"
                placeholder={photo.description}
                maxLength='150'
                ></textarea>
                <label className="form-label">Edit Place Name</label>
                <textarea
                className="edit-place-name"
                defaultValue={placeName}
                onChange={updatePlaceName}
                name="place_name"
                placeholder={photo.place_name}
                maxLength='100'
                ></textarea>
                 <div className="map_page__container-edit">
                    <div id="map-page-container-inner-edit" style={{ height: '600px', width: '400px' }}>
                        {key ? <GoogleMap
                            mapContainerStyle={containerStyle}
                            clickableIcons={false}
                            zoom={12}
                            center={currentPosition}
                            options={{styles: mapStyle, disableDefaultUI: true, fullscreenControl: true, zoomControl: true}}
                            onUnmount={onUnmount}
                            onClick={onMapClick}
                            >
                            <Marker
                            key={marker.id}
                            icon={{
                                url: CameraIcon,
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15)
                            }}
                            position={{ lat:marker.lat,lng:marker.lng }}
                            ></Marker>
                        </GoogleMap>:null}
                    </div>
                </div>
                <button className="edit-submit" type="submit" value="submit">Submit</button>
                <button className="delete-photo" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )

}