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
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [view, setView] = useState('home')
  const [modal, setModal] = useState()
  const onNearby = () => {
    setModal('nearby')
    alert('hola')
  }




  return (
    <>
      <View className="flex-1 bg-white items-center justify-center">
        <BaseMap />
        <Header />
        {modal === 'nearby' && <Nearby></Nearby>}

        <Footer nearbyHandler={onNearby} />
        <StatusBar style="auto" />

      </View >


    </>



  );
}

