import {sendMessageAC, updateNewMessageTextAC} from "../../../redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getNewMessageText} from "../../../redux/dialogs-selectors";
import React from "react";

const NewMessage = (props) => {

    const newMessageText = useSelector(state => getNewMessageText(state));

    const dispatch = useDispatch();

    const sendMessage = () => {
        dispatch(sendMessageAC());
    }

    const onMessageChange = (e) => {
        dispatch(updateNewMessageTextAC(e.currentTarget.value))
    };

    return (
        <div>
            <textarea onChange={onMessageChange} value={newMessageText}/>
            <button onClick={sendMessage}>Send message</button>
        </div>
    );
}

export default NewMessage;