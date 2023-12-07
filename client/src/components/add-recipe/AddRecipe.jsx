import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import * as recipesService from "../../services/recipesService";

import styles from "./AddRecipe.module.css";

export default function AddRecipe() {
    const navigate = useNavigate();

    const createRecipeSubmitHandler = async (values) => {
        const data = {
            name: values.name,
            img: values.img,
            ingredients: values.ingredients.split("\n"),
            steps: values.steps.split("\n"),
        }

        try {
            await recipesService.createRecipe(data);

            navigate("/all-recipes");

        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const { values, onChange, onSubmit } = useForm(createRecipeSubmitHandler, {
        name: '',
        img: '',
        ingredients: '',
        steps: '',
    })

    return (
        <div className={styles.recipeInfo}>
            <form onSubmit={onSubmit}>
                <h2>Add Recipe</h2>

                <label htmlFor="name">Recipe Name:</label>
                <input type="text" id="name" name="name" onChange={onChange} value={values.name} />

                <label htmlFor="img">Image url:</label>
                <input type="text" id="img" name="img" onChange={onChange} value={values.img} />

                <label htmlFor="ingredients">Ingredients:</label>
                <textarea name="ingredients" id="ingredients" onChange={onChange} value={values.ingredients} placeholder="Enter ingredients separated by comma..."></textarea>

                <label htmlFor="steps">Steps:</label>
                <textarea name="steps" id="steps" onChange={onChange} value={values.steps} placeholder="Enter steps separated by comma..."></textarea>

                <input type="submit" className={styles.btnSubmit} value="Add Recipe" />
            </form>
        </div>
    );

}