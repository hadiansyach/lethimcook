import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { BottomNavBar } from '@/components/navigation/BottomNavBar';
import { RecommendationCard } from '@/components/recipe/RecommendationCard';
import { Card } from '@/components/ui/Card';
import { BrandColors, Spacing } from '@/constants/theme';
import { useRecipeStore } from '@/store/useRecipeStore';
import { RecipeListItem } from '@/types/recipe';

export default function SavedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    savedRecipes,
    toggleSaveRecipe,
    isRecipeSaved,
    setSelectedRecipe,
    setSelectedRecipeDetail,
  } = useRecipeStore();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

  const handleOpenDetail = (recipe: RecipeListItem) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeDetail(null);
    router.push('/recipe-detail');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resep Disimpan ({savedRecipes.length})</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={BrandColors.primary}
              colors={[BrandColors.primary]}
            />
          }>
          {savedRecipes.length === 0 ? (
            <Card variant="highlight" style={styles.emptyCard}>
              <Ionicons name="bookmark-outline" size={40} color="#94A3B8" />
              <Text style={styles.emptyTitle}>Belum Ada Resep Tersimpan</Text>
              <Text style={styles.emptySubtitle}>
                Simpan resep favoritmu dengan menekan ikon bookmark pada rekomendasi menu.
              </Text>
            </Card>
          ) : (
            <View style={styles.list}>
              {savedRecipes.map((recipe, index) => (
                <RecommendationCard
                  key={`${recipe.nama_menu}-${index}`}
                  recipe={recipe}
                  initialBookmarked={isRecipeSaved(recipe.nama_menu)}
                  onPressDetail={() => handleOpenDetail(recipe)}
                  onToggleBookmark={() => {
                    toggleSaveRecipe(recipe);
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>

        <BottomNavBar activeTab="saved" />
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
  header: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.four,
  },
  list: {
    gap: Spacing.four,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 260,
  },
});
