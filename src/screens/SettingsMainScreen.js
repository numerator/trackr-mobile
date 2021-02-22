import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getDataStore } from '../data/DataStore';
import { settingsStyles } from '../styles/SettingsStyles';
import { ICON_TYPES, TrackrIcon } from './Icons';
import { FlatList } from 'react-native-gesture-handler';

import _ from 'lodash';

export function SettingsMainScreen(props) {
  const dataStore = getDataStore();
  const reportConfigs = dataStore.getReportConfigs();
  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.body}>

        <View style={settingsStyles.settingsHeader}>
          <Text style={settingsStyles.settingsRowText}>Header</Text>
        </View>

        <View style={settingsStyles.settingsRow}>
          <Text style={settingsStyles.settingsRowText}>Email</Text>
          <Text style={[settingsStyles.settingsRowText, settingsStyles.disabled]}>a@b.com</Text>
        </View>

        <View style={settingsStyles.settingsRow}>
          <Text style={settingsStyles.settingsRowText}>Display Name</Text>
          <Text style={settingsStyles.settingsRowText}>Abraham</Text>
          <View style={settingsStyles.settingsRowIcon}>
            <TrackrIcon iconType={ICON_TYPES.NEXT}/>            
          </View>
        </View>

        <View style={settingsStyles.settingsRow}>
          <Text style={settingsStyles.settingsRowText}>Change Password</Text>
          <Text style={settingsStyles.settingsRowText}> </Text>
          <View style={settingsStyles.settingsRowIcon}>
            <TrackrIcon iconType={ICON_TYPES.NEXT}/>            
          </View>
        </View>

        <View style={settingsStyles.settingsRow}>
          <Text style={settingsStyles.settingsRowText}>Log Out</Text>
          <Text style={settingsStyles.settingsRowText}> </Text>
          <View style={settingsStyles.settingsRowIcon}>
            <TrackrIcon iconType={ICON_TYPES.NEXT}/>            
          </View>
        </View>


        <View style={settingsStyles.settingsHeader}>
          <Text style={settingsStyles.settingsRowText}>Reminders</Text>
        </View>

        <View style={[settingsStyles.body, {alignItems: 'stretch'}]}>
          <FlatList
            data = {reportConfigs}
            keyExtractor = {(item) => item.name}
            renderItem = {({item}) => {
              return (
                <TouchableOpacity
                  style={settingsStyles.settingsRow}
                  onPress={()=>{
                    props.navigation.navigate('SettingsReminderUpdateReport', 
                      {report: _.cloneDeep(item)}
                    );
                  }}
                >
                  <Text style={settingsStyles.settingsRowText}>
                    {item.name}
                  </Text>
                  <Text style={settingsStyles.settingsRowText}>
                    
                  </Text>
                  <View style={settingsStyles.settingsRowIcon}>
                    <TrackrIcon iconType={ICON_TYPES.NEXT}/>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  )
}

