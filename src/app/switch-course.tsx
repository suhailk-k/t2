import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, Shadow, Spacing } from '../constants/theme';
import { api } from '../services/api';

interface CourseOption {
  id: string;
  label: string;
  description: string;
  programId: string;
}

const DEFAULT_OPTIONS: CourseOption[] = [
  { id: 'acca', label: 'ACCA', description: 'Association of Chartered Certified Accountants', programId: '69d881f3af5f58c3caa3a4ab' },
  { id: 'cma', label: 'CMA', description: 'Cost & Management Accounting', programId: '69d88200af5f58c3caa3a4b0' },
  { id: 'ca', label: 'CA', description: 'Chartered Accountancy', programId: '69d8820caf5f58c3caa3a4b1' },
];

export default function SwitchCourseScreen() {
  const [selected, setSelected] = useState('acca');
  const [switching, setSwitching] = useState(false);
  const [options, setOptions] = useState<CourseOption[]>(DEFAULT_OPTIONS);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const res = await api.getHome();
      const root = (res as any)?.data || res;
      const available = root?.available_programs || root?.availablePrograms || [];

      if (Array.isArray(available) && available.length > 0) {
        const mapped = available.map((p: any) => {
          const code = p.code || p.name || '';
          let description = '';
          if (code.toUpperCase() === 'ACCA') {
            description = 'Association of Chartered Certified Accountants';
          } else if (code.toUpperCase() === 'CMA') {
            description = 'Cost & Management Accounting';
          } else if (code.toUpperCase() === 'CA') {
            description = 'Chartered Accountancy';
          } else {
            description = p.name || '';
          }

          return {
            id: code.toLowerCase(),
            label: code,
            description,
            programId: p.program_id || p.id || '',
          };
        });
        setOptions(mapped);

        // Auto-select currently active program
        const selectedProg = root?.selected_program || root?.selectedProgram;
        if (selectedProg) {
          setSelected(selectedProg.code?.toLowerCase() || selectedProg.name?.toLowerCase() || 'acca');
        }
      }
    } catch (err) {
      console.warn('Failed to load available programs:', err);
    } finally {
      setLoadingPrograms(false);
    }
  };

  const handleSelect = async (option: CourseOption) => {
    if (!option.programId) {
      Alert.alert('Error', 'Unable to switch: program ID is missing.');
      return;
    }
    setSelected(option.id);
    setSwitching(true);
    try {
      const res = await api.switchCourse(option.programId);
      Alert.alert('Success', `Switched to ${option.label} successfully.`);
      router.back();
    } catch (err) {
      console.warn('Switch course API failed:', err);
      Alert.alert(
        'Offline Mode',
        `Switched course to ${option.label} (mocked).`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } finally {
      setSwitching(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
        disabled={switching}
      >
        <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>What do you want to{'\n'}learn today?</Text>

        {loadingPrograms ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loaderText}>Loading programs...</Text>
          </View>
        ) : switching ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loaderText}>Switching course...</Text>
          </View>
        ) : null}

        {!loadingPrograms && (
          <View style={[styles.optionsList, switching && { opacity: 0.5 }]}>
            {options.map((option) => {
              const isSelected = selected === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                  onPress={() => !switching && handleSelect(option)}
                  activeOpacity={0.8}
                  disabled={switching}
                >
                  <View style={styles.optionText}>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.optionDesc, isSelected && styles.optionDescSelected]}>
                      {option.description}
                    </Text>
                  </View>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 36,
    marginBottom: 28,
  },
  optionsList: {
    gap: 14,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    ...Shadow.card,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: Colors.primary,
  },
  optionDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  optionDescSelected: {
    color: Colors.primary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loaderText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
