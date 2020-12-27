import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getDataStore } from '../data/DataStore';
import { sharedStyles } from '../styles/SharedStyles';

export function SettingsMainScreen(props) {
  return (
    <View style={sharedStyles.container}>
      <Text>Settings Main</Text>
    </View>
  )
}

