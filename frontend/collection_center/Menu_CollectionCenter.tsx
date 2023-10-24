import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { HomePageCollectionCenter, ReceptionPageCollectionCenter } from './components'
import { HomeCollectionCenter, ReceptionCollectionCenter } from '../assets'
import { Animated, Dimensions, Keyboard, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function MyTabs () {
  const tabOffsetValue = useRef(new Animated.Value(0)).current
  const [showTabIndicator, setShowTabIndicator] = useState(true)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowTabIndicator(false)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowTabIndicator(true)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  function getWidth () {
    const width = Dimensions.get('window').width
    return width
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName='HomePage_CollectionCenter'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelStyle: { display: 'none' },
          tabBarVisibilityAnimationConfig: {
            show: {
              animation: 'timing',
              config: {
                duration: 50
              }
            },
            hide: {
              animation: 'timing',
              config: {
                duration: 50
              }
            }
          },
          tabBarStyle: {
            backgroundColor: '#494D4f',
            borderColor: '#494D4f',
            paddingHorizontal: '16.5%'
          },
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: '#76b544',
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color }) => {
            if (route.name === 'HomePage_CollectionCenter') {
              return <HomeCollectionCenter fill='none' stroke={color} strokeWidth={2} />
            } else if (route.name === 'ReceptionPage_CollectionCenter') {
              return <ReceptionCollectionCenter fill={color} />
            }
          }
        })}
      >
        <Stack.Screen
          name='HomePage_CollectionCenter'
          component={HomePageCollectionCenter}
          listeners={({ navigation, route }) => ({
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() / 3.75,
                useNativeDriver: true
              }).start()
            }
          })}
        />
        <Stack.Screen
          name='ReceptionPage_CollectionCenter'
          component={ReceptionPageCollectionCenter}
          listeners={() => ({
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() / 1.66,
                useNativeDriver: true
              }).start()
            }
          })}
        />
      </Tab.Navigator>
      {showTabIndicator &&
        <Animated.View
          style={{
            width: 50,
            height: 4,
            position: 'absolute',
            backgroundColor: '#76b544',
            bottom: '5.5%',
            borderRadius: 50,
            transform: [{ translateX: tabOffsetValue }]
          }}
        />}
    </View>
  )
}

export function MenuCollectionCenter () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MyTabs />
    </GestureHandlerRootView>
  )
}
