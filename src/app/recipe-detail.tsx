import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { getRecipeDetail } from '@/api/recipeService';
import { RecipeDetailHeader } from '@/components/recipe/detail/RecipeDetailHeader';
import { RecipeDetailSummaryGrid } from '@/components/recipe/detail/RecipeDetailSummaryGrid';
import { IngredientsTabView } from '@/components/recipe/detail/IngredientsTabView';
import { StepsTabView } from '@/components/recipe/detail/StepsTabView';
import { AccountSaveCard } from '@/components/recipe/detail/AccountSaveCard';
import { RecipeFeedbackCard } from '@/components/recipe/detail/RecipeFeedbackCard';
import { BrandColors, Radius, Spacing } from '@/constants/theme';
import { useRecipeStore } from '@/store/useRecipeStore';
import { RecipeDetailObject } from '@/types/recipe';

// Fallback preview data matching user's design reference exactly
const FALLBACK_RECIPE_DETAIL: RecipeDetailObject = {
  tag_info: ['Tumisan Praktis', 'Tingkat: Sangat Mudah', '4/4 bahan cocok'],
  judul_resep: 'Tahu Telur Bumbu Kecap Pedas Gurih',
  deskripsi_singkat:
    'Kreasi kilat santapan rumahan bertekstur lembut dengan sentuhan bumbu manis karamel dan sengatan rawit segar.',
  ringkasan: {
    waktu: '15 mnt',
    porsi: '2 Orang',
    rasa: 'Gurih Pedas',
  },
  bahan_bahan: {
    bahan_pokok: [
      {
        takaran: '4 buah',
        nama_bahan: 'Tahu putih',
        keterangan: 'Potong dadu ukuran 2 cm',
      },
      {
        takaran: '2 butir',
        nama_bahan: 'Telur ayam',
        keterangan: 'Kocok lepas dengan sejumput garam halus',
      },
      {
        takaran: '3 siung',
        nama_bahan: 'Bawang putih',
        keterangan: 'Cincang halus untuk aroma optimal',
      },
      {
        takaran: '5 buah',
        nama_bahan: 'Cabai rawit merah',
        keterangan: 'Iris serong tipis',
      },
      {
        takaran: '3 sdm',
        nama_bahan: 'Kecap manis kental',
        keterangan: 'Kualitas pekat manis alami',
      },
    ],
    bumbu_tambahan: [
      {
        takaran: '1 sdm',
        nama_bahan: 'Saus tiram',
        keterangan: 'Menambah kedalaman gurih umami',
      },
      {
        takaran: '1/2 sdt',
        nama_bahan: 'Garam & merica',
        keterangan: 'Sesuaikan selera lidah',
      },
      {
        takaran: '2 sdm',
        nama_bahan: 'Minyak goreng',
        keterangan: 'Untuk menumis dan mendadar telur',
      },
    ],
  },
  langkah_tutorial: [
    {
      nomor: 1,
      judul_langkah: 'Goreng Tahu',
      instruksi:
        'Panaskan minyak, goreng potongan tahu putih hingga berkulit keemasan tapi bagian dalam tetap lembut. Angkat dan tiriskan.',
      timer_detik: 180,
    },
    {
      nomor: 2,
      judul_langkah: 'Dadar Orak-Arik Telur',
      instruksi:
        'Kocok telur bersama garam halus. Tuang ke wajan, orak-arik hingga matang merata lalu sisihkan bersama tahu.',
      timer_detik: 120,
    },
    {
      nomor: 3,
      judul_langkah: 'Tumis Bumbu Iris',
      instruksi:
        'Tumis cincangan bawang putih dan irisan cabai rawit dengan sedikit minyak hingga beraroma harum dan layu.',
      timer_detik: 90,
    },
    {
      nomor: 4,
      judul_langkah: 'Racik Saus Kecap',
      instruksi:
        'Tambahkan kecap manis kental, saus tiram, merica, dan sedikit air. Masak hingga mendidih dan saus mulai mengental.',
      timer_detik: 60,
    },
    {
      nomor: 5,
      judul_langkah: 'Penyatuan & Finishing',
      instruksi:
        'Masukkan tahu dan telur orak-arik ke dalam saus. Aduk cepat dengan api sedang hingga bumbu meresap sempurna. Sajikan hangat.',
      timer_detik: 120,
    },
  ],
};

export default function RecipeDetailScreen() {
  const {
    selectedRecipe,
    selectedRecipeDetail,
    setSelectedRecipeDetail,
    isRecipeSaved,
    toggleSaveRecipe,
    quotaRemaining,
    quotaTotal,
  } = useRecipeStore();

  const [activeTab, setActiveTab] = useState<'bahan' | 'langkah'>('bahan');
  const [loading, setLoading] = useState(false);

  // Active detail data
  const currentDetail = selectedRecipeDetail || (selectedRecipe ? null : FALLBACK_RECIPE_DETAIL);
  const recipeName = currentDetail?.judul_resep || selectedRecipe?.nama_menu || 'Detail Resep';
  const isSaved = isRecipeSaved(recipeName);

  // Load detail if not yet in store
  useEffect(() => {
    if (selectedRecipe && !selectedRecipeDetail) {
      let isMounted = true;
      setLoading(true);

      getRecipeDetail(selectedRecipe)
        .then((detail) => {
          if (isMounted) {
            setSelectedRecipeDetail(detail);
          }
        })
        .catch(() => {
          // If live fetch fails, retry with fallback test mock
          getRecipeDetail(selectedRecipe, true)
            .then((mockDetail) => {
              if (isMounted) {
                setSelectedRecipeDetail(mockDetail);
              }
            })
            .catch(() => {
              if (isMounted) {
                setSelectedRecipeDetail(FALLBACK_RECIPE_DETAIL);
              }
            });
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [selectedRecipe, selectedRecipeDetail, setSelectedRecipeDetail]);

  const handleToggleSave = () => {
    if (selectedRecipe) {
      const saved = toggleSaveRecipe(selectedRecipe);
      Alert.alert(
        saved ? 'Tersimpan' : 'Dihapus',
        saved
          ? `Resep "${recipeName}" disimpan ke favorit.`
          : `Resep "${recipeName}" dihapus dari favorit.`
      );
    } else {
      Alert.alert('Tersimpan', `Resep "${recipeName}" disimpan ke favorit.`);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/results');
    }
  };

  const detailToRender = currentDetail || FALLBACK_RECIPE_DETAIL;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenWrapper}>
        {/* Top Header Bar */}
        <RecipeDetailHeader
          onBack={handleBack}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onPressProfile={() => Alert.alert('Profil', 'Buka profil pengguna')}
        />

        {loading && !currentDetail ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={BrandColors.primary} />
            <Text style={styles.loadingText}>Menyiapkan detail resep lezat...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            {/* 1. Sisa Kuota Banner */}
            <View style={styles.quotaBanner}>
              <View style={styles.quotaLeft}>
                <View style={styles.greenDot} />
                <Text style={styles.quotaText}>
                  Gratis {quotaRemaining}/{quotaTotal} coba hari ini
                </Text>
              </View>
              {/* Segmented Progress Bar */}
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${Math.min(
                        100,
                        Math.max(
                          10,
                          (Math.max(0, quotaRemaining) / (quotaTotal || 5)) * 100
                        )
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>

            {/* 2. Category & Difficulty Badges Row */}
            <View style={styles.badgesRow}>
              {/* Category Pill */}
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>
                  {selectedRecipe?.tag_masakan?.[0] || 'Tumisan Praktis'}
                </Text>
              </View>

              {/* Difficulty Pill */}
              <View style={styles.difficultyBadge}>
                <Text style={styles.leafIcon}>🌱</Text>
                <Text style={styles.difficultyBadgeText}>
                  Tingkat: {selectedRecipe?.tingkat_kesulitan || 'Sangat Mudah'}
                </Text>
              </View>
            </View>

            {/* 3. Match Badge */}
            <View style={styles.matchBadgeWrap}>
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>
                  {selectedRecipe?.kecocokan_bahan || '4/4 bahan cocok'}
                </Text>
              </View>
            </View>

            {/* 4. Recipe Title & Short Description */}
            <View style={styles.titleSection}>
              <Text style={styles.recipeTitle}>{detailToRender.judul_resep}</Text>
              <Text style={styles.recipeSubtitle}>
                {detailToRender.deskripsi_singkat}
              </Text>
            </View>

            {/* 5. 3-Card Summary Grid (WAKTU, PORSI, RASA) */}
            <RecipeDetailSummaryGrid
              waktu={detailToRender.ringkasan?.waktu || selectedRecipe?.waktu_memasak || '15 mnt'}
              porsi={detailToRender.ringkasan?.porsi || '2 Orang'}
              rasa={detailToRender.ringkasan?.rasa || selectedRecipe?.deskripsi_rasa || 'Gurih Pedas'}
            />

            {/* 6. Tabs (Bahan-Bahan vs Langkah Tutorial) */}
            <View style={styles.tabsContainer}>
              {/* Tab 1: Bahan-Bahan */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('bahan')}
                style={[
                  styles.tabButton,
                  activeTab === 'bahan' && styles.tabButtonActive,
                ]}>
                <Ionicons
                  name="restaurant-outline"
                  size={16}
                  color={activeTab === 'bahan' ? BrandColors.primary : '#64748B'}
                />
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === 'bahan' && styles.tabButtonTextActive,
                  ]}>
                  Bahan-Bahan
                </Text>
              </TouchableOpacity>

              {/* Tab 2: Langkah Tutorial */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('langkah')}
                style={[
                  styles.tabButton,
                  activeTab === 'langkah' && styles.tabButtonActive,
                ]}>
                <Ionicons
                  name="list-outline"
                  size={16}
                  color={activeTab === 'langkah' ? BrandColors.primary : '#64748B'}
                />
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === 'langkah' && styles.tabButtonTextActive,
                  ]}>
                  Langkah Tutorial
                </Text>
              </TouchableOpacity>
            </View>

            {/* 7. Active Tab Content */}
            {activeTab === 'bahan' ? (
              <IngredientsTabView
                bahanPokok={detailToRender.bahan_bahan?.bahan_pokok || []}
                bumbuTambahan={detailToRender.bahan_bahan?.bumbu_tambahan || []}
              />
            ) : (
              <StepsTabView steps={detailToRender.langkah_tutorial || []} />
            )}

            {/* 8. Simpan resep ke akunmu Upsell Card */}
            <AccountSaveCard
              onPressLogin={() =>
                Alert.alert('Simpan Akun', 'Membuka otentikasi Google')
              }
            />

            {/* 9. Feedback Card ("Bagaimana hasil resep ini?") */}
            <RecipeFeedbackCard />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.six,
    gap: Spacing.three,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  quotaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: Radius.full,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  quotaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#16A34A',
  },
  quotaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  progressBarTrack: {
    width: 90,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: BrandColors.primary,
    borderRadius: 3,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  leafIcon: {
    fontSize: 12,
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  matchBadgeWrap: {
    flexDirection: 'row',
  },
  matchBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  matchBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
  },
  titleSection: {
    gap: 6,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  recipeSubtitle: {
    fontSize: 13.5,
    color: '#64748B',
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: Radius.lg,
    padding: 4,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: Radius.md,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabButtonTextActive: {
    fontWeight: '800',
    color: BrandColors.primary,
  },
});
