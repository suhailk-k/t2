import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { CircularProgress } from '../../components/CircularProgress';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/theme';
import { api } from '../../services/api';
import { Announcement, Course } from '../../types';
import { getCodeColor } from '../../utils/helpers';


const ElanceLogo = () => (
  <Svg width={114} height={26} viewBox="0 0 114 26" fill="none">
    <G clipPath="url(#elance_clip)">
      <Path
        d="M24.2425 6.87444L5.20904 0.154596C3.06356 -0.602592 1.02144 1.55564 1.73584 3.82559L2.0862 4.93887L0 5.79412H2.35524L4.08272 11.2841L1.9874 12.1418H4.35176L6.0458 17.5233L3.95884 18.3802H6.31484L8.08792 24.0125C8.73316 26.063 11.1956 26.6755 12.638 25.1442L25.3179 11.6772C26.7558 10.15 26.1744 7.55687 24.2417 6.87444H24.2425Z"
        fill="#19A0E6"
      />
      <Path d="M17.1814 9.57981H1.1864L0.0015564 5.79387H17.1814C18.1694 5.76895 18.9704 6.62179 18.9704 7.67478C18.9704 8.72697 18.1694 9.58061 17.1814 9.58061V9.57981Z" fill="#E6E6E6" />
      <Path d="M10.1293 22.1666H5.13836L3.95352 18.3807H10.13C11.118 18.3558 11.9191 19.2086 11.9191 20.2616C11.9191 21.3138 11.118 22.1674 10.13 22.1674L10.1293 22.1666Z" fill="#E6E6E6" />
      <Path d="M13.6215 15.9267H3.17224L1.9874 12.1407H13.6215C14.6095 12.1158 15.4105 12.9687 15.4105 14.0216C15.4105 15.0738 14.6095 15.9275 13.6215 15.9275V15.9267Z" fill="#E6E6E6" />
      <Path
        d="M47.3655 18.3895C46.7278 18.3895 46.154 17.777 46.154 17.1083V6.61614C46.154 6.18369 46.4907 5.83243 46.9034 5.83243H47.6467C48.0601 5.83243 48.3352 6.1845 48.3352 6.61614V15.0192C48.3352 15.573 48.8262 16.0834 49.3559 16.0834H55.3622C55.7756 16.0834 56.1115 16.376 56.1115 16.8076V17.6058C56.1115 18.0383 55.7749 18.3895 55.3622 18.3895H47.3662H47.3655ZM61.3882 8.13856H65.6708C66.6664 8.13856 67.4766 9.04686 67.4766 10.0886V10.7011C67.4766 11.1062 67.1619 11.4695 66.7751 11.4695H60.4162C60.0293 11.4695 59.7147 11.1062 59.7147 10.7011V9.8563C59.7147 8.94237 60.4253 8.13775 61.2985 8.13775H61.3882V8.13856ZM68.2039 18.3911H68.9084C69.3211 18.3911 69.6578 18.0399 69.6578 17.6074V9.46966C69.6578 8.49947 69.2968 7.58795 68.6424 6.90069C67.9858 6.21183 67.1125 5.83323 66.1838 5.83323H61.0227C60.0962 5.83323 59.2237 6.20942 58.5671 6.89346C57.8679 7.62171 57.5419 8.58788 57.5419 9.93507V17.6484C57.5419 18.1066 57.8208 18.3807 58.2882 18.3831L58.9646 18.3871C59.3765 18.3871 59.7132 18.0359 59.7132 17.6034V14.475C59.7132 14.0699 60.0278 13.7781 60.4147 13.7781H66.7523C67.1391 13.7781 67.4751 14.0699 67.4751 14.475V17.6074C67.4751 18.0391 67.7517 18.3911 68.1644 18.3911H68.2016H68.2039ZM83.185 18.3887H83.9017C84.4983 18.3887 84.9231 17.8815 84.9231 17.2562V6.61614C84.9231 6.1845 84.61 5.83243 84.1966 5.83243H83.4921C83.0794 5.83243 82.7427 6.18369 82.7427 6.61614V13.5787C82.7427 13.8585 82.4699 14.0337 82.2578 14.0337C82.137 14.0337 81.9021 13.9734 81.8201 13.8761L75.2043 6.10412C75.0576 5.9313 74.8463 5.83243 74.6244 5.83243H73.8872C73.2913 5.83243 72.8057 6.33963 72.8057 6.965V17.6058C72.8057 18.0375 73.1409 18.3895 73.5551 18.3895H74.2619C74.6745 18.3895 75.0112 18.0383 75.0112 17.6058V10.6336C75.0112 10.3539 75.2658 10.1867 75.4771 10.1867C75.5979 10.1867 75.7104 10.2397 75.7925 10.337L82.4288 18.1194C82.577 18.2923 82.7875 18.3911 83.0087 18.3911H83.185V18.3887ZM33.3123 18.3863H43.225C43.6377 18.3863 43.9743 18.0351 43.9743 17.6026V16.8044C43.9743 16.3728 43.6544 16.0834 43.2409 16.0834H34.8414C34.5047 16.0834 34.2828 15.7329 34.2828 15.3809V13.9356C34.2828 13.5836 34.4895 13.2636 34.8262 13.2636H41.1821C41.5948 13.2636 41.9315 12.9453 41.9315 12.5121V11.7139C41.9315 11.2823 41.5963 10.9567 41.1821 10.9567H34.8262C34.4895 10.9567 34.2828 10.6424 34.2828 10.2904V8.83465C34.2828 8.48259 34.3831 8.13775 34.7198 8.13775H43.1209C43.5335 8.13775 43.855 7.84436 43.855 7.41191V6.61373C43.855 6.18209 43.5199 5.83002 43.1057 5.83002H33.2599C32.6207 5.83002 32.1016 6.37339 32.1016 7.04216V17.1758C32.1016 17.8445 32.4938 18.3879 33.1322 18.3879L33.3131 18.3863H33.3123ZM103.339 18.3863H113.251C113.664 18.3863 114.001 18.0351 114.001 17.6026V16.8044C114.001 16.3728 113.681 16.0834 113.267 16.0834H104.868C104.531 16.0834 104.309 15.7329 104.309 15.3809V13.9356C104.309 13.5836 104.516 13.2636 104.853 13.2636H111.208C111.621 13.2636 111.958 12.9453 111.958 12.5121V11.7139C111.958 11.2823 111.623 10.9567 111.208 10.9567H104.853C104.516 10.9567 104.309 10.6424 104.309 10.2904V8.83465C104.309 8.48259 104.41 8.13775 104.746 8.13775H113.147C113.56 8.13775 113.881 7.84436 113.881 7.41191V6.61373C113.881 6.18209 113.546 5.83002 113.132 5.83002H103.286C102.647 5.83002 102.128 6.37339 102.128 7.04216V17.1758C102.128 17.8445 102.52 18.3879 103.159 18.3879L103.339 18.3863H103.339ZM91.0677 18.3879H96.0693C96.9957 18.3879 97.8652 18.0117 98.521 17.3277L98.5241 17.3237C99.1792 16.6372 99.541 15.7249 99.541 14.7547V14.3986C99.541 14.3681 99.5379 14.3375 99.5288 14.3006L99.5273 14.2925V14.2732C99.5273 13.9404 99.0189 13.6583 98.4169 13.6583C97.815 13.6583 97.3066 13.9396 97.3066 14.2732V14.2853L97.3096 14.3102L97.3081 14.3207C97.3028 14.348 97.3005 14.3745 97.3005 14.4002C97.3005 15.2949 96.6043 16.0826 95.7493 16.0826H91.3208C90.4658 16.0826 89.7704 15.2941 89.7704 14.4002V9.82012C89.7704 8.92548 90.4217 8.13856 91.2767 8.13856H95.7068C96.5618 8.13856 97.302 8.92629 97.302 9.82012C97.302 9.84102 97.3035 9.86273 97.3089 9.89247V9.9005L97.3096 9.90854C97.3096 9.91337 97.3089 9.91739 97.3081 9.92703C97.3081 10.2598 97.8219 10.5419 98.4192 10.5419C99.0166 10.5419 99.525 10.263 99.5288 9.93185V9.92382L99.5303 9.91658C99.5387 9.88121 99.5425 9.84986 99.5425 9.82093V9.46484C99.5425 8.49464 99.1807 7.58152 98.5249 6.89587C97.8682 6.21022 96.9973 5.83243 96.0693 5.83243H91.0601C90.1329 5.83243 89.2605 6.21022 88.6046 6.89587C87.9495 7.58232 87.5877 8.49464 87.5877 9.46484V14.7515C87.5877 15.7185 87.9472 16.6284 88.5977 17.3132L88.6031 17.3189C89.2498 17.9981 90.1466 18.3887 91.0632 18.3887H91.0662L91.0677 18.3879Z"
        fill="#1A1D21"
      />
    </G>
    <Defs>
      <ClipPath id="elance_clip">
        <Rect width={114} height={26} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);


const DownloadIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4v12M12 16l-4-4M12 16l4-4"
      stroke={Colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 20h16"
      stroke={Colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);


const AnalyticsIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 17l5-6 4 3 5-7 4 4"
      stroke={Colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 7h4v4"
      stroke={Colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


const MaterialsIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4v10M12 4l-3 3M12 4l3 3"
      stroke={Colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 14v5a1 1 0 001 1h14a1 1 0 001-1v-5"
      stroke={Colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);


const QuickActionItem = ({
  icon,
  label,
}: {
  icon: 'download' | 'analytics' | 'materials';
  label: string;
}) => (
  <TouchableOpacity style={styles.quickAction} activeOpacity={0.75}>
    <View style={styles.quickActionIconWrap}>
      {icon === 'download' && <DownloadIcon />}
      {icon === 'analytics' && <AnalyticsIcon />}
      {icon === 'materials' && <MaterialsIcon />}
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);


const CourseThumbnailBg = ({ code }: { code: string }) => {
  const bg = getCodeColor(code);
  return (
    <View style={[styles.courseThumbBg, { backgroundColor: bg }]}>
      <Text style={styles.courseThumbCode}>{code}</Text>
      <View style={styles.courseThumbDeco1} />
      <View style={styles.courseThumbDeco2} />
    </View>
  );
};


const RecentLearningCard = ({ course, onPress }: { course: Course; onPress: () => void }) => (
  <TouchableOpacity style={styles.recentCard} onPress={onPress} activeOpacity={0.8}>
    <CourseThumbnailBg code={course.code} />
    <View style={styles.recentCardBottom}>
      <Text style={styles.recentCardTitle} numberOfLines={2}>{course.title}</Text>
      <View style={styles.recentCardRow}>
        <View style={styles.codePill}>
          <Text style={styles.codePillText}>{course.code}</Text>
        </View>
        <CircularProgress progress={course.progress} size={38} strokeWidth={3} labelSize={10} />
      </View>
      <Text style={styles.recentCardChapters}>
        {course.completedChapters}/{course.totalChapters} Chapters
      </Text>
    </View>
  </TouchableOpacity>
);


const ContinueWatchingCard = ({ data, onResume }: { data: any; onResume: () => void }) => {
  if (!data) return null;
  return (
    <View style={styles.cwCard}>
      <ImageBackground
        source={data.thumbnailUrl ? { uri: data.thumbnailUrl } : require('../../../assets/vedioAvatar.png')}
        style={styles.cwThumb}
        imageStyle={styles.cwThumbImage}
        resizeMode="cover"
      >
        <View style={styles.cwOverlay} />
        <TouchableOpacity style={styles.cwResumeBtn} onPress={onResume} activeOpacity={0.85}>
          <Ionicons name="play" size={13} color="#fff" />
          <Text style={styles.cwResumeText}>Resume</Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.cwInfo}>
        <Text style={styles.cwTitle}>{data.title}</Text>
        <View style={styles.cwMetaRow}>
          <Text style={styles.cwSubtitle} numberOfLines={1}>
            {data.subtitle}
          </Text>
          <View style={styles.cwCodePill}>
            <Text style={styles.cwCodePillText}>{data.code}</Text>
          </View>
        </View>
        <View style={styles.cwProgressBar}>
          <View
            style={[styles.cwProgressFill, { width: `${(data.progress || 0) * 100}%` }]}
          />
        </View>
        <View style={styles.cwTimeRow}>
          <Text style={styles.cwLastWatched}>Last watched {data.lastWatched}</Text>
          <View style={styles.cwTimeLeft}>
            <Ionicons name="time-outline" size={11} color={Colors.textSecondary} />
            <Text style={styles.cwTimeLeftText}>{data.timeLeft}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};


const AnnouncementCard = ({
  announcement,
  onPress,
}: {
  announcement: Announcement;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.announcementCard} onPress={onPress} activeOpacity={0.8}>
    <Image
      source={{ uri: announcement.imageUrl }}
      style={styles.announcementImage}
      resizeMode="cover"
    />
    <View style={styles.announcementContent}>
      <View style={styles.announcementBadge}>
        <Text style={styles.announcementBadgeText}>{announcement.category}</Text>
      </View>
      <Text style={styles.announcementTitle} numberOfLines={2}>
        {announcement.title}
      </Text>
      <Text style={styles.announcementExcerpt} numberOfLines={1}>
        {announcement.excerpt}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [data, setData] = useState<{
    continueWatching: any;
    recentLearning: Course[];
    announcements: Announcement[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const res = await api.getHome();

      
      const root = (res as any)?.data || res;

      let continueWatching = root?.continueWatching || root?.continue_watching || null;
      if (continueWatching) {
        continueWatching = {
          courseId: continueWatching.paper_id || continueWatching.courseId || continueWatching.course_id || 'fa',
          title: continueWatching.title || '',
          subtitle: continueWatching.subject || continueWatching.subtitle || '',
          code: continueWatching.paper_code || continueWatching.code || 'FA',
          lastWatched: continueWatching.last_watched_label || continueWatching.lastWatched || continueWatching.last_watched || '',
          timeLeft: continueWatching.remaining_time_label || continueWatching.timeLeft || continueWatching.time_left || '',
          progress: continueWatching.progress_percent || continueWatching.progress || 0,
          videoUrl: continueWatching.videoUrl || continueWatching.video_url || '',
          thumbnailUrl: continueWatching.thumbnailUrl || continueWatching.thumbnail_url || '',
          lectureId: continueWatching.topic_id || continueWatching.topicId || '',
        };
      }

      let recentLearning = root?.recentLearning || root?.recent_learning || root?.courses || root?.papers || [];
      if (!Array.isArray(recentLearning)) {
        recentLearning = [];
      } else {
        recentLearning = recentLearning.map((c: any) => ({
          id: c.id || c._id || '',
          title: c.title || c.name || '',
          code: c.code || c.paper_code || 'FA',
          thumbnail: c.thumbnail || c.image || '',
          totalChapters: c.totalChapters || c.total_chapters || 12,
          completedChapters: c.completedChapters || c.completed_chapters || 0,
          progress: c.progress || 0,
        }));
      }

      let announcements = root?.announcements || [];
      if (!Array.isArray(announcements)) {
        announcements = [];
      } else {
        announcements = announcements.map((a: any) => ({
          id: a.id || a._id || String(Math.random()),
          title: a.title || '',
          category: a.category || 'Academics',
          excerpt: a.excerpt || a.content?.slice(0, 50) || '',
          content: a.content || '',
          imageUrl: a.imageUrl || a.image_url || a.image || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
          postDate: a.postDate || a.post_date || a.createdAt || '',
        }));
      }

      setData({
        continueWatching,
        recentLearning,
        announcements,
      });
    } catch (err) {
      console.error(err);
      setData({
        continueWatching: null,
        recentLearning: [],
        announcements: [],
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.primary} />
        }
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <ElanceLogo />
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.switchCourseBtn}
              onPress={() => router.push('/switch-course')}
              activeOpacity={0.8}
            >
              <Text style={styles.switchCourseText}>Switch Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="search-outline" size={21} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={21} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Continue Watching</Text>
          <ContinueWatchingCard
            data={data?.continueWatching}
            onResume={() => {
              const courseId = data?.continueWatching?.courseId || 'fa';
              const lectureId = data?.continueWatching?.lectureId || '';
              router.push({
                pathname: '/lecture/[id]',
                params: { id: courseId, resumeLectureId: lectureId },
              });
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: Spacing.base }]}>
            Recent Learning
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {data?.recentLearning?.map((course) => (
              <RecentLearningCard
                key={course.id}
                course={course}
                onPress={() =>
                  router.push({ pathname: '/lecture/[id]', params: { id: course.id } })
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* ── Quick Action ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: Spacing.base }]}>
            Quick Action
          </Text>
          <View style={styles.quickActionsRow}>
            <QuickActionItem icon="download" label="Downloads" />
            <QuickActionItem icon="analytics" label="Analytics" />
            <QuickActionItem icon="materials" label="Materials" />
          </View>
        </View>

        {/* ── Announcements ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: Spacing.base }]}>
            Announcements
          </Text>
          {data?.announcements?.map((a) => (
            <AnnouncementCard
              key={a.id}
              announcement={a}
              onPress={() =>
                router.push({ pathname: '/announcement/[id]', params: { id: a.id } })
              }
            />
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1 },
  content: { paddingBottom: 24 },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  switchCourseBtn: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  switchCourseText: { color: Colors.primary, fontSize: 12, fontWeight: '600' },
  iconBtn: { padding: 5 },

  /* Section */
  section: { marginTop: 18 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 10,
    marginLeft: 20,
  },

  /* Continue Watching Card */
  cwCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cwThumb: {
    height: 180,
    backgroundColor: '#B0C4D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cwThumbImage: { borderRadius: 0 },
  cwOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  cwResumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  cwResumeText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  cwInfo: { padding: 14 },
  cwTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 6,
  },
  cwMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cwSubtitle: { fontSize: 12, color: '#6B7280', flex: 1, marginRight: 8 },
  cwCodePill: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cwCodePillText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  cwProgressBar: {
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 7,
  },
  cwProgressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 3,
  },
  cwTimeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cwLastWatched: { fontSize: 12, color: '#6B7280' },
  cwTimeLeft: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cwTimeLeftText: { fontSize: 12, color: '#6B7280' },

  /* Recent Learning */
  horizontalList: { paddingHorizontal: 16, paddingBottom: 4, gap: 12 },
  recentCard: {
    width: 158,
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  courseThumbBg: {
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  courseThumbCode: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
    zIndex: 2,
  },
  courseThumbDeco1: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.12)',
    right: -10,
    top: -10,
  },
  courseThumbDeco2: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    right: 30,
    bottom: -8,
  },
  recentCardBottom: { padding: 10 },
  recentCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 18,
    marginBottom: 8,
    minHeight: 36,
  },
  recentCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  codePill: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  codePillText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  recentCardChapters: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },

  /* Quick Actions */
  quickActionsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 10,
  },
  quickAction: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 8,
  },
  quickActionIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },

  /* Announcements */
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  announcementImage: {
    width: 88,
    height: 88,
    backgroundColor: '#E5E7EB',
  },
  announcementContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  announcementBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  announcementBadgeText: { fontSize: 11, fontWeight: '600', color: '#D97706' },
  announcementTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 18,
    marginBottom: 3,
  },
  announcementExcerpt: { fontSize: 12, color: '#6B7280', lineHeight: 17 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
