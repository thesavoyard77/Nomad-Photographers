const GET_USERS = "user/GET_USERS"

const getUsers = (userObj) => {
    return {
        type: GET_USERS,
        payload: userObj
    }
}

export const getUsersThunk = () => async (dispatch) => {
    const response = await fetch('/api/users')

    if (response.ok) {
        let userObj = await response.json();

        dispatch(getUsers(userObj))
    }
}

const initialState = {}
export default function usersReducer(state= initialState, action){
    let newState = {...state}
    switch (action.type) {
        case GET_USERS:
            newState = {...state, ...action.payload};

            return newState;
        default:
            return state;
    }
        
}