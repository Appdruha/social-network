import React, {useEffect} from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {requestUsers} from "./redux/users-reducer";
import {getIsAuth, getIsInitialized} from "./redux/app-selectors";
import Header from "./components/Header/Header";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import UsersContainer from "./components/Users/UsersContainer";
import {getUserProfile} from "./redux/profile-reducer";
import {getAuthUserId} from "./redux/profile-selector";

const App = () => {

    const navigate = useNavigate();

    const initialized = useSelector(state => getIsInitialized(state));
    const isAuth = useSelector(state => getIsAuth(state));
    const authUserId = useSelector(state => getAuthUserId(state));

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth) {
            dispatch(requestUsers(1, 3, true, "", true));
            dispatch(getUserProfile(authUserId, true));
        }
        else {
            navigate("/login")
        }

        dispatch(initializeApp());
    }, [isAuth]);

    if (!initialized)
        return <Preloader/>

    return (
        <div className="wrapper">
            <Header isAuth={isAuth}/>
            <div className="app_wrapper">
                <Navbar isAuth={isAuth}/>
                <div className="app_wrapper_content">
                    <Routes>
                        <Route path="/dialogs" element={<Dialogs/>}/>
                        <Route path="/myProfile" element={<Profile/>}/>
                        <Route path="/profile/:userId" element={<Profile/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/follows" element={<UsersContainer/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/login" element={<Login isAuth={isAuth}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
