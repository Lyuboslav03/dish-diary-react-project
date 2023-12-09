import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as recipesService from "../../services/recipesService";
import { validateInputs } from "../../utils/validateFieldsUtil";

import styles from "./AddRecipe.module.css";
import { validateStructure } from "../../utils/validateStructure";

export default function AddRecipe() {
    const [recipe, setRecipe] = useState({
        name: '',
        img: '',
        ingredients: '',
        steps: '',
    });
    const [inputErrors, setInputErrors] = useState({});
    const [structureErrs, setStructureErrs] = useState({});
    
    const navigate = useNavigate();

    const onChange = (e) => {
        setRecipe(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        
        setInputErrors(state => ({
            ...state,
            [e.target.name]: null
        }));
    }

    const createRecipeSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        const errors = validateInputs(values);
        const typeErrors = validateStructure(values);

        if (Object.keys(errors).length === 0 && Object.keys(typeErrors).length === 0) {
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
        
        } else if (Object.keys(errors).length !== 0) {
            setInputErrors(errors);
        } else if (Object.keys(typeErrors).length !== 0) {
            setStructureErrs(typeErrors);
        }
        
    };

    return (
        <div className={styles.recipeInfo}>
            <form onSubmit={createRecipeSubmitHandler}>
                <h2>Add Recipe</h2>

                <label htmlFor="name">Recipe Name:</label>
                <input type="text" id="name" name="name" onChange={onChange} value={recipe.name} />
                {inputErrors && <p className="error">{inputErrors.name}</p>}

                <label htmlFor="img">Image url:</label>
                <input type="text" id="img" name="img" onChange={onChange} value={recipe.img} />
                {inputErrors && <p className="error">{inputErrors.img}</p>}

                <label htmlFor="ingredients">Ingredients:</label>
                <textarea name="ingredients" id="ingredients" onChange={onChange} value={recipe.ingredients} placeholder="Enter ingredients separated by a new line..."></textarea>
                {inputErrors && <p className="error">{inputErrors.ingredients}</p>}
                {structureErrs && <p className="error">{structureErrs.ingredients}</p>}

                <label htmlFor="steps">Steps:</label>
                <textarea name="steps" id="steps" onChange={onChange} value={recipe.steps} placeholder="Enter steps separated by a new line..."></textarea>
                {inputErrors && <p className="error">{inputErrors.steps}</p>}
                {structureErrs && <p className="error">{structureErrs.steps}</p>}

                <input type="submit" className={styles.btnSubmit} value="Add Recipe" />
            </form>
        </div>
    );

}