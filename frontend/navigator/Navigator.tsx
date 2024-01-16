<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMain_home from "../user/components/UserMain_home";
import UserQr_home from "../user/components/UserQr_home";
import UserChart_home from "../user/components/UserChart_home";
import TabNavigator from "./TabNavigator";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ChatCohere } from "../cohere/ChatCohere";
import { useAuthenticate } from "../context/AuthenticateUserContext";
import { auth } from "../config/firebase";
import LoginAthentication from "../LoginAthentication";
=======
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserMain_home from '../user/components/UserMain_home'
import UserQr_home from '../user/components/UserQr_home'
import UserChart_home from '../user/components/UserChart_home'
import TabNavigator from './TabNavigator'
import { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { ChatCohere } from '../cohere/ChatCohere'
import { useAuthenticate } from '../context/AuthenticateUserContext'
import { auth } from '../config/firebase'
import LoginAthentication from '../LoginAthentication'
>>>>>>> ac05d2ef3b813cf1acc9a7331937aa9b01b6fb13

const Stack = createNativeStackNavigator()
const tab = createBottomTabNavigator()

const Navigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current

  // validation if user is authenticated
<<<<<<< HEAD
  const [initializing, setInitializing] = useState(true);
  const { user, setUser, setUserToken } = useAuthenticate();
  console.log("Nombre displayName", auth.currentUser?.displayName);

  const onAuthStateChanged = async (user: any) => {
    try {
      if (user) {
        setUser(user);
        setUserToken(user?.stsTokenManager?.accessToken);
        console.log("user Nav-> ", user.stsTokenManager.accessToken);
        if (initializing) setInitializing(true)
      } else {
        setUser(null);
        setUserToken(null);
        setInitializing(false);
      }
    } catch (error) {
      console.error("Error in onAuthStateChanged: ", error);
    }
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  });
=======
  const [initializing, setInitializing] = useState(true)
  const { user, setUser, userCenter, setUserToken } = useAuthenticate()
  console.log('Nombre displayName', auth.currentUser?.displayName)

  const onAuthStateChanged = (user: any) => {
    setUser(user)
    setUserToken(user?.stsTokenManager?.accessToken)
    console.log('user Nav-> ', user.stsTokenManager.accessToken)
    if (initializing) setInitializing(true)
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    return subscriber
  })
>>>>>>> ac05d2ef3b813cf1acc9a7331937aa9b01b6fb13

  // finish validation

  console.log(tabOffsetValue)

  function getWidth () {
    const width = Dimensions.get('window').width
    // total five Tabs...
    return width / 5
  }

  interface TabIcon {
    focused: string;
    notFocused: string;
  }

  type TabIconMapping = Record<string, TabIcon>;

  const tabIconMapping: TabIconMapping = {
    UserMain_home: { focused: 'home-outline', notFocused: 'home' },
    UserChart_home: {
      focused: 'bar-chart-outline',
      notFocused: 'bar-chart'
    },
    TabNavigator: { focused: 'calendar-outline', notFocused: 'calendar' },
    ChatCohere: {
      // HomePageCollectionCenter
      focused: 'leaf-outline',
      notFocused: 'leaf'
    },
    UserQr_home: { focused: 'bicycle-outline', notFocused: 'bicycle-sharp' }
  }

<<<<<<< HEAD
  return user ? (
    <NavigationContainer>
      <tab.Navigator
        initialRouteName="UserMain_home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelStyle: { display: "none" },
          tabBarStyle: {
            backgroundColor: "#494D4f",
            borderColor: "#494D4f",
            height: Platform.OS === 'ios' ? 70 : 55,
          },
=======
  // && auth.currentUser?.emailVerified

  // if (!user) {
  //   // Martin
  //   return (
  //     <LoginAthentication />
  //   )
  // } else {
  return (user && !userCenter)
    ? (
      <NavigationContainer>
        <tab.Navigator
          initialRouteName='UserMain_home'
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarLabelStyle: { display: 'none' },
            tabBarStyle: {
              backgroundColor: '#494D4f',
              borderColor: '#494D4f',
              height: 55
            },
>>>>>>> ac05d2ef3b813cf1acc9a7331937aa9b01b6fb13

            tabBarIcon: ({ focused, color, size }) => {
              const { focused: focusedIcon, notFocused: notFocusedIcon } =
              tabIconMapping[route.name] || {}

              return (
                <Ionicons
                  name={focused ? focusedIcon : notFocusedIcon}
                  size={size}
                  color={color}
                />
              )
            },
            tabBarInactiveTintColor: '#494',
            tabBarActiveTintColor: 'grey'
          })}
        >
          <Stack.Screen
            name='UserMain_home'
            component={UserMain_home}
            listeners={({ navigation, route }) => ({
              tabPress: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true
                }).start()
              }
            })}
          />
          <Stack.Screen
            name='UserChart_home'
            component={UserChart_home}
            listeners={({ navigation, route }) => ({
              tabPress: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true
                }).start()
              }
            })}
          />
          <Stack.Screen
            name='TabNavigator'
            component={TabNavigator}
            listeners={({ navigation, route }) => ({
              tabPress: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2,
                  useNativeDriver: true
                }).start()
              }
            })}
          />
          <Stack.Screen
            name='ChatCohere'
            component={ChatCohere}
            listeners={() => ({
              tabPress: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3,
                  useNativeDriver: true
                }).start()
              }
            })}
          />
          <Stack.Screen
            name='UserQr_home'
            component={UserQr_home}
            listeners={() => ({
              tabPress: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 4,
                  useNativeDriver: true
                }).start()
              }
            })}
          />
        </tab.Navigator>
        <Animated.View
          style={{
            width: 50,
            height: 4,
            position: 'absolute',
            backgroundColor: '#494',
            bottom: 50,
            left: 14,
            borderRadius: 50,
            transform: [{ translateX: tabOffsetValue }]
          }}
        />
<<<<<<< HEAD
        <Stack.Screen
          name="UserChart_home"
          component={UserChart_home}
          listeners={({ navigation, route }) => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          listeners={({ navigation, route }) => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Stack.Screen
          name="ChatCohere"
          component={ChatCohere}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Stack.Screen
          name="UserQr_home"
          component={UserQr_home}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </tab.Navigator>
      <Animated.View
        style={{
          width: 50,
          height: 4,
          position: "absolute",
          backgroundColor: "#494",
          bottom: Platform.OS === 'ios' ? 66 : 50,
          left: 14,
          borderRadius: 50,
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </NavigationContainer>
  ) : (
    <LoginAthentication />
  );
=======
      </NavigationContainer>
      )
    : (
      <LoginAthentication />
      )
>>>>>>> ac05d2ef3b813cf1acc9a7331937aa9b01b6fb13
  // }
}

export default Navigator
