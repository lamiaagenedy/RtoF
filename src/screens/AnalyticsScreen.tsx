import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const { width } = Dimensions.get('window');
const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const AnalyticsScreen = () => {
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 60, 75, 85, 92],
      },
    ],
  };

  const budgetData = {
    labels: ['Budget', 'Spent', 'Remaining'],
    datasets: [
      {
        data: [500000, 320000, 180000],
      },
    ],
  };

  const MetricCard = ({ icon, label, value, change, color }: any) => (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={28} color={color} />
      </View>
      <View style={styles.metricContent}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{value}</Text>
        <View style={styles.changeContainer}>
          <Icon
            name={change >= 0 ? 'trending-up' : 'trending-down'}
            size={16}
            color={change >= 0 ? colors.success : colors.error}
          />
          <Text style={[styles.changeText, { color: change >= 0 ? colors.success : colors.error }]}>
            {Math.abs(change)}%
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Key Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            icon="office-building"
            label="Active Projects"
            value="8"
            change={12.5}
            color={colors.primary}
          />
          <MetricCard
            icon="currency-usd"
            label="Total Budget"
            value="$2.5M"
            change={8.3}
            color={colors.success}
          />
        </View>
        <View style={styles.metricsGrid}>
          <MetricCard
            icon="account-group"
            label="Team Members"
            value="24"
            change={4.2}
            color={colors.info}
          />
          <MetricCard
            icon="check-circle"
            label="Completion Rate"
            value="87%"
            change={5.7}
            color={colors.accent}
          />
        </View>
      </View>

      {/* Project Progress Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Project Progress Overview</Text>
        <LineChart
          data={progressData}
          width={width - spacing.md * 4}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Budget Analysis */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Budget Analysis (in $1000s)</Text>
        <BarChart
          data={budgetData}
          width={width - spacing.md * 4}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
          fromZero
          yAxisLabel="$"
          yAxisSuffix="k"
        />
      </View>

      {/* Project Status Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Status Distribution</Text>
        <View style={styles.statusCard}>
          <StatusBar label="In Progress" value={45} color={colors.statusInProgress} />
          <StatusBar label="Completed" value={30} color={colors.statusCompleted} />
          <StatusBar label="Pending" value={15} color={colors.statusPending} />
          <StatusBar label="On Hold" value={10} color={colors.statusOnHold} />
        </View>
      </View>

      {/* Top Performing Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Projects</Text>
        <TopProject name="Downtown Complex" progress={95} rating={4.8} />
        <TopProject name="Villa Estate" progress={88} rating={4.6} />
        <TopProject name="Modern Apartments" progress={82} rating={4.5} />
      </View>

      {/* Export Button */}
      <TouchableOpacity style={styles.exportButton}>
        <Icon name="download" size={20} color={colors.surface} />
        <Text style={styles.exportButtonText}>Export Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const StatusBar = ({ label, value, color }: any) => (
  <View style={styles.statusBarContainer}>
    <View style={styles.statusBarHeader}>
      <Text style={styles.statusBarLabel}>{label}</Text>
      <Text style={styles.statusBarValue}>{value}%</Text>
    </View>
    <View style={styles.statusBarTrack}>
      <View style={[styles.statusBarFill, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const TopProject = ({ name, progress, rating }: any) => (
  <View style={styles.topProjectCard}>
    <View style={styles.topProjectInfo}>
      <Text style={styles.topProjectName}>{name}</Text>
      <View style={styles.topProjectStats}>
        <View style={styles.statItem}>
          <Icon name="progress-clock" size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>{progress}%</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="star" size={16} color={colors.accent} />
          <Text style={styles.statText}>{rating}</Text>
        </View>
      </View>
    </View>
    <Icon name="chevron-right" size={24} color={colors.textSecondary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  metricsGrid: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    ...shadows.small,
  },
  metricIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
    ...shadows.small,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  chart: {
    borderRadius: borderRadius.md,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  statusBarContainer: {
    marginBottom: spacing.md,
  },
  statusBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  statusBarLabel: {
    fontSize: 14,
    color: colors.text,
  },
  statusBarValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statusBarTrack: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  statusBarFill: {
    height: '100%',
  },
  topProjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  topProjectInfo: {
    flex: 1,
  },
  topProjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  topProjectStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  exportButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
    marginLeft: spacing.sm,
  },
});

export default AnalyticsScreen;
