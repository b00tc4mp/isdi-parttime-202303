// import * as React from 'react';
import React, { useEffect, useState } from "react";

// import { Footer, Header } from './src/components';
import Footer from './src/components/Footer.jsx';
import Header from './src/components/Header.jsx';
import BaseMap from './src/components/BaseMap.jsx';
import Nearby from './src/components/Nearby.jsx';

import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
// import { GOOGLE_MAPS_KEY } from '@env'
import { NativeWindStyleSheet } from "nativewind";
import AppContext from "./src/AppContext.js";
const { Provider } = AppContext
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [view, setView] = useState('home')
  const [modal, setModal] = useState()
  const [currentView, setCurrentView] = useState()
  const onNearby = () => {
    setModal('nearby')
    // alert('hola')
  }
  const onClose = () => {
    // alert('hola')
    setModal()
  }

  return (
    <>
      <Provider value={{ currentView, setCurrentView }}>
        <View className="flex-1 bg-white items-center justify-center">
          <BaseMap />
          <Header />
          {modal === 'nearby' && <Nearby className="z-10" closeHandle={onClose}></Nearby>}

          <Footer className="z-50" nearbyHandler={onNearby} />
          <StatusBar style="auto" />

        </View >
      </Provider>


    </>



  );
}

