import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

import styles from "./Register.module.css";
import useForm from "../../hooks/useForm";

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    RepeatPassword: 'repeat-password'
};

export default function Register () {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, inputErrors, submitError, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.RepeatPassword]: ''
    });

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <form onSubmit={onSubmit}>
                    <h2>Register</h2>

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" onChange={onChange} value={values[RegisterFormKeys.Email]} />
                    {inputErrors && <p>{inputErrors[RegisterFormKeys.Email]}</p>}
                    {submitError && <p>{submitError}</p>}

                    <label htmlFor="register-pass">Password:</label>
                    <input type="password" name="password" onChange={onChange} value={values[RegisterFormKeys.Password]} />
                    {inputErrors && <p>{inputErrors[RegisterFormKeys.Password]}</p>}

                    <label htmlFor="repeat-pass">Repeat Password:</label>
                    <input type="password" name="repeat-password" onChange={onChange} value={values[RegisterFormKeys.RepeatPassword]} />
                    {inputErrors && <p>{inputErrors[RegisterFormKeys.RepeatPassword]}</p>}

                    <input type="submit" className={styles.btnSubmit} value="Register"/>

                    <p>
                        <span>Already registered? Click <Link to="/login">here</Link></span>
                    </p>
                </form>
            </div>
        </div>
    );
}