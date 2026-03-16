import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';
import { checklistTemplate, sectionInfo, ChecklistItem } from '../data/checklistData';

const { width } = Dimensions.get('window');

const QualityChecklistScreen = ({ navigation }: any) => {
  const [checklist, setChecklist] = useState(checklistTemplate);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateRating = (
    section: keyof typeof checklistTemplate,
    itemId: string,
    rating: 0 | 50 | 75 | 80 | 85 | 90 | 100,
  ) => {
    setChecklist((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === itemId ? { ...item, rating } : item)),
    }));
  };

  const calculateSectionProgress = (items: ChecklistItem[]) => {
    if (items.length === 0) return 0;
    const totalRating = items.reduce((sum, item) => sum + item.rating, 0);
    return Math.round(totalRating / items.length);
  };

  const RatingButton = ({
    value,
    currentRating,
    onPress,
  }: {
    value: 0 | 50 | 75 | 80 | 85 | 90 | 100;
    currentRating: number;
    onPress: () => void;
  }) => {
    const isSelected = currentRating === value;
    const getRatingColor = (val: number) => {
      if (val === 0) return '#E0E0E0';
      if (val <= 50) return '#FF5252';
      if (val <= 75) return '#FF9800';
      if (val <= 85) return '#FFC107';
      if (val <= 90) return '#8BC34A';
      return '#4CAF50';
    };

    return (
      <TouchableOpacity
        style={[
          styles.ratingButton,
          isSelected && {
            backgroundColor: getRatingColor(value),
            borderColor: getRatingColor(value),
          },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.ratingButtonText, isSelected && styles.ratingButtonTextSelected]}>
          {value === 0 ? '-' : `${value}%`}
        </Text>
      </TouchableOpacity>
    );
  };

  const ChecklistItemView = ({
    item,
    section,
  }: {
    item: ChecklistItem;
    section: keyof typeof checklistTemplate;
  }) => {
    const [showRatings, setShowRatings] = useState(false);

    return (
      <View style={styles.checklistItem}>
        <TouchableOpacity
          style={styles.checklistItemHeader}
          onPress={() => setShowRatings(!showRatings)}
          activeOpacity={0.7}
        >
          <View style={styles.checklistItemLeft}>
            <View
              style={[
                styles.ratingIndicator,
                {
                  backgroundColor:
                    item.rating === 0
                      ? '#E0E0E0'
                      : item.rating <= 50
                        ? '#FF5252'
                        : item.rating <= 75
                          ? '#FF9800'
                          : item.rating <= 85
                            ? '#FFC107'
                            : item.rating <= 90
                              ? '#8BC34A'
                              : '#4CAF50',
                },
              ]}
            >
              <Text style={styles.ratingIndicatorText}>
                {item.rating === 0 ? '-' : `${item.rating}%`}
              </Text>
            </View>
            <Text style={styles.checklistItemText}>{item.task}</Text>
          </View>
          <Icon
            name={showRatings ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {showRatings && (
          <View style={styles.ratingButtonsContainer}>
            {[0, 50, 75, 80, 85, 90, 100].map((rating) => (
              <RatingButton
                key={rating}
                value={rating as 0 | 50 | 75 | 80 | 85 | 90 | 100}
                currentRating={item.rating}
                onPress={() =>
                  updateRating(section, item.id, rating as 0 | 50 | 75 | 80 | 85 | 90 | 100)
                }
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const SectionCard = ({ sectionKey }: { sectionKey: keyof typeof checklistTemplate }) => {
    const section = sectionInfo[sectionKey];
    const items = checklist[sectionKey];
    const isExpanded = expandedSections[sectionKey];
    const progress = calculateSectionProgress(items);

    return (
      <View style={[styles.sectionCard, shadows.medium]}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(sectionKey)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeaderLeft}>
            <View style={[styles.sectionIcon, { backgroundColor: section.color + '20' }]}>
              <Icon name={section.icon} size={28} color={section.color} />
            </View>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{items.length} مهام</Text>
            </View>
          </View>

          <View style={styles.sectionHeaderRight}>
            <View style={styles.progressCircle}>
              <Text
                style={[styles.progressText, { color: progress >= 85 ? '#4CAF50' : section.color }]}
              >
                {progress}%
              </Text>
            </View>
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={colors.textSecondary}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.sectionContent}>
            <View style={styles.divider} />
            {items.map((item) => (
              <ChecklistItemView key={item.id} item={item} section={sectionKey} />
            ))}
          </View>
        )}
      </View>
    );
  };

  const overallProgress = calculateSectionProgress([
    ...checklist.housekeeping,
    ...checklist.maintenance,
    ...checklist.security,
    ...checklist.landscape,
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>قائمة فحص الجودة</Text>
          <Text style={styles.headerSubtitle}>تقييم شامل للموقع</Text>
        </View>
      </View>

      {/* Overall Progress Card */}
      <View style={[styles.overallCard, shadows.large]}>
        <View style={styles.overallContent}>
          <Icon name="clipboard-check" size={40} color={colors.primary} />
          <View style={styles.overallInfo}>
            <Text style={styles.overallLabel}>التقييم الإجمالي</Text>
            <Text style={styles.overallPercentage}>{overallProgress}%</Text>
          </View>
        </View>
        <View style={styles.overallProgressBar}>
          <View
            style={[
              styles.overallProgressFill,
              {
                width: `${overallProgress}%`,
                backgroundColor:
                  overallProgress >= 85 ? '#4CAF50' : overallProgress >= 70 ? '#FFC107' : '#FF9800',
              },
            ]}
          />
        </View>
      </View>

      {/* Sections */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SectionCard sectionKey="housekeeping" />
        <SectionCard sectionKey="maintenance" />
        <SectionCard sectionKey="security" />
        <SectionCard sectionKey="landscape" />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  overallCard: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  overallContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  overallInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  overallLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  overallPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  overallProgressBar: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    borderRadius: borderRadius.round,
  },
  scrollView: {
    flex: 1,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sectionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressCircle: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  sectionContent: {
    paddingBottom: spacing.sm,
  },
  checklistItem: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  checklistItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  checklistItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  ratingIndicator: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  ratingIndicatorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.surface,
  },
  checklistItemText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  ratingButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    paddingTop: 0,
    gap: spacing.xs,
  },
  ratingButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minWidth: 52,
    alignItems: 'center',
  },
  ratingButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  ratingButtonTextSelected: {
    color: colors.surface,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default QualityChecklistScreen;
