import { ADD_ARTICLE } from "./types";

export const addArticle = article => ({
    type: ADD_ARTICLE,
    payload: article
});