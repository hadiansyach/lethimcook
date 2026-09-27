import { router } from "expo-router";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavBar } from "@/components/navigation/BottomNavBar";
import { AccountUpsellCard } from "@/components/recipe/AccountUpsellCard";
import { HeaderBar } from "@/components/recipe/HeaderBar";
import { IngredientsSummaryBanner } from "@/components/recipe/IngredientsSummaryBanner";
import { RecommendationCard } from "@/components/recipe/RecommendationCard";
import { RecommendationListSkeleton } from "@/components/recipe/RecommendationCardSkeleton";
import { ShuffleStickyBar } from "@/components/recipe/ShuffleStickyBar";
import { Badge } from "@/components/ui/Badge";
import { BrandColors, Spacing } from "@/constants/theme";
import { useRecipeRecommendationsQuery } from "@/hooks/useRecipeQueries";
import { useRecipeStore } from "@/store/useRecipeStore";
import { RecipeListItem } from "@/types/recipe";

export default function ResultsScreen() {
  // 1. Read in-memory state from Zustand (No bloated URL parameters!)
  const {
    ingredients,
    quotaRemaining,
    decrementQuota,
    toggleSaveRecipe,
    isRecipeSaved,
    setSelectedRecipe,
    setSelectedRecipeDetail,
  } = useRecipeStore();

  // 2. Fetch recommendations using TanStack Query
  const { recipes, isLoading, isRefetching, refetch } =
    useRecipeRecommendationsQuery();

  // Pull-to-refresh handler using TanStack Query
  const onRefresh = async () => {
    decrementQuota();
    await refetch();
  };

  // Shuffle / Acak Menu handler
  const handleShuffle = async () => {
    decrementQuota();
    await refetch();
  };

  // Open recipe detail screen
  const handleOpenDetail = (recipe: RecipeListItem) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeDetail(null);
    router.push('/recipe-detail');
  };

  const isDataLoading = isLoading || isRefetching;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenWrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={onRefresh}
              tintColor={BrandColors.primary}
              colors={[BrandColors.primary]}
            />
          }
        >
          {/* Top Header Bar */}
          <HeaderBar
            quotaRemaining={quotaRemaining}
            quotaTotal={5}
            onPressHistory={() => router.push("/history")}
            onPressProfile={() => Alert.alert("Profil", "Buka profil pengguna")}
          />

          {/* Ingredients Summary Banner */}
          <IngredientsSummaryBanner
            ingredients={ingredients}
            onPressEdit={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
          />

          {/* Section Heading - Dynamic based on fetch state and actual count */}
          <View style={styles.sectionHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}>
                {isDataLoading
                  ? "Mencari Rekomendasi Menu..."
                  : `${recipes.length} Rekomendasi Menu`}
              </Text>
              <Badge
                variant={isDataLoading ? "neutral" : "subtle-green"}
                style={styles.readyBadge}
              >
                {isDataLoading ? "AI Bekerja" : "Siap Masak"}
              </Badge>
            </View>
            <Text style={styles.sectionSubtitle}>
              {isDataLoading
                ? "Lagi nyari ide masakan nih, tunggu yaa..."
                : "Nih rekomendasi menu dari bahan-bahan yang kamu punya"}
            </Text>
          </View>

          {/* Skeleton Shimmer Loading or Actual Recipe Cards */}
          {isDataLoading ? (
            <RecommendationListSkeleton count={3} />
          ) : (
            recipes.map((item, index) => (
              <RecommendationCard
                key={`${item.nama_menu}-${index}`}
                recipe={item}
                isPrimaryCta={index === 0}
                initialBookmarked={isRecipeSaved(item.nama_menu)}
                onPressDetail={() => handleOpenDetail(item)}
                onToggleBookmark={() => {
                  const saved = toggleSaveRecipe(item);
                  Alert.alert(
                    saved ? "Tersimpan" : "Dihapus",
                    saved
                      ? `Resep "${item.nama_menu}" disimpan ke favorit.`
                      : `Resep "${item.nama_menu}" dihapus dari favorit.`,
                  );
                }}
              />
            ))
          )}

          {/* Acak Menu Sticky / Inline Card */}
          <ShuffleStickyBar
            remainingQuota={quotaRemaining}
            onPressShuffle={handleShuffle}
            loading={isDataLoading}
          />

          {/* Account Upsell / Bookmark Banner */}
          <AccountUpsellCard
            onPressLogin={() =>
              Alert.alert("Masuk Akun", "Membuka formulir login / pendaftaran")
            }
          />
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomNavBar activeTab="index" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  screenWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  sectionHeader: {
    gap: 4,
    marginTop: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.4,
  },
  readyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
  },
});
