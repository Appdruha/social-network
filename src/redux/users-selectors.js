export const getUsers = (state) => {
    return state.users.users;
}

export const getTotalUsersCount = (state) => {
    return state.users.totalUsersCount;
}

export const getIsFollowingInProgress = (state) => {
    return state.users.isFollowingInProgress;
}

export const getIsMyFollows = (state) => {
    return state.users.isMyFollowsRender;
}

export const getUsersPackageNumber = (state) => {
    return state.users.usersPackageNumber;
}