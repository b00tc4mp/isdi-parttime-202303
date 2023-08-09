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


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return;
      }

      let location = await Location.getCurrentPositionAsync({}).then(res => {
        console.log(res)
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
          {/* <Login /> */}
          {/* <View className="flex-1 bg-white items-center justify-center">
            {modal === 'sidebar' && <Sidebar closeHandle={onCloseSidebar} />}
            <BaseMap className="-z-20" onMarkerPressed={markerPressedHandler} />
            <Header />
            {modal === 'singlePlayground' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0" ><SinglePlayground className="z-[90]" closeHandle={onCloseModal} park={currentMarker}></SinglePlayground></Animatable.View>}
            {modal === 'nearby' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0" ><Nearby className="-z-10" closeHandle={onCloseModal} park={currentMarker}></Nearby></Animatable.View>}
            {modal === 'createPlayground' && <CreatePlayground className="" closeHandle={onCloseModal}></CreatePlayground>}

            {!modal && <Footer className="z-10" nearbyHandler={onNearby} createPlaygroundHandler={onCreatePlayground} homeHandler={onHome} />}
            <StatusBar style="auto" />
          </View > */}
        </HideKeyboard>
      </Provider>

    </>
  );
}

