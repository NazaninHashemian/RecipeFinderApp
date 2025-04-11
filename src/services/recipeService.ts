// src/services/recipeService.ts
import { BASE_URL } from '../utils/apiConfig';

export const fetchRecipeById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals?.[0] || null;
};

export const fetchRecipesByName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
  const data = await response.json();
  return data.meals || [];
};

export const fetchRecipesByIngredient = async (ingredient: string) => {
  const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals || [];
};

export const fetchRecipesByFirstLetter = async (letter: string) => {
  const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals || [];
};

export const fetchRecipesByCuisine = async (cuisine: string) => {
    const response = await fetch(`${BASE_URL}/filter.php?a=${cuisine}`);
    const data = await response.json();
    return data.meals || [];
  };

export const fetchRecipesByCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  };

  export const fetchRecipesRandomly = async () => {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals || [];
  };

  