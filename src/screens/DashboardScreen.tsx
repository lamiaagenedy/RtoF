import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';
import { useProjectStore } from '../store/projectStore';

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.md * 3) / 2;

const DashboardScreen = ({ navigation }: any) => {
  const { projects } = useProjectStore();

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === 'in-progress').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    maintenance: 12,
  };

  const StatCard = ({ icon, title, value, color, onPress }: any) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <Icon name={icon} size={32} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const QuickAction = ({ icon, title, color, onPress }: any) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={28} color={color} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome Back! 👋</Text>
        <Text style={styles.subtitle}>Here's your project overview</Text>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="office-building"
          title="Total Projects"
          value={stats.total}
          color={colors.primary}
          onPress={() => navigation.navigate('Projects')}
        />
        <StatCard icon="progress-clock" title="Active" value={stats.active} color={colors.info} />
        <StatCard
          icon="check-circle"
          title="Completed"
          value={stats.completed}
          color={colors.success}
        />
        <StatCard
          icon="tools"
          title="Maintenance"
          value={stats.maintenance}
          color={colors.warning}
          onPress={() => navigation.navigate('Maintenance')}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            icon="plus-circle"
            title="New Project"
            color={colors.primary}
            onPress={() => navigation.navigate('AddProject')}
          />
          <QuickAction
            icon="clipboard-check"
            title="Quality Check"
            color="#4CAF50"
            onPress={() => navigation.navigate('QualityChecklist')}
          />
          <QuickAction
            icon="map-marker-plus"
            title="Location"
            color={colors.success}
            onPress={() => navigation.navigate('Map')}
          />
          <QuickAction icon="shield-check" title="Security" color={colors.error} />
        </View>
      </View>

      {/* Recent Projects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {projects.slice(0, 3).map((project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            onPress={() => navigation.navigate('ProjectDetail', { projectId: project.id })}
          >
            <View style={styles.projectHeader}>
              <View>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectLocation}>
                  <Icon name="map-marker" size={14} color={colors.textSecondary} />
                  {' ' + project.location}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(project.status) + '20' },
                ]}
              >
                <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                  {project.status}
                </Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>Progress</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{project.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <View style={styles.alertCard}>
          <Icon name="alert-circle" size={24} color={colors.warning} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Maintenance Due</Text>
            <Text style={styles.alertText}>Villa Estate requires HVAC inspection</Text>
          </View>
        </View>
        <View style={styles.alertCard}>
          <Icon name="information" size={24} color={colors.info} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Weather Warning</Text>
            <Text style={styles.alertText}>Heavy rain expected at Downtown Complex</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  header: {
    padding: spacing.md,
    backgroundColor: colors.primary,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    marginTop: -spacing.lg,
  },
  statCard: {
    width: cardWidth,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.sm,
    borderLeftWidth: 4,
    ...shadows.medium,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  statTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  quickAction: {
    width: cardWidth,
    alignItems: 'center',
    padding: spacing.md,
    margin: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.small,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  projectCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  projectLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    height: 28,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: spacing.sm,
    width: 60,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.sm,
    width: 40,
    textAlign: 'right',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  alertContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  alertText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default DashboardScreen;
