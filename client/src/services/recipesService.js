import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/recipes"

export const getRecipes = async () => {
    const result = await request.get(baseUrl);

    return result;
};