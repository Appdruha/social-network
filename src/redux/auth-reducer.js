import {authAPI} from "../api/requestsApi";

const SET_USER_DATA = "SET-USER-DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) =>
    ({type: SET_USER_DATA, data: {userId, email, login}});

export const getAuthUserData = () => async (dispatch) => {
    return await authAPI.me().then(response => {
        if (response.resultCode === 0) {
            let {id, login, email} = response.data;
            dispatch(setAuthUserData(id, email, login));
        }
    });
};

export const tryLogin = (email, password, rememberMe) => async (dispatch) => {
    return await authAPI.login(email, password, rememberMe).then(response => {
        if (response.resultCode === 0) {
            dispatch(getAuthUserData())
        }
    })
}


export default authReducer;