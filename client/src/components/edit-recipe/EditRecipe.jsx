import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as recipesService from "../../services/recipesService";

import styles from "./EditRecipe.module.css";

export default function EditRecipe() {
    const [recipe, setRecipe] = useState({
        name: '',
        img: '',
        ingredients: '',
        steps: '',
    });
    const { recipeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        recipesService.getOneRecipe(recipeId)
            .then(result => {
                setRecipe(result);
            })
    }, [recipeId])

    const onChange = (e) => {
        setRecipe(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const editRecipeSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));
        
        try {
            await recipesService.editRecipe(recipeId, values);
            
            navigate(`/all-recipes/${recipeId}`);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    return (
        <div className={styles.recipeInfo}>
            <form onSubmit={editRecipeSubmitHandler}>
                <h2>Edit Recipe</h2>

                <label htmlFor="name">Recipe Name:</label>
                <input type="text" id="name" name="name" onChange={onChange} value={recipe.name} />

                <label htmlFor="img">Image url:</label>
                <input type="text" id="img" name="img" onChange={onChange} value={recipe.img} />

                <label htmlFor="ingredients">Ingredients:</label>
                <textarea name="ingredients" id="ingredients" onChange={onChange} value={recipe.ingredients} placeholder="Enter ingredients separated by comma..."></textarea>

                <label htmlFor="steps">Steps:</label>
                <textarea name="steps" id="steps" onChange={onChange} value={recipe.steps} placeholder="Enter steps separated by comma..."></textarea>

                <input type="submit" className={styles.btnSubmit} value="Edit Recipe" />
            </form>
        </div>
    );
}