import { useRef } from "react";
import style from "./App.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const App = () => {
    const submitBtnRef = useRef(null);

    const fieldScheme = yup.object().shape({
        email: yup
            .string()
            .email("Некорректный email.")
            .required("Email обязателен"),
        password: yup
            .string()
            .matches(
                /[A-Z]/,
                "Пароль должен содержать хотя бы одну заглавную букву.",
            )
            .matches(
                /[a-z]/,
                "Пароль должен содержать хотя бы одну строчную букву.",
            )
            .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру.")
            .matches(
                /[!@#$%^&*]/,
                "Пароль должен содержать хотя бы один специальный символ (!@#$%^&*).",
            )
            .max(20, "Пароль должен содержать не более 20 символов"),
        passwordBlure: yup
            .string()
            .min(6, "Пароль должен быть не менее 6 символов."),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Пароли не совпадают"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(fieldScheme),
    });

    const emailError = errors.email?.message;
    const passwordError = errors.password?.message;
    const confirmPasswordError = errors.confirmPassword?.message;

    const onSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div className={style.app}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                {emailError && (
                    <span className={style.error}>{emailError}</span>
                )}
                <input
                    className={style.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email")}
                ></input>
                {passwordError && (
                    <span className={style.error}>{passwordError}</span>
                )}
                <input
                    className={style.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password")}
                ></input>
                {confirmPasswordError && (
                    <span className={style.error}>{confirmPasswordError}</span>
                )}
                <input
                    className={style.input}
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    {...register("confirmPassword")}
                ></input>
                <button
                    ref={submitBtnRef}
                    className={style.button}
                    type="submit"
                    disabled={
                        emailError || passwordError || confirmPasswordError
                    }
                >
                    Регистрация
                </button>
            </form>
        </div>
    );
};
