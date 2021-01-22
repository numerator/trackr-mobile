import { StyleSheet } from 'react-native';
import { sharedStyles, colors } from './SharedStyles';

export const reportStyles = StyleSheet.create({

  // Containers
  container: {
    ...sharedStyles.container,
  },
  header: {
    ...sharedStyles.header,
  },
  body: {
    ...sharedStyles.body,
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: 'lightblue'
    // marginTop: 40
  }, 
  footer: {
    ...sharedStyles.footer,
    flex: 0.1,
    // backgroundColor: 'tan'
  },

  // UI Elements
  headerText: {
    ...sharedStyles.headerText,
  },
  reportRow: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //margin: 30,
    marginVertical: 30,
    width: '100%'
  },
  reportRowIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center', 
    //backgroundColor: 'green'
  },
  reportRowText: {
    flex: 0.4,
    fontSize: 18,
    marginLeft: 20,
    color: colors.primaryDark,
    fontWeight: 'bold'
  },
  trackletListContainer: { // unused?
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },  
  scaleTrackletContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: '100%', 
  },
  scaleLabelContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scaleLabelText: {
    alignSelf: 'flex-end',
    color: colors.primaryDark,
    fontSize: 14
  },
  scaleSliderContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scaleSlider: {
    //margin: 10,
    width: '80%',
    color: colors.primaryLight
  },
  scaleSliderThumbStyle: {
    height: 20, 
    width: 10,
    backgroundColor: colors.primaryDark 
  },
  scaleValueText: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.primaryDark,
    fontSize: 24
  },
  doseTrackletContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: '100%', 
  },
  doseTrackletLabel: {
    flex: 0.5,
    textAlign: 'right',
    color: colors.primaryDark
  },
  doseTrackletInput: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: colors.primaryMedium,
    borderRadius: 10,
    margin: 10, 
    padding: 3,
    textAlign: 'center',
    color: colors.primaryDark
  },
  doseTrackletCheckbox: {
    //uncheckedColor: colors.primaryMedium
  },
  textTrackletContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  textTrackletLabel: {
    alignSelf: 'flex-start',
    paddingBottom: 10,
    color: colors.primaryDark,
    fontSize: 14
  },
  textTrackletInput: {
    borderColor: colors.primaryDark,
    borderWidth: 1,
    width: '100%',
    height: 50,
    //height: '100%',
    padding: 5, 
    borderRadius: 20,
  },
  reportButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%'
  },
  mainActionButton: {
    ...sharedStyles.mainActionButton
  },
  mainActionButtonText: {
    ...sharedStyles.mainActionButtonText
  }
});

