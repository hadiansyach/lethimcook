import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Radius, Spacing } from '@/constants/theme';
import { IngredientItem } from '@/types/recipe';

interface IngredientsTabViewProps {
  bahanPokok: IngredientItem[];
  bumbuTambahan: IngredientItem[];
}

export function IngredientsTabView({
  bahanPokok,
  bumbuTambahan,
}: IngredientsTabViewProps) {
  // Checkbox toggle states for interactive recipe checklist
  const [checkedPokok, setCheckedPokok] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    bahanPokok.forEach((_, idx) => {
      init[idx] = true; // default checked as shown in screenshot
    });
    return init;
  });

  const [checkedTambahan, setCheckedTambahan] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    bumbuTambahan.forEach((_, idx) => {
      init[idx] = true; // default checked as shown in screenshot
    });
    return init;
  });

  const togglePokok = (index: number) => {
    setCheckedPokok((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleTambahan = (index: number) => {
    setCheckedTambahan((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <View style={styles.container}>
      {/* 1. Bahan Pokok Card */}
      {bahanPokok && bahanPokok.length > 0 && (
        <View style={styles.card}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <View style={[styles.dot, { backgroundColor: '#16A34A' }]} />
              <Text style={styles.cardTitle}>Bahan Pokok</Text>
            </View>
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeGreenText}>Tersedia di Dapur</Text>
            </View>
          </View>

          {/* List Items */}
          <View style={styles.itemsList}>
            {bahanPokok.map((item, index) => {
              const isChecked = checkedPokok[index] ?? true;
              return (
                <TouchableOpacity
                  key={`pokok-${index}`}
                  activeOpacity={0.7}
                  onPress={() => togglePokok(index)}
                  style={styles.itemRow}>
                  {/* Square Terracotta Checkbox */}
                  <View
                    style={[
                      styles.checkbox,
                      isChecked ? styles.checkboxChecked : styles.checkboxUnchecked,
                    ]}>
                    {isChecked && (
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    )}
                  </View>

                  {/* Text Details */}
                  <View style={styles.itemTextContainer}>
                    <Text
                      style={[
                        styles.itemTitle,
                        !isChecked && styles.itemTitleUnchecked,
                      ]}>
                      {item.takaran ? `${item.takaran} ` : ''}
                      {item.nama_bahan}
                    </Text>
                    {item.keterangan ? (
                      <Text style={styles.itemSubtitle}>{item.keterangan}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* 2. Bumbu Tambahan Card */}
      {bumbuTambahan && bumbuTambahan.length > 0 && (
        <View style={styles.card}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <View style={[styles.dot, { backgroundColor: '#9A3412' }]} />
              <Text style={styles.cardTitle}>Bumbu Tambahan</Text>
            </View>
            <View style={styles.badgeNeutral}>
              <Text style={styles.badgeNeutralText}>Opsional</Text>
            </View>
          </View>

          {/* List Items */}
          <View style={styles.itemsList}>
            {bumbuTambahan.map((item, index) => {
              const isChecked = checkedTambahan[index] ?? true;
              return (
                <TouchableOpacity
                  key={`tambahan-${index}`}
                  activeOpacity={0.7}
                  onPress={() => toggleTambahan(index)}
                  style={styles.itemRow}>
                  {/* Square Terracotta Checkbox */}
                  <View
                    style={[
                      styles.checkbox,
                      isChecked ? styles.checkboxChecked : styles.checkboxUnchecked,
                    ]}>
                    {isChecked && (
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    )}
                  </View>

                  {/* Text Details */}
                  <View style={styles.itemTextContainer}>
                    <Text
                      style={[
                        styles.itemTitle,
                        !isChecked && styles.itemTitleUnchecked,
                      ]}>
                      {item.takaran ? `${item.takaran} ` : ''}
                      {item.nama_bahan}
                    </Text>
                    {item.keterangan ? (
                      <Text style={styles.itemSubtitle}>{item.keterangan}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.four,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: Radius.lg + 2,
    padding: Spacing.four,
    gap: Spacing.three * 1.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  badgeGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  badgeGreenText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  badgeNeutral: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  badgeNeutralText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  itemsList: {
    gap: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: BrandColors.primary,
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  checkboxUnchecked: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  itemTextContainer: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  itemTitleUnchecked: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
});
