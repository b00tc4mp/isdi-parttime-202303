import { View, StatusBar, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AppContext from "../AppContext.js";
const { Provider } = AppContext
import Context from '../AppContext.js'

import * as Animatable from 'react-native-animatable';

import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BaseMap from '../components/BaseMap.jsx';
import Nearby from '../components/Nearby.jsx';
import SinglePlayground from '../components/SinglePlayground.jsx';
import CreatePlayground from '../components/CreatePlayground.jsx';


export default function Home({ }) {
    const { modal, setModal, colorScheme, animation, setAnimation } = useContext(Context)
    const [currentMarker, setCurrentMarker] = useState({})

    const onHome = () => {
        setModal('')
    }
    const onNearby = () => {
        setModal('nearby')
    }
    const onCreatePlayground = () => {
        setModal('createPlayground')
    }
    const onCloseModal = () => {
        setAnimation('fadeOutDown')
        setTimeout(() => {
            setModal()
            setAnimation()
        }, 300)
        setModal('')
    }
    const markerPressedHandler = props => {
        const playground = currentMarker
        setModal('singlePlayground')
        // alert(`title: ${playground.title} \n id: ${playground.id} \n description: ${playground.description}`)
    }
    const onCloseSidebar = () => {
        setTimeout(() => {
            setModal()
        }, 300)
    }
    let modalWithFooterDisplay = true

    return <>
        <View className="flex-1 bg-white items-center justify-center">
            {modal === 'sidebar' && <Sidebar closeHandle={onCloseSidebar} />}
            <Footer nearbyHandler={onNearby} createPlaygroundHandler={onCreatePlayground} homeHandler={onHome} />
            <BaseMap className="-z-20" onMarkerPressed={markerPressedHandler} />
            <Header />
            {modal === 'singlePlayground' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0" ><SinglePlayground className="z-[90]" closeHandle={onCloseModal} park={currentMarker}></SinglePlayground></Animatable.View>}
            {modal === 'nearby' && <Animatable.View animation={animation} duration={250} className="w-full absolute bottom-0 z-50" ><Nearby closeHandle={onCloseModal} park={currentMarker}></Nearby></Animatable.View>}
            {modal === 'createPlayground' && <CreatePlayground className="" closeHandle={onCloseModal}></CreatePlayground>}
            <StatusBar style="auto" />
        </View >
    </>
}