import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { BrandColors, Radius, Spacing } from '@/constants/theme';

export type BadgeVariant =
  | 'subtle-orange'
  | 'neutral'
  | 'subtle-blue'
  | 'charcoal'
  | 'subtle-green'
  | 'solid-green'
  | 'subtle-red';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  dotColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'neutral',
  icon,
  dotColor,
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      {dotColor && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, styles[`${variant}Text` as keyof typeof styles], textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.two * 1.2,
    paddingVertical: Spacing.one * 1.2,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  iconContainer: {
    marginRight: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Variants
  'subtle-orange': {
    backgroundColor: BrandColors.primaryLight,
    borderWidth: 1,
    borderColor: BrandColors.primaryLightBorder,
  },
  'subtle-orangeText': {
    color: '#9A3412',
    fontWeight: '600',
  },
  neutral: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  neutralText: {
    color: '#475569',
    fontWeight: '500',
  },
  'subtle-blue': {
    backgroundColor: BrandColors.tipsBg,
    borderWidth: 1,
    borderColor: BrandColors.tipsBorder,
  },
  'subtle-blueText': {
    color: '#1D4ED8',
    fontWeight: '500',
  },
  charcoal: {
    backgroundColor: BrandColors.charcoalActive,
  },
  charcoalText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  'subtle-green': {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  'subtle-greenText': {
    color: '#15803D',
    fontWeight: '600',
  },
  'solid-green': {
    backgroundColor: '#15803D',
  },
  'solid-greenText': {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  'subtle-red': {
    backgroundColor: '#FFEDD5',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  'subtle-redText': {
    color: '#C2410C',
    fontWeight: '600',
  },
});
