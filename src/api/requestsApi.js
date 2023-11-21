import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "6e7bb5de-ae2d-4b00-86ec-d8ad19302ac1"
    }
})

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10, isMyFollows = false, term = "") => {
        return instance.get(
            `users?friend=${isMyFollows}&term=${term}&page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)

    },

    unfollowUser: (userId) => {
        return instance.delete(
            `follow/${userId}`)
            .then(response => response.data)
    },

    followUser: (userId) => {
        return instance.post(
            `follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfileData: (userId) => {
        return instance.get(
            `profile/${userId}`)
            .then(response => response.data)
    },

    getStatus: (userId) => {
        return instance.get(
            `profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus: (status) => {
        return instance.put(
            `profile/status`, {
                status
            })
            .then(response => response.data)
    },

    savePhoto: (photo) => {
        let formData = new FormData();
        formData.append("image", photo)

        return instance.put(
            `profile/photo`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => response.data)
    },
}

export const authAPI = {
    me: () => {
        return instance.get(`auth/me`).then(response => response.data)
    },

    login: (email, password, rememberMe) => {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        }).then(response => response.data)
    },

    logout: () => {
        return instance.delete(`auth/login`).then(response => response.data)
    }
}

