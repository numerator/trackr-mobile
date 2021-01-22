import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getDataStore } from '../data/DataStore';
import { settingsStyles } from '../styles/SettingsStyles';

export function SettingsMainScreen(props) {
  return (
    <View style={settingsStyles.container}>

      <View style={settingsStyles.body}>

        <TouchableOpacity
          style={settingsStyles.mainActionButton}
          onPress={() => {
            props.navigation.navigate('SettingsReminderSelectReport');
          }}
        >
          <Text style={settingsStyles.mainActionButtonText}>
            Reminders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={settingsStyles.mainActionButton}
          onPress={() => {
            getDataStore().signOut();
            props.navigation.navigate('SignIn');
          }}
        >
          <Text style={settingsStyles.mainActionButtonText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

