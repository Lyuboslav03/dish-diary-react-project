import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/recipes"

export const getRecipes = async () => {
    const result = await request.get(baseUrl);

    return result;
};

export const getOneRecipe = async (recipeId) => {
    const result = await request.get(`${baseUrl}/${recipeId}`);

    return result;
};

export const createRecipe = async (data) => {
    const result = await request.post(`${baseUrl}`, data);

    return result;
};

export const editRecipe = async (recipeId, data) => {
    const result = await request.put(`${baseUrl}/${recipeId}`, data)

    return result;
};