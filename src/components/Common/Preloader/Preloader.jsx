import React from "react";
import s from "./preloader.module.css"
import preloader from "../../../img/Dual Ring-1s-200px.svg";

let Preloader = () => {
    return <div className={s.preloaderContainer}>
        <img className={s.preloader} src={preloader} alt="#"/>
    </div>
}

export default Preloader