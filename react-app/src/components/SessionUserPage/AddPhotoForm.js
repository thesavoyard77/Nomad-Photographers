import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSessionPhotosThunk } from '../../store/photo';
import CameraIcon from './public/cameraIcon.png'
import mapStyle from "./public/mapStyle";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './PhotoForm.css'

export default function AddPhotoForm() {
    const [errors, setErrors] = useState([]);
    const [ photo, setPhoto ] = useState(null)
    const history = useHistory();
    const dispatch = useDispatch();
    const [ description, setDescription ] = useState()
    const sessionUser = useSelector((state) => state.session?.user);
    const id = sessionUser?.id
    const [placeName, setPlaceName] = useState()
    const [ photoLoading, setPhotoLoading ] = useState(false)
    const [currentPosition, setCurrentPosition] = useState({lat:40.748391732096245,lng:-73.98570731534348})
    let [ key, setKey ] = useState('')

    useEffect(() => {
        if (!key) {
            (async () => {
                const response = await fetch('api/photos/key');
                const keyResponse = await response.json();
                setKey(keyResponse);
            })();
        }
    });
      

      const containerStyle = {
        width: '600px',
        height: '400px'
      };

      const [map, setMap] = useState(null)

      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, []);
    
      const [marker, setMarker] = useState({lat:40.748391732096245,lng:-73.98570731534348})

    const geo_location = JSON.stringify(marker)


    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        const acceptedFiles = ["pdf", "png", "jpg", "jpeg", "gif"]

        let fileArr = photo ? photo.name.split('.') : null
        let fileType = photo ? fileArr[fileArr.length -1] : null

        if (!photo) errors.push('Please upload a photo to continue.')
        if (photo && !acceptedFiles.includes(fileType)) errors.push('Please uplod a photo in pdf, png, jpg, jpeg, gif formats')
        if (!description) errors.push('Please fill out the Description field')
        if (!placeName) errors.push('Please fill out the Place Name field')
        if(errors.length) {
            setErrors(errors)
            return null
        }
        setErrors([])

        const formData = new FormData();
        formData.append("photo", photo)
        formData.append("description", description)
        formData.append("user_id", id)
        formData.append("geo_location", geo_location)
        formData.append("place_name", placeName)

        setPhotoLoading(true)
        const res = await fetch('/api/photos', {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            const data = await res.json();
            setPhotoLoading(false)
            history.push('/photos')
            dispatch(getSessionPhotosThunk(id))
        } else {
            setPhotoLoading(false)
        }
        setPhotoLoading(false)
    }

    const updatePhoto = (e) => {
        const file = e.target.files[0];
        setPhoto(file)
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
        <div className="add-photo-wrapper">
            <form className="add-photo-form" onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
             <div key={ind} style={{color: "red"}}><b>{error}</b></div>
              ))}
                <label><h2>Upload a Photo</h2></label>
                <input type="file" 
                className="upload-button"
                accept="photo/*"
                onChange={updatePhoto}
                />
                <label className="form-label">Description</label>
                <textarea
                className="add-description"
                value={description}
                onChange={updateDescription}
                name="description"
                placeholder="The Eiffel Tower"
                maxLength='150'
                ></textarea>
                <label className="form-label">Place Name</label>
                <textarea
                className="add-place-name"
                value={placeName}
                onChange={updatePlaceName}
                name="place_name"
                placeholder="Paris, France"
                maxLength='50'
                ></textarea>
                <div className="map_page__container-add">
                    <div id="map-page-container-inner-add" style={{ height: '600px', width: '400px' }}>
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
                            position={{ lat:marker.lat,lng:marker.lng }}
                            ></Marker>
                        </GoogleMap>:null}
                    </div>
                </div>
                <button className="add-submit" type="submit" value="submit">Submit</button>
                {(photoLoading) && <p>Loading...</p>}
            </form>
        </div>
    )

}
