import defaultImg from "../../img/defAva.png";
import followIcon from "../../img/follow.svg";
import unfollowIcon from "../../img/unfollow.svg";
import cross from "../../img/cross.svg";
import usersStyles from "./Users.module.css";
import fonts from "../Common/fonts.module.css";
import imgStyles from "../Common/img.module.css"
import React from "react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsFollowingInProgress} from "../../redux/users-selectors";
import {chooseMarkerBoxColor} from "../../api/userInteractionApi";
import {toggleIsFollow} from "../../redux/users-reducer";

const Users = (props) => {

    const dispatch = useDispatch();

    const isFollowingInProgress = useSelector(state => getIsFollowingInProgress(state));

    const {
        register
    } = useForm()

    const fitStatus = (text) => {
        if (text === null) {
            return "Here must be status!";
        }
        if (text.length > 50) {
            return text.slice(0, 46) + "...";
        } else {
            return text;
        }
    }

    return (
        <div className={usersStyles.usersContainer} onWheel={() => props.checkPosition()}>

            <form className={usersStyles.form}>
                <div className={usersStyles.formInput}>
                    <input type="text" {...register("term")}
                           className={fonts.small_font}
                           value={props.term}
                           placeholder="Find user"
                           onChange={(e) => {
                               props.changeTerm(e.currentTarget.value)
                           }}/>
                    {props.term.length !== 0 ?
                        <img src={cross} alt="#" className={usersStyles.resetInput}
                             onClick={() => props.changeTerm("")}/> : null}
                </div>

                <div className={usersStyles.line}></div>
            </form>

            {props.users.map(user =>
                <div key={user.id} className={usersStyles.user}>
                    <NavLink to={"/profile/" + user.id} state={user.followed}>
                        <img src={user.photos.small || defaultImg} alt="#"
                             className={`${usersStyles.avatar} ${imgStyles.mediumImg}`}/>
                    </NavLink>
                    <div className={usersStyles.textBox}>
                        <NavLink to={"/profile/" + user.id} className={fonts.medium_font} state={user.followed}>
                            {user.name}
                        </NavLink>
                        <p className={fonts.small_font}>{fitStatus(user.status)}</p>
                    </div>
                    <div className={`${usersStyles.markerBox} ${chooseMarkerBoxColor(user.followed)}`}
                         onClick={() => dispatch(toggleIsFollow(user.id, user.followed,
                             isFollowingInProgress.includes(user.id)))}>
                        <img src={user.followed ? unfollowIcon : followIcon} alt="#" className={usersStyles.marker}/>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Users;