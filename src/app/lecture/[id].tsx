import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChapterAccordion } from '../../components/ChapterAccordion';
import { MaterialItem } from '../../components/MaterialItem';
import { NoteItem } from '../../components/NoteItem';
import { VideoPlayer } from '../../components/VideoPlayer';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadow, Spacing } from '../../constants/theme';
import { api } from '../../services/api';
import { Chapter, Material, Note, PaperInfo, TabName } from '../../types';
import { formatDuration } from '../../utils/helpers';

const TABS: TabName[] = ['Lectures', 'Overview', 'Materials', 'Notes'];

const FABadge = ({ code }: { code: string }) => (
  <View style={styles.faBadge}>
    <Text style={styles.faBadgeText}>{code}</Text>
  </View>
);

const LecturesTab = ({
  chapters,
  activeLectureId,
  onSelectLecture,
}: {
  chapters: Chapter[];
  activeLectureId?: string;
  onSelectLecture: (lecture: any) => void;
}) => {
  const [search, setSearch] = useState('');

  const filteredChapters = chapters.map(ch => ({
    ...ch,
    lectures: ch.lectures.filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
  })).filter(ch => ch.lectures.length > 0);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lesson"
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close" size={16} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {filteredChapters.map((ch) => (
        <ChapterAccordion
          key={ch.id}
          chapter={ch}
          activeLectureId={activeLectureId}
          onSelectLecture={onSelectLecture}
        />
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const OverviewTab = ({ paperInfo }: { paperInfo: PaperInfo | null }) => {
  if (!paperInfo) return null;
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.overviewContent}>
      <Text style={styles.overviewSection}>Paper Info</Text>
      <InfoRow label="Paper :" value={paperInfo.paper} bold />
      <InfoRow label="Chapters Completed:" value={paperInfo.chaptersCompleted} bold />
      <InfoRow label="Exam Weightage:" value={paperInfo.examWeightage} bold />
      <InfoRow label="Updated:" value={paperInfo.updated} bold />

      <Text style={[styles.overviewSection, { marginTop: 16 }]}>Statistics</Text>
      <InfoRow label="Total Paper Duration :" value={paperInfo.totalDuration} />
      <InfoRow label="Difficulty Level:" value={paperInfo.difficulty} />
      <InfoRow label="Student Completion Rate :" value={paperInfo.completionRate} />
      <InfoRow label="Engagement Score:" value={paperInfo.engagementScore} />
      <InfoRow label="Materials Available:" value={String(paperInfo.materialsAvailable)} />

      <Text style={[styles.overviewSection, { marginTop: 16 }]}>Instructors</Text>
      {paperInfo.instructors.map((inst, i) => (
        <Text key={i} style={styles.bulletItem}>• {inst}</Text>
      ))}

      <Text style={[styles.overviewSection, { marginTop: 16 }]}>Description</Text>
      <Text style={styles.descText}>{paperInfo.description}</Text>

      <Text style={[styles.overviewSection, { marginTop: 16 }]}>Skills you gain</Text>
      {paperInfo.skills.map((skill, i) => (
        <Text key={i} style={styles.bulletItem}>• {skill}</Text>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const InfoRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, bold && { fontWeight: '700' }]}>{value}</Text>
  </View>
);

const MaterialsTab = ({ materials }: { materials: { topic: Material[]; chapter: Material[] } | null }) => {
  const topicMaterials = materials?.topic || [];
  const chapterMaterials = materials?.chapter || [];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.materialSection}>Topic Materials</Text>
      {topicMaterials.length > 0 ? (
        topicMaterials.map((m) => <MaterialItem key={m.id} material={m} />)
      ) : (
        <Text style={styles.emptyText}>No topic materials</Text>
      )}

      <Text style={[styles.materialSection, { marginTop: 8 }]}>Chapter Resources</Text>
      {chapterMaterials.length > 0 ? (
        chapterMaterials.map((m) => <MaterialItem key={m.id} material={m} />)
      ) : (
        <Text style={styles.emptyText}>No chapter resources</Text>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

interface NotesTabProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ notes, onEdit, onDelete, onAdd }) => (
  <View style={{ flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
      {notes.length === 0 && (
        <Text style={styles.emptyText}>No notes yet. Click the button below to add one!</Text>
      )}
      <View style={{ height: 80 }} />
    </ScrollView>
    <TouchableOpacity style={styles.addNoteBtn} onPress={onAdd} activeOpacity={0.85}>
      <Text style={styles.addNoteText}>Add New Note</Text>
    </TouchableOpacity>
  </View>
);

export default function LectureScreen() {
  const { id, resumeLectureId } = useLocalSearchParams(); // Paper ID (e.g. 'fa', 'fr') and optional resume lecture ID
  const paperId = typeof id === 'string' ? id : '';

  const [activeTab, setActiveTab] = useState<TabName>('Lectures');
  const [loading, setLoading] = useState(true);
  const [paperDetails, setPaperDetails] = useState<PaperInfo | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [selectedLecture, setSelectedLecture] = useState<any>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoId, setActiveVideoId] = useState('');
  const [activeAccessToken, setActiveAccessToken] = useState('');
  const [materials, setMaterials] = useState<{ topic: Material[]; chapter: Material[] } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingLectureDetails, setLoadingLectureDetails] = useState(false);

  // Note Modal state
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [noteTimeStr, setNoteTimeStr] = useState('0:00');

  useEffect(() => {
    loadPaperData();
  }, [paperId]);

  const loadPaperData = async () => {
    if (!paperId) return;
    setLoading(true);
    try {
      const details = await api.getPaperDetails(paperId);
      setPaperDetails(details);
      
      const chs = await api.getLectureByPaper(paperId);
      let parsedChapters = chs;
      if (!Array.isArray(parsedChapters) && parsedChapters && typeof parsedChapters === 'object') {
        parsedChapters = (parsedChapters as any).chapters || (parsedChapters as any).data || [];
      }


      let mappedChapters: Chapter[] = [];
      if (Array.isArray(parsedChapters)) {
        mappedChapters = parsedChapters.map((ch: any, idx: number) => {
          const rawLectures = ch.lectures || ch.lessons || [];
          return {
            id: ch.id || ch._id || `ch${idx + 1}`,
            number: ch.number || ch.order || (idx + 1),
            title: ch.title || '',
            expanded: ch.expanded ?? true,
            lectures: rawLectures.map((l: any, lIdx: number) => ({
              id: l.id || l._id || `l-${idx}-${lIdx}`,
              title: l.title || '',
              duration: typeof l.duration === 'number' ? `${formatDuration(l.duration)} min` : String(l.duration || ''),
              completed: !!(l.completed || l.isCompleted),
            })),
          };
        });
      }
      setChapters(mappedChapters);

    
      let initialLecture = null;
      if (resumeLectureId && mappedChapters.length > 0) {
        for (const ch of mappedChapters) {
          const found = ch.lectures?.find((l: any) => l.id === resumeLectureId);
          if (found) {
            initialLecture = found;
            break;
          }
        }
      }
      
      if (!initialLecture) {
        initialLecture = Array.isArray(parsedChapters) ? parsedChapters[0]?.lectures?.[0] : null;
      }

      if (initialLecture) {
        handleSelectLecture(initialLecture);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLecture = async (lecture: any) => {
    setSelectedLecture(lecture);
    setLoadingLectureDetails(true);
    try {
      const videoRes = await api.getVideoByLecture(lecture.id);
      console.log(lecture.id, "idd issss")
      setActiveVideoUrl(videoRes?.videoUrl || '');
      setActiveVideoId(videoRes?.videoId || '');
      setActiveAccessToken(videoRes?.accessToken || '');

      const matRes = await api.getMaterialByLecture(lecture.id);
      const rootMat = (matRes as any)?.data || matRes;
      const topic = Array.isArray(rootMat?.topic) ? rootMat.topic : [];
      const chapter = Array.isArray(rootMat?.chapter) ? rootMat.chapter : [];
      setMaterials({ topic, chapter });

      loadNotes(lecture.id);
    } catch (err) {
      console.error('Error fetching lecture metadata:', err);
    } finally {
      setLoadingLectureDetails(false);
    }
  };

  const loadNotes = async (lectureId: string) => {
    try {
      const notesRes = await api.getNotes(lectureId);
      let notesArray = notesRes;
      if (!Array.isArray(notesArray) && notesArray && typeof notesArray === 'object') {
        notesArray = (notesArray as any).notes || (notesArray as any).data || [];
      }
      if (Array.isArray(notesArray)) {
        const mapped = notesArray.map((n: any) => ({
          id: n._id || n.id,
          timestamp: n.time || n.timestamp || '0:00',
          title: n.content || n.title || '',
          content: n.content || '',
        }));
        setNotes(mapped);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error('Error loading notes:', err);
      setNotes([]);
    }
  };

  const openAddNote = () => {
    if (!selectedLecture) {
      Alert.alert('Error', 'Please select a lecture first.');
      return;
    }
    setEditingNote(null);
    setNoteContent('');
    setNoteTimeStr(formatDuration(currentTime));
    setNoteModalVisible(true);
  };

  const openEditNote = (note: Note) => {
    setEditingNote(note);
    setNoteContent(note.content);
    setNoteTimeStr(note.timestamp);
    setNoteModalVisible(true);
  };

  const deleteNote = async (noteId: string) => {
    try {
      await api.deleteNote(noteId);
      Alert.alert('Success', 'Note deleted successfully.');
      if (selectedLecture) {
        loadNotes(selectedLecture.id);
      }
    } catch (err) {
      console.error(err);
      // Fallback local deletion
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    }
  };

  const saveNote = async () => {
    if (!noteContent.trim() || !selectedLecture) return;

    try {
      if (editingNote) {
        await api.updateNote({
          _id: editingNote.id,
          video_id: selectedLecture.id,
          time: noteTimeStr,
          content: noteContent,
        });
      } else {
        await api.createNote({
          video_id: selectedLecture.id,
          time: noteTimeStr,
          content: noteContent,
        });
      }
      setNoteModalVisible(false);
      loadNotes(selectedLecture.id);
    } catch (err) {
      console.error('Save note error:', err);
      // Local fallback
      if (editingNote) {
        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? { ...n, content: noteContent, title: noteContent } : n))
        );
      } else {
        const newNote: Note = {
          id: Date.now().toString(),
          timestamp: noteTimeStr,
          title: noteContent,
          content: noteContent,
        };
        setNotes((prev) => [newNote, ...prev]);
      }
      setNoteModalVisible(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading course details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        {(activeVideoUrl || (activeVideoId && activeAccessToken)) ? (
          <VideoPlayer
            key={activeVideoId || activeVideoUrl}
            uri={activeVideoUrl}
            videoId={activeVideoId}
            accessToken={activeAccessToken}
            onTimeUpdate={setCurrentTime}
          />
        ) : (
          <View style={styles.videoPlaceholder}>
            <ActivityIndicator size="small" color={Colors.white} />
          </View>
        )}
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <Text style={styles.lectureTitle} numberOfLines={2}>
            {selectedLecture?.title || 'Loading Lecture...'}
          </Text>
          <View style={styles.titleActions}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="heart-outline" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="arrow-down-circle-outline" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subtitleRow}>
          <FABadge code={paperId.toUpperCase() || 'FA'} />
          <Text style={styles.subtitleText}>{paperDetails?.paper || 'Financial accounting'}</Text>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {loadingLectureDetails ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <>
            {activeTab === 'Lectures' && (
              <LecturesTab
                chapters={chapters}
                activeLectureId={selectedLecture?.id}
                onSelectLecture={handleSelectLecture}
              />
            )}
            {activeTab === 'Overview' && <OverviewTab paperInfo={paperDetails} />}
            {activeTab === 'Materials' && <MaterialsTab materials={materials} />}
            {activeTab === 'Notes' && (
              <NotesTab
                notes={notes}
                onEdit={openEditNote}
                onDelete={deleteNote}
                onAdd={openAddNote}
              />
            )}
          </>
        )}
      </View>

      {/* Back Button (floating) */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={20} color={Colors.white} />
      </TouchableOpacity>

      {/* Note Modal */}
      <Modal
        visible={noteModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalHeader}>
            <View style={styles.timestampBadge}>
              <Text style={styles.timestampText}>{noteTimeStr}</Text>
            </View>
          </View>
          <TextInput
            style={styles.noteInput}
            multiline
            placeholder="Type your note here..."
            placeholderTextColor={Colors.textTertiary}
            value={noteContent}
            onChangeText={setNoteContent}
            autoFocus
          />
          <TouchableOpacity style={styles.saveNoteBtn} onPress={saveNote} activeOpacity={0.85}>
            <Text style={styles.saveNoteText}>Save Note</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  videoContainer: {
    width: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  lectureTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  titleActions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 2,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  faBadge: {
    backgroundColor: Colors.borderLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  faBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  subtitleText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  tabContent: {
    flex: 1,
  },
  searchRow: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  overviewContent: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
  },
  overviewSection: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '400',
    flex: 1,
  },
  bulletItem: {
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 2,
  },
  descText: {
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  materialSection: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  addNoteBtn: {
    margin: 16,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.card,
  },
  addNoteText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.base,
  },
  modalHeader: {
    marginBottom: 16,
  },
  timestampBadge: {
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  timestampText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  noteInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  saveNoteBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  saveNoteText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  videoPlaceholder: {
    height: 220,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 13,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
  },
});
