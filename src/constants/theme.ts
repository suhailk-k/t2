import { Colors } from './colors';

export const Typography = {
  h1: { fontSize: 22, fontWeight: '700' as const, color: Colors.textPrimary, lineHeight: 30 },
  h2: { fontSize: 18, fontWeight: '700' as const, color: Colors.textPrimary, lineHeight: 26 },
  h3: { fontSize: 16, fontWeight: '600' as const, color: Colors.textPrimary, lineHeight: 24 },
  h4: { fontSize: 15, fontWeight: '600' as const, color: Colors.textPrimary, lineHeight: 22 },
  bodyLarge: { fontSize: 15, fontWeight: '400' as const, color: Colors.textPrimary, lineHeight: 22 },
  body: { fontSize: 14, fontWeight: '400' as const, color: Colors.textPrimary, lineHeight: 21 },
  bodyMedium: { fontSize: 14, fontWeight: '500' as const, color: Colors.textPrimary, lineHeight: 21 },
  bodyBold: { fontSize: 14, fontWeight: '700' as const, color: Colors.textPrimary, lineHeight: 21 },
  small: { fontSize: 12, fontWeight: '400' as const, color: Colors.textSecondary, lineHeight: 18 },
  smallMedium: { fontSize: 12, fontWeight: '500' as const, color: Colors.textSecondary, lineHeight: 18 },
  caption: { fontSize: 11, fontWeight: '400' as const, color: Colors.textTertiary, lineHeight: 16 },
  badge: { fontSize: 11, fontWeight: '600' as const, lineHeight: 16 },
  label: { fontSize: 13, fontWeight: '500' as const, color: Colors.textSecondary, lineHeight: 20 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  half: 2,
};

export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 999,
};

export const Shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const BottomTabInset = 0;
export const MaxContentWidth = 640;

export const Fonts = {
  mono: 'Courier',
  sans: 'System',
};

export type ThemeColor =
  | 'background'
  | 'backgroundElement'
  | 'backgroundSelected'
  | 'text'
  | 'textSecondary';
