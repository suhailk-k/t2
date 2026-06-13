export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const getCodeColor = (code: string): string => {
  const map: Record<string, string> = {
    FR: '#0EA5E9',
    FA: '#6366F1',
    LW: '#10B981',
    BT: '#F59E0B',
    TX: '#EF4444',
    AA: '#8B5CF6',
    MA: '#EC4899',
  };
  return map[code] ?? '#6B7280';
};

export const getThumbnailColor = (code: string): string => {
  const map: Record<string, string> = {
    FR: '#0EA5E9',
    FA: '#6366F1',
    LW: '#10B981',
    BT: '#F59E0B',
    TX: '#EF4444',
    AA: '#8B5CF6',
  };
  return map[code] ?? '#6B7280';
};

export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);
