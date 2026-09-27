import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

export interface SegmentOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  label?: string;
  options: SegmentOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  style?: ViewStyle;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  selectedValue,
  onSelect,
  style,
}: SegmentedControlProps<T>) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.track}>
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.8}
              onPress={() => onSelect(option.value)}
              style={[
                styles.segment,
                isSelected ? styles.segmentSelected : styles.segmentUnselected,
              ]}>
              <Text
                style={[
                  styles.segmentText,
                  isSelected ? styles.segmentTextSelected : styles.segmentTextUnselected,
                ]}
                numberOfLines={1}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one * 1.5,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  track: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: Radius.md,
    padding: 3,
    alignItems: 'center',
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.two * 1.1,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentSelected: {
    backgroundColor: BrandColors.charcoalActive,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentUnselected: {
    backgroundColor: 'transparent',
  },
  segmentText: {
    fontSize: 13,
    textAlign: 'center',
  },
  segmentTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  segmentTextUnselected: {
    color: '#1E293B',
    fontWeight: '500',
  },
});
