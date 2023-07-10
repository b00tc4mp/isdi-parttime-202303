import * as React from 'react';
import { MENU, MY_LOCATION } from '../../assets/icons';
import { View, Image, TextInput } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Header() {
    const [text, onChangeText] = React.useState();

    return <View className="absolute w-full justify-center flex top-12 content-center">
        <View className="w-10/12 bg-white rounded-full left-0 m-auto flex flex-row px-4">
            <Image
                className="w-8 h-8 m-auto"
                source={MENU}
            />
            {/* <Text className="px-8 py-3 flex-1  self-center text-zinc-500" >Search playground in...</Text> */}
            <TextInput
                inputMode="text"
                className="px-8 py-3 flex-1  self-center"
                onChangeText={onChangeText}
                value={text}
                placeholder="Search playground in..."
                keyboardType="default"
            />
            <Image
                className="w-7 h-7 m-auto"
                source={MY_LOCATION} />
        </View>
    </View >
}
