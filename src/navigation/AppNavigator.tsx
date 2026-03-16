import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import MapScreen from '../screens/MapScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddProjectScreen from '../screens/AddProjectScreen';
import TasksScreen from '../screens/TasksScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import SecurityScreen from '../screens/SecurityScreen';
import LandscapeScreen from '../screens/LandscapeScreen';
import QualityChecklistScreen from '../screens/QualityChecklistScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  ProjectDetail: { projectId: string };
  AddProject: undefined;
  Tasks: { projectId: string };
  Security: { projectId: string };
  Landscape: { projectId: string };
  QualityChecklist: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Projects: undefined;
  Map: undefined;
  Maintenance: undefined;
  Analytics: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="view-dashboard" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="office-building" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="map-marker" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="tools" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="chart-line" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: 'Project Details' }}
      />
      <Stack.Screen
        name="AddProject"
        component={AddProjectScreen}
        options={{ title: 'Add New Project' }}
      />
      <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'Project Tasks' }} />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{ title: 'Security Monitoring' }}
      />
      <Stack.Screen
        name="Landscape"
        component={LandscapeScreen}
        options={{ title: 'Landscape Planning' }}
      />
      <Stack.Screen
        name="QualityChecklist"
        component={QualityChecklistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
