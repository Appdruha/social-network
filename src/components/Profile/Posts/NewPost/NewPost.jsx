import React, {useRef, useState} from "react";
import {addPostAC} from "../../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import postsStyles from  "../Posts.module.css";
import fonts from "../../../Common/fonts.module.css"

const NewPost = () => {

    const [newPostText, setNewPostText] = useState("");

    const textArea = useRef();

    const dispatch = useDispatch();

    const addPost = () => {
        dispatch(addPostAC(newPostText));
        textArea.current.textContent = "";
    }

    const onPostChange = (e) => {
        setNewPostText(e.target.textContent);
    }

    return (
        <div className={postsStyles.newPostBox}>
            <div className={`${postsStyles.newPostBox_textarea} ${fonts.small_font}`}
                 contentEditable={true} onInput={onPostChange} ref={textArea}>
            </div>
            <button onClick={addPost} className={fonts.small_font}>Add post</button>
        </div>
    )
}

export default NewPost;
