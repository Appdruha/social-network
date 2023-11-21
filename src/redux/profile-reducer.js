import {profileAPI} from "../api/requestsApi";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_MY_PROFILE = "SET-MY-PROFILE";
const SET_STATUS = "SET-STATUS";
const SET_PHOTO = "SET-PHOTO";

let initialState = {
    posts: [
        {message: 'it\'s my post', id: 1, likesCount: 56},
        {message: 'how are you', id: 2, likesCount: 14}
    ],
    profile: null,
    myProfile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0
            }
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            return stateCopy;
        }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_MY_PROFILE:
            return {...state, myProfile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case SET_PHOTO:
            return {...state, myProfile: {...state.myProfile, photos: action.photos}};
        default:
            return state;
    }
}

export const addPostAC = (text) => ({type: ADD_POST, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setMyProfile = (profile) => ({type: SET_MY_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setPhoto = (photo) => ({type: SET_PHOTO, photo});

export const getUserProfile = (userId, isMyProfile = false) => {
    return async (dispatch) => {
        await profileAPI.getProfileData(userId).then(response => {
            isMyProfile ? dispatch(setMyProfile(response)) : dispatch(setUserProfile(response));
        });

        await profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response));
        });
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        await profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export const savePhoto = (photo) => {
    return async (dispatch) => {
        await profileAPI.savePhoto(photo).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setPhoto(response.photos));
            }
        });
    }
}

export default profileReducer;