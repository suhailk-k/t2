import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing } from '../constants/theme';
import { Material } from '../types';

interface Props {
  material: Material;
}

export const MaterialItem: React.FC<Props> = ({ material }) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <View style={styles.pdfIcon}>
          <Text style={styles.pdfText}>PDF</Text>
        </View>
        <View style={styles.pdfPage} />
      </View>
      <Text style={styles.title} numberOfLines={2}>{material.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-down-circle-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 48,
    position: 'relative',
  },
  pdfIcon: {
    width: 36,
    height: 44,
    backgroundColor: '#EF4444',
    borderRadius: BorderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  pdfText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pdfPage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#FCA5A5',
    borderTopRightRadius: 3,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionBtn: {
    padding: 4,
  },
});
