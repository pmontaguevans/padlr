import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
    </MainStack.Navigator>
  );
}
