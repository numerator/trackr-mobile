import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getDataStore } from '../data/DataStore';
import { settingsStyles } from '../styles/SettingsStyles';

export function SettingsMainScreen(props) {
  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.header}>

      </View>

      <View style={settingsStyles.body}>
        <Text>Settings Main</Text>
      </View>

      <View style={settingsStyles.footer}>
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

