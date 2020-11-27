import React, {useState, useCallback, useContext} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {MainStackNavigator} from './navigators/MainStackNavigator';

import {SplashScreen} from './screens/Splash/SplashScreen';

import {lightTheme} from './themes/lightTheme';
import {darkTheme} from './themes/darkTheme';
import {ThemeContext} from './contexts/ThemeContext';

const RootStack = createStackNavigator();

export default function () {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const switchTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

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
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
