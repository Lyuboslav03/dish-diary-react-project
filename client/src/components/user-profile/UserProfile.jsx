import { useContext, useEffect, useState } from "react";

import * as recipesService from "../../services/recipesService";
import AuthContext from "../../contexts/authContext";

import RecipeItem from "../all-recipes/recipe-item/RecipeItem";

import styles from "./UserProfile.module.css";

export default function UserProfile() {
    const { id, username } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        recipesService.getRecipesForUser(id)
            .then(res => setRecipes(res))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className={styles.profile}>
            <h2>{username}'s profile</h2>

            <div className={styles.profileInfo}>
                <h3>Created recipes:</h3>
                {recipes.length === 0 && (
                    <p className={styles.noRecipes}>No recipes created</p>
                )}
                <div className={styles.createdRecipes}>
                    {recipes.map(recipe => (
                        <RecipeItem key={recipe._id} {...recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
}