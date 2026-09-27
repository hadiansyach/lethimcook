import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

interface IngredientsSummaryBannerProps {
  ingredients: string[];
  onPressEdit: () => void;
}

export function IngredientsSummaryBanner({
  ingredients,
  onPressEdit,
}: IngredientsSummaryBannerProps) {
  const displayIngredients =
    ingredients.length > 0
      ? ingredients.join(', ')
      : 'Belum ada bahan dipilih';

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name="restaurant-outline" size={18} color={BrandColors.primary} />
      </View>

      {/* Text Info */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>Bahan kamu:</Text>
        <Text style={styles.ingredientsList} numberOfLines={1}>
          {displayIngredients}
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressEdit}
        style={styles.editButton}>
        <Ionicons name="pencil" size={13} color="#475569" />
        <Text style={styles.editText}>Ubah</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two * 1.3,
    gap: 10,
    width: '100%',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: Radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  ingredientsList: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.two * 1.2,
    paddingVertical: Spacing.one * 1.2,
    gap: 4,
  },
  editText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
});
