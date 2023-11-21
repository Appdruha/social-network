import {usersAPI} from "../api/requestsApi";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const ADD_USERS = "ADD-USERS";
const SET_USERS_PACKAGE_NUMBER = "SET-USERS-PACKAGE-NUMBER";
const SET_USERS_COUNT = "SET-USERS-COUNT";
const SET_MY_FOLLOWS_COUNT = "SET-MY-FOLLOWS-COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";
const SET_IS_MY_FOLLOWS = "SET-IS-MY-FOLLOWS";
const REMOVE_USERS = "REMOVE-USERS";
const SET_FIRST_FOLLOWS = "SET-FIRST-FOLLOWS";

let initialState = {
    users: [],
    usersPackageNumber: 1,
    totalUsersCount: 0,
    isFollowingInProgress: [],
    isMyFollowsRender: null,
    firstFollows: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case  FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true};
                    }
                    return user;
                })
            }
        case  UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case ADD_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        case SET_USERS_PACKAGE_NUMBER: {
            return {...state, usersPackageNumber: action.packageNumber}
        }
        case SET_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case SET_MY_FOLLOWS_COUNT: {
            return {...state, totalMyFollowsCount: action.totalCount}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.userId)
            }
        }
        case SET_IS_MY_FOLLOWS: {
            return {...state, isMyFollowsRender: action.isMyFollows}
        }
        case REMOVE_USERS: {
            return {...state, users: []}
        }
        case SET_FIRST_FOLLOWS: {
            return {...state, firstFollows: action.firstFollows}
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const addUsers = (users) => ({type: ADD_USERS, users});
export const setUsersPackageNumber = (packageNumber) => ({type: SET_USERS_PACKAGE_NUMBER, packageNumber});
export const setTotalUsersCount = (totalCount) => ({type: SET_USERS_COUNT, totalCount});
export const setIsMyFollowsRender = (isMyFollows) => ({type: SET_IS_MY_FOLLOWS, isMyFollows});
export const removeUsers = () => ({type: REMOVE_USERS});
export const setFirstFollows = (firstFollows) => ({type: SET_FIRST_FOLLOWS, firstFollows});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page, pageSize, isMyFollows, term = "", isFirstFollows = false) => {
    return async (dispatch) => {

        await usersAPI.getUsers(page, pageSize, isMyFollows, term).then(response => {
            if (isFirstFollows) {
                dispatch(setFirstFollows(response.items));
            } else {
                dispatch(addUsers(response.items));
                dispatch(setTotalUsersCount(response.totalCount));
            }
        });
    }
}

export const resetState = (resetIsMyFollowsRender = false) => {
    return async (dispatch) => {

        await dispatch(setTotalUsersCount(0));
        await dispatch(setUsersPackageNumber(1));
        await dispatch(removeUsers());

        if (resetIsMyFollowsRender) {
            await dispatch(setIsMyFollowsRender(null));
        }
    }
}

export const follow = (userId) => {
    return async (dispatch) => {

        await dispatch(toggleFollowingProgress(true, userId));

        await usersAPI.followUser(userId).then(response => {

            if (response.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
        });

        await dispatch(toggleFollowingProgress(false, userId));
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {

        await dispatch(toggleFollowingProgress(true, userId));

        await usersAPI.unfollowUser(userId).then(response => {

            if (response.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
        });

        await dispatch(toggleFollowingProgress(false, userId));
    }
}

export const toggleIsFollow = (userId, isMyFollow, isFollowingInProgress) => {
    if (!isFollowingInProgress) {
        return async (dispatch) => {
            isMyFollow ? await dispatch(unfollow(userId)) : await dispatch(follow(userId));
            await dispatch(requestUsers(1, 3, true, "", true));
        }
    } else return {type: "NONE"};
}

export default userReducer;