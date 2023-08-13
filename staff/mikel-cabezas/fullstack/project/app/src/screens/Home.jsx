import { View, StatusBar, Text, Alert } from 'react-native';
import { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import AppContext from "../AppContext.js";
const { Provider } = AppContext
import Context from '../AppContext.js'

import * as Animatable from 'react-native-animatable';
import BottomSheet from '@gorhom/bottom-sheet';

import Sidebar from '../components/Header/Sidebar.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer.jsx';
import BaseMap from '../components/Playgrounds/BaseMap';
import Nearby from '../components/Playgrounds/Nearby.jsx';
import SinglePlayground from '../components/Playgrounds/SinglePlayground.jsx';
import CreatePlayground from '../components/Playgrounds/addPlayground/AddPlayground.jsx';
import retrieveUser from "../logic/users/retrieveUser"


export default function Home({ navigation, onSendViewPlaygroundsFromCity }) {
    const { modal, setModal, colorScheme, TOKEN, animation, setAnimation, currentView, setCurrentView } = useContext(Context)
    const [currentMarker, setCurrentMarker] = useState({})
    const [newPlaygroundStatus, setNewPlaygroundStatus] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [user, setUser] = useState()

    const bottomSheetRef = useRef();
    const snapPoints = useMemo(() => ['75%', '94%'], []);
    const snapPointsSmall = useMemo(() => ['42%', '65%'], []);
    let mainColor
    if (colorScheme === 'dark') {
        mainColor = 'rgb(31 41 55)'
    } else if (colorScheme === 'light') {
        mainColor = '#ffffff'
    }
    // const snapPointsSinglePlayground = useMemo(() => ['70%', '85%'], []);

    const handleSheetChanges = useCallback((index) => {
        console.log(newPlaygroundStatus)
        if (newPlaygroundStatus === false && index === -1) {
            confirmCloseModal()
            // setModal('')
            // setCurrentView('')
        }
        console.log('handleSheetChanges', index);
    }, []);
    const handleSheetChangesSingle = useCallback((index) => {
        console.log(newPlaygroundStatus)
        if (index === -1) {
            bottomSheetRef.current.close()
            setModal('')
            setCurrentView('')
        }
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        retrieveUser(TOKEN)
            .then(user => {
                setUser(user)
                console.log(user)
            })
    }, [])

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
        if (modal === 'createPlayground') {
            confirmCloseModal()
        } else if (modal) { bottomSheetRef.current.close() }
    }
    const onCloseAddPlayground = () => {
        setNewPlaygroundStatus(true)
        bottomSheetRef.current.close()
        setModal('')
        setCurrentView('')
        setTimeout(() => {
            setNewPlaygroundStatus(false)
        }, 1000);
    }
    const markerPressedHandler = props => {
        // const playground = currentMarker
        setModal('singlePlayground')
    }
    const onCloseSidebar = () => {
        setTimeout(() => {
            setModal()
        }, 300)
    }
    const confirmCloseModal = () =>
        Alert.alert('Confirm', 'Do you want to discard changes?', [
            {
                text: 'Cancel',
                onPress: () => bottomSheetRef.current.snapToIndex(1),
                style: 'cancel',
            },
            {
                text: 'Discard', onPress: () => {
                    bottomSheetRef.current.close()
                    setModal('')
                    setCurrentView('')
                }
            },
        ]);

    const handleViewPlaygroundsFromCity = (results) => {
        console.log('the result on HOME', results)
        setSearchResult(results)
    }

    const handleToggleSidebar = () => {
        setModal('sidebar')
    }


    return <>
        <View className="flex-1 bg-white items-center justify-center">
            {modal === 'sidebar' && <Sidebar navigation={navigation} user={user} closeHandle={onCloseSidebar} />}
            <BaseMap user={user} className="-z-20" onMarkerPressed={markerPressedHandler} searchResult={searchResult} />
            <Header handleToggleSidebar={handleToggleSidebar} handleCloseModals={onCloseModal} onHandleViewPlaygroundsFromCity={handleViewPlaygroundsFromCity} />
            <Footer nearbyHandler={onNearby} createPlaygroundHandler={onCreatePlayground} homeHandler={onHome} />
            {modal === 'singlePlayground' && <BottomSheet
                // style={{ backgroundColor: "transparent" }}
                backgroundStyle={{
                    backgroundColor: `${mainColor}`
                }}
                enablePanDownToClose
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChangesSingle}>
                <SinglePlayground className="z-[90] h-screen relative " closeHandle={onCloseModal} playground={currentMarker}></SinglePlayground>
            </BottomSheet>
            }
            {modal === 'nearby' &&
                <BottomSheet
                    // style={{ width: '90%', marginLeft: '5%' }}
                    enablePanDownToClose
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPointsSmall}
                    onChange={handleSheetChangesSingle}>
                    <Nearby closeHandle={onCloseModal} playground={currentMarker}></Nearby>
                </BottomSheet>

            }
            {modal === 'createPlayground' &&
                <BottomSheet
                    enablePanDownToClose
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}>
                    <CreatePlayground closeHandle={onCloseAddPlayground} cancelAddPlayground={confirmCloseModal} />
                </BottomSheet>
            }
            <StatusBar style="auto" />
        </View >
    </>
}