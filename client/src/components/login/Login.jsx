import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

import styles from "./Login.module.css";

export default function Login() {
    const { values, onChange, onSubmit } = useForm({
        email: '',
        password: '',
    });

    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <form onSubmit={onSubmitHandler}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" onChange={onChangeHandler} value={values.email} />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" name="password" onChange={onChangeHandler} value={values.password} />

                    <input type="submit" className={styles.btnSubmit} value="Login" />

                    <p>
                        <span>Not registered? Click <Link to="/register">here</Link></span>
                    </p>
                </form>
            </div>
        </div>
    );
}