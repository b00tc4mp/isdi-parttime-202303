import React, { useEffect, useState, useContext, useRef } from "react";

import { ActivityIndicator, Text, Image, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

import * as Location from 'expo-location';

import { ADD } from '../../../../assets/icons';
import Context from '../../../AppContext'

import UploadImages from "./UploadImages";
import AddElement from './AddElement'
import EditElement from './EditElement'
import SingleElement from '../SingleElement'
import SunExposition from './SunExposition'

import addPlayground from '../../../logic/playgrounds/addPlayground'
import { firebase } from '../../../config/firebase.js'


export default function CreatePlayground({ closeHandle, cancelAddPlayground }) {
    const { TOKEN } = useContext(Context)
    const [playgroundName, setPlaygroundName] = useState()
    const [playgroundDescription, setPlaygroundDescription] = useState()
    const [playgroundShady, setPlaygroundShady] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundSunny, setPlaygroundSunny] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundPartial, setPlaygroundPartial] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundElements, setPlaygroundElements] = useState([])

    const [modal, setModal] = useState([]);
    const [editElement, setEditElement] = useState([]);
    const [imagesResized, setImagesResized] = useState([]);
    const [uploading, setUploading] = useState(false);

    let [fieldStatus, setFieldStatus] = useState('disabled')
    const [fieldsStatusColor, setFieldsStatusColor] = useState('mainGray')

    const [currentLocation, setCurrentLocation] = useState([])
    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return
            }
            let location = await Location.getCurrentPositionAsync({});
            const current = [location.coords.latitude, location.coords.longitude]
            setCurrentLocation(current);
        })();
    }, []);

    const onClose = () => closeHandle()

    const onAddElement = () => {
        setModal('add-element')
    }
    const handleEditElement = elementId => {
        setModal('edit-element')
        console.log('elementId', elementId)
        setEditElement(elementId)
    }
    const onNewElement = (element) => {
        setPlaygroundElements(currentElements => [...currentElements, element])
        setModal('')
    }
    const onEditElement = (element) => {
        setPlaygroundElements(currentElements => {
            currentElements[element.id] = element
            return [...currentElements]
        })
        setModal('')
    }
    const onCancelHandleElement = () => {
        setModal('')
    }
    const handleCancel = () => {
        // if(playgroundName.length > 0, playgroundDescription.length > 0, playgroundShady.length > 0, playgroundSunny.length > 0, playgroundPartial.length > 0, playgroundElements.length > 0)
        cancelAddPlayground()
    }

    const onCreatePlayground = async (storedImagesUrl) => {
        const sunExposition = { shady: playgroundShady.status, sunny: playgroundSunny.status, partial: playgroundPartial.status }
        try {
            await addPlayground(TOKEN, playgroundName, playgroundDescription, sunExposition, playgroundElements, storedImagesUrl, currentLocation)
                .then(() => {
                    onClose()
                    Alert.alert('Success', `Playground added`, [
                        { text: 'OK', onPress: () => { } },
                    ]);
                })
                .catch(error => {
                    Alert.alert('Error', `${error.message}`, [
                        { text: 'OK', onPress: () => { } },
                    ]);
                    setUploading(false)
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    const uploadImages = async () => {
        try {
            setUploading(true)
            const urlImagesFirebase = Promise.all(imagesResized.map(async (image, index) => {
                const response = await fetch(image.uri)
                const blob = await response.blob()
                const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
                const { ref } = await firebase.storage().ref().child(filename).put(blob)
                return await ref.getDownloadURL()
            }))
            urlImagesFirebase.then(data => onCreatePlayground(data))
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        // console.log('playgroundName', playgroundName)
        // console.log('playgroundDescription', playgroundDescription)
        // console.log('playgroundElements', playgroundElements)
        // console.log('imagesResized', imagesResized)

        if (!playgroundName || !playgroundDescription || !playgroundElements || imagesResized.length <= 0) {
            setFieldsStatusColor('mainGray')
        } else {
            setFieldsStatusColor('mainLime')
            setFieldStatus(false)
        }
    }, [playgroundName, playgroundDescription, playgroundElements, imagesResized, currentLocation])

    return <>
        {modal === 'add-element' && <AddElement onElementCreated={onNewElement} id={playgroundElements.length} onCancelAddElement={onCancelHandleElement} />}
        {modal === 'edit-element' && <EditElement onElementEdited={onEditElement} element={playgroundElements[editElement]} onCancelEditElement={onCancelHandleElement} />}

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
                <SunExposition playgroundShady={playgroundShady} setPlaygroundShady={setPlaygroundShady} playgroundSunny={playgroundSunny} setPlaygroundSunny={setPlaygroundSunny} playgroundPartial={playgroundPartial} setPlaygroundPartial={setPlaygroundPartial} />
                <View className="flex-row flex-wrap">
                    <Text className="dark:text-white text-lg mt-3 font-semibold w-full">Elements</Text>
                    {playgroundElements.length !== 0 && playgroundElements.map((element, index) => {
                        return <SingleElement element={element} index={index} handleEditElement={handleEditElement} />
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
            </View>
            <View className="bg-white dark:bg-gray-800 pl-6 pb-4">
                <Text className="dark:text-white text-lg mb-3 font-semibold">Images <Text className="dark:text-white text-sm mt-3 font-normal">(Max 5 images)</Text></Text>
                <UploadImages setImagesResized={setImagesResized} imagesResized={imagesResized} closeOnPlaygroundCreated={onCreatePlayground} />
            </View>
            {!uploading ?
                <TouchableOpacity
                    disabled={fieldStatus}
                    activeOpacity={0.8}
                    className={`mt-2 box-border px-6 w-full`}
                    onPress={uploadImages}>
                    <View className={`font-bold px-3 border border-mainLime rounded-full flex-row items-center py-1.5 bg-mainLimez bg-${fieldsStatusColor}`}>
                        <Text className="font-bold text-center text-lg w-full">Add</Text>
                    </View>
                </TouchableOpacity>
                : <ActivityIndicator size="large" />}
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