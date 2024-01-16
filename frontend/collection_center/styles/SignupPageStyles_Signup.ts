import { Platform, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const SignupPageStyles = StyleSheet.create({
  backButton: {
    marginLeft: '3%',
    alignSelf: 'flex-start',
    marginTop: Constants.statusBarHeight * 2
  },
  appLogo: {
    marginTop: '-11%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  appTitle: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: '5%',
    fontSize: 45,
    alignContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  grayContainer: {
    backgroundColor: '#494D4F',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4
      },
      android: {
        elevation: 5
      }
    })
  },
  processText: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 43,
    fontWeight: 'bold',
    alignContent: 'center',
    marginTop: '8%',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: '4%',
    width: '90%',
    alignSelf: 'center'
  },
  signupInputs: {
    marginVertical: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  signupButton: {
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '10.4%'
  }
})
