import Constants from 'expo-constants'
import { Dimensions, Platform, StyleSheet } from 'react-native'

export const ReceptionPageStyles = StyleSheet.create({
  appLogo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Constants.statusBarHeight * 1.82
  },
  centerView: {
    height: Dimensions.get('window').height - (Dimensions.get('window').height * 0.17),
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: 'rgba(192, 192, 192, .2)',
    borderRadius: 30,
    marginHorizontal: '5%'
  },
  scanQr: {
    backgroundColor: '#76b54420',
    alignItems: 'center',
    marginTop: '5%',
    borderRadius: 30,
    padding: '5%',
    alignSelf: 'center',
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderRightWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: '#BDF26D'
  },
  qrText: {
    color: '#BDF26D',
    fontSize: 17,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  user: {
    alignItems: 'center',
    marginTop: '5%',
    gap: 5
  },
  joinUserInfoDivider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userDivider: {
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: '4%',
    borderColor: 'gray'
  },
  userInfo: {
    fontWeight: 'bold',
    color: '#BDF26D',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  inputSection: {
    display: 'flex',
    backgroundColor: '#494D4F',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: '5%',
    marginTop: '5%',
    gap: 20,
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
  quantityInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%'
  },
  kg: {
    color: 'white',
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2%',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  permissionDenied: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: '100%',
    fontWeight: 'bold'
  },
  optionButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: '12%',
    gap: 15
  },
  button: {
    paddingHorizontal: 5,
    borderColor: '#000',
    borderWidth: 0.5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  }
})
