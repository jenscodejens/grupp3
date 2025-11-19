import apiClient from './base';

export const getRecipes = () => apiClient.get('/recipes');

export const getRecipeById = (id) => apiClient.get(`/recipes/${id}`);

export const createRecipe = (recipeData) => apiClient.post('/recipes', recipeData);

export const updateRecipe = (id, recipeData) => apiClient.put(`/recipes/${id}`, recipeData);

export const deleteRecipe = (id) => apiClient.delete(`/recipes/${id}`);