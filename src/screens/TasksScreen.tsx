import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const TasksScreen = ({ route }: any) => {
  const { projectId } = route.params;
  const [filter, setFilter] = useState('all');

  const tasks = [
    {
      id: '1',
      title: 'Foundation Inspection',
      description: 'Complete structural foundation inspection',
      status: 'completed',
      priority: 'high',
      assignee: 'John Smith',
      dueDate: 'Mar 5, 2026',
    },
    {
      id: '2',
      title: 'Electrical Wiring',
      description: 'Install electrical wiring on 2nd floor',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: 'Mar 10, 2026',
    },
    {
      id: '3',
      title: 'Interior Paint',
      description: 'Paint walls in living areas',
      status: 'pending',
      priority: 'medium',
      assignee: 'Mike Brown',
      dueDate: 'Mar 15, 2026',
    },
    {
      id: '4',
      title: 'Landscaping',
      description: 'Design and implement garden layout',
      status: 'pending',
      priority: 'low',
      assignee: 'Emily Davis',
      dueDate: 'Mar 20, 2026',
    },
  ];

  const TaskCard = ({ task }: any) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <TouchableOpacity
          style={[styles.checkbox, task.status === 'completed' && styles.checkboxCompleted]}
        >
          {task.status === 'completed' && <Icon name="check" size={16} color={colors.surface} />}
        </TouchableOpacity>
        <View style={styles.taskInfo}>
          <Text
            style={[styles.taskTitle, task.status === 'completed' && styles.taskTitleCompleted]}
          >
            {task.title}
          </Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
        <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
      </View>
      <View style={styles.taskFooter}>
        <View style={styles.assigneeContainer}>
          <View style={styles.assigneeAvatar}>
            <Icon name="account" size={16} color={colors.surface} />
          </View>
          <Text style={styles.assigneeText}>{task.assignee}</Text>
        </View>
        <View style={styles.dueDateContainer}>
          <Icon name="calendar" size={14} color={colors.textSecondary} />
          <Text style={styles.dueDateText}>{task.dueDate}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsBar}>
        <StatItem label="Total" value={tasks.length} color={colors.primary} />
        <StatItem
          label="Completed"
          value={tasks.filter((t) => t.status === 'completed').length}
          color={colors.success}
        />
        <StatItem
          label="In Progress"
          value={tasks.filter((t) => t.status === 'in-progress').length}
          color={colors.info}
        />
        <StatItem
          label="Pending"
          value={tasks.filter((t) => t.status === 'pending').length}
          color={colors.warning}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <FilterButton
          label="All Tasks"
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Completed"
          active={filter === 'completed'}
          onPress={() => setFilter('completed')}
        />
        <FilterButton
          label="In Progress"
          active={filter === 'in-progress'}
          onPress={() => setFilter('in-progress')}
        />
        <FilterButton
          label="Pending"
          active={filter === 'pending'}
          onPress={() => setFilter('pending')}
        />
      </ScrollView>

      {/* Tasks List */}
      <ScrollView style={styles.tasksList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={28} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
};

const StatItem = ({ label, value, color }: any) => (
  <View style={styles.statItem}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const FilterButton = ({ label, active, onPress }: any) => (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.md,
    ...shadows.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
  tasksList: {
    flex: 1,
    padding: spacing.md,
  },
  taskCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  taskHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  taskDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.round,
    marginLeft: spacing.sm,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigneeAvatar: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  assigneeText: {
    fontSize: 14,
    color: colors.text,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
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

export default TasksScreen;
