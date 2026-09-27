import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

interface RecipeDetailHeaderProps {
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onPressProfile?: () => void;
}

export function RecipeDetailHeader({
  onBack,
  isSaved,
  onToggleSave,
  onPressProfile,
}: RecipeDetailHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Left: Back Button & Title */}
      <View style={styles.leftRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Kembali">
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Detail Resep</Text>
      </View>

      {/* Right: Bookmark & User Avatar */}
      <View style={styles.rightRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleSave}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Hapus dari simpanan' : 'Simpan resep'}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isSaved ? BrandColors.primary : '#475569'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressProfile}
          style={styles.avatarButton}
          accessibilityRole="button"
          accessibilityLabel="Profil pengguna">
          <Ionicons name="person" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconButton: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
