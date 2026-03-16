import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';
import { useProjectStore } from '../store/projectStore';

const ProjectsScreen = ({ navigation }: any) => {
  const { projects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  const FilterButton = ({ label, value }: any) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterButtonText, filter === value && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const ProjectCard = ({ project }: any) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate('ProjectDetail', { projectId: project.id })}
    >
      <View style={styles.projectImagePlaceholder}>
        <Icon name="office-building" size={48} color={colors.primary} />
      </View>
      <View style={styles.projectInfo}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectName}>{project.name}</Text>
          <View
            style={[styles.statusIndicator, { backgroundColor: getStatusColor(project.status) }]}
          />
        </View>
        <Text style={styles.projectLocation}>
          <Icon name="map-marker" size={14} color={colors.textSecondary} />
          {' ' + project.location}
        </Text>
        <Text style={styles.projectType}>
          <Icon name="home-city" size={14} color={colors.textSecondary} />
          {' ' + project.type}
        </Text>
        <View style={styles.projectFooter}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{project.progress}%</Text>
          </View>
          <View style={styles.projectActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Tasks', { projectId: project.id })}
            >
              <Icon name="format-list-checks" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="camera" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProject')}
        >
          <Icon name="plus" size={24} color={colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <FilterButton label="All" value="all" />
        <FilterButton label="In Progress" value="in-progress" />
        <FilterButton label="Completed" value="completed" />
        <FilterButton label="Pending" value="pending" />
        <FilterButton label="On Hold" value="on-hold" />
      </ScrollView>

      {/* Projects List */}
      <ScrollView style={styles.projectsList}>
        <Text style={styles.resultsText}>{filteredProjects.length} projects found</Text>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ScrollView>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-progress':
      return colors.statusInProgress;
    case 'completed':
      return colors.statusCompleted;
    case 'pending':
      return colors.statusPending;
    case 'on-hold':
      return colors.statusOnHold;
    default:
      return colors.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: colors.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  filtersContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
    backgroundColor: colors.background,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.surface,
  },
  projectsList: {
    flex: 1,
    padding: spacing.md,
  },
  resultsText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  projectCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.medium,
  },
  projectImagePlaceholder: {
    height: 140,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectInfo: {
    padding: spacing.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.round,
    marginLeft: spacing.sm,
  },
  projectLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  projectType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginRight: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    width: 40,
  },
  projectActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
});

export default ProjectsScreen;
