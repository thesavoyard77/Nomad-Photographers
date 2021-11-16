import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSessionPhotosThunk } from '../../store/photo';
import './PhotoForm.css'

export default function AddPhotoForm() {
    const [errors, setErrors] = useState([]);
    const [ photo, setPhoto ] = useState(null)
    const history = useHistory();
    const dispatch = useDispatch();
    // const [url, setUrl] = useState()
    const [ description, setDescription ] = useState()
    const sessionUser = useSelector((state) => state.session?.user);
    const id = sessionUser?.id
    const geo_location = "45.83267462290539, 6.860941236982223"
    const [placeName, setPlaceName] = useState()
    const [ photoLoading, setPhotoLoading ] = useState(false)


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const data = await dispatch(addPhotoThunk( url, description, id, geo_location, placeName))
    //     await dispatch(getSessionPhotosThunk(id))

    //     if (data) {
    //         setErrors(data);
    //       }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        const acceptedFiles = ["pdf", "png", "jpg", "jpeg", "gif"]

        let fileArr = photo ? photo.name.split('.') : null
        let fileType = photo ? fileArr[fileArr.length -1] : null

        if (!photo) errors.push('Please upload a photo to continue.')
        if (photo && !acceptedFiles.includes(fileType)) errors.push('Please uplod a photo in pdf, png, jpg, jpeg, gif formats')
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


    return  (
        <div className="add-photo-wrapper">
            <form className="add-photo-form" onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
             <div key={ind} style={{color: "red"}}><b>{error}</b></div>
              ))}
                <label>Upload Photo</label>
                <input type="file" 
                accept="photo/*"
                onChange={updatePhoto}
                />
                <label>Description</label>
                <textarea
                className="add-description"
                value={description}
                onChange={updateDescription}
                name="description"
                placeholder="The Eiffel Tower"
                maxLength='150'
                ></textarea>
                <label>Place Name</label>
                <textarea
                className="add-place-name"
                value={placeName}
                onChange={updatePlaceName}
                name="place_name"
                placeholder="Paris, France"
                maxLength='50'
                ></textarea>
                <button className="add-submit" type="submit" value="submit">Submit</button>
                {(photoLoading) && <p>Loading...</p>}
            </form>
        </div>
    )

}