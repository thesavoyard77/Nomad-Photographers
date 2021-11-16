const GET_PHOTOS = 'photos/GET_PHOTOS'
const SESSION_PHOTOS = 'photos/SESSION_PHOTOS'
const DELETE_PHOTOS = 'photos/DELETE_PHOTOS'
const EDIT_PHOTO = 'photos/EDIT_PHOTO'
const ADD_PHOTO = 'photos/ADD_PHOTO'

const getPhotos = (photosObject) => {
    return {
        type: GET_PHOTOS,
        payload: photosObject
    }
}

const sessionPhotos = (photosObject) => {
    return {
        type: SESSION_PHOTOS,
        payload: photosObject
    }
}

const deletePhotos = (photoId) => {
    return {
        type: DELETE_PHOTOS,
        payload: photoId
    }
}

const editPhoto = (photoData) => {
    return {
        type: EDIT_PHOTO,
        payload: photoData
    }
}

const addPhoto = (photoObj) => {
    return {
        type: ADD_PHOTO,
        payload: photoObj
    }
}

export const getPhotosThunk = () =>  async (dispatch) => {
    const resonse = await fetch('/api/photos')

    let payload = await resonse.json()

    if (resonse.ok) {
        dispatch(getPhotos(payload))
    }
}

export const getSessionPhotosThunk = (id) =>  async (dispatch) => {
    const resonse = await fetch(`/api/photos/${id}`)

    let payload = await resonse.json()

    if (resonse.ok) {
        dispatch(sessionPhotos(payload))
    }
}



export const deletePhotosThunk = (payload) => async (dispatch) => {
    const id = payload.id
    const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (response.ok)  {
        await dispatch(deletePhotos(id))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['Something went wrong, please try again']
    }
}


export const editPhotoThunk = (payload) => async (dispatch) => {
    const id = payload.id
    
    const response = await fetch(`/api/photos/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
  
    if(response.ok) {
        await dispatch(editPhoto(payload))
      
        return null
    }  else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['Something went wrong, please try again']
    }
}


export const addPhotoThunk = (url, description, user_id, geo_location, place_name) => async (dispatch) => {
    const response = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url,
            description,
            user_id,
            geo_location,
            place_name
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addPhoto(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['Something went wrong, please try again later.']
    }
}


const initialState = {}
export default function photosReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_PHOTOS:
            newState = {...action.payload}

            return newState
        case SESSION_PHOTOS:
            newState = {...action.payload}
    
            return newState
        case DELETE_PHOTOS:
            delete newState[action.payload];

            return newState;
        case EDIT_PHOTO:
            newState = { photo: action.payload}

            return newState
        case ADD_PHOTO:
            return { photo: action.payload }
        default:
            return state;
    }
}