import * as React from 'react';

import { Text, View, ScrollView, Animated } from 'react-native';

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});


export default function Nearby() {

    return <Animated.View className="absolute w-full justify-center flex bottom-24 content-center">
        <ScrollView
            className="w-10/12 h-[40vh] p-5 bg-white rounded-[20px] left-0 m-auto"
            horizontal="true"
        >
            <Text>hola</Text>
        </ScrollView>
    </Animated.View>
}