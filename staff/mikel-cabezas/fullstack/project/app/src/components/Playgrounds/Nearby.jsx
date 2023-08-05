import React, { useEffect, useState, useContext } from "react";

import { Text, Image, View, ScrollView, TouchableHighlight, Modal, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CLOSE } from '../../../assets/icons';
import Context from '../../AppContext.js'

import { NativeWindStyleSheet } from "nativewind";
import NearbyPlaygrounds from "./NearbyPlaygrounds";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Nearby({ closeHandle, park }) {
    const { currentView, setCurrentView } = useContext(Context)
    // const { currentMarker, setCurrentMarker } = useContext(Context)
    const [animation, setAnimation] = useState('fadeInUp')

    const onClose = () => {
        setAnimation('fadeOutDown')
        closeHandle()
        // alert('hola')
        setAnimation()
    }

    return <>
        {park &&
            <Animatable.View animation={animation} duration={200} className="w-11/12 left-[4.165%] absolute bottom-[92px] h-auto max-h-max p-5 pr-0 bg-white rounded-[20px] mx-auto min-h-[300px]" >
                <View className="flex-row">
                    <Text className=" font-bold text-sm">Nearby</Text>
                    <TouchableHighlight
                        className=" m-auto relative mr-2 mt-1 z-20 "
                        activeOpacity={1.0}
                        underlayColor="#fff"
                        onPress={() => {

                            onClose()
                            setCurrentView('')
                        }}>
                        <Image
                            // className={`w-8 h-8 m-auto`}
                            className={`w-8 h-8 m-auto relative bottom-3`}
                            source={CLOSE}
                        />
                    </TouchableHighlight>
                </View>
                <View className="w-auto" >
                </View>
                <NearbyPlaygrounds />
            </Animatable.View>
        }








        {/* <Modal
            animationType="slide"
            transparent={true}
            className="w-full justify-center flex content-center center h-auto max-h-max"
            onRequestClose={() => {
                alert('')
                setCurrentView('')
                onClose()
            }}
        >
            <View
                className="w-10/12 left-[8.33%] absolute bottom-24 h-auto max-h-max p-5 bg-white rounded-[20px] mx-auto"
            >
                <TouchableHighlight
                    className=" m-auto absolute right-0 top-0 mr-2 mt-1 z-10"
                    activeOpacity={1.0}
                    underlayColor="#fff"
                    onPress={() => {
                        onClose()
                        setCurrentView('')
                    }}>
                    <Image
                        // className={`w-8 h-8 m-auto`}
                        className={`w-8 h-8 m-auto `}
                        source={CLOSE}
                    />
                </TouchableHighlight>


                <ScrollView
                    horizontal="true"
                >
                    <Text className="pt-4">hola</Text>
                </ScrollView>
            </View>
        </Modal> */}

    </>
}