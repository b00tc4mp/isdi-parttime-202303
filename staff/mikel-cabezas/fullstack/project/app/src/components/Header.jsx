import React, { useEffect, useState, useContext } from "react";
import Context from '../AppContext.js'
import {
    MENU, FILTER,
    WHITE_MENU, WHITE_MY_LOCATION
} from '../../assets/icons';
import { Keyboard, View, Image, TextInput, TouchableHighlight, Text } from 'react-native';


export default function Header({ handleCloseModals }) {

    if (colorScheme === 'dark') isDark = true
    let isDark
    let searchTimeOut

    const { modal, setModal, colorScheme } = useContext(Context)
    const [text, setChangeText] = React.useState();
    const [searchQuery, setSearchQuery] = React.useState();
    const [loading, setIsLoading] = React.useState();
    const [isTyping, setIsTyping] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState([]);

    useEffect(() => {
        setIsLoading(true)
    }, []);

    const onToggleSidebar = () => {
        setModal('sidebar')
    }

    useEffect(() => {
        clearTimeout(isTyping)
        setIsTyping()
    }, [searchQuery])

    const onSearchPlayground = () => {

    }

    const handleSearch = (query) => {
        setSearchQuery(query)
        const isTypingTimeout = setTimeout(() => {
            console.log(searchQuery)
        }, 3000);
        setIsTyping('isTypingTimeout')
    }
    return <>
        <View className="absolute w-full justify-center flex top-12 content-center">
            <View className="w-11/12 bg-white dark:bg-gray-800 rounded-full left-0 m-auto flex flex-row px-4 h-12">
                <TouchableHighlight
                    className={`p-[2px]`}
                    activeOpacity={1.0}
                    underlayColor="#fff"
                    onPress={() => {
                        onToggleSidebar()
                    }}>
                    <Image
                        className="w-8 h-8 m-auto"
                        source={isDark ? WHITE_MENU : MENU}
                    />
                </TouchableHighlight>
                <TouchableHighlight className="flex-1" >
                    <TextInput
                        onFocus={onSearchPlayground}
                        clearButtonMode="always"
                        inputMode="text"
                        className="px-8 py-3 flex-1 dark:text-white  text-left"
                        setChangeText={setChangeText}
                        onChangeText={(query) => handleSearch(query)}
                        value={text}
                        placeholder="Search playground in..."
                        keyboardType="default"
                    />
                </TouchableHighlight>
                <Image
                    className="w-7 h-7 m-auto"
                    source={isDark ? FILTER : FILTER} />
            </View>
        </View >
    </>
}
