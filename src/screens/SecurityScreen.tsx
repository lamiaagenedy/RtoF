import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const SecurityScreen = ({ route }: any) => {
  const { projectId } = route.params;

  const securityStatus = {
    overallStatus: 'secure',
    cameras: 8,
    camerasActive: 7,
    alarms: 4,
    alarmsActive: 4,
    guards: 2,
    guardsOnDuty: 2,
  };

  const alerts = [
    {
      id: '1',
      type: 'warning',
      title: 'Camera Offline',
      description: 'Camera #3 (East Gate) is not responding',
      time: '15 mins ago',
    },
    {
      id: '2',
      type: 'info',
      title: 'Guard Check-in',
      description: 'Night shift guard checked in',
      time: '1 hour ago',
    },
    {
      id: '3',
      type: 'success',
      title: 'System Update',
      description: 'Security system updated successfully',
      time: '3 hours ago',
    },
  ];

  const cameras = [
    { id: '1', name: 'Main Entrance', status: 'active', location: 'North Gate' },
    { id: '2', name: 'Parking Area', status: 'active', location: 'West Side' },
    { id: '3', name: 'East Gate', status: 'offline', location: 'East Gate' },
    { id: '4', name: 'Building Lobby', status: 'active', location: 'Ground Floor' },
  ];

  const StatusCard = ({ icon, title, value, status, color }: any) => (
    <View style={[styles.statusCard, { borderLeftColor: color }]}>
      <View style={[styles.statusIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={28} color={color} />
      </View>
      <View style={styles.statusInfo}>
        <Text style={styles.statusTitle}>{title}</Text>
        <Text style={styles.statusValue}>{value}</Text>
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    </View>
  );

  const AlertCard = ({ alert }: any) => (
    <View style={styles.alertCard}>
      <View style={[styles.alertIcon, { backgroundColor: getAlertColor(alert.type) + '20' }]}>
        <Icon name={getAlertIcon(alert.type)} size={20} color={getAlertColor(alert.type)} />
      </View>
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{alert.title}</Text>
        <Text style={styles.alertDescription}>{alert.description}</Text>
        <Text style={styles.alertTime}>{alert.time}</Text>
      </View>
    </View>
  );

  const CameraCard = ({ camera }: any) => (
    <View style={styles.cameraCard}>
      <View style={styles.cameraInfo}>
        <View
          style={[
            styles.cameraStatusDot,
            {
              backgroundColor: camera.status === 'active' ? colors.success : colors.error,
            },
          ]}
        />
        <View style={styles.cameraDetails}>
          <Text style={styles.cameraName}>{camera.name}</Text>
          <Text style={styles.cameraLocation}>
            <Icon name="map-marker" size={12} color={colors.textSecondary} />
            {' ' + camera.location}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.cameraButton}>
        <Icon name="video" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Overall Status */}
      <View style={styles.overallStatus}>
        <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
          <Icon name="shield-check" size={48} color={colors.success} />
        </View>
        <Text style={styles.overallStatusText}>System Secure</Text>
        <Text style={styles.overallStatusSubtext}>All security systems operational</Text>
      </View>

      {/* Status Cards */}
      <View style={styles.statusGrid}>
        <StatusCard
          icon="cctv"
          title="Cameras"
          value={`${securityStatus.camerasActive}/${securityStatus.cameras}`}
          status="Active"
          color={colors.primary}
        />
        <StatusCard
          icon="bell-ring"
          title="Alarms"
          value={`${securityStatus.alarmsActive}/${securityStatus.alarms}`}
          status="Armed"
          color={colors.accent}
        />
      </View>
      <View style={styles.statusGrid}>
        <StatusCard
          icon="account-hard-hat"
          title="Guards"
          value={`${securityStatus.guardsOnDuty}/${securityStatus.guards}`}
          status="On Duty"
          color={colors.info}
        />
        <StatusCard
          icon="shield-check"
          title="Status"
          value="100%"
          status="Secure"
          color={colors.success}
        />
      </View>

      {/* Recent Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </View>

      {/* Camera List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Security Cameras</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="shield-alert" size={24} color={colors.error} />
          <Text style={styles.actionButtonText}>Emergency Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
          <Icon name="phone" size={24} color={colors.primary} />
          <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
            Call Guard
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'warning':
      return colors.warning;
    case 'info':
      return colors.info;
    case 'success':
      return colors.success;
    case 'error':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return 'alert';
    case 'info':
      return 'information';
    case 'success':
      return 'check-circle';
    case 'error':
      return 'alert-circle';
    default:
      return 'information';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overallStatus: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.small,
  },
  statusBadge: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  overallStatusText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  overallStatusSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusGrid: {
    flexDirection: 'row',
    padding: spacing.sm,
  },
  statusCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.sm,
    borderLeftWidth: 4,
    ...shadows.small,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  alertDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  alertTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cameraCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  cameraInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cameraStatusDot: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.round,
    marginRight: spacing.md,
  },
  cameraDetails: {
    flex: 1,
  },
  cameraName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cameraLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsSection: {
    padding: spacing.md,
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: colors.error,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  actionButtonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
    marginLeft: spacing.sm,
  },
  actionButtonTextSecondary: {
    color: colors.primary,
  },
});

export default SecurityScreen;
