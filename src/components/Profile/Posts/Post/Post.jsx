import React from "react";
import s from "./Post.module.css";
import defaultAvatar from "../../../../img/defAva.png"

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={props.profile.photos.small || defaultAvatar} alt="#"></img>
            {props.message}
            <div>
                <span>{`likes ${props.likesCount}`}</span>
            </div>
        </div>
    );
};

export default Post;
