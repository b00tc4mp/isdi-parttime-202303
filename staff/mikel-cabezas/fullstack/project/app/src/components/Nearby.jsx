import React, { useEffect, useState, useContext } from "react";

import { Text, Image, View, ScrollView, TouchableHighlight, Modal } from 'react-native';
import { CLOSE } from '../../assets/icons';
import Context from '../AppContext.js'

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Nearby({ closeHandle }) {
    const { currentView, setCurrentView } = useContext(Context)

    const onClose = () => {
        closeHandle()
        // alert('hola')

    }

    return <>
        <View className="">
            <Modal
                animationType="slide"
                transparent={true}
                className="w-full justify-center flex content-center center">
                <View
                    className="w-10/12 left-[8.33%] absolute bottom-24 h-auto max-h-max p-5 bg-white rounded-[20px] mx-auto"
                >
                    <TouchableHighlight
                        className=" m-auto absolute right-0 top-0 mr-2 mt-1 z-10"
                        activeOpacity={1.0}
                        underlayColor="#fff"
                        onPress={() => {
                            onClose()
                            setCurrentView('home')
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
            </Modal>
        </View>
    </>
}