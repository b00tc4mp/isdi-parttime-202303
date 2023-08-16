import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, SafeAreaView, useColorScheme } from "react-native";
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';

import MainStack from "./src/navigation/MainStack.jsx";
import { StatusBar } from 'expo-status-bar';

import AppContext from "./src/AppContext.js";
const { Provider } = AppContext

const prefix = Linking.createURL('/');


const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);



export default function App({ }) {
  const [view, setView] = useState('home')
  const [modal, setModal] = useState()
  const [currentView, setCurrentView] = useState()
  const [animation, setAnimation] = useState()

  const [TOKEN, setTOKEN] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState()

  const [origin, setOrigin] = useState({})
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [loadCurrentLocation, setLoadCurrentLocation] = useState(false)

  const [currentMarker, setCurrentMarker] = useState({})
  let colorScheme = useColorScheme();

  const [colorPalette, setColorPalette] = useState()


  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Login: "Login",

        Register: {
          path: 'Register/:token',
          parse: {
            token: (token) => `${token}`
          }
        },

        SetNewPassword: {
          path: 'SetNewPassword/:token',
          parse: {
            token: (token) => `${token}`
          }
        }

      },
    }

  };

  useEffect(() => {
    if (colorScheme === 'dark') {
      setColorPalette({ mainDark: 'rgb(31 41 55)' })
    }
  }, [])

  useEffect(() => {
    (async () => {
      Location.enableNetworkProviderAsync()
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return;
      }
      await Location.getCurrentPositionAsync({ enableHighAccuracy: true, timeout: 1000 }).then(res => {
        // console.log('res.coords in App.jsx', res.coords)
        setLocation(res.coords);
        setLoadCurrentLocation(true)
      })
    })()
  }, [])

  return (
    <>
      <Provider value={{
        currentView, setCurrentView, currentMarker, setCurrentMarker, modal, setModal, colorScheme, animation,
        setAnimation, TOKEN, setTOKEN, origin, setOrigin, location, setLocation, colorPalette, loadCurrentLocation, setLoadCurrentLocation, isLoggedIn, setIsLoggedIn
      }}>
        <HideKeyboard>
          <NavigationContainer linking={linking} >
            <MainStack />
          </NavigationContainer>
        </HideKeyboard>
      </Provider>

    </>
  );
}

