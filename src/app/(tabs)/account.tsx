import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { getToken, setToken } from '../../utils/auth';

export default function AccountScreen() {
  const [token, setTokenState] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const activeToken = await getToken();
    setTokenState(activeToken);
  };

  const handleSave = async () => {
    await setToken(token);
    setIsEditing(false);
    Alert.alert('Success', 'Auth token updated successfully.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account</Text>
          </View>
          
          <View style={styles.profileSection}>
            <Ionicons name="person-circle" size={80} color={Colors.primary} />
            <Text style={styles.name}>Student User</Text>
            <Text style={styles.email}>student@elance.com</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active API Settings</Text>
            <Text style={styles.infoText}>
              Authentication Bearer Token configured for live calls to https://lmsb.elancelearning.com
            </Text>

            <View style={styles.tokenContainer}>
              <Text style={styles.label}>Bearer Authorization Token</Text>
              <View style={styles.viewRow}>
                <Text style={styles.tokenText} numberOfLines={1}>
                  {token || 'No token configured'}
                </Text>
                <View style={styles.editBtn}>
                  <Ionicons name="lock-closed" size={16} color={Colors.textSecondary} />
                  <Text style={styles.editBtnText}>Locked</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 20,
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  tokenContainer: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tokenText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginRight: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.primary,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});

