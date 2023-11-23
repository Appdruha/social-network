import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {tryLogin} from "../../redux/auth-reducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import loginStyles from "./login.module.css";
import fonts from "../Common/fonts.module.css"

const Login = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (props.isAuth) {
            navigate("/myProfile");
        }
    }, [props.isAuth]);

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        dispatch(tryLogin(data.email, data.password, data.rememberMe));
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={loginStyles.form}>
                <p className={fonts.medium_font}>Login</p>
                <div className={loginStyles.inputContainer}>
                    <input type="email" className={`${loginStyles.input} ${fonts.small_font}`}
                           placeholder=" "
                           {...register("email", {
                               required: "Поле не заполнено",
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                   message: "Некорректный email"
                               }
                           })}/>
                    <label htmlFor="email"
                           className={`${loginStyles.placeholder} ${loginStyles.ph1} ${fonts.small_font}`}>
                        Your email
                    </label>
                </div>

                <>
                    {errors?.email && <p style={{color: "red"}} className={fonts.small_font}>
                        {errors?.email?.message || "error"}
                    </p>}
                </>

                <div className={loginStyles.inputContainer}>
                    <input type="password" className={`${loginStyles.input} ${fonts.small_font}`}
                           placeholder=" "
                           {...register("password", {
                               required: "Поле не заполнено",
                           })}/>
                    <label htmlFor="password"
                           className={`${loginStyles.placeholder} ${loginStyles.ph2} ${fonts.small_font}`}>
                        Your password
                    </label>
                </div>

                <>
                    {errors?.password && <p style={{color: "red"}} className={fonts.small_font}>
                        {errors?.password?.message || "error"}
                    </p>}
                </>

                <div className={loginStyles.checkBox}>
                    <label htmlFor="rememberMe" className={fonts.small_font}>Remember me</label>
                    <input type="checkbox" {...register("rememberMe")}/>
                </div>

                <button type="submit" disabled={!isValid}>Login</button>
            </form>
        </div>
    )
}

export default Login;












