import React from "react";
import {NavLink} from "react-router-dom";
import s from "../Dialogs.module.css";

const DialogItem = (props) => {
    return (
        <NavLink to={"/dialogs/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            {props.name}
        </NavLink>
    )
}

export default DialogItem