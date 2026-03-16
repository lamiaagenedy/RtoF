import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../theme/theme';
import { useProjectStore } from '../store/projectStore';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }: any) => {
  const { projects } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
        {projects.map((project, index) => (
          <Marker
            key={project.id}
            coordinate={{
              latitude: 37.78825 + index * 0.05,
              longitude: -122.4324 + index * 0.05,
            }}
            onPress={() => setSelectedProject(project)}
          >
            <View style={styles.markerContainer}>
              <Icon name="map-marker" size={40} color={colors.primary} />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedProject && (
        <View style={styles.infoCard}>
          <Text style={styles.projectName}>{selectedProject.name}</Text>
          <Text style={styles.projectLocation}>{selectedProject.location}</Text>
          <Text style={styles.projectStatus}>Status: {selectedProject.status}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
  markerContainer: {
    alignItems: 'center',
  },
  infoCard: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginBottom: spacing.xs,
  },
  projectStatus: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default MapScreen;
