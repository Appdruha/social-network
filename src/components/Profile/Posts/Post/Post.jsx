import React from "react";
import postsStyles from "./Post.module.css";
import fonts from "../../../Common/fonts.module.css";
import imgStyles from "../../../Common/img.module.css";
import defaultAvatar from "../../../../img/defAva.png"
import likeImg from  "../../../../img/like.svg"

const Post = (props) => {
    return (
        <div className={postsStyles.post}>
            <div className={postsStyles.post_header}>
                <img src={props.profile.photos.small || defaultAvatar} alt="#" className={imgStyles.smallImg}></img>
                <p className={fonts.small_font}>{props.profile.fullName}</p>
            </div>
            <div className={postsStyles.post_body}>
                <p className={fonts.small_font}>{props.message}</p>
            </div>
            <div className={postsStyles.post_footer}>
                <div className={postsStyles.post_footerLikesBox}>
                    <img src={likeImg} alt="#"/>
                    <p className={fonts.small_font}>{props.likesCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;
