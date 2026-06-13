import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, Shadow, Spacing, Typography } from '../constants/theme';
import { Announcement } from '../types';

interface Props {
  announcement: Announcement;
  onPress?: () => void;
}

export const AnnouncementCard: React.FC<Props> = ({ announcement, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: announcement.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{announcement.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{announcement.title}</Text>
        <Text style={[Typography.small, { color: Colors.textSecondary, marginTop: 2 }]} numberOfLines={1}>
          {announcement.excerpt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadow.card,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: '#E5E7EB',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.warningText,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 18,
  },
});
