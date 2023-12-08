import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as recipesService from "../../services/recipesService";
import { validateInputs } from "../../utils/validateFieldsUtil";

import styles from "./EditRecipe.module.css";

export default function EditRecipe() {
    const [recipe, setRecipe] = useState({
        name: '',
        img: '',
        ingredients: '',
        steps: '',
    });
    const [inputErrors, setInputErrors] = useState({});
    const { recipeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        recipesService.getOneRecipe(recipeId)
            .then(result => {
                setRecipe({
                    name: result.name,
                    img: result.img,
                    ingredients: result.ingredients.join("\n"),
                    steps: result.steps.join("\n")
                });
            })
    }, [recipeId])

    const onChange = (e) => {
        setRecipe(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))

        setInputErrors(state => ({
            ...state,
            [e.target.name]: null
        }))
    }

    const editRecipeSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        const errors = validateInputs(values);

        if (Object.keys(errors).length === 0) {
            const data = {
                name: values.name,
                img: values.img,
                ingredients: values.ingredients.split("\n"),
                steps: values.steps.split("\n")
            };

            try {
                await recipesService.editRecipe(recipeId, data);

                navigate(`/all-recipes/${recipeId}`);
            } catch (error) {
                console.error(error.message);
                throw error;
            }

        } else {
            setInputErrors(errors);
        }
    }

    return (
        <div className={styles.recipeInfo}>
            <form onSubmit={editRecipeSubmitHandler}>
                <h2>Edit Recipe</h2>

                <label htmlFor="name">Recipe Name:</label>
                <input type="text" id="name" name="name" onChange={onChange} value={recipe.name} />
                {inputErrors && <p>{inputErrors.name}</p>}

                <label htmlFor="img">Image url:</label>
                <input type="text" id="img" name="img" onChange={onChange} value={recipe.img} />
                {inputErrors && <p>{inputErrors.img}</p>}

                <label htmlFor="ingredients">Ingredients:</label>
                <textarea name="ingredients" id="ingredients" onChange={onChange} value={recipe.ingredients} placeholder="Enter ingredients separated by comma..."></textarea>
                {inputErrors && <p>{inputErrors.ingredients}</p>}

                <label htmlFor="steps">Steps:</label>
                <textarea name="steps" id="steps" onChange={onChange} value={recipe.steps} placeholder="Enter steps separated by comma..."></textarea>
                {inputErrors && <p>{inputErrors.steps}</p>}

                <input type="submit" className={styles.btnSubmit} value="Edit Recipe" />
            </form>
        </div>
    );
}