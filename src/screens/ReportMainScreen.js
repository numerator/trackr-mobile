import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import _ from 'lodash';

import { getDataStore } from '../data/DataStore';
import { reportStyles } from '../styles/ReportStyles';
import { ICON_TYPES, TrackrIcon } from './Icons';

export function ReportMainScreen(props) {

  const dataStore = getDataStore();
  const reportConfigs = dataStore.getReportConfigs();
  // console.log('in report screen, configs:', reportConfigs);
  return (
    <View style={reportStyles.container}>
      <View style={reportStyles.header}>
        <Text style={reportStyles.headerText}>Create Report</Text>
      </View>
      <View style={reportStyles.body}>
        <FlatList
          data = {reportConfigs}
          keyExtractor = {(item) => item.name}
          renderItem = {({item}) => {
            return (
              <TouchableOpacity
                style={reportStyles.reportRow}
                onPress={()=>{
                  props.navigation.navigate('ReportSubmit', 
                    {report: _.cloneDeep(item)}
                  );
                }}
              >
                <View style={reportStyles.reportRowIcon}>
                  <TrackrIcon iconType={item.icon}/>
                </View>
                <Text style={reportStyles.reportRowText}>
                  {item.name}
                </Text>
                <View style={reportStyles.reportRowIcon}>
                  {/* <TrackrIcon iconType={ICON_TYPES.WARN}/> */}
                </View>
                <View style={reportStyles.reportRowIcon}>
                  <TrackrIcon iconType={ICON_TYPES.NEXT}/>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={reportStyles.footer}/>
      <StatusBar style="auto" />
    </View>
  );
}


