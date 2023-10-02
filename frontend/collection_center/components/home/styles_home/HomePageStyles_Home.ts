import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const HomePageStyles = StyleSheet.create({
  user: {
    backgroundColor: 'rgba(192, 192, 192, .2)',
    borderRadius: 30,
    alignItems: 'center',
    verticalAlign: 'center',
    marginTop: Constants.statusBarHeight + 20,
    marginHorizontal: '5%',
    padding: '10%'
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  userName: {
    color: 'white',
    fontSize: 25,
    alignContent: 'center',
    fontWeight: 'bold',
    marginTop: '5%',
    textShadowColor: 'rgba(119, 166, 73, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  summary: {
    backgroundColor: 'rgba(192, 192, 192, .2)',
    borderRadius: 30,
    alignItems: 'center',
    verticalAlign: 'center',
    marginTop: '10%',
    marginHorizontal: '5%'
  },
  grayContainer: {
    backgroundColor: '#494D4F',
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    verticalAlign: 'center',
    padding: '5%',
    marginTop: '5%'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignContent: 'center',
    marginTop: '5%',
    textShadowColor: 'rgba(119, 166, 73, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  quantityText: {
    color: 'white',
    fontSize: 20,
    alignContent: 'center',
    marginBottom: '5%',
    textShadowColor: 'rgba(119, 166, 73, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  },
  quantity: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    alignContent: 'center',
    textShadowColor: 'rgba(119, 166, 73, 1)',
    textShadowOffset: { width: 0, height: 0.7 },
    textShadowRadius: 4
  }
})
