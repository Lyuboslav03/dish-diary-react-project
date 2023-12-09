import { useEffect, useState } from "react";

import * as recipesService from "../../services/recipesService";

import RecipeItem from "./recipe-item/RecipeItem";

import styles from "./AllRecipes.module.css";

export default function AllRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        recipesService.getRecipes()
            .then(result => setRecipes(result));
    }, []);

    return (
        <div className={styles.recipesList}>
            <h2>Recipes List</h2>

            <div className={styles.allRecipes}>
                {recipes.length === 0 && (
                    <p className={styles.noRecipes}>No recipes found...</p>
                )}

                {recipes.map(recipe => (
                    <RecipeItem key={recipe._id} {...recipe} />
                ))}
            </div>
        </div>
    );
}