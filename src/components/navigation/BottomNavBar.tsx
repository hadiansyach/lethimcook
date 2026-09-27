import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { BrandColors, Spacing } from '@/constants/theme';

export type TabKey = 'index' | 'history' | 'saved';

interface BottomNavBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
}

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  const pathname = usePathname();

  const currentTab: TabKey =
    activeTab ||
    (pathname === '/history' ? 'history' : pathname === '/saved' ? 'saved' : 'index');

  const handlePress = (tab: TabKey, route: string) => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      router.push(route as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab 1: Cari Ide */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePress('index', '/')}
        style={styles.tabItem}>
        <Ionicons
          name={currentTab === 'index' ? 'book' : 'book-outline'}
          size={22}
          color={currentTab === 'index' ? BrandColors.primary : '#64748B'}
        />
        <Text
          style={[
            styles.tabLabel,
            currentTab === 'index' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}>
          Cari Ide
        </Text>
      </TouchableOpacity>

      {/* Tab 2: Riwayat */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePress('history', '/history')}
        style={styles.tabItem}>
        <Ionicons
          name={currentTab === 'history' ? 'time' : 'time-outline'}
          size={22}
          color={currentTab === 'history' ? BrandColors.primary : '#64748B'}
        />
        <Text
          style={[
            styles.tabLabel,
            currentTab === 'history' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}>
          Riwayat
        </Text>
      </TouchableOpacity>

      {/* Tab 3: Disimpan */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePress('saved', '/saved')}
        style={styles.tabItem}>
        <Ionicons
          name={currentTab === 'saved' ? 'bookmark' : 'bookmark-outline'}
          size={22}
          color={currentTab === 'saved' ? BrandColors.primary : '#64748B'}
        />
        <Text
          style={[
            styles.tabLabel,
            currentTab === 'saved' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}>
          Disimpan
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: Spacing.two,
    paddingBottom: Spacing.two * 1.5,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
  },
  tabLabelActive: {
    color: BrandColors.primary,
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#64748B',
    fontWeight: '500',
  },
});
