import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RecipeDetailHeader } from '@/components/recipe/detail/RecipeDetailHeader';
import { RecipeDetailSummaryGrid } from '@/components/recipe/detail/RecipeDetailSummaryGrid';
import { IngredientsTabView } from '@/components/recipe/detail/IngredientsTabView';
import { StepsTabView } from '@/components/recipe/detail/StepsTabView';
import { AccountSaveCard } from '@/components/recipe/detail/AccountSaveCard';
import { RecipeFeedbackCard } from '@/components/recipe/detail/RecipeFeedbackCard';
import { BrandColors, Radius, Spacing } from '@/constants/theme';
import { useRecipeStore } from '@/store/useRecipeStore';
import { RecipeDetailObject } from '@/types/recipe';

interface RecipeDetailModalProps {
  visible: boolean;
  onClose: () => void;
  recipe: RecipeDetailObject | null;
  loading?: boolean;
}

export function RecipeDetailModal({
  visible,
  onClose,
  recipe,
  loading = false,
}: RecipeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'bahan' | 'langkah'>('bahan');
  const { quotaRemaining, quotaTotal, isRecipeSaved, toggleSaveRecipe, selectedRecipe } =
    useRecipeStore();

  if (!visible) return null;

  const recipeName = recipe?.judul_resep || selectedRecipe?.nama_menu || 'Detail Resep';
  const isSaved = isRecipeSaved(recipeName);

  const handleToggleSave = () => {
    if (selectedRecipe) {
      const saved = toggleSaveRecipe(selectedRecipe);
      Alert.alert(
        saved ? 'Tersimpan' : 'Dihapus',
        saved
          ? `Resep "${recipeName}" disimpan ke favorit.`
          : `Resep "${recipeName}" dihapus dari favorit.`
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screenWrapper}>
          {/* Header */}
          <RecipeDetailHeader
            onBack={onClose}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
            onPressProfile={() => Alert.alert('Profil', 'Buka profil pengguna')}
          />

          {loading || !recipe ? (
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
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {selectedRecipe?.tag_masakan?.[0] || 'Tumisan Praktis'}
                  </Text>
                </View>

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
                <Text style={styles.recipeTitle}>{recipe.judul_resep}</Text>
                <Text style={styles.recipeSubtitle}>
                  {recipe.deskripsi_singkat}
                </Text>
              </View>

              {/* 5. 3-Card Summary Grid */}
              <RecipeDetailSummaryGrid
                waktu={recipe.ringkasan?.waktu || selectedRecipe?.waktu_memasak || '15 mnt'}
                porsi={recipe.ringkasan?.porsi || '2 Orang'}
                rasa={recipe.ringkasan?.rasa || selectedRecipe?.deskripsi_rasa || 'Gurih Pedas'}
              />

              {/* 6. Tabs */}
              <View style={styles.tabsContainer}>
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
                  bahanPokok={recipe.bahan_bahan?.bahan_pokok || []}
                  bumbuTambahan={recipe.bahan_bahan?.bumbu_tambahan || []}
                />
              ) : (
                <StepsTabView steps={recipe.langkah_tutorial || []} />
              )}

              {/* 8. Upsell Card */}
              <AccountSaveCard
                onPressLogin={() =>
                  Alert.alert('Simpan Akun', 'Membuka otentikasi Google')
                }
              />

              {/* 9. Feedback Card */}
              <RecipeFeedbackCard />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Modal>
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
