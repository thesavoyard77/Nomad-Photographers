import { useState } from 'react';
import { useSelector } from 'react-redux';
import { editPhotoThunk, deletePhotosThunk } from '../../store/photo';
import { useDispatch } from 'react-redux';
import { getSessionPhotosThunk } from '../../store/photo';
import './PhotoForm.css'

export default function EditPhotoForm({photo}) {
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session?.user);
    const user_id = sessionUser.id
    const dispatch = useDispatch()
    const {id} = photo;
    const [ description, setDescription ] = useState(photo.description)
    const [placeName, setPlaceName] = useState(photo.place_name)

//  console.log(photo)

    const payload = {
        id: id,
        url: photo.url,
        description: description,
        user_id: photo.user_id,
        geo_location: photo.geo_location,
        place_name: placeName
    }
    // console.log(photo?.url)

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


    return  (
        <div className="edit-photo-wrapper">
            <form className="edit-photo-form" onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
             <div key={ind} style={{color: "red"}}><b>{error}</b></div>
              ))}
                <label>Edit Description</label>
                <textarea
                className="edit-description"
                defaultValue={description}
                onChange={updateDescription}
                name="description"
                placeholder={photo.description}
                maxLength='150'
                ></textarea>
                <label>Edit Place Name</label>
                <textarea
                className="edit-place-name"
                defaultValue={placeName}
                onChange={updatePlaceName}
                name="place_name"
                placeholder={photo.place_name}
                maxLength='100'
                ></textarea>
                <button className="edit-submit" type="submit" value="submit">Submit</button>
                <button className="delete-photo" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )

}