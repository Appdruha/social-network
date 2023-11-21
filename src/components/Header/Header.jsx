import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetApp} from "../../redux/rootReducer";
import {authAPI} from "../../api/requestsApi";
import {NavLink, useNavigate} from "react-router-dom";
import headerStyles from "./Header.module.css";
import imgStyles from "../Common/img.module.css"
import fonts from "../Common/fonts.module.css"
import defAva from "../../img/defAva.png";
import logoutImg from "../../img/logout.svg";
import loginImg from "../../img/login.svg";
import {getMyProfile} from "../../redux/profile-selector";

const Header = (props) => {

    const navigate = useNavigate();

    const myProfile = useSelector(state => getMyProfile(state));

    const dispatch = useDispatch();

    const logout = () => {
        authAPI.logout().then(response => {
            if (response.resultCode === 0) {
                navigate("/login");
                dispatch(resetApp());
            }
        })
    }

    return (
        <div className={headerStyles.header_container}>
            <header className={headerStyles.header}>
                <h2 className={`${fonts.logo_font} ${headerStyles.header_logo}`}>Logo</h2>
                <div className={headerStyles.loginBlock}>
                    {props.isAuth ?
                        <>
                            <NavLink to="/myProfile">
                                <img src={myProfile === null ? defAva : myProfile.photos.small} alt="#"
                                     className={`${imgStyles.smallImg} ${headerStyles.loginBlock_profileImg}`}/>
                            </NavLink>
                            <img src={logoutImg} alt="#" onClick={logout}
                                 className={headerStyles.loginBlock_logoutLogin}/>
                        </> :
                        <img src={loginImg} alt="#" className={headerStyles.loginBlock_logoutLogin}/>
                    }
                </div>
            </header>
        </div>
    );
};

export default Header;

