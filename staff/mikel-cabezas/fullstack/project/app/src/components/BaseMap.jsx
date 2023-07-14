import * as React from 'react';
import { PIN } from '../../assets/icons';
import { Text, View, Modal, Animated, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { } from 'react-native';
import * as Location from 'expo-location';
import { NativeWindStyleSheet } from "nativewind";
import Playgrounds from './Playgrounds';

// import returnPlaygrounds from '../logic/retrievePlaygrounds'
// import playgrounds from '../../../api/data/parks.json'

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function BaseMap({ onMarkerPressed, id, title, description }) {
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
    const onMarkerPressedHandler = (id, title, description) => {
        onMarkerPressed()
    }
    return <>
        <MapView
            // userInterfaceStyle={'dark'}
            className="w-full h-[120%] top-0 absolute"
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Playgrounds onMarkerPressedHandler={onMarkerPressedHandler} />

        </MapView>
        {/* <View className="h-10 absolute bottom-24 w-10/12 flex flex-1">
            <Animated.ScrollView horizontal className="w-11/12 flex flex-1 ">
                <View className="h-20 bg-[red] w-[100vw] flex flex-1 bg-white">
                    <View className="h-20 bg-[red] w-full flex flex-1">
                        <Text className="w-full flex flex-1">The new text</Text>
                    </View>
                </View>
            </Animated.ScrollView>
        </View> */}
    </>
}