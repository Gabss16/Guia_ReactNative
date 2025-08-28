import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Páginas
import HomeScreen from '../pages/Home';
import ProductsScreen from '../pages/ViewProduct';
import ProfileScreen from '../pages/AddProduct';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta header para más limpieza
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Products') iconName = 'cube';
          else if (route.name === 'Add') iconName = 'add';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000ff',
       
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 25,
          right: 25,
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 30,
          height: 60,
          
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Add" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
