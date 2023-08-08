import React, { useEffect, useState, useContext, useRef } from "react";

import { Text, Image, View, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import {
    CLOSE, ADD,
    SUNNY, SHADY,
    SLIDE, SWING, DOUBLE_SWING, SEESAW, RIDER, SANDBOX, HOUSE, CLIMBER,
    ONE_YEAR, TWO_YEAR, THREE_YEAR, FOUR_YEAR, FIVE_YEAR, SIX_YEAR,
    ACCESSIBLE
} from '../../../assets/icons';
import Context from '../../AppContext.js'
import * as Animatable from 'react-native-animatable';
import UploadImages from "./UploadImages";
import AddElement from './AddElement'
import EditElement from './EditElement'
import { firebase } from '../../config/firebase.js'
import { ref, uploadBytes } from 'firebase/storage'
import addPlayground from '../../logic/playgrounds/addPlayground.js'

export default function CreatePlayground({ closeHandle, cancelAddPlayground }) {
    const { TOKEN } = useContext(Context)
    const [playgroundName, setPlaygroundName] = useState()
    const [playgroundDescription, setPlaygroundDescription] = useState()
    const [playgroundShady, setPlaygroundShady] = useState(false)
    const [playgroundSunny, setPlaygroundSunny] = useState(false)
    const [playgroundPartial, setPlaygrouPartial] = useState(false)
    const [playgroundElements, setPlaygroundElements] = useState([])
    const [colorToggleSunny, setColorToggleSunny] = useState('bg-mainGray')
    const [colorToggleShady, setColorToggleShady] = useState('bg-mainGray')
    const [colorTogglePartial, setColorTogglePartial] = useState('bg-mainGray')
    const [modal, setModal] = useState([]);
    const [editElement, setEditElement] = useState([]);
<<<<<<< HEAD

    const colorRef = useRef()
=======
>>>>>>> finish addPlaygroudn compo, with logics for render each image for ages and elements; create logics for connect to db; create logic in backend for add element; update models

    const onClose = () => closeHandle()

    const handleShady = () => {
        if (colorToggleShady === 'bg-mainGray') {
            setColorToggleShady('bg-mainLime')
            setPlaygroundShady(true)
        }
        if (colorToggleShady === 'bg-mainLime') {
            setColorToggleShady('bg-mainGray')
            setPlaygroundShady(false)
        }
    }

    const handleSunny = () => {
        if (colorToggleSunny === 'bg-mainGray') {
            setColorToggleSunny('bg-mainYellow')
            setPlaygroundSunny(true)
        }
        if (colorToggleSunny === 'bg-mainYellow') {
            setColorToggleSunny('bg-mainGray')
            setPlaygroundSunny(false)
        }
    }

    const handlePartial = () => {
        if (colorTogglePartial === 'bg-mainGray') {
            setColorTogglePartial('bg-[#38F1A3]')
            setPlaygrouPartial(true)
        }
        if (colorTogglePartial === 'bg-[#38F1A3]') {
            setColorTogglePartial('bg-mainGray')
            setPlaygrouPartial(false)
        }
    }
    const onAddElement = () => {
        setModal('add-element')
    }
    const handleEditElement = elementId => {
        setModal('edit-element')
        setEditElement(elementId)
    }
    const onNewElement = (element) => {
        setPlaygroundElements(currentElements => [...currentElements, element])
        setModal('')
    }
    const onEditElement = (element) => {
<<<<<<< HEAD

=======
>>>>>>> finish addPlaygroudn compo, with logics for render each image for ages and elements; create logics for connect to db; create logic in backend for add element; update models
        setPlaygroundElements(currentElements => {
            currentElements[element.id] = element
            return [...currentElements]
        })
<<<<<<< HEAD
        setModal('')
    }
    const onCancelHandleElement = () => {
=======
>>>>>>> finish addPlaygroudn compo, with logics for render each image for ages and elements; create logics for connect to db; create logic in backend for add element; update models
        setModal('')
    }
    const onCancelHandleElement = () => {
        setModal('')
    }
    const handleCancel = () => {
        cancelAddPlayground()
    }

    const onCreatePlayground = (storedImagesUrl) => {
        const sunExposition = { shady: playgroundShady, sunny: playgroundSunny, partial: playgroundPartial }
        try {
            console.log(addPlayground)
            addPlayground(TOKEN, playgroundName, playgroundDescription, sunExposition, playgroundElements, storedImagesUrl, '41.1985277,1.6663534')
                .then((res) => {
                    console.log(res)
                    onClose()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
    }, [colorToggleSunny, colorToggleShady, playgroundElements])

    const assignElementAge = (age) => {
        let AGE
        if (age === '+1') { AGE = ONE_YEAR }
        if (age === '+2') { AGE = TWO_YEAR }
        if (age === '+3') { AGE = THREE_YEAR }
        if (age === '+4') { AGE = FOUR_YEAR }
        if (age === '+5') { AGE = FIVE_YEAR }
        if (age === '+6') { AGE = SIX_YEAR }
        return AGE
    }

    const assignElementType = (type) => {
        let TYPE
        if (type === 'Slide') { TYPE = SLIDE }
        if (type === 'Swing') { TYPE = SWING }
        if (type === 'Double Swing') { TYPE = DOUBLE_SWING }
        if (type === 'Seesaw') { TYPE = SEESAW }
        if (type === 'Rider') { TYPE = RIDER }
        if (type === 'Sandbox') { TYPE = SANDBOX }
        if (type === 'House') { TYPE = HOUSE }
        if (type === 'Climber') { TYPE = CLIMBER }
        return TYPE
    }

    const assignElementStatus = (status) => {
        console.log('status', status)

        let STATUS
        if (status === 'Good') { STATUS = 'mainLime' }
        if (status === 'Acceptable') { STATUS = 'mainYellow' }
        if (status === 'Warn') { STATUS = '[#F18638]' }
        if (status === 'Dangerous') { STATUS = 'darkGreen' }

        return STATUS
    }

    return <>
        {modal === 'add-element' && <AddElement onElementCreated={onNewElement} id={playgroundElements.length} onCancelAddElement={onCancelHandleElement} />}
        {modal === 'edit-element' && <EditElement onElementEdited={onEditElement} element={playgroundElements[editElement]} onCancelEditElement={onCancelHandleElement} />}
<<<<<<< HEAD
        <Animatable.View animation={animation} duration={200} className="w-full left-0 absolute bottom-0 h-auto max-h-max py-5 bg-white dark:bg-gray-800 rounded-[20px] mx-auto min-h-[300px] z-40" >
=======
>>>>>>> finish addPlaygroudn compo, with logics for render each image for ages and elements; create logics for connect to db; create logic in backend for add element; update models

        <ScrollView className="flex-1">
            <View className=" px-6 w-full pt-5 pb-2.5 bg-white dark:bg-gray-800 rounded-[20px] mx-auto min-hs-[300px] z-40 ">
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
                <Text className="dark:text-white text-lg mt-3 font-semibold">Sun exposition</Text>
                <View className="flex-row">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainLime rounded-full mb-1 mt-2 mr-3 ${colorToggleShady}`}
                        onPress={() => {
                            handleShady()
                        }}>
                        <View className="font-bold px-3 py-2 rounded-full flex-row">
                            <Image className="w-5 h-5 mr-2" source={SHADY} />
                            <Text className="font-bold text-center text-sm rounded-full">Shady</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-mainYellow rounded-full mb-1 mt-2 mr-3 ${colorToggleSunny}`}
                        onPress={() => {
                            handleSunny()
                        }}>
                        <View className="font-bold px-3 py-2 rounded-full flex-row">
                            <Image className="w-5 h-5 mr-2" source={SUNNY} />
                            <Text className="font-bold text-center text-sm rounded-full">Sunny</Text>
                        </View>
                    </TouchableOpacity>
<<<<<<< HEAD
=======
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border border-[#38F1A3] rounded-full mb-1 mt-2 ${colorTogglePartial}`}
                        onPress={() => {
                            handlePartial()
                        }}>
                        <View className="font-bold px-3 py-2 rounded-full flex-row">
                            <Image className="w-5 h-5 mr-2" source={SUNNY} />
                            <Text className="font-bold text-center text-sm rounded-full">Partial</Text>
                        </View>
                    </TouchableOpacity>
>>>>>>> finish addPlaygroudn compo, with logics for render each image for ages and elements; create logics for connect to db; create logic in backend for add element; update models
                </View>
                <Text className="dark:text-white text-lg mt-3 font-semibold">Elements</Text>
                <View className="flex-row flex-wrap">
                    {playgroundElements.length !== 0 && playgroundElements.map(element => {
<<<<<<< HEAD
                        return <TouchableOpacity
                            activeOpacity={0.8}
                            className={`border border-mainLime rounded-full mb-1 mt-2 mr-3 bg-mainGray`}
                            onPress={() => {
                                handleEditElement(element.id)
                            }}>
                            <View className="font-bold px-3 py-0.5 flex-row items-center">
                                <Image className="w-5 h-5 mr-2" source={SLIDE} />
                                <Text className="font-bold text-center text-sm">{element.type}</Text>
                                <View className="rounded-xl bg-mainLime flex justify-center justify-items-center p-1 ml-2">
                                    <Image className="h-6 w-6 object-cover" source={THREE_YEAR} />

=======
                        const age = assignElementAge(element.age)
                        const type = assignElementType(element.type)
                        const status = assignElementStatus(element.status)

                        return <TouchableOpacity
                            activeOpacity={0.8}
                            className={`border border-${status} rounded-full mb-1 mt-2 mr-2 bg-mainGray`}
                            onPress={() => {
                                console.log('element on edit elem', element)
                                handleEditElement(element.id)
                            }}>
                            <View className="font-bold px-3 py-0.5 flex-row items-center">
                                <Image className="w-5 h-5 mr-2 object-contain" source={type} />
                                <Text className="font-bold text-center text-sm">{element.type}</Text>
                                {element.accessibility && <View className=" flex justify-center justify-items-center p- ml-2">
                                    <Image className="h-6 w-6 object-cover" source={ACCESSIBLE} />
                                </View>}
                                <View className="rounded-xl bg-mainLime flex justify-center justify-items-center p-1 ml-2">
                                    <Image className="h-6 w-6 object-cover" source={age} />
>>>>>>> finish addPlaygroudn compo, with logics for render each image for ages and elements; create logics for connect to db; create logic in backend for add element; update models
                                </View>
                            </View>
                        </TouchableOpacity>
                    })}
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
            <View className="bg-white dark:bg-gray-800 pl-6 pb-4">
                <UploadImages closeOnPlaygroundCreated={onCreatePlayground} />
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                className="mt-4 self-center w-full  mb-20"
                onPress={handleCancel}
            >
                <View className="px-6  self-center " >
                    <Text className="text-lg">Cancel</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>

    </>
}