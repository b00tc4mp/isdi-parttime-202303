import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from "./src/navigation/BottomTab.jsx";


import useFonts from "./src/hooks/useFonts.js";
import Login from './src/components/Login';
import Register from './src/components/Register';
import Footer from './src/components/Footer';
import Header from './src/components/Header';
import BaseMap from './src/components/BaseMap';
import Nearby from './src/components/Nearby';
import SinglePlayground from './src/components/SinglePlayground';
import Sidebar from './src/components/Sidebar';
import CreatePlayground from './src/components/CreatePlayground';
import Home from './src/screens/Home';

import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
// import { GOOGLE_MAPS_KEY } from '@env'

import AppContext from "./src/AppContext.js";
const { Provider } = AppContext
let loggedIn


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

  const [currentMarker, setCurrentMarker] = useState({})
  let colorScheme = useColorScheme();

  const onHome = () => {
    setModal('')
    // alert('hola')
  }
  const onNearby = () => {
    setModal('nearby')
    // alert('hola')
  }
  const onCreatePlayground = () => {
    // alert('Passed to App')
    setModal('createPlayground')
  }
  const onCloseModal = () => {
    setAnimation('fadeOutDown')
    setTimeout(() => {
      setModal()
      setAnimation()
    }, 300)
  }
  const onCloseSidebar = () => {
    setTimeout(() => {
      setModal()
    }, 300)
  }
  const markerPressedHandler = props => {
    const playground = currentMarker
    setModal('singlePlayground')
    // alert(`title: ${playground.title} \n id: ${playground.id} \n description: ${playground.description}`)
  }
  // const onSendPlayground = () => {
  // setModal('nearby')
  // }

  const Stack = createNativeStackNavigator()

  return (
    <>
      <Provider value={{ currentView, setCurrentView, currentMarker, setCurrentMarker, modal, setModal, colorScheme }}>
        <HideKeyboard>
          <NavigationContainer>

            <Stack.Navigator
              initialRouteName="Home"
              options={{ presentation: 'transparentModal' }}
              screenOptions={{
                headerShown: false

              }}


            >
              <Stack.Screen name="Home">
                {() => <Home />}

              </Stack.Screen>

            </Stack.Navigator>
          </NavigationContainer>
        </HideKeyboard>
      </Provider>

    </>
  );
}

