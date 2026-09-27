import { router } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavBar } from "@/components/navigation/BottomNavBar";
import { CookingPreferencesCard } from "@/components/recipe/CookingPreferencesCard";
import { HeaderBar } from "@/components/recipe/HeaderBar";
import { HeroSection } from "@/components/recipe/HeroSection";
import { IngredientInputSection } from "@/components/recipe/IngredientInputSection";
import { SubmitSection } from "@/components/recipe/SubmitSection";
import { Spacing } from "@/constants/theme";
import { useRecipeStore } from "@/store/useRecipeStore";

export default function HomeScreen() {
  // Centralized in-memory state from Zustand (avoids URL bloating!)
  const {
    ingredients,
    addIngredient,
    removeIngredient,
    time,
    setTime,
    styleOption,
    setStyleOption,
    level,
    setLevel,
    quotaRemaining,
    quotaTotal,
  } = useRecipeStore();

  // Submit handler: validates input and cleanly navigates without bloated URL params
  const handleSubmit = () => {
    if (ingredients.length === 0) {
      Alert.alert(
        "Perhatian",
        "Masukkan minimal 1 bahan makanan untuk mencari resep.",
      );
      return;
    }

    // Clean navigation: state is safely stored in memory
    router.push("/results");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.screenWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Bar */}
            <HeaderBar
              quotaRemaining={quotaRemaining}
              quotaTotal={quotaTotal}
              onPressHistory={() => router.push("/history")}
              onPressProfile={() =>
                Alert.alert("Profil", "Membuka profil pengguna")
              }
            />

            {/* Hero Section */}
            <HeroSection />

            {/* Quota Banner */}
            {/* <QuotaCard remaining={quotaRemaining} total={quotaTotal} /> */}

            {/* Ingredient Input & Tag List with Empty State & Auto-Add on Comma */}
            <IngredientInputSection
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />

            {/* Cooking Preferences Card */}
            <CookingPreferencesCard
              time={time}
              onChangeTime={setTime}
              styleOption={styleOption}
              onChangeStyleOption={setStyleOption}
              level={level}
              onChangeLevel={setLevel}
            />

            {/* Primary Action Button */}
            <SubmitSection
              onPress={handleSubmit}
              disabled={ingredients.length === 0}
            />
          </ScrollView>

          {/* Bottom Navigation Bar */}
          <BottomNavBar activeTab="index" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
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
});
