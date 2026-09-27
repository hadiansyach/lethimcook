import { z } from 'zod';

export const CookingTimeSchema = z.enum(['semua', 'kilat', 'santai']);
export const CookingStyleSchema = z.enum(['all', 'tumisan', 'berkuah', 'garing']);
export const SpiceLevelSchema = z.enum(['bebas', 'tidak pedas', 'pedas nampol']);

export const RecipeRequestSchema = z.object({
  ingredients: z.array(z.string().trim().min(1)).min(1, 'Masukkan minimal 1 bahan makanan'),
  time: CookingTimeSchema.default('semua'),
  style: CookingStyleSchema.default('all'),
  level: SpiceLevelSchema.default('bebas'),
});

export const RecipeListItemSchema = z.object({
  kecocokan_bahan: z.string().default('100% Bahan Cocok'),
  nama_menu: z.string(),
  waktu_memasak: z.string(),
  tingkat_kesulitan: z.string(),
  tingkat_pedas: z.string(),
  tag_masakan: z.array(z.string()).default([]),
  deskripsi_rasa: z.string(),
  bahan_terpakai: z.array(z.string()).default([]),
  tambahan_bumbu_dasar: z.array(z.string()).nullable().optional(),
});

export const IngredientItemSchema = z.object({
  takaran: z.string(),
  nama_bahan: z.string(),
  keterangan: z.string(),
});

export const CookingStepSchema = z.object({
  nomor: z.number(),
  judul_langkah: z.string(),
  instruksi: z.string(),
  timer_detik: z.number().nullable().default(null),
});

export const RecipeDetailSchema = z.object({
  tag_info: z.array(z.string()).default([]),
  judul_resep: z.string(),
  deskripsi_singkat: z.string(),
  ringkasan: z.object({
    waktu: z.string(),
    porsi: z.string(),
    rasa: z.string(),
  }),
  bahan_bahan: z.object({
    bahan_pokok: z.array(IngredientItemSchema).default([]),
    bumbu_tambahan: z.array(IngredientItemSchema).default([]),
  }),
  langkah_tutorial: z.array(CookingStepSchema).default([]),
});

export const RecipeListResponseSchema = z.object({
  httpCode: z.number(),
  httpMessage: z.string(),
  message: z.string().nullable().optional(),
  data: z.array(RecipeListItemSchema).nullable().optional(),
  error: z.unknown().optional(),
});

export const RecipeDetailResponseSchema = z.object({
  httpCode: z.number(),
  httpMessage: z.string(),
  message: z.string().nullable().optional(),
  data: RecipeDetailSchema.nullable().optional(),
  error: z.unknown().optional(),
});

export type ValidatedRecipeRequest = z.infer<typeof RecipeRequestSchema>;
export type ValidatedRecipeListItem = z.infer<typeof RecipeListItemSchema>;
export type ValidatedRecipeDetail = z.infer<typeof RecipeDetailSchema>;
