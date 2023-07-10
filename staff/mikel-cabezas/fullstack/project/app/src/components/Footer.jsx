import React, { useEffect, useState, useContext } from "react";

import { HOME, NEARBY, SEARCH, LIKES, MORE_OPTIONS, ADD } from '../../assets/icons';
import { View, Image, TouchableHighlight, Alert } from 'react-native';
import Context from '../AppContext.js'
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});





export default function Footer({ nearbyHandler, createPlaygroundHandler, homeHandler }) {
    const { currentView, setCurrentView } = useContext(Context)
    const [activeElement, setActiveElement] = useState()

    const onHome = () => {
        homeHandler()
    }
    const onNearby = () => {
        nearbyHandler()
    }
    const onCreatePlayground = () => {
        createPlaygroundHandler()
    }


    return <View className="z-50 absolute w-full justify-center flex bottom-8 content-center">
        <View className="w-10/12 h-12 p-1 bg-white rounded-full left-0 m-auto flex flex-row justify-between px-5">


            <TouchableHighlight
                className={`p-1 ${currentView === 'home' && 'bg-[#B8F138] rounded-[10px] p-[2px] '}`}
                activeOpacity={1.0}
                underlayColor="#fff"
                onPress={() => {
                    onHome()
                    setCurrentView('')
                }}>
                <Image
                    className={`w-8 h-8 m-auto`}
                    source={HOME}
                />
            </TouchableHighlight>

            <TouchableHighlight
                className={`p-1 ${currentView === 'nearby' && 'bg-[#B8F138] rounded-[10px] p-[2px] '}`}
                activeOpacity={1.0}
                underlayColor="#fff"
                onPress={() => {
                    onNearby()
                    setCurrentView('nearby')
                }}>
                <Image
                    className={`w-8 h-8 m-auto`}
                    source={NEARBY}
                />
            </TouchableHighlight>

            <TouchableHighlight
                className={`p-1 ${currentView === 'liked' && 'bg-[#B8F138] rounded-[10px] p-[2px] '}`}
                activeOpacity={1.0}
                underlayColor="#fff"
                onPress={() => {
                    onNearby()
                    setCurrentView('liked')
                }}>
                <Image
                    className={`w-8 h-8 m-auto`}
                    source={LIKES}
                />
            </TouchableHighlight>

            <TouchableHighlight
                className={`p-1 ${currentView === 'search' && 'bg-[#B8F138] rounded-[10px] p-[2px] '}`}
                activeOpacity={1.0}
                underlayColor="#fff"
                onPress={() => {
                    onNearby()
                    setCurrentView('search')
                }}>
                <Image
                    className={`w-8 h-8 m-auto`}
                    source={SEARCH}
                />
            </TouchableHighlight>

            <TouchableHighlight
                className={`p-1 ${currentView === 'createPlayground' && 'bg-[#B8F138] rounded-[10px]'}`}
                activeOpacity={1.0}
                underlayColor="#fff"
                onPress={() => {
                    setCurrentView('createPlayground')
                    onCreatePlayground()
                }}
            >
                <Image
                    className="w-8 h-8 m-auto"
                    source={ADD}
                />
            </TouchableHighlight>
            <TouchableHighlight
                className={`p-1 pl-0 ${currentView === 'moreOptions' && 'bg-[#B8F138] rounded-[10px]'}`}
                activeOpacity={1.0}
                underlayColor="#fff"
                onPress={() => {
                    setCurrentView('moreOptions')
                    onCreatePlayground()
                }}
            >
                <Image
                    className="w-8 h-8 m-auto ml-0 "
                    source={MORE_OPTIONS}
                />
            </TouchableHighlight>


        </View>
    </View >
}