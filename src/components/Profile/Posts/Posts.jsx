import React from "react";
import postsStyles from "./Posts.module.css";
import Post from "./Post/Post";
import Preloader from "../../Common/Preloader/Preloader";
import NewPost from "./NewPost/NewPost";

const Posts = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const postsElements = props.posts
        .map(post => <Post message={post.message} likesCount={post.likesCount} profile={props.profile}/>)

    return (
        <div className={postsStyles.postsContainer}>
            {props.isAuthProfile && <NewPost/>}
            <div>
                {postsElements}
            </div>
        </div>
    );
};

export default Posts;
