import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          switch (route.name) {
            case 'home':
              iconName = 'home-outline';
              break;
            case 'browse':
              iconName = 'search-outline';
              break;
            case 'upload':
              iconName = 'cloud-upload-outline';
              break;
            case 'downloaded':
              iconName = 'cloud-download-outline';
              break;
            case 'profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#800080',
        tabBarInactiveTintColor: '#888',
      })}
    >
  <Tabs.Screen name="home" options={{ title: 'Home', headerShown: false }} />
  <Tabs.Screen name="browse" options={{ title: 'Browse', headerShown: false }} />
  <Tabs.Screen name="upload" options={{ title: 'Upload', headerShown: false }} />
  <Tabs.Screen name="downloaded" options={{ title: 'Downloaded', headerShown: false }} />
  <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />
    </Tabs>
  );
}

export default TabsLayout;