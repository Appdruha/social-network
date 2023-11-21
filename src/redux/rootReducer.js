import {combineReducers} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import userReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

const RESET_APP = "RESET-APP";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    users: userReducer,
    auth: authReducer,
    app: appReducer
});

let rootReducer = (state, action) => {
    switch (action.type) {
        case RESET_APP: {
            state = undefined;
            return reducers(state, action);
        }
        default:
            return reducers(state, action);
    }

}

export const resetApp = () => ({type: RESET_APP});

export default rootReducer;