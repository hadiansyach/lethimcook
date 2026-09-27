import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { SegmentedControl, SegmentOption } from '@/components/ui/SegmentedControl';
import { Spacing } from '@/constants/theme';
import { CookingStyleOption, CookingTimeOption, SpiceLevelOption } from '@/types/recipe';

interface CookingPreferencesCardProps {
  time: CookingTimeOption;
  onChangeTime: (time: CookingTimeOption) => void;
  styleOption: CookingStyleOption;
  onChangeStyleOption: (style: CookingStyleOption) => void;
  level: SpiceLevelOption;
  onChangeLevel: (level: SpiceLevelOption) => void;
}

const TIME_OPTIONS: SegmentOption<CookingTimeOption>[] = [
  { label: 'Semua', value: 'semua' },
  { label: 'Kilat (<15m)', value: 'kilat' },
  { label: 'Santai (<30m)', value: 'santai' },
];

const STYLE_OPTIONS: SegmentOption<CookingStyleOption>[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Tumisan', value: 'tumisan' },
  { label: 'Berkuah', value: 'berkuah' },
  { label: 'Garing', value: 'garing' },
];

const LEVEL_OPTIONS: SegmentOption<SpiceLevelOption>[] = [
  { label: 'Bebas', value: 'bebas' },
  { label: 'Tidak pedas', value: 'tidak pedas' },
  { label: 'Pedas nampol', value: 'pedas nampol' },
];

export function CookingPreferencesCard({
  time,
  onChangeTime,
  styleOption,
  onChangeStyleOption,
  level,
  onChangeLevel,
}: CookingPreferencesCardProps) {
  return (
    <Card variant="preference" style={styles.card}>
      {/* Title */}
      <View style={styles.titleRow}>
        <Ionicons name="options-outline" size={19} color="#1E293B" />
        <Text style={styles.cardTitle}>Preferensi Memasak</Text>
      </View>

      {/* Estimasi Waktu */}
      <SegmentedControl
        label="Estimasi Waktu"
        options={TIME_OPTIONS}
        selectedValue={time}
        onSelect={onChangeTime}
      />

      {/* Gaya Masakan */}
      <SegmentedControl
        label="Gaya Masakan"
        options={STYLE_OPTIONS}
        selectedValue={styleOption}
        onSelect={onChangeStyleOption}
      />

      {/* Tingkat Pedas */}
      <SegmentedControl
        label="Tingkat Pedas"
        options={LEVEL_OPTIONS}
        selectedValue={level}
        onSelect={onChangeLevel}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
    backgroundColor: '#F1F5F9',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
});
