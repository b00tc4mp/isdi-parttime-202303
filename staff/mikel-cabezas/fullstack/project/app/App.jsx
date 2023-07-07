// import * as React from 'react';
import React, { useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';

// import { Footer, Header } from './src/components';
import Footer from './src/components/Footer.jsx';
import Header from './src/components/Header.jsx';
import BaseMap from './src/components/BaseMap.jsx';
import Nearby from './src/components/Nearby.jsx';
import CreatePlayground from './src/components/CreatePlayground.jsx';

import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
// import { GOOGLE_MAPS_KEY } from '@env'
import { NativeWindStyleSheet } from "nativewind";
import AppContext from "./src/AppContext.js";
const { Provider } = AppContext
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App({ }) {
  const [view, setView] = useState('home')
  const [modal, setModal] = useState()
  const [currentView, setCurrentView] = useState()
  const [animation, setAnimation] = useState()
  const [currentMarker, setCurrentMarker] = useState({})

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
  const onClose = () => {
    setAnimation('fadeOutDown')
    setTimeout(() => {
      setModal()
      setAnimation()

    }, 300)
  }
  const markerPressedHandler = props => {
    const playground = {
      id: props.target._internalFiberInstanceHandleDEV.memoizedProps.id,
      title: props.target._internalFiberInstanceHandleDEV.memoizedProps.title,
      description: props.target._internalFiberInstanceHandleDEV.memoizedProps.description
    }
    setCurrentMarker(playground)
    console.log(currentMarker)

    alert(`title: ${playground.title} \n id: ${playground.id} \n description: ${playground.description}`)
  }
  // const onSendPlayground = () => {
  // setModal('nearby')
  // }
  return (
    <>
      <Provider value={{ currentView, setCurrentView, currentMarker, setCurrentMarker }}>
        <View className="flex-1 bg-white items-center justify-center">
          <BaseMap className="-z-20" onMarkerPressed={markerPressedHandler} />
          <Header />
          {modal === 'nearby' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0" ><Nearby className="-z-10" closeHandle={onClose} park={currentMarker}></Nearby></Animatable.View>}
          {modal === 'createPlayground' && <CreatePlayground className="" closeHandle={onClose}></CreatePlayground>}

          <Footer className="" nearbyHandler={onNearby} createPlaygroundHandler={onCreatePlayground} homeHandler={onHome} />
          <StatusBar style="auto" />
        </View >
      </Provider>


    </>



  );
}

