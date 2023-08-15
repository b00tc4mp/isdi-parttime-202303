import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, SafeAreaView, useColorScheme } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from "./src/navigation/MainStack.jsx";
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps'

import { StatusBar } from 'expo-status-bar';
// import { GOOGLE_MAPS_KEY } from '@env'

import AppContext from "./src/AppContext.js";
const { Provider } = AppContext

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
  const [origin, setOrigin] = useState({})
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [loadCurrentLocation, setLoadCurrentLocation] = useState(false)

  const [currentMarker, setCurrentMarker] = useState({})
  let colorScheme = useColorScheme();

  const [colorPalette, setColorPalette] = useState()

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
        setAnimation, TOKEN, setTOKEN, origin, setOrigin, location, setLocation, colorPalette, loadCurrentLocation, setLoadCurrentLocation
      }}>
        <HideKeyboard>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </HideKeyboard>
      </Provider>

    </>
  );
}

