/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#111827',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#6B7280',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export const BrandColors = {
  primary: '#BA3806',
  primaryDark: '#9C2F05',
  primaryLight: '#FFF7ED',
  primaryLightBorder: '#FFEDD5',
  accentOrange: '#EA580C',
  charcoal: '#1E2530',
  charcoalActive: '#262E3B',
  chipBg: '#E2E8F0',
  chipText: '#1E293B',
  quickChipBg: '#F8FAFC',
  quickChipBorder: '#E2E8F0',
  quickChipText: '#334155',
  cardBg: '#F1F5F9',
  cardBorder: '#E2E8F0',
  tipsBg: '#EFF6FF',
  tipsBorder: '#DBEAFE',
  tipsText: '#1E293B',
  subtleText: '#64748B',
  border: '#E2E8F0',
  inputBg: '#FFFFFF',
  dotRed: '#E11D48',
  avatarBg: '#BA3806',
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 9999,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
