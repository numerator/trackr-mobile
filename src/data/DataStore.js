import firebase from 'firebase';
import '@firebase/firestore';
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
    this.loadReportConfigs();
  }

  setCurrentUser = (cUser) => {
    this.currentUser = cUser;
    this.currentUserDoc = this.usersRef.doc(cUser.id).get();
    if (!this.currentUserDoc.exists) {
      this.usersRef.doc(cUser.id).set({displayName: cUser.displayName});
    }
  }

  getCurrentUser = () => {
    return this.currentUser;
  }

  signOut = () => {
    firebase.auth().signOut().then(function() {
      this.currentUser = undefined;
    }).catch(function(error) {
      console.log('failed to sign out.')
    });
  }

  loadReportConfigs = () => {
    this.reportConfigs = configData.reports;
    console.log('loaded configs:', this.reportConfigs);
  }

  getReportConfigs = () => {
    return this.reportConfigs;
  }

  updateReportReminders = (report) => {
    // delete scheduled 
    // reprogram scheduled
    // save the report, save the config file
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

