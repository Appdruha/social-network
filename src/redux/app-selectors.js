export const getIsFetching = (state) => {
    return state.app.isFetching;
}

export const getIsInitialized = (state) => {
    return state.app.initialized;
}

export const getFirstFollows = (state) => {
    return state.users.firstFollows;
}

export const getIsAuth = (state) => {
    return state.auth.isAuth;
}