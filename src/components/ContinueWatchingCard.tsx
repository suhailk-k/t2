import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography, BorderRadius, Shadow } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  subtitle: string;
  code: string;
  lastWatched: string;
  timeLeft: string;
  progress: number;
  thumbnailUrl: string;
  onResume?: () => void;
}

export const ContinueWatchingCard: React.FC<Props> = ({
  title,
  subtitle,
  code,
  lastWatched,
  timeLeft,
  progress,
  thumbnailUrl,
  onResume,
}) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: thumbnailUrl }}
        style={styles.thumbnail}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <TouchableOpacity style={styles.resumeBtn} onPress={onResume} activeOpacity={0.85}>
          <Ionicons name="play" size={14} color={Colors.white} />
          <Text style={styles.resumeText}>Resume</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={[Typography.small, { flex: 1 }]} numberOfLines={1}>{subtitle}</Text>
          <View style={styles.codePill}>
            <Text style={styles.codePillText}>{code}</Text>
          </View>
        </View>
        <View style={styles.progressRow}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.lastWatched}>Last watched {lastWatched}</Text>
          <View style={styles.timeLeft}>
            <Ionicons name="time-outline" size={11} color={Colors.textSecondary} />
            <Text style={styles.timeLeftText}>{timeLeft}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadow.card,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  thumbnail: {
    height: 180,
    backgroundColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: Colors.white,
    gap: 6,
  },
  resumeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  codePill: {
    backgroundColor: Colors.borderLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  codePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  progressRow: {
    marginBottom: 6,
  },
  progressBar: {
    height: 5,
    backgroundColor: Colors.progressTrack,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.successRing,
    borderRadius: BorderRadius.full,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastWatched: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  timeLeftText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
