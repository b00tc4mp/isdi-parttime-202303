import { View, StatusBar, Text } from 'react-native';
import { useContext, useState } from 'react';
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


    return <>
        <View className="flex-1 bg-white items-center justify-center">
            <Text>HOLA</Text>
            <StatusBar style="auto" />
        </View >
    </>
}