export const getProfilePage = (state) => {
    return state.profilePage;
};

export const getMyProfile = (state) => {
    return state.profilePage.myProfile;
};

export const getAuthUserId = (state) => {
    return state.auth.userId;
};

export const getNewPostText = (state) => {
    return state.profilePage.newPostText;
};

