import { useLoadScript } from "@react-google-maps/api";
import Map from './Components/Map'
import React from 'react'


export default function App(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAHtNeBELo0YBI0lmCVbd0lQ9BGTVd_fhQ",
        libraries: ["places"]
    })

    if(!isLoaded) return <div>Loading...</div>
    return <Map />
}