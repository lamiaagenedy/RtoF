import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';
import { useProjectStore } from '../store/projectStore';

const { width } = Dimensions.get('window');
const tabWidth = (width - spacing.md * 2) / 4;

const ProjectDetailScreen = ({ route, navigation }: any) => {
  const { projectId } = route.params;
  const { projects } = useProjectStore();
  const project = projects.find((p) => p.id === projectId);
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found</Text>
      </View>
    );
  }

  const Tab = ({ label, value, icon }: any) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === value && styles.tabActive]}
      onPress={() => setActiveTab(value)}
    >
      <Icon
        name={icon}
        size={20}
        color={activeTab === value ? colors.primary : colors.textSecondary}
      />
      <Text style={[styles.tabText, activeTab === value && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const InfoItem = ({ icon, label, value }: any) => (
    <View style={styles.infoItem}>
      <Icon name={icon} size={20} color={colors.primary} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const ActionCard = ({ icon, title, color, onPress }: any) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImage}>
        <Icon name="office-building" size={64} color={colors.surface} />
        <View style={styles.headerOverlay}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectSubtitle}>{project.location}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Tab label="Overview" value="overview" icon="information" />
        <Tab label="Tasks" value="tasks" icon="format-list-checks" />
        <Tab label="Team" value="team" icon="account-group" />
        <Tab label="Files" value="files" icon="folder" />
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' && (
          <View>
            {/* Status Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Project Status</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(project.status) + '20' },
                  ]}
                >
                  <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                    {project.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Overall Progress</Text>
                  <Text style={styles.progressPercentage}>{project.progress}%</Text>
                </View>
                <View style={styles.progressBarLarge}>
                  <View style={[styles.progressFillLarge, { width: `${project.progress}%` }]} />
                </View>
              </View>
            </View>

            {/* Project Info */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Project Information</Text>
              <InfoItem icon="home-city" label="Type" value={project.type} />
              <InfoItem icon="calendar" label="Start Date" value={project.startDate} />
              <InfoItem icon="calendar-check" label="End Date" value={project.endDate} />
              <InfoItem icon="account" label="Owner" value={project.owner} />
              <InfoItem icon="currency-usd" label="Budget" value={project.budget} />
            </View>

            {/* Quick Actions */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quick Actions</Text>
              <View style={styles.actionsGrid}>
                <ActionCard
                  icon="format-list-checks"
                  title="Tasks"
                  color={colors.primary}
                  onPress={() => navigation.navigate('Tasks', { projectId: project.id })}
                />
                <ActionCard
                  icon="shield-check"
                  title="Security"
                  color={colors.error}
                  onPress={() => navigation.navigate('Security', { projectId: project.id })}
                />
                <ActionCard
                  icon="tree"
                  title="Landscape"
                  color={colors.success}
                  onPress={() => navigation.navigate('Landscape', { projectId: project.id })}
                />
                <ActionCard
                  icon="map-marker"
                  title="Location"
                  color={colors.info}
                  onPress={() => navigation.navigate('Map')}
                />
                <ActionCard icon="camera" title="Photos" color={colors.accent} />
                <ActionCard icon="file-document" title="Documents" color={colors.primary} />
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recent Activity</Text>
              <ActivityItem
                icon="check-circle"
                text="Foundation completed"
                time="2 hours ago"
                color={colors.success}
              />
              <ActivityItem
                icon="camera"
                text="3 new photos added"
                time="5 hours ago"
                color={colors.info}
              />
              <ActivityItem
                icon="alert"
                text="Weather alert issued"
                time="1 day ago"
                color={colors.warning}
              />
            </View>
          </View>
        )}

        {activeTab === 'tasks' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tasks</Text>
            <Text style={styles.emptyText}>Navigate to Tasks screen for full details</Text>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => navigation.navigate('Tasks', { projectId: project.id })}
            >
              <Text style={styles.fullButtonText}>View All Tasks</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'team' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Team Members</Text>
            <TeamMember name="John Smith" role="Project Manager" />
            <TeamMember name="Sarah Johnson" role="Lead Architect" />
            <TeamMember name="Mike Brown" role="Site Engineer" />
            <TeamMember name="Emily Davis" role="Interior Designer" />
          </View>
        )}

        {activeTab === 'files' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Project Files</Text>
            <FileItem name="Blueprint_v2.pdf" size="2.4 MB" />
            <FileItem name="Site_Photos.zip" size="15.7 MB" />
            <FileItem name="Contract.pdf" size="1.2 MB" />
            <FileItem name="Specifications.docx" size="856 KB" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const ActivityItem = ({ icon, text, time, color }: any) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: color + '20' }]}>
      <Icon name={icon} size={16} color={color} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityText}>{text}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const TeamMember = ({ name, role }: any) => (
  <View style={styles.teamMember}>
    <View style={styles.teamAvatar}>
      <Icon name="account" size={24} color={colors.surface} />
    </View>
    <View style={styles.teamInfo}>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamRole}>{role}</Text>
    </View>
    <TouchableOpacity>
      <Icon name="phone" size={20} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

const FileItem = ({ name, size }: any) => (
  <View style={styles.fileItem}>
    <Icon name="file-document" size={24} color={colors.primary} />
    <View style={styles.fileInfo}>
      <Text style={styles.fileName}>{name}</Text>
      <Text style={styles.fileSize}>{size}</Text>
    </View>
    <TouchableOpacity>
      <Icon name="download" size={20} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

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
  headerImage: {
    height: 180,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  projectSubtitle: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.9,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
    ...shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarLarge: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  progressFillLarge: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  infoItem: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  actionCard: {
    width: (width - spacing.md * 4) / 3,
    alignItems: 'center',
    padding: spacing.sm,
    margin: spacing.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: spacing.lg,
  },
  fullButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  fullButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  teamAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  teamRole: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  fileSize: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ProjectDetailScreen;
