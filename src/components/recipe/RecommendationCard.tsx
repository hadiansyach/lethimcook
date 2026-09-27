import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';
import { BrandColors, Radius, Spacing } from '@/constants/theme';
import { RecipeListItem } from '@/types/recipe';

interface RecommendationCardProps {
  recipe: RecipeListItem;
  onPressDetail: () => void;
  isPrimaryCta?: boolean;
  initialBookmarked?: boolean;
  onToggleBookmark?: (isBookmarked: boolean) => void;
}

export function RecommendationCard({
  recipe,
  onPressDetail,
  initialBookmarked = false,
  onToggleBookmark,
}: RecommendationCardProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleBookmarkToggle = () => {
    const nextState = !bookmarked;
    setBookmarked(nextState);
    if (onToggleBookmark) {
      onToggleBookmark(nextState);
    }
  };

  const is100Match = recipe.kecocokan_bahan?.includes('100%');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressDetail}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`Resep ${recipe.nama_menu}`}
      accessibilityHint="Ketuk untuk melihat detail resep dan langkah memasak">
      {/* Top Row: Match Badge & Bookmark Button */}
      <View style={styles.topRow}>
        <Badge
          variant={is100Match ? 'solid-green' : 'subtle-green'}
          icon={
            <Ionicons
              name="checkmark-circle"
              size={14}
              color={is100Match ? '#FFFFFF' : '#15803D'}
            />
          }
          style={styles.matchBadge}>
          {recipe.kecocokan_bahan || '100% Bahan Cocok'}
        </Badge>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBookmarkToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.bookmarkButton}
          accessibilityLabel="Simpan resep">
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={bookmarked ? BrandColors.primary : '#64748B'}
          />
        </TouchableOpacity>
      </View>

      {/* Title with subtle chevron affordance */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{recipe.nama_menu}</Text>
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#94A3B8"
          style={styles.chevron}
        />
      </View>

      {/* Metadata Badges */}
      <View style={styles.pillsWrap}>
        {/* Cooking Time */}
        {recipe.waktu_memasak ? (
          <Badge
            variant="neutral"
            icon={<Ionicons name="time-outline" size={13} color="#475569" />}
            style={styles.metaBadge}>
            {recipe.waktu_memasak}
          </Badge>
        ) : null}

        {/* Difficulty */}
        {recipe.tingkat_kesulitan ? (
          <Badge
            variant="subtle-green"
            icon={<Ionicons name="flash" size={12} color="#15803D" />}
            style={styles.metaBadge}>
            {recipe.tingkat_kesulitan}
          </Badge>
        ) : null}

        {/* Spice Level */}
        {recipe.tingkat_pedas && recipe.tingkat_pedas !== 'Bebas' ? (
          <Badge
            variant="subtle-red"
            icon={<Ionicons name="flame" size={12} color="#C2410C" />}
            style={styles.metaBadge}>
            {recipe.tingkat_pedas}
          </Badge>
        ) : null}

        {/* Cooking Tags */}
        {recipe.tag_masakan?.map((tag, idx) => (
          <Badge
            key={idx}
            variant="neutral"
            icon={
              <Ionicons
                name={tag.toLowerCase().includes('ramah') ? 'shield-checkmark-outline' : 'restaurant-outline'}
                size={12}
                color="#475569"
              />
            }
            style={styles.metaBadge}>
            {tag}
          </Badge>
        ))}
      </View>

      {/* Flavor Profile Box */}
      {recipe.deskripsi_rasa ? (
        <View style={styles.flavorBox}>
          <Text style={styles.flavorText}>
            <Text style={styles.flavorLabel}>Rasa: </Text>
            {recipe.deskripsi_rasa}
          </Text>
        </View>
      ) : null}

      {/* Used Ingredients Chips (if provided) */}
      {recipe.bahan_terpakai && recipe.bahan_terpakai.length > 0 && (
        <View style={styles.usedIngredientsContainer}>
          <Text style={styles.usedIngredientsLabel}>Bahan kamu yang terpakai:</Text>
          <View style={styles.usedChipsWrap}>
            {recipe.bahan_terpakai.map((item, idx) => (
              <View key={idx} style={styles.usedChip}>
                <Text style={styles.usedChipText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Additional Seasonings Note (if provided) */}
      {recipe.tambahan_bumbu_dasar && recipe.tambahan_bumbu_dasar.length > 0 && (
        <View style={styles.seasoningsBox}>
          <Ionicons name="add-circle-outline" size={15} color="#475569" />
          <Text style={styles.seasoningsText}>
            <Text style={styles.seasoningsLabel}>Tambahan bumbu dasar: </Text>
            {recipe.tambahan_bumbu_dasar.join(' & ')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: Spacing.four,
    gap: Spacing.three,
    borderRadius: Radius.lg + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  bookmarkButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  chevron: {
    marginTop: 1,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  flavorBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: Radius.md,
    padding: Spacing.three * 0.9,
  },
  flavorText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  flavorLabel: {
    fontWeight: '700',
    color: '#0F172A',
  },
  usedIngredientsContainer: {
    gap: 6,
  },
  usedIngredientsLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  usedChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  usedChip: {
    backgroundColor: '#F1F5F9',
    borderRadius: Radius.md - 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  usedChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
  },
  seasoningsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
  },
  seasoningsText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
  },
  seasoningsLabel: {
    fontWeight: '600',
    color: '#0F172A',
  },
});


