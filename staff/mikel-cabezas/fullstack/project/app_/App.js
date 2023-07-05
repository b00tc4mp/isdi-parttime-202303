import * as React from 'react';
// import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions'
// import { GOOGLE_MAPS_KEY } from '@env'
// import { Callout } from 'react-native-maps';



const [origin, setOrigin] = React.useState({
  latitude: 41.2288403,
  longitude: 1.7253999,
})
const [destination, setDestination] = React.useState({
  latitude: 41.2275774,
  longitude: 1.7253157,
})

export default function App() {
  return (

    <View View style={styles.container} >
      <Text>Open up App.js to start working on your app!</Text>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
