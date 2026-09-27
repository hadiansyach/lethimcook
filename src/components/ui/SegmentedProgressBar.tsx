import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BrandColors, Radius } from '@/constants/theme';

interface SegmentedProgressBarProps {
  total: number;
  activeCount: number;
  style?: ViewStyle;
}

export function SegmentedProgressBar({
  total = 5,
  activeCount = 3,
  style,
}: SegmentedProgressBarProps) {
  const segments = Array.from({ length: total }, (_, i) => i < activeCount);

  return (
    <View style={[styles.container, style]}>
      {segments.map((isActive, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            isActive ? styles.segmentActive : styles.segmentInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    height: 6,
    width: '100%',
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: Radius.full,
  },
  segmentActive: {
    backgroundColor: BrandColors.primary,
  },
  segmentInactive: {
    backgroundColor: '#E2E8F0',
  },
});
