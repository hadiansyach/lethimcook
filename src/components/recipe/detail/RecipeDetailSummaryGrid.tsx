import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radius, Spacing } from '@/constants/theme';

interface RecipeDetailSummaryGridProps {
  waktu?: string;
  porsi?: string;
  rasa?: string;
}

export function RecipeDetailSummaryGrid({
  waktu = '15 mnt',
  porsi = '2 Orang',
  rasa = 'Gurih Pedas',
}: RecipeDetailSummaryGridProps) {
  return (
    <View style={styles.container}>
      {/* 1. WAKTU */}
      <View style={styles.card}>
        <Ionicons name="time-outline" size={18} color="#C2410C" />
        <Text style={styles.label}>WAKTU</Text>
        <Text style={styles.value} numberOfLines={1}>
          {waktu}
        </Text>
      </View>

      {/* 2. PORSI */}
      <View style={styles.card}>
        <Ionicons name="people-outline" size={18} color="#C2410C" />
        <Text style={styles.label}>PORSI</Text>
        <Text style={styles.value} numberOfLines={1}>
          {porsi}
        </Text>
      </View>

      {/* 3. RASA */}
      <View style={styles.card}>
        <Ionicons name="flame-outline" size={18} color="#15803D" />
        <Text style={styles.label}>RASA</Text>
        <Text style={styles.value} numberOfLines={1}>
          {rasa}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: Radius.lg + 2,
    padding: Spacing.two * 1.2,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
