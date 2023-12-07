import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import * as recipesService from "../../services/recipesService";
import AuthContext from "../../contexts/authContext";

import styles from "./RecipeDetails.module.css";

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({});
    const { recipeId } = useParams();
    const { id } = useContext(AuthContext);

    useEffect(() => {
        recipesService.getOneRecipe(recipeId)
            .then(setRecipe)
    }, [recipeId]);

    return (
        <div className={styles.recipeContainer}>
            <div className={styles.recipe}>
                <div className={styles.media}>
                    <img src={recipe.img} />
                </div>
                <h3>{recipe.name}</h3>
                {id === recipe._ownerId && (
                    <div className={styles.btns}>
                        <Link to={`/all-recipes/${recipeId}/edit-recipe`}>Edit</Link>
                        <Link to="">Delete</Link>
                    </div>
                )}
            </div>
            <div className={styles.recipeInfo}>
                <h4>Ingredients:</h4>
                <div className={styles.ingredients}>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <h4>Steps:</h4>
                <div className={styles.steps}>
                    <ol>
                        {recipe.steps && recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}