import { View, StatusBar, Text } from 'react-native';
import { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import AppContext from "../AppContext.js";
const { Provider } = AppContext
import Context from '../AppContext.js'

import * as Animatable from 'react-native-animatable';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';


import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BaseMap from '../components/Playgrounds/BaseMap';
import Nearby from '../components/Playgrounds/Nearby.jsx';
import SinglePlayground from '../components/Playgrounds/SinglePlayground.jsx';
import CreatePlayground from '../components/Playgrounds/AddPlayground.jsx';


export default function Home({ }) {
    const { modal, setModal, colorScheme, animation, setAnimation, currentView, setCurrentView } = useContext(Context)
    const [currentMarker, setCurrentMarker] = useState({})

    const sheetRef = useRef;

    // variables
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);


    const renderItem = useCallback(
        (item) => (
            <CreatePlayground key={item} />
        ),
        []
    );

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
            {modal === 'createPlayground' &&
                <BottomSheet
                    ref={sheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChange}
                >
                    <BottomSheetScrollView >
                        {data.map(renderItem)}
                    </BottomSheetScrollView>
                </BottomSheet>}
            <StatusBar style="auto" />
        </View >
    </>
}