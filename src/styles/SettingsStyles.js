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
    alignItems: 'stretch'
  }, 
  footer: {
    ...sharedStyles.footer,
    flex: 0.1,
  },

  // UI Elements
  headerText: {
    ...sharedStyles.headerText,
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

