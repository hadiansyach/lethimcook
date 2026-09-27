import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

interface ShuffleStickyBarProps {
  remainingQuota?: number;
  onPressShuffle: () => void;
  loading?: boolean;
}

export function ShuffleStickyBar({
  remainingQuota = 0,
  onPressShuffle,
  loading = false,
}: ShuffleStickyBarProps) {
  return (
    <View style={styles.container}>
      {/* Left text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Kurang cocok dengan menu?</Text>
        <Text style={styles.subtitle}>
          Acak menu baru (Sisa {remainingQuota} coba)
        </Text>
      </View>

      {/* Right button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPressShuffle}
        disabled={loading}
        style={[
          styles.shuffleButton,
          loading && styles.shuffleButtonDisabled,
        ]}>
        <Ionicons name="dice-outline" size={18} color="#FFFFFF" />
        <Text style={styles.shuffleButtonText}>
          {loading ? 'Mengacak...' : 'Acak Menu'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E2530',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.three * 1.1,
    paddingVertical: Spacing.three,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 11,
    color: '#94A3B8',
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two * 1.1,
    paddingHorizontal: Spacing.three,
    gap: 6,
  },
  shuffleButtonDisabled: {
    opacity: 0.5,
  },
  shuffleButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
