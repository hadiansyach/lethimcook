import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

interface AccountUpsellCardProps {
  onPressLogin?: () => void;
}

export function AccountUpsellCard({ onPressLogin }: AccountUpsellCardProps) {
  return (
    <Card variant="info" style={styles.card}>
      {/* Icon Circle */}
      <View style={styles.iconCircle}>
        <Ionicons name="bookmark" size={20} color={BrandColors.primary} />
      </View>

      {/* Headline */}
      <Text style={styles.title}>Suka menu rekomendasi ini?</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Masuk untuk simpan resep favorit tanpa batas dan buat daftar belanja mingguan.
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressLogin}
        style={styles.loginButton}>
        <Ionicons name="person-outline" size={16} color="#0F172A" />
        <Text style={styles.loginButtonText}>Lanjut dengan Akun</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F7FF',
    borderColor: '#DBEAFE',
    alignItems: 'center',
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two * 1.2,
    borderRadius: Radius.lg + 2,
    width: '100%',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 290,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E8F0',
    borderRadius: Radius.md,
    paddingVertical: Spacing.two * 1.3,
    paddingHorizontal: Spacing.four,
    gap: 8,
    marginTop: 4,
    width: '100%',
    maxWidth: 240,
  },
  loginButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});
