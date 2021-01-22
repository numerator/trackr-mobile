import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import _ from 'lodash';

import { getDataStore } from '../data/DataStore';
import { settingsStyles } from '../styles/SettingsStyles';
import { ICON_TYPES, TrackrIcon } from './Icons';

export function SettingsReminderSelectReportScreen(props) {

  const dataStore = getDataStore();
  const reportConfigs = dataStore.getReportConfigs();
  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.header}>
        <Text style={settingsStyles.headerText}>Update Reminders</Text>
      </View>
      <View style={[settingsStyles.body, {alignItems: 'stretch'}]}>
        <FlatList
          data = {reportConfigs}
          keyExtractor = {(item) => item.name}
          renderItem = {({item}) => {
            return (
              <TouchableOpacity
                style={settingsStyles.reportRow}
                onPress={()=>{
                  props.navigation.navigate('SettingsReminderUpdateReport', 
                    {report: _.cloneDeep(item)}
                  );
                }}
              >
                <View style={settingsStyles.reportRowIcon}>
                  <TrackrIcon iconType={item.icon}/>
                </View>
                <Text style={settingsStyles.reportRowText}>
                  {item.name}
                </Text>
                <View style={settingsStyles.reportRowIcon}>
                  <TrackrIcon iconType={ICON_TYPES.NEXT}/>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={settingsStyles.footer}/>
      <StatusBar style="auto" />
    </View>
  );
}


