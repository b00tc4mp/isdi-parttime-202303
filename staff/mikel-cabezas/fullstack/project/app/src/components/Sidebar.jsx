import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { MENU, MY_LOCATION, CLOSE } from '../../assets/icons';
import { NativeWindStyleSheet } from "nativewind";
import Context from '../AppContext.js'
import * as Animatable from 'react-native-animatable';

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Sidebar({ closeHandle }) {
    const { currentView, setCurrentView } = useContext(Context)
    // const { animation, setAnimation } = useContext(Context)
    const [animation, setAnimation] = useState()

    const onClose = () => {
        setAnimation('fadeOutLeft')
        closeHandle()
    }

    useEffect(() => {
        setAnimation('fadeInLeft')
        setTimeout(() => {
            setAnimation()
        }, 300)
    }, [])

    useEffect(() => {
        // setAnimation('fadeInRight')
    }, [animation])
    return <>
        <Animatable.View animation={animation} duration={250} className="absolute w-2/3 h-full flex top-0 left-0 bg-white z-50" >

            <View className="w-12/12 rounded-full left-0 flex flex-col pr-2 pl-4 pt-11 pb-8 h-full">
                <View className="w-12/12 flex-row py-3 ">
                    <TouchableHighlight
                        className=" m-auto absolute right-0 top-0 mr-0 mt-0 z-10"
                        activeOpacity={1.0}
                        underlayColor="#fff"
                        onPress={() => {
                            setAnimation('fadeInRight')
                            onClose()
                            setCurrentView('home')
                        }}>
                        <Image
                            // className={`w-8 h-8 m-auto`}
                            className={`w-8 h-8 m-auto `}
                            source={CLOSE}
                        />
                    </TouchableHighlight>
                </View>
                <View className="w-12/12 flex-row pb-3 pt-2">
                    <Image
                        className="w-8 h-8"
                        source={MENU}
                    />
                    <Text className="px-4 flex-1 text-lg font-semibold" >
                        Hi ${'{username}'}!
                    </Text>
                </View>
                <View className="w-12/12 flex-row">
                    <Image
                        className="w-8 h-8"
                        source={MENU}
                    />
                    <Text className="px-4 flex-1 self-center" >
                        My contributions
                    </Text>
                </View>

                <View className="w-12/12 flex-row py-3">
                    <Image
                        className="w-8 h-8"
                        source={MENU}
                    />
                    <Text className="px-4 flex-1 self-center" >
                        My reviews
                    </Text>
                </View>
                <View className="w-12/12 flex-row py-3 mt-auto">
                    <Image
                        className="w-8 h-8"
                        source={MENU}
                    />
                    <Text className="px-4 flex-1 self-center" >
                        My Account
                    </Text>
                </View>
                <View className="w-12/12 flex-row py-3  ">
                    <Image
                        className="w-8 h-8"
                        source={MENU}
                    />
                    <Text className="px-4 flex-1 self-center" >
                        Logout
                    </Text>
                </View>

            </View>
        </Animatable.View >
    </>
}
