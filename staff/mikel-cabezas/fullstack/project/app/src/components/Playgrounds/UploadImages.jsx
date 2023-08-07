import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { ADD, DELETE } from '../../../assets/icons/index.js';

import { firebase } from '../../config/firebase.js'

export default function UploadImages({ closeOnPlaygroundCreated }) {
    const [imagesResized, setImagesResized] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [urlImages, setUrlImages] = useState([]);

    useEffect(() => {
        console.log('loaded')
    }, [])

    useEffect(() => {
        console.log('images in local storage!')
    }, [imagesResized])

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result.canceled) {
            try {
                result.assets.map(async image => {
                    const manipResult = await manipulateAsync(
                        image.uri,
                        [{ resize: { height: 1000 } }],
                        { compress: 0.5, format: SaveFormat.JPEG }
                    )
                    setImagesResized(current => [...current, manipResult]);
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const uploadImages = () => {
        try {
            const storedImagesUrl = []
            setUploading(true)
            imagesResized.map(async image => {
                const response = await fetch(image.uri)
                const blob = await response.blob()
                const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)

                const { ref } = await firebase.storage().ref().child(filename).put(blob)
                const url = await ref.getDownloadURL()
                storedImagesUrl.push(url)
                setUrlImages(current => [...current, url]);
                closeOnPlaygroundCreated(urlImages)
                setUploading(false)
                setImagesResized([])
                alert('All images uploaded!!!')
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteImage = (url) => {
        setImagesResized(current =>
            current.filter(image => {
                return image !== url;
            }),
        );
    }

    return (
        <>
            <View className="flex-row relative" >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pr-5">
                    <TouchableOpacity className="flex flex-col relative items-center justify-center w-[31vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[0] ? pickImages : () => deleteImage(imagesResized[0])}>
                        {imagesResized[0] && <Image source={imagesResized[0]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                        {imagesResized[0] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                        {!imagesResized[0] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-col relative items-center justify-center w-[31vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[1] ? pickImages : () => deleteImage(imagesResized[1])}>
                        {imagesResized[1] && <Image source={imagesResized[1]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                        {imagesResized[1] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                        {!imagesResized[1] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-col relative items-center justify-center w-[31vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[2] ? pickImages : () => deleteImage(imagesResized[2])}>
                        {imagesResized[2] && <Image source={imagesResized[2]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                        {imagesResized[2] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                        {!imagesResized[2] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-col relative items-center justify-center w-[31vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[3] ? pickImages : () => deleteImage(imagesResized[3])}>
                        {imagesResized[3] && <Image source={imagesResized[3]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                        {imagesResized[3] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                        {!imagesResized[3] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-col relative items-center justify-center w-[31vw] mr-3 h-36 rounded-2xl bg-mainGray last:mr-12" onPress={!imagesResized[4] ? pickImages : () => deleteImage(imagesResized[4])}>
                        {imagesResized[4] && <Image source={imagesResized[4]} className="mb-2 w-full h-36 rounded-2xl object-contain" />}
                        {imagesResized[4] && <Image className="w-8 h-8 mr-2 absolute left-auto bg-white rounded-lg" source={DELETE} />}
                        {!imagesResized[4] && <Image className="w-10 h-10 mr-2 absolute left-auto" source={ADD} />}
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {!uploading ?
                <TouchableOpacity
                    activeOpacity={0.8}
                    className={`mt-5 box-border pr-6 w-full`}
                    onPress={uploadImages}>
                    <View className="font-bold px-3 border border-mainLime rounded-full flex-row items-center py-1.5 bg-mainLime ">
                        <Text className="font-bold text-center text-lg w-full">Add</Text>

                    </View>
                </TouchableOpacity>
                : <ActivityIndicator size="large" />}

        </>
    );
};
