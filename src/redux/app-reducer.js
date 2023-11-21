import {getAuthUserData} from "./auth-reducer";
import {follow, requestUsers, unfollow} from "./users-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

let initialState = {
    initialized: false,
    isFetching: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case  INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const initializeApp = () => async (dispatch) => {

    await dispatch(getAuthUserData()).then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;