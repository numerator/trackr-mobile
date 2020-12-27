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
    flex: 0.8,
    marginTop: 40
  }, 
  footer: {
    ...sharedStyles.footer,
    flex: 0.1,
    //backgroundColor: 'tan'
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
    margin: 30,
    width: '100%'
  },
  reportRowIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reportRowText: {
    flex: 0.4,
    fontSize: 18,
    color: colors.primaryDark,
    fontWeight: 'bold'
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
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scaleLabelText: {
    alignSelf: 'flex-end'
  },
  scaleSliderContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scaleSlider: {
    margin: 10,
    width: '80%'
  },
  scaleValueText: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
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
    textAlign: 'right'
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
    paddingBottom: 10
  },
  textTrackletInput: {
    borderColor: colors.outline,
    borderWidth: 1,
    width: '100%',
    height: '100%',
    padding: 5, 
    height: '100%',
    borderRadius: 20,

  },
  reportButtonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainActionButton: {
    ...sharedStyles.mainActionButton
  },
  mainActionButtonText: {
    ...sharedStyles.mainActionButtonText
  }
});

