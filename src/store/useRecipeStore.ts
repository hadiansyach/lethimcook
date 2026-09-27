import { create } from 'zustand';
import {
  CookingStyleOption,
  CookingTimeOption,
  RecipeDetailObject,
  RecipeListItem,
  SpiceLevelOption,
} from '@/types/recipe';

interface RecipeStoreState {
  // Input search in-memory state (eliminates bloated URLs)
  ingredients: string[];
  time: CookingTimeOption;
  styleOption: CookingStyleOption;
  level: SpiceLevelOption;

  // Quota state
  quotaRemaining: number;
  quotaTotal: number;

  // Selected recipe detail modal state
  selectedRecipe: RecipeListItem | null;
  selectedRecipeDetail: RecipeDetailObject | null;
  detailModalVisible: boolean;

  // Saved bookmarks & History in-memory
  savedRecipes: RecipeListItem[];
  historyRecipes: RecipeListItem[];

  // Actions
  addIngredient: (name: string) => void;
  removeIngredient: (index: number) => void;
  setIngredients: (ingredients: string[]) => void;
  clearIngredients: () => void;

  setTime: (time: CookingTimeOption) => void;
  setStyleOption: (style: CookingStyleOption) => void;
  setLevel: (level: SpiceLevelOption) => void;

  setQuotaRemaining: (quota: number) => void;
  decrementQuota: () => void;

  setSelectedRecipe: (recipe: RecipeListItem | null) => void;
  setSelectedRecipeDetail: (detail: RecipeDetailObject | null) => void;
  setDetailModalVisible: (visible: boolean) => void;

  toggleSaveRecipe: (recipe: RecipeListItem) => boolean;
  isRecipeSaved: (name: string) => boolean;
  addToHistory: (recipe: RecipeListItem) => void;
}

export const useRecipeStore = create<RecipeStoreState>((set, get) => ({
  ingredients: [],
  time: 'semua',
  styleOption: 'all',
  level: 'bebas',

  quotaRemaining: 0,
  quotaTotal: 5,

  selectedRecipe: null,
  selectedRecipeDetail: null,
  detailModalVisible: false,

  savedRecipes: [],
  historyRecipes: [],

  addIngredient: (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const current = get().ingredients;
    if (!current.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
      set({ ingredients: [...current, trimmed] });
    }
  },

  removeIngredient: (index: number) => {
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => i !== index),
    }));
  },

  setIngredients: (ingredients: string[]) => {
    set({ ingredients });
  },

  clearIngredients: () => {
    set({ ingredients: [] });
  },

  setTime: (time: CookingTimeOption) => {
    set({ time });
  },

  setStyleOption: (styleOption: CookingStyleOption) => {
    set({ styleOption });
  },

  setLevel: (level: SpiceLevelOption) => {
    set({ level });
  },

  setQuotaRemaining: (quotaRemaining: number) => {
    set({ quotaRemaining });
  },

  decrementQuota: () => {
    set((state) => ({
      quotaRemaining: Math.max(0, state.quotaRemaining - 1),
    }));
  },

  setSelectedRecipe: (recipe: RecipeListItem | null) => {
    set({ selectedRecipe: recipe });
  },

  setSelectedRecipeDetail: (detail: RecipeDetailObject | null) => {
    set({ selectedRecipeDetail: detail });
  },

  setDetailModalVisible: (visible: boolean) => {
    set({ detailModalVisible: visible });
  },

  toggleSaveRecipe: (recipe: RecipeListItem) => {
    const { savedRecipes } = get();
    const exists = savedRecipes.some((r) => r.nama_menu === recipe.nama_menu);
    if (exists) {
      set({
        savedRecipes: savedRecipes.filter((r) => r.nama_menu !== recipe.nama_menu),
      });
      return false;
    } else {
      set({
        savedRecipes: [recipe, ...savedRecipes],
      });
      return true;
    }
  },

  isRecipeSaved: (name: string) => {
    return get().savedRecipes.some((r) => r.nama_menu === name);
  },

  addToHistory: (recipe: RecipeListItem) => {
    const { historyRecipes } = get();
    const filtered = historyRecipes.filter((r) => r.nama_menu !== recipe.nama_menu);
    set({
      historyRecipes: [recipe, ...filtered],
    });
  },
}));
