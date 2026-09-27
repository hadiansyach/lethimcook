import { Badge } from "@/components/ui/Badge";
import { IngredientChip } from "@/components/ui/IngredientChip";
import { BrandColors, Radius, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface IngredientInputSectionProps {
  ingredients: string[];
  onAddIngredient: (name: string) => void;
  onRemoveIngredient: (index: number) => void;
  quickSuggestions?: string[];
}

const DEFAULT_QUICK_SUGGESTIONS = [
  "Daun bawang",
  "Tomat",
  "Mentega",
  "Saus tiram",
  "Wortel",
  "Nasi dingin",
];

export function IngredientInputSection({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  quickSuggestions = DEFAULT_QUICK_SUGGESTIONS,
}: IngredientInputSectionProps) {
  const [inputText, setInputText] = useState("");

  // Auto-detect comma separator (,) to instantly add ingredient
  const handleTextChange = (text: string) => {
    if (text.includes(",")) {
      const parts = text.split(",");
      // All parts before the last comma are completed ingredients
      const toAdd = parts.slice(0, -1);
      const remainder = parts[parts.length - 1];

      toAdd.forEach((item) => {
        const trimmed = item.trim();
        if (trimmed) {
          onAddIngredient(trimmed);
        }
      });

      // Keep whatever text remains after the last comma
      setInputText(remainder);
    } else {
      setInputText(text);
    }
  };

  // Submit on Enter key or '+' button
  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (trimmed) {
      const items = trimmed
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      items.forEach((item) => onAddIngredient(item));
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Bahan di Dapurmu</Text>
        <Badge variant={ingredients.length > 0 ? "charcoal" : "neutral"}>
          {ingredients.length} bahan dipilih
        </Badge>
      </View>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#94A3B8"
          style={styles.searchIcon}
        />
        <TextInput
          value={inputText}
          onChangeText={handleTextChange}
          onSubmitEditing={handleAdd}
          placeholder="Ketik bahan lalu ketik koma (contoh: telur, tempe,)"
          placeholderTextColor="#94A3B8"
          returnKeyType="done"
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleAdd}
          disabled={!inputText.trim()}
          style={[
            styles.addButton,
            !inputText.trim() && styles.addButtonDisabled,
          ]}
        >
          <Ionicons name="add" size={20} color="#334155" />
        </TouchableOpacity>
      </View>

      {/* Selected Chips or Empty State */}
      {ingredients.length > 0 ? (
        <View style={styles.chipsWrap}>
          {ingredients.map((ingredient, index) => (
            <IngredientChip
              key={`${ingredient}-${index}`}
              label={ingredient}
              variant="selected"
              onRemove={() => onRemoveIngredient(index)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="basket-outline" size={20} color="#94A3B8" />
          </View>
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyTitle}>Belum ada bahan yang dipilih</Text>
            <Text style={styles.emptySubtitle}>
              Ketik nama bahan lalu beri koma (,) untuk menambahkan otomatis,
              atau pilih dari saran cepat di bawah.
            </Text>
          </View>
        </View>
      )}

      {/* Quick Add Section */}
      <View style={styles.quickAddSection}>
        <View style={styles.quickAddHeader}>
          <Ionicons
            name="bulb-outline"
            size={15}
            color={BrandColors.accentOrange}
          />
          <Text style={styles.quickAddTitle}>Tambah Bahan Cepat:</Text>
        </View>

        <View style={styles.chipsWrap}>
          {quickSuggestions.map((suggestion) => (
            <IngredientChip
              key={suggestion}
              label={suggestion}
              variant="suggestion"
              onPress={() => onAddIngredient(suggestion)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.two * 1.5,
    height: 48,
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
    paddingVertical: 0,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.md - 2,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  emptyStateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  emptyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTextContainer: {
    flex: 1,
    gap: 2,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  emptySubtitle: {
    fontSize: 11,
    color: "#94A3B8",
    lineHeight: 16,
  },
  quickAddSection: {
    gap: Spacing.two,
    marginTop: 2,
  },
  quickAddHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quickAddTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
});
