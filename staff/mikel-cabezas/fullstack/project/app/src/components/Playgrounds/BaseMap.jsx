import * as React from 'react';
import { PIN, USER_LOCATION, MY_LOCATION, WHITE_MY_LOCATION } from '../../../assets/icons';
import { Text, View, Modal, Animated, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { useRef, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { NativeWindStyleSheet } from "nativewind";
import Playgrounds from './Playgrounds';
import AppContext from "../../AppContext.js";
const { Provider } = AppContext
import Context from '../../AppContext'



// import returnPlaygrounds from '../logic/retrievePlaygrounds'
// import playgrounds from '../../../api/data/parks.json'

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function BaseMap({ onMarkerPressed, id, title, description }) {
    const mapRef = useRef(null);
    const { colorScheme, currentMarker, setCurrentMarker, origin, setOrigin, location, setLocation, loadCurrentLocation, setLoadCurrentLocation } = useContext(Context)

    let isDark
    if (colorScheme === 'dark') isDark = true

    const onMarkerPressedHandler = (id, title, description) => {
        onMarkerPressed()

    }

    const onCurrentLocation = () => {
        const onCurrentMarkerRegion = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
        mapRef.current.animateToRegion(onCurrentMarkerRegion, 1 * 1000);
    }

    useEffect(() => {
        if (loadCurrentLocation) {
            const onCurrentMarkerRegion = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
            mapRef.current.animateToRegion(onCurrentMarkerRegion, 1 * 1000);
        }
    }, [loadCurrentLocation])

    useEffect(() => {
        console.log('currentMarker', currentMarker)
        console.log('currentMarker.location', currentMarker.location)
        if (currentMarker.location) {
            const onCurrentMarkerRegion = {
                latitude: currentMarker.location.coordinates[0] - 0.0065,
                longitude: currentMarker.location.coordinates[1] - 0.0001,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
            mapRef.current.animateToRegion(onCurrentMarkerRegion, 1 * 1000);
        }
    }, [currentMarker])
    return <>
        {loadCurrentLocation && <MapView
            // userInterfaceStyle={'dark'}
            ref={mapRef}
            showsUserLocation={true}
            // followsUserLocation={true}

            className="w-full h-[120%] top-0 absolute"
            initialRegion={{
                // latitude: 43.228833,
                // longitude: 1.7255048,
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                tooltip={false}
                key={-1}
                width={48}
                coordinate={origin} >
                <Image source={USER_LOCATION} className="w-[38px] h-[45px] object-contain" />
                <Callout tooltip >

                </Callout>
            </Marker>

            <Playgrounds onMarkerPressedHandler={onMarkerPressedHandler} />

        </MapView>

        }
        <TouchableOpacity className="bg-white p-1 rounded-full absolute right-4 bottom-20 mb-4"
            activeOpacity={0.8}
            onPress={() => onCurrentLocation()}>
            <Image
                className="w-8 h-8 m-auto "
                source={isDark ? WHITE_MY_LOCATION : MY_LOCATION} />
        </TouchableOpacity>

    </>
}