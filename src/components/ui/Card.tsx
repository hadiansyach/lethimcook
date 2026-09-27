import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { Radius, Spacing } from '@/constants/theme';

export type CardVariant = 'default' | 'highlight' | 'info' | 'preference';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  style?: ViewStyle;
  children: React.ReactNode;
}

export function Card({ variant = 'default', style, children, ...props }: CardProps) {
  return (
    <View style={[styles.card, styles[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  default: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  highlight: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  info: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  preference: {
    backgroundColor: '#F1F5F9',
    borderRadius: Radius.lg + 2,
    padding: Spacing.three * 1.1,
  },
});
