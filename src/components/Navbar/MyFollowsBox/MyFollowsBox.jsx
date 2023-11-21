import React from "react";
import followsStyles from "./FollowsBox.module.css";
import imgStyles from "../../Common/img.module.css"
import {NavLink} from "react-router-dom";
import defaultImg from "../../../img/defAva.png"
import {useSelector} from "react-redux";
import {getFirstFollows} from "../../../redux/app-selectors";

const MyFollowsBox = () => {

    const firstFollows = useSelector(state => getFirstFollows(state));

    return (
        <>
            <div className={followsStyles.line}></div>
            <div className={followsStyles.followsBox}>
                {firstFollows.length > 0 && firstFollows.map((user) =>
                    <NavLink to={`/profile/${user.id}`} state={user.followed}>
                        <img src={user.photos.small || defaultImg} alt="#" className={imgStyles.smallImg}></img>
                    </NavLink>)}
            </div>
        </>
    )
}

export default MyFollowsBox;