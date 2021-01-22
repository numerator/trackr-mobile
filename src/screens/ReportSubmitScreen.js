import React, { useState } from 'react';
import { 
  Text, 
  View,
  FlatList,
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { CheckBox, Slider } from 'react-native-elements';

import _ from 'lodash';

import { getDataStore } from '../data/DataStore';
import { reportStyles } from '../styles/ReportStyles';
import { colors } from '../styles/SharedStyles';

function TextTracklet(props) {
  const {tracklet, muteOthers, unmuteAll, updateThisTracklet} = props;
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
        value={val}
        onFocus={()=>{
          muteOthers(tracklet.name);
        }}
        onBlur={()=>{
          unmuteAll();
        }}
        onChangeText={newText => {
          tracklet.value = newText;
          setValue(newText);
          updateThisTracklet(tracklet);
        }}
      />
    </View>
  );
}

function ScaleTracklet({tracklet, updateThisTracklet}) {

  const {name, min, max, step, defaultValue} = tracklet;

  if (tracklet.value === undefined) {
    tracklet.value = defaultValue;
  }
  
  const [val, setValue] = useState(tracklet.value);
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
          thumbStyle={reportStyles.scaleSliderThumbStyle}
          step={step}
          value={val}
          onValueChange={newVal => {
            tracklet.value = newVal;
            setValue(newVal);
            updateThisTracklet(tracklet);
          }}
        />
      </View>
      <View style={reportStyles.scaleLabelContainer}>
        <Text style={reportStyles.scaleValueText}>{val}</Text>
      </View>
    </View>
  );
}

function DoseTracklet({tracklet, updateThisTracklet}) {
  const {name, defaultUnitValue, defaultDoseValue, defaultTakenValue} = tracklet;
  const [doseValue, setDoseValue] = useState(defaultDoseValue); 
  const [unitValue, setUnitValue] = useState(defaultUnitValue); 
  const [takenValue, setTakenValue] = useState(defaultTakenValue === 'true'); // turn text to boolean

  if (tracklet.doseValue === undefined) {
    tracklet.doseValue = defaultDoseValue;
  }
  if (tracklet.takenValue === undefined) {
    tracklet.takenValue = defaultTakenValue;
  }

  return (
    <View style={reportStyles.doseTrackletContainer}>
      <Text
        style={reportStyles.doseTrackletLabel}
      >{name}</Text>
      <TextInput
        style={reportStyles.doseTrackletInput}
        placeholder={doseValue}
        multiline={true}
        value={doseValue}
        onChangeText={newText => {
          tracklet.doseValue = newText;
          setDoseValue(newText);
          updateThisTracklet(tracklet);
        }}
      />
      <TextInput
        style={reportStyles.doseTrackletInput}
        placeholder={unitValue}
        multiline={true}
        value={unitValue}
        onChangeText={newText => {
          tracklet.unitValue = newText;
          setUnitValue(newText);
          updateThisTracklet(tracklet);
        }}
      />
      <CheckBox
        checked={takenValue}
        style={reportStyles.doseTrackletCheckbox}
        uncheckedColor={colors.primaryMedium}
        onPress={() => {
          let newVal = !takenValue;
          tracklet.takenValue = newVal;
          setTakenValue(newVal);
          updateThisTracklet(tracklet);
        }}
      />
    </View>
  );
}

export function ReportSubmitScreen({route, navigation}) { 

  const {report} = route.params; 
  const {tracklets} = report;
  const dataStore = getDataStore();

  const [_tracklets, updateTracklets] = useState(tracklets);

  let newTracklets = _.cloneDeep(_tracklets);
  for (let t of newTracklets) {
    t.muted = false;
  }

  // let initMuteTracklets = {};
  // for (let t of tracklets) {
  //   initMuteTracklets[t.name] = false;
  // }

  // const [muteTracklets, updateMuteTracklets] = useState(initMuteTracklets);

  const muteOtherTracklets = (notMuted) => {
    let newTracklets = _.cloneDeep(_tracklets);
    for (let t of newTracklets) {
      t.muted = t.name !== notMuted; // true for others
    }
    updateTracklets(newTracklets);
  }

  const unmuteAllTracklets = () => {
    let newTracklets = _.cloneDeep(_tracklets);
    for (let t of newTracklets) {
      t.muted = false; 
    }
    updateTracklets(newTracklets);
  }

  const updateThisTracklet = (tracklet) => {
    let newTracklets = _.cloneDeep(_tracklets);
    for (let t of newTracklets) {
      if (t.name === tracklet.name) {
        t.value = tracklet.value;
      }
    }
    updateTracklets(newTracklets);
  }

  return (
    <View style={reportStyles.container}>
      <KeyboardAvoidingView 
        style={reportStyles.body}
        behavior="padding"
        keyboardVerticalOffset={-400}>
        <FlatList
          data = {_tracklets}
          keyExtractor = {item => item.name}
          ListFooterComponentStyle = {reportStyles.reportButtonContainer}
          ListFooterComponent={()=>{
            return(
              <View style={reportStyles.reportButtonContainer}>
                <TouchableOpacity
                  style={reportStyles.mainActionButton}
                  onPress={() => {
                    report.timestamp = Date.now();
                    report.tracklets = _tracklets;
                    dataStore.submitReport(report);
                    navigation.goBack();
                  }}
                >
                <Text style={reportStyles.mainActionButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            );
          }}
          renderItem = {({item}) => {
            if (item.datatype === 'scale' && !item.muted) {
              return (
                <ScaleTracklet 
                  tracklet={item}
                  updateThisTracklet={updateThisTracklet}
                />
              );
            } else if (item.datatype === 'text' && !item.muted) {
              return (
                <TextTracklet 
                  tracklet={item} 
                  muteOthers={muteOtherTracklets}
                  unmuteAll={unmuteAllTracklets}
                  updateThisTracklet={updateThisTracklet}
                />
              );
            } else if (item.datatype === 'dose' && !item.muted) {
              return (
                <DoseTracklet 
                  tracklet={item}
                  updateThisTracklet={updateThisTracklet}
                />
              );
            }
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}


