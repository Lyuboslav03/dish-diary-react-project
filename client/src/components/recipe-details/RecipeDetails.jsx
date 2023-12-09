import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import * as recipesService from "../../services/recipesService";
import * as commentsService from "../../services/commentsService";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./RecipeDetails.module.css";

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({});
    const [comments, setComments] = useState([]);
    const { recipeId } = useParams();
    const { id, isAuthenticated, username } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        recipesService.getOneRecipe(recipeId)
            .then(setRecipe)

        commentsService.getComments(recipeId)
            .then(setComments)
            .catch(error => error.message)
    }, [recipeId]);

    const addCommentSubmitHandler = async (values) => {
        const result = await commentsService.addComment(recipeId, values.comment, username);

        setComments(state => [...state, result]);

        resetField();

        return result;
    }

    
    const { values, inputErrors, onChange, onSubmit, resetField } = useForm(addCommentSubmitHandler, {
        comment: ''
    });
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const deleteRecipeSubmitHandler = async () => {
        await recipesService.deleteRecipe(recipeId);

        navigate("/all-recipes");
    }
    
    return (
        <div className={styles.mainContainer}>

            <div className={styles.recipeContainer}>

                <div className={styles.recipe}>
                    <div className={styles.media}>
                        <img src={recipe.img} />
                    </div>
                    <h3>{recipe.name}</h3>
                    {id === recipe._ownerId && (
                        <div className={styles.btns}>
                            <Link className={styles.editBtn} to={`/all-recipes/${recipeId}/edit-recipe`}>Edit</Link>
                            <button className={styles.deleteBtn} onClick={handleShow}>Delete</button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you'd like to delete this recipe?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={deleteRecipeSubmitHandler} variant="primary">
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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

            <div className={styles.comments}>
                <h4>Comments:</h4>
                <div className={styles.comment}>
                    <ul>
                        {comments.map(({ _id, content, username, _ownerId }) => (
                            <li key={_id}>
                                <div className={styles.commentContainer}>
                                    <span className={styles.commenter}>
                                        {_ownerId === recipe._ownerId ? 'Author' : username}
                                    </span>
                                    <p className={styles.commentContent}>{content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {comments.length === 0 && (
                    <p className={styles.noComments}>No comments yet...</p>
                )}

                {isAuthenticated && (
                    <form className={styles.formSubmit} onSubmit={onSubmit}>
                        <h5>Add comment:</h5>
                        <textarea name="comment" id="comment" onChange={onChange} value={values.comment}></textarea>
                        {inputErrors && <p className="error">{inputErrors.comment}</p>}
                        <input type="submit" value="Add Comment" className={styles.btnSubmit} />
                    </form>
                )}

            </div>

        </div>
    );
}