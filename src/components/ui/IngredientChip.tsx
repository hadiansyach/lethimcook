import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

interface IngredientChipProps {
  label: string;
  variant?: 'selected' | 'suggestion';
  onPress?: () => void;
  onRemove?: () => void;
  style?: ViewStyle;
}

export function IngredientChip({
  label,
  variant = 'selected',
  onPress,
  onRemove,
  style,
}: IngredientChipProps) {
  if (variant === 'suggestion') {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.chip, styles.suggestionChip, style]}>
        <Ionicons name="add" size={15} color={BrandColors.primary} />
        <Text style={styles.suggestionText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.chip, styles.selectedChip, style]}>
      <Text style={styles.selectedText}>{label}</Text>
      {onRemove && (
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={onRemove}
          style={styles.removeCircle}
          accessibilityRole="button"
          accessibilityLabel={`Hapus ${label}`}>
          <Ionicons name="close" size={12} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  selectedChip: {
    backgroundColor: '#0F172A',
    paddingVertical: 7,
    paddingHorizontal: 13,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  removeCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
  },
  suggestionChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: Spacing.two * 0.8,
    paddingHorizontal: Spacing.two * 1.4,
    gap: 5,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
});

