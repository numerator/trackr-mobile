import { StyleSheet } from 'react-native';

export const colors = {
  background: 'white',
  primaryDark: '#2699FB',
  primaryMedium: '#66B7F5',
  primaryLight: '#DAEBF8',
  secondaryDark: 'darkgray',
  secondaryLight: 'lightgray',
  outline: 'gray'
}

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.background,
  },
  header: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    width: '100%',
  },
  body: {
    flex: 0.7,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    //backgroundColor: 'tan'
  },
  listContainer: {
    flex: 0.5 ,
    backgroundColor: '#ddd',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  headerText: {
    color: colors.primaryDark,
    fontSize: 36,
    fontWeight: 'bold'
  },
  mainActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 50,
    borderColor: colors.outline,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.primaryDark,
    // color: 'white'
  },
  mainActionButtonText: {
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20,
    color: 'white'
  }
});