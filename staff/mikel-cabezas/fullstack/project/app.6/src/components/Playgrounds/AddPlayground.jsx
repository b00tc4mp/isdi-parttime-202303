import React, { useEffect, useState, useContext, useRef } from "react";

import { Text, Image, View, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { CLOSE, SUNNY, SHADY, DOUBLE_SWING, ONE_YEAR, SLIDE, TWO_YEAR, THREE_YEAR, ADD } from '../../../assets/icons';
import Context from '../../AppContext.js'
import * as Animatable from 'react-native-animatable';
import UploadImages from "./UploadImages";
import AddElement from './AddElement'
import { firebase } from '../../config/firebase.js'
import { ref, uploadBytes } from 'firebase/storage'

export default function CreatePlayground({ closeHandle }) {
    const { currentView, setCurrentView } = useContext(Context)
    const [playgroundName, setPlaygroundName] = useState()
    const [playgroundDescription, setPlaygroundDescription] = useState()
    const [playgroundSunnied, setPlaygroundSunnied] = useState(false)
    const [playgroundShady, setPlaygroundShady] = useState(false)
    const [animation, setAnimation] = useState('fadeInUp')
    const [colorToggleSunny, setColorToggleSunny] = useState('bg-mainGray')
    const [colorToggleShady, setColorToggleShady] = useState('bg-mainGray')
    const [modal, setModal] = useState([]);

    const colorRef = useRef()

    const onClose = () => closeHandle()

    const handleToggleSunnied = () => {
        setPlaygroundSunnied(current => !current)
    }

    const handleShady = () => {
        if (colorToggleShady === 'bg-mainGray')
            setColorToggleShady('bg-mainLime')
        if (colorToggleShady === 'bg-mainLime')
            setColorToggleShady('bg-mainGray')
    }

    const handleSunny = () => {
        if (colorToggleSunny === 'bg-mainGray')
            setColorToggleSunny('bg-mainYellow')
        if (colorToggleSunny === 'bg-mainYellow')
            setColorToggleSunny('bg-mainGray')
    }
    const onAddElement = () => {
        setModal('add-element')
        alert('TODO create new element')
    }

    useEffect(() => {
    }, [colorToggleSunny])

    useEffect(() => {
    }, [colorToggleShady])

    return <>
        {modal === 'add-element' && <AddElement />}
        <Animatable.View animation={animation} duration={200} className="w-full left-0 absolute bottom-0 h-auto max-h-max py-5 bg-white dark:bg-gray-800 rounded-[20px] mx-auto min-h-[300px] z-40" >

            <View className=" px-6 ">
                <Text className="dark:text-white text-2xl font-semibold">Add playground</Text>
                <Text className="dark:text-white text-lg mt-3 font-semibold">Info</Text>
                <Text className="dark:text-white mt-1 text-xs ">Playground name</Text>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={playgroundName}
                    onChangeText={setPlaygroundName}
                    autoCapitalize="none"
                    autoCompleteType=""
                    placeholder="Name"
                    className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-2 py-2 self-center w-full "
                    inputMode="text"
                    keyboardType="default"
                />
                <Text className="dark:text-white pt-3 text-xs ">Description (optional)</Text>
                <TextInput
                    label="Description"
                    returnKeyType="done"
                    value={playgroundDescription}
                    onChangeText={setPlaygroundDescription}
                    secureTextEntry
                    placeholder="Description"
                    className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700  rounded-xl my-1 px-2 py-2 self-start w-full h-[85px]"
                    inputMode="text"
                    keyboardType="default"
                    multiline={true}

                />
                <Text className="dark:text-white text-lg mt-3 font-semibold">Exposición al sol y sombra</Text>
                <View className="flex-row">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainLime rounded-full mb-1 mt-2 mr-3 ${colorToggleShady}`}
                        onPress={() => {
                            handleShady()
                        }}>
                        <View className="font-bold px-3 py-2 rounded-full flex-row">
                            <Image className="w-5 h-5 mr-2" source={SHADY} />
                            <Text className="font-bold text-center text-sm   rounded-full">Shady</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainYellow rounded-full mb-1 mt-2 ${colorToggleSunny}`}
                        onPress={() => {
                            handleSunny()
                        }}>
                        <View className="font-bold px-3 py-2 rounded-full flex-row">
                            <Image className="w-5 h-5 mr-2" source={SUNNY} />
                            <Text className="font-bold text-center text-sm   rounded-full">Sunny</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text className="dark:text-white text-lg mt-3 font-semibold">Elements</Text>
                <View className="flex-row flex-wrap">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainLime rounded-full mb-1 mt-2 mr-3 bg-mainGray`}
                        onPress={() => {
                            // handleShady()
                        }}>
                        <View className="font-bold px-3 py-0.5 flex-row items-center">
                            <Image className="w-5 h-5 mr-2" source={SLIDE} />
                            <Text className="font-bold text-center text-sm">Slide</Text>
                            <View className="rounded-xl bg-mainLime flex justify-center justify-items-center p-1 ml-2">
                                <Image className="h-6 w-6 object-cover" source={THREE_YEAR} />

                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainYellow rounded-full mb-1 mt-2 mr-3 bg-mainGray`}
                        onPress={() => {
                            // handleSunny()
                        }}>
                        <View className="font-bold px-3 py-0.5 flex-row items-center">
                            <Image className="w-5 h-5 mr-2" source={DOUBLE_SWING} />
                            <Text className="font-bold text-center text-sm">Swing</Text>
                            <View className="rounded-xl bg-mainLime flex justify-center justify-items-center p-1 ml-2">
                                <Image className="h-6 w-6 object-cover" source={ONE_YEAR} />

                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainYellow rounded-full mb-1 mt-2 bg-mainGray py-1.5 pyx-[5px] pr-1`}
                        onPress={onAddElement}>
                        <View className="font-bold px-3 py-0.5 flex-row items-center my-auto" >
                            <Image className="w-5 h-5 mr-2" source={ADD} />
                            <Text className="font-bold text-center text-sm">Add element</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <Text className="dark:text-white text-lg mt-3 font-semibold">Images <Text className="dark:text-white text-sm mt-3 font-normal">(Max 5 images)</Text></Text>
            </View>
            <View className="bg-white dark:bg-gray-800 pl-6 pb-7">
                <UploadImages closeOnPlaygroundCreated={onClose} />
            </View>
        </Animatable.View>

    </>
}