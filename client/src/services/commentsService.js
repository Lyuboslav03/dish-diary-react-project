import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/comments";

export const getComments = async (recipeId) => {
    const query = new URLSearchParams({
        where: `recipeId="${recipeId}"`
    });

    try {
        const result = await request.get(`${baseUrl}?${query}`);

        return result;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const addComment = async (recipeId, content, username) => {
    const result = await request.post(baseUrl, {
        recipeId,
        content,
        username
    })

    return result;
};