import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Common/Preloader/Preloader";
import {
    getIsMyFollows,
    getTotalUsersCount,
    getUsers, getUsersPackageNumber
} from "../../redux/users-selectors";
import {
    requestUsers, resetState,
    setIsMyFollowsRender,
    setUsersPackageNumber,
} from "../../redux/users-reducer";
import {useLocation} from "react-router-dom";
import Users from "./Users";
import {toggleIsFetching} from "../../redux/app-reducer";
import {getIsFetching} from "../../redux/app-selectors";

const UsersContainer = () => {

    const users = useSelector(state => getUsers(state));
    const isFetching = useSelector(state => getIsFetching(state));
    const totalUsersCount = useSelector(state => getTotalUsersCount(state));
    let isMyFollows = useSelector(state => getIsMyFollows(state));
    const usersPackageNumber = useSelector(state => getUsersPackageNumber(state));

    const dispatch = useDispatch();

    const currentPathName = useLocation().pathname;

    const [term, setTerm] = useState("");

    const [pathName, setPathName] = useState(currentPathName);

    const combinedRequestUsers = async (packageNumber, packageSize, isMyFollowsRequest, letters = "", isFirstUsers) => {
        dispatch(toggleIsFetching(true));

        if (isFirstUsers) {
            await dispatch(resetState());
            setTerm(letters);
            dispatch(setIsMyFollowsRender(isMyFollowsRequest));
        }

        await dispatch(requestUsers(packageNumber, packageSize, isMyFollowsRequest, letters));
        dispatch(toggleIsFetching(false));
    }

    const combinedRequestUsersDecorator = (callee) => {
        if (currentPathName === pathName) {
            return callee(usersPackageNumber, 12, isMyFollows, term, false);
        } else {
            setPathName(currentPathName);
            isMyFollows = !isMyFollows;
            return callee(1, 12, isMyFollows, term, true);
        }
    };

    useEffect(() => {
        if (currentPathName === "/users") {
            isMyFollows = false;
            dispatch(setIsMyFollowsRender(false));
        } else {
            isMyFollows = true;
            dispatch(setIsMyFollowsRender(true));
        }
        return () => {
            dispatch(resetState(true));
        }
    }, []);

    useEffect(() => {
        combinedRequestUsersDecorator(combinedRequestUsers);
    }, [currentPathName]);

    useEffect(() => {
        if (usersPackageNumber != 1) {
            combinedRequestUsersDecorator(combinedRequestUsers);
        }
    }, [usersPackageNumber]);

    const changeTerm = async (value) => {
        await combinedRequestUsers(1, 12, isMyFollows, value, true)
    }

    const addUsers = () => {
        dispatch(setUsersPackageNumber(usersPackageNumber + 1));
    };

    const checkPosition = () => {
        let maxPackages;

        maxPackages = Math.ceil(totalUsersCount / 12);
        if (maxPackages <= usersPackageNumber) return;

        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const position = screenHeight + scrolled;

        const positionForRequest = height - screenHeight / 3;

        if (positionForRequest <= position) {
            addUsers()
        }
    };

    function throttle(callee, timeout) {
        let timer = null;

        return function perform() {
            if (timer) return;

            timer = setTimeout(() => {
                callee();

                clearTimeout(timer);
                timer = null;
            }, timeout);
        };
    }

    const throttledCheckPosition = throttle(checkPosition, 180)

    return (
        <>
            {isFetching && <Preloader/>}
            <Users isFetching={isFetching}
                   users={users}
                   checkPosition={throttledCheckPosition}
                   changeTerm={changeTerm}
                   term={term}
            />
        </>
    )
}

export default UsersContainer;








