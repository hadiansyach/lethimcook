import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';

interface AccountSaveCardProps {
  onPressLogin?: () => void;
}

export function AccountSaveCard({ onPressLogin }: AccountSaveCardProps) {
  return (
    <View style={styles.card}>
      {/* Title with bookmark icon */}
      <View style={styles.titleRow}>
        <Ionicons name="bookmark-outline" size={18} color="#C2410C" />
        <Text style={styles.title}>Simpan resep ini ke akunmu?</Text>
      </View>

      {/* Description */}
      <Text style={styles.subtitle}>
        Masuk tanpa ribet untuk mengakses koleksi resep favoritmu di semua perangkat kapan saja.
      </Text>

      {/* Google Login Action Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPressLogin}
        style={styles.googleButton}>
        <Ionicons name="person-circle-outline" size={18} color="#EA4335" />
        <Text style={styles.googleButtonText}>Lanjut Simpan dengan Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: Radius.lg + 2,
    padding: Spacing.four,
    gap: 10,
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: Radius.lg,
    paddingVertical: 12,
    paddingHorizontal: Spacing.four,
    gap: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
});
