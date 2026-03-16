import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const MaintenanceScreen = () => {
  const [filter, setFilter] = useState('all');

  const maintenanceTasks = [
    {
      id: '1',
      title: 'HVAC System Inspection',
      project: 'Downtown Complex',
      priority: 'high',
      dueDate: 'Mar 10, 2026',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Elevator Maintenance',
      project: 'Villa Estate',
      priority: 'medium',
      dueDate: 'Mar 15, 2026',
      status: 'scheduled',
    },
    {
      id: '3',
      title: 'Landscape Upkeep',
      project: 'Sunset Residence',
      priority: 'low',
      dueDate: 'Mar 20, 2026',
      status: 'in-progress',
    },
    {
      id: '4',
      title: 'Security System Check',
      project: 'Modern Apartments',
      priority: 'high',
      dueDate: 'Mar 12, 2026',
      status: 'pending',
    },
  ];

  const MaintenanceCard = ({ task }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleSection}>
          <Text style={styles.cardTitle}>{task.title}</Text>
          <Text style={styles.projectName}>{task.project}</Text>
        </View>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(task.priority) + '20' },
          ]}
        >
          <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
            {task.priority.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={16} color={colors.textSecondary} />
          <Text style={styles.infoText}>{task.dueDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>
            {task.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const StatCard = ({ icon, count, label, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Icon name={icon} size={28} color={color} />
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.statsSection}>
        <StatCard icon="clock-alert" count="4" label="Pending" color={colors.warning} />
        <StatCard icon="progress-clock" count="2" label="In Progress" color={colors.info} />
        <StatCard icon="check-circle" count="18" label="Completed" color={colors.success} />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <FilterButton
          label="All"
          value="all"
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Pending"
          value="pending"
          active={filter === 'pending'}
          onPress={() => setFilter('pending')}
        />
        <FilterButton
          label="Scheduled"
          value="scheduled"
          active={filter === 'scheduled'}
          onPress={() => setFilter('scheduled')}
        />
        <FilterButton
          label="In Progress"
          value="in-progress"
          active={filter === 'in-progress'}
          onPress={() => setFilter('in-progress')}
        />
      </ScrollView>

      {/* Task List */}
      <ScrollView style={styles.taskList}>
        {maintenanceTasks.map((task) => (
          <MaintenanceCard key={task.id} task={task} />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={28} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
};

const FilterButton = ({ label, value, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.filterButton, active && styles.filterButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.filterButtonText, active && styles.filterButtonTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return colors.error;
    case 'medium':
      return colors.warning;
    case 'low':
      return colors.success;
    default:
      return colors.textSecondary;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return colors.warning;
    case 'scheduled':
      return colors.info;
    case 'in-progress':
      return colors.primary;
    case 'completed':
      return colors.success;
    default:
      return colors.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statsSection: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  statCount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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
  taskList: {
    flex: 1,
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardTitleSection: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  projectName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    height: 28,
    justifyContent: 'center',
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.large,
  },
});

export default MaintenanceScreen;
