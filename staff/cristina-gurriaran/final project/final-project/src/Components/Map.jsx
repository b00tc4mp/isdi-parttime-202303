import './Map.css'
import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker
} from '@react-google-maps/api'
// import Places from './places'


export default function Map(){
    const center = useMemo(() => ({
        lat: 41.387235215841294,
        lng: 2.170094517193916
    }), [])      
    
    return <div className="container">
        <div className="controls">
            <h1>Final Project</h1>
        </div>
        <div className="map">
            <GoogleMap 
                zoom={10} 
                center={center} 
                mapContainerClassName="map-container"> 

                {<Marker position={{ lat: 41.39057421645112, lng: 2.1706296269858676 }} />} 
                
            </GoogleMap>
        </div>
    </div>

}