import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const App = () => {

  const BottomTab=()=>{

    return(
      <BottomTabs.Navigator>
        <BottomTabs.Screen name='Login'></BottomTabs.Screen>
        <BottomTabs.Screen name='Register' component={}></BottomTabs.Screen>
      </BottomTabs.Navigator>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={BottomTab}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({});

export default App;
