import { Link } from "react-router-dom";

import styles from "./Login.module.css";

export default function Login() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <form>
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" name="password" />

                    <input type="submit" className={styles.btnSubmit} value="Login" />

                    <p>
                        <span>Not registered? Click <Link to="/register">here</Link></span>
                    </p>
                </form>
            </div>
        </div>
    );
}