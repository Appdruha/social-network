import React, {useState} from "react";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import defaultAvatar from "../../../img/defAva.png";
import profileInfoStyles from "./ProfileInfo.module.css";
import imgStyles from "../../Common/img.module.css";
import fonts from "../../Common/fonts.module.css";
import {useDispatch, useSelector} from "react-redux";
import {savePhoto} from "../../../redux/profile-reducer";
import followImg from "../../../img/follow.svg"
import unfollowImg from "../../../img/unfollow.svg"
import {chooseMarkerBoxColor} from "../../../api/userInteractionApi";
import {useLocation} from "react-router-dom";
import {toggleIsFollow} from "../../../redux/users-reducer";
import {getIsFollowingInProgress} from "../../../redux/users-selectors";

const ProfileInfo = (props) => {

    const location = useLocation();

    const isFollowingInProgress = useSelector(state => getIsFollowingInProgress(state));

    const [isMyFollow, setIsMyFollow] = useState(location.state);

    const dispatch = useDispatch();

    if (!props.profile) {
        return <Preloader/>
    }

    const onInputChange = (e) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    }

    const followUnfollowHandler = (id, isMyFol, isInProgress) => {
        dispatch(toggleIsFollow(id, isMyFol, isInProgress));
        setIsMyFollow(!isMyFollow);
    }

    return (
        <div className={profileInfoStyles.profileInfoContainer}>
            <div className={profileInfoStyles.avatarBox}>
                <img src={props.profile.photos.large || defaultAvatar} alt="#"
                     className={`${imgStyles.bigImg} ${profileInfoStyles.avatar}`}/>
            </div>
            <div className={profileInfoStyles.profileInfo}>
                <div className={profileInfoStyles.profileInfo_infoBox}>
                    <p className={fonts.big_font}>{props.profile.fullName}</p>
                    <ProfileStatus status={props.status} isAuthProfile={props.isAuthProfile}/>
                </div>
                <div className={profileInfoStyles.profileInfo_interactions}>
                    {props.isAuthProfile ?
                        <>
                            <label htmlFor="file" className={`${fonts.small_font} 
                            ${profileInfoStyles.profileInfo_interactions_regularBtn}`}>
                                Change avatar
                            </label>
                            <input id="file" type="file" onChange={onInputChange}/>
                        </> :
                        <>
                            <div className={profileInfoStyles.profileInfo_interactions_regularBtn}>Send message</div>
                            <div className={`${profileInfoStyles.profileInfo_interactions_folUnfol} 
                            ${chooseMarkerBoxColor(isMyFollow)}`}>
                                <img src={isMyFollow ? unfollowImg : followImg} alt="#"
                                     onClick={() =>
                                         followUnfollowHandler(props.userId, isMyFollow,
                                             isFollowingInProgress.includes(props.userId))}/>
                            </div>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;