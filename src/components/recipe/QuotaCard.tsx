import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { SegmentedProgressBar } from '@/components/ui/SegmentedProgressBar';
import { BrandColors, Spacing } from '@/constants/theme';

interface QuotaCardProps {
  remaining?: number;
  total?: number;
}

export function QuotaCard({ remaining = 0, total = 5 }: QuotaCardProps) {
  return (
    <Card variant="highlight" style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Ionicons name="flash" size={17} color={BrandColors.primary} />
          <Text style={styles.title}>Coba Gratis Hari Ini</Text>
        </View>
        <Text style={styles.counterText}>
          {remaining} dari {total}x tersisa
        </Text>
      </View>

      {/* Segmented Progress Bar */}
      <SegmentedProgressBar total={total} activeCount={remaining} style={styles.progressBar} />

      {/* Helper text */}
      <Text style={styles.helperText}>
        Bebas pakai tanpa perlu mendaftar atau login akun.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    gap: Spacing.two * 1.2,
    backgroundColor: '#FAFAFA',
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  counterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  progressBar: {
    marginVertical: 2,
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
  },
});
