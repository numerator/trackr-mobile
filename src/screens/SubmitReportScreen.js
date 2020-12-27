import React, { useState } from 'react';
import { 
  Text, 
  View,
  FlatList,
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import { getDataStore } from '../data/DataStore';
import { reportStyles } from '../styles/ReportStyles';

export function SubmitReportScreen({route, navigation}) { 

  const {report} = route.params; 
  const {tracklets} = report;
  const dataStore = getDataStore();

  function ScaleTracklet({tracklet}) {
    const {name, min, max, step, defaultValue} = tracklet;
    const [val, setValue] = useState(defaultValue);
    if (tracklet.value === undefined) {
      tracklet.value = defaultValue;
    }
  
    return (
      <View style={reportStyles.scaleTrackletContainer}>
        <View style={reportStyles.scaleLabelContainer}>
          <Text style={reportStyles.scaleLabelText}>{name}</Text>
        </View>
        <View style={reportStyles.scaleSliderContainer}>
          <Slider
            style={reportStyles.scaleSlider}
            minimumValue={min}
            maximumValue={max}
            allowTouchTrack={true}
            thumbStyle={{ height: 20, width: 10, backgroundColor: 'blue' }}
            step={step}
            value={val}
            onValueChange={newVal => {
              tracklet.value = newVal;
              setValue(newVal);
            }}
          />
        </View>
        <View style={reportStyles.scaleLabelContainer}>
          <Text style={reportStyles.scaleValueText}>{val}</Text>
        </View>
      </View>
    );
  }

  function DoseTracklet({tracklet}) {
    const {name, defaultValue} = tracklet;
    const [val, setValue] = useState(defaultValue === 'true'); // turn text to boolean
    if (tracklet.value === undefined) {
      tracklet.value = defaultValue;
    }

    return (
      <View style={reportStyles.doseTrackletContainer}>
        <Text
          style={reportStyles.doseTrackletLabel}
        >{name}</Text>
        <CheckBox
          checked={val}
          onPress={() => {
            let newVal = !val;
            tracklet.value = newVal;
            setValue(newVal);
          }}
        />
      </View>
    );
  }

  function TextTracklet({tracklet}) {
    const {name, defaultValue} = tracklet;
    const [val, setValue] = useState(defaultValue);
    if (tracklet.value === undefined) {
      tracklet.value = defaultValue;
    }

    return (
      <View style={reportStyles.textTrackletContainer}>
        <Text style={reportStyles.textTrackletLabel}>
          {name}
        </Text>
        <TextInput
          style={reportStyles.textTrackletInput}
          placeholder={val}
          multiline={true}
          onChangeText={newText => {
            tracklet.value = newText;
            setValue(newText);
          }}
        />
      </View>
    );
  }

  return (
    <View style={reportStyles.container}>

      <View style={reportStyles.body}>
        <FlatList
          data = {tracklets}
          keyExtractor = {item => item.name}
          renderItem = {({item}) => {
            if (item.datatype === 'scale') {
              return (
                <ScaleTracklet tracklet={item}/>
              );
            } else if (item.datatype === 'text') {
              return (
                <TextTracklet tracklet={item}/>
              );
            } else if (item.datatype === 'dose') {
              return (
                <DoseTracklet tracklet={item}/>
              );
            }
          }}
        />
      </View>
      <View style={reportStyles.footer}>
        <TouchableOpacity
          style={reportStyles.mainActionButton}
          onPress={() => {
            report.timestamp = Date.now();
            dataStore.submitReport(report);
            navigation.goBack();
          }}
        >
          <Text style={reportStyles.mainActionButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


