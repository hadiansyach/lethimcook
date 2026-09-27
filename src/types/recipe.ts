/**
 * Type definitions matching docs/API.md and docs/PRODUCT.md
 */

export type CookingTimeOption = 'semua' | 'kilat' | 'santai';
export type CookingStyleOption = 'all' | 'tumisan' | 'berkuah' | 'garing';
export type SpiceLevelOption = 'bebas' | 'tidak pedas' | 'pedas nampol';

export interface RecipeRequest {
  ingredients: string[];
  time: CookingTimeOption;
  style: CookingStyleOption;
  level: SpiceLevelOption;
}

export interface RecipeListItem {
  kecocokan_bahan: string;
  nama_menu: string;
  waktu_memasak: string;
  tingkat_kesulitan: string;
  tingkat_pedas: string;
  tag_masakan: string[];
  deskripsi_rasa: string;
  bahan_terpakai: string[];
  tambahan_bumbu_dasar: string[] | null;
}

export interface IngredientItem {
  takaran: string;
  nama_bahan: string;
  keterangan: string;
}

export interface CookingStep {
  nomor: number;
  judul_langkah: string;
  instruksi: string;
  timer_detik: number | null;
}

export interface RecipeDetailObject {
  tag_info: string[];
  judul_resep: string;
  deskripsi_singkat: string;
  ringkasan: {
    waktu: string;
    porsi: string;
    rasa: string;
  };
  bahan_bahan: {
    bahan_pokok: IngredientItem[];
    bumbu_tambahan: IngredientItem[];
  };
  langkah_tutorial: CookingStep[];
}

export interface ApiResponse<T> {
  httpCode: number;
  httpMessage: string;
  message: string | null;
  data: T | null;
  error: unknown;
}
