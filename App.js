import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { SignInScreen } from './src/screens/SignInScreen';
import { SubmitReportScreen } from './src/screens/SubmitReportScreen';
import { ReportMainScreen } from './src/screens/ReportMainScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { SettingsMainScreen } from './src/screens/SettingsMainScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { TrackrIcon, ICON_SIZES, ICON_TYPES } from './src/screens/Icons';

const AppStack = createStackNavigator();
const ReportStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ReportStackContainer () {
  return (
    <ReportStack.Navigator 
      initialRouteName="ReportMain"   
    >
      <ReportStack.Screen 
        name="ReportMain" 
        component={ReportMainScreen}
        options={{headerShown: false}} />
      <ReportStack.Screen name="SubmitReport" component={SubmitReportScreen} />   
    </ReportStack.Navigator>
  );
}

function SettingsStackContainer() {
  return (
    <SettingsStack.Navigator 
      initialRouteName="SettingsMain"   
    >
      <SettingsStack.Screen 
        name="SettingsMain" 
        component={SettingsMainScreen}
        options={{headerShown: false}}
      />                
    </SettingsStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Report"
    >
      <Tab.Screen name="Report" 
        component={ReportStackContainer} 
        options={{
          tabBarIcon: () => {
            return ( 
              <TrackrIcon 
                iconType={ICON_TYPES.REPORT}
              /> 
            ); 
          }
        }}
      />
      <Tab.Screen name="Review" 
        component={ReviewScreen} 
        options={{
          tabBarIcon: () => {
            return ( 
              <TrackrIcon 
                iconType={ICON_TYPES.REVIEW}
              /> 
            ); 
          }
        }}
      />
      <Tab.Screen name="Settings" 
        component={SettingsStackContainer} 
        options={{
          tabBarIcon: () => {
            return ( 
              <TrackrIcon 
                iconType={ICON_TYPES.SETTINGS}
              /> 
            ); 
          }
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        initialRouteName="SignIn"   
        screenOptions={{
          headerShown: false
        }}
      >
        <AppStack.Screen name="SignIn" component={LoginScreen} />
        <AppStack.Screen name="MainTabs" component={MainTabs} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;



