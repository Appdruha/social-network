import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateStatus} from "../../../../redux/profile-reducer";
import profileInfoStyles from "../ProfileInfo.module.css";
import fonts from "../../../Common/fonts.module.css";

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    const [prevStatus, setPrevStatus] = useState(props.status);

    const dispatch = useDispatch();

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const checkTextLength = (text) => {
        return text.length < 150;
    }

    const checkTextParts = (text) => {
        const textParts = text.split(" ");
        let isValid = true;

        textParts.map(str => {
            if (str.length > 50) {
                isValid = false;
            }
        })

        return isValid;
    }

    const setValidStatus = (text) => {
        if (checkTextLength(text) && checkTextParts(text)) {
            setPrevStatus(text);
            dispatch(updateStatus(text));
        } else {
            alert("Некорректный статус!");
            setStatus(prevStatus);
            return false;
        }
    }

    const toggleEditMode = (isActivated) => {
        setEditMode(isActivated);
        if (!isActivated) {
            setValidStatus(status);
        }
    }

    const selectAllText = (e) => {
        e.target.select();
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <>
            {!editMode &&
                <div className={profileInfoStyles.profileInfo_statusBox}>
                    <p className={fonts.small_font}
                       onDoubleClick={() => props.isAuthProfile && toggleEditMode(true)}>
                        {props.status ? status : "Here must be status!"}
                    </p>
                </div>
            }
            {editMode &&
                <div className={profileInfoStyles.profileInfo_statusBox}>
                    <textarea
                        autoFocus={true}
                        onFocus={selectAllText}
                        onChange={onStatusChange}
                        onBlur={() => {
                            toggleEditMode(false)
                        }}
                        value={status}
                        className={fonts.small_font}/>
                </div>
            }
        </>
    )
}

export default ProfileStatus;