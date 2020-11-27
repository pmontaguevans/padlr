import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {MainStackNavigator} from './navigators/MainStackNavigator';

import {SplashScreen} from './screens/Splash/SplashScreen';

const RootStack = createStackNavigator();

export default function () {
  const state = {
    loading: false,
    user: true,
  };

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return state.user ? (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    ) : (
      <RootStack.Screen name={'MainStack'} />
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {renderScreens()}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
