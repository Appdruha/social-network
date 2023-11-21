import {useSelector} from "react-redux";
import {getDialogsPage} from "../../redux/dialogs-selectors";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";
import React from "react";
import NewMessage from "./NewMessage/NewMessage";

const Dialogs = () => {

    const dialogsPage = useSelector(state => getDialogsPage(state));

    const dialogsElements = dialogsPage.dialogs
        .map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    const messagesElements = dialogsPage.messages
        .map(message => <Message message={message.message} id={message.id}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <NewMessage/>
            </div>
        </div>
    );
}

export default Dialogs;
