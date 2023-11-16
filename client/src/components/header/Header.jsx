import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export default function Header() {
    return (
        <header className={styles.siteHeader}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <a href="#">
                        <img className={styles.siteLogo} src={logo} alt="Site logo" />
                    </a>
                </div>

                <nav className={styles.siteNav}>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">All Recipes</a></li>
                        <li><a href="#">Add Recipe</a></li>
                        <li><a href="#">Logout</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}