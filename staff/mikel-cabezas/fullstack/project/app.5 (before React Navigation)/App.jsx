// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import * as Animatable from 'react-native-animatable';

import useFonts from "./src/hooks/useFonts.js";
// import { Footer, Header } from './src/components';
import Login from './src/components/Login.jsx';
import Register from './src/components/Register.jsx';
import Footer from './src/components/Footer.jsx';
import Header from './src/components/Header.jsx';
import BaseMap from './src/components/BaseMap.jsx';
import Nearby from './src/components/Nearby.jsx';
import SinglePlayground from './src/components/SinglePlayground.jsx';
import Sidebar from './src/components/Sidebar.jsx';
import CreatePlayground from './src/components/CreatePlayground.jsx';

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
  return (
    <>

      <Provider value={{ currentView, setCurrentView, currentMarker, setCurrentMarker, modal, setModal, colorScheme }}>
        <HideKeyboard>
          <View className="flex-1 bg-white items-center justify-center">
            {modal === 'sidebar' && <Sidebar closeHandle={onCloseSidebar} />}
            <BaseMap className="-z-20" onMarkerPressed={markerPressedHandler} />
            <Header />
            {modal === 'singlePlayground' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0" ><SinglePlayground className="z-[90]" closeHandle={onCloseModal} park={currentMarker}></SinglePlayground></Animatable.View>}
            {modal === 'nearby' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0" ><Nearby className="-z-10" closeHandle={onCloseModal} park={currentMarker}></Nearby></Animatable.View>}
            {modal === 'createPlayground' && <CreatePlayground className="" closeHandle={onCloseModal}></CreatePlayground>}

            {!modal && <Footer className="z-10" nearbyHandler={onNearby} createPlaygroundHandler={onCreatePlayground} homeHandler={onHome} />}
            <StatusBar style="auto" />
          </View >
        </HideKeyboard>
      </Provider>

    </>
  );
}

