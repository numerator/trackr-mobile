import { StyleSheet } from 'react-native';
import { sharedStyles, colors } from './SharedStyles';

export const settingsStyles = StyleSheet.create({

  // Containers
  container: {
    ...sharedStyles.container,
  },
  header: {
    ...sharedStyles.header,
  },
  body: {
    ...sharedStyles.body,
    flex: 0.8,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }, 
  footer: {
    ...sharedStyles.footer,
    flex: 0.1,
  },

  // UI Elements
  headerText: {
    ...sharedStyles.headerText,
  },


  disabled : {
    color: colors.primaryLight,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10, 
    paddingLeft: 10,
    backgroundColor: colors.primaryLight
  },
  settingsRow: {
//    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  settingsRowText: {
    flex: 0.45,
    width: '100%',
    marginHorizontal: 10,
    color: colors.primaryDark,
    fontSize: 18,
    // backgroundColor: 'lightgreen'
  },
  settingsRowIcon: {
    flex: 0.1,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // backgroundColor: 'tan'

  },

  // Select Report Screen
  reportRow: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '5%',
    width: '90%',
    //backgroundColor: 'tan'
  },
  reportRowIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reportRowText: {
    flex: 0.5,
    fontSize: 18,
    color: colors.primaryDark,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    margin: 10
  },
  reportButtonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Update Report Screen
  dateTimeControl: {
    flex: 0.5,
    alignItems: 'center'
  },


  // Common
  mainActionButton: {
    ...sharedStyles.mainActionButton,
    margin: 10,

  },
  mainActionButtonText: {
    ...sharedStyles.mainActionButtonText
  }
});

