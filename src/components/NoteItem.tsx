import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing, Typography } from '../constants/theme';
import { Note } from '../types';

interface Props {
  note: Note;
  onEdit?: (note: Note) => void;
  onDelete?: (noteId: string) => void;
}

export const NoteItem: React.FC<Props> = ({ note, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timestampBadge}>
          <Text style={styles.timestamp}>{note.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.title}>{note.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => onEdit?.(note)} activeOpacity={0.7}>
          <Ionicons name="create-outline" size={13} color={Colors.primary} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete?.(note.id)} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={13} color={Colors.danger} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 6,
  },
  timestampBadge: {
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '400',
    marginBottom: 8,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 14,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteText: {
    fontSize: 13,
    color: Colors.danger,
    fontWeight: '500',
  },
});
