import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {getAuthUserId, getProfilePage} from "../../redux/profile-selector";
import {getIsFetching} from "../../redux/app-selectors";
import Preloader from "../Common/Preloader/Preloader";
import {toggleIsFetching} from "../../redux/app-reducer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Posts from "./Posts/Posts";

const Profile = () => {

    const profilePage = useSelector(state => getProfilePage(state));
    const authUserId = useSelector(state => getAuthUserId(state));
    const isFetching = useSelector(state => getIsFetching(state));

    const dispatch = useDispatch();

    let {userId} = useParams();

    let isAuthProfile = false;

    if (!userId) {
        userId = authUserId;
        isAuthProfile = true;
    }

    const getProfileData = async () => {
        dispatch(toggleIsFetching(true));

        await dispatch(getUserProfile(userId));

        dispatch(toggleIsFetching(false));
    }

    useEffect(() => {
        getProfileData();
    }, [userId]);

    if (isFetching) {
        return <Preloader/>
    }

    return (
        <>
            <ProfileInfo profile={profilePage.profile}
                         status={profilePage.status}
                         isAuthProfile={isAuthProfile}
                         userId={userId}/>

            <Posts posts={profilePage.posts}
                     profile={profilePage.profile}
                     isAuthProfile={isAuthProfile}/>
        </>
    );
}

export default Profile;