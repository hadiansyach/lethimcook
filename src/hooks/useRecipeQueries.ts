import { useQuery } from '@tanstack/react-query';
import { getRecipeDetail, getRecipeRecommendations } from '@/api/recipeService';
import { useRecipeStore } from '@/store/useRecipeStore';
import { RecipeListItem } from '@/types/recipe';

// Initial fallback mock data matching design
export const DEFAULT_MOCK_RECIPES: RecipeListItem[] = [
  {
    nama_menu: 'Tahu Telur Bumbu Kecap Pedas Gurih',
    kecocokan_bahan: '100% Bahan Cocok',
    waktu_memasak: '15 Menit',
    tingkat_kesulitan: 'Sangat Mudah',
    tingkat_pedas: 'Pedas Sedang',
    tag_masakan: ['Tumis'],
    deskripsi_rasa: 'Manis gurih karamel dengan sengatan cabai rawit segar.',
    bahan_terpakai: ['Tahu putih', 'Telur', 'Bawang putih', 'Cabai rawit', 'Kecap manis'],
    tambahan_bumbu_dasar: null,
  },
  {
    nama_menu: 'Orak-Arik Tahu Telur Daun Bawang',
    kecocokan_bahan: '90% Bahan Cocok',
    waktu_memasak: '10 Menit',
    tingkat_kesulitan: 'Sangat Mudah',
    tingkat_pedas: 'Bebas',
    tag_masakan: ['Ramah Lambung', 'Orak-arik'],
    deskripsi_rasa: 'Gurih lembut, wangi aroma bawang tumis harum semerbak.',
    bahan_terpakai: ['Tahu putih', 'Telur', 'Bawang putih', 'Daun bawang'],
    tambahan_bumbu_dasar: ['Garam & lada bubuk'],
  },
  {
    nama_menu: 'Sup Tahu Telur Kuah Bening',
    kecocokan_bahan: '95% Bahan Cocok',
    waktu_memasak: '15 Menit',
    tingkat_kesulitan: 'Sangat Mudah',
    tingkat_pedas: 'Bebas',
    tag_masakan: ['Berkuah', 'Segar'],
    deskripsi_rasa: 'Kuah kaldu bening yang hangat, gurih, dan menenangkan perut.',
    bahan_terpakai: ['Tahu putih', 'Telur', 'Bawang putih'],
    tambahan_bumbu_dasar: ['Kaldu bubuk', 'Garam', 'Merica'],
  },
  {
    nama_menu: 'Telur Dadar Tahu Renyah Gurih',
    kecocokan_bahan: '85% Bahan Cocok',
    waktu_memasak: '12 Menit',
    tingkat_kesulitan: 'Sangat Mudah',
    tingkat_pedas: 'Bebas',
    tag_masakan: ['Garing', 'Praktis'],
    deskripsi_rasa: 'Tekstur luar garing dengan isian lembut dan gurih mantap.',
    bahan_terpakai: ['Telur', 'Tahu putih', 'Bawang putih'],
    tambahan_bumbu_dasar: ['Minyak goreng', 'Garam'],
  },
];

/**
 * Custom Hook: Fetch recipe recommendations using TanStack Query and in-memory Zustand store
 */
export function useRecipeRecommendationsQuery() {
  const { ingredients, time, styleOption, level } = useRecipeStore();

  const query = useQuery({
    queryKey: ['recipe-recommendations', ingredients, time, styleOption, level],
    queryFn: async () => {
      // If user has not added ingredients, return mock or empty
      const searchIngredients =
        ingredients.length > 0
          ? ingredients
          : ['Telur', 'Tahu putih', 'Bawang putih', 'Kecap manis', 'Cabai rawit'];

      try {
        const results = await getRecipeRecommendations({
          ingredients: searchIngredients,
          time,
          style: styleOption,
          level,
        });

        if (results && results.length > 0) {
          return results as RecipeListItem[];
        }
        return DEFAULT_MOCK_RECIPES;
      } catch (err) {
        console.warn('TanStack query error, falling back to mock:', err);
        return DEFAULT_MOCK_RECIPES;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    recipes: query.data || DEFAULT_MOCK_RECIPES,
  };
}

/**
 * Custom Hook: Fetch recipe detail by selected recipe item using TanStack Query
 */
export function useRecipeDetailQuery(recipe: RecipeListItem | null) {
  return useQuery({
    queryKey: ['recipe-detail', recipe?.nama_menu],
    queryFn: async () => {
      if (!recipe) throw new Error('No recipe selected');
      try {
        return await getRecipeDetail(recipe);
      } catch (err) {
        console.warn('Failed to fetch detail, trying test mode:', err);
        return await getRecipeDetail(recipe, true);
      }
    },
    enabled: Boolean(recipe),
    staleTime: 1000 * 60 * 10, // 10 minutes cache for details
  });
}
