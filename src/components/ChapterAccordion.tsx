import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography, BorderRadius, Spacing } from '../constants/theme';
import { Chapter } from '../types';

interface Props {
  chapter: Chapter;
  onSelectLecture?: (lecture: any) => void;
  activeLectureId?: string;
}

export const ChapterAccordion: React.FC<Props> = ({
  chapter,
  onSelectLecture,
  activeLectureId,
}) => {
  const [expanded, setExpanded] = useState(chapter.expanded ?? false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((v) => !v)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.chapterNum}>Chapter {chapter.number} :</Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.downloadAllBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-down-circle-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.downloadAllText}>Download All</Text>
          </TouchableOpacity>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={Colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.lecturesList}>
          {chapter.lectures.map((lecture) => {
            const isActive = activeLectureId === lecture.id;
            return (
              <TouchableOpacity
                key={lecture.id}
                style={[styles.lectureRow, isActive && styles.lectureRowActive]}
                activeOpacity={0.7}
                onPress={() => onSelectLecture?.(lecture)}
              >
                <View style={styles.lectureInfo}>
                  <Text style={[styles.lectureTitle, isActive && styles.lectureTitleActive]}>
                    {lecture.title}
                  </Text>
                  <Text style={styles.lectureDuration}>{lecture.duration}</Text>
                </View>
                {lecture.completed && (
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={12} color={Colors.white} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
  },
  headerLeft: {
    flex: 1,
    marginRight: 8,
  },
  chapterNum: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  downloadAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  downloadAllText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  lecturesList: {
    paddingBottom: 8,
  },
  lectureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  lectureRowActive: {
    backgroundColor: Colors.primaryLight,
  },
  lectureInfo: {
    flex: 1,
  },
  lectureTitle: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '400',
    marginBottom: 2,
  },
  lectureTitleActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  lectureDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
