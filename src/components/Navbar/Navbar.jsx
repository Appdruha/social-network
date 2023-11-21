import React from "react";
import navbarStyles from "./Navbar.module.css";
import fonts from "../Common/fonts.module.css"
import {useNavigate} from "react-router-dom";
import MyFollowsBox from "./MyFollowsBox/MyFollowsBox";
import users from "../../img/users.svg";
import news from "../../img/news.svg";
import music from "../../img/music.svg";
import settings from "../../img/settings.svg";
import profile from "../../img/myProfile.svg";
import messages from "../../img/messages.svg";
import follows from "../../img/myFollows.svg";

const Navbar = (props) => {

    const navigate = useNavigate();

    const textStyles = `${navbarStyles.nav_item_text} ${fonts.small_font}`;

    const relocate = (path, isAuth = props.isAuth) => {
        isAuth && navigate(path);
    }

    return (
        <nav className={navbarStyles.nav}>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/myProfile")}>
                <img src={profile} alt="#"/>
                <p className={textStyles}>My Profile</p>
            </div>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/dialogs")}>
                <img src={messages} alt="#"/>
                <p className={textStyles}>Messages</p>
            </div>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/news")}>
                <img src={news} alt="#"/>
                <p className={textStyles}>News</p>
            </div>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/music")}>
                <img src={music} alt="#"/>
                <p className={textStyles}>Music</p>
            </div>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/settings")}>
                <img src={settings} alt="#"/>
                <p className={textStyles}>Settings</p>
            </div>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/users")}>
                <img src={users} alt="#"/>
                <p className={textStyles}>Users</p>
            </div>
            <div className={navbarStyles.nav_item} onClick={() => relocate("/follows")}>
                <img src={follows} alt="#"/>
                <p className={textStyles}>Follows</p>
            </div>
            <MyFollowsBox/>
        </nav>
    );
};

export default Navbar;
