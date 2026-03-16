import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const LandscapeScreen = ({ route }: any) => {
  const { projectId } = route.params;
  const [activeTab, setActiveTab] = useState('design');

  const landscapeFeatures = [
    {
      id: '1',
      name: 'Front Garden',
      type: 'Garden',
      status: 'completed',
      area: '250 sq ft',
    },
    {
      id: '2',
      name: 'Swimming Pool',
      type: 'Water Feature',
      status: 'in-progress',
      area: '400 sq ft',
    },
    {
      id: '3',
      name: 'Walking Path',
      type: 'Hardscape',
      status: 'pending',
      area: '180 sq ft',
    },
    {
      id: '4',
      name: 'Patio Area',
      type: 'Outdoor Living',
      status: 'completed',
      area: '320 sq ft',
    },
  ];

  const plants = [
    { id: '1', name: 'Oak Trees', quantity: 4, status: 'planted' },
    { id: '2', name: 'Rose Bushes', quantity: 12, status: 'pending' },
    { id: '3', name: 'Grass Lawn', quantity: 1, status: 'in-progress' },
    { id: '4', name: 'Flower Beds', quantity: 3, status: 'planted' },
  ];

  const FeatureCard = ({ feature }: any) => (
    <View style={styles.featureCard}>
      <View style={styles.featurePlaceholder}>
        <Icon name={getFeatureIcon(feature.type)} size={32} color={colors.primary} />
      </View>
      <View style={styles.featureInfo}>
        <View style={styles.featureHeader}>
          <Text style={styles.featureName}>{feature.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(feature.status) }]} />
        </View>
        <Text style={styles.featureType}>{feature.type}</Text>
        <View style={styles.featureFooter}>
          <View style={styles.areaContainer}>
            <Icon name="ruler-square" size={14} color={colors.textSecondary} />
            <Text style={styles.areaText}>{feature.area}</Text>
          </View>
          <View
            style={[styles.statusBadge, { backgroundColor: getStatusColor(feature.status) + '20' }]}
          >
            <Text style={[styles.statusText, { color: getStatusColor(feature.status) }]}>
              {feature.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const PlantItem = ({ plant }: any) => (
    <View style={styles.plantItem}>
      <View style={styles.plantIcon}>
        <Icon name="flower" size={24} color={colors.success} />
      </View>
      <View style={styles.plantInfo}>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantQuantity}>Quantity: {plant.quantity}</Text>
      </View>
      <View style={[styles.plantStatus, { backgroundColor: getStatusColor(plant.status) + '20' }]}>
        <Text style={[styles.plantStatusText, { color: getStatusColor(plant.status) }]}>
          {plant.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.statCard}>
          <Icon name="tree" size={32} color={colors.success} />
          <Text style={styles.statValue}>16</Text>
          <Text style={styles.statLabel}>Features</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="flower" size={32} color={colors.accent} />
          <Text style={styles.statValue}>32</Text>
          <Text style={styles.statLabel}>Plants</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="chart-line" size={32} color={colors.info} />
          <Text style={styles.statValue}>78%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'design' && styles.tabActive]}
          onPress={() => setActiveTab('design')}
        >
          <Text style={[styles.tabText, activeTab === 'design' && styles.tabTextActive]}>
            Design
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'plants' && styles.tabActive]}
          onPress={() => setActiveTab('plants')}
        >
          <Text style={[styles.tabText, activeTab === 'plants' && styles.tabTextActive]}>
            Plants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'maintenance' && styles.tabActive]}
          onPress={() => setActiveTab('maintenance')}
        >
          <Text style={[styles.tabText, activeTab === 'maintenance' && styles.tabTextActive]}>
            Maintenance
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'design' && (
          <View>
            <View style={styles.designPreview}>
              <Icon name="image" size={64} color={colors.textSecondary} />
              <Text style={styles.previewText}>Landscape Design Preview</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Icon name="upload" size={20} color={colors.primary} />
                <Text style={styles.uploadButtonText}>Upload Design</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Landscape Features</Text>
              {landscapeFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </View>
          </View>
        )}

        {activeTab === 'plants' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plant List</Text>
            {plants.map((plant) => (
              <PlantItem key={plant.id} plant={plant} />
            ))}
          </View>
        )}

        {activeTab === 'maintenance' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maintenance Schedule</Text>
            <MaintenanceCard title="Lawn Mowing" frequency="Weekly" nextDate="Mar 10, 2026" />
            <MaintenanceCard title="Plant Watering" frequency="Daily" nextDate="Mar 8, 2026" />
            <MaintenanceCard title="Fertilization" frequency="Monthly" nextDate="Mar 20, 2026" />
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={28} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
};

const MaintenanceCard = ({ title, frequency, nextDate }: any) => (
  <View style={styles.maintenanceCard}>
    <View style={styles.maintenanceIcon}>
      <Icon name="calendar-check" size={24} color={colors.primary} />
    </View>
    <View style={styles.maintenanceInfo}>
      <Text style={styles.maintenanceTitle}>{title}</Text>
      <View style={styles.maintenanceDetails}>
        <Text style={styles.maintenanceFrequency}>{frequency}</Text>
        <Text style={styles.maintenanceDot}>•</Text>
        <Text style={styles.maintenanceDate}>Next: {nextDate}</Text>
      </View>
    </View>
  </View>
);

const getFeatureIcon = (type: string) => {
  switch (type) {
    case 'Garden':
      return 'flower';
    case 'Water Feature':
      return 'pool';
    case 'Hardscape':
      return 'road-variant';
    case 'Outdoor Living':
      return 'table-chair';
    default:
      return 'tree';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
    case 'planted':
      return colors.success;
    case 'in-progress':
      return colors.info;
    case 'pending':
      return colors.warning;
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
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.md,
    ...shadows.small,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  designPreview: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.small,
  },
  previewText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  featurePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureInfo: {
    flex: 1,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.round,
  },
  featureType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  featureFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  plantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  plantIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.success + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  plantQuantity: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  plantStatus: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  plantStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  maintenanceCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  maintenanceIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  maintenanceInfo: {
    flex: 1,
  },
  maintenanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  maintenanceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maintenanceFrequency: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  maintenanceDot: {
    fontSize: 14,
    color: colors.textSecondary,
    marginHorizontal: spacing.sm,
  },
  maintenanceDate: {
    fontSize: 14,
    color: colors.primary,
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

export default LandscapeScreen;
