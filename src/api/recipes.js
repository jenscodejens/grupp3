import apiClient from './base';

// Fetch all recipes from the API
export const getRecipes = () => apiClient.get('/recipes');

// Fetch a single recipe by its ID
export const getRecipeById = (id) => apiClient.get(`/recipes/${id}`);

// Create a new recipe, not implemented in the UI yet
export const createRecipe = (recipeData) => apiClient.post('/recipes', recipeData);

// Update an existing recipe by ID, not implemented in the UI yet
export const updateRecipe = (id, recipeData) => apiClient.put(`/recipes/${id}`, recipeData);

// Delete a recipe by ID, not implemented in the UI yet
export const deleteRecipe = (id) => apiClient.delete(`/recipes/${id}`);

// Add a rating to a recipe
export const addRating = (id, rating) => apiClient.post(`/recipes/${id}/ratings`, { rating });