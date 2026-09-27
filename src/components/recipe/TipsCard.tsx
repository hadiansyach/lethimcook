import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { BrandColors, Spacing } from '@/constants/theme';

interface TipsCardProps {
  text?: string;
}

export function TipsCard({
  text = 'Masukkan minimal 2 bahan pokok agar kombinasi resep lebih lezat dan bervariasi.',
}: TipsCardProps) {
  return (
    <Card variant="info" style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="bulb" size={17} color={BrandColors.primary} />
      </View>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Tips praktis: </Text>
        {text}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    padding: Spacing.three,
  },
  iconContainer: {
    marginTop: 1,
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  boldText: {
    fontWeight: '700',
    color: '#0F172A',
  },
});
