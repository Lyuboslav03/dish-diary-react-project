import { Link } from "react-router-dom";

import styles from "./Register.module.css";

export default function Register () {
    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <form>
                    <h2>Register</h2>

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" />

                    <label htmlFor="register-pass">Password:</label>
                    <input type="password" name="password" />

                    <label htmlFor="repeat-pass">Repeat Password:</label>
                    <input type="password" name="repeat-password" />

                    <input type="submit" className={styles.btnSubmit} value="Register"/>

                    <p>
                        <span>Already registered? Click <Link to="/login">here</Link></span>
                    </p>
                </form>
            </div>
        </div>
    );
}