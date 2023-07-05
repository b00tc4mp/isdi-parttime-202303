import * as React from 'react';
// import Home from './assets/icons/home.svg';

import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
// import { GOOGLE_MAPS_KEY } from '@env'
import { Icon } from "@react-native-material/core";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {

  const [text, onChangeText] = React.useState();


  <SafeAreaView />

  const [origin, setOrigin] = React.useState({
    latitude: 41.2288403,
    longitude: 1.7253999,
  })
  React.useEffect(() => {
    getLocationPermission()
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access location was denied')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: Location.coords.latitude,
      longitude: Location.coords.longitude
    }
    setOrigin(current)
  }
  const pin = {
    latitude: 41.2275774,
    longitude: 1.7253157,
  }
  return (
    <>
      <View className="flex-1 bg-white items-center justify-center">
        <MapView
          className="w-full h-[120%] top-0 absolute"
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={pin}
            title={'OK'}
            description={'test'}
          />
        </MapView>
        <View className="absolute w-full justify-center flex top-12 content-center">
          <View className="w-10/12 bg-white rounded-full left-0 m-auto flex flex-row px-4">
            <Image
              className="w-8 h-8 m-auto"
              source={{
                uri: 'http://192.168.68.117:19000/assets/icons/menu.png',
              }} />
            {/* <Text className="px-8 py-3 flex-1  self-center text-zinc-500" >Search playground in...</Text> */}
            <TextInput
              inputMode="text"
              className="px-8 py-3 flex-1  self-center"
              onChangeText={onChangeText}
              value={text}
              placeholder="Search playground in..."
              keyboardType="default"
            />
            <Image
              className="w-7 h-7 m-auto"
              source={{
                uri: 'http://192.168.68.117:19000/assets/icons/my_location.png',
              }} />
          </View>
        </View >
        <View className="absolute w-full justify-center flex bottom-8 content-center">
          <View className="w-10/12 h-12 bg-white rounded-full left-0 m-auto flex flex-row ">
            {/* <Text className=" px-8  py-3 text-center   self-center" >Menu Footer goes here!</Text> */}
            {/* <Home width={20} height={20} /> */}
            <Image
              className="w-8 h-8 m-auto"
              source={{
                uri: 'http://192.168.68.117:19000/assets/icons/home.png',
              }}
            />
            <Image
              className="w-8 h-8 m-auto"
              source={{
                uri: 'http://192.168.68.117:19000/assets/icons/nearby.png',
              }}
            />
            <Image
              className="w-8 h-8 m-auto"
              source={{
                uri: 'http://192.168.68.117:19000/assets/icons/search.png',
              }}
            />
          </View>
        </View >
        <StatusBar style="auto" />

      </View >


    </>



  );
}

