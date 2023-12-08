import { useContext } from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";

import styles from "./Login.module.css";

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, inputErrors, submitError, onChange, onSubmit } = useForm(loginSubmitHandler, {
        email: '',
        password: '',
    });

    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <form onSubmit={onSubmit}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" onChange={onChange} value={values.email} />
                    {inputErrors && <p>{inputErrors.email}</p>}
                    {submitError && <p>{submitError}</p>}

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" name="password" onChange={onChange} value={values.password} />
                    {inputErrors && <p>{inputErrors.password}</p>}
                    {submitError && <p>{submitError}</p>}

                    <input type="submit" className={styles.btnSubmit} value="Login" />

                    <p>
                        <span>Not registered? Click <Link to="/register">here</Link></span>
                    </p>
                </form>
            </div>
        </div>
    );
}