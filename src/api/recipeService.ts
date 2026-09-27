import {
  RecipeDetailResponseSchema,
  RecipeListResponseSchema,
  RecipeRequestSchema,
  ValidatedRecipeDetail,
  ValidatedRecipeListItem,
  ValidatedRecipeRequest,
} from '@/schemas/recipeSchema';
import { RecipeDetailObject, RecipeListItem } from '@/types/recipe';

export const IS_TEST = true;

const API_BASE_URL = 'https://app.noparkeemart.my.id/kepocia/api';

/**
 * Fetch recipe recommendations based on ingredients and preferences
 * POST /receipe
 */
export async function getRecipeRecommendations(
  payload: ValidatedRecipeRequest,
  isTest = IS_TEST
): Promise<ValidatedRecipeListItem[]> {
  // Validate request payload with Zod
  const validatedPayload = RecipeRequestSchema.parse(payload);

  const url = `${API_BASE_URL}/receipe${isTest ? '?is_test=true' : ''}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedPayload),
  });

  const rawJson = await response.json();
  const parsedResponse = RecipeListResponseSchema.safeParse(rawJson);

  if (!parsedResponse.success) {
    console.warn('Zod validation warning on recipe list response:', parsedResponse.error);
  }

  if (!response.ok || rawJson.httpCode >= 400) {
    throw new Error(rawJson.message || `Failed to fetch recipes (${rawJson.httpCode})`);
  }

  return rawJson.data || [];
}

/**
 * Fetch full recipe detail from a selected recipe list item
 * POST /receipe/from-list
 */
export async function getRecipeDetail(
  recipe: RecipeListItem,
  isTest = IS_TEST
): Promise<RecipeDetailObject> {
  const url = `${API_BASE_URL}/receipe/from-list${isTest ? '?is_test=true' : ''}`;

  // Per docs/API.md note: tambahan_bumbu_dasar must be non-empty array
  const sanitizedRecipe = {
    ...recipe,
    tambahan_bumbu_dasar:
      recipe.tambahan_bumbu_dasar && recipe.tambahan_bumbu_dasar.length > 0
        ? recipe.tambahan_bumbu_dasar
        : ['Garam', 'Merica', 'Minyak goreng', 'Air'],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sanitizedRecipe),
  });

  const rawJson = await response.json();
  const parsedResponse = RecipeDetailResponseSchema.safeParse(rawJson);

  if (!parsedResponse.success) {
    console.warn('Zod validation warning on recipe detail response:', parsedResponse.error);
  }

  if (!response.ok || rawJson.httpCode >= 400) {
    throw new Error(rawJson.message || `Failed to fetch recipe detail (${rawJson.httpCode})`);
  }

  if (!rawJson.data) {
    throw new Error('No recipe detail data returned');
  }

  return rawJson.data;
}
