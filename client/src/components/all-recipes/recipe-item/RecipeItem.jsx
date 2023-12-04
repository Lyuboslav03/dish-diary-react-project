import { Link } from "react-router-dom";

import styles from "./RecipeItem.module.css";

export default function RecipeItem({
    name,
    img,
    _id,
}) {
    return (
        <div className={styles.recipeContainer}>
            <div className={styles.recipe}>
                <div className={styles.media}>
                    <img src={img} />
                </div>
                <h3>{name}</h3>
                <div className={styles.btnContainer}>
                    <Link href={`/all-recipes/${_id}`} className={styles.detailsBtn}>Details</Link>
                </div>
            </div>
        </div>
    );
}