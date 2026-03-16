import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const AddProjectScreen = ({ navigation }: any) => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('residential');
  const [budget, setBudget] = useState('');
  const [owner, setOwner] = useState('');

  const FormInput = ({ label, value, onChangeText, placeholder, icon }: any) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon name={icon} size={20} color={colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
        />
      </View>
    </View>
  );

  const TypeButton = ({ label, value, selected }: any) => (
    <TouchableOpacity
      style={[styles.typeButton, selected && styles.typeButtonSelected]}
      onPress={() => setType(value)}
    >
      <Text style={[styles.typeButtonText, selected && styles.typeButtonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const handleSubmit = () => {
    // Add project logic here
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Icon name="office-building" size={64} color={colors.primary} />
          <Text style={styles.headerTitle}>Create New Project</Text>
          <Text style={styles.headerSubtitle}>Fill in the details to add a new project</Text>
        </View>

        <FormInput
          label="Project Name"
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Enter project name"
          icon="text"
        />

        <FormInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter project location"
          icon="map-marker"
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Project Type</Text>
          <View style={styles.typeContainer}>
            <TypeButton label="Residential" value="residential" selected={type === 'residential'} />
            <TypeButton label="Commercial" value="commercial" selected={type === 'commercial'} />
            <TypeButton label="Industrial" value="industrial" selected={type === 'industrial'} />
          </View>
        </View>

        <FormInput
          label="Budget"
          value={budget}
          onChangeText={setBudget}
          placeholder="Enter budget"
          icon="currency-usd"
        />

        <FormInput
          label="Owner Name"
          value={owner}
          onChangeText={setOwner}
          placeholder="Enter owner name"
          icon="account"
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Icon name="calendar" size={20} color={colors.textSecondary} />
            <Text style={styles.dateButtonText}>Select start date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Icon name="calendar-check" size={20} color={colors.textSecondary} />
            <Text style={styles.dateButtonText}>Select end date</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="check" size={24} color={colors.surface} />
          <Text style={styles.submitButtonText}>Create Project</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.text,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  typeButtonTextSelected: {
    color: colors.surface,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadows.medium,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
    marginLeft: spacing.sm,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});

export default AddProjectScreen;
