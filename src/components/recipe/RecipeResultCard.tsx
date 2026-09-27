import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { BrandColors, Radius, Spacing } from '@/constants/theme';
import { RecipeListItem } from '@/types/recipe';

interface RecipeResultCardProps {
  recipe: RecipeListItem;
  onPress: () => void;
}

export function RecipeResultCard({ recipe, onPress }: RecipeResultCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card style={styles.card}>
        {/* Match Percentage & Difficulty Badge */}
        <View style={styles.topRow}>
          <Badge variant="subtle-orange" style={styles.matchBadge}>
            {recipe.kecocokan_bahan || '100% Bahan Cocok'}
          </Badge>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color="#64748B" />
              <Text style={styles.metaText}>{recipe.waktu_memasak}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={13} color="#64748B" />
              <Text style={styles.metaText}>{recipe.tingkat_kesulitan}</Text>
            </View>
          </View>
        </View>

        {/* Recipe Title */}
        <Text style={styles.recipeName}>{recipe.nama_menu}</Text>

        {/* Taste Description */}
        <Text style={styles.tasteDescription} numberOfLines={2}>
          {recipe.deskripsi_rasa}
        </Text>

        {/* Tags */}
        {recipe.tag_masakan && recipe.tag_masakan.length > 0 && (
          <View style={styles.tagsContainer}>
            {recipe.tag_masakan.map((tag, idx) => (
              <Badge key={idx} variant="neutral" style={styles.tagBadge}>
                #{tag}
              </Badge>
            ))}
          </View>
        )}

        {/* Used Ingredients Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerLabel}>
            Bahan terpakai: <Text style={styles.footerIngredients}>{recipe.bahan_terpakai?.join(', ')}</Text>
          </Text>
          <View style={styles.actionIcon}>
            <Ionicons name="chevron-forward" size={16} color={BrandColors.primary} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: Spacing.three,
    gap: Spacing.two,
    borderRadius: Radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  recipeName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  tasteDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: Spacing.two,
    marginTop: 4,
  },
  footerLabel: {
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
  footerIngredients: {
    color: '#0F172A',
    fontWeight: '600',
  },
  actionIcon: {
    marginLeft: 8,
  },
});
