import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.siteHeader}>
            <div className={styles.headerContainer}>
                <h1 className={styles.siteTitle}>
                    <a href="#">Dish Diary</a>
                </h1>

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