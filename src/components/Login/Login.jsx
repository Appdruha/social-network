import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {tryLogin} from "../../redux/auth-reducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


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
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Your email
                    <input type="email" {...register("email", {
                        required: "Поле не заполнено",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: "Некорректный email"
                        }
                    })}/>
                </label>

                <label htmlFor="password">Your email
                    <input type="password" {...register("password", {
                        required: "Поле не заполнено",
                    })}/>
                </label>

                <label htmlFor="rememberMe">Remember me
                    <input type="checkbox" {...register("rememberMe")}/>
                </label>

                <div>
                    {errors?.email && <p>{errors?.email?.message || "error"}</p>}
                </div>

                <div>
                    {errors?.email && <p>{errors?.email?.message || "error"}</p>}
                </div>

                <button type="submit" disabled={!isValid}>Login</button>
            </form>
        </div>
    )
}

export default Login;












