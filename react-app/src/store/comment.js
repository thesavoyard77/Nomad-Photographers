const GET_COMMENTS = 'comments/GET_COMMENTS'
const GET_ONE = 'comments/GET_ONE'
const DELTE_COMMENT = 'comments/DELETE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const ADD_COMMENT = 'comments/ADD_COMMENT'


const getComments = (commentsObject) => {
    return {
        type: GET_COMMENTS,
        payload: commentsObject
    }
}

const getOne= (commentsObject) => {
    return {
        type: GET_ONE,
        payload: commentsObject
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELTE_COMMENT,
        payload: commentId
    }
}

const editComment = (commentData) => {
    return { 
        type: EDIT_COMMENT,
        payload: commentData
    }
}

const addComment = (newComment) => {
    return {
        type: ADD_COMMENT,
        payload: newComment
    }
}

export const getCommentsThunk = () => async (dispatch) => {
 const response = await fetch('/api/comments')

 let commentsObj = await response.json()


 if (response.ok) {
     dispatch(getComments(commentsObj))
 }

}

export const getOneThunk = (id) => async (dispatch) => {
 const response = await fetch(`/api/comments/${id}`)

 let commentsObj = await response.json()

 if (response.ok) {
    dispatch(getOne(commentsObj))
 }
}


export const deleteCommentThunk = (payload) => async (dispatch) => {
    const id = payload.id
    const response = await fetch(`/api/comments/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (response.ok) {
       await dispatch(deleteComment(id))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['Something went wrong, please try again']
    }
}

export const editCommentThunk = (payload) => async (dispatch) => {
    const id = payload.id
    const resonse = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if (resonse.ok) {
        dispatch(editComment(payload))
        return null
    } else if (resonse.status < 500) {
        const data = await resonse.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['Something went wrong, please try again']
    }
}

export const addCommentThunk = ( body, photo_id, user_id ) => async (dispatch) => {
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body,
            photo_id,
            user_id
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data))
        return null;
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
export default function commentsReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_COMMENTS:
            newState = {...action.payload}

            return newState;
        case GET_ONE:
            newState = {...action.payload}

            return newState;
        case DELTE_COMMENT:
            delete newState[action.payload];
            // console.log(state, "<-----------------------state")
            // console.log(newState, '<------------------------newState')
            // console.log({comment: action.payload }, "<================payload")
            return newState;
        case EDIT_COMMENT:
            newState = {comment: action.payload}
            // console.log(state, "<-----------------------state")
            // console.log(newState, '<------------------------newState')
            // console.log(newState[action.payload], "<================payload")
            return newState
        case ADD_COMMENT:
            newState = {comment: action.newComment }
            return newState
        default:
            return state;
    }
}