import firebase from 'firebase';
import '@firebase/firestore';
import * as Notifications from 'expo-notifications';

import { firebaseConfig } from './Secrets.js';
import * as configData from '../../trackrConfig.json';

class DataStore {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    let db = firebase.firestore();
    this.usersRef = db.collection('users');
    this.reportConfigs = [];
    this.reports = [];
    this.currentUser = undefined;
    this.loadDefaultReportConfigs();
  }

  setCurrentUser = async (cUser) => {
    this.currentUser = cUser;
    this.currentUserDocRef = this.usersRef.doc(cUser.id);
    this.currentUserDoc = await this.currentUserDocRef.get();
    if (!this.currentUserDoc.exists) {
      this.usersRef.doc(cUser.id).set({displayName: cUser.displayName});
    } else {
      this.dName = this.currentUserDoc.data()['displayName'];
    }
    let configs = this.currentUserDoc.data()['configs'];
    if (configs !== undefined) {
      console.log('found saved config, using it');
      this.reportConfigs = configs;
    } else {
      console.log('no saved config, using default');
      await this.setCurrentUserConfig(configData.reports);
    }
    console.log('after login, currentUserDName:', this.dName);
  }

  getCurrentUser = () => {
    return this.currentUser;
  }

  setCurrentUserConfig = async (configs) => {
    await this.currentUserDocRef.update({configs: configs});
    this.reportConfigs = configs;
  }

  signOut = () => {
    firebase.auth().signOut().then(function() {
      this.currentUser = undefined;
    }).catch(function(error) {
      console.log('failed to sign out.')
    });
  }

  askPermissions = async () => {
    const perms = await Notifications.getPermissionsAsync();
    let granted = perms.granted;
    console.log('tried to get permissions', perms);
    if (!granted) {
      const newPerms = await Notifications.requestPermissionsAsync();
      granted = newPerms.granted;
    }
    return (granted);
  };

  loadDefaultReportConfigs = () => {
    this.reportConfigs = configData.reports;
  }

  saveReportConfigs = async (configsToSave) => {
    await this.currentUserDocRef.update({
      'configs': configsToSave
    });
    this.reportConfigs = configsToSave;
  }

  getReportConfigs = () => {
    return this.reportConfigs;
  }

  updateReportReminders = async (reportConfig) => {
    // console.log('in updateReportReminders, report:', report);
    // delete scheduled 
    console.log('updating report reminders');
    if (!await this.askPermissions()) {
      console.log("couldn't get permissions for Notifications");
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (let i = 0; i < this.reportConfigs.length; i++) {
      if (this.reportConfigs[i].name === reportConfig.name) {
        this.reportConfigs[i] = reportConfig;
        break;
      }
    }

    // reprogram scheduled
    for (let c of this.reportConfigs) {
      console.log('updating reminders for ', c.name);
      if (!c.reminders) continue;
      for (let r of c.reminders) {
        console.log('updating ', r.name, 'for', c.name);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: c.name,
            body: "It's time for your " + r.name + " report!",
            data: {
              type: 'foobar' // to signal the app what to do...
            }
          },
          trigger: {
            hour: r.hour,
            minute: r.minute,
            repeats: true,
          }
        })
      }
    }

    let notifs = await Notifications.getAllScheduledNotificationsAsync();
    console.log('After updating notifications: ', notifs);

    // save the report, save the config file
    this.saveReportConfigs(this.reportConfigs);
    // console.log('updated reportConfig', reportConfig.name);
    // console.log('========================');
    // console.log('new reportConfigs', this.reportConfigs);
    // console.log('========================');
    

  }

  submitReport = (report) => {
    if (this.currentUser === undefined) {
      throw 'NoCurrentUserError';
    }
    let userDocRef = this.usersRef.doc(this.currentUser.id);
    userDocRef.collection('reports').add(report);
  }
}

// Singleton Pattern. There can only be one DataStore!
let theDataStore = undefined;

export function getDataStore() {
  if (!theDataStore) {
    theDataStore = new DataStore();
  }
  return theDataStore;
}

