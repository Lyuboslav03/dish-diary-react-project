import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles.homePage}>
            <div className={styles.container}>
                <div className={styles.welcomeMessage}>
                    <h2>Welcome to Dish Diary</h2>
                    <img src="./images/home-logo.png" />
                    <h3>#1 Recipe Source for mouth-watering homemade goodies!</h3>
                    <div className={styles.btnContainer}>
                        <a href="/all-recipes" className={styles.recipesBtn}>View all recipes</a>
                    </div>
                </div>
            </div>
        </div>
    );
}