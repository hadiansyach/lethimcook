import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Radius, Spacing } from '@/constants/theme';

export function RecommendationCardSkeleton() {
  return (
    <Card style={styles.card}>
      {/* Top Row: Badge & Bookmark */}
      <View style={styles.topRow}>
        <Skeleton width={130} height={24} borderRadius={Radius.full} />
        <Skeleton width={34} height={34} borderRadius={Radius.full} />
      </View>

      {/* Recipe Title Lines */}
      <View style={styles.titleContainer}>
        <Skeleton width="85%" height={20} borderRadius={Radius.sm} />
        <Skeleton width="55%" height={18} borderRadius={Radius.sm} />
      </View>

      {/* Metadata Badges Row */}
      <View style={styles.pillsRow}>
        <Skeleton width={75} height={22} borderRadius={Radius.full} />
        <Skeleton width={95} height={22} borderRadius={Radius.full} />
        <Skeleton width={80} height={22} borderRadius={Radius.full} />
      </View>

      {/* Flavor Profile Box */}
      <Skeleton width="100%" height={46} borderRadius={Radius.md} />

      {/* Used Ingredients Row */}
      <View style={styles.chipsRow}>
        <Skeleton width={60} height={20} borderRadius={Radius.sm} />
        <Skeleton width={50} height={20} borderRadius={Radius.sm} />
        <Skeleton width={70} height={20} borderRadius={Radius.sm} />
        <Skeleton width={65} height={20} borderRadius={Radius.sm} />
      </View>
    </Card>
  );
}

export function RecommendationListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <RecommendationCardSkeleton key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.four,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: Spacing.four,
    gap: Spacing.three,
    borderRadius: Radius.lg + 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    gap: 6,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 6,
  },
});
