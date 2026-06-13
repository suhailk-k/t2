import { LegacyColors as Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme as 'light' | 'dark'];
}
