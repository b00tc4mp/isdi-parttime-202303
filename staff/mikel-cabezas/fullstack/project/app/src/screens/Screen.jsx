import { View, StatusBar, Text } from 'react-native';
import { useContext, useState } from 'react';
import AppContext from "../AppContext.js";
const { Provider } = AppContext
import Context from '../AppContext.js'



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