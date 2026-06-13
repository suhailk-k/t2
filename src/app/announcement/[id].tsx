import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadow, Spacing } from '../../constants/theme';
import { ANNOUNCEMENTS } from '../../constants/data';

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const announcement = ANNOUNCEMENTS.find((a) => a.id === id) ?? ANNOUNCEMENTS[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Image
          source={{ uri: announcement.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.postDate}>Post Date: {announcement.postDate}</Text>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{announcement.category}</Text>
          </View>

          <Text style={styles.contentText}>{announcement.content}</Text>

          <TouchableOpacity style={styles.goToPageBtn} activeOpacity={0.85}>
            <Text style={styles.goToPageText}>Go to Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Spacing.base,
    alignSelf: 'flex-start',
  },
  scroll: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: Spacing.base,
  },
  postDate: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
    marginTop: 4,
  },
  categoryBadge: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.warningText,
  },
  contentText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 32,
  },
  goToPageBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.card,
    marginBottom: 24,
  },
  goToPageText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
