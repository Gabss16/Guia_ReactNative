import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navagation/TabNavegator';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
