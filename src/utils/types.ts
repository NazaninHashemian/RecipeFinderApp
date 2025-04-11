// utils/types.ts
export default interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: string | undefined;
  }
  