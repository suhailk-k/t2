import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography, BorderRadius, Spacing, Shadow } from '../constants/theme';
import { Course } from '../types';
import { CircularProgress } from './CircularProgress';
import { getCodeColor } from '../utils/helpers';

interface Props {
  course: Course;
  variant?: 'horizontal' | 'list';
  onPress?: () => void;
}

const CourseThumbnail: React.FC<{ code: string; size?: number }> = ({ code, size = 60 }) => {
  const bgColor = getCodeColor(code);
  return (
    <View style={[styles.thumbContainer, { width: size, height: size, backgroundColor: bgColor }]}>
      <View style={styles.thumbInner}>
        <View style={[styles.thumbStripe, { backgroundColor: 'rgba(255,255,255,0.9)' }]} />
        <View style={[styles.thumbStripe, { backgroundColor: 'rgba(255,255,255,0.6)', marginTop: 3 }]} />
        <View style={[styles.thumbStripe, { backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 3 }]} />
      </View>
      <Text style={styles.thumbCode}>{code}</Text>
    </View>
  );
};

export const CourseCard: React.FC<Props> = ({ course, variant = 'horizontal', onPress }) => {
  if (variant === 'list') {
    return (
      <TouchableOpacity style={styles.listCard} onPress={onPress} activeOpacity={0.7}>
        <CourseThumbnail code={course.code} size={60} />
        <View style={styles.listInfo}>
          <Text style={styles.listTitle} numberOfLines={1}>{course.title}</Text>
          <View style={styles.codePill}>
            <Text style={styles.codePillText}>{course.code}</Text>
          </View>
          <Text style={[Typography.small, { marginTop: 2 }]}>
            {course.completedChapters}/{course.totalChapters} Chapters
          </Text>
        </View>
        <CircularProgress progress={course.progress} size={44} strokeWidth={3} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.horizontalCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.horizontalThumb}>
        <View style={[styles.horizontalThumbBg, { backgroundColor: getCodeColor(course.code) }]}>
          <Text style={styles.horizontalCode}>{course.code}</Text>
          <View style={styles.starIcon}>
            <Text style={{ fontSize: 14 }}>✦</Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalBottom}>
        <Text style={styles.horizontalTitle} numberOfLines={1}>{course.title}</Text>
        <View style={styles.horizontalRow}>
          <View style={styles.codePill}>
            <Text style={styles.codePillText}>{course.code}</Text>
          </View>
          <CircularProgress progress={course.progress} size={40} strokeWidth={3} />
        </View>
        <Text style={[Typography.small, { marginTop: 2 }]}>
          {course.completedChapters}/{course.totalChapters} Chapters
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  listInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    ...Typography.bodyMedium,
    marginBottom: 4,
  },
  thumbContainer: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInner: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  thumbStripe: {
    width: 28,
    height: 4,
    borderRadius: 2,
  },
  thumbCode: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
    position: 'absolute',
    bottom: 6,
    left: 8,
  },
  codePill: {
    backgroundColor: Colors.borderLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  codePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  horizontalCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadow.card,
    overflow: 'hidden',
    marginRight: 12,
  },
  horizontalThumb: {
    height: 100,
  },
  horizontalThumbBg: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  horizontalCode: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  starIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  horizontalBottom: {
    padding: 10,
  },
  horizontalTitle: {
    ...Typography.bodyMedium,
    marginBottom: 6,
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
});
