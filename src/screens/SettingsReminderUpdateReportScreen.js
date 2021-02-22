import React, { useState } from 'react';
import { 
  Text, 
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import _ from 'lodash';

import { getDataStore } from '../data/DataStore';
import { settingsStyles } from '../styles/SettingsStyles';

function ReminderTimeSetting(props) {
  let {reminder, updateThisReminder} = props;
  const {name, hour, minute} = reminder;
  let date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  const onChange = (event, date) => {
    reminder.hour = date.getHours();
    reminder.minute = date.getMinutes();
    updateThisReminder(reminder);
  }
  
  return (
    <View style={[settingsStyles.reportRow, {alignItems: 'stretch'}]}>
      <Text style={settingsStyles.reportRowText}>
        {name}
      </Text>
      <DateTimePicker
        style={settingsStyles.dateTimeControl}
        testID="dateTimePicker"
        value={date}
        mode={'time'}
        is24Hour={false}
        display='inline'
        onChange={onChange}
      />
    </View>
  );
}

export function SettingsReminderUpdateReportScreen({route, navigation}) { 

  const {report} = route.params; 
  const {reminders} = report;
  const dataStore = getDataStore();

  const [_reminders, updateReminders] = useState(reminders);

  const updateThisReminder = (reminder) => {
    let newReminders = _.cloneDeep(_reminders);
    for (let r of newReminders) {
      if (r.name === reminder.name) {
        r.hour = reminder.hour;
        r.minute = reminder.minute;
      }
    }
    updateReminders(newReminders);
  }

  return (
    <View style={settingsStyles.container}>
      <KeyboardAvoidingView 
        style={settingsStyles.body}
        behavior="padding"
        keyboardVerticalOffset={-400}>
        <FlatList
          data = {_reminders}
          keyExtractor = {item => item.name}
          renderItem = {({item}) => {
            return (
              <ReminderTimeSetting 
                reminder={item} 
                updateThisReminder={updateThisReminder}
              />
            );
          }}
        />
        <View style={settingsStyles.reportButtonContainer}>
          <TouchableOpacity
            style={settingsStyles.mainActionButton}
            onPress={() => {
              report.timestamp = Date.now();
              report.reminders = _reminders;
              console.log('about to update reminders', _reminders);
              dataStore.updateReportReminders(report);
              navigation.goBack();
            }}
          >
          <Text style={settingsStyles.mainActionButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </View>
  );
}


