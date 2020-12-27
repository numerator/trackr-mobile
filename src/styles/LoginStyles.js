import { StyleSheet } from 'react-native';
import { sharedStyles, colors } from './SharedStyles';

export const loginStyles = StyleSheet.create({

  // Containers
  container: {
    ...sharedStyles.container,
    backgroundColor: colors.secondaryLight,
  },
  header: {
    ...sharedStyles.header,
  },
  body: {
    ...sharedStyles.body,
  }, 
  footer: {
    ...sharedStyles.footer,
  },

  // UI Elements
  inputBox: {
    margin: 20,
    padding: 20,
    width: '80%',
    borderColor: colors.outline,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },
  focusedInputBox: {
    margin: 20,
    padding: 20,
    width: '80%',
    borderColor: colors.outline,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  mainActionButton: {
    ...sharedStyles.mainActionButton
  }
});

