import { useState, useRef } from "react";
import style from "./App.module.css";

export const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const submitBtnRef = useRef(null);

    const canFocusButton = () => {
        return (
            !emailError &&
            !passwordError &&
            !confirmPasswordError &&
            email &&
            password &&
            confirmPassword
        );
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const onEmailChange = ({ target }) => {
        setEmail(target.value);
        if (!validateEmail(target.value)) {
            setEmailError("Некорректный email.");
        } else {
            setEmailError(null);
        }
    };

    const onPasswordChange = ({ target }) => {
        setPassword(target.value);

        let error = null;

        if (target.value.length < 6) {
            error = "Пароль должен быть не менее 6 символов.";
        }

        else if (!/[A-Z]/.test(target.value)) {
            error = "Пароль должен содержать хотя бы одну заглавную букву.";
        }

        else if (!/[a-z]/.test(target.value)) {
            error = "Пароль должен содержать хотя бы одну строчную букву.";
        }

        else if (!/[0-9]/.test(target.value)) {
            error = "Пароль должен содержать хотя бы одну цифру.";
        }

        else if (!/[!@#$%^&*]/.test(target.value)) {
            error = "Пароль должен содержать хотя бы один специальный символ (!@#$%^&*).";
        }

        setPasswordError(error);
    };

    const onConfirmPasswordChange = ({ target }) => {
        setConfirmPassword(target.value);

        if (password !== target.value) {
            setConfirmPasswordError("Пароли не совпадают");
        } else setConfirmPasswordError(null);


    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password, confirmPassword });
    };



    return (
        <div className={style.app}>
            <form className={style.form} onSubmit={onSubmit}>
                {emailError && (
                    <span className={style.error}>{emailError}</span>
                )}
                <input
                    className={style.input}
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onEmailChange}
                ></input>
                {passwordError && (
                    <span className={style.error}>{passwordError}</span>
                )}
                <input
                    className={style.input}
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onPasswordChange}
                ></input>
                {confirmPasswordError && (
                    <span className={style.error}>{confirmPasswordError}</span>
                )}
                <input
                    className={style.input}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="confirmPassword"
                    onChange={onConfirmPasswordChange}
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
