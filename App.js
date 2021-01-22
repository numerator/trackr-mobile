import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LoginScreen } from './src/screens/LoginScreen';
import { ReportSubmitScreen } from './src/screens/ReportSubmitScreen';
import { ReportMainScreen } from './src/screens/ReportMainScreen';
import { SettingsMainScreen } from './src/screens/SettingsMainScreen';
import { SettingsReminderSelectReportScreen } from './src/screens/SettingsReminderSelectReportScreen';
import { SettingsReminderUpdateReportScreen } from './src/screens/SettingsReminderUpdateReportScreen';
import { TrackrIcon, ICON_SIZES, ICON_TYPES } from './src/screens/Icons';
import { colors } from './src/styles/SharedStyles';

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
      <ReportStack.Screen 
        name="ReportSubmit" 
        component={ReportSubmitScreen} />   
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
      <SettingsStack.Screen 
        name="SettingsReminderSelectReport" 
        component={SettingsReminderSelectReportScreen}
        options={{headerShown: false, title: "Select Report"}}
      />          
      <SettingsStack.Screen 
        name="SettingsReminderUpdateReport" 
        component={SettingsReminderUpdateReportScreen}
        options={{headerShown: true, title: "Update Reminders"}}
      />     
    </SettingsStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primaryDark,
        inactiveTintColor: colors.primaryMedium,
      }}
      initialRouteName="Report"
    >
      <Tab.Screen name="Report" 
        component={ReportStackContainer} 
        options={{
          tabBarIcon: ({color}) => {
            return ( 
              <TrackrIcon 
                iconType={ICON_TYPES.REPORT}
                color={color}
              /> 
            ); 
          }
        }}
      />

      <Tab.Screen name="Settings" 
        component={SettingsStackContainer} 
        options={{
          tabBarIcon: ({color}) => {
            return ( 
              <TrackrIcon 
                iconType={ICON_TYPES.SETTINGS}
                color={color}
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



