import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Typography } from '../../constants/theme';
import { CourseCard } from '../../components/CourseCard';
import { Course } from '../../types';
import { api } from '../../services/api';

export default function MyLearningScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCourses = async () => {
    try {
      const res = await api.getMyLearning();
      let rawCourses: any[] = [];
      if (Array.isArray(res)) {
        rawCourses = res;
      } else if (res && typeof res === 'object') {
        const possibleArray = (res as any).courses || (res as any).data || (res as any).papers || [];
        rawCourses = Array.isArray(possibleArray) ? possibleArray : [];
      }
      
      const mapped = rawCourses.map((c: any) => ({
        id: c.id || c._id || '',
        title: c.title || c.name || '',
        code: c.code || c.paper_code || 'FA',
        thumbnail: c.thumbnail || c.image || '',
        totalChapters: c.totalChapters || c.total_chapters || 12,
        completedChapters: c.completedChapters || c.completed_chapters || 0,
        progress: c.progress || 0,
      }));
      setCourses(mapped);
    } catch (err) {
      console.error(err);
      setCourses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCourses();
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Learning</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.primary} />
        }
      >
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            variant="list"
            onPress={() =>
              router.push({ pathname: '/lecture/[id]', params: { id: course.id } })
            }
          />
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
