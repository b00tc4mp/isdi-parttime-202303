import * as React from 'react';
import { PIN } from '../../assets/icons';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function BaseMap() {
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
    return <MapView
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
            image={PIN}
        />
    </MapView>
}